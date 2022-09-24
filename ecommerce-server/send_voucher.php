<?php

include('connection.php');

if(isset($_POST['vid']) && isset($_POST['id']) && isset($_POST['email'])){
    $vid = $_POST['vid'];
    $id = $_POST['id'];
    $email = $_POST['email'];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

//Looking for the receiving user ID
$query = $mysqli->prepare("SELECT * FROM users WHERE email=?");
$query->bind_param('s', $email);
$query->execute();
$ruserid = $query->get_result()->fetch_assoc()['id'];

//Validating Voucher
$query = $mysqli->prepare("SELECT * FROM vouchers WHERE users_id=? AND id=?");
$query->bind_param('ss', $id, $vid);
$query->execute();
$voucherid = $query->get_result()->fetch_assoc()['id'];

if(!isset($voucherid) || !isset($ruserid)){
    $response = [];
    $response["success"] = false;
    $response["message"] = "sser not found";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT * FROM vouchers WHERE users_id=? AND id=?");
$query->bind_param('ss', $id, $vid);
$query->execute();
$voucherid = $query->get_result()->fetch_assoc()['id'];




?>