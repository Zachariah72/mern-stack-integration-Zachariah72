// path: client/src/components/CategoriesList.jsx
import { useEffect, useState } from "react";
import { CategoryService } from "../services/Category";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // Handle creating a new category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const createdCat = await CategoryService.createCategory(newCategory);
      setCategories((prev) => [...prev, createdCat]);
      setNewCategory(""); // Clear input
    } catch (err) {
      setError(err.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Categories</h2>

      {/* Create new category form */}
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Category"}
        </button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Categories list */}
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
