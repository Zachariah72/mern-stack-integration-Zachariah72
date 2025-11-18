// path: client/src/pages/EditPost.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => { fetch(); }, [id]);

  async function fetch() {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${id}`);
      const p = res.data;
      setTitle(p.title);
      setBody(p.body);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("body", body);
      if (image) form.append("image", image);
      await api.put(`/posts/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
      nav(`/post/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Edit Post</h2>
      <form className="card form" onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your post..." rows={8} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
