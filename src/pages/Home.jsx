import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { getPosts, deletePost } from "../utils/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(postId);
      fetchPosts();
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  };
  const handleEdit = (post) => {
    navigate(`/edit-post/${post.id}`, { state: { post } });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold"> Latest Posts</h1>
          {user && (
            <button
              onClick={() => navigate("/add-post")}
              className="btn btn-primary gap-2 z-10 fixed bottom-8 right-8 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Post
            </button>
          )}
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              No posts yet. Be the first to create one!
            </p>
            {user && (
              <button
                onClick={() => navigate("/add-post")}
                className="btn btn-primary"
              >
                Create First Post
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
