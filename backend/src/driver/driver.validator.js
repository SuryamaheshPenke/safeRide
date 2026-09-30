const { body } = require("express-validator");

const createDriverValidation = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required.")
        .trim(),

    body("lastName")
        .notEmpty()
        .withMessage("Last name is required.")
        .trim(),

    body("phone")
        .notEmpty()
        .withMessage("Phone is required.")
        .matches(/^\d{10}$/)
        .withMessage("Phone must be exactly 10 digits."),

    body("email")
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Email must be valid.")
        .normalizeEmail(),

    body("licenseNumber")
        .notEmpty()
        .withMessage("License number is required.")
        .trim(),

    body("licenseExpiry")
        .notEmpty()
        .withMessage("License expiry is required.")
        .isISO8601()
        .withMessage("License expiry must be a valid date."),

    body("experience")
        .notEmpty()
        .withMessage("Experience is required.")
        .isInt({ min: 0 })
        .withMessage("Experience must be a non-negative integer."),

    body("status")
        .optional()
        .isIn(["AVAILABLE", "ON_TRIP", "OFF_DUTY"])
        .withMessage(
            "Status must be AVAILABLE, ON_TRIP, or OFF_DUTY."
        ),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean.")
];

const updateDriverValidation = [
    body("firstName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty."),

    body("lastName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty."),

    body("phone")
        .optional()
        .matches(/^\d{10}$/)
        .withMessage("Phone must be exactly 10 digits."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Email must be valid.")
        .normalizeEmail(),

    body("licenseNumber")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("License number cannot be empty."),

    body("licenseExpiry")
        .optional()
        .isISO8601()
        .withMessage("License expiry must be a valid date."),

    body("experience")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Experience must be a non-negative integer."),

    body("status")
        .optional()
        .isIn(["AVAILABLE", "ON_TRIP", "OFF_DUTY"])
        .withMessage(
            "Status must be AVAILABLE, ON_TRIP, or OFF_DUTY."
        ),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean.")
];

const linkUserValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt({ min: 1 })
        .withMessage("User ID must be a valid positive integer.")
];

module.exports = {
    createDriverValidation,
    updateDriverValidation,
    linkUserValidation
};