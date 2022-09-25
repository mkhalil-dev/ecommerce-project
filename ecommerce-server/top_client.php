<?php

include('connection.php');
ini_set('display_errors', 1);

date_default_timezone_set('Asia/Beirut');

$date = date('Y-m-d h:i:s');
$timeunix = strtotime($date);
$timeunix -= 604800;
$date = gmdate("Y-m-d", $timeunix);
$query = $mysqli->prepare("SELECT Query.*, COUNT(Query.users_id) as Purchases FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query GROUP BY Query.users_id ORDER BY Purchases DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "week";
echo json_encode($result);

$date = date('Y:m:01');
$query = $mysqli->prepare("SELECT Query.*, COUNT(Query.users_id) as Purchases FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query GROUP BY Query.users_id ORDER BY Purchases DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "month";
echo json_encode($result);

$date = date('Y:01:01');
$query = $mysqli->prepare("SELECT Query.*, COUNT(Query.users_id) as Purchases FROM (SELECT * FROM purchases WHERE created_at > '$date') as Query GROUP BY Query.users_id ORDER BY Purchases DESC LIMIT 1");
$query->execute();
$result = $query->get_result()->fetch_assoc();
$result["type"] = "year";
echo json_encode($result);

?>