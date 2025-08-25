"""
News service for fetching and analyzing financial news
"""
import aiohttp
import asyncio
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import logging
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from app.core.config import settings
from app.core.exceptions import ExternalAPIError

logger = logging.getLogger(__name__)


class NewsService:
    """Service for fetching and analyzing financial news"""
    
    def __init__(self):
        self.news_api_key = settings.NEWS_API_KEY
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
    
    async def get_financial_news(
        self, 
        category: str = "business",
        page: int = 1,
        page_size: int = 20,
        search_query: Optional[str] = None
    ) -> Dict[str, Any]:
        """Fetch financial news from News API"""
        try:
            url = "https://newsapi.org/v2/top-headlines"
            params = {
                'apiKey': self.news_api_key,
                'category': category,
                'language': 'en',
                'page': page,
                'pageSize': page_size
            }
            
            if search_query:
                params['q'] = search_query
                url = "https://newsapi.org/v2/everything"
                params['sortBy'] = 'publishedAt'
                params['from'] = (datetime.now() - timedelta(days=7)).isoformat()
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params) as response:
                    if response.status != 200:
                        raise ExternalAPIError(f"News API error: {response.status}")
                    
                    data = await response.json()
                    
                    if data.get('status') != 'ok':
                        raise ExternalAPIError(f"News API error: {data.get('message')}")
                    
                    # Process articles with sentiment analysis
                    articles = []
                    for article in data.get('articles', []):
                        processed_article = await self._process_article(article)
                        articles.append(processed_article)
                    
                    return {
                        'articles': articles,
                        'total_results': data.get('totalResults', 0),
                        'page': page,
                        'page_size': page_size
                    }
        
        except Exception as e:
            logger.error(f"Error fetching news: {str(e)}")
            raise ExternalAPIError("Failed to fetch financial news")
    
    async def _process_article(self, article: Dict[str, Any]) -> Dict[str, Any]:
        """Process article with sentiment analysis"""
        title = article.get('title', '')
        description = article.get('description', '')
        content = f"{title} {description}"
        
        # Perform sentiment analysis
        sentiment_data = self.analyze_sentiment(content)
        
        # Extract related symbols (simplified)
        related_symbols = self._extract_symbols(content)
        
        return {
            'title': title,
            'description': description,
            'url': article.get('url'),
            'source': article.get('source', {}).get('name'),
            'author': article.get('author'),
            'published_at': article.get('publishedAt'),
            'image_url': article.get('urlToImage'),
            'sentiment': sentiment_data['sentiment'],
            'sentiment_score': sentiment_data['score'],
            'confidence': sentiment_data['confidence'],
            'related_symbols': related_symbols,
            'impact_level': self._determine_impact_level(sentiment_data, related_symbols)
        }
    
    def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        """Analyze sentiment of text"""
        if not text:
            return {
                'sentiment': 'neutral',
                'score': 0.0,
                'confidence': 0.0
            }
        
        # Use VADER sentiment analyzer
        vader_scores = self.sentiment_analyzer.polarity_scores(text)
        compound_score = vader_scores['compound']
        
        # Determine sentiment
        if compound_score >= 0.05:
            sentiment = 'positive'
        elif compound_score <= -0.05:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        # Use TextBlob for additional analysis
        blob = TextBlob(text)
        textblob_polarity = blob.sentiment.polarity
        
        # Combine scores
        final_score = (compound_score + textblob_polarity) / 2
        confidence = abs(final_score)
        
        return {
            'sentiment': sentiment,
            'score': final_score,
            'confidence': min(confidence, 1.0)
        }
    
    def _extract_symbols(self, text: str) -> List[str]:
        """Extract stock symbols from text (simplified)"""
        # This is a simplified implementation
        # In production, you'd want a more sophisticated NLP approach
        
        common_symbols = {
            'apple': 'AAPL',
            'microsoft': 'MSFT',
            'google': 'GOOGL',
            'alphabet': 'GOOGL',
            'amazon': 'AMZN',
            'tesla': 'TSLA',
            'nvidia': 'NVDA',
            'meta': 'META',
            'facebook': 'META',
            'netflix': 'NFLX',
            'bitcoin': 'BTC-USD',
            'ethereum': 'ETH-USD'
        }
        
        text_lower = text.lower()
        found_symbols = []
        
        for keyword, symbol in common_symbols.items():
            if keyword in text_lower:
                found_symbols.append(symbol)
        
        return list(set(found_symbols))  # Remove duplicates
    
    def _determine_impact_level(self, sentiment_data: Dict[str, Any], related_symbols: List[str]) -> str:
        """Determine the impact level of news"""
        confidence = sentiment_data['confidence']
        has_symbols = len(related_symbols) > 0
        
        if confidence > 0.7 and has_symbols:
            return 'high'
        elif confidence > 0.4 or has_symbols:
            return 'medium'
        else:
            return 'low'
    
    async def get_market_sentiment(self) -> Dict[str, Any]:
        """Get overall market sentiment from recent news"""
        try:
            # Fetch recent financial news
            news_data = await self.get_financial_news(
                search_query="stock market finance economy",
                page_size=50
            )
            
            articles = news_data['articles']
            
            if not articles:
                return {
                    'overall_sentiment': 'neutral',
                    'sentiment_score': 0.0,
                    'positive_percentage': 33.3,
                    'negative_percentage': 33.3,
                    'neutral_percentage': 33.3,
                    'total_articles': 0
                }
            
            # Analyze sentiment distribution
            sentiments = [article['sentiment'] for article in articles]
            positive_count = sentiments.count('positive')
            negative_count = sentiments.count('negative')
            neutral_count = sentiments.count('neutral')
            total_count = len(sentiments)
            
            positive_pct = (positive_count / total_count) * 100
            negative_pct = (negative_count / total_count) * 100
            neutral_pct = (neutral_count / total_count) * 100
            
            # Calculate overall sentiment
            avg_score = sum(article['sentiment_score'] for article in articles) / total_count
            
            if avg_score > 0.1:
                overall_sentiment = 'positive'
            elif avg_score < -0.1:
                overall_sentiment = 'negative'
            else:
                overall_sentiment = 'neutral'
            
            return {
                'overall_sentiment': overall_sentiment,
                'sentiment_score': avg_score,
                'positive_percentage': positive_pct,
                'negative_percentage': negative_pct,
                'neutral_percentage': neutral_pct,
                'total_articles': total_count,
                'last_updated': datetime.now()
            }
        
        except Exception as e:
            logger.error(f"Error calculating market sentiment: {str(e)}")
            raise ExternalAPIError("Failed to calculate market sentiment")
    
    async def get_symbol_news(self, symbol: str, days: int = 7) -> List[Dict[str, Any]]:
        """Get news related to a specific symbol"""
        try:
            # Search for news mentioning the symbol
            company_names = {
                'AAPL': 'Apple',
                'MSFT': 'Microsoft',
                'GOOGL': 'Google Alphabet',
                'AMZN': 'Amazon',
                'TSLA': 'Tesla',
                'NVDA': 'NVIDIA',
                'META': 'Meta Facebook',
                'NFLX': 'Netflix'
            }
            
            search_query = company_names.get(symbol, symbol)
            
            news_data = await self.get_financial_news(
                search_query=search_query,
                page_size=20
            )
            
            # Filter articles that actually mention the symbol
            relevant_articles = []
            for article in news_data['articles']:
                if symbol in article['related_symbols']:
                    relevant_articles.append(article)
            
            return relevant_articles
        
        except Exception as e:
            logger.error(f"Error fetching news for {symbol}: {str(e)}")
            return []


# Global instance
news_service = NewsService()