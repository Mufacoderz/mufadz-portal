<?php
session_start();
include '../config/koneksi.php';
?>


<body>


    <?php
    $error = '';
    if (isset($_POST['login'])) {
        $input = $_POST['username'];
        $password = $_POST['password'];

        //cek input ke database apakah udh sesuai atau blum dgn data yg ada
        if (filter_var($input, FILTER_VALIDATE_EMAIL)) {
            $query = "SELECT * from users WHERE email = '$input'";
        } else {
            $query = "SELECT * from users WHERE username = '$input'";
        }

        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);

            if (password_verify($password, $row['password'])) {
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['nama_lengkap'] = $row['nama_lengkap'];
                $_SESSION['username'] = $row['username'];

                header("Location: ../admin/dashboard.php");
                exit();
            } else {
                $error = "Password Salah";
            }
        } else {
            $error =  "Email atau username tidak sesuai";
        }
    }
    ?>

    <div class="container">
        <div class="login">
        <h1>Masuk Sebagai Admin</h1>
        <form method="post" action="">
        <label>Username atau email</label><br>
        <input type="text" name="username" placeholder="Masukkan username atau email" require><br>

        <label>Password</label><br>
        <input type="password" name="password" placeholder="Masukkan password" require><br>

        <?php if ($error != "") : ?>
            <p style="color: red; margin-top: 10px;"><?= $error ?></p>
        <?php endif; ?>
        
        <button type="submit" name="login" class="btn">Login</button>
    </form>
    </div>
    </div>

</body>

</html>