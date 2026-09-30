const { body } = require("express-validator");

const createTripValidation = [
    body("tripCode")
        .notEmpty()
        .withMessage("Trip code is required.")
        .trim(),

    body("tripDate")
        .notEmpty()
        .withMessage("Trip date is required.")
        .isISO8601()
        .withMessage("Trip date must be a valid date."),

    body("shift")
        .notEmpty()
        .withMessage("Shift is required.")
        .isIn(["MORNING", "EVENING", "NIGHT"])
        .withMessage("Shift must be MORNING, EVENING, or NIGHT."),

    body("driverId")
        .notEmpty()
        .withMessage("Driver ID is required.")
        .isInt({ min: 1 })
        .withMessage("Driver ID must be a valid positive integer."),

    body("vehicleId")
        .notEmpty()
        .withMessage("Vehicle ID is required.")
        .isInt({ min: 1 })
        .withMessage("Vehicle ID must be a valid positive integer.")
];

const updateTripValidation = [
    body("tripCode")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Trip code cannot be empty."),

    body("tripDate")
        .optional()
        .isISO8601()
        .withMessage("Trip date must be a valid date."),

    body("shift")
        .optional()
        .isIn(["MORNING", "EVENING", "NIGHT"])
        .withMessage("Shift must be MORNING, EVENING, or NIGHT."),

    body("driverId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Driver ID must be a valid positive integer."),

    body("vehicleId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Vehicle ID must be a valid positive integer.")
];

module.exports = {
    createTripValidation,
    updateTripValidation
};