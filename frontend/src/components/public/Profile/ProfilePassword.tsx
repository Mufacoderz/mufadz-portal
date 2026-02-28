import { useState } from "react";
import { updatePassword } from "../../../services/profileService";

function ProfilePassword() {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [show, setShow] = useState({ current: false, new: false, confirm: false });

    const handleSubmit = async () => {
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            setMessage({ type: "error", text: "Semua field wajib diisi" });
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setMessage({ type: "error", text: "Password baru tidak cocok" });
            return;
        }
        if (form.newPassword.length < 6) {
            setMessage({ type: "error", text: "Password minimal 6 karakter" });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            await updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
            setMessage({ type: "success", text: "Password berhasil diubah!" });
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Gagal mengubah password";
            setMessage({ type: "error", text: message });
        }finally {
            setLoading(false);
        }
    };

    const EyeIcon = ({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
        <button type="button" onClick={onClick} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            {visible ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )}
        </button>
    );

    const InputField = ({
        label, value, field, showKey,
    }: {
        label: string;
        value: string;
        field: keyof typeof form;
        showKey: keyof typeof show;
    }) => (
        <div>
            <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">{label}</label>
            <div className="mt-1 flex items-center border border-blue-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 px-3 py-2 gap-2 focus-within:border-blue-400 transition">
                <input
                    type={show[showKey] ? "text" : "password"}
                    value={value}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
                />
                <EyeIcon visible={show[showKey]} onClick={() => setShow({ ...show, [showKey]: !show[showKey] })} />
            </div>
        </div>
    );

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg dark:text-white mb-4">Ganti Password</h2>

            <div className="space-y-4">
                <InputField label="Password Saat Ini" value={form.currentPassword} field="currentPassword" showKey="current" />
                <InputField label="Password Baru" value={form.newPassword} field="newPassword" showKey="new" />
                <InputField label="Konfirmasi Password Baru" value={form.confirmPassword} field="confirmPassword" showKey="confirm" />
            </div>

            {message && (
                <p className={`mt-3 text-sm font-medium ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                    {message.type === "success" ? "✅" : "❌"} {message.text}
                </p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
                {loading ? "Memproses..." : "Ubah Password"}
            </button>
        </div>
    );
}

export default ProfilePassword;