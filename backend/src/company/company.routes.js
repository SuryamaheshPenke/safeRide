const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const companyController = require("./company.controller");
const validate = require("../middleware/validate.middleware");

const {
    createCompanyValidation
} = require("./company.validator");

// Get companies
router.get(
    "/",
    authenticate,
    authorize(
    "SUPER_ADMIN",
    "COMPANY_ADMIN",
),
    companyController.getCompanies
);

// Create company
router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    createCompanyValidation,
    validate,
    companyController.createCompany
);

module.exports = router;