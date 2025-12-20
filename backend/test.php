<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include __DIR__ . "/config/koneksi.php";

if($conn){
    echo "✅ Berhasil connect ke DB";
} else {
    echo "❌ Gagal connect: " . mysqli_connect_error();
}
?>
