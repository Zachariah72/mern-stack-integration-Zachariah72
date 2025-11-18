// path: client/src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const apiUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  return (
    <div className="post-card">
      {post.image && <img src={`${apiUrl}${post.image}`} alt={post.title} />}
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <Link to={`/posts/${post._id}`}>Read More</Link>
    </div>
  );
}
