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
app.get("/api/courses", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/courses", async (req, res) => {
  const { title, description, instructor, duration, price, category, is_active } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO courses (title, description, instructor, duration, price, category, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, instructor, duration, price, category, is_active]
    );
    res.json({ id: result.insertId, title, description, instructor, duration, price, category, is_active });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/courses/:id/toggle", async (req, res) => {
  const { id } = req.params;
  try {
    const [course] = await db.execute("SELECT is_active FROM courses WHERE id = ?", [id]);
    if (!course.length) return res.status(404).json({ error: "Curso no encontrado" });
    const newStatus = !course[0].is_active;
    await db.execute("UPDATE courses SET is_active = ? WHERE id = ?", [newStatus, id]);
    res.json({ id, is_active: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/courses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM courses WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.json({ message: "Curso eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
