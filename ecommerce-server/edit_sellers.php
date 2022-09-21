<?php

include("connection.php");

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$password = hash("sha256", $_POST["password"]);
$users_types_id = $_POST["users_types_id"];
$ban = $_post["ban"];

$query = $mysqli->prepare("UPDATE users SET fname=?, lname=?, email=?, password=?, users_types_id=?, ban=? where email = ?");
$query->bind_param("ssssibi", $fname, $lname, $email, $password, $users_types_id, $ban, $id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);