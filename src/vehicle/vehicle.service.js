const vehicleRepository = require("./vehicle.repository");

class VehicleService {

    async create(data) {
        return vehicleRepository.create(data);
    }

    async getAll() {
        return vehicleRepository.findAll();
    }

    async getById(id) {
        return vehicleRepository.findById(id);
    }

    async update(id, data) {
        return vehicleRepository.update(id, data);
    }

    async delete(id) {
        return vehicleRepository.delete(id);
    }

}

module.exports = new VehicleService();