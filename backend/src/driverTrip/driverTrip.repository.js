const prisma = require("../config/prisma");

class DriverTripRepository {

   async findAll(driverId) {
    return prisma.trip.findMany({
        where: driverId
            ? { driverId: Number(driverId) }
            : undefined,
        include: {
            driver: true,
            vehicle: true
        },
        orderBy: {
            tripDate: "asc"
        }
    });
}


    async startTrip(id) {

        return prisma.$transaction(async (tx) => {

            const trip = await tx.trip.update({

                where: {
                    id: Number(id)
                },

                data: {
                    status: "STARTED",
                    startTime: new Date()
                }

            });


            await tx.driver.update({

                where: {
                    id: trip.driverId
                },

                data: {
                    status: "ON_TRIP"
                }

            });


            await tx.vehicle.update({

                where: {
                    id: trip.vehicleId
                },

                data: {
                    status: "ON_TRIP"
                }

            });


            return trip;

        });

    }


    async getTripEmployees(tripId) {

        return prisma.tripEmployee.findMany({

            where: {
                tripId: Number(tripId)
            },

            include: {
                employee: true
            },

            orderBy: {
                id: "asc"
            }

        });

    }


    async pickupEmployee(
        tripId,
        employeeId,
        otp,
        latitude,
        longitude
    ) {

        const tripEmployee =
            await prisma.tripEmployee.findFirst({

                where: {
                    tripId: Number(tripId),
                    employeeId: Number(employeeId)
                }

            });


        if (!tripEmployee) {

            throw new Error(
                "Employee is not assigned to this trip."
            );

        }


        if (tripEmployee.pickupVerified) {

            throw new Error(
                "Employee pickup has already been verified."
            );

        }


        if (tripEmployee.pickupOTP !== otp) {

            throw new Error(
                "Invalid pickup OTP."
            );

        }


        return prisma.tripEmployee.update({

            where: {
                id: tripEmployee.id
            },

            data: {

                pickupVerified: true,

                pickupTime: new Date(),

                pickupLatitude:
                    latitude !== undefined
                        ? Number(latitude)
                        : null,

                pickupLongitude:
                    longitude !== undefined
                        ? Number(longitude)
                        : null

            }

        });

    }
    async dropEmployee(
    tripId,
    employeeId,
    otp,
    latitude,
    longitude
) {

    const tripEmployee =
        await prisma.tripEmployee.findFirst({

            where: {
                tripId: Number(tripId),
                employeeId: Number(employeeId)
            }

        });


    if (!tripEmployee) {

        throw new Error(
            "Employee is not assigned to this trip."
        );

    }


    if (!tripEmployee.pickupVerified) {

        throw new Error(
            "Employee has not been picked up yet."
        );

    }


    if (tripEmployee.dropVerified) {

        throw new Error(
            "Employee has already been dropped."
        );

    }


    if (tripEmployee.dropOTP !== otp) {

        throw new Error(
            "Invalid drop OTP."
        );

    }


    return prisma.tripEmployee.update({

        where: {
            id: tripEmployee.id
        },

        data: {

            dropVerified: true,

            dropTime: new Date(),

            dropLatitude:
                latitude !== undefined
                    ? Number(latitude)
                    : null,

            dropLongitude:
                longitude !== undefined
                    ? Number(longitude)
                    : null

        }

    });

}
    async completeTrip(id) {

    return prisma.$transaction(async (tx) => {

        const trip = await tx.trip.findUnique({

            where: {
                id: Number(id)
            },

            include: {
                driver: true,
                vehicle: true,
                tripEmployees: true
            }

        });


        if (!trip) {

            throw new Error(
                "Trip not found."
            );

        }


        if (trip.status !== "STARTED") {

            throw new Error(
                "Only a started trip can be completed."
            );

        }


        const pendingEmployees =
            trip.tripEmployees.filter(
                employee => !employee.dropVerified
            );


        if (pendingEmployees.length > 0) {

            throw new Error(
                "Cannot complete trip. Some employees have not been dropped."
            );

        }


        const completedTrip = await tx.trip.update({

            where: {
                id: Number(id)
            },

            data: {
                status: "COMPLETED",
                endTime: new Date()
            }

        });


        await tx.driver.update({

            where: {
                id: trip.driverId
            },

            data: {
                status: "AVAILABLE"
            }

        });


        await tx.vehicle.update({

            where: {
                id: trip.vehicleId
            },

            data: {
                status: "AVAILABLE"
            }

        });


        return completedTrip;

    });

}

}

module.exports = new DriverTripRepository();