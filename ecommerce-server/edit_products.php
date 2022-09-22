<?php

include('connection.php');
ini_set('display_errors', 1);

if (isset($_POST['name']) && (isset($_POST['price']) || isset($_POST['desc']) || isset($_POST['newname']) || isset($_POST['categories_id']) || isset($_POST['image']))) {

    $name = $_POST['name'];

    //Check Product Name
    $checkname = $mysqli->prepare("SELECT name FROM products WHERE name=?");
    $checkname->bind_param('s', $name);
    $checkname->execute();
    $result = $checkemail->get_result()->fetch_assoc();

    if (!isset($result['name'])) {
        $response = [];
        $response["success"] = false;
        $response["message"] = "product does not exist";
        echo json_encode($response);
        exit();
    }

    if (isset($_POST['price'])) {
        $price = $_POST['price'];
        $query = $mysqli->prepare("UPDATE products SET price=? WHERE name=?");
        $query->bind_param("is", $price, $name);
        $query->execute();
    }

    if (isset($_POST['desc'])) {
        $desc = $_POST['desc'];
        $query = $mysqli->prepare("UPDATE products SET desc=? WHERE name=?");
        $query->bind_param("ss", $desc, $name);
        $query->execute();
    }

    if (isset($_POST['categories_id'])) {
        $categories_id = $_POST["categories_id"];
        $query = $mysqli->prepare("UPDATE products SET categories_id=? WHERE name=?");
        $query->bind_param("is", $categories_id, $name);
        $query->execute();
    }

    if (isset($_POST['image'])) {
        $image = $_POST["image"];
        $query = $mysqli->prepare("UPDATE products SET image=? WHERE name=?");
        $query->bind_param("ss", $image, $name);
        $query->execute();
    }

    if (isset($_POST['newname'])) {
        $newname = $_POST['newename'];
        $query = $mysqli->prepare("UPDATE products SET name=? WHERE name=?");
        $query->bind_param("ss", $newename, $name);
        $query->execute();
    }
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$response = [];
$response["success"] = true;
$response["message"] = "product updated succesfully";
echo json_encode($response);