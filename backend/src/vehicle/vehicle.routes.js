const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { idValidation } = require("../validators/id.validator");

const vehicleController = require("./vehicle.controller");

// Create Vehicle
router.post(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    vehicleController.create
);

// Get All Vehicles
router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    vehicleController.getAll
);

// Get Vehicle By ID
router.get(
    "/:id",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    vehicleController.getById
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
    validate,
    vehicleController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    vehicleController.delete
);

module.exports = router;