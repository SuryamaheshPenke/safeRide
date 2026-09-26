const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const validate = require("../middleware/validate.middleware");
const {createLocationValidation} = require("./location.validator");
const { idValidation } = require("../validators/id.validator");

const locationController = require("./location.controller");

// Create Location
router.post(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    createLocationValidation,
    validate,
    locationController.create
);

router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
    "TRANSPORT_MANAGER"
),
    locationController.getAll
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
    locationController.getById
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
    locationController.update
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
    locationController.delete
);

module.exports = router;