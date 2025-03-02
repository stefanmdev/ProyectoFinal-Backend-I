import { Router } from "express";
const router = Router();

import CartManager from "../managers/cart.manager.js";
const manager = new CartManager();

// POST /api/carts: Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await manager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/carts/:cid: Obtener carrito con productos (populate)
router.get("/:cid", async (req, res) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/carts/:cid/product/:pid: Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;
    const cart = await manager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/carts/:cid/products/:pid: Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await manager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json({ message: "Producto eliminado del carrito", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/carts/:cid: Actualizar la totalidad de productos del carrito
router.put("/:cid", async (req, res) => {
  try {
    // Se espera que el body contenga un arreglo de productos: [{ product: productId, quantity: number }, ...]
    const updatedCart = await manager.updateCartProducts(req.params.cid, req.body);
    res.json({ message: "Carrito actualizado correctamente", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/carts/:cid/products/:pid: Actualizar solo la cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await manager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json({ message: "Cantidad actualizada correctamente", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/carts/:cid: Eliminar el carrito
router.delete("/:cid", async (req, res) => {
  try {
    await manager.deleteCart(req.params.cid);
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
