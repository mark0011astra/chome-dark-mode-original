// オプションページのスクリプト

// 設定の保存
function saveOptions() {
    const darkModeEnabled = document.getElementById("darkModeEnabled").checked;
    chrome.storage.sync.set({ darkModeEnabled: darkModeEnabled }, function() {
      console.log("Options saved");
    });
  }
  
  // 設定の復元
  function restoreOptions() {
    chrome.storage.sync.get("darkModeEnabled", function(data) {
      document.getElementById("darkModeEnabled").checked = data.darkModeEnabled;
    });
  }
  
  // イベントリスナーの登録
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.getElementById("darkModeEnabled").addEventListener("change", saveOptions);