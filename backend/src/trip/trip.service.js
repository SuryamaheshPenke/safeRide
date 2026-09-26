const tripRepository = require("./trip.repository");

class TripService {

    async create(data) {

        return tripRepository.create(data);

    }

    async getAll() {

        return tripRepository.findAll();

    }

    async getById(id) {

        return tripRepository.findById(id);

    }

    async update(id, data) {

        return tripRepository.update(id, data);

    }

    async delete(id) {

        return tripRepository.delete(id);

    }
    async cancelTrip(id) {
    return tripRepository.cancelTrip(id);
}

}

module.exports = new TripService();