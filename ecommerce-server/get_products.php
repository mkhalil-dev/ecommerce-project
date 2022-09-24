<?php

include('connection.php');
ini_set('display_errors', 1);

if (isset($_POST['seen'])){
    $seen = $_POST['seen'];
}
else{
    $seen = "('')";
}

if (isset($_POST['catid'])){
    $catid = $_POST['catid'];
}
$seen = "(".$seen.")";

if(!isset($catid)){
    $query = $mysqli->prepare("SELECT P.*,subquery.* FROM products P, (SELECT COUNT(C.id) as product_count FROM products C) AS subquery WHERE P.id NOT IN $seen LIMIT 8");
}
else{
    $query = $mysqli->prepare("SELECT P.*,subquery.* FROM products P, (SELECT COUNT(C.id) as product_count FROM products C) AS subquery WHERE P.id NOT IN $seen AND P.categories_id = '$catid' LIMIT 8");
}
$query->execute();
$result = $query->get_result();

while($product = $result->fetch_assoc()){
    $response[] = $product;
}

if(isset($response)){
    echo json_encode($response);
}else {
    $response = [
        "success" => false,
        "message" => "no products found"
    ];
    echo json_encode($response);
}