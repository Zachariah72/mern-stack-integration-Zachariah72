// path: client/src/pages/PostView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostService } from "../services/Post";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await PostService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const updatedPost = await PostService.addComment(id, comment);
      setPost(updatedPost);
      setComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const apiUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && <img src={`${apiUrl}${post.image}`} alt={post.title} />}
      <p>{post.content}</p>

      <h3>Comments</h3>
      <ul>
        {post.comments.map((c) => (
          <li key={c._id}>
            <strong>{c.user.name}: </strong> {c.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
