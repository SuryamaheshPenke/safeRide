const prisma = require("../config/prisma");

class EmployeeRepository {

    async create(data) {
        return prisma.employee.create({
            data,
            include: {
                user: {
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
                            updatedAt: true
                        }
                    }
            }
        });
    }

    async findAll(page = 1, limit = 10, search = "", role, companyId) {

    const skip = (page - 1) * limit;

    const where = {
        OR: [
            {
                employeeCode: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                department: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                designation: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        ]
    };

    if (role === "COMPANY_ADMIN") {
        where.user = {
            companyId: Number(companyId)
        };
    }

    const employees = await prisma.employee.findMany({
        skip,
        take: Number(limit),
        where,
        include: {
            user: {
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
                    updatedAt: true
                }
            }
        }
    });

    const total = await prisma.employee.count({
        where
    });

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        employees
    };
}

    async findById(id, role, companyId) {
    const where = {
        id: Number(id)
    };

    if (role === "COMPANY_ADMIN") {
        where.user = {
            companyId: Number(companyId)
        };
    }

    return prisma.employee.findFirst({
        where,
        include: {
            user: {
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
                    updatedAt: true
                }
            }
        }
    });
    }

    async update(id, data) {
    return prisma.employee.update({
        where: {
            id: Number(id)
        },
        data,
        include: {
            user: {
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
                    updatedAt: true
                }
            }
        }
    });
    }

    async delete(id) {
        return prisma.employee.delete({
            where: {
                id: Number(id)
            }
        });
    }

}

module.exports = new EmployeeRepository();