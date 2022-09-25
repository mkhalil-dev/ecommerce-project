<?php

include("connection.php");

if (isset($_POST["users_id"]) && isset($_POST["products_id"]) && isset($_POST["id"])) {
    $users_id = $_POST["users_id"];
    $products_id = $_POST["products_id"];
    $id = $_POST["id"];
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

$query = $mysqli->prepare("DELETE FROM vouchers WHERE id=?");
$query->bind_param("i", $id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);