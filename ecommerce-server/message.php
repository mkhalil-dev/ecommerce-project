<?php
include("connection.php");

if(isset($_POST['content']) && $_POST['suser'] && $_POST['ruser']){
    $content = $_POST['content'];
    $suser = $_POST['suser'];
    $ruser = $_POST['ruser'];
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("INSERT INTO `messages`(`users_sent`, `users_received`, `content`) VALUES (?,?,?)");
$query->bind_param('sss', $suser, $ruser, $content);
$query->execute();

$response = [
    "success"=> true
];

echo json_encode($response);

?>