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
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            isVerified: true,
            lastLogin: true,
            status: true,
            roleId: true,
            companyId: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            company: true
        }
    });
}

}

module.exports = new AuthRepository();