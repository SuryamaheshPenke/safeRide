const prisma = require("../config/prisma");

class TripLocationRepository {

    async create(data) {
        const tripId = Number(data.tripId);

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
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

    async findByTripId(tripId) {
        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(tripId)
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
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

    async findLatestByTripId(tripId) {
        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(tripId)
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
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