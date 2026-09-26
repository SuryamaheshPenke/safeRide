const prisma = require("../config/prisma");

class RoleRepository {
    async getAll() {
        return await prisma.role.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    async findByName(name) {
        return await prisma.role.findUnique({
            where: {
                name
            }
        });
    }

    async create(data) {
        return await prisma.role.create({
            data
        });
    }
}

module.exports = new RoleRepository();