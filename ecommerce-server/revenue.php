<?php

include('connection.php');
ini_set('display_errors', 1);

date_default_timezone_set('Asia/Beirut');

if(isset($_POST['id'])){
    $id = $_POST['id'];
} 
else{
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$date = date('Y-m-d h:i:s');
$timeunix = strtotime($date);
$timeunix -= 604800;
$date = gmdate("Y-m-d", $timeunix);
$query = $mysqli->prepare("SELECT P.seller_id, P.price, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id AND P.seller_id = '$id' GROUP BY Query.products_id ORDER BY product_sold");
$query->execute();
$result = $query->get_result();
while($a = $result->fetch_assoc()){
    $response[] = $a;
};
if(isset($response)){
    $total = 0;
    foreach ($response as $x){
        $total += $x['price'] * $x['product_sold'];
    };
    $response = [
        "success" => true,
        "revenue" => $total,
        "period" => "week"
    ];
    echo json_encode($response);
}else{
    $response = [
        "success" => true,
        "revenue" => 0,
        "period" => "week"
    ];
    echo json_encode($response);
}



$date = date('Y:m:01');
$query = $mysqli->prepare("SELECT P.seller_id, P.price, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id AND P.seller_id = '$id' GROUP BY Query.products_id ORDER BY product_sold");
$query->execute();
$result = $query->get_result();
while($a = $result->fetch_assoc()){
    $response2[] = $a;
};

if(isset($response2)){
    $total = 0;
    foreach ($response2 as $x){
        $total += $x['price'] * $x['product_sold'];
    };
    $response2 = [
        "success" => true,
        "revenue" => $total,
        "period" => "month"
    ];
    echo json_encode($response2);
}else{
    $response2 = [
        "success" => true,
        "revenue" => 0,
        "period" => "month"
    ];
    echo json_encode($response2);
}


$date = date('Y:01:01');
$query = $mysqli->prepare("SELECT P.seller_id, P.price, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id AND P.seller_id = '$id' GROUP BY Query.products_id ORDER BY product_sold");
$query->execute();
$result = $query->get_result();
while($a = $result->fetch_assoc()){
    $response3[] = $a;
}

if(isset($response3)){
$total = 0;
foreach ($response3 as $x){
    $total += $x['price'] * $x['product_sold'];
};
$response3 = [
    "success" => true,
    "revenue" => $total,
    "period" => "year"
];
echo json_encode($response3);
}else{
    $response3 = [
        "success" => true,
        "revenue" => 0,
        "period" => "year"
    ];
    echo json_encode($response3);
}

?>