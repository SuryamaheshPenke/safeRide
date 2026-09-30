const { body } = require("express-validator");

const createEmployeeValidation = [
    body("employeeCode")
        .notEmpty()
        .withMessage("Employee Code is required.")
        .trim(),

    body("department")
        .notEmpty()
        .withMessage("Department is required.")
        .trim(),

    body("designation")
        .notEmpty()
        .withMessage("Designation is required.")
        .trim(),

    body("shift")
        .notEmpty()
        .withMessage("Shift is required.")
        .trim(),

    body("pickupAddress")
        .notEmpty()
        .withMessage("Pickup Address is required.")
        .trim(),

    body("dropAddress")
        .notEmpty()
        .withMessage("Drop Address is required.")
        .trim(),

    body("emergencyName")
        .optional()
        .trim(),

    body("emergencyPhone")
        .optional()
        .matches(/^\d{10}$/)
        .withMessage("Emergency phone must be exactly 10 digits."),

    body("joiningDate")
        .optional()
        .isISO8601()
        .withMessage("Joining date must be a valid date."),

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE.")
];

const updateEmployeeValidation = [
    body("employeeCode")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Employee Code cannot be empty."),

    body("department")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Department cannot be empty."),

    body("designation")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Designation cannot be empty."),

    body("shift")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Shift cannot be empty."),

    body("pickupAddress")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Pickup Address cannot be empty."),

    body("dropAddress")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Drop Address cannot be empty."),

    body("emergencyName")
        .optional()
        .trim(),

    body("emergencyPhone")
        .optional()
        .matches(/^\d{10}$/)
        .withMessage("Emergency phone must be exactly 10 digits."),

    body("joiningDate")
        .optional()
        .isISO8601()
        .withMessage("Joining date must be a valid date."),

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE.")
];

module.exports = {
    createEmployeeValidation,
    updateEmployeeValidation
};