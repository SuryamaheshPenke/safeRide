const driverRepository = require("./driver.repository");

class DriverService {

    async create(data) {
        return driverRepository.create(data);
    }

    async getAll(role, companyId) {
    return driverRepository.findAll(role, companyId);
    }

    async getById(id, role, companyId) {
    return driverRepository.findById(
        id,
        role,
        companyId
    );
}

    async update(id, data) {
        return driverRepository.update(id, data);
    }

    async delete(id) {
        return driverRepository.delete(id);
    }
    async linkUser(driverId, userId) {
    return driverRepository.linkUser(driverId, userId);
    }
}

module.exports = new DriverService();