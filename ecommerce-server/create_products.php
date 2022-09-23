<?php

include("connection.php");

if (isset($_POST["seller_id"]) && isset($_POST["name"]) && isset($_POST["price"]) && isset($_POST["desc"]) && isset($_POST["categories_id"]) && isset($_POST["image"])) {
    $seller_id = $_POST["seller_id"];
    $name = $_POST["name"];
    $price = $_POST["price"];
    $desc = $_POST["desc"];
    $categories_id = $_POST["categories_id"];
    $image = $_POST["image"];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

$view = 0;
$discounts_id = null;

//Check Product Name
$checkname = $mysqli->prepare("SELECT name FROM products WHERE name=?");
$checkname->bind_param('s', $name);
$checkname->execute();
$result = $checkname->get_result()->fetch_assoc();

if (isset($result['name'])) {
    $response = [];
    $response["success"] = false;
    $response["message"] = "product already exists";
    echo json_encode($response);
    exit();
}

//Create a new product
$query = $mysqli->prepare("INSERT INTO products(seller_id, name, price, desc, categories_id, image) VALUE (?, ?, ?, ?, ?, ?)");
$query->bind_param("isisis", $seller_id, $name, $price, $desc, $categories_id, $image);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);