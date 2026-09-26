const { body } = require("express-validator");

const registerValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required."),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email address."),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("roleId")
        .notEmpty()
        .withMessage("Role ID is required.")
        .isInt({ min: 1 })
        .withMessage("Role ID must be a valid positive integer."),

    body("companyId")
        .notEmpty()
        .withMessage("Company ID is required.")
        .isInt({ min: 1 })
        .withMessage("Company ID must be a valid positive integer.")
];

module.exports = {
    registerValidation
};