<?php

include("connection.php");

if (isset($_POST["id"]) && isset($_POST["pid"])) {
    $users_id = $_POST["id"];
    $products_id = $_POST["pid"];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("INSERT INTO purchases(users_id, products_id) VALUE (?, ?)");
$query->bind_param("ii", $users_id, $products_id);
$query->execute();

$query = $mysqli->prepare("DELETE FROM add_to_cart WHERE users_id=? and products_id=?");
$query->bind_param("ii", $users_id, $products_id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);