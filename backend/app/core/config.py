"""
Application configuration settings
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Basic settings
    PROJECT_NAME: str = "CogniWealth"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://username:password@localhost/cogniwealth_db"
    
    # Security
    SECRET_KEY: str = "your-super-secret-jwt-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # API Keys
    OPENAI_API_KEY: str = ""
    ALPHA_VANTAGE_API_KEY: str = ""
    FINNHUB_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173", 
        "http://localhost:8080"
    ]
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # AI Settings
    DEFAULT_AI_MODEL: str = "gpt-3.5-turbo"
    MAX_TOKENS: int = 1000
    TEMPERATURE: float = 0.7
    
    # Financial data settings
    DEFAULT_MARKET_DATA_PROVIDER: str = "yfinance"
    CACHE_EXPIRY_MINUTES: int = 5
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()