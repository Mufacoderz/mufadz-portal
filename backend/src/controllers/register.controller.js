const users = require("../data/users.mock");
const { hashPassword } = require("../utils/hash");

const register = async (req, res) => {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const exist = users.find(u => u.email === email);
    if (exist) {
        return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        id: users.length + 1,
        nama,
        email,
        password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
        message: "Register berhasil",
        user: {
            id: newUser.id,
            nama: newUser.nama,
            email: newUser.email,
        },
    });
};

module.exports = { register };
