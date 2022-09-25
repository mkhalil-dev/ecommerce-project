<?php

include('connection.php');

if (isset($_POST['id']) && (isset($_POST['price']) || isset($_POST['desc']) || isset($_POST['name']) || isset($_POST['categories_id']) || isset($_POST['image']))) {

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

    if ($_POST['price']) {
        $price = $_POST['price'];
        $query = $mysqli->prepare("UPDATE products SET price=? WHERE id=?");
        $query->bind_param("ii", $price, $id);
        $query->execute();
    }

    if ($_POST['desc']) {
        $desc = $_POST['desc'];
        $query = $mysqli->prepare("UPDATE products SET `desc`=? WHERE id=?");
        $query->bind_param("si", $desc, $id);
        $query->execute();
    }

    if ($_POST['categories_id']) {
        $categories_id = $_POST["categories_id"];
        $query = $mysqli->prepare("UPDATE products SET categories_id=? WHERE id=?");
        $query->bind_param("ii", $categories_id, $id);
        $query->execute();
    }

    if ($_POST['image'] != "undefined") {
        $image = $_POST["image"];
        $query = $mysqli->prepare("UPDATE products SET image=? WHERE id=?");
        $query->bind_param("si", $image, $id);
        $query->execute();
    }

    if ($_POST['name']) {
        $newname = $_POST['name'];
        $query = $mysqli->prepare("UPDATE products SET name=? WHERE id=?");
        $query->bind_param("si", $newname, $id);
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