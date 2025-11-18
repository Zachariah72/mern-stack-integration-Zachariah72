// path: client/src/services/Category.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const CategoryService = {
  // Get all categories
  getCategories: async () => {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  },

  // Create a new category
  createCategory: async (name) => {
    const res = await axios.post(
      `${API_URL}/categories`,
      { name },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return res.data;
  },
};
