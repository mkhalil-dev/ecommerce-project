<?php

include('connection.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
} else {
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("UPDATE `users` SET ban=NULL where `id`=?;");
$query->bind_param("i", $id);
$query->execute();

$response = [];
$response["success"] = true;
$response["message"] = "client unbanned succesfully";

echo json_encode($response);