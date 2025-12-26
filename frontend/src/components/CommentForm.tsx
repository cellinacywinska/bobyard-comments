import React, { useState } from "react";
import "../index.css";


export default function CommentForm({ onSubmit }: { onSubmit: () => void }) {

    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState("");


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!text.trim()) return
        if (!isValidUrl(image)) return

        await fetch("http://localhost:8000/comments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                ...(image && { image }),
            }),
        });

        setText("")
        setImage("")
        setLoading(false)
        onSubmit()
    }

    function isValidUrl(value: string) {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    function validateImageUrl(value: string) {
        setImage(value);
        setImageError(isValidUrl(value) ? "" : "Please enter a valid URL!");
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <textarea
                placeholder="Write your comment..."
                required
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400"
                rows={3}
                maxLength={200}
                minLength={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <input
                type="text"
                placeholder="https://example.com/image.png"
                value={image}
                onChange={(e) => validateImageUrl(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 text-sm ${imageError ? "border-red-500" : "border-gray-200"
                    }`}
            />
            {imageError && (
                <p className="text-xs text-red-500">{imageError}</p>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </form >
    );
}
