const prisma = require("../config/prisma");

class VehicleRepository {

    async create(data) {
        return prisma.vehicle.create({
            data
        });
    }

    async findAll(role, companyId) {
    const where = {};

    if (role === "COMPANY_ADMIN") {
        where.companyId = Number(companyId);
    }

    return prisma.vehicle.findMany({
        where,
        orderBy: {
            id: "asc"
        }
    });
    }

    async findById(id, role, companyId) {
    const where = {
        id: Number(id)
    };

    if (role === "COMPANY_ADMIN") {
        where.companyId = Number(companyId);
    }

    return prisma.vehicle.findFirst({
        where
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