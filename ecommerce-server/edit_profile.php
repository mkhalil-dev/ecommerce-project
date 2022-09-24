<?php

include('connection.php');

if(isset($_POST['userid']) && (isset($_POST['fname']) || isset($_POST['lname']) || isset($_POST['password']))){
    
    $userid = $_POST['userid'];

    //Check sellers Email
    $checkemail = $mysqli->prepare("SELECT email FROM users WHERE id=?");
    $checkemail->bind_param('s', $userid);
    $checkemail->execute();
    $email = $checkemail->get_result()->fetch_assoc()['email'];

    if (!isset($email)) {
        $response = [];
        $response["success"] = false;
        $response["message"] = "user does not exist";
        echo json_encode($response);
        exit();
    }
    
    if(isset($_POST['fname'])){
        $fname = $_POST['fname'];
        echo $fname;
        $query = $mysqli->prepare("UPDATE users SET fname=? WHERE email=?");
        $query->bind_param("ss", $fname, $email);
        $query->execute();
    }

    if(isset($_POST['lname'])){
        $lname = $_POST['lname'];
        $query = $mysqli->prepare("UPDATE users SET lname=? WHERE email=?");
        $query->bind_param("ss", $lname, $email);
        $query->execute();
    }

    if(isset($_POST['password'])){
        $password = hash("sha256", $_POST["password"]);
        $query = $mysqli->prepare("UPDATE users SET password=? WHERE email=?");
        $query->bind_param("ss", $password, $email);
        $query->execute();
    }

}
else{
    $response = [];
    $response["success"] = false;
    $response["message"] = "missing elements";
    echo json_encode($response);
    exit();
}

$response = [];
$response["success"] = true;
$response["message"] = "profile updated succesfully";
echo json_encode($response);

?>