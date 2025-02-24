import express from "express";
import authMiddleware from "../middleware/authMiddleware .js";
import Note from "../models/noteModel.js";

const router = express.Router();

// Create a new note (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      title,
      content,
      user: req.user.id, // Get user ID from token
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE Note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// EDIT Note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    note.title = title;
    note.content = content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch all notes for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
