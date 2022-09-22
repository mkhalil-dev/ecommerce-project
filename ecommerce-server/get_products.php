<?php

include('connection.php');

if (isset($_POST['seen'])){
    $seen = $_POST['seen'];
}
else{
    $seen = "('')";
}

$seen = "(".$seen.")";

$query = $mysqli->prepare("SELECT P.*,subquery.* FROM products P, (SELECT COUNT(C.id) as product_count FROM products C) AS subquery WHERE P.id NOT IN $seen LIMIT 8");
$query->execute();
$result = $query->get_result();

while($product = $result->fetch_assoc()){
    $response[] = $product;
}

echo json_encode($response);