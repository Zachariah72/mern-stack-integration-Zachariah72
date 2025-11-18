// path: client/src/pages/PostView.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => { fetchPost(); }, [id]);

  async function fetchPost() {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load post");
    }
    setLoading(false);
  }

  async function addComment(e) {
    e.preventDefault();
    if (!user) return alert("Please login to comment");
    try {
      const res = await api.post(`/posts/${id}/comments`, { text: commentText });
      setPost(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  }

  async function remove() {
    if (!user) return;
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;
  const base = import.meta.env.VITE_API_URL.replace("/api", "");
  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p className="meta">By {post.author?.name}</p>
      {post.image && <img src={base + post.image} alt="featured" className="post-full-image" />}
      <div className="card">
        <p>{post.body}</p>
      </div>
      {user && post.author && user.id === post.author._id && (
        <div style={{ marginTop: 12 }}>
          <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
          <button className="btn btn-danger" onClick={remove}>Delete</button>
        </div>
      )}
      <section className="comments">
        <h3>Comments ({post.comments?.length || 0})</h3>
        <form onSubmit={addComment} className="comment-form">
          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows={3} placeholder="Write a comment"></textarea>
          <button type="submit">Add Comment</button>
        </form>
        <div>
          {post.comments && post.comments.map((c, i) => (
            <div key={i} className="comment">
              <strong>{c.user?.name || "User"}</strong>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
