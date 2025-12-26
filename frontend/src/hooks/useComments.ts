import { useCallback, useEffect, useState } from "react";
import type { Comment } from "../components/CommentCard";

export function useComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8000/comments");
            if (!res.ok) throw new Error("Failed to fetch comments");
            const data = await res.json();
            setComments(data);
        } catch (err) {
            setError("Could not load comments");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {
        comments,
        loading,
        error,
        refetch: fetchComments,
    };
}