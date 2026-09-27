const tripEmployeeService = require("./tripEmployee.service");

class TripEmployeeController {

    async assignEmployee(req, res) {

        try {

            const tripEmployee =
            await tripEmployeeService.assignEmployee(
                req.body,
                req.user.role,
                req.user.companyId
            );

            res.status(201).json({
                success: true,
                message: "Employee assigned successfully.",
                data: tripEmployee
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
        const driverId =
            req.user.role === "DRIVER"
                ? req.driver.id
                : undefined;

        const assignments = await tripEmployeeService.getAll(driverId);

        return res.status(200).json({
            success: true,
            data: assignments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

    async getById(req, res) {

        try {

            const data = await tripEmployeeService.getById(req.params.id);

            res.status(200).json({
                success: true,
                data
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

            const data = await tripEmployeeService.update(
                req.params.id,
                req.body
            );

            res.status(200).json({
                success: true,
                message: "Trip Employee updated successfully.",
                data
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

            await tripEmployeeService.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Trip Employee deleted successfully."
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new TripEmployeeController();