// path: client/src/services/Post.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

export const PostService = {
  // Get all posts with optional query params
  getPosts: async (params = {}) => {
    const res = await axios.get(`${API_URL}/posts`, { params });
    return res.data;
  },

  // Get a single post
  getPost: async (id) => {
    const res = await axios.get(`${API_URL}/posts/${id}`);
    return res.data;
  },

  // Create new post
  createPost: async (data) => {
    const res = await axios.post(`${API_URL}/posts`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  // Update post
  updatePost: async (id, data) => {
    const res = await axios.put(`${API_URL}/posts/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  // Delete post
  deletePost: async (id) => {
    const res = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  // Add comment
  addComment: async (id, comment) => {
    const res = await axios.post(
      `${API_URL}/posts/${id}/comments`,
      { text: comment },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return res.data;
  },
};
