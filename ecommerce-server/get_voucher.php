<?php

include('connection.php');

if(isset($_GET['id'])){
    $id = $_GET['id'];
}
else{
    $response = [
        "success" => false,
        "message" => "missing post elements"
    ];
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT * FROM vouchers WHERE users_id=?");
$query->bind_param('s', $id);
$query->execute();
$result = $query->get_result()->fetch_assoc();

if(isset($result)){
    echo json_encode($result);
}
else{
    $response = [
        "success" => false,
        "message" => "no vouchers found"
    ];
    echo json_encode($response); 
}

?>