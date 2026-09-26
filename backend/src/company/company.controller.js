const companyService = require("./company.service");

class CompanyController {

    async getCompanies(req, res) {

        try {

            const companies = await companyService.getCompanies(
                req.user.role,
                req.user.companyId
            );

            res.status(200).json({
                success: true,
                data: companies
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async createCompany(req, res) {

        try {

            const company = await companyService.createCompany(req.body);

            res.status(201).json({
                success: true,
                data: company
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new CompanyController();