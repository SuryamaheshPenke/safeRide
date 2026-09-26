const employeeService = require("./employee.service");

class EmployeeController {

        async create(req, res) {

            try {

                const employee = await employeeService.create(req.body);

                res.status(201).json({
                    success: true,
                    message: "Employee created successfully.",
                    data: employee
                });

            } catch (error) {

                res.status(400).json({
                    success: false,
                    message: error.message
                });

            }

        }

        async getAll(req, res) {

            try {

                const {

                    page = 1,

                    limit = 10,

                    search = ""

                } = req.query;

                const employees = await employeeService.getAll(
                    page,
                    limit,
                    search
                );

                res.status(200).json({

                    success: true,

                    data: employees

                });

            }

            catch (error) {

                res.status(500).json({

                    success: false,

                    message: error.message

                });

            }

        }

        async getById(req, res) {

            try {

                const employee = await employeeService.getById(req.params.id);

                res.status(200).json({
                    success: true,
                    data: employee
                });

            } catch (error) {

                res.status(500).json({
                    success: false,
                    message: error.message
                });

            }

        }

        async update(req, res) {

        try {

            const employee = await employeeService.update(
                req.params.id,
                req.body
            );

            res.status(200).json({
                success: true,
                message: "Employee updated successfully.",
                data: employee
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

        }

        async delete(req, res) {

            try {

                await employeeService.delete(req.params.id);

                res.status(200).json({
                    success: true,
                    message: "Employee deleted successfully."
                });

            } catch (error) {

                res.status(400).json({
                    success: false,
                    message: error.message
                });

            }

        }

}

module.exports = new EmployeeController();