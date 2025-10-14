import { body } from "express-validator";

const orderValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Los artículos deben ser un array")
    .custom((value) => {
      if (
        !value.every(
          (item) =>
            item.id &&
            item.quantity &&
            item.price &&
            item.title &&
            item.description &&
            item.image
        )
      ) {
        throw new Error(
          "Los artículos deben contener id, cantidad, precio, título, descripción e imagen"
        );
      }
      return true;
    }),
  body("shippingDetails")
    .isObject()
    .withMessage("Los detalles de envío deben ser un objeto")
    .custom((value) => {
      if (
        !value.name ||
        !value.cellphone ||
        !value.address ||
        !value.location
      ) {
        throw new Error(
          "Los detalles de envío deben contener nombre, teléfono, dirección y localidad"
        );
      }
      return true;
    }),
  body("shippingCost")
    .isNumeric()
    .withMessage("El costo de envío debe ser un número")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El costo de envío debe ser un número positivo");
      }
      return true;
    }),
];

export default orderValidation;
