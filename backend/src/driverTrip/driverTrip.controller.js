const driverTripService = require("./driverTrip.service");

class DriverTripController {

    async getAll(req, res) {
    try {
        const driverId =
            req.user.role === "DRIVER"
                ? req.driver.id
                : undefined;

        const trips = await driverTripService.getAllTrips(driverId);

        return res.status(200).json({
            success: true,
            data: trips
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


    async startTrip(req, res) {

        try {

            const trip = await driverTripService.startTrip(req.params.id);

            return res.status(200).json({

                success: true,
                message: "Trip started successfully.",
                data: trip

            });

        } catch (error) {

            return res.status(400).json({

                success: false,
                message: error.message

            });

        }

    }


    async getTripEmployees(req, res) {

        try {

            const tripId = req.params.id;

            const employees =
                await driverTripService.getTripEmployees(tripId);

            return res.status(200).json({

                success: true,
                data: employees

            });

        } catch (error) {

            return res.status(400).json({

                success: false,
                message: error.message

            });

        }

    }


    async pickupEmployee(req, res) {

        try {

            const { tripId, employeeId } = req.params;

            const {
                otp,
                latitude,
                longitude
            } = req.body;

            const result =
                await driverTripService.pickupEmployee(
                    tripId,
                    employeeId,
                    otp,
                    latitude,
                    longitude
                );

            return res.status(200).json({

                success: true,
                message: "Employee pickup verified successfully.",
                data: result

            });

        } catch (error) {

            return res.status(400).json({

                success: false,
                message: error.message

            });

        }

    }
    async dropEmployee(req, res) {

    try {

        const { tripId, employeeId } = req.params;

        const {
            otp,
            latitude,
            longitude
        } = req.body;

        const result = await driverTripService.dropEmployee(
            tripId,
            employeeId,
            otp,
            latitude,
            longitude
        );

        return res.status(200).json({

            success: true,
            message: "Employee drop verified successfully.",
            data: result

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}
    async completeTrip(req, res) {

    try {

        const trip = await driverTripService.completeTrip(
            req.params.id
        );

        return res.status(200).json({

            success: true,
            message: "Trip completed successfully.",
            data: trip

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}
}

module.exports = new DriverTripController();