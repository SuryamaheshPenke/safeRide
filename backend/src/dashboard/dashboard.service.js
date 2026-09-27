const dashboardRepository = require("./dashboard.repository");

class DashboardService {

    async getSummary(role, companyId) {
        return dashboardRepository.getSummary(
            role,
            companyId
        );
    }

    async getTodaysTrips(role, companyId) {
        return dashboardRepository.getTodaysTrips(
            role,
            companyId
        );
    }

    async getActiveTrips(role, companyId) {
        return dashboardRepository.getActiveTrips(
            role,
            companyId
        );
    }

    async getDriverStatus(role, companyId) {
        return dashboardRepository.getDriverStatus(
            role,
            companyId
        );
    }

    async getVehicleStatus(role, companyId) {
        return dashboardRepository.getVehicleStatus(
            role,
            companyId
        );
    }
}

module.exports = new DashboardService();