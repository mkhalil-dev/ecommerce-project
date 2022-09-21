<?php

include('connection.php');

//Check if body is all sent, if not return an error
if(isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['password']) && isset($_POST['email'])) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $pass = hash("sha256", $_POST["password"]);
} else {
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing post elements";
    echo json_encode($response);
    exit();
}

//Checking if username or email exists in the backend
$query = $mysqli->prepare("SELECT email FROM users WHERE email=?");
$query->bind_param('s', $email);
$query->execute();
$reply = $query->get_result()->fetch_assoc()['email'];

//If user or email exists, exit the script and return an error
if($reply){
    $response = [];
    $response["success"] = false;
    $response["message"] = "email already exists";
    echo json_encode($response);
    exit();
}

//Inserting new user
$usertype = 3;
$query = $mysqli->prepare("INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `users_types_id`, `ban`) VALUES (NULL, ?, ?, ?, ?, ?, NULL);");
$query->bind_param("ssssi", $fname, $lname, $email, $pass, $usertype);
$query->execute();

$response = [];
$response["success"] = true;
$response["message"] = "user created succesfully";

echo json_encode($response);

?>