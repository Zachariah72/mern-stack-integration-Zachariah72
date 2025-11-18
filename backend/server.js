import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/postsystem")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.log(err));
