<?php

include("connection.php");

if(isset($_POST["fname"]) && isset($_POST["lname"]) && isset($_POST["email"]) && isset($_POST["password"])){
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $password = hash("sha256", $_POST["password"]);
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

$users_types_id =3;

$query = $mysqli->prepare("INSERT INTO users(fname, lname, email, password, users_types_id) VALUE (?, ?, ?, ?, ?)");
$query->bind_param("ssssi", $fname, $lname, $email, $password, $users_types_id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);

?>