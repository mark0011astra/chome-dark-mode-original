// content.js

// Toggle dark mode
function toggleDarkMode(darkModeEnabled, backgroundColor, textColor, linkColor) {
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
    document.documentElement.style.setProperty("--dark-mode-background-color", backgroundColor);
    document.documentElement.style.setProperty("--dark-mode-text-color", textColor);
    document.documentElement.style.setProperty("--dark-mode-link-color", linkColor);
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// Initialize dark mode
function init() {
  chrome.storage.sync.get({
    darkModeEnabled: true,
    backgroundColor: "#222222",
    textColor: "#eeeeee",
    linkColor: "#88ccff",
  }, function (items) {
    toggleDarkMode(items.darkModeEnabled, items.backgroundColor, items.textColor, items.linkColor);
  });
}

// Execute initialization
init();