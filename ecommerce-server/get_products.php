<?php

include('connection.php');

$query = $mysqli->prepare("SELECT * FROM products");
$query->execute();
$result = $query->get_result();

while($product = $result->fetch_assoc()){
    $response[] = $product;
}

echo json_encode($response);

?>