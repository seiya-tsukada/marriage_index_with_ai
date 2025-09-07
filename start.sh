#!/bin/bash

echo "🚀 Marriage Index アプリケーションを起動します..."

# バックエンドの起動
echo "📡 バックエンドを起動中..."
cd backend
uv run uvicorn main:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!

# 少し待機
sleep 3

# フロントエンドの起動
echo "🎨 フロントエンドを起動中..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✅ アプリケーションが起動しました！"
echo "🌐 フロントエンド: http://localhost:3000"
echo "📡 バックエンドAPI: http://localhost:8000"
echo ""
echo "終了するには Ctrl+C を押してください"

# プロセスの終了を待機
wait $BACKEND_PID $FRONTEND_PID
