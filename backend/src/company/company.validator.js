const { body } = require("express-validator");

const createCompanyValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Company name is required."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Company email is required.")
        .isEmail()
        .withMessage("Please provide a valid company email address."),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Company phone number is required.")
        .matches(/^\d{10}$/)
        .withMessage("Company phone number must be exactly 10 digits."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Company address is required.")
];

module.exports = {
    createCompanyValidation
};  