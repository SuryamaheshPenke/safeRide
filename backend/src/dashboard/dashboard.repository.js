const prisma = require("../config/prisma");

class DashboardRepository {

    // DASHBOARD SUMMARY
    async getSummary(role, companyId) {

        const companyFilter = Number(companyId);

        const employeeWhere =
            role === "COMPANY_ADMIN"
                ? {
                    user: {
                        companyId: companyFilter
                    }
                }
                : {};

        const driverWhere =
            role === "COMPANY_ADMIN"
                ? {
                    isActive: true,
                    user: {
                        companyId: companyFilter
                    }
                }
                : {
                    isActive: true
                };

        const vehicleWhere =
            role === "COMPANY_ADMIN"
                ? {
                    isActive: true,
                    companyId: companyFilter
                }
                : {
                    isActive: true
                };

        const tripWhere =
            role === "COMPANY_ADMIN"
                ? {
                    vehicle: {
                        companyId: companyFilter
                    }
                }
                : {};

        const [
            totalEmployees,
            totalDrivers,
            totalVehicles,
            scheduledTrips,
            activeTrips,
            completedTrips,
            cancelledTrips
        ] = await Promise.all([

            prisma.employee.count({
                where: employeeWhere
            }),

            prisma.driver.count({
                where: driverWhere
            }),

            prisma.vehicle.count({
                where: vehicleWhere
            }),

            prisma.trip.count({
                where: {
                    ...tripWhere,
                    status: "SCHEDULED"
                }
            }),

            prisma.trip.count({
                where: {
                    ...tripWhere,
                    status: "STARTED"
                }
            }),

            prisma.trip.count({
                where: {
                    ...tripWhere,
                    status: "COMPLETED"
                }
            }),

            prisma.trip.count({
                where: {
                    ...tripWhere,
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


    // TODAY'S TRIPS
    async getTodaysTrips(role, companyId) {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const where = {
            tripDate: {
                gte: startOfDay,
                lte: endOfDay
            }
        };

        if (role === "COMPANY_ADMIN") {
            where.vehicle = {
                companyId: Number(companyId)
            };
        }

        return prisma.trip.findMany({
            where,
            include: {
                driver: true,
                vehicle: true
            },
            orderBy: {
                tripDate: "asc"
            }
        });
    }


    // ACTIVE TRIPS
    async getActiveTrips(role, companyId) {

        const where = {
            status: "STARTED"
        };

        if (role === "COMPANY_ADMIN") {
            where.vehicle = {
                companyId: Number(companyId)
            };
        }

        return prisma.trip.findMany({
            where,
            include: {
                driver: true,
                vehicle: true
            },
            orderBy: {
                startTime: "asc"
            }
        });
    }


    // DRIVER STATUS
    async getDriverStatus(role, companyId) {

        const where =
            role === "COMPANY_ADMIN"
                ? {
                    isActive: true,
                    user: {
                        companyId: Number(companyId)
                    }
                }
                : {
                    isActive: true
                };

        return prisma.driver.findMany({
            where,
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


    // VEHICLE STATUS
    async getVehicleStatus(role, companyId) {

        const where =
            role === "COMPANY_ADMIN"
                ? {
                    isActive: true,
                    companyId: Number(companyId)
                }
                : {
                    isActive: true
                };

        return prisma.vehicle.findMany({
            where,
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