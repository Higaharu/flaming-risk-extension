/// <reference types="chrome"/>

import { SocialMediaPlatform, detectSocialPlatform } from '../lib/platform-detector';
import { createRoot } from 'react-dom/client';
import { injectRiskPopover } from './inject-ui';

// 定数定義
const INPUT_IDLE_TIMEOUT = 3000; // 3秒のアイドル時間
const MIN_TEXT_LENGTH = 10; // 分析する最小テキスト長

// グローバル状態管理
let inputTimer: ReturnType<typeof setTimeout> | null = null;
let lastInputText = '';
let isPopoverVisible = false;
let currentPlatform: SocialMediaPlatform | null = null;
let popoverRoot: ReturnType<typeof createRoot> | null = null;
let postButtonElement: HTMLElement | null = null;

/**
 * SNSプラットフォーム固有のセレクタマッピング
 */
const PLATFORM_SELECTORS = {
  twitter: {
    postButton: 'div[data-testid="tweetButtonInline"]',
    textArea: 'div[data-testid="tweetTextarea_0"]',
    container: '[data-testid="toolBar"]',
  },
  x: {
    postButton: 'div[data-testid="tweetButtonInline"]',
    textArea: 'div[data-testid="tweetTextarea_0"]',
    container: '[data-testid="toolBar"]',
  },
  facebook: {
    postButton: 'div[aria-label="投稿"], div[aria-label="Post"]',
    textArea: 'div[contenteditable="true"][role="textbox"]',
    container: '.xdj266r',
  },
  threads: {
    postButton: 'button._acan._acap._aj1-',
    textArea: 'div[contenteditable="true"][role="textbox"]',
    container: '.x6s0dn4',
  },
  linkedin: {
    postButton: 'button.share-actions__primary-action',
    textArea: 'div[contenteditable="true"][role="textbox"]',
    container: '.share-box_actions',
  }
};

/**
 * 拡張機能の初期化
 */
async function initialize() {
  console.log('炎上リスク推定拡張機能を初期化中...');

  // プラットフォーム検出
  currentPlatform = detectSocialPlatform(window.location.hostname);
  if (!currentPlatform) {
    console.log('対応していないサイトです');
    return;
  }

  console.log(`検出したプラットフォーム: ${currentPlatform}`);

  // ミューテーションオブザーバーでDOM変更を監視
  observePageChanges();

  // 既存の入力フィールドに対しても検出を試みる
  setTimeout(findAndAttachToInputs, 1000);
}

/**
 * DOM変更を監視し投稿フィールドを動的に検出
 */
function observePageChanges() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        findAndAttachToInputs();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * 入力フィールドを検出してイベントリスナーを付与
 */
function findAndAttachToInputs() {
  if (!currentPlatform) return;

  const selectors = PLATFORM_SELECTORS[currentPlatform];

  // テキストエリア検出
  const monitorTextAreas = () => {
    const textAreas = document.querySelectorAll('div[role="textbox"]');
    textAreas.forEach(textArea => {
      if (!textArea.hasAttribute('data-flaming-monitored')) {
        textArea.setAttribute('data-flaming-monitored', 'true');
        textArea.addEventListener('input', handleInput);
        textArea.addEventListener('keydown', handleInput);
        console.log('入力フィールドを検出しました');
      }
    });
  };

  // 1秒おきにチェック
  setInterval(monitorTextAreas, 1000);

  // 投稿ボタン検出
  const postBtn = document.querySelector(selectors.postButton) as HTMLElement;
  if (postBtn && !postBtn.hasAttribute('data-flaming-monitored')) {
    postBtn.setAttribute('data-flaming-monitored', 'true');
    postButtonElement = postBtn;
    console.log('投稿ボタンを検出しました');

    // ポップオーバー用のコンテナを準備
    preparePopoverContainer(selectors.container);
  }
}

/**
 * ポップオーバー表示用のコンテナを準備
 */
function preparePopoverContainer(containerSelector: string) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const popoverContainer = document.createElement('div');
  popoverContainer.id = 'flaming-risk-popover-container';
  popoverContainer.setAttribute('aria-live', 'polite');
  container.parentNode?.insertBefore(popoverContainer, container);

  // Reactルート作成
  popoverRoot = createRoot(popoverContainer);
}

/**
 * 入力イベントハンドラ
 */
function handleInput(event: Event) {
  if (inputTimer) {
    clearTimeout(inputTimer);
  }

  const target = event.target as HTMLElement;
  const text = extractTextContent(target);
  lastInputText = text;

  if (text.length < MIN_TEXT_LENGTH) {
    hideRiskPopover();
    return;
  }

  inputTimer = setTimeout(() => {
    evaluateText(text);
  }, INPUT_IDLE_TIMEOUT);
}

/**
 * 要素からテキストコンテンツを抽出
 */
function extractTextContent(element: HTMLElement): string {
  return element.textContent || element.innerText || '';
}

/**
 * テキストの炎上リスク評価
 */
async function evaluateText(text: string) {
  console.log('テキスト評価リクエスト送信...');

  try {
    const result = await chrome.runtime.sendMessage({
      action: 'evaluateText',
      text: text
    });

    if (result?.error) {
      console.error('評価エラー:', result.error);
      return;
    }

    displayRiskPopover(result);
  } catch (error) {
    console.error('評価プロセスでエラー発生:', error);
  }
}

/**
 * リスク評価結果をポップオーバーで表示
 */
function displayRiskPopover(result: { score: number, highlightedText: string }) {
  if (!popoverRoot) return;

  injectRiskPopover(popoverRoot, {
    risk: result.score,
    highlightedText: result.highlightedText,
    originalText: lastInputText,
    onClose: hideRiskPopover
  });

  isPopoverVisible = true;
}

/**
 * ポップオーバーを非表示
 */
function hideRiskPopover() {
  if (popoverRoot && isPopoverVisible) {
    popoverRoot.render(null);
    isPopoverVisible = false;
  }
}

initialize();

export function cleanup() {
  if (inputTimer) {
    clearTimeout(inputTimer);
  }

  if (popoverRoot) {
    popoverRoot.unmount();
  }
}