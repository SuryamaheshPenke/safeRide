const locationRepository = require("./location.repository");

class LocationService {

    async create(data) {
        return locationRepository.create(data);
    }

    async getAll() {
        return locationRepository.findAll();
    }

    async getById(id) {
        return locationRepository.findById(id);
    }

    async update(id, data) {
        return locationRepository.update(id, data);
    }

    async delete(id) {
        return locationRepository.delete(id);
    }

}

module.exports = new LocationService();