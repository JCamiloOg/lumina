import type { User } from "../../../@types/user";
import api from "../../../app/api/api";


export async function getUsers(page?: string, limit?: string, search?: string) {
    return await api.get("/users", { params: { page, limit, search } });
}

export async function registerUser(user: Omit<User, "id" | "createdAt">) {
    return await api.post("/auth/register-admin", user);
}