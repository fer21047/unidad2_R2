import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

// Permitir requests desde cualquier origen (o especificar solo el frontend)
app.use(cors({
  origin: "http://localhost:5173"  // <- URL de tu frontend
}));

app.use(express.json());

// Endpoints
app.post("/api/courses", async (req, res) => {
  const { title, description, instructor, duration, price, category, is_active } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO courses (title, description, instructor, duration, price, category, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, instructor, duration, price, category, is_active]
    );
    
    res.json({
      id: result.insertId,
      title,
      description,
      instructor,
      duration,
      price,
      category,
      is_active
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
