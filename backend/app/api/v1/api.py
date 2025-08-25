"""
Main API router
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, portfolio, market, news, chat, insights

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(market.router, prefix="/market", tags=["market"])
api_router.include_router(news.router, prefix="/news", tags=["news"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(insights.router, prefix="/insights", tags=["insights"])