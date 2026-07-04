import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload {
    userId: string;
    role: string;
}

