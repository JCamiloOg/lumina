import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./env.js";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    connectionLimit: 10
});

const prisma = new PrismaClient({
    adapter
});

export default prisma;