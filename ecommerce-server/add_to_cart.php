<?php
include('connection.php');

//Get Email and Product
if (isset($_POST['id']) && isset($_POST['product'])) {
    $id = $_POST['id'];
    $product = $_POST['product'];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

//Validating user ID
$getuser = $mysqli->prepare("SELECT id FROM users WHERE id=?");
$getuser->bind_param('s', $id);
$getuser->execute();
$userid = $getuser->get_result()->fetch_assoc()['id'];

//Validating product ID
$getproduct = $mysqli->prepare("SELECT id FROM products WHERE id=?");
$getproduct->bind_param('s', $product);
$getproduct->execute();
$productid = $getproduct->get_result()->fetch_assoc()['id'];

//Checking if user and product exists
if (!$productid) {
    $response = [
        "success" => false,
        "message" => "product not found"
    ];
    echo json_encode($response);
    exit();
}

//VERIFICATION IF ALREADY Added to cart
$userverf = $mysqli->prepare("SELECT * FROM add_to_cart WHERE products_id=? AND users_id=?");
$userverf->bind_param('ss', $productid, $userid);
$userverf->execute();
$result = $userverf->get_result()->fetch_assoc();

//IF ALREADY added to cart only increase the amount by 1
if (isset($result['amount'])) {
    $amount = $result['amount'];
    if (!isset($_POST['amount'])) {
        $amount += 1;
    } else {
        $amount += $_POST['amount'];
    }
    $query = $mysqli->prepare("UPDATE add_to_cart SET amount=? WHERE users_id=? AND products_id=?");
    $query->bind_param("iss", $amount, $userid, $productid);
    $query->execute();
    $response = [
        "success" => true,
        "message" => "item added to cart"
    ];
    echo json_encode($response);
} else {
    if (!isset($_POST['amount'])) {
        $query = $mysqli->prepare("INSERT INTO `add_to_cart`(`users_id`, `products_id`) VALUES (?, ?);");
        $query->bind_param("ss", $userid, $productid);
    } else {
        $query = $mysqli->prepare("INSERT INTO `add_to_cart`(`users_id`, `products_id`, `amount`) VALUES (?, ?, ?);");
        $query->bind_param("ssi", $userid, $productid, $_POST['amount']);
    }
    $query->execute();
    $response = [
        "success" => true,
        "message" => "item added to cart"
    ];
    echo json_encode($response);
}