const dashboardRepository = require("./dashboard.repository");

class DashboardService {

    async getSummary() {
        return dashboardRepository.getSummary();
    }

    async getTodaysTrips() {
        return dashboardRepository.getTodaysTrips();
    }

    async getActiveTrips() {
        return dashboardRepository.getActiveTrips();
    }

    async getDriverStatus() {
        return dashboardRepository.getDriverStatus();
    }

    async getVehicleStatus() {
        return dashboardRepository.getVehicleStatus();
    }
}

module.exports = new DashboardService();