import { useRef, useState } from "react";
import { uploadAvatar } from "../../../services/profileService";

const BASE_URL = "http://localhost:5050";

type Props = {
    name: string;
    profileImage: string | null;
    role: string;
    onAvatarUpdated: (newUrl: string) => void;
};

function ProfileAvatar({ name, profileImage, role, onAvatarUpdated }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [hover, setHover] = useState(false);

    const avatarUrl = profileImage
        ? `${BASE_URL}/uploads/${profileImage}`
        : null;

    const initials = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const data = await uploadAvatar(file);
            onAvatarUpdated(data.profile_image);
        } catch  {
            alert("Gagal upload foto");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className="relative w-28 h-28 rounded-full cursor-pointer group"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => fileRef.current?.click()}
            >
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
                    />
                ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-4 ring-blue-100 dark:ring-blue-900">
                        <span className="text-3xl font-bold text-white">{initials}</span>
                    </div>
                )}

                {/* Overlay hover */}
                <div
                    className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity duration-200 ${hover || uploading ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {uploading ? (
                        <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </div>

                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="text-center">
                <p className="font-bold text-xl dark:text-white">{name}</p>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${role === "admin"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    }`}>
                    {role === "admin" ? "👑 Admin" : "🙋 User"}
                </span>
            </div>
        </div>
    );
}

export default ProfileAvatar;