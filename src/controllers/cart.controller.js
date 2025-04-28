import * as CartService from "../services/cart.service.js";
import CartDao from "../dao/CartDao.js"; // Importamos la clase CartDao
import ProductDao from "../dao/ProductDao.js"; // Importamos la clase ProductDao
import { createTicket } from "../services/ticket.service.js";
import { v4 as uuidv4 } from "uuid"; // Importamos uuid

// Instanciamos DAOs:
const cartDao = new CartDao();
const productDao = new ProductDao();

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = await CartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un carrito por ID (con populate de productos)
export const getCartById = async (req, res) => {
  try {
    const cart = await CartService.getCartById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;
    const cart = await CartService.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const cart = await CartService.removeProductFromCart(req.params.cid, req.params.pid);
    res.json({ message: "Producto eliminado del carrito", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar todos los productos del carrito
export const updateCartProducts = async (req, res) => {
  try {
    const updatedCart = await CartService.updateCartProducts(req.params.cid, req.body);
    res.json({ message: "Carrito actualizado correctamente", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar la cantidad de un producto específico en el carrito
export const updateProductQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await CartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json({ message: "Cantidad actualizada correctamente", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
  try {
    await CartService.clearCart(req.params.cid);
    res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Comprar los productos del carrito (FINAL CORREGIDO)
export const purchaseCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const userEmail = req.user.email;

    const cart = await cartDao.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const productsPurchased = [];
    const productsNotPurchased = [];

    for (const item of cart.products) {
      const product = await productDao.getProductById(item.product._id || item.product);
      if (!product) {
        productsNotPurchased.push(item);
        continue;
      }

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;
        productsPurchased.push({
          product: product._id,
          quantity: item.quantity
        });
      } else {
        productsNotPurchased.push(item);
      }
    }

    if (productsPurchased.length === 0) {
      return res.status(400).json({ message: "No se pudieron comprar productos", productsNotPurchased });
    }

    const ticket = await createTicket({
      code: uuidv4(), // Generamos un código único
      amount: totalAmount,
      purchaser: userEmail
    });

    // Limpia solo los productos que no se pudieron comprar
    cart.products = cart.products.filter(item =>
      productsNotPurchased.some(p => p.product.toString() === item.product.toString())
    );
    await cart.save();

    res.json({
      message: "Compra realizada con éxito",
      ticket,
      productsNotPurchased
    });

  } catch (error) {
    console.error("Error en purchaseCartController:", error);
    res.status(500).json({ error: error.message });
  }
};
