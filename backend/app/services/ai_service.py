"""
AI service for financial advice and analysis
"""
import openai
from typing import Dict, List, Any, Optional
import json
import logging
from datetime import datetime

from app.core.config import settings
from app.core.exceptions import ExternalAPIError
from app.services.market_data import market_data_service
from app.services.news_service import news_service

logger = logging.getLogger(__name__)


class AIService:
    """Service for AI-powered financial analysis and advice"""
    
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
        self.model = settings.DEFAULT_AI_MODEL
        self.max_tokens = settings.MAX_TOKENS
        self.temperature = settings.TEMPERATURE
    
    async def chat_with_advisor(
        self, 
        message: str, 
        context: Optional[Dict[str, Any]] = None,
        chat_history: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """Chat with AI financial advisor"""
        try:
            # Build conversation context
            messages = [
                {
                    "role": "system",
                    "content": self._get_system_prompt()
                }
            ]
            
            # Add chat history if provided
            if chat_history:
                for msg in chat_history[-10:]:  # Last 10 messages for context
                    messages.append({
                        "role": msg["role"],
                        "content": msg["content"]
                    })
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": message
            })
            
            # Get AI response
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            ai_message = response.choices[0].message.content
            
            # Extract suggestions and related data
            suggestions = self._extract_suggestions(ai_message)
            related_data = await self._get_related_data(message, ai_message)
            
            return {
                "message": ai_message,
                "suggestions": suggestions,
                "related_data": related_data,
                "tokens_used": response.usage.total_tokens,
                "model": self.model,
                "confidence": self._calculate_confidence(ai_message)
            }
        
        except Exception as e:
            logger.error(f"Error in AI chat: {str(e)}")
            raise ExternalAPIError("AI service temporarily unavailable")
    
    def _get_system_prompt(self) -> str:
        """Get system prompt for AI financial advisor"""
        return """
        You are CogniWealth AI, an expert financial advisor assistant. You provide helpful, 
        accurate, and educational financial guidance while being clear about limitations.
        
        Guidelines:
        1. Always provide educational information, not personalized financial advice
        2. Encourage users to consult qualified financial advisors for major decisions
        3. Be clear about risks and uncertainties in financial markets
        4. Use data-driven insights when possible
        5. Explain complex concepts in simple terms
        6. Always include appropriate disclaimers
        
        Key areas of expertise:
        - Stock analysis and recommendations
        - Portfolio diversification
        - Risk assessment
        - ETF and mutual fund guidance
        - Market trends and analysis
        - Investment strategies
        
        Always end responses with: "This is educational information only. Please consult 
        with qualified financial advisors before making investment decisions."
        """
    
    def _extract_suggestions(self, ai_message: str) -> List[str]:
        """Extract actionable suggestions from AI response"""
        # Simple keyword-based extraction
        # In production, you might use more sophisticated NLP
        
        suggestions = []
        
        if "consider" in ai_message.lower():
            suggestions.append("Research recommended investments")
        if "diversif" in ai_message.lower():
            suggestions.append("Review portfolio diversification")
        if "risk" in ai_message.lower():
            suggestions.append("Assess your risk tolerance")
        if "etf" in ai_message.lower():
            suggestions.append("Explore ETF options")
        
        return suggestions[:4]  # Limit to 4 suggestions
    
    async def _get_related_data(self, user_message: str, ai_message: str) -> Dict[str, Any]:
        """Get related market data based on conversation"""
        related_data = {}
        
        # Extract mentioned symbols
        symbols = self._extract_symbols_from_text(user_message + " " + ai_message)
        
        if symbols:
            try:
                quotes = await market_data_service.get_multiple_quotes(symbols[:3])
                related_data["quotes"] = quotes
            except Exception as e:
                logger.error(f"Error fetching related quotes: {str(e)}")
        
        return related_data
    
    def _extract_symbols_from_text(self, text: str) -> List[str]:
        """Extract stock symbols from text"""
        # Simple symbol extraction
        common_symbols = {
            'apple': 'AAPL',
            'microsoft': 'MSFT',
            'google': 'GOOGL',
            'amazon': 'AMZN',
            'tesla': 'TSLA',
            'nvidia': 'NVDA',
            'meta': 'META',
            'netflix': 'NFLX'
        }
        
        text_lower = text.lower()
        found_symbols = []
        
        for keyword, symbol in common_symbols.items():
            if keyword in text_lower:
                found_symbols.append(symbol)
        
        return list(set(found_symbols))
    
    def _calculate_confidence(self, message: str) -> float:
        """Calculate confidence score for AI response"""
        # Simple confidence calculation based on message characteristics
        confidence = 0.7  # Base confidence
        
        if "uncertain" in message.lower() or "might" in message.lower():
            confidence -= 0.2
        if "data shows" in message.lower() or "analysis indicates" in message.lower():
            confidence += 0.2
        if len(message) > 200:  # Longer, more detailed responses
            confidence += 0.1
        
        return min(max(confidence, 0.0), 1.0)
    
    async def analyze_portfolio(self, portfolio_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze portfolio and provide AI insights"""
        try:
            # Prepare portfolio summary for AI
            portfolio_summary = self._prepare_portfolio_summary(portfolio_data)
            
            prompt = f"""
            Analyze this investment portfolio and provide insights:
            
            Portfolio Summary:
            {json.dumps(portfolio_summary, indent=2)}
            
            Please provide:
            1. Overall portfolio assessment
            2. Diversification analysis
            3. Risk evaluation
            4. Specific recommendations
            5. Areas for improvement
            
            Format your response as a structured analysis.
            """
            
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._get_system_prompt()},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.3  # Lower temperature for analysis
            )
            
            analysis = response.choices[0].message.content
            
            return {
                "analysis": analysis,
                "recommendations": self._extract_recommendations(analysis),
                "risk_score": self._calculate_portfolio_risk(portfolio_data),
                "diversification_score": self._calculate_diversification(portfolio_data),
                "generated_at": datetime.now()
            }
        
        except Exception as e:
            logger.error(f"Error analyzing portfolio: {str(e)}")
            raise ExternalAPIError("Portfolio analysis failed")
    
    def _prepare_portfolio_summary(self, portfolio_data: Dict[str, Any]) -> Dict[str, Any]:
        """Prepare portfolio data for AI analysis"""
        return {
            "total_value": portfolio_data.get("total_value", 0),
            "total_gain_loss": portfolio_data.get("total_gain_loss", 0),
            "positions_count": len(portfolio_data.get("holdings", [])),
            "top_holdings": [
                {
                    "symbol": holding["symbol"],
                    "name": holding["name"],
                    "percentage": (holding["total_value"] / portfolio_data.get("total_value", 1)) * 100,
                    "gain_loss_percent": holding["gain_loss_percent"]
                }
                for holding in portfolio_data.get("holdings", [])[:5]
            ]
        }
    
    def _extract_recommendations(self, analysis: str) -> List[str]:
        """Extract specific recommendations from analysis"""
        # Simple extraction - in production, use more sophisticated NLP
        recommendations = []
        
        lines = analysis.split('\n')
        for line in lines:
            if any(word in line.lower() for word in ['recommend', 'suggest', 'consider', 'should']):
                recommendations.append(line.strip())
        
        return recommendations[:5]  # Limit to 5 recommendations
    
    def _calculate_portfolio_risk(self, portfolio_data: Dict[str, Any]) -> float:
        """Calculate portfolio risk score (0-10)"""
        # Simplified risk calculation
        holdings = portfolio_data.get("holdings", [])
        
        if not holdings:
            return 5.0
        
        # Factor in diversification
        diversification_factor = min(len(holdings) / 10, 1.0)  # More holdings = lower risk
        
        # Factor in volatility (simplified)
        volatility_factor = 0.5  # Default moderate volatility
        
        # Factor in sector concentration
        sectors = set(holding.get("asset_type", "stock") for holding in holdings)
        sector_factor = min(len(sectors) / 5, 1.0)
        
        # Calculate risk score (lower is better)
        risk_score = 10 - (diversification_factor * 3 + sector_factor * 3 + (1 - volatility_factor) * 4)
        
        return max(min(risk_score, 10.0), 0.0)
    
    def _calculate_diversification(self, portfolio_data: Dict[str, Any]) -> float:
        """Calculate diversification score (0-100)"""
        holdings = portfolio_data.get("holdings", [])
        
        if not holdings:
            return 0.0
        
        total_value = portfolio_data.get("total_value", 1)
        
        # Calculate concentration (Herfindahl index)
        concentrations = []
        for holding in holdings:
            weight = holding["total_value"] / total_value
            concentrations.append(weight ** 2)
        
        herfindahl_index = sum(concentrations)
        
        # Convert to diversification score (0-100)
        # Perfect diversification (equal weights) gives score of 100
        max_diversification = 1 / len(holdings)
        diversification_score = (1 - (herfindahl_index - max_diversification) / (1 - max_diversification)) * 100
        
        return max(min(diversification_score, 100.0), 0.0)
    
    async def get_investment_recommendation(self, symbol: str, user_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Get AI investment recommendation for a specific symbol"""
        try:
            # Get current market data
            quote = await market_data_service.get_stock_quote(symbol)
            
            # Get recent news
            news = await news_service.get_symbol_news(symbol, days=7)
            
            # Prepare context for AI
            context = {
                "symbol": symbol,
                "current_price": quote["price"],
                "change_percent": quote["change_percent"],
                "market_cap": quote.get("market_cap"),
                "pe_ratio": quote.get("pe_ratio"),
                "recent_news_sentiment": self._analyze_news_sentiment(news),
                "user_risk_tolerance": user_profile.get("risk_tolerance", "moderate"),
                "user_experience": user_profile.get("investment_experience", "beginner")
            }
            
            prompt = f"""
            Provide an investment recommendation for {symbol} based on:
            
            Current Data:
            {json.dumps(context, indent=2)}
            
            Consider:
            1. Current valuation
            2. Recent performance
            3. News sentiment
            4. User's risk tolerance: {user_profile.get('risk_tolerance', 'moderate')}
            5. User's experience level: {user_profile.get('investment_experience', 'beginner')}
            
            Provide a clear recommendation (Buy/Hold/Sell) with reasoning.
            """
            
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._get_system_prompt()},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.3
            )
            
            recommendation_text = response.choices[0].message.content
            
            return {
                "symbol": symbol,
                "recommendation": self._extract_recommendation_action(recommendation_text),
                "reasoning": recommendation_text,
                "confidence": self._calculate_confidence(recommendation_text),
                "risk_level": self._assess_risk_level(context),
                "time_horizon": self._suggest_time_horizon(user_profile),
                "generated_at": datetime.now()
            }
        
        except Exception as e:
            logger.error(f"Error getting recommendation for {symbol}: {str(e)}")
            raise ExternalAPIError(f"Failed to generate recommendation for {symbol}")
    
    def _analyze_news_sentiment(self, news_articles: List[Dict[str, Any]]) -> str:
        """Analyze overall sentiment from news articles"""
        if not news_articles:
            return "neutral"
        
        sentiments = [article.get("sentiment", "neutral") for article in news_articles]
        positive_count = sentiments.count("positive")
        negative_count = sentiments.count("negative")
        
        if positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"
    
    def _extract_recommendation_action(self, text: str) -> str:
        """Extract buy/hold/sell recommendation from text"""
        text_lower = text.lower()
        
        if "buy" in text_lower or "purchase" in text_lower:
            return "buy"
        elif "sell" in text_lower:
            return "sell"
        else:
            return "hold"
    
    def _assess_risk_level(self, context: Dict[str, Any]) -> str:
        """Assess risk level based on context"""
        # Simplified risk assessment
        pe_ratio = context.get("pe_ratio", 20)
        change_percent = abs(context.get("change_percent", 0))
        
        if pe_ratio > 30 or change_percent > 5:
            return "high"
        elif pe_ratio > 20 or change_percent > 2:
            return "medium"
        else:
            return "low"
    
    def _suggest_time_horizon(self, user_profile: Dict[str, Any]) -> str:
        """Suggest investment time horizon based on user profile"""
        risk_tolerance = user_profile.get("risk_tolerance", "moderate")
        experience = user_profile.get("investment_experience", "beginner")
        
        if risk_tolerance == "aggressive" and experience == "advanced":
            return "short-term"
        elif risk_tolerance == "conservative":
            return "long-term"
        else:
            return "medium-term"


# Global instance
ai_service = AIService()