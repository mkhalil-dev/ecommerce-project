<?php

include("connection.php");

if (isset($_POST["users_id"]) && isset($_POST["products_id"])) {
    $users_id = $_POST["users_id"];
    $products_id = $_POST["products_id"];
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

$query = $mysqli->prepare("DELETE FROM vouchers WHERE users_id=? and products_id=?");
$query->bind_param("ii", $users_id, $products_id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);