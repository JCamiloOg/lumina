import { User } from "../../generated/prisma/client";

declare global {
    namespace Express {
        interface Request {
            authUser?: Omit<User, "password" | "createdAt">
        }
    }
}