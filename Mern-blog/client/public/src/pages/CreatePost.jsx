// path: client/src/pages/CreatePost.jsx
import React, { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!user) return alert("Please login to create posts");
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("body", body);
      if (image) form.append("image", image);
      await api.post("/posts", form, { headers: { "Content-Type": "multipart/form-data" } });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
    setSubmitting(false);
  }

  return (
    <div>
      <h2>Create Post</h2>
      <form className="card form" onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your post..." rows={8} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" disabled={submitting}>{submitting ? "Posting..." : "Post"}</button>
      </form>
    </div>
  );
}
