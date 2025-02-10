import { Router } from "express";
const router = Router(); 

import ProductManager from "../managers/product-manager.js"; 
const manager = new ProductManager("./src/data/productos.json"); 

// Obtener todos los productos
router.get("/", async (req, res) => {
    let limit = req.query.limit; 
    const productos = await manager.getProducts(); 
    if(limit) {
        res.send(productos.slice(0, limit)); 
    } else {
        res.send(productos); 
    }
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid); 
    const productoBuscado = await manager.getProductById(id); 
    res.send(productoBuscado); 
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const nuevoProducto = req.body;
        await manager.addProduct(nuevoProducto);
        res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = req.body;
        const productos = await manager.getProducts();
        const index = productos.findIndex(p => p.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        productos[index] = { ...productos[index], ...updateData };
        await manager.guardarArchivo(productos);
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

// Eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const productos = await manager.getProducts();
        const nuevoArray = productos.filter(p => p.id !== id);
        
        if (productos.length === nuevoArray.length) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        await manager.guardarArchivo(nuevoArray);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

export default router;
