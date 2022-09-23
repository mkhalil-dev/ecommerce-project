<?php

include('connection.php');


if($_POST['email']){
    $email = $_POST['email'];
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

//Getting user ID
$getuser = $mysqli->prepare("SELECT id FROM users WHERE email=?");
$getuser->bind_param('s', $email);
$getuser->execute();
$userid = $getuser->get_result()->fetch_assoc()['id'];

if(!$userid){
    $response = [];
    $response["success"] = false;
    $response["message"] = "user not found";
    echo json_encode($response);
    exit();
}

function guidv4($data = null) {
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$resettoken = guidv4();

$query = $mysqli->prepare("UPDATE `users` SET `reset_token`=? WHERE id = ?");
$query->bind_param('ss', $resettoken, $userid);
$query->execute();
ini_set('display_errors', 1);

$msg = "./".$resettoken;

mail("ecommerceteam4@gmail.com", "Reset your Password", $msg);

?>