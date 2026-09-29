const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const verifyDriverTripOwnership = require("../middleware/driverOwnership.middleware");

const validate = require("../middleware/validate.middleware");
const { tripIdValidation } = require("../validators/id.validator");

const tripLocationController = require("./tripLocation.controller");

const {
    createTripLocationValidation
} = require("./tripLocation.validator");

// Record GPS location
// Record GPS location
router.post(
    "/",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER",
        "DRIVER"
    ),
    createTripLocationValidation,
    validate,
    verifyDriverTripOwnership,
    tripLocationController.create
);

router.get(
    "/trip/:tripId",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER",
        "DRIVER"
    ),
    tripIdValidation,
    validate,
    verifyDriverTripOwnership,
    tripLocationController.getByTripId
);

router.get(
    "/trip/:tripId/latest",
    authenticate,
    authorize("DRIVER", "SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    tripIdValidation,
    validate,
    verifyDriverTripOwnership,
    tripLocationController.getLatestByTripId
);

module.exports = router;