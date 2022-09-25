<?php

include('connection.php');

if(isset($_GET["search"])){
    $search = $_GET["search"];
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare('SELECT subquery.* FROM (SELECT * FROM products WHERE name like "%'.$search.'%" ORDER BY name ASC) as subquery LIMIT 4;');
$query->execute();
$result = $query->get_result();

while($a = $result->fetch_assoc()){
    $response[] = $a;
}

echo json_encode($response);
