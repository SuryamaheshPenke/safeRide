const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
    idValidation,
    tripIdValidation,
    employeeIdValidation
} = require("../validators/id.validator");

const driverTripController = require("./driverTrip.controller");


// Get driver trips
router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    driverTripController.getAll
);


// Start trip
router.put(
    "/:id/start",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    driverTripController.startTrip
);


// Get employees assigned to trip
router.get(
    "/:id/employees",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    driverTripController.getTripEmployees
);


// Pickup employee
router.put(
    "/:tripId/employees/:employeeId/pickup",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    tripIdValidation,
    employeeIdValidation,
    validate,
    driverTripController.pickupEmployee
);


// Drop employee
router.put(
    "/:tripId/employees/:employeeId/drop",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    tripIdValidation,
    employeeIdValidation,
    validate,
    driverTripController.dropEmployee
);


// Complete trip
router.put(
    "/:id/complete",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    idValidation,
    validate,
    driverTripController.completeTrip
);


module.exports = router;