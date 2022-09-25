<?php

include('connection.php');

if (isset($_POST['id'])) {
    $seller_id = $_POST['id'];
} else {
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT count(pr.name) FROM products as pr, purchases as pu WHERE pr.id=pu.products_id and pr.seller_id=?");
$query->bind_param('s', $seller_id);
$query->execute();
$result = $query->get_result();


while ($product = $result->fetch_assoc()) {
    $response[] = $product;
}
echo json_encode($response);