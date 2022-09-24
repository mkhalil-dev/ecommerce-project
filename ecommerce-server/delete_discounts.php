<?php

include("connection.php");

$id = $_GET["id"];

$query = $mysqli->prepare("DELETE FROM discounts WHERE id=?");
$query->bind_param("i", $id);
$query->execute();

$response = [];
$response["success"] = true;

echo json_encode($response);