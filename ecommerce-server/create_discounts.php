<?php

include("connection.php");

if (isset($_POST["amount"]) && isset($_POST["code"]) && isset($_POST["id"])) {
    $amount = $_POST["amount"];
    $code = $_POST["code"];
    $product_id = $_POST["id"];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

//Check discount code
$checkcode = $mysqli->prepare("SELECT code FROM discounts WHERE code=?");
$checkcode->bind_param('s', $code);
$checkcode->execute();
$result = $checkcode->get_result()->fetch_assoc();

if (isset($result['code'])) {
    $response = [];
    $response["success"] = false;
    $response["message"] = "discount code already exists";
    echo json_encode($response);
    exit();
}

//Create a discount
$query = $mysqli->prepare("INSERT INTO discounts(amount, code) VALUE (?, ?)");
$query->bind_param("is", $amount, $code);
$query->execute();

// $response = [];
// $response["success"] = true;

// echo json_encode($response);

//select discount id from discount table using discount code
$checkcode = $mysqli->prepare("SELECT id FROM discounts WHERE code=?");
$checkcode->bind_param('s', $code);
$checkcode->execute();
$result = $checkcode->get_result()->fetch_assoc();

$response = [];
$response["success"] = true;

// echo json_encode($response);
echo json_encode($result);