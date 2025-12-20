<?php 

$servername = "localhost";
$database = "mufadz_db";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn){
    die("Koneksi gagal: ". mysqli_connect_error());
};



echo "Berhasil koneksi";

?>