<?php

include('connection.php');

$id = $_POST['id'];

$query = $mysqli->prepare("UPDATE `users` SET ban=true where `id`=?;");
$query->bind_param("i", $id);
$query->execute();

$response = [];
$response["success"] = true;
$response["message"] = "client banned succesfully";

echo json_encode($response);