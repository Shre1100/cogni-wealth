"""
Custom exceptions and error handlers
"""
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

logger = logging.getLogger(__name__)


class CogniWealthException(Exception):
    """Base exception for CogniWealth application"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class AuthenticationError(CogniWealthException):
    """Authentication related errors"""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, 401)


class AuthorizationError(CogniWealthException):
    """Authorization related errors"""
    def __init__(self, message: str = "Access denied"):
        super().__init__(message, 403)


class ValidationError(CogniWealthException):
    """Validation related errors"""
    def __init__(self, message: str = "Validation failed"):
        super().__init__(message, 422)


class ExternalAPIError(CogniWealthException):
    """External API related errors"""
    def __init__(self, message: str = "External API error"):
        super().__init__(message, 502)


class RateLimitError(CogniWealthException):
    """Rate limiting errors"""
    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(message, 429)


def setup_exception_handlers(app: FastAPI):
    """Setup global exception handlers"""
    
    @app.exception_handler(CogniWealthException)
    async def cogniwealth_exception_handler(request: Request, exc: CogniWealthException):
        logger.error(f"CogniWealth exception: {exc.message}")
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": True,
                "message": exc.message,
                "type": exc.__class__.__name__
            }
        )
    
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        logger.error(f"HTTP exception: {exc.detail}")
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": True,
                "message": exc.detail,
                "type": "HTTPException"
            }
        )
    
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.error(f"Validation error: {exc.errors()}")
        return JSONResponse(
            status_code=422,
            content={
                "error": True,
                "message": "Validation failed",
                "details": exc.errors(),
                "type": "ValidationError"
            }
        )
    
    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "Internal server error",
                "type": "InternalServerError"
            }
        )