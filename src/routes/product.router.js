import { Router } from "express";
import ProductManager from "../managers/product.manager.js";

const router = Router();
const manager = new ProductManager();

// GET /api/products con paginación, búsqueda y ordenamiento
router.get("/", async (req, res) => {
  try {
    const result = await manager.getProducts(req.query);
    // Construir links de paginación
    const { prevPage, nextPage } = result;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    result.prevLink = result.hasPrevPage ? `${baseUrl}?page=${prevPage}` : null;
    result.nextLink = result.hasNextPage ? `${baseUrl}?page=${nextPage}` : null;
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const product = await manager.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await manager.updateProduct(req.params.pid, req.body);
    res.json({ message: "Producto actualizado correctamente", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    await manager.deleteProduct(req.params.pid);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
