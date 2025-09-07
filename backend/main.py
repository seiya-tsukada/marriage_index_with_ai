from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import os
from pathlib import Path

app = FastAPI(title="Marriage Index API", version="0.1.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データモデル
class Answer(BaseModel):
    question_id: int
    option_id: str

class QuizSubmission(BaseModel):
    answers: List[Answer]

class Question(BaseModel):
    id: int
    question: str
    options: List[Dict[str, Any]]

class QuizResponse(BaseModel):
    questions: List[Question]

class ResultResponse(BaseModel):
    title: str
    description: str
    color: str
    total_score: int

def load_questions() -> Dict[str, Any]:
    """質問定義ファイルを読み込む"""
    questions_path = Path(__file__).parent.parent / "definitions" / "questions.json"
    try:
        with open(questions_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Questions file not found")

@app.get("/")
async def root():
    return {"message": "Marriage Index API is running"}

@app.get("/api/questions", response_model=QuizResponse)
async def get_questions():
    """質問一覧を取得"""
    try:
        data = load_questions()
        return QuizResponse(questions=data["questions"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/submit", response_model=ResultResponse)
async def submit_quiz(submission: QuizSubmission):
    """クイズの回答を送信して結果を取得"""
    try:
        data = load_questions()
        
        # スコア計算
        total_score = 0
        for answer in submission.answers:
            question = next((q for q in data["questions"] if q["id"] == answer.question_id), None)
            if question:
                option = next((opt for opt in question["options"] if opt["id"] == answer.option_id), None)
                if option:
                    total_score += option["score"]
        
        # 結果判定
        result_key = None
        if 3 <= total_score <= 5:
            result_key = "3-5"
        elif 6 <= total_score <= 7:
            result_key = "6-7"
        elif 8 <= total_score <= 9:
            result_key = "8-9"
        else:
            result_key = "6-7"  # デフォルト
        
        result = data["results"][result_key]
        
        return ResultResponse(
            title=result["title"],
            description=result["description"],
            color=result["color"],
            total_score=total_score
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
