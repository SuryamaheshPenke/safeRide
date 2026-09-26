const { body } = require("express-validator");

exports.createEmployeeValidation = [

    body("employeeCode")
        .notEmpty()
        .withMessage("Employee Code is required"),

    body("department")
        .notEmpty()
        .withMessage("Department is required"),

    body("designation")
        .notEmpty()
        .withMessage("Designation is required"),

    body("shift")
        .notEmpty()
        .withMessage("Shift is required"),

    body("pickupAddress")
        .notEmpty()
        .withMessage("Pickup Address is required"),

    body("dropAddress")
        .notEmpty()
        .withMessage("Drop Address is required"),

    body("emergencyPhone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Emergency phone must be 10 digits")
];