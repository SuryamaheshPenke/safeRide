const prisma = require("../config/prisma");

class AuthRepository {

    async create(data) {
    try {
        return await prisma.user.create({
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
    } catch (error) {
        if (error.code === "P2002") {
            const field = error.meta?.target?.[0];

            if (field === "email") {
                throw new Error("Email is already registered.");
            }

            if (field === "phone") {
                throw new Error("Phone number is already registered.");
            }

            throw new Error("A user with the provided information already exists.");
        }

        throw error;
    }
}

    async findByEmail(email) {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            companyId: true,
            role: {
                select: {
                    name: true
                }
            },
            company: {
                select: {
                    name: true
                }
            }
        }
    });
}
    async findByPhone(phone) {
    return prisma.user.findUnique({
        where: { phone }
    });
}

    

}

module.exports = new AuthRepository();