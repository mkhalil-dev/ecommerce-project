<?php

include('connection.php');
ini_set('display_errors', 1);

date_default_timezone_set('Asia/Beirut');

$date = date('Y-m-d h:i:s');
$timeunix = strtotime($date);
$timeunix -= 604800;
$date = gmdate("Y-m-d", $timeunix);
$query = $mysqli->prepare("SELECT P.seller_id, Query.products_id, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id GROUP BY Query.products_id ORDER BY product_sold DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "week";
echo json_encode($result);

$date = date('Y:m:01');
$query = $mysqli->prepare("SELECT P.seller_id, Query.products_id, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id GROUP BY Query.products_id ORDER BY product_sold DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "month";
echo json_encode($result);

$date = date('Y:01:01');
$query = $mysqli->prepare("SELECT P.seller_id, Query.products_id, COUNT(Query.products_id) as product_sold FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query, products P WHERE P.id = QUERY.products_id GROUP BY Query.products_id ORDER BY product_sold DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "year";
echo json_encode($result);

?>