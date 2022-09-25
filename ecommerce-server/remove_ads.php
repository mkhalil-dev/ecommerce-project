<?php

include('connection.php');
ini_set('display_errors', 1);

if (isset($_GET['id'])) {

    $id = $_GET['id'];

    //Check Product id
    $checkid = $mysqli->prepare("SELECT id FROM products WHERE id=?");
    $checkid->bind_param('i', $id);
    $checkid->execute();
    $result = $checkid->get_result()->fetch_assoc();

    if (!isset($result['id'])) {
        $response = [];
        $response["success"] = false;
        $response["message"] = "ad does not exist";
        echo json_encode($response);
        exit();
    }
    $query = $mysqli->prepare("UPDATE products SET ad=null WHERE id=?");
    $query->bind_param("i", $id);
    $query->execute();

} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing get elements";
    echo json_encode($response);
    exit();
}

$response = [];
$response["success"] = true;
$response["message"] = "ad removed succesfully";
echo json_encode($response);