const prisma = require("../config/prisma");

class CompanyRepository {

    async getAll() {
        return prisma.company.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    async getById(id) {
        return prisma.company.findUnique({
            where: {
                id
            }
        });
    }

    async getByEmail(email) {
        return prisma.company.findUnique({
            where: {
                email
            }
        });
    }

    async create(data) {
        return prisma.company.create({
            data
        });
    }

    async update(id, data) {
        return prisma.company.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id) {
        return prisma.company.delete({
            where: {
                id
            }
        });
    }
}

module.exports = new CompanyRepository();