const prisma = require("../config/prisma");

class TripRepository {

    // CREATE TRIP
    // CREATE TRIP
// CREATE TRIP
async create(data, role, companyId) {

    const driverId = Number(data.driverId);
    const vehicleId = Number(data.vehicleId);

    // Check driver exists
    const driver = await prisma.driver.findUnique({
        where: {
            id: driverId
        },
        include: {
            user: true
        }
    });

    if (!driver) {
        throw new Error("Driver not found");
    }

    // Company Admin can only use a driver from their company
    if (
        role === "COMPANY_ADMIN" &&
        (!driver.user || driver.user.companyId !== Number(companyId))
    ) {
        throw new Error(
            "Access denied. The selected driver does not belong to your company."
        );
    }

    // Check driver availability
    if (driver.status !== "AVAILABLE") {
        throw new Error("Driver is not available");
    }

    // Check vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
        where: {
            id: vehicleId
        }
    });

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    // Company Admin can only use a vehicle from their company
    if (
        role === "COMPANY_ADMIN" &&
        vehicle.companyId !== Number(companyId)
    ) {
        throw new Error(
            "Access denied. The selected vehicle does not belong to your company."
        );
    }

    // Check vehicle availability
    if (vehicle.status !== "AVAILABLE") {
        throw new Error("Vehicle is not available");
    }

    // Check for existing driver conflict
    const driverConflict = await prisma.trip.findFirst({
        where: {
            driverId: driverId,
            tripDate: new Date(data.tripDate),
            shift: data.shift,
            status: {
                in: ["SCHEDULED", "STARTED"]
            }
        }
    });

    if (driverConflict) {
        throw new Error(
            "Driver already has a trip scheduled for this date and shift"
        );
    }

    // Check for existing vehicle conflict
    const vehicleConflict = await prisma.trip.findFirst({
        where: {
            vehicleId: vehicleId,
            tripDate: new Date(data.tripDate),
            shift: data.shift,
            status: {
                in: ["SCHEDULED", "STARTED"]
            }
        }
    });

    if (vehicleConflict) {
        throw new Error(
            "Vehicle already has a trip scheduled for this date and shift"
        );
    }

    // Create trip
    return prisma.trip.create({
        data: {
            ...data,
            driverId: driverId,
            vehicleId: vehicleId,
            tripDate: new Date(data.tripDate)
        },
        include: {
            driver: true,
            vehicle: true
        }
    });
}


    // GET ALL TRIPS
    async findAll(role, companyId) {

    const where = {};

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


    // GET TRIP BY ID
// GET TRIP BY ID
async findById(id, role, companyId) {

    const where = {
        id: Number(id)
    };

    // Company Admin can access only trips
    // belonging to their company
    if (role === "COMPANY_ADMIN") {
        where.vehicle = {
            companyId: Number(companyId)
        };
    }

    const trip = await prisma.trip.findFirst({
        where,
        include: {
            driver: true,
            vehicle: true,
            tripEmployees: true,
            tripLocations: true
        }
    });

    if (!trip) {
        throw new Error("Trip not found");
    }

    return trip;
}


    // UPDATE TRIP
// UPDATE TRIP
async update(id, data, role, companyId) {

    const tripId = Number(id);

    // Find existing trip with vehicle information
    const existingTrip = await prisma.trip.findUnique({
        where: {
            id: tripId
        },
        include: {
            vehicle: true,
            driver: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!existingTrip) {
        throw new Error("Trip not found");
    }

    // Company Admin can only update trips belonging to their company
    if (
        role === "COMPANY_ADMIN" &&
        existingTrip.vehicle.companyId !== Number(companyId)
    ) {
        throw new Error(
            "Access denied. This trip does not belong to your company."
        );
    }

    // Completed and cancelled trips cannot be modified
    if (
        existingTrip.status === "COMPLETED" ||
        existingTrip.status === "CANCELLED"
    ) {
        throw new Error(
            `Cannot update a ${existingTrip.status.toLowerCase()} trip`
        );
    }

    // Final values
    const driverId =
        data.driverId !== undefined
            ? Number(data.driverId)
            : existingTrip.driverId;

    const vehicleId =
        data.vehicleId !== undefined
            ? Number(data.vehicleId)
            : existingTrip.vehicleId;

    const tripDate =
        data.tripDate !== undefined
            ? new Date(data.tripDate)
            : existingTrip.tripDate;

    const shift =
        data.shift !== undefined
            ? data.shift
            : existingTrip.shift;

    // Check driver
    const driver = await prisma.driver.findUnique({
        where: {
            id: driverId
        },
        include: {
            user: true
        }
    });

    if (!driver) {
        throw new Error("Driver not found");
    }

    // Company Admin can only use a driver from their company
    if (
        role === "COMPANY_ADMIN" &&
        (!driver.user ||
            driver.user.companyId !== Number(companyId))
    ) {
        throw new Error(
            "Access denied. The selected driver does not belong to your company."
        );
    }

    // If changing to a different driver, it must be available
    if (
        driverId !== existingTrip.driverId &&
        driver.status !== "AVAILABLE"
    ) {
        throw new Error("Driver is not available");
    }

    // Check vehicle
    const vehicle = await prisma.vehicle.findUnique({
        where: {
            id: vehicleId
        }
    });

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    // Company Admin can only use a vehicle from their company
    if (
        role === "COMPANY_ADMIN" &&
        vehicle.companyId !== Number(companyId)
    ) {
        throw new Error(
            "Access denied. The selected vehicle does not belong to your company."
        );
    }

    // If changing to a different vehicle, it must be available
    if (
        vehicleId !== existingTrip.vehicleId &&
        vehicle.status !== "AVAILABLE"
    ) {
        throw new Error("Vehicle is not available");
    }

    // Check driver scheduling conflict
    const driverConflict = await prisma.trip.findFirst({
        where: {
            id: {
                not: tripId
            },
            driverId: driverId,
            tripDate: tripDate,
            shift: shift,
            status: {
                in: ["SCHEDULED", "STARTED"]
            }
        }
    });

    if (driverConflict) {
        throw new Error(
            "Driver already has another trip scheduled for this date and shift"
        );
    }

    // Check vehicle scheduling conflict
    const vehicleConflict = await prisma.trip.findFirst({
        where: {
            id: {
                not: tripId
            },
            vehicleId: vehicleId,
            tripDate: tripDate,
            shift: shift,
            status: {
                in: ["SCHEDULED", "STARTED"]
            }
        }
    });

    if (vehicleConflict) {
        throw new Error(
            "Vehicle already has another trip scheduled for this date and shift"
        );
    }

    // Update trip
    return prisma.trip.update({
        where: {
            id: tripId
        },
        data: {
            ...data,
            driverId: driverId,
            vehicleId: vehicleId,
            tripDate: tripDate,
            shift: shift
        },
        include: {
            driver: true,
            vehicle: true
        }
    });
}


    // DELETE TRIP
    // DELETE TRIP
async delete(id, role, companyId) {

    const tripId = Number(id);

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

    // Company Admin can only delete trips belonging
    // to their own company
    if (
        role === "COMPANY_ADMIN" &&
        trip.vehicle.companyId !== Number(companyId)
    ) {
        throw new Error(
            "Access denied. This trip does not belong to your company."
        );
    }

    // Existing business rules
    if (
        trip.status === "STARTED" ||
        trip.status === "COMPLETED"
    ) {
        throw new Error(
            `Cannot delete a ${trip.status.toLowerCase()} trip`
        );
    }

    return prisma.trip.delete({
        where: {
            id: tripId
        }
    });
}

    // CANCEL TRIP
    async cancelTrip(id) {

        const tripId = Number(id);

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.status !== "SCHEDULED") {
            throw new Error("Only scheduled trips can be cancelled");
        }

        return prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                status: "CANCELLED"
            }
        });
    }

}

module.exports = new TripRepository();