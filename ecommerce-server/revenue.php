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
$results = [];
$results["success"] = true;
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
    $results["week"] = $total;
}else{
    $results["week"] = 0;
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
    $results["month"] = $total;
}else{
    $results["month"] = 0;
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
$results["year"] = $total;
}else{
    $results["year"] = 0;
}
echo json_encode($results);

?>