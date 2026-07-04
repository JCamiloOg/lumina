import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_DATABASE } from "./env";

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