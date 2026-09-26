const { param } = require("express-validator");

const idValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("ID must be a valid positive integer.")
];

const tripIdValidation = [
    param("tripId")
        .isInt({ min: 1 })
        .withMessage("Trip ID must be a valid positive integer.")
];

const employeeIdValidation = [
    param("employeeId")
        .isInt({ min: 1 })
        .withMessage("Employee ID must be a valid positive integer.")
];

module.exports = {
    idValidation,
    tripIdValidation,
    employeeIdValidation
};