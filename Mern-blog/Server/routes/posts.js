// path: server/routes/posts.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure uploads dir exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.post("/", auth, upload.single("image"), [
  body("title").notEmpty().withMessage("Title required"),
  body("body").notEmpty().withMessage("Body required")
], postController.create);
router.put("/:id", auth, upload.single("image"), postController.update);
router.delete("/:id", auth, postController.remove);
router.post("/:id/comments", auth, postController.addComment);

module.exports = router;
