const driverTripRepository = require("./driverTrip.repository");

class DriverTripService {

    async getAllTrips(driverId) {
    return driverTripRepository.findAll(driverId);
    }


    async startTrip(id) {

        return driverTripRepository.startTrip(id);

    }


    async getTripEmployees(tripId) {

        return driverTripRepository.getTripEmployees(tripId);

    }


    async pickupEmployee(
        tripId,
        employeeId,
        otp,
        latitude,
        longitude
    ) {

        return driverTripRepository.pickupEmployee(
            tripId,
            employeeId,
            otp,
            latitude,
            longitude
        );

    }
    async dropEmployee(
    tripId,
    employeeId,
    otp,
    latitude,
    longitude
) {

    return driverTripRepository.dropEmployee(
        tripId,
        employeeId,
        otp,
        latitude,
        longitude
    );

}
async completeTrip(id) {

    return driverTripRepository.completeTrip(id);

}

}

module.exports = new DriverTripService();