const { body } = require("express-validator");

const createTripLocationValidation = [
    body("tripId")
        .notEmpty()
        .withMessage("Trip ID is required.")
        .isInt({ min: 1 })
        .withMessage("Trip ID must be a valid number."),

    body("latitude")
        .notEmpty()
        .withMessage("Latitude is required.")
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be between -90 and 90."),

    body("longitude")
        .notEmpty()
        .withMessage("Longitude is required.")
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be between -180 and 180.")
];

module.exports = {
    createTripLocationValidation
};