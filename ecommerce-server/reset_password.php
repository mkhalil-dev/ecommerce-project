<?php

include('connection.php');

if(isset($_GET['token']) && isset($_POST['password'])){
    $token = $_GET['token'];
    $password = hash("sha256", $_POST["password"]);
}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$getuser = $mysqli->prepare("SELECT * FROM users WHERE reset_token=?");
$getuser->bind_param('s', $token);
$getuser->execute();
$userid = $getuser->get_result()->fetch_assoc()['id'];
if(!$userid){
    $response = [];
    $response["success"] = false;
    $response["message"] = "Invalid Token";
    echo json_encode($response);
    exit();
}

$query = $mysqli->prepare("UPDATE users SET password=? WHERE reset_token=?");
$query->bind_param("ss", $password, $token);
$query->execute();


$removetoken = $mysqli->prepare("UPDATE users SET reset_token=NULL WHERE reset_token=?");
$removetoken->bind_param("s", $token);
$removetoken->execute();

$response = [];
$response["success"] = true;
$response["message"] = "password updated succesfully";
echo json_encode($response);


?>
