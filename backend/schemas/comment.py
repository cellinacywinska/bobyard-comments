from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class CommentCreate(BaseModel):
    text: str
    image: Optional[str] = None

class CommentUpdate(BaseModel):
    text: str

class CommentResponse(BaseModel):
    id: int
    text: str
    author: str
    likes: int
    image: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
