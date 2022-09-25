<?php

include('connection.php');

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

$query = $mysqli->prepare("SELECT * FROM products WHERE seller_id=?");
$query->bind_param('s', $id);
$query->execute();
$result = $query->get_result();


while($product = $result->fetch_assoc()){
    $response[] = $product;
}

if($response){
    echo json_encode($response);
}
else{
    $response = [
        "success" => false,
        "message" => "products not found"
    ];
    echo json_encode($response);
}

