<?php

include("connection.php");

if (isset($_GET["name"])) {
    $name = $_GET["name"];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}


//Check category name
$checkname = $mysqli->prepare("SELECT name FROM categories WHERE name=?");
$checkname->bind_param('s', $name);
$checkname->execute();
$result = $checkname->get_result()->fetch_assoc();

if (isset($result['name'])) {
    $response = [];
    $response["success"] = false;
    $response["message"] = "category already exists";
    echo json_encode($response);
    exit();
}

//Create a new category
$query = $mysqli->prepare("INSERT INTO categories(name) VALUE (?)");
$query->bind_param("s", $name);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);
