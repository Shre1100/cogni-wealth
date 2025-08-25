"""
Portfolio schemas
"""
from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime


class HoldingBase(BaseModel):
    symbol: str
    asset_type: str
    name: str
    shares: float
    average_price: float
    
    @validator('shares')
    def validate_shares(cls, v):
        if v <= 0:
            raise ValueError('Shares must be greater than 0')
        return v
    
    @validator('average_price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Price must be greater than 0')
        return v


class HoldingCreate(HoldingBase):
    pass


class HoldingUpdate(BaseModel):
    shares: Optional[float] = None
    average_price: Optional[float] = None


class HoldingResponse(HoldingBase):
    id: int
    portfolio_id: int
    current_price: float
    total_value: float
    gain_loss: float
    gain_loss_percent: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class TransactionBase(BaseModel):
    transaction_type: str
    shares: float
    price: float
    fees: Optional[float] = 0.0
    notes: Optional[str] = None
    
    @validator('transaction_type')
    def validate_transaction_type(cls, v):
        if v not in ['buy', 'sell']:
            raise ValueError('Transaction type must be buy or sell')
        return v


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    holding_id: int
    total_amount: float
    transaction_date: datetime
    
    class Config:
        from_attributes = True


class PortfolioBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = False


class PortfolioCreate(PortfolioBase):
    pass


class PortfolioUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None


class PortfolioSummary(BaseModel):
    total_value: float
    total_invested: float
    total_gain_loss: float
    total_gain_loss_percent: float
    risk_score: Optional[float] = None
    diversification_score: Optional[float] = None
    positions_count: int


class PortfolioAllocation(BaseModel):
    category: str
    percentage: float
    value: float
    color: str


class PortfolioResponse(PortfolioBase):
    id: int
    user_id: int
    total_value: float
    total_invested: float
    total_gain_loss: float
    total_gain_loss_percent: float
    risk_score: Optional[float] = None
    diversification_score: Optional[float] = None
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    holdings: List[HoldingResponse] = []
    
    class Config:
        from_attributes = True


class PortfolioPerformance(BaseModel):
    daily_return: float
    weekly_return: float
    monthly_return: float
    yearly_return: float
    total_return: float
    volatility: float
    sharpe_ratio: Optional[float] = None
    max_drawdown: float