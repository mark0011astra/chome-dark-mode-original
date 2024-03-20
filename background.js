// background.js

let darkModeEnabled = true;

chrome.storage.sync.get("darkModeEnabled", function (data) {
  if (data.darkModeEnabled === false) {
    darkModeEnabled = false;
  }
  updateActionTitle();
});

chrome.action.onClicked.addListener(function (tab) {
  if (tab.url && tab.url.startsWith("chrome://")) return;
  darkModeEnabled = !darkModeEnabled;
  updateActionTitle();
  chrome.storage.sync.set({ darkModeEnabled: darkModeEnabled }, function () {
    applyDarkModeToTab(tab);
  });
});

function updateActionTitle() {
  const title = darkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode";
  chrome.action.setTitle({ title: title });
}

function applyDarkModeToTab(tab) {
  if (tab.url && !tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && darkModeEnabled) {
    applyDarkModeToTab(tab);
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && changes.darkModeEnabled) {
    darkModeEnabled = changes.darkModeEnabled.newValue;
    updateActionTitle();
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        applyDarkModeToTab(tab);
      });
    });
  }
});