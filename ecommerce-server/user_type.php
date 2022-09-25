<?php

include('connection.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT t.type FROM users as u, user_types as t WHERE t.id=u.users_types_id and u.id=?");
$query->bind_param('s', $id);
$query->execute();
$result = $query->get_result();


while ($product = $result->fetch_assoc()) {
    $response[] = $product;
}
echo json_encode($response);