const employeeRepository = require("./employee.repository");

class EmployeeService {

    async create(data) {
        return employeeRepository.create(data);
    }

    async getAll(page, limit, search) {

    return employeeRepository.findAll(
        page,
        limit,
        search
    );

}

    async getById(id) {
        return employeeRepository.findById(id);
    }

    async update(id, data) {
        return employeeRepository.update(id, data);
    }

    async delete(id) {
        return employeeRepository.delete(id);
    }

}

module.exports = new EmployeeService();