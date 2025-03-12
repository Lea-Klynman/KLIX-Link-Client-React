import { Role } from "./Role";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    filesId: number[];
    isActive: boolean;
    roles: Role[];
}


