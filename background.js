// アクションがクリックされたときの処理
chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
  
  // ストレージの変更を監視
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.darkModeEnabled) {
      // 全てのタブにメッセージを送信
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, { action: "toggleDarkMode", darkModeEnabled: changes.darkModeEnabled.newValue });
        });
      });
    }
  });