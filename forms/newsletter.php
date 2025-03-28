<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "almirmerzic@hotmail.com";
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    $subject = "Newsletter Subscription";
    $message = "New subscription request from: " . $email;
    
    $headers = "From: sender@example.com\r\n";
    $headers .= "Reply-To: sender@example.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Your subscription request has been sent. Thank you!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send subscription request."]);
    }
    exit;
}

?>