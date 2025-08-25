"""
User model
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    
    # Profile settings
    risk_tolerance = Column(String, default="moderate")  # conservative, moderate, aggressive
    investment_experience = Column(String, default="beginner")  # beginner, intermediate, advanced
    preferred_currency = Column(String, default="USD")
    
    # Account status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_email_verified = Column(Boolean, default=False)
    is_phone_verified = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    portfolios = relationship("Portfolio", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")
    notifications = relationship("Notification", back_populates="user")