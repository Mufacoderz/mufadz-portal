import { useState } from "react";
import { updateProfile } from "../../../services/profileService";

type Props = {
    name: string;
    bio: string;
    email: string;
    createdAt: string;
    onUpdated: (name: string, bio: string) => void;
};

function ProfileInfo({ name, bio, email, createdAt, onUpdated }: Props) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name, bio });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const joined = new Date(createdAt).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
    });

    const handleSave = async () => {
        if (!form.name.trim()) return;
        setLoading(true);
        try {
            await updateProfile({ name: form.name, bio: form.bio });
            onUpdated(form.name, form.bio);
            setEditing(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2500);
        } catch {
            alert("Gagal menyimpan perubahan");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm({ name, bio });
        setEditing(false);
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg dark:text-white">Informasi Profil</h2>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Nama */}
                <div>
                    <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Nama</label>
                    {editing ? (
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 w-full px-3 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-blue-400 transition"
                        />
                    ) : (
                        <p className="mt-1 text-gray-800 dark:text-gray-200 font-medium">{name}</p>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Bio</label>
                    {editing ? (
                        <textarea
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            rows={3}
                            placeholder="Tulis sedikit tentang dirimu..."
                            className="mt-1 w-full px-3 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-blue-400 transition resize-none"
                        />
                    ) : (
                        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                            {bio || <span className="italic text-gray-400">Belum ada bio</span>}
                        </p>
                    )}
                </div>

                {/* Info read-only */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Email</label>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm truncate">{email}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Bergabung</label>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">{joined}</p>
                    </div>
                </div>
            </div>

            {/* Tombol save/cancel */}
            {editing && (
                <div className="flex gap-2 mt-5">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors disabled:opacity-60"
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold py-2 rounded-xl transition-colors"
                    >
                        Batal
                    </button>
                </div>
            )}

            {success && (
                <p className="mt-3 text-sm text-green-500 font-medium text-center animate-pulse">✅ Profil berhasil diperbarui!</p>
            )}
        </div>
    );
}

export default ProfileInfo;