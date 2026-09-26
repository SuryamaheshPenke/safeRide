const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { idValidation } = require("../validators/id.validator");
const tripEmployeeController = require("./tripEmployee.controller");

// Get all trip employee assignments
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN", "DRIVER"),
    tripEmployeeController.getAll
);

// Assign employee to trip
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    tripEmployeeController.assignEmployee
);

// Get one trip employee assignment
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN", "DRIVER"),
    idValidation,
    validate,
    tripEmployeeController.getById
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    idValidation,
    validate,
    tripEmployeeController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    idValidation,
    validate,
    tripEmployeeController.delete
);

module.exports = router;