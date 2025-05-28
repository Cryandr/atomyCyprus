<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $verification_code = trim($_POST['verification_code']);

    echo "Email from form: $email <br>";
    echo "Code from form: " . htmlspecialchars($verification_code) . "<br>";

    // Checking if there is a user with such an email address.
    $stmt = $conn->prepare("SELECT verification_code FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        die("Error: User with this email not found!");
    }

    $code_from_db = trim($row['verification_code']);
    echo "Code from database: $code_from_db <br>";

    if ($verification_code === $code_from_db) {
        echo "Verification Code correct! <br>";

        // Updating status
        $update_stmt = $conn->prepare("UPDATE users SET is_verified = 1 WHERE email = ?");
        $update_stmt->bind_param("s", $email);
        $update_stmt->execute();

        header("Location: mainpage.html");
        exit();
    } else {
        die("Wrong verification code.");
    }
}
?>
