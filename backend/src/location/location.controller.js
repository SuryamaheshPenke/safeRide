const locationService = require("./location.service");

class LocationController {

    async create(req, res) {

        try {

            const location = await locationService.create(req.body);

            res.status(201).json({
                success: true,
                message: "Location created successfully.",
                data: location
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

            const locations = await locationService.getAll();

            res.json({
                success: true,
                data: locations
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

            const location = await locationService.getById(req.params.id);

            res.json({
                success: true,
                data: location
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

            const location = await locationService.update(
                req.params.id,
                req.body
            );

            res.json({
                success: true,
                message: "Location updated successfully.",
                data: location
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

            await locationService.delete(req.params.id);

            res.json({
                success: true,
                message: "Location deleted successfully."
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new LocationController();