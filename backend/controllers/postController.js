import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const newPost = await Post.create({ title, body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Could not create post" });
  }
};

// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch posts" });
  }
};

// GET SINGLE POST
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch post" });
  }
};
