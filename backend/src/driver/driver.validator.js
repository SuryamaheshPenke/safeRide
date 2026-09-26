    const { body } = require("express-validator");

const linkUserValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt({ min: 1 })
        .withMessage("User ID must be a valid positive integer.")
];

module.exports = {
    linkUserValidation
};