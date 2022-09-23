<?php

include('connection.php');
ini_set('display_errors', 1);

if (isset($_POST['name']) && (isset($_POST['price']) || isset($_POST['desc']) || isset($_POST['name']) || isset($_POST['categories_id']) || isset($_POST['image']))) {

    $id = $_POST['id'];

    //Check Product id
    $checkid = $mysqli->prepare("SELECT id FROM products WHERE id=?");
    $checkid->bind_param('i', $id);
    $checkid->execute();
    $result = $checkid->get_result()->fetch_assoc();

    if (!isset($result['id'])) {
        $response = [];
        $response["success"] = false;
        $response["message"] = "product does not exist";
        echo json_encode($response);
        exit();
    }

    if (isset($_POST['price'])) {
        $price = $_POST['price'];
        $query = $mysqli->prepare("UPDATE products SET price=? WHERE name=?");
        $query->bind_param("ii", $price, $id);
        $query->execute();
    }

    if (isset($_POST['desc'])) {
        $desc = $_POST['desc'];
        $query = $mysqli->prepare("UPDATE products SET `desc`=? WHERE name=?");
        $query->bind_param("si", $desc, $id);
        $query->execute();
    }

    if (isset($_POST['categories_id'])) {
        $categories_id = $_POST["categories_id"];
        $query = $mysqli->prepare("UPDATE products SET categories_id=? WHERE name=?");
        $query->bind_param("ii", $categories_id, $id);
        $query->execute();
    }

    if (isset($_POST['image'])) {
        $image = $_POST["image"];
        $query = $mysqli->prepare("UPDATE products SET image=? WHERE name=?");
        $query->bind_param("si", $image, $id);
        $query->execute();
    }

    if (isset($_POST['name'])) {
        $newname = $_POST['name'];
        $query = $mysqli->prepare("UPDATE products SET name=? WHERE name=?");
        $query->bind_param("si", $name, $id);
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