const tripLocationRepository = require("./tripLocation.repository");

class TripLocationService {

    async create(data) {
        return tripLocationRepository.create(data);
    }

    async getByTripId(tripId) {
        return tripLocationRepository.findByTripId(tripId);
    }

    async getLatestByTripId(tripId) {
        return tripLocationRepository.findLatestByTripId(tripId);
    }
}

module.exports = new TripLocationService();