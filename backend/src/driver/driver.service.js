const driverRepository = require("./driver.repository");

class DriverService {

    async create(data) {
        return driverRepository.create(data);
    }

    async getAll() {
        return driverRepository.findAll();
    }

    async getById(id) {
        return driverRepository.findById(id);
    }

    async update(id, data) {
        return driverRepository.update(id, data);
    }

    async delete(id) {
        return driverRepository.delete(id);
    }
}

module.exports = new DriverService();