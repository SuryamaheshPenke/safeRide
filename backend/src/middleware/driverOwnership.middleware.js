const prisma = require("../config/prisma");

async function verifyDriverTripOwnership(req, res, next) {
    try {
        if (req.user.role !== "DRIVER") {
                return next();
            }
        const tripId = Number(
            req.params.tripId ||
            req.params.id ||
            req.body.tripId
        );

        

        if (!tripId || tripId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID."
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

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            select: {
                id: true,
                driverId: true
            }
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        if (trip.driverId !== driver.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied. This trip is not assigned to you."
            });
        }

        req.driver = driver;
        req.trip = trip;

        next();

    } catch (error) {
        console.error("Driver ownership error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to verify driver trip ownership."
        });
    }
}

module.exports = verifyDriverTripOwnership;