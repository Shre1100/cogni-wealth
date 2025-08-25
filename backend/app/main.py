"""
Main FastAPI application entry point
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.api import api_router
from app.core.exceptions import setup_exception_handlers

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting CogniWealth API...")
    
    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield
    
    # Shutdown
    logger.info("Shutting down CogniWealth API...")


def create_application() -> FastAPI:
    """Create and configure FastAPI application"""
    
    app = FastAPI(
        title="CogniWealth API",
        description="AI-Powered Financial Assistant Backend",
        version="1.0.0",
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        lifespan=lifespan
    )
    
    # Add middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["*"] if settings.DEBUG else ["cogniwealth.com", "*.cogniwealth.com"]
    )
    
    # Setup exception handlers
    setup_exception_handlers(app)
    
    # Include API router
    app.include_router(api_router, prefix="/api/v1")
    
    @app.get("/")
    async def root():
        return {
            "message": "CogniWealth AI Financial Assistant API",
            "version": "1.0.0",
            "status": "operational"
        }
    
    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "environment": settings.ENVIRONMENT}
    
    return app


app = create_application()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info"
    )