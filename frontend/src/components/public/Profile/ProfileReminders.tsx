import { useState, useEffect } from "react";
import {
    fetchReminders,
    createReminder,
    toggleReminder,
    deleteReminder,
} from "../../../services/profileService";

type Reminder = {
    id: number;
    title: string;
    note: string;
    time: string;
    is_done: boolean;
    created_at: string;
};

function ProfileReminders() {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", note: "", time: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadReminders();
    }, []);

    const loadReminders = async () => {
        try {
            const data = await fetchReminders();
            setReminders(data.data || data);
        } catch {
            // silent fail
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!form.title.trim()) return;
        setSaving(true);
        try {
            const data = await createReminder(form);
            setReminders((prev) => [data.data || data, ...prev]);
            setForm({ title: "", note: "", time: "" });
            setShowForm(false);
        } catch {
            alert("Gagal menambahkan reminder");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (id: number) => {
        try {
            await toggleReminder(id);
            setReminders((prev) =>
                prev.map((r) => (r.id === id ? { ...r, is_done: !r.is_done } : r))
            );
        } catch {
            alert("Gagal mengupdate reminder");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteReminder(id);
            setReminders((prev) => prev.filter((r) => r.id !== id));
        } catch {
            alert("Gagal menghapus reminder");
        }
    };

    const done = reminders.filter((r) => r.is_done);
    const todo = reminders.filter((r) => !r.is_done);

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg dark:text-white">Reminder & Todo</h2>
                    {reminders.length > 0 && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                            {todo.length} aktif
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                    <svg className={`w-4 h-4 transition-transform duration-200 ${showForm ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Tambah
                </button>
            </div>

            {/* Form tambah */}
            {showForm && (
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-3">
                    <input
                        type="text"
                        placeholder="Judul reminder..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-blue-400 transition"
                    />
                    <textarea
                        placeholder="Catatan (opsional)..."
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-blue-400 transition resize-none"
                    />
                    <input
                        type="datetime-local"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-blue-400 transition"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleAdd}
                            disabled={saving || !form.title.trim()}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors disabled:opacity-60"
                        >
                            {saving ? "Menyimpan..." : "Simpan"}
                        </button>
                        <button
                            onClick={() => { setShowForm(false); setForm({ title: "", note: "", time: "" }); }}
                            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <p className="text-center text-sm text-gray-400 py-4">Memuat reminder...</p>
            )}

            {/* Empty state */}
            {!loading && reminders.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-4xl mb-2">📝</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">Belum ada reminder. Tambahkan sekarang!</p>
                </div>
            )}

            {/* Todo list */}
            {todo.length > 0 && (
                <div className="space-y-2">
                    {todo.map((r) => (
                        <ReminderItem key={r.id} reminder={r} onToggle={handleToggle} onDelete={handleDelete} />
                    ))}
                </div>
            )}

            {/* Done list */}
            {done.length > 0 && (
                <div className="mt-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-2">Selesai ({done.length})</p>
                    <div className="space-y-2">
                        {done.map((r) => (
                            <ReminderItem key={r.id} reminder={r} onToggle={handleToggle} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ReminderItem({
    reminder,
    onToggle,
    onDelete,
}: {
    reminder: Reminder;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}) {
    const formattedTime = reminder.time
        ? new Date(reminder.time).toLocaleString("id-ID", {
            day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        })
        : null;

    const isOverdue = reminder.time && !reminder.is_done && new Date(reminder.time) < new Date();

    return (
        <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 group
        ${reminder.is_done
                ? "bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-700 opacity-60"
                : "bg-white dark:bg-gray-700/60 border-blue-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(reminder.id)}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
            ${reminder.is_done
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 dark:border-gray-500 hover:border-blue-400"
                    }`}
            >
                {reminder.is_done && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold dark:text-gray-200 ${reminder.is_done ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {reminder.title}
                </p>
                {reminder.note && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{reminder.note}</p>
                )}
                {formattedTime && (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${isOverdue ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                        {isOverdue ? "⚠️ Terlambat · " : ""}{formattedTime}
                    </p>
                )}
            </div>

            {/* Delete */}
            <button
                onClick={() => onDelete(reminder.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-400 transition-all duration-200 shrink-0 mt-0.5"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}

export default ProfileReminders;