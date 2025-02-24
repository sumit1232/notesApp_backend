import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware .js";

const router = express.Router();

// Create Note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const newNote = new Note({ user: req.user.id, title, content, category });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
