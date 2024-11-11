import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import favoriteRoutes from "./routes/favorite.routes";

// Configurar variables de entorno
dotenv.config();

// Crear app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/favorites", favoriteRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Conectar DB y iniciar servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

export default app;
