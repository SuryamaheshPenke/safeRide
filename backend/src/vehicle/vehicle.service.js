const vehicleRepository = require("./vehicle.repository");

class VehicleService {

    async create(data) {
        return vehicleRepository.create(data);
    }

    async getAll(role, companyId) {
    return vehicleRepository.findAll(role, companyId);
    }

    async getById(id, role, companyId) {
    return vehicleRepository.findById(
        id,
        role,
        companyId
        );
    }

    async update(id, data) {
        return vehicleRepository.update(id, data);
    }

    async delete(id) {
        return vehicleRepository.delete(id);
    }

}

module.exports = new VehicleService();