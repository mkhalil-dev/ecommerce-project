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

$query = $mysqli->prepare("UPDATE products SET view=view+1 WHERE id=?");
$query->bind_param('s', $id);
$query->execute();

$response = [
    "success" => true,
];
echo json_encode($response);

