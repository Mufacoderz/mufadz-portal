import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mufadz_db",
});

(async () => {
    try {
        const conn = await db.getConnection();
        console.log("✅ DB berhasil terkoneksi");
        conn.release();
    } catch (err) {
        console.error("❌ DB gagal konek:", err.message);
    }
})();

export default db;
