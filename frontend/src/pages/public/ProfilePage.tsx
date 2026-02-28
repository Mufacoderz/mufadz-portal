import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import ProfileAvatar from "../../components/public/Profile/ProfileAvatar";
import ProfileInfo from "../../components/public/Profile/ProfileInfo";
import ProfileReminders from "../../components/public/Profile/ProfileReminders";

function Profile() {
    const { user, loading, refreshUser } = useUser();
    const [editing, setEditing] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
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
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-red-400">Gagal memuat profil</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Cover Photo */}
            <div className="relative w-full h-52 sm:h-64 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-blue-300/20 blur-xl" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
                />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Profile Header Card */}
                <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-sm px-5 pt-0 pb-5 border-x border-b border-gray-200 dark:border-gray-700">
                    {/* Avatar + tombol edit */}
                    <div className="flex items-end justify-between -mt-12 mb-3">
                        <ProfileAvatar
                            name={user.name}
                            profileImage={user.profile_image}
                            role={user.role}
                            onAvatarUpdated={refreshUser}
                        />
                        {/* Tombol edit — langsung set editing ke true */}
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="mb-1 flex items-center gap-1.5 text-sm font-semibold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white px-4 py-1.5 rounded-full transition-all duration-200"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit Profil
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditing(false)}
                                className="mb-1 text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-4 py-1.5 rounded-full border-2 border-gray-200 dark:border-gray-600 transition-all duration-200"
                            >
                                Batal
                            </button>
                        )}
                    </div>

                    {/* Nama, role, bio */}
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                                user.role === "admin"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                            }`}>
                                {user.role === "admin" ? "👑 Admin" : "🙋 User"}
                            </span>
                        </div>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">{user.email}</p>
                        {user.bio && !editing && (
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 leading-relaxed">{user.bio}</p>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {new Date(user.created_at).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Bergabung</p>
                        </div>
                        <div className="w-px bg-gray-100 dark:bg-gray-700" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{user.role}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Role</p>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div className="mt-4 flex flex-col gap-4 pb-10">
                    {/* Form edit hanya muncul kalau editing = true */}
                    {editing && (
                        <ProfileInfo
                            name={user.name}
                            bio={user.bio}
                            onUpdated={() => {
                                refreshUser();
                                setEditing(false);
                            }}
                            onCancel={() => setEditing(false)}
                        />
                    )}
                    <ProfileReminders />
                </div>
            </div>
        </div>
    );
}

export default Profile;