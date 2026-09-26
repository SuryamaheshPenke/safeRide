const prisma = require("../config/prisma");

class DriverRepository {

    async create(data) {
        return prisma.driver.create({
            data
        });
    }

    async findAll() {
        return prisma.driver.findMany();
    }

    async findById(id) {
        return prisma.driver.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async update(id, data) {
        return prisma.driver.update({
            where: {
                id: Number(id)
            },
            data
        });
    }

    async delete(id) {
        return prisma.driver.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

module.exports = new DriverRepository();