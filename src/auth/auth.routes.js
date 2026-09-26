const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { registerValidation } = require("./auth.validator");
const authorize = require("../middleware/role.middleware");


// Login - Public
router.post("/login", authController.login);


// Register user - SUPER_ADMIN only
router.post(
    "/register",
    authenticate,
    authorize("SUPER_ADMIN"),
    registerValidation,
    validate,
    authController.register
);


// Get logged-in user profile
router.get(
    "/profile",
    authenticate,
    (req, res) => {
        res.json({
            success: true,
            user: req.user
        });
    }
);


module.exports = router;