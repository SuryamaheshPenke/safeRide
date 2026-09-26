const roleRepository = require("./role.repository");

class RoleService {

    async getRoles() {
        return await roleRepository.getAll();
    }

    async createRole(data) {

        const exists = await roleRepository.findByName(data.name);

        if (exists) {
            throw new Error("Role already exists");
        }

        return await roleRepository.create(data);
    }
}

module.exports = new RoleService();