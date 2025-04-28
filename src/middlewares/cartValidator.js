import { body } from "express-validator";

export const validateAddProductToCart = [
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor a 0"),
];

export const validateUpdateCartProducts = [
  body().isArray({ min: 1 }).withMessage("Se espera un arreglo de productos no vacío"),
  body("*.product").notEmpty().withMessage("Cada producto debe tener un ID válido"),
  body("*.quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser mayor a 0"),
];

export const validateUpdateProductQuantity = [
  body("quantity")
    .notEmpty()
    .withMessage("Se debe enviar una cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número mayor a 0"),
];
