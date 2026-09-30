const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { idValidation } = require("../validators/id.validator");

const employeeController = require("./employee.controller");

const validate = require("../middleware/validate.middleware");
const {
    createEmployeeValidation,
    updateEmployeeValidation
} = require("./employee.validator");

router.post(
    "/",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER"
    ),
    createEmployeeValidation,
    validate,
    employeeController.create
);

router.get(
    "/",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    employeeController.getAll
);

router.get(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    employeeController.getById
);

router.put(
    "/:id",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER"
    ),
    idValidation,
    updateEmployeeValidation,
    validate,
    employeeController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    employeeController.delete
);

    
module.exports = router;