<?php
include('connection.php');

if(isset($_POST['user'])){
    $user = $_POST['user'];
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("SELECT * FROM messages WHERE users_sent = ? OR users_received = ?");
$query->bind_param('ii', $user, $user);
$query->execute();
$result = $query->get_result();

while($message = $result->fetch_assoc()){
    $response[] = $message;
}

echo json_encode($response);


?>