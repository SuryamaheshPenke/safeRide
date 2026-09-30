const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { idValidation } = require("../validators/id.validator");
const tripEmployeeController = require("./tripEmployee.controller");
const verifyTripEmployeeOwnership = require("../middleware/tripEmployeeOwnership.middleware");
const loadDriverAccount = require("../middleware/driverAccount.middleware");
const TripEmployeeValidator = require("./tripEmployee.validator");


// Get all trip employee assignments
router.get(
    "/",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER", "DRIVER"),
    loadDriverAccount,
    tripEmployeeController.getAll
);

// Assign employee to trip
router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    (req, res, next) => {
        try {
            TripEmployeeValidator.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },
    tripEmployeeController.assignEmployee
);

// Get one trip employee assignment
router.get(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER", "DRIVER"),
    idValidation,
    validate,
    verifyTripEmployeeOwnership,
    tripEmployeeController.getById
);

router.put(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    tripEmployeeController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "COMPANY_ADMIN", "TRANSPORT_MANAGER"),
    idValidation,
    validate,
    tripEmployeeController.delete
);
module.exports = router;