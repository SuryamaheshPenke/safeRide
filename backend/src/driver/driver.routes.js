const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const driverController = require("./driver.controller");
const validate = require("../middleware/validate.middleware");
const { idValidation } = require("../validators/id.validator");
const { linkUserValidation } = require("./driver.validator");

// Create Driver
router.post(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"),
    driverController.create
);

// Get All Drivers
router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"),
    driverController.getAll
);
// Link Driver to User account
router.put(
    "/:id/link-user",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER"
    ),
    idValidation,
    linkUserValidation,
    validate,
    driverController.linkUser
);
// Get Driver By ID
router.get(
    "/:id",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    driverController.getById
);

router.put(
    "/:id",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    driverController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    driverController.delete
);

module.exports = router;