const companyRepository = require("./company.repository");

class CompanyService {

    async getCompanies(role, companyId) {
    return companyRepository.getAll(role, companyId);
}

    async createCompany(data) {

        const exists = await companyRepository.getByEmail(data.email);

        if (exists) {
            throw new Error("Company already exists.");
        }

        return companyRepository.create(data);
    }

}

module.exports = new CompanyService();  