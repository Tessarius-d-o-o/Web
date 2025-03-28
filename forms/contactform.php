<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "almirmerzic@hotmail.com";
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    $fullMessage = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo json_encode(["status" => "success", "message" => "Your message has been sent. Thank you!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send message."]);
    }
    exit;
}

?>
