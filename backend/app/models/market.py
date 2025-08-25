"""
Market data and news models
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, JSON
from sqlalchemy.sql import func
from app.core.database import Base


class MarketData(Base):
    __tablename__ = "market_data"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Asset information
    symbol = Column(String, nullable=False, index=True)
    asset_type = Column(String, nullable=False)  # stock, etf, crypto, forex
    name = Column(String, nullable=False)
    
    # Price data
    current_price = Column(Float, nullable=False)
    open_price = Column(Float, nullable=True)
    high_price = Column(Float, nullable=True)
    low_price = Column(Float, nullable=True)
    previous_close = Column(Float, nullable=True)
    
    # Change metrics
    price_change = Column(Float, nullable=True)
    price_change_percent = Column(Float, nullable=True)
    
    # Volume and market cap
    volume = Column(Float, nullable=True)
    market_cap = Column(Float, nullable=True)
    
    # Additional metrics
    pe_ratio = Column(Float, nullable=True)
    dividend_yield = Column(Float, nullable=True)
    fifty_two_week_high = Column(Float, nullable=True)
    fifty_two_week_low = Column(Float, nullable=True)
    
    # Metadata
    data_source = Column(String, nullable=False)
    last_updated = Column(DateTime(timezone=True), server_default=func.now())


class NewsArticle(Base):
    __tablename__ = "news_articles"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Article details
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    url = Column(String, nullable=False)
    source = Column(String, nullable=False)
    author = Column(String, nullable=True)
    
    # Categorization
    category = Column(String, nullable=True)
    related_symbols = Column(JSON, nullable=True)
    
    # Sentiment analysis
    sentiment = Column(String, nullable=True)  # positive, negative, neutral
    sentiment_score = Column(Float, nullable=True)  # -1 to 1
    impact_level = Column(String, nullable=True)  # high, medium, low
    
    # Timestamps
    published_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Status
    is_processed = Column(Boolean, default=False)


class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Notification details
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String, nullable=False)  # alert, achievement, market, portfolio
    priority = Column(String, nullable=False, default="medium")  # high, medium, low
    
    # Status
    is_read = Column(Boolean, default=False)
    is_dismissed = Column(Boolean, default=False)
    
    # Related data
    related_data = Column(JSON, nullable=True)
    action_url = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    read_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="notifications")