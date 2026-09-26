const prisma = require("../config/prisma");

class DashboardRepository {

    async getSummary() {
        const [
            totalEmployees,
            totalDrivers,
            totalVehicles,
            scheduledTrips,
            activeTrips,
            completedTrips,
            cancelledTrips
        ] = await Promise.all([
            prisma.employee.count(),

            prisma.driver.count({
                where: {
                    isActive: true
                }
            }),

            prisma.vehicle.count({
                where: {
                    isActive: true
                }
            }),

            prisma.trip.count({
                where: {
                    status: "SCHEDULED"
                }
            }),

            prisma.trip.count({
                where: {
                    status: "STARTED"
                }
            }),

            prisma.trip.count({
                where: {
                    status: "COMPLETED"
                }
            }),

            prisma.trip.count({
                where: {
                    status: "CANCELLED"
                }
            })
        ]);

        return {
            totalEmployees,
            totalDrivers,
            totalVehicles,
            scheduledTrips,
            activeTrips,
            completedTrips,
            cancelledTrips
        };
    }

    async getTodaysTrips() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        return prisma.trip.findMany({
            where: {
                tripDate: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                driver: true,
                vehicle: true
            },
            orderBy: {
                tripDate: "asc"
            }
        });
    }

    async getActiveTrips() {
        return prisma.trip.findMany({
            where: {
                status: "STARTED"
            },
            include: {
                driver: true,
                vehicle: true
            },
            orderBy: {
                startTime: "asc"
            }
        });
    }

    async getDriverStatus() {
        return prisma.driver.findMany({
            where: {
                isActive: true
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                status: true,
                isActive: true
            },
            orderBy: {
                id: "asc"
            }
        });
    }

    async getVehicleStatus() {
        return prisma.vehicle.findMany({
            where: {
                isActive: true
            },
            select: {
                id: true,
                vehicleNumber: true,
                vehicleType: true,
                capacity: true,
                status: true,
                isActive: true
            },
            orderBy: {
                id: "asc"
            }
        });
    }
}

module.exports = new DashboardRepository();