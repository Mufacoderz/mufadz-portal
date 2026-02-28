import { useRef, useState } from "react";
import { uploadAvatar } from "../../../services/profileService";

const BASE_URL = "http://localhost:5050";

type Props = {
    name: string;
    profileImage: string | null;
    role: string;
    email: string;
    createdAt: string;
    onAvatarUpdated: () => void;
};

function ProfileAvatar({ name, profileImage, role, email, createdAt, onAvatarUpdated }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [hover, setHover] = useState(false);

    const avatarUrl = profileImage ? `${BASE_URL}/uploads/${profileImage}` : null;
    const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

    const joined = new Date(createdAt).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await uploadAvatar(file);
            onAvatarUpdated();
        } catch {
            alert("Gagal upload foto");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-6 flex flex-col items-center text-center">
                {/* Avatar */}
                <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => fileRef.current?.click()}
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-md"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-md">
                            <span className="text-2xl font-bold text-white">{initials}</span>
                        </div>
                    )}

                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center transition-opacity duration-200 ${hover || uploading ? "opacity-100" : "opacity-0"}`}>
                        {uploading ? (
                            <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Klik foto untuk mengganti</p>

                {/* Nama & role */}
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mt-3">{name}</h2>
                <span className={`mt-1 text-xs px-3 py-1 rounded-full font-semibold ${
                    role === "admin"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                }`}>
                    {role === "admin" ? "👑 Admin" : "🙋 User"}
                </span>

                {/* Divider */}
                <div className="w-full border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 space-y-2.5 text-left">
                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{email}</p>
                    </div>

                    {/* Joined */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bergabung {joined}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAvatar;