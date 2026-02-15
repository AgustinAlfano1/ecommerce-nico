import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Ruta de prueba
app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "Backend funcionando 🚀" });
});

export default app;
