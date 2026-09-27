const prisma = require("../config/prisma");

class TripLocationRepository {

    // CREATE GPS LOCATION
    async create(data, role, companyId) {

        const tripId = Number(data.tripId);

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                vehicle: true
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        // Company Admin can only record locations
        // for trips belonging to their company
        if (
            role === "COMPANY_ADMIN" &&
            trip.vehicle.companyId !== Number(companyId)
        ) {
            throw new Error(
                "Access denied. This trip does not belong to your company."
            );
        }

        if (trip.status !== "STARTED") {
            throw new Error(
                "Location can only be recorded for a started trip"
            );
        }

        return prisma.tripLocation.create({
            data: {
                tripId,
                latitude: Number(data.latitude),
                longitude: Number(data.longitude)
            }
        });
    }


    // GET LOCATION HISTORY
    async findByTripId(tripId, role, companyId) {

        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(tripId)
            },
            include: {
                vehicle: true
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        // Company Admin can only view locations
        // for trips belonging to their company
        if (
            role === "COMPANY_ADMIN" &&
            trip.vehicle.companyId !== Number(companyId)
        ) {
            throw new Error(
                "Access denied. This trip does not belong to your company."
            );
        }

        return prisma.tripLocation.findMany({
            where: {
                tripId: Number(tripId)
            },
            orderBy: {
                recordedAt: "asc"
            }
        });
    }


    // GET LATEST LOCATION
    async findLatestByTripId(tripId, role, companyId) {

        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(tripId)
            },
            include: {
                vehicle: true
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        // Company Admin can only view locations
        // for trips belonging to their company
        if (
            role === "COMPANY_ADMIN" &&
            trip.vehicle.companyId !== Number(companyId)
        ) {
            throw new Error(
                "Access denied. This trip does not belong to your company."
            );
        }

        return prisma.tripLocation.findFirst({
            where: {
                tripId: Number(tripId)
            },
            orderBy: {
                recordedAt: "desc"
            }
        });
    }
}

module.exports = new TripLocationRepository();