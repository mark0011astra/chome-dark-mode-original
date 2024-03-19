// content.js

// Toggle dark mode
function toggleDarkMode(darkModeEnabled) {
    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
  
  // Initialize dark mode
  function init() {
    chrome.storage.sync.get("darkModeEnabled", function(data) {
      toggleDarkMode(data.darkModeEnabled || false);
    });
  }
  
  // Execute initialization
  init();