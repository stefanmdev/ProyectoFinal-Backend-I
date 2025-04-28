import { Router } from "express";
import passport from "passport";
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart,
  purchaseCartController
} from "../controllers/cart.controller.js";

import { validateAddProductToCart, validateUpdateProductQuantity } from "../middlewares/cartValidator.js";
import { checkValidations } from "../middlewares/validationResult.js";
import { authorizeRole } from "../middlewares/authorizeRole.js"; // Middleware para permisos

const router = Router();

// Obtener un carrito por ID
router.get("/:cid", getCartById);

// Crear un nuevo carrito vacío
router.post("/", createCart);

// Agregar un producto al carrito (sólo usuarios logueados y rol "user")
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  validateAddProductToCart,
  checkValidations,
  addProductToCart
);

// Actualizar todos los productos del carrito
router.put(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  updateCartProducts
);

// Actualizar la cantidad de un producto en el carrito
router.put(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  validateUpdateProductQuantity,
  checkValidations,
  updateProductQuantity
);

// Eliminar un producto del carrito
router.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  removeProductFromCart
);

// Vaciar el carrito
router.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  clearCart
);

// Finalizar compra
router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  purchaseCartController
);

export default router;
