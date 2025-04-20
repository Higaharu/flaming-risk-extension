# SNS炎上リスク推定拡張機能

SNSへの投稿前に炎上リスクを自動評価し、問題箇所をハイライト表示することで自己規制を促すブラウザ拡張機能です。

## 概要

この拡張機能は以下のソーシャルメディアプラットフォームで動作します：
- X (Twitter)
- Facebook
- Threads
- LinkedIn

## 主な機能

- **リアルタイム評価**: 投稿ボタンを押す3秒前にテキストを自動評価
- **炎上リスク表示**: 0-100%のスコアとカラーコード（緑・黄・赤）でリスクレベルを表示
- **問題箇所ハイライト**: 問題となる可能性のある表現を下線付きで強調表示
- **プライバシー保護**: テキスト評価は端末内で完結（データ送信なし）
- **カスタマイズ設定**: リスク閾値や対象SNSの選択などが可能
- **多言語対応**: 日本語・英語に対応（UI・評価とも）

## 技術スタック

- **フロントエンド**: TypeScript, React 18, Tailwind CSS
- **拡張機能**: Chrome Extension Manifest V3
- **AI推論**: Transformers.js, ONNX Runtime Web
- **バックエンド（オプション）**: Python 3.12, FastAPI, Hugging Face Transformers

## 開発環境セットアップ

### 前提条件

- Node.js v18以上
- Python 3.12以上（バックエンド用・オプション）
- npm または yarn

### インストール手順

1. リポジトリをクローン
```
git clone https://github.com/your-username/flaming-risk-extension.git
cd flaming-risk-extension
```

2. フロントエンド依存関係のインストール
```
cd extension
npm install
```

3. バックエンド依存関係のインストール（オプション）
```
cd ../backend
pip install -r requirements.txt
```

4. 開発ビルドの作成
```
cd ../extension
npm run dev
```

## デバッグ方法

### Chrome拡張機能としてデバッグ

1. Chrome/Edgeで `chrome://extensions` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `extension/dist` ディレクトリを選択
5. 対応SNSサイトを開いて拡張機能をテスト

### バックエンドのテスト（オプション）

1. FastAPIサーバーを起動
```
cd backend
uvicorn main:app --reload
```

2. curlでAPIをテスト
curl -X POST "http://localhost:8000/analyze"
-H "Content-Type: application/json"
-d '{"text": "この投稿は炎上しそうですか？"}'

shell
コピーする
編集する

## ファイル構成

flaming-risk-extension/ ├── backend/ │ └── main.py # オプションのAPIサーバー（FastAPI） ├── manifest.json # 拡張機能のマニフェスト（V3） ├── src/ │ ├── background/sw.ts # Service Worker │ ├── components/ # Reactコンポーネント │ │ ├── OptionsPage.tsx # 拡張機能の設定画面 │ │ └── RiskPopover.tsx # リスクスコア表示ポップアップ │ ├── content/
│ │ ├── content.ts # 投稿ボタンの検出＆処理 │ │ └── inject-ui.tsx # ハイライト表示などUI挿入用 │ └── lib/ │ ├── i18n.ts # 多言語対応 │ ├── platform-detector.ts # SNS判定 │ ├── predict.ts # リスク推定処理（モデル呼び出し） │ └── tokenizer.ts # テキスト前処理 └── tsconfig.json

yaml
コピーする
編集する

## 今後の予定

- [ ] モデル精度の改善（誤検知の減少）
- [ ] 他SNS（TikTokなど）への対応
- [ ] Safari用の対応
- [ ] リスク要因の詳細解説（説明性強化）

## ライセンス

MIT License

---

## ✨ もしやりたいことがあれば教えて！

- FastAPI側の要約 or リスク分析モデルの実装
- `content.ts` 側でポストボタンをフックする実装
- RiskPopoverのデザイン（Tailwindの工夫）など

どこでも手伝います！

--- 

画像やUIイメージをREADMEに入れたければ、先ほどのように並べて比較したり、アニメGIFで「リスクスコア変化→ぼかし→警告文」なども映えると思います！







