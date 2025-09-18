import { header } from "express-validator";

const tokenValidation = [
  header("token").notEmpty().withMessage("El token es requerido"),
];

export default tokenValidation;


