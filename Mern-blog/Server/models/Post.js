// path: server/models/Post.js
const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  image: { type: String },
  comments: [CommentSchema]
}, { timestamps: true });
module.exports = mongoose.model("Post", PostSchema);
