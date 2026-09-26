const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const companyController = require("./company.controller");

// Get companies
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    companyController.getCompanies
);

// Create company
router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN"),
    companyController.createCompany
);

module.exports = router;