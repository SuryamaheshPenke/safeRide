const { body } = require("express-validator");

const createVehicleValidation = [
    body("vehicleNumber")
        .notEmpty()
        .withMessage("Vehicle number is required.")
        .trim(),

    body("vehicleType")
        .notEmpty()
        .withMessage("Vehicle type is required.")
        .trim(),

    body("capacity")
        .notEmpty()
        .withMessage("Capacity is required.")
        .isInt({ min: 1 })
        .withMessage("Capacity must be a positive integer."),

    body("model")
        .notEmpty()
        .withMessage("Model is required.")
        .trim(),

    body("manufacturer")
        .notEmpty()
        .withMessage("Manufacturer is required.")
        .trim(),

    body("registrationYear")
        .notEmpty()
        .withMessage("Registration year is required.")
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Registration year must be valid."),

    body("fuelType")
        .notEmpty()
        .withMessage("Fuel type is required.")
        .trim()
];

const updateVehicleValidation = [
    body("vehicleNumber")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Vehicle number cannot be empty."),

    body("vehicleType")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Vehicle type cannot be empty."),

    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Capacity must be a positive integer."),

    body("model")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Model cannot be empty."),

    body("manufacturer")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Manufacturer cannot be empty."),

    body("registrationYear")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Registration year must be valid."),

    body("fuelType")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Fuel type cannot be empty."),

    body("status")
        .optional()
        .isIn(["AVAILABLE", "ON_TRIP", "MAINTENANCE"])
        .withMessage(
            "Status must be AVAILABLE, ON_TRIP, or MAINTENANCE."
        ),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean.")
];

module.exports = {
    createVehicleValidation,
    updateVehicleValidation
};