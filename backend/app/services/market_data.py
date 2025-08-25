"""
Market data service for fetching real-time and historical data
"""
import yfinance as yf
import asyncio
import aiohttp
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import logging

from app.core.config import settings
from app.core.exceptions import ExternalAPIError

logger = logging.getLogger(__name__)


class MarketDataService:
    """Service for fetching market data from various sources"""
    
    def __init__(self):
        self.alpha_vantage_key = settings.ALPHA_VANTAGE_API_KEY
        self.finnhub_key = settings.FINNHUB_API_KEY
    
    async def get_stock_quote(self, symbol: str) -> Dict[str, Any]:
        """Get real-time stock quote"""
        try:
            # Use yfinance for quick quotes
            ticker = yf.Ticker(symbol)
            info = ticker.info
            
            return {
                'symbol': symbol,
                'name': info.get('longName', symbol),
                'price': info.get('currentPrice', 0),
                'change': info.get('regularMarketChange', 0),
                'change_percent': info.get('regularMarketChangePercent', 0),
                'volume': info.get('volume', 0),
                'market_cap': info.get('marketCap'),
                'pe_ratio': info.get('trailingPE'),
                'dividend_yield': info.get('dividendYield'),
                'fifty_two_week_high': info.get('fiftyTwoWeekHigh'),
                'fifty_two_week_low': info.get('fiftyTwoWeekLow'),
                'last_updated': datetime.now()
            }
        except Exception as e:
            logger.error(f"Error fetching quote for {symbol}: {str(e)}")
            raise ExternalAPIError(f"Failed to fetch quote for {symbol}")
    
    async def get_multiple_quotes(self, symbols: List[str]) -> List[Dict[str, Any]]:
        """Get quotes for multiple symbols"""
        tasks = [self.get_stock_quote(symbol) for symbol in symbols]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        quotes = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                logger.error(f"Error fetching quote for {symbols[i]}: {str(result)}")
                continue
            quotes.append(result)
        
        return quotes
    
    async def get_historical_data(self, symbol: str, period: str = "1y") -> Dict[str, Any]:
        """Get historical price data"""
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period=period)
            
            if hist.empty:
                raise ExternalAPIError(f"No historical data found for {symbol}")
            
            # Convert to list of dictionaries
            data = []
            for date, row in hist.iterrows():
                data.append({
                    'date': date.isoformat(),
                    'open': row['Open'],
                    'high': row['High'],
                    'low': row['Low'],
                    'close': row['Close'],
                    'volume': row['Volume']
                })
            
            return {
                'symbol': symbol,
                'period': period,
                'data': data
            }
        except Exception as e:
            logger.error(f"Error fetching historical data for {symbol}: {str(e)}")
            raise ExternalAPIError(f"Failed to fetch historical data for {symbol}")
    
    async def get_market_overview(self) -> Dict[str, Any]:
        """Get market overview with major indices and trending stocks"""
        try:
            # Major indices
            indices_symbols = ['^GSPC', '^IXIC', '^DJI', '^RUT']  # S&P 500, NASDAQ, DOW, Russell 2000
            indices = await self.get_multiple_quotes(indices_symbols)
            
            # Trending stocks (popular stocks)
            trending_symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX']
            trending = await self.get_multiple_quotes(trending_symbols)
            
            return {
                'indices': indices,
                'trending': trending,
                'last_updated': datetime.now()
            }
        except Exception as e:
            logger.error(f"Error fetching market overview: {str(e)}")
            raise ExternalAPIError("Failed to fetch market overview")
    
    async def search_symbols(self, query: str) -> List[Dict[str, Any]]:
        """Search for stock symbols"""
        try:
            # Use yfinance to search for symbols
            # This is a simplified implementation
            # In production, you might want to use a dedicated search API
            
            # For now, return some common matches
            common_stocks = {
                'apple': {'symbol': 'AAPL', 'name': 'Apple Inc.'},
                'microsoft': {'symbol': 'MSFT', 'name': 'Microsoft Corporation'},
                'google': {'symbol': 'GOOGL', 'name': 'Alphabet Inc.'},
                'amazon': {'symbol': 'AMZN', 'name': 'Amazon.com Inc.'},
                'tesla': {'symbol': 'TSLA', 'name': 'Tesla Inc.'},
                'nvidia': {'symbol': 'NVDA', 'name': 'NVIDIA Corporation'},
                'meta': {'symbol': 'META', 'name': 'Meta Platforms Inc.'},
                'netflix': {'symbol': 'NFLX', 'name': 'Netflix Inc.'},
            }
            
            results = []
            query_lower = query.lower()
            
            for key, stock in common_stocks.items():
                if query_lower in key or query_lower in stock['symbol'].lower():
                    results.append(stock)
            
            return results
        except Exception as e:
            logger.error(f"Error searching symbols: {str(e)}")
            return []
    
    async def get_sector_performance(self) -> List[Dict[str, Any]]:
        """Get sector performance data"""
        try:
            # Sector ETFs as proxies for sector performance
            sector_etfs = {
                'XLK': 'Technology',
                'XLF': 'Financial',
                'XLV': 'Healthcare',
                'XLE': 'Energy',
                'XLI': 'Industrial',
                'XLY': 'Consumer Discretionary',
                'XLP': 'Consumer Staples',
                'XLU': 'Utilities',
                'XLB': 'Materials',
                'XLRE': 'Real Estate',
                'XLC': 'Communication Services'
            }
            
            quotes = await self.get_multiple_quotes(list(sector_etfs.keys()))
            
            sectors = []
            for quote in quotes:
                if quote['symbol'] in sector_etfs:
                    sectors.append({
                        'sector': sector_etfs[quote['symbol']],
                        'symbol': quote['symbol'],
                        'price': quote['price'],
                        'change': quote['change'],
                        'change_percent': quote['change_percent']
                    })
            
            return sectors
        except Exception as e:
            logger.error(f"Error fetching sector performance: {str(e)}")
            raise ExternalAPIError("Failed to fetch sector performance")
    
    async def get_crypto_quotes(self, symbols: List[str] = None) -> List[Dict[str, Any]]:
        """Get cryptocurrency quotes"""
        if symbols is None:
            symbols = ['BTC-USD', 'ETH-USD', 'ADA-USD', 'DOT-USD', 'LINK-USD']
        
        try:
            quotes = await self.get_multiple_quotes(symbols)
            return quotes
        except Exception as e:
            logger.error(f"Error fetching crypto quotes: {str(e)}")
            raise ExternalAPIError("Failed to fetch cryptocurrency quotes")


# Global instance
market_data_service = MarketDataService()