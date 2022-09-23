<?php

include("connection.php");

$query = $mysqli->prepare("SELECT * FROM products order by view desc limit 5");
$query->execute();
$array = $query->get_result();

$response = [];

while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}

$json = json_encode($response);
echo $json;