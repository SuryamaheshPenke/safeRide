const prisma = require("../config/prisma");

class AuthRepository {

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
                company: true
            }
        });
    }

    async create(data) {
        return prisma.user.create({
            data,
            include: {
                role: true,
                company: true
            }
        });
    }

}

module.exports = new AuthRepository();