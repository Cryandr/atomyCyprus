<?php
session_start();
$host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "registration_db";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, password, is_verified FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Checking if the user exists
    if ($stmt->num_rows === 1) {
        $stmt->bind_result($user_id, $hashed_password, $is_verified);
        $stmt->fetch();

        // Password verification
        if (password_verify($password, $hashed_password)) {
            if ($is_verified) {
                $_SESSION["user_id"] = $user_id;
                $_SESSION["email"] = $email;
                header("Location: welcome.php"); // The page after logging in
                exit();
            } else {
                $error = "Пожалуйста, подтвердите ваш email перед входом";
            }
        } else {
            $error = "Неверный пароль";
        }
    } else {
        $error = "Пользователь с таким email не найден";
    }

    $stmt->close();
}
$conn->close();
?>
