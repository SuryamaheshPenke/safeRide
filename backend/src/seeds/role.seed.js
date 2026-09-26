const prisma = require("../config/prisma");

const roles = [
    {
        name: "SUPER_ADMIN",
        description: "System Administrator"
    },
    {
        name: "COMPANY_ADMIN",
        description: "Company Administrator"
    },
    {
        name: "TRANSPORT_MANAGER",
        description: "Transport Manager"
    },
    {
        name: "DRIVER",
        description: "Driver"
    },
    {
        name: "EMPLOYEE",
        description: "Employee"
    }
];

async function seedRoles() {

    for (const role of roles) {

        const exists = await prisma.role.findUnique({
            where: {
                name: role.name
            }
        });

        if (!exists) {

            await prisma.role.create({
                data: role
            });

            console.log(`Created ${role.name}`);
        }
    }

    console.log("Role seeding completed.");
}

seedRoles()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });