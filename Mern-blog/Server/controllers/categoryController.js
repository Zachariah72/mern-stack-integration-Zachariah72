// path: server/controllers/categoryController.js
const Category = require("../models/Category");

exports.getAll = async (req, res) => {
  try {
    const cats = await Category.find().sort("name");
    res.json(cats);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category exists" });
    const cat = new Category({ name });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};
