const vehicleService = require("./vehicle.service");

class VehicleController {

    async create(req, res) {
        try {

            const vehicle = await vehicleService.create(req.body);

            res.status(201).json({
                success: true,
                message: "Vehicle created successfully.",
                data: vehicle
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }

    async getAll(req, res) {
        try {

            const vehicles = await vehicleService.getAll(
                req.user.role,
                req.user.companyId
            );

            res.json({
                success: true,
                data: vehicles
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getById(req, res) {
        try {

            const vehicle = await vehicleService.getById(
                req.params.id,
                req.user.role,
                req.user.companyId
            );

            res.json({
                success: true,
                data: vehicle
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async update(req, res) {
        try {

            const vehicle = await vehicleService.update(
                req.params.id,
                req.body
            );

            res.json({
                success: true,
                message: "Vehicle updated successfully.",
                data: vehicle
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }

    async delete(req, res) {
        try {

            await vehicleService.delete(req.params.id);

            res.json({
                success: true,
                message: "Vehicle deleted successfully."
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }

}

module.exports = new VehicleController();