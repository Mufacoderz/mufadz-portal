
export type UserRole = "user" | "admin" | "moderator"; // opsional: tambah role lain sesuai DB

export interface DecodedToken {
    id: number;
    email: string;
    role: UserRole;
    exp: number;
}

import { useState, useEffect } from "react";
import {jwtDecode }from "jwt-decode";

export const useAuth = () => {
    const [role, setRole] = useState<UserRole | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                setRole(decoded.role);
                setIsLoggedIn(true);
            } catch (err) {
                console.error("Token invalid", err);
                setRole(null);
                setIsLoggedIn(false);
            }
        } else {
            setRole(null);
            setIsLoggedIn(false);
        }
    }, []);

    return { role, isLoggedIn };
};