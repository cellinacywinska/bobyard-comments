import CommentCard from './components/CommentCard';
import "./index.css";
import CommentForm from './components/CommentForm'
import { useComments } from "./hooks/useComments";

function App() {
  const { comments, loading, error, refetch } = useComments();

  return (
    <div className="flex flex-col gap-3 max-w-150 mx-auto my-10 px-4">
      <CommentForm onSubmit={refetch} />

      {loading && <p className="text-gray-500">Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {comments.map((comment) => (
        <CommentCard key={comment.text} comment={comment} onSubmit={refetch} />
      ))}
    </div>
  );
}

export default App;