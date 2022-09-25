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

$query = $mysqli->prepare("SELECT V.*, P.name, P.image, P.price FROM vouchers V, products P WHERE P.id = V.products_id AND V.users_id = ?");
$query->bind_param('s', $id);
$query->execute();
$result = $query->get_result();

while($a = $result->fetch_assoc()){
    $response[] = $a;
}

if(isset($response)){
    echo json_encode($response);
}
else{
    $response = [
        "success" => false,
        "message" => "no vouchers found"
    ];
    echo json_encode($response); 
}

?>