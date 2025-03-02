import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    // Limpia la colección para evitar duplicados
    await Product.deleteMany({});

    // Genera 40 productos
    const products = [];
    for (let i = 1; i <= 40; i++) {
      products.push({
        title: `Producto ${i}`,
        description: `Descripción del producto ${i}`,
        price: 10.5 * i,
        img: "Sin Imagen",
        code: `C-${i}`, // Código único para cada producto
        stock: 50
      });
    }

    const docs = await Product.insertMany(products);
    console.log("Productos insertados:", docs.length);
    process.exit();
  } catch (err) {
    console.error("Error al insertar productos:", err);
    process.exit(1);
  }
}

seed();
