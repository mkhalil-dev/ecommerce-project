<?php
include('connection.php');

if(isset($_POST['user']) && isset($_POST['seller'])){
    $user = $_POST['user'];
    $seller = $_POST['seller'];
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT * FROM messages WHERE (users_sent = ? AND users_received = ?) OR (users_sent = ? AND users_received = ?) ORDER BY created_at ASC");
$query->bind_param('iiii', $user, $seller, $seller, $user);
$query->execute();
$result = $query->get_result();

while($message = $result->fetch_assoc()){
    $response[] = $message;
}

echo json_encode($response);


?>