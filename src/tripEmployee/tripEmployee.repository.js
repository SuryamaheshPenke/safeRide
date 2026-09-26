const prisma = require("../config/prisma");

class TripEmployeeRepository {

    // CREATE / ASSIGN EMPLOYEE
    async create(data) {

        const tripId = Number(data.tripId);
        const employeeId = Number(data.employeeId);

        // Check trip exists
        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        // Check employee exists
        const employee = await prisma.employee.findUnique({
            where: {
                id: employeeId
            }
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        // Check duplicate assignment
        const existingAssignment = await prisma.tripEmployee.findFirst({
            where: {
                tripId: tripId,
                employeeId: employeeId
            }
        });

        if (existingAssignment) {
            throw new Error(
                "Employee is already assigned to this trip"
            );
        }

        // Only scheduled trips can receive employees
        if (trip.status !== "SCHEDULED") {
            throw new Error(
                "Employees can only be assigned to scheduled trips"
            );
        }

        return prisma.tripEmployee.create({
            data: {
                ...data,
                tripId: tripId,
                employeeId: employeeId
            },
            include: {
                trip: true,
                employee: true
            }
        });
    }


    // GET ALL
    async findAll() {

        return prisma.tripEmployee.findMany({
            include: {
                trip: true,
                employee: true
            }
        });
    }


    // GET BY ID
    async findById(id) {

        const tripEmployee = await prisma.tripEmployee.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                trip: true,
                employee: true
            }
        });

        if (!tripEmployee) {
            throw new Error("Trip employee assignment not found");
        }

        return tripEmployee;
    }


    // UPDATE
    async update(id, data) {
    const tripEmployeeId = Number(id);

    const existingAssignment = await prisma.tripEmployee.findUnique({
        where: { id: tripEmployeeId },
        include: { trip: true }
    });

    if (!existingAssignment) {
        throw new Error("Trip employee assignment not found");
    }

    // Only scheduled trips can be modified
    if (existingAssignment.trip.status !== "SCHEDULED") {
        throw new Error(
            "Employee assignment can only be updated for scheduled trips"
        );
    }

    const tripId =
        data.tripId !== undefined
            ? Number(data.tripId)
            : existingAssignment.tripId;

    const employeeId =
        data.employeeId !== undefined
            ? Number(data.employeeId)
            : existingAssignment.employeeId;

    // Check target trip
    const targetTrip = await prisma.trip.findUnique({
        where: { id: tripId }
    });

    if (!targetTrip) {
        throw new Error("Trip not found");
    }

    if (targetTrip.status !== "SCHEDULED") {
        throw new Error(
            "Employee assignment can only be moved to a scheduled trip"
        );
    }

    // Check employee
    const employee = await prisma.employee.findUnique({
        where: { id: employeeId }
    });

    if (!employee) {
        throw new Error("Employee not found");
    }

    // Prevent duplicate employee assignment
    const duplicate = await prisma.tripEmployee.findFirst({
        where: {
            tripId: tripId,
            employeeId: employeeId,
            id: { not: tripEmployeeId }
        }
    });

    if (duplicate) {
        throw new Error("Employee is already assigned to this trip");
    }

    // Only allow these fields to be updated
    const updateData = {};

    if (data.tripId !== undefined) {
        updateData.tripId = tripId;
    }

    if (data.employeeId !== undefined) {
        updateData.employeeId = employeeId;
    }

    if (data.pickupOTP !== undefined) {
        updateData.pickupOTP = data.pickupOTP;
    }

    if (data.dropOTP !== undefined) {
        updateData.dropOTP = data.dropOTP;
    }

    return prisma.tripEmployee.update({
        where: { id: tripEmployeeId },
        data: updateData,
        include: {
            trip: true,
            employee: true
        }
    });
}


    // DELETE
    async delete(id) {

        const tripEmployeeId = Number(id);

        const existingAssignment =
            await prisma.tripEmployee.findUnique({
                where: {
                    id: tripEmployeeId
                },
                include: {
                    trip: true
                }
            });

        if (!existingAssignment) {
            throw new Error("Trip employee assignment not found");
        }

        // Only scheduled trips can have assignments deleted
        if (existingAssignment.trip.status !== "SCHEDULED") {
            throw new Error(
                "Employee assignment can only be deleted from scheduled trips"
            );
        }

        return prisma.tripEmployee.delete({
            where: {
                id: tripEmployeeId
            }
        });
    }

}

module.exports = new TripEmployeeRepository();