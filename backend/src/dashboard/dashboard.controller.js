const dashboardService = require("./dashboard.service");

class DashboardController {

    async getSummary(req, res) {

        try {

            const data = await dashboardService.getSummary(
                req.user.role,
                req.user.companyId
            );

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

            const data = await dashboardService.getTodaysTrips(
                req.user.role,
                req.user.companyId
            );

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

            const data = await dashboardService.getActiveTrips(
                req.user.role,
                req.user.companyId
            );

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

            const data = await dashboardService.getDriverStatus(
                req.user.role,
                req.user.companyId
            );

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

            const data = await dashboardService.getVehicleStatus(
                req.user.role,
                req.user.companyId
            );

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