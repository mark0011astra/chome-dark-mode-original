// background.js

// Initialize the dark mode state
let darkModeEnabled = false;

// Load the initial state from storage
chrome.storage.sync.get("darkModeEnabled", function(data) {
  darkModeEnabled = data.darkModeEnabled || false;
  updateActionTitle();
});

// Listen for icon click events
chrome.action.onClicked.addListener(function(tab) {
  if (tab.url.startsWith("chrome://")) return;
  darkModeEnabled = !darkModeEnabled;
  updateActionTitle();
  chrome.storage.sync.set({ darkModeEnabled: darkModeEnabled }, function() {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
});

// Update the action title based on the dark mode state
function updateActionTitle() {
  const title = darkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode";
  chrome.action.setTitle({ title: title });
}