import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import productosFromFile from "./data/productos.json" assert { type: "json" };

dotenv.config();

export async function seedProducts() {
  try {
    console.log("Ejecutando seed de productos...");

    
    await Product.deleteMany({});

    
    const generatedProducts = [];
    for (let i = 1; i <= 40; i++) {
      generatedProducts.push({
        title: `Producto ${i}`,
        description: `Descripción del producto ${i}`,
        price: 10.5 * i,
        img: "Sin Imagen",
        code: `C-${i}`, 
        stock: 50,
      });
    }

    const allProducts = [...productosFromFile, ...generatedProducts];

    const docs = await Product.insertMany(allProducts);
    console.log("Productos insertados:", docs.length);
  } catch (err) {
    console.error("Error al insertar productos:", err);
  }
}
