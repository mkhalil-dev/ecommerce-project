<?php

include('connection.php');

if (isset($_GET['users_id'])) {
    $users_id = $_GET['users_id'];
} else {
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT * FROM favorites WHERE users_id=?");
$query->bind_param('i', $users_id);
$query->execute();
$result = $query->get_result()->fetch_assoc();



if (isset($result)) {
    echo json_encode($result);
} else {
    $response = [
        "success" => false,
        "message" => "user not found"
    ];
    echo json_encode($response);
}