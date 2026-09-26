const employeeRepository = require("./employee.repository");

class EmployeeService {

    async create(data) {
        return employeeRepository.create(data);
    }

    async getAll(page, limit, search, role, companyId) {
    return employeeRepository.findAll(
        page,
        limit,
        search,
        role,
        companyId
    );
    }

    async getById(id, role, companyId) {
    return employeeRepository.findById(
        id,
        role,
        companyId
    );
    }

    async update(id, data) {
        return employeeRepository.update(id, data);
    }

    async delete(id) {
        return employeeRepository.delete(id);
    }

}

module.exports = new EmployeeService();