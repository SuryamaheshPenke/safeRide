const prisma = require("../config/prisma");

async function verifyTripEmployeeOwnership(req, res, next) {
    try {
        if (req.user.role !== "DRIVER") {
            return next();
        }

        const tripEmployeeId = Number(req.params.id);

        if (!tripEmployeeId || tripEmployeeId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip employee ID."
            });
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

        const tripEmployee = await prisma.tripEmployee.findUnique({
            where: {
                id: tripEmployeeId
            },
            select: {
                id: true,
                tripId: true,
                trip: {
                    select: {
                        driverId: true
                    }
                }
            }
        });

        if (!tripEmployee) {
            return res.status(404).json({
                success: false,
                message: "Trip employee assignment not found."
            });
        }

        if (tripEmployee.trip.driverId !== driver.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied. This employee assignment belongs to another driver's trip."
            });
        }

        req.driver = driver;
        req.tripEmployee = tripEmployee;

        next();

    } catch (error) {
        console.error("Trip employee ownership error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to verify trip employee ownership."
        });
    }
}

module.exports = verifyTripEmployeeOwnership;