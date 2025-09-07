# Marriage Index

人々の幸せをサポートする新しい概念「Marriage Index」を提供するWebアプリケーションです。

## 概要

このアプリケーションは、3つの質問に答えることで、あなたの結婚観を診断し、Marriage Indexを算出します。

## 技術スタック

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python
- **Package Manager**: uv (Python), npm (Node.js)
- **定義ファイル**: JSON形式で質問と回答を管理

## 起動方法

### 前提条件

- Node.js (v18以上)
- Python (v3.11以上)
- uv (Python package manager)

### 起動方法

1. **自動起動（推奨）**
   ```bash
   ./start.sh
   ```

2. **手動起動**
   
   **バックエンド起動:**
   ```bash
   cd backend
   uv run uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```
   
   **フロントエンド起動（別ターミナル）:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000
- **API仕様書**: http://localhost:8000/docs

## 機能

### フロントエンド機能

- 質問の表示（1画面1問形式）
- 横並びボタンでの回答選択
- 進捗バーの表示
- 結果画面でのMarriage Index表示
- レスポンシブデザイン

### バックエンド機能

- 質問データの提供 (`/api/questions`)
- 回答の受信とスコア計算 (`/api/submit`)
- CORS設定（フロントエンド連携）
- エラーハンドリング

## 結果タイプ

Marriage Indexは以下の3つのタイプに分類されます：

- **伝統志向型** (3-5点): 安定した伝統的な結婚観
- **バランス型** (6-7点): 柔軟性があり対話を重視
- **現代的パートナーシップ型** (8-9点): 独立性と成長を重視

## 開発

### 質問の追加・変更

`definitions/questions.json` を編集することで、質問や回答選択肢を変更できます。

### スタイルの変更

`frontend/tailwind.config.js` でカラーテーマを調整できます。

### API仕様

FastAPIの自動生成ドキュメントを http://localhost:8000/docs で確認できます。
