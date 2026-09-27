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

    async update(id, data, role, companyId) {

    return tripEmployeeRepository.update(
        id,
        data,
        role,
        companyId
    );

}

    async delete(id, role, companyId) {

    return tripEmployeeRepository.delete(
        id,
        role,
        companyId
    );

}

}

module.exports = new TripEmployeeService();