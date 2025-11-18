// path: client/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");

  useEffect(() => { fetchPosts(); }, [page, q]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await api.get(`/posts?page=${page}&limit=6${q ? `&q=${encodeURIComponent(q)}` : ""}`);
      setPosts(res.data.posts);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1>Latest posts</h1>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search posts..." value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: 8, width: "60%", maxWidth: 360 }} />
      </div>
      {loading ? <p>Loading...</p> : (
        <>
          <div className="grid">
            {posts.map(p => <PostCard key={p._id} post={p} />)}
          </div>
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <span>Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
