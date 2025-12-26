import json
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.comment import Comment
from pathlib import Path
import datetime


async def insert_comments(db: AsyncSession):
    # Check if comments already exist
    result = await db.execute(select(Comment))
    existing = result.scalars().first()

    if existing:
        return
    BASE_DIR = Path(__file__).resolve().parent

    with open(BASE_DIR / "comments.json", "r") as f:
        data = json.load(f)
        
    comments = data["comments"]

    for item in comments:
        comment = Comment(
            text=item["text"],
            author=item.get("author", "Admin"),
            likes=int(item.get("likes", 0)),
            image=item.get("image"),
            created_at=datetime.datetime.fromisoformat(
                    item["date"].replace("Z", "+00:00")
                ),        )
        db.add(comment)

    await db.commit()