// src/services/cart.service.js

import CartDao from "../dao/CartDao.js";
import ProductDao from "../dao/ProductDao.js";
import Ticket from "../models/Ticket.js";
import { v4 as uuidv4 } from "uuid";

const cartDao = new CartDao();
const productDao = new ProductDao();

// Crear un nuevo carrito
export const createCart = async () => {
  return await cartDao.createCart();
};

// Obtener carrito por ID
export const getCartById = async (cid) => {
  return await cartDao.getCartById(cid); // corregido
};

// Agregar producto al carrito
export const addProductToCart = async (cid, pid, quantity = 1) => {
  return await cartDao.addProduct(cid, pid, quantity);
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (cid, pid) => {
  return await cartDao.removeProduct(cid, pid);
};

// Actualizar todos los productos del carrito (array)
export const updateCartProducts = async (cid, products) => {
  return await cartDao.updateCartProducts(cid, products);
};

// Actualizar cantidad de un producto en el carrito
export const updateProductQuantity = async (cid, pid, quantity) => {
  return await cartDao.updateProductQuantity(cid, pid, quantity);
};

// Vaciar el carrito
export const clearCart = async (cid) => {
  return await cartDao.clearCart(cid);
};

// Eliminar el carrito completo
export const deleteCart = async (cid) => {
  return await cartDao.deleteCart(cid);
};

// Realizar compra del carrito
export const purchaseCart = async (cid, userEmail) => {
  const cart = await cartDao.getCartById(cid); // corregido
  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const productsPurchased = [];
  const productsNotPurchased = [];

  for (const item of cart.products) {
    const product = await productDao.getProductById(item.product._id); // corregido

    if (product && product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
      productsPurchased.push(item);
    } else {
      productsNotPurchased.push(item.product._id);
    }
  }

  if (productsPurchased.length > 0) {
    const amount = productsPurchased.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const newTicket = new Ticket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser: userEmail,
    });

    await newTicket.save();
  }

  // Dejar solo productos no comprados
  cart.products = cart.products.filter(item =>
    productsNotPurchased.includes(item.product._id.toString())
  );
  await cart.save();

  return { productsNotPurchased };
};
