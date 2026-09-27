const tripLocationService = require("./tripLocation.service");

class TripLocationController {

    async create(req, res) {

        try {

            const location =
                await tripLocationService.create(
                    req.body,
                    req.user.role,
                    req.user.companyId
                );

            res.status(201).json({
                success: true,
                message: "Trip location recorded successfully.",
                data: location
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }


    async getByTripId(req, res) {

        try {

            const locations =
                await tripLocationService.getByTripId(
                    req.params.tripId,
                    req.user.role,
                    req.user.companyId
                );

            res.status(200).json({
                success: true,
                data: locations
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }


    async getLatestByTripId(req, res) {

        try {

            const location =
                await tripLocationService.getLatestByTripId(
                    req.params.tripId,
                    req.user.role,
                    req.user.companyId
                );

            res.status(200).json({
                success: true,
                data: location
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }
}

module.exports = new TripLocationController();