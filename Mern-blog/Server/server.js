// path: server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const fs = require("fs");

const app = express();
const CLIENT_URL = process.env.VITE_CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// ensure uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/mern_blog").then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
