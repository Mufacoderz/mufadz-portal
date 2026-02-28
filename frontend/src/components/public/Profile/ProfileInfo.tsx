import { useState } from "react";
import { updateProfile } from "../../../services/profileService";

type Props = {
    name: string;
    bio: string;
    email: string;
    createdAt: string;
    onUpdated: () => void;
};

function ProfileInfo({ name, bio, onUpdated }: Props) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name, bio });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!form.name.trim()) return;
        setLoading(true);
        try {
            await updateProfile({ name: form.name, bio: form.bio });
            onUpdated();
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 overflow-hidden">
            {/* Header card */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-blue-500" />
                    <h2 className="font-bold text-base text-gray-800 dark:text-white">Informasi Profil</h2>
                </div>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-white bg-blue-50 hover:bg-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profil
                    </button>
                )}
            </div>

            <div className="px-6 py-5 space-y-5">
                {/* Nama */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Nama Lengkap</label>
                    {editing ? (
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-2 w-full px-4 py-2.5 rounded-xl border border-blue-200 dark:border-gray-600 bg-blue-50/50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-gray-600 transition"
                        />
                    ) : (
                        <p className="mt-1.5 text-gray-800 dark:text-gray-200 font-semibold text-base">{name}</p>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Bio</label>
                    {editing ? (
                        <textarea
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            rows={3}
                            placeholder="Tulis sedikit tentang dirimu..."
                            className="mt-2 w-full px-4 py-2.5 rounded-xl border border-blue-200 dark:border-gray-600 bg-blue-50/50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-gray-600 transition resize-none"
                        />
                    ) : (
                        <p className="mt-1.5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {bio || <span className="italic text-gray-300 dark:text-gray-600">Belum ada bio. Klik edit untuk menambahkan.</span>}
                        </p>
                    )}
                </div>

                {/* Tombol */}
                {editing && (
                    <div className="flex gap-2 pt-1">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 shadow-sm shadow-blue-200 dark:shadow-none"
                        >
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2.5">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Profil berhasil diperbarui!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileInfo;