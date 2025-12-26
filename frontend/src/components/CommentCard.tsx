import { useState } from "react";
import "../index.css";


export interface Comment {
    id: number;
    text: string;
    author: string;
    created_at: string;
    likes: number;
    image?: string;
}

interface CommentCardProps {
    comment: Comment;
    onSubmit: () => void;
}

export default function CommentCard({ comment, onSubmit }: CommentCardProps) {
    const {
        id,
        text,
        author,
        created_at,
        likes,
        image = "",
    } = comment;

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>(text)

    const onSecondaryClick = () => {
        setIsEditing(isEditing => !isEditing);
    }

    const onDelete = () => {
        if (confirm("Are you sure you want to delete this comment?")) {
            deleteComment();
        }
    }

    const onEdit = () => {
        if (confirm("Are you sure you want to edit this comment?")) {
            editComment()
        }
    }

    const onPrimaryClick = () => {
        if (isEditing) {
            onEdit();
        } else {
            onDelete();
        }
    }

    async function deleteComment() {
        try {
            await fetch(`http://localhost:8000/comments/${id}`, {
                method: "DELETE",
            });
            onSubmit()
        } catch (err) {
            console.error("Failed to delete comment", err);
        }
    }

    async function editComment() {
        try {
            await fetch(`http://localhost:8000/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: commentValue,
                }),
            });
            setIsEditing(false)
            onSubmit()
        } catch (err) {
            console.error("Failed to edit comment", err);
        }
    }

    return (
        <div className="group relative bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium text-gray-900">{author}</span>
                <span>{new Date(created_at).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between items-center gap-4 text-sm text-gray-500">
                {isEditing ? <textarea
                    placeholder="Write your comment..."
                    required
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400"
                    rows={3}
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                />
                    :
                    <p className="text-gray-800 leading-relaxed text-left md:text-justify">
                        {text}
                    </p>
                }

                {image && (
                    <img
                        src={image}
                        alt="Image posted with the comment"
                        className="w-24 h-24 object-cover rounded-lg border "
                    />
                )}
            </div>


            <div className="flex items-center text-sm text-gray-600 justify-between h-10">
                <span className="flex items-center gap-1">
                    ❤️ <span>{likes}</span>
                </span>
                <div className={`flex gap-2 ${!isEditing && 'not-group-hover:hidden'}`}>
                    <button
                        onClick={onSecondaryClick}
                        type="submit" className="rounded-md border border-gray-300 bg-white px-2 py-1  text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button
                        type="button"
                        onClick={onPrimaryClick}
                        className={`rounded-lg ${isEditing ? "bg-green-500 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} px-2 py-1 text-sm font-medium text-white`}>
                        {isEditing ? "Edit" : "Delete"}
                    </button>

                </div>
            </div>
        </div>
    );
}
