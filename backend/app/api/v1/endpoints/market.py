"""
Market data endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models.user import User
from app.schemas.market import MarketDataResponse, MarketOverview, StockQuote
from app.services.market_data import market_data_service
from app.core.exceptions import ExternalAPIError

router = APIRouter()


@router.get("/overview", response_model=MarketOverview)
async def get_market_overview(current_user: User = Depends(get_current_active_user)):
    """Get market overview with indices and trending stocks"""
    try:
        data = await market_data_service.get_market_overview()
        
        # Convert to response format
        indices = [
            StockQuote(
                symbol=quote["symbol"],
                name=quote["name"],
                price=quote["price"],
                change=quote["change"],
                change_percent=quote["change_percent"],
                volume=str(quote.get("volume", 0)) if quote.get("volume") else None
            )
            for quote in data["indices"]
        ]
        
        trending = [
            StockQuote(
                symbol=quote["symbol"],
                name=quote["name"],
                price=quote["price"],
                change=quote["change"],
                change_percent=quote["change_percent"],
                volume=str(quote.get("volume", 0)) if quote.get("volume") else None,
                market_cap=quote.get("market_cap"),
                pe_ratio=quote.get("pe_ratio")
            )
            for quote in data["trending"]
        ]
        
        return MarketOverview(
            stocks=trending,
            indices=indices,
            trending=trending,
            last_updated=data["last_updated"]
        )
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/quote/{symbol}", response_model=StockQuote)
async def get_stock_quote(
    symbol: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get real-time quote for a specific symbol"""
    try:
        quote = await market_data_service.get_stock_quote(symbol.upper())
        
        return StockQuote(
            symbol=quote["symbol"],
            name=quote["name"],
            price=quote["price"],
            change=quote["change"],
            change_percent=quote["change_percent"],
            volume=str(quote.get("volume", 0)) if quote.get("volume") else None,
            market_cap=quote.get("market_cap"),
            pe_ratio=quote.get("pe_ratio")
        )
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/quotes")
async def get_multiple_quotes(
    symbols: str = Query(..., description="Comma-separated list of symbols"),
    current_user: User = Depends(get_current_active_user)
):
    """Get quotes for multiple symbols"""
    try:
        symbol_list = [s.strip().upper() for s in symbols.split(",")]
        quotes = await market_data_service.get_multiple_quotes(symbol_list)
        
        return {
            "quotes": [
                StockQuote(
                    symbol=quote["symbol"],
                    name=quote["name"],
                    price=quote["price"],
                    change=quote["change"],
                    change_percent=quote["change_percent"],
                    volume=str(quote.get("volume", 0)) if quote.get("volume") else None,
                    market_cap=quote.get("market_cap"),
                    pe_ratio=quote.get("pe_ratio")
                )
                for quote in quotes
            ]
        }
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/historical/{symbol}")
async def get_historical_data(
    symbol: str,
    period: str = Query("1y", description="Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)"),
    current_user: User = Depends(get_current_active_user)
):
    """Get historical price data for a symbol"""
    try:
        data = await market_data_service.get_historical_data(symbol.upper(), period)
        return data
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/search")
async def search_symbols(
    query: str = Query(..., description="Search query"),
    current_user: User = Depends(get_current_active_user)
):
    """Search for stock symbols"""
    try:
        results = await market_data_service.search_symbols(query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Search failed")


@router.get("/sectors")
async def get_sector_performance(current_user: User = Depends(get_current_active_user)):
    """Get sector performance data"""
    try:
        sectors = await market_data_service.get_sector_performance()
        return {"sectors": sectors}
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/crypto")
async def get_crypto_quotes(
    symbols: Optional[str] = Query(None, description="Comma-separated crypto symbols"),
    current_user: User = Depends(get_current_active_user)
):
    """Get cryptocurrency quotes"""
    try:
        symbol_list = None
        if symbols:
            symbol_list = [s.strip().upper() for s in symbols.split(",")]
        
        quotes = await market_data_service.get_crypto_quotes(symbol_list)
        
        return {
            "quotes": [
                StockQuote(
                    symbol=quote["symbol"],
                    name=quote["name"],
                    price=quote["price"],
                    change=quote["change"],
                    change_percent=quote["change_percent"],
                    volume=str(quote.get("volume", 0)) if quote.get("volume") else None
                )
                for quote in quotes
            ]
        }
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/trending")
async def get_trending_stocks(current_user: User = Depends(get_current_active_user)):
    """Get trending stocks"""
    try:
        # Get popular stocks
        trending_symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX']
        quotes = await market_data_service.get_multiple_quotes(trending_symbols)
        
        return {
            "trending": [
                StockQuote(
                    symbol=quote["symbol"],
                    name=quote["name"],
                    price=quote["price"],
                    change=quote["change"],
                    change_percent=quote["change_percent"],
                    volume=str(quote.get("volume", 0)) if quote.get("volume") else None,
                    market_cap=quote.get("market_cap"),
                    pe_ratio=quote.get("pe_ratio")
                )
                for quote in quotes
            ]
        }
    except ExternalAPIError as e:
        raise HTTPException(status_code=502, detail=str(e))