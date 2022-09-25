<?php

include('connection.php');

if (isset($_POST['seller_id'])) {
    $seller_id = $_POST['seller_id'];
} else {
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT name FROM products WHERE (discounts_id is not null) and seller_id=?");
$query->bind_param('s', $seller_id);
$query->execute();
$result = $query->get_result();


while ($product = $result->fetch_assoc()) {
    $response[] = $product;
}
echo json_encode($response);