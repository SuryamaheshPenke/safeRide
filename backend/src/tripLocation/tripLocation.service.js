const tripLocationRepository = require("./tripLocation.repository");

class TripLocationService {

    async create(data, role, companyId) {

        return tripLocationRepository.create(
            data,
            role,
            companyId
        );
    }

    async getByTripId(tripId, role, companyId) {

        return tripLocationRepository.findByTripId(
            tripId,
            role,
            companyId
        );
    }

    async getLatestByTripId(tripId, role, companyId) {

        return tripLocationRepository.findLatestByTripId(
            tripId,
            role,
            companyId
        );
    }
}

module.exports = new TripLocationService();