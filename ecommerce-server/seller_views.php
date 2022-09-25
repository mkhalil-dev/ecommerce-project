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

$query = $mysqli->prepare("SELECT view FROM products WHERE seller_id=?");
$query->bind_param('s', $seller_id);
$query->execute();
$result = $query->get_result();


while ($product = $result->fetch_assoc()) {
    $response[] = $product;
}

if (isset($response)) {
    $views = 0;
    foreach ($response as $x) {
        $views += $x['view'];
    };
    $results[] = $views;
} else {
    $results[] = 0;
}
echo json_encode($results);