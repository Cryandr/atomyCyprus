<?php
require 'config.php';
require 'vendor/autoload.php'; // Connecting to PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $birth_date = $_POST['year'] . '-' . $_POST['month'] . '-' . $_POST['day'];
    $city = $_POST['city'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $tic = $_POST['tic'];

    $verification_code = rand(100000, 999999);

    $stmt = $conn->prepare("INSERT INTO users (email, password, firstname, lastname, birthdate, city, phone, address, tic, verification_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $email, $password, $firstname, $lastname, $birth_date, $city, $phone, $address, $tic, $verification_code);

    if ($stmt->execute()) {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'rommysgoog@gmail.com';
            $mail->Password = 'zewzbkgetkatoyzh'; // Password application
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('atomyCyprus@gmail.com', 'Verification');
            $mail->addAddress($email);
            $mail->isHTML(true);
			$mail->CharSet = 'UTF-8';
			$mail->Subject = "Код подтверждения";
			$mail->Body = "Ваш код подтверждения: <b>$verification_code</b>";


            $mail->send();
			header("Location: verify.html?email=" . urlencode($email));       
            exit();
        } catch (Exception $e) {
            echo "Ошибка при отправке письма: " . $mail->ErrorInfo;
        }
    } else {
        echo "Ошибка при регистрации.";
    }
}
?>