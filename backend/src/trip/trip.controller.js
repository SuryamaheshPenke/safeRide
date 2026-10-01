const tripService = require("./trip.service");

class TripController {

    async create(req, res) {

        try {

            const trip = await tripService.create(
                req.body,
                req.user.role,
                req.user.companyId
            );

            res.status(201).json({

                success: true,

                message: "Trip created successfully.",

                data: trip

            });

        }

        catch (error) {

            res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

    async getAll(req, res) {

        try {

            const trips = await tripService.getAll(
                req.user.role,
                req.user.companyId
            );

            res.json({

                success: true,

                data: trips

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    async getById(req, res) {

        try {

            const trip = await tripService.getById(
                req.params.id,
                req.user.role,
                req.user.companyId
            );

            res.json({

                success: true,

                data: trip

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    async update(req, res) {

        try {

            const trip = await tripService.update(
                req.params.id,
                req.body,
                req.user.role,
                req.user.companyId
            );

            res.json({

                success: true,

                data: trip

            });

        }

        catch (error) {

            res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

    async delete(req, res) {

    try {

        await tripService.delete(
            req.params.id,
            req.user.role,
            req.user.companyId
        );

        return res.status(200).json({

            success: true,

            message: "Trip deleted successfully."

        });

    }

    catch (error) {

        // Prisma foreign key constraint error
        if (error.code === "P2003") {

            return res.status(409).json({

                success: false,

                message: "Cannot delete trip because it has associated records."

            });

        }

        // Prisma record not found
        if (error.code === "P2025") {

            return res.status(404).json({

                success: false,

                message: "Trip not found."

            });

        }

        // Known business-rule errors
        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}
    async cancelTrip(req, res) {
    try {
        const trip = await tripService.cancelTrip(
            req.params.id,
            req.user.role,
            req.user.companyId
        );

        res.status(200).json({
            success: true,
            message: "Trip cancelled successfully.",
            data: trip
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

}

module.exports = new TripController();