"""
Chat and AI schemas
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class ChatMessageBase(BaseModel):
    content: str


class ChatMessageCreate(ChatMessageBase):
    pass


class ChatMessageResponse(ChatMessageBase):
    id: int
    session_id: int
    message_type: str  # user, ai
    model_used: Optional[str] = None
    tokens_used: Optional[int] = None
    confidence_score: Optional[str] = None
    context_data: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class ChatSessionBase(BaseModel):
    title: Optional[str] = None


class ChatSessionCreate(ChatSessionBase):
    pass


class ChatSessionResponse(ChatSessionBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    messages: List[ChatMessageResponse] = []
    
    class Config:
        from_attributes = True


class AIInsightBase(BaseModel):
    insight_type: str  # recommendation, warning, opportunity
    title: str
    description: str
    confidence: int  # 0-100
    priority: str  # high, medium, low
    category: Optional[str] = None


class AIInsightCreate(AIInsightBase):
    related_symbols: Optional[List[str]] = None
    action_items: Optional[List[str]] = None
    expires_at: Optional[datetime] = None


class AIInsightResponse(AIInsightBase):
    id: int
    user_id: int
    related_symbols: Optional[List[str]] = None
    action_items: Optional[List[str]] = None
    is_read: bool
    is_dismissed: bool
    created_at: datetime
    expires_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class AIInsightUpdate(BaseModel):
    is_read: Optional[bool] = None
    is_dismissed: Optional[bool] = None


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[int] = None
    context: Optional[Dict[str, Any]] = None


class ChatResponse(BaseModel):
    message: str
    session_id: int
    message_id: int
    confidence: Optional[float] = None
    suggestions: Optional[List[str]] = None
    related_data: Optional[Dict[str, Any]] = None


class AIAnalysisRequest(BaseModel):
    analysis_type: str  # portfolio, stock, market, risk
    parameters: Dict[str, Any]


class AIAnalysisResponse(BaseModel):
    analysis_type: str
    results: Dict[str, Any]
    confidence: float
    recommendations: List[str]
    warnings: List[str]
    generated_at: datetime


class RiskProfile(BaseModel):
    risk_score: float  # 0-10
    risk_category: str  # conservative, moderate, aggressive
    recommended_allocation: Dict[str, float]
    explanation: str
    factors: List[str]


class InvestmentRecommendation(BaseModel):
    symbol: str
    name: str
    recommendation: str  # buy, sell, hold
    confidence: float
    target_price: Optional[float] = None
    reasoning: str
    risk_level: str
    time_horizon: str