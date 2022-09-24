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

$query = $mysqli->prepare("SELECT W.*, P.* FROM wish_list W, products P WHERE users_id=? AND W.products_id = P.id");
$query->bind_param('i', $users_id);
$query->execute();
$result = $query->get_result();

while ($a = $result->fetch_assoc()) {
    $response[] = $a;
}

if (isset($response)) {
    echo json_encode($response);
} else {
    $response = [
        "success" => false,
        "message" => "no wishes"
    ];
    echo json_encode($response);
}