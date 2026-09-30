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
        .withMessage("Phone number is required.")
        .matches(/^\d{10}$/)
        .withMessage("Phone number must be exactly 10 digits."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number.")
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Password must contain at least one special character."),

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

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email address."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
];

module.exports = {
    registerValidation,
    loginValidation
};