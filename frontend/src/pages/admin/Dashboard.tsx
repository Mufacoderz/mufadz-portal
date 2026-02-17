import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setAdminName("Administrator");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Welcome Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Selamat Datang, {adminName}
                    </h2>
                    <p className="text-gray-600">
                        Kamu login sebagai admin. Dari sini kamu bisa mengelola sistem.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                        <p className="text-2xl font-bold text-blue-600">--</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
                        <p className="text-2xl font-bold text-green-600">--</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-2">System Status</h3>
                        <p className="text-2xl font-bold text-purple-600">Online</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
