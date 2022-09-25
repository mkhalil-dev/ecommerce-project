<?php

include("connection.php");

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

$query = $mysqli->prepare("SELECT P.name, P.id, P.view FROM products P WHERE seller_id = ? order by view desc limit 5");
$query->bind_param('s', $id);
$query->execute();
$array = $query->get_result();

$response = [];

while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}

$json = json_encode($response);
echo $json;