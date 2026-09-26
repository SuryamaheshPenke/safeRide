const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const companyRoutes = require("../modules/company/company.routes");
const roleRoutes = require("../modules/role/role.routes");
const tripLocationRoutes = require("../tripLocation/tripLocation.routes");

router.use("/trip-locations", tripLocationRoutes);

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/roles", roleRoutes);

module.exports = router;