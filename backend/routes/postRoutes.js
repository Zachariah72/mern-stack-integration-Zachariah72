import express from "express";
import { createPost, getPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

// /api/posts
router.post("/", createPost);     // CREATE
router.get("/", getPosts);        // LIST ALL
router.get("/:id", getPostById);  // VIEW ONE

export default router;
