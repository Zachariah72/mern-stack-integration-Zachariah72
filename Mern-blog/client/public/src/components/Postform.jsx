// path: client/src/components/PostForm.jsx
import { useState, useEffect } from "react";
import api from "../services/api";

export default function PostForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label>Featured Image:</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">{initialData ? "Update Post" : "Create Post"}</button>
    </form>
  );
}
