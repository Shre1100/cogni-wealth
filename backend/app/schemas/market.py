"""
Market data schemas
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class MarketDataBase(BaseModel):
    symbol: str
    asset_type: str
    name: str
    current_price: float
    price_change: Optional[float] = None
    price_change_percent: Optional[float] = None
    volume: Optional[float] = None


class MarketDataResponse(MarketDataBase):
    id: int
    open_price: Optional[float] = None
    high_price: Optional[float] = None
    low_price: Optional[float] = None
    previous_close: Optional[float] = None
    market_cap: Optional[float] = None
    pe_ratio: Optional[float] = None
    dividend_yield: Optional[float] = None
    fifty_two_week_high: Optional[float] = None
    fifty_two_week_low: Optional[float] = None
    data_source: str
    last_updated: datetime
    
    class Config:
        from_attributes = True


class StockQuote(BaseModel):
    symbol: str
    name: str
    price: float
    change: float
    change_percent: float
    volume: Optional[str] = None
    market_cap: Optional[float] = None
    pe_ratio: Optional[float] = None


class MarketOverview(BaseModel):
    stocks: List[StockQuote]
    indices: List[StockQuote]
    trending: List[StockQuote]
    last_updated: datetime


class NewsArticleBase(BaseModel):
    title: str
    summary: Optional[str] = None
    url: str
    source: str
    author: Optional[str] = None
    category: Optional[str] = None


class NewsArticleResponse(NewsArticleBase):
    id: int
    content: Optional[str] = None
    related_symbols: Optional[List[str]] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    impact_level: Optional[str] = None
    published_at: datetime
    created_at: datetime
    is_processed: bool
    
    class Config:
        from_attributes = True


class NewsFeed(BaseModel):
    articles: List[NewsArticleResponse]
    total_count: int
    page: int
    per_page: int
    has_next: bool


class SentimentAnalysis(BaseModel):
    sentiment: str  # positive, negative, neutral
    confidence: float  # 0-1
    score: float  # -1 to 1
    keywords: List[str]


class MarketSentiment(BaseModel):
    overall_sentiment: str
    sentiment_score: float
    positive_percentage: float
    negative_percentage: float
    neutral_percentage: float
    trending_topics: List[str]
    last_updated: datetime


class NotificationBase(BaseModel):
    title: str
    message: str
    notification_type: str
    priority: str = "medium"


class NotificationCreate(NotificationBase):
    related_data: Optional[Dict[str, Any]] = None
    action_url: Optional[str] = None


class NotificationResponse(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    is_dismissed: bool
    related_data: Optional[Dict[str, Any]] = None
    action_url: Optional[str] = None
    created_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None
    is_dismissed: Optional[bool] = None