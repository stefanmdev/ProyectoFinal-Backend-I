import { Router } from "express";
import passport from "passport";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { validateCreateProduct, validateUpdateProduct } from "../middlewares/productValidator.js";
import { checkValidations } from "../middlewares/validationResult.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = Router();

// GET /api/products con paginación, búsqueda y ordenamiento
router.get("/", getProducts);

// GET /api/products/:pid
router.get("/:pid", getProductById);

// POST /api/products (crear producto) - solo admin
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  validateCreateProduct,
  checkValidations,
  addProduct
);

// PUT /api/products/:pid (actualizar producto) - solo admin
router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  validateUpdateProduct,
  checkValidations,
  updateProduct
);

// DELETE /api/products/:pid (eliminar producto) - solo admin
router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  deleteProduct
);

export default router;
