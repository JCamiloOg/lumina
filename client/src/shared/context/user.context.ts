import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../../@types/user";

interface UserContextType {
    user: Omit<User, "createdAt" | "password"> | null;
    setUser: Dispatch<SetStateAction<Omit<User, "createdAt" | "password"> | null>>;
    isPendingUser: boolean
}

const UserContext = createContext<UserContextType | null>(null);


export default UserContext;