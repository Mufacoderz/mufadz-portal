import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mufadz_db",
});

db.getConnection((err, connection) => {
    if (err) {
    console.error("DB gagal konek:", err.message);
    } else {
    console.log("DB berhasil terkoneksi");
    connection.release();
    }
});


export default db;
