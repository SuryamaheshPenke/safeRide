const tripEmployeeRepository = require("./tripEmployee.repository");

class TripEmployeeService {

    async assignEmployee(data) {
        return tripEmployeeRepository.create(data);
    }

    async getAll(driverId) {
    return tripEmployeeRepository.findAll(driverId);
}

    async getById(id) {
        return tripEmployeeRepository.findById(id);
    }

    async update(id, data) {
        return tripEmployeeRepository.update(id, data);
    }

    async delete(id) {
        return tripEmployeeRepository.delete(id);
    }

}

module.exports = new TripEmployeeService();