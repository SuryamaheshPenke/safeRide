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
    async linkUser(driverId, userId) {
    const driver = await prisma.driver.findUnique({
        where: {
            id: Number(driverId)
        }
    });

    if (!driver) {
        throw new Error("Driver not found.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        },
        include: {
            role: true,
            driver: true
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.role.name !== "DRIVER") {
        throw new Error("The selected user must have the DRIVER role.");
    }

    if (user.driver) {
        throw new Error("This user is already linked to a driver.");
    }

    if (driver.userId) {
        throw new Error("This driver is already linked to a user.");
    }

    return prisma.driver.update({
        where: {
            id: Number(driverId)
        },
        data: {
            userId: Number(userId)
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true
                }
            }
        }
    });
}
}

module.exports = new DriverRepository();