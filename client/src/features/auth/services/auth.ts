import api from "../../../app/api/api";
import type { User } from "../../../@types/user";


export async function login(values: Pick<User, "email" | "password">) {
    return await api.post<{ message: string, token: string, user: Omit<User, "createdAt" | "password"> }>("/auth/login", values);
}

export async function register(values: Omit<User, "id" | "createdAt" | "role">) {
    return await api.post<{ message: string }>("/auth/register", values);
}