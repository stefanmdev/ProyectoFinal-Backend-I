import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";  // Conexión a MongoDB

dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor (Backend con MongoDB)");
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
