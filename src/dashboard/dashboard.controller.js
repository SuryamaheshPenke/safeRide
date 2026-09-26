const dashboardService = require("./dashboard.service");

class DashboardController {

    async getSummary(req, res) {
        try {
            const data = await dashboardService.getSummary();

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getTodaysTrips(req, res) {
        try {
            const data = await dashboardService.getTodaysTrips();

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getActiveTrips(req, res) {
        try {
            const data = await dashboardService.getActiveTrips();

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getDriverStatus(req, res) {
        try {
            const data = await dashboardService.getDriverStatus();

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getVehicleStatus(req, res) {
        try {
            const data = await dashboardService.getVehicleStatus();

            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new DashboardController();