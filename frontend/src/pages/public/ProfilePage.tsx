import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/profileService";
import ProfileAvatar from "../../components/public/Profile/ProfileAvatar";
import ProfileInfo from "../../components/public/Profile/ProfileInfo";
import ProfilePassword from "../../components/public/Profile/ProfilePassword";
import ProfileReminders from "../../components/public/Profile/ProfileReminders";
import HeadingPage from "../../components/public/Heading";

type UserProfile = {
    id: number;
    name: string;
    email: string;
    bio: string;
    role: string;
    profile_image: string | null;
    created_at: string;
};

function Profile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile()
            .then((data) => setUser(data.data || data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p className="text-gray-400 text-sm">Memuat profil...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <p className="text-red-400">{error || "Gagal memuat profil"}</p>
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <div className="py-10 sm:w-[80%] max-w-4xl mx-auto px-4">
                <HeadingPage title="Profil Saya" />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Kolom kiri — avatar & info */}
                    <div className="lg:col-span-1 flex flex-col gap-5">
                        {/* Card avatar */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex justify-center">
                            <ProfileAvatar
                                name={user.name}
                                profileImage={user.profile_image}
                                role={user.role}
                                onAvatarUpdated={(url) => setUser({ ...user, profile_image: url })}
                            />
                        </div>

                        {/* Ganti password */}
                        <ProfilePassword />
                    </div>

                    {/* Kolom kanan — info & reminder */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <ProfileInfo
                            name={user.name}
                            bio={user.bio}
                            email={user.email}
                            createdAt={user.created_at}
                            onUpdated={(name, bio) => setUser({ ...user, name, bio })}
                        />
                        <ProfileReminders />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;