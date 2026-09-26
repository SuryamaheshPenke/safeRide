const driverService = require("./driver.service");

class DriverController {

    async create(req, res) {
        try {
            const driver = await driverService.create(req.body);

            res.status(201).json({
                success: true,
                message: "Driver created successfully.",
                data: driver
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
            const drivers = await driverService.getAll(
                req.user.role,
                req.user.companyId
            );

            res.status(200).json({
                success: true,
                data: drivers
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
            const driver = await driverService.getById(req.params.id);

            res.status(200).json({
                success: true,
                data: driver
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
            const driver = await driverService.update(
                req.params.id,
                req.body
            );

            res.status(200).json({
                success: true,
                message: "Driver updated successfully.",
                data: driver
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
            await driverService.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Driver deleted successfully."
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async linkUser(req, res) {
    try {
        const driver = await driverService.linkUser(
            req.params.id,
            req.body.userId
        );

        return res.status(200).json({
            success: true,
            message: "Driver linked to user successfully.",
            data: driver
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
}

module.exports = new DriverController();