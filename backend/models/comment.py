from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base
from sqlalchemy.dialects.postgresql import JSON

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    text = Column(Text, nullable=False)
    author = Column(String, nullable=False)
    likes = Column(Integer, default=0)
    image = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
