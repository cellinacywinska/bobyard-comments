from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.comment import Comment
from schemas.comment import CommentCreate, CommentUpdate, CommentResponse

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get("/", response_model=list[CommentResponse])
async def get_all_comments(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Comment).order_by(Comment.created_at.desc()))
    return result.scalars().all()

@router.post("/", response_model=CommentResponse)
async def add_comment(payload: CommentCreate, db: AsyncSession = Depends(get_db)):
    comment=Comment(
        text=payload.text,
        image=payload.image,
        author="Admin"
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment

@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment(comment_id: int, payload: CommentUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Comment).where(Comment.id==comment_id))

    comment = result.scalar_one_or_none()

    if not comment:
        raise HTTPException(status_code=404, detail="Commsent not found.")

    comment.text=payload.text
    await db.commit()
    await db.refresh(comment)
    return comment

@router.delete("/{comment_id}")
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Comment).where(Comment.id==comment_id))

    comment = result.scalar_one_or_none()

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found.")

    await db.delete(comment)
    await db.commit()
    return {"message": "Comment deleted!"}