const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const validate = require("../middleware/validate.middleware");
const { tripIdValidation } = require("../validators/id.validator");

const tripLocationController = require("./tripLocation.controller");

const {
    createTripLocationValidation
} = require("./tripLocation.validator");

// Record GPS location
router.post(
    "/",
    authenticate,
    authorize("DRIVER", "ADMIN", "SUPER_ADMIN"),
    createTripLocationValidation,
    validate,
    tripLocationController.create
);


router.get(
    "/trip/:tripId",
    authenticate,
    authorize("DRIVER", "ADMIN", "SUPER_ADMIN"),
    tripIdValidation,
    validate,
    tripLocationController.getByTripId
);

router.get(
    "/trip/:tripId/latest",
    authenticate,
    authorize("DRIVER", "ADMIN", "SUPER_ADMIN"),
    tripIdValidation,
    validate,
    tripLocationController.getLatestByTripId
);

module.exports = router;