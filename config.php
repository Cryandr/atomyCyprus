<?php
$servername = "localhost";
$username = "root"; // For XAMPP
$password = ""; // It's default empty 
$dbname = "registration_db";

// Connectiong to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Connection cheking
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
