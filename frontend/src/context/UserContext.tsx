import React, { createContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";


const BASE_URL = "http://localhost:5050";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    bio: string;
    role: string;
    profile_image: string | null;
    created_at: string;
}

interface UserContextType {
    user: UserProfile | null;
    isLoggedIn: boolean;
    loading: boolean;
    refreshUser: () => void; // panggil ini setelah update profil/avatar
}

const UserContext = createContext<UserContextType>({
    user: null,
    isLoggedIn: false,
    loading: true,
    refreshUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // validasi token dulu sebelum fetch
            jwtDecode(token);

            const res = await fetch(`${BASE_URL}/api/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Unauthorized");

            const data = await res.json();
            setUser(data.data || data);
        } catch {
            setUser(null);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={{ user, isLoggedIn: !!user, loading, refreshUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
