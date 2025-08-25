"""
Chat and AI interaction models
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Session details
    title = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    
    # Message details
    message_type = Column(String, nullable=False)  # user, ai
    content = Column(Text, nullable=False)
    
    # AI metadata
    model_used = Column(String, nullable=True)
    tokens_used = Column(Integer, nullable=True)
    confidence_score = Column(String, nullable=True)
    context_data = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    session = relationship("ChatSession", back_populates="messages")


class AIInsight(Base):
    __tablename__ = "ai_insights"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Insight details
    insight_type = Column(String, nullable=False)  # recommendation, warning, opportunity
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    
    # AI metadata
    confidence = Column(Integer, nullable=False)  # 0-100
    priority = Column(String, nullable=False)  # high, medium, low
    category = Column(String, nullable=True)  # portfolio, market, risk
    
    # Related data
    related_symbols = Column(JSON, nullable=True)
    action_items = Column(JSON, nullable=True)
    
    # Status
    is_read = Column(Boolean, default=False)
    is_dismissed = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User")