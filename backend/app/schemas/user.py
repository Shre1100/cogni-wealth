"""
User schemas
"""
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None
    location: Optional[str] = None
    risk_tolerance: Optional[str] = "moderate"
    investment_experience: Optional[str] = "beginner"
    preferred_currency: Optional[str] = "USD"


class UserCreate(UserBase):
    password: str
    accept_terms: bool = False
    accept_marketing: bool = False
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v
    
    @validator('accept_terms')
    def validate_terms(cls, v):
        if not v:
            raise ValueError('You must accept the terms and conditions')
        return v


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    risk_tolerance: Optional[str] = None
    investment_experience: Optional[str] = None
    preferred_currency: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    is_email_verified: bool
    is_phone_verified: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse


class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    
    @validator('new_password')
    def validate_new_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v