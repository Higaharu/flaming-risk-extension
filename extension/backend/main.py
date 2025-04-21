from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import numpy as np
from typing import List, Dict, Optional
import os
import logging

# ロギング設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# アプリケーション初期化
app = FastAPI(title="炎上リスク検出API")

# CORS設定（ローカル開発用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境ではより制限的に設定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# リクエスト/レスポンスモデル
class TextRequest(BaseModel):
    text: str
    lang: Optional[str] = "auto"  # "ja", "en", "auto"

class RiskResponse(BaseModel):
    risk_score: float
    highlighted_text: str
    problematic_phrases: List[Dict[str, any]]
    processing_time_ms: float

# グローバル変数
model = None
tokenizer = None
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 問題表現辞書（簡易版）
PROBLEMATIC_TERMS = {
    "ja": [
        "バカ", "馬鹿", "アホ", "死ね", "クソ", "うざい", "キモい", 
        "殺す", "消えろ", "在日", "害児", "害人", "土人"
    ],
    "en": [
        "idiot", "stupid", "fool", "hate", "kill", "die", "ugly",
        "racist", "sexist", "bigot", "trash", "shut up"
    ]
}

@app.on_event("startup")
async def load_model():
    """アプリ起動時にモデルを読み込む"""
    global model, tokenizer
    
    model_name = "cardiffnlp/twitter-roberta-base-offensive"
    logger.info(f"モデル読み込み中: {model_name}")
    
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
        model.to(device)
        model.eval()
        logger.info("モデル読み込み完了")
    except Exception as e:
        logger.error(f"モデル読み込みエラー: {e}")
        raise

@app.get("/")
def read_root():
    return {"status": "ok", "message": "SNS炎上リスク検出APIが稼働中です"}

@app.post("/analyze", response_model=RiskResponse)
async def analyze_text(request: TextRequest):
    """テキストの炎上リスクを分析"""
    if not model or not tokenizer:
        raise HTTPException(status_code=503, detail="モデルが読み込まれていません")
    
    start_time = torch.cuda.Event(enable_timing=True) if torch.cuda.is_available() else None
    end_time = torch.cuda.Event(enable_timing=True) if torch.cuda.is_available() else None
    
    if start_time:
        start_time.record()
    
    # 言語検出（簡易版）- 実際にはより正確な言語検出が必要
    if request.lang == "auto":
        # 日本語文字が含まれているか判定
        has_jp = any(ord(c) > 0x3000 for c in request.text)
        lang = "ja" if has_jp else "en"
    else:
        lang = request.lang
    
    try:
        # テキストをトークン化
        inputs = tokenizer(
            request.text, 
            return_tensors="pt",
            truncation=True, 
            max_length=128,
            padding="max_length"
        ).to(device)
        
        # 推論実行
        with torch.no_grad():
            outputs = model(**inputs)
        
        # ロジットから確率値を取得
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        offensive_prob = probabilities[0, 1].item()  # オフェンシブクラスの確率
        
        # リスクスコアを計算（0-100%）
        risk_score = round(offensive_prob * 100, 1)
        
        # 問題のある表現を検出
        problematic_phrases = []
        highlighted_text = request.text
        
        # 簡易版マッチング（実際にはより高度な検出が必要）
        for term in PROBLEMATIC_TERMS.get(lang, []):
            if term.lower() in request.text.lower():
                start_idx = request.text.lower().find(term.lower())
                end_idx = start_idx + len(term)
                
                problematic_phrases.append({
                    "text": request.text[start_idx:end_idx],
                    "start": start_idx,
                    "end": end_idx,
                    "severity": "high" if offensive_prob > 0.7 else "medium"
                })
                
                # テキストにハイライト用のHTMLタグを追加
                term_in_text = request.text[start_idx:end_idx]
                highlighted_text = highlighted_text.replace(
                    term_in_text, 
                    f'<span class="underline text-red-600">{term_in_text}</span>'
                )
        
        # 処理時間計測
        if end_time:
            end_time.record()
            torch.cuda.synchronize()
            processing_time = start_time.elapsed_time(end_time)
        else:
            processing_time = 0
        
        return {
            "risk_score": risk_score,
            "highlighted_text": highlighted_text,
            "problematic_phrases": problematic_phrases,
            "processing_time_ms": processing_time
        }
        
    except Exception as e:
        logger.error(f"分析エラー: {e}")
        raise HTTPException(status_code=500, detail=f"分析エラー: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)