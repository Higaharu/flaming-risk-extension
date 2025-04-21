import * as ort from 'onnxruntime-web';
import { tokenize } from './tokenizer';

// 言語検出用の正規表現パターン
const JAPANESE_PATTERN = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/;

// モデルのキャッシュ
let sessionCache: ort.InferenceSession | null = null;
// トークナイザーのキャッシュ
let tokenizerCache: any = null;

/**
 * テキストの言語を検出
 */
function detectLanguage(text: string): 'ja' | 'en' | 'mixed' {
  if (JAPANESE_PATTERN.test(text)) {
    // 英語の文字が含まれているか確認
    const englishChars = text.match(/[a-zA-Z]/g);
    if (englishChars && englishChars.length > 3) {
      return 'mixed';
    }
    return 'ja';
  }
  return 'en';
}

/**
 * モデルを初期化
 */
async function initializeModel(): Promise<ort.InferenceSession> {
  if (sessionCache) {
    return sessionCache;
  }

  // WebAssembly実行のためのパスを設定
  ort.env.wasm.wasmPaths = chrome.runtime.getURL('models/');

  try {
    // ONNXモデルを読み込み
    const modelPath = chrome.runtime.getURL('models/flaming_risk_model_quantized.onnx');
    const modelArrayBuffer = await fetch(modelPath).then(r => r.arrayBuffer());
    
    // 軽量化オプション
    const sessionOptions: ort.InferenceSession.SessionOptions = {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
      enableCpuMemArena: true,
      enableMemPattern: true,
    };

    // セッション作成
    const session = await ort.InferenceSession.create(
      modelArrayBuffer, 
      sessionOptions
    );
    
    sessionCache = session;
    console.log('モデル読み込み完了');
    return session;
  } catch (error) {
    console.error('モデル初期化エラー:', error);
    throw new Error('モデル初期化に失敗しました');
  }
}

/**
 * トークナイザー初期化
 */
async function initializeTokenizer() {
  if (tokenizerCache) {
    return tokenizerCache;
  }

  try {
    // トークナイザー設定を読み込み
    const tokenizerPath = chrome.runtime.getURL('models/tokenizer.json');
    const tokenizerConfig = await fetch(tokenizerPath).then(r => r.json());
    
    tokenizerCache = tokenizerConfig;
    return tokenizerConfig;
  } catch (error) {
    console.error('トークナイザー初期化エラー:', error);
    throw new Error('トークナイザー初期化に失敗しました');
  }
}

/**
 * テキストのトークン化処理
 */
async function tokenizeText(text: string) {
  const tokenizer = await initializeTokenizer();
  const tokenized = tokenize(text, tokenizer, {
    maxLength: 128,
    padding: 'max_length',
    truncation: true,
  });
  
  return {
    inputIds: tokenized.inputIds,
    attentionMask: tokenized.attentionMask
  };
}

/**
 * 問題のある単語・フレーズを検出してハイライト
 */
function highlightProblemPhrases(text: string, scoreMap: number[]): string {
  // 簡略化のため、一定の単語リストで対応
  const problematicJapaneseWords = [
    '馬鹿', 'バカ', 'アホ', '死ね', 'クソ', '殺す', '消えろ',
    '害児', '害人', '在日', '土人', '人種', '民族', 'ブス'
  ];
  
  const problematicEnglishWords = [
    'idiot', 'stupid', 'fool', 'hate', 'kill', 'die', 'ugly',
    'racist', 'sexist', 'bigot', 'trash', 'shut up'
  ];
  
  let highlightedText = text;
  const lang = detectLanguage(text);
  
  // 言語に応じた問題単語リストを選択
  const wordList = lang === 'ja' ? problematicJapaneseWords : 
                   lang === 'en' ? problematicEnglishWords : 
                   [...problematicJapaneseWords, ...problematicEnglishWords];
  
  // 単語をハイライト
  wordList.forEach(word => {
    if (text.toLowerCase().includes(word.toLowerCase())) {
      const regex = new RegExp(word, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="underline text-red-600">$&</span>`
      );
    }
  });
  
  return highlightedText;
}

/**
 * テキストの炎上リスクを評価
 */
export async function evaluateText(text: string): Promise<{
  score: number;
  highlightedText: string;
}> {
  try {
    // モデルとトークナイザー初期化
    const [session] = await Promise.all([
      initializeModel(),
      initializeTokenizer()
    ]);
    
    // テキストをトークン化
    const { inputIds, attentionMask } = await tokenizeText(text);
    
    // テンソル作成
    const inputTensor = new ort.Tensor('int64', new BigInt64Array(inputIds.map(BigInt)), [1, inputIds.length]);
    const maskTensor = new ort.Tensor('int64', new BigInt64Array(attentionMask.map(BigInt)), [1, attentionMask.length]);
    
    // 推論実行
    const feeds = { 
      'input_ids': inputTensor, 
      'attention_mask': maskTensor 
    };
    
    console.log('モデル推論実行中...');
    const start = performance.now();
    const results = await session.run(feeds);
    const end = performance.now();
    console.log(`推論時間: ${(end - start).toFixed(2)}ms`);
    
    // 結果を取得（logits -> probabilities）
    const logits = results.logits.data as Float32Array;
    const probabilities = softmax(Array.from(logits));
    
    // 確率値を0-100%のスコアに変換
    const offensiveScore = Math.round(probabilities[1] * 100);
    
    // 問題箇所をハイライト
    const highlightedText = highlightProblemPhrases(text, probabilities);
    
    return {
      score: offensiveScore,
      highlightedText
    };
  } catch (error) {
    console.error('推論エラー:', error);
    throw new Error('テキスト評価に失敗しました');
  }
}

/**
 * ソフトマックス関数の実装
 */
function softmax(logits: number[]): number[] {
  const maxLogit = Math.max(...logits);
  const expScores = logits.map(logit => Math.exp(logit - maxLogit));
  const sumExpScores = expScores.reduce((acc, val) => acc + val, 0);
  return expScores.map(score => score / sumExpScores);
}