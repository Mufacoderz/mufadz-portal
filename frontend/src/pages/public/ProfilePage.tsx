import { useUser } from '../../hooks/useUser'
import ProfileAvatar from "../../components/public/Profile/ProfileAvatar";
import ProfileInfo from "../../components/public/Profile/ProfileInfo";
import ProfileReminders from "../../components/public/Profile/ProfileReminders";

function Profile() {
    const { user, loading, refreshUser } = useUser();

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

    if (!user) {
        return (
            <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <p className="text-red-400">Gagal memuat profil</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Banner */}
            <div className="relative h-44 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5" />
                <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute top-6 left-1/3 w-24 h-24 rounded-full bg-white/5" />
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "28px 28px"
                    }}
                />
                <div className="absolute bottom-5 left-0 right-0 px-6 max-w-5xl mx-auto">
                    <p className="text-white/60 text-sm">Selamat datang kembali 👋</p>
                    <h1 className="text-white text-2xl font-bold mt-0.5">{user.name}</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-1 pt-2">
                        <ProfileAvatar
                            name={user.name}
                            profileImage={user.profile_image}
                            role={user.role}
                            email={user.email}
                            createdAt={user.created_at}
                            onAvatarUpdated={refreshUser}
                        />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <ProfileInfo
                            name={user.name}
                            bio={user.bio}
                            email={user.email}
                            createdAt={user.created_at}
                            onUpdated={refreshUser}
                        />
                        <ProfileReminders />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;