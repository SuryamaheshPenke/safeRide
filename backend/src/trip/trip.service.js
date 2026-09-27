const tripRepository = require("./trip.repository");

class TripService {

    async create(data, role, companyId) {

    return tripRepository.create(
        data,
        role,
        companyId
    );

}

    async getAll(role, companyId) {
    return tripRepository.findAll(role, companyId);
    }

    async getById(id, role, companyId) {

    return tripRepository.findById(id, role, companyId);

    }

    async update(id, data, role, companyId) {

    return tripRepository.update(
        id,
        data,
        role,
        companyId
    );

}

    async delete(id, role, companyId) {

    return tripRepository.delete(
        id,
        role,
        companyId
    );

    }
    async cancelTrip(id) {
    return tripRepository.cancelTrip(id);
}

}

module.exports = new TripService();