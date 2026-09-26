const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const dashboardController = require("./dashboard.controller");

// Dashboard summary
router.get(
    "/summary",
    authenticate,
    authorize("SUPER_ADMIN", "ADMIN"),
    dashboardController.getSummary
);

// Today's trips
router.get(
    "/trips/today",
    authenticate,
    authorize("SUPER_ADMIN", "ADMIN"),
    dashboardController.getTodaysTrips
);

// Active trips
router.get(
    "/active-trips",
    authenticate,
    authorize("SUPER_ADMIN", "ADMIN"),
    dashboardController.getActiveTrips
);

// Driver status
router.get(
    "/drivers/status",
    authenticate,
    authorize("SUPER_ADMIN", "ADMIN"),
    dashboardController.getDriverStatus
);

// Vehicle status
router.get(
    "/vehicles/status",
    authenticate,
    authorize("SUPER_ADMIN", "ADMIN"),
    dashboardController.getVehicleStatus
);

module.exports = router;