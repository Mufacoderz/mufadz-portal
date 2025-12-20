<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}


// Ambil data JSON dari FE
$input = json_decode(file_get_contents("php://input"), true);

$nama = $input['nama'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Validasi sederhana
if (!$nama || !$email || !$password) {
    echo json_encode(["success"=>false, "message"=>"Semua field wajib diisi"]);
    exit;
}

// cek email sudah ada
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success"=>false, "message"=>"Email sudah terdaftar"]);
    exit;
}

// hash password sebelum simpan (lebih aman)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// insert user baru
$stmt = $conn->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
$stmt->bind_param("sss", $nama, $email, $hashedPassword);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success"=>true, "message"=>"Register berhasil"]);
} else {
    echo json_encode(["success"=>false, "message"=>"Gagal mendaftar, coba lagi"]);
}

$stmt->close();
$conn->close();
?>
