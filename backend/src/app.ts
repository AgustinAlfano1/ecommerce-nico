import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "Backend funcionando 🚀" });
});

export default app;
