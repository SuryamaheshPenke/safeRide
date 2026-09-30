const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { idValidation } = require("../validators/id.validator");

const tripController = require("./trip.controller");

const {
    createTripValidation,
    updateTripValidation
} = require("./trip.validator");

// Create Trip
router.post(
    "/",
    authenticate,
    authorize(
        "SUPER_ADMIN",
        "COMPANY_ADMIN",
        "TRANSPORT_MANAGER"
    ),
    createTripValidation,
    validate,
    tripController.create
);

router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    tripController.getAll
);

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
    tripController.getById
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
    updateTripValidation,
    validate,
    tripController.update
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
    tripController.delete
);

router.put(
    "/:id/cancel",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    tripController.cancelTrip
);

module.exports = router;