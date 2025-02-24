import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
