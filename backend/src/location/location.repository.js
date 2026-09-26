const prisma = require("../config/prisma");

class LocationRepository {

    async create(data) {
        return prisma.location.create({
            data: {
                name: data.name,
                address: data.address,
                latitude: Number(data.latitude),
                longitude: Number(data.longitude)
            }
        });
    }

    async findAll() {
        return prisma.location.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    async findById(id) {
        const location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!location) {
            throw new Error("Location not found");
        }

        return location;
    }

    async update(id, data) {
        const location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!location) {
            throw new Error("Location not found");
        }

        const updateData = {};

        if (data.name !== undefined) {
            updateData.name = data.name;
        }

        if (data.address !== undefined) {
            updateData.address = data.address;
        }

        if (data.latitude !== undefined) {
            updateData.latitude = Number(data.latitude);
        }

        if (data.longitude !== undefined) {
            updateData.longitude = Number(data.longitude);
        }

        return prisma.location.update({
            where: {
                id: Number(id)
            },
            data: updateData
        });
    }

    async delete(id) {
        const location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!location) {
            throw new Error("Location not found");
        }

        return prisma.location.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

module.exports = new LocationRepository();