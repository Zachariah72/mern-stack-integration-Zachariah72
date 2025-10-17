const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        userId: { type: String, index: true }, //Optional (frontend passes it)
        title: { type: String, required: true, trim: true },
        content: { type: String, default: "" }
    }, 
    
    {timestamps: true }
);

noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

