// path: client/src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const base = import.meta.env.VITE_API_URL.replace("/api", "");
  return (
    <article className="post-card">
      {post.image && <img className="post-image" src={base + post.image} alt={post.title} />}
      <div className="post-body">
        <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
        <p className="meta">By {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleDateString()}</p>
        <p>{post.body?.slice(0, 200)}{post.body && post.body.length > 200 ? "..." : ""}</p>
      </div>
    </article>
  );
}
