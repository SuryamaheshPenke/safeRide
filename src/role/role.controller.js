const roleService = require("./role.service");

class RoleController {

    async getRoles(req, res) {

        try {

            const roles = await roleService.getRoles();

            res.status(200).json({
                success: true,
                data: roles
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new RoleController();