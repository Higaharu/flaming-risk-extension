import { evaluateText } from '../lib/predict';

/**
 * メッセージハンドラの登録
 */
chrome.runtime.onMessage.addListener((message: { action: string; text: string; }, sender: any, sendResponse: (arg0: { score?: number; highlightedText?: string; error?: string; }) => void) => {
  // メッセージハンドラはasync/awaitを直接使えないので、
  // 非同期処理を即時実行関数内で行い、sendResponseを後で呼び出す
  if (message.action === 'evaluateText') {
    // 応答を遅延させるためにtrueを返す
    (async () => {
      try {
        console.log('Service Worker: テキスト評価リクエスト受信');
        
        // テキストを評価
        const result = await evaluateText(message.text);
        
        // 結果を返送
        sendResponse({
          score: result.score,
          highlightedText: result.highlightedText
        });
      } catch (error) {
        console.error('Service Worker: 評価エラー', error);
        sendResponse({
          error: (error as Error).message || '評価に失敗しました'
        });
      }
    })();
    
    // 非同期レスポンスを許可
    return true;
  }
});

// 拡張機能インストール/更新時の処理
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // 初回インストール時のみ設定を初期化
    await chrome.storage.sync.set({
      enabledPlatforms: {
        twitter: true,
        x: true,
        facebook: true,
        threads: true,
        linkedin: true
      },
      riskThresholds: {
        low: 30,
        high: 70
      },
      language: 'auto',
      showNotification: true
    });
    
    // オプションページを開く
    chrome.runtime.openOptionsPage();
  }
});

// Service Worker活性維持
const keepAlive = () => {
  console.log('Service Worker: 活性維持');
  setTimeout(keepAlive, 20000);
};

// 活性維持スタート
keepAlive();