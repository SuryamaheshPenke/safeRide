const tripRepository = require("./trip.repository");

class TripService {

    async create(data) {

        return tripRepository.create(data);

    }

    async getAll(role, companyId) {
    return tripRepository.findAll(role, companyId);
    }

    async getById(id, role, companyId) {

    return tripRepository.findById(id, role, companyId);

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