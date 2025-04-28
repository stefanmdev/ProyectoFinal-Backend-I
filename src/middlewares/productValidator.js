import { body } from "express-validator";

export const validateCreateProduct = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 }).withMessage("El precio debe ser un número mayor a 0"),
  body("code").notEmpty().withMessage("El código es obligatorio"),
  body("stock")
    .notEmpty().withMessage("El stock es obligatorio")
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),
  body("img").optional().isString().withMessage("La imagen debe ser una URL válida"),
];

export const validateUpdateProduct = [
  body("title").optional().isString().withMessage("El título debe ser un texto"),
  body("description").optional().isString().withMessage("La descripción debe ser un texto"),
  body("price").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser un número mayor a 0"),
  body("code").optional().isString().withMessage("El código debe ser un texto"),
  body("stock").optional().isInt({ min: 0 }).withMessage("El stock debe ser un número mayor o igual a 0"),
  body("img").optional().isString().withMessage("La imagen debe ser una URL válida"),
];
