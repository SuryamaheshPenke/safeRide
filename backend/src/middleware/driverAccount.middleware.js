const prisma = require("../config/prisma");

async function loadDriverAccount(req, res, next) {
    try {
        if (req.user.role !== "DRIVER") {
            return next();
        }

        const driver = await prisma.driver.findUnique({
            where: {
                userId: Number(req.user.id)
            }
        });

        if (!driver) {
            return res.status(403).json({
                success: false,
                message: "No driver account is linked to this user."
            });
        }

        req.driver = driver;

        next();

    } catch (error) {
        console.error("Driver account error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load driver account."
        });
    }
}

module.exports = loadDriverAccount;