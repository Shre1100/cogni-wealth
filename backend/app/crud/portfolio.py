"""
Portfolio CRUD operations
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.models.portfolio import Portfolio, Holding, Transaction
from app.schemas.portfolio import PortfolioCreate, PortfolioUpdate, HoldingCreate, TransactionCreate


async def get_portfolio(db: AsyncSession, portfolio_id: int) -> Optional[Portfolio]:
    """Get portfolio by ID"""
    result = await db.execute(
        select(Portfolio)
        .options(selectinload(Portfolio.holdings))
        .where(Portfolio.id == portfolio_id)
    )
    return result.scalar_one_or_none()


async def get_user_portfolios(db: AsyncSession, user_id: int) -> List[Portfolio]:
    """Get all portfolios for a user"""
    result = await db.execute(
        select(Portfolio)
        .options(selectinload(Portfolio.holdings))
        .where(Portfolio.user_id == user_id)
        .where(Portfolio.is_active == True)
    )
    return result.scalars().all()


async def create_portfolio(db: AsyncSession, user_id: int, portfolio: PortfolioCreate) -> Portfolio:
    """Create new portfolio"""
    db_portfolio = Portfolio(
        user_id=user_id,
        name=portfolio.name,
        description=portfolio.description,
        is_public=portfolio.is_public,
    )
    db.add(db_portfolio)
    await db.commit()
    await db.refresh(db_portfolio)
    return db_portfolio


async def update_portfolio(db: AsyncSession, portfolio_id: int, portfolio_update: PortfolioUpdate) -> Optional[Portfolio]:
    """Update portfolio"""
    result = await db.execute(
        select(Portfolio).where(Portfolio.id == portfolio_id)
    )
    db_portfolio = result.scalar_one_or_none()
    
    if not db_portfolio:
        return None
    
    update_data = portfolio_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_portfolio, field, value)
    
    await db.commit()
    await db.refresh(db_portfolio)
    return db_portfolio


async def delete_portfolio(db: AsyncSession, portfolio_id: int) -> bool:
    """Delete portfolio (soft delete)"""
    result = await db.execute(
        select(Portfolio).where(Portfolio.id == portfolio_id)
    )
    db_portfolio = result.scalar_one_or_none()
    
    if not db_portfolio:
        return False
    
    db_portfolio.is_active = False
    await db.commit()
    return True


async def get_holding(db: AsyncSession, holding_id: int) -> Optional[Holding]:
    """Get holding by ID"""
    result = await db.execute(
        select(Holding).where(Holding.id == holding_id)
    )
    return result.scalar_one_or_none()


async def create_holding(db: AsyncSession, portfolio_id: int, holding: HoldingCreate) -> Holding:
    """Create new holding"""
    db_holding = Holding(
        portfolio_id=portfolio_id,
        symbol=holding.symbol,
        asset_type=holding.asset_type,
        name=holding.name,
        shares=holding.shares,
        average_price=holding.average_price,
        current_price=holding.average_price,  # Initial price
        total_value=holding.shares * holding.average_price,
        gain_loss=0.0,
        gain_loss_percent=0.0,
    )
    db.add(db_holding)
    await db.commit()
    await db.refresh(db_holding)
    return db_holding


async def update_holding_price(db: AsyncSession, holding_id: int, current_price: float) -> Optional[Holding]:
    """Update holding current price and calculated values"""
    result = await db.execute(
        select(Holding).where(Holding.id == holding_id)
    )
    db_holding = result.scalar_one_or_none()
    
    if not db_holding:
        return None
    
    db_holding.current_price = current_price
    db_holding.total_value = db_holding.shares * current_price
    db_holding.gain_loss = db_holding.total_value - (db_holding.shares * db_holding.average_price)
    db_holding.gain_loss_percent = (db_holding.gain_loss / (db_holding.shares * db_holding.average_price)) * 100
    
    await db.commit()
    await db.refresh(db_holding)
    return db_holding


async def create_transaction(db: AsyncSession, holding_id: int, transaction: TransactionCreate) -> Transaction:
    """Create new transaction"""
    total_amount = transaction.shares * transaction.price + transaction.fees
    
    db_transaction = Transaction(
        holding_id=holding_id,
        transaction_type=transaction.transaction_type,
        shares=transaction.shares,
        price=transaction.price,
        total_amount=total_amount,
        fees=transaction.fees,
        notes=transaction.notes,
    )
    db.add(db_transaction)
    await db.commit()
    await db.refresh(db_transaction)
    return db_transaction


async def get_portfolio_summary(db: AsyncSession, portfolio_id: int) -> dict:
    """Get portfolio summary statistics"""
    result = await db.execute(
        select(
            func.sum(Holding.total_value).label('total_value'),
            func.sum(Holding.shares * Holding.average_price).label('total_invested'),
            func.sum(Holding.gain_loss).label('total_gain_loss'),
            func.count(Holding.id).label('positions_count')
        )
        .where(Holding.portfolio_id == portfolio_id)
    )
    
    summary = result.first()
    
    total_value = summary.total_value or 0.0
    total_invested = summary.total_invested or 0.0
    total_gain_loss = summary.total_gain_loss or 0.0
    positions_count = summary.positions_count or 0
    
    total_gain_loss_percent = (total_gain_loss / total_invested * 100) if total_invested > 0 else 0.0
    
    return {
        'total_value': total_value,
        'total_invested': total_invested,
        'total_gain_loss': total_gain_loss,
        'total_gain_loss_percent': total_gain_loss_percent,
        'positions_count': positions_count
    }