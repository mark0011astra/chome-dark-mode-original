// options.js

// Save options
function saveOptions() {
  const darkModeEnabled = document.getElementById("darkModeEnabled").checked;
  const backgroundColor = document.getElementById("backgroundColor").value;
  const textColor = document.getElementById("textColor").value;
  const linkColor = document.getElementById("linkColor").value;

  chrome.storage.sync.set({
    darkModeEnabled: darkModeEnabled,
    backgroundColor: backgroundColor,
    textColor: textColor,
    linkColor: linkColor,
  }, function () {
    console.log("Options saved");
  });
}

// Restore options
function restoreOptions() {
  chrome.storage.sync.get({
    darkModeEnabled: true,
    backgroundColor: "#222222",
    textColor: "#eeeeee",
    linkColor: "#88ccff",
  }, function (items) {
    document.getElementById("darkModeEnabled").checked = items.darkModeEnabled;
    document.getElementById("backgroundColor").value = items.backgroundColor;
    document.getElementById("textColor").value = items.textColor;
    document.getElementById("linkColor").value = items.linkColor;
  });
}

// Register event listeners
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("saveButton").addEventListener("click", saveOptions);