// path: server/routes/auth.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post("/register", [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars")
], authController.register);

router.post("/login", [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").exists().withMessage("Password required")
], authController.login);

module.exports = router;
