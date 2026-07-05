import prisma from "./config/db.js";


async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: "Admin",
                email: "admin@example.com",
                password: "$2b$10$nFy48DR5zN./tjdrWrYSSeX2OWlhliJCDOBJWi7wIDrokfbUkXvYK",
                phone: "1010101010",
                address: "cl 12 # 12-12",
                role: "administrador",
            },
            {
                name: "Cliente",
                email: "cliente@example.com",
                password: "$2b$10$nFy48DR5zN./tjdrWrYSSeX2OWlhliJCDOBJWi7wIDrokfbUkXvYK",
                phone: "1010101011",
                address: "cl 12 # 12-13",
                role: "cliente",
            },
        ],
        skipDuplicates: true
    });
}

main().finally(async () => {
    await prisma.$disconnect();
});