// path: server/controllers/postController.js
const { validationResult } = require("express-validator");
const Post = require("../models/Post");

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, q, category } = req.query;
    const query = {};
    if (q) query.$or = [{ title: { $regex: q, $options: "i" } }, { body: { $regex: q, $options: "i" } }];
    if (category) query.categories = category;
    const skip = (page - 1) * limit;
    const posts = await Post.find(query).populate("author", "name email").populate("categories").sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit));
    const total = await Post.countDocuments(query);
    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name").populate("categories").populate("comments.user", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, body, categories } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = new Post({ title, body, categories: categories ? categories.split(",") : [], author: req.user._id, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });
    const { title, body, categories } = req.body;
    if (title) post.title = title;
    if (body) post.body = body;
    if (categories !== undefined) post.categories = categories ? categories.split(",") : [];
    if (req.file) post.image = `/uploads/${req.file.filename}`;
    await post.save();
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.remove = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });
    await post.remove();
    res.json({ message: "Post removed" });
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.comments.push({ user: req.user._id, text });
    await post.save();
    const populated = await Post.findById(post._id).populate("comments.user", "name");
    res.json(populated);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};
