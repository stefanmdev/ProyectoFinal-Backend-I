import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import { seedProducts } from "./seed.js";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js';

dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


connectDB().then(async () => {
  console.log("Conexión a MongoDB exitosa");

  // Si la colección está vacía, ejecutar el seed
  const count = await Product.countDocuments();
  if (count === 0) {
    await seedProducts();
  } else {
    console.log("La colección de productos ya tiene datos:", count);
  }
});

// Rutas
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import sessionRouter from "./routes/sessions.js";

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor (Backend con MongoDB)");
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
