<?php

include('connection.php');

//Check if body is all received, if not return an error
if(isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $pass = hash("sha256", $_POST["password"]);
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

//Checking if username exists and getting the password
$query = $mysqli->prepare("SELECT * FROM users WHERE email=?");
$query->bind_param('s', $email);
$query->execute();
$truepass = $query->get_result()->fetch_assoc();

//if user/pass combo matches
if($truepass['password'] == $pass){
    if($truepass['ban']){
        $response = [];
        $response["success"] = false;
        $response["message"] = "banned";
        echo json_encode($response);
        exit();
    }
    $response = [];
    $response["success"] = true;
    $response["message"] = "login succesfull";
    $response["userid"] = $truepass['id'];
    $response["fname"] = $truepass['fname'];
    $response["lname"] = $truepass['lname'];
    $response["lname"] = $truepass['lname'];
    $response["type"] = $truepass['users_types_id'];
    echo json_encode($response);
}

//if login failed
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "login failed, user and password combination is not correct";
    echo json_encode($response);
}

?>