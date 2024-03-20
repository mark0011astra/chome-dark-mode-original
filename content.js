// content.js

// Toggle dark mode
function toggleDarkMode(darkModeEnabled) {
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
    document.querySelectorAll("header, nav, footer").forEach(el => {
      el.style.backgroundColor = "#333";
      el.style.color = "#eee";
    });
    document.querySelectorAll("article, section").forEach(el => {
      el.style.backgroundColor = "#444";
      el.style.color = "#eee";
    });
  } else {
    document.body.classList.remove("dark-mode");
    document.querySelectorAll("header, nav, footer, article, section").forEach(el => {
      el.style.backgroundColor = "";
      el.style.color = "";
    });
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