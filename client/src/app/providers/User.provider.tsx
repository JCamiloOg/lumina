import { useEffect, useState } from "react";
import UserContext from "../../shared/context/user.context";
import type { User } from "../../@types/user";
import api from "../api/api";


export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Omit<User, "createdAt" | "password"> | null>(null);
    const [isPendingUser, setIsPendingUser] = useState(true);

    const verifyUser = async () => {
        try {
            const response = await api.get<{ user: Omit<User, "createdAt" | "password"> }>("/auth/verify-token");
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setIsPendingUser(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // eslint-disable-next-line
            verifyUser();
        } else {
            setIsPendingUser(false);
        }


    }, []);



    return (
        <UserContext.Provider value={{ user, setUser, isPendingUser }}>
            {children}
        </UserContext.Provider>
    );
}