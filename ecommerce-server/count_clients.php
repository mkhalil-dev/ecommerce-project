<?php

include("connection.php");

$query = $mysqli->prepare("SELECT count(*) FROM users where users_types_id = 3 order by fname,lname asc");
$query->execute();
$array = $query->get_result();

$response = [];

while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}

$json = json_encode($response);
echo $json;