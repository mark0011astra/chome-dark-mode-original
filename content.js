// メッセージを受信したときの処理
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleDarkMode") {
      toggleDarkMode(request.darkModeEnabled);
    }
  });
  
  // ダークモードの切り替え
  function toggleDarkMode(darkModeEnabled) {
    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
  
  // 初期化処理
  function init() {
    // ストレージからダークモードの設定を取得
    chrome.storage.sync.get("darkModeEnabled", function(data) {
      toggleDarkMode(data.darkModeEnabled);
    });
  }
  
  // 初期化処理を実行
  init();