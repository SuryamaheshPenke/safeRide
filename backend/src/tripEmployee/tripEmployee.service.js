const tripEmployeeRepository = require("./tripEmployee.repository");

class TripEmployeeService {

    async assignEmployee(data, role, companyId) {

    return tripEmployeeRepository.create(
        data,
        role,
        companyId
    );

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