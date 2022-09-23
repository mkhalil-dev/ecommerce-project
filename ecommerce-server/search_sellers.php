<?php

include('connection.php');

if (isset($_GET["search"])) {
    $search = $_GET["search"];
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare('SELECT * FROM users WHERE users_types_id=1 and (lname like "%' . $search . '%" or fname like "%' . $search . '%" or email like "%' . $search . '%") ORDER BY fname,lname ASC');
$query->execute();
$result = $query->get_result();

while ($a = $result->fetch_assoc()) {
    $response[] = $a;
}

echo json_encode($response);