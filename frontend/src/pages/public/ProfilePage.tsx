import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
    bio: string | null;
    profile_image: string | null;
    created_at: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:5050/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.data);
            } catch (error) {
                console.error("Gagal ambil profile", error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div style={{ padding: "40px" }}>
            <h2>Profile</h2>

            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "10px",
                    maxWidth: "500px",
                }}
            >
                {/* FOTO */}
                <div style={{ marginBottom: "20px" }}>
                    <img
                        src={
                            user.profile_image
                                ? `http://localhost:5000/uploads/${user.profile_image}`
                                : "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        width="150"
                        height="150"
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                </div>

                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Bio:</strong> {user.bio || "Belum ada bio"}</p>
                <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
