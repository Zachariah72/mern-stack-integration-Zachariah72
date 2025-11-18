// path: client/src/pages/PostView.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    await api.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/");
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const res = await api.post(
      `/posts/${id}/comments`,
      { text: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setPost(res.data);
    setComment("");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-view">
      <h1>{post.title}</h1>

      {post.image && (
        <img
          src={`${API_BASE}/${post.image}`}
          alt="Post"
          className="post-view-img"
        />
      )}

      <p className="meta">
        By <strong>{post.author?.name}</strong> — {new Date(post.createdAt).toLocaleString()}
      </p>

      <p className="content">{post.content}</p>

      {user && user._id === post.author?._id && (
        <div className="actions">
          <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
          <button onClick={handleDelete} className="btn-danger">Delete</button>
        </div>
      )}

      <hr />

      <h3>Comments</h3>

      {post.comments.length === 0 && <p>No comments yet.</p>}

      <ul className="comments">
        {post.comments.map((c, i) => (
          <li key={i}>
            <strong>{c.user?.name}: </strong>
            {c.text}
          </li>
        ))}
      </ul>

      {user ? (
        <div className="comment-box">
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
      ) : (
        <p>Login to comment.</p>
      )}
    </div>
  );
}
