<?php

include("connection.php");

$users_id = $_GET["users_id"];
$products_id = $_GET["products_id"];

$query = $mysqli->prepare("DELETE FROM add_to_cart WHERE users_id=? and products_id=?");
$query->bind_param("ii", $users_id, $products_id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);
