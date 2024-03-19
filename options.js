// options.js

// Save options
function saveOptions() {
    const darkModeEnabled = document.getElementById("darkModeEnabled").checked;
    chrome.storage.sync.set({ darkModeEnabled: darkModeEnabled }, function() {
      console.log("Options saved");
    });
  }
  
  // Restore options
  function restoreOptions() {
    chrome.storage.sync.get("darkModeEnabled", function(data) {
      document.getElementById("darkModeEnabled").checked = data.darkModeEnabled;
    });
  }
  
  // Register event listeners
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.getElementById("darkModeEnabled").addEventListener("change", saveOptions);