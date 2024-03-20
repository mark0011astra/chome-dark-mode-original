// background.js

let darkModeEnabled = true;

chrome.storage.sync.get({
  darkModeEnabled: true,
  backgroundColor: "#222222",
  textColor: "#eeeeee",
  linkColor: "#88ccff",
}, function (items) {
  darkModeEnabled = items.darkModeEnabled;
  updateActionTitle();
});

chrome.action.onClicked.addListener(function (tab) {
  if (tab.url && tab.url.startsWith("chrome://")) return;
  darkModeEnabled = !darkModeEnabled;
  updateActionTitle();
  chrome.storage.sync.set({ darkModeEnabled: darkModeEnabled }, function () {
    applyDarkModeToTab(tab, darkModeEnabled);
  });
});

function updateActionTitle() {
  const title = darkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode";
  chrome.action.setTitle({ title: title });
}

function applyDarkModeToTab(tab, darkModeEnabled) {
  if (tab.url && !tab.url.startsWith("chrome://")) {
    chrome.storage.sync.get({
      backgroundColor: "#222222",
      textColor: "#eeeeee",
      linkColor: "#88ccff",
    }, function (items) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    });
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    applyDarkModeToTab(tab, darkModeEnabled);
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync") {
    if (changes.darkModeEnabled) {
      darkModeEnabled = changes.darkModeEnabled.newValue;
      updateActionTitle();
    }
    if (changes.darkModeEnabled || changes.backgroundColor || changes.textColor || changes.linkColor) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          applyDarkModeToTab(tab, darkModeEnabled);
        });
      });
    }
  }
});