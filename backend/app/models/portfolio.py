"""
Portfolio and related models
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Portfolio(Base):
    __tablename__ = "portfolios"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False, default="My Portfolio")
    description = Column(Text, nullable=True)
    
    # Portfolio metrics
    total_value = Column(Float, default=0.0)
    total_invested = Column(Float, default=0.0)
    total_gain_loss = Column(Float, default=0.0)
    total_gain_loss_percent = Column(Float, default=0.0)
    
    # Risk metrics
    risk_score = Column(Float, nullable=True)
    diversification_score = Column(Float, nullable=True)
    
    # Settings
    is_active = Column(Boolean, default=True)
    is_public = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="portfolios")
    holdings = relationship("Holding", back_populates="portfolio")


class Holding(Base):
    __tablename__ = "holdings"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    
    # Asset information
    symbol = Column(String, nullable=False, index=True)
    asset_type = Column(String, nullable=False)  # stock, etf, crypto, bond
    name = Column(String, nullable=False)
    
    # Position details
    shares = Column(Float, nullable=False)
    average_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False)
    
    # Calculated values
    total_value = Column(Float, nullable=False)
    gain_loss = Column(Float, nullable=False)
    gain_loss_percent = Column(Float, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    portfolio = relationship("Portfolio", back_populates="holdings")
    transactions = relationship("Transaction", back_populates="holding")


class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    holding_id = Column(Integer, ForeignKey("holdings.id"), nullable=False)
    
    # Transaction details
    transaction_type = Column(String, nullable=False)  # buy, sell
    shares = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    fees = Column(Float, default=0.0)
    
    # Metadata
    notes = Column(Text, nullable=True)
    transaction_date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    holding = relationship("Holding", back_populates="transactions")