const { body } = require("express-validator");

const pickupDropValidation = [
    body("otp")
        .notEmpty()
        .withMessage("OTP is required.")
        .matches(/^\d{4}$/)
        .withMessage("OTP must be exactly 4 digits."),

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
    pickupDropValidation
};