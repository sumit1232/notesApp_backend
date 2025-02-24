import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  })
  
  // POST method route
  app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
