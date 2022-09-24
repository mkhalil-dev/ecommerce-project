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

$query = $mysqli->prepare("SELECT subquery.* FROM (SELECT A.users_id, A.amount,P.* FROM add_to_cart A, products P WHERE P.id = A.products_id AND A.users_id = ?) AS subquery LEFT JOIN discounts ON subquery.discounts_id = discounts.id");
$query->bind_param('s', $id);
$query->execute();
$result = $query->get_result();

while ($a = $result->fetch_assoc()){
    $response[] = $a;
}

if(isset($response)){
    echo json_encode($response);
}else{
    $response = [
        "success" => "false",
        "message" => "no items in cart"
    ];

    echo json_encode($response);
}

?>