const prisma = require("../config/prisma");

class VehicleRepository {

    async create(data) {
        return prisma.vehicle.create({
            data
        });
    }

    async findAll() {
        return prisma.vehicle.findMany();
    }

    async findById(id) {
        return prisma.vehicle.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async update(id, data) {
        return prisma.vehicle.update({
            where: {
                id: Number(id)
            },
            data
        });
    }

    async delete(id) {
        return prisma.vehicle.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

module.exports = new VehicleRepository();