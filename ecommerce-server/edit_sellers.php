<?php

include('connection.php');
ini_set('display_errors', 1);

if(isset($_POST['id']) && (isset($_POST['fname']) || isset($_POST['lname']) || isset($_POST['newemail']) || isset($_POST['password']))){
    
    $id = $_POST['id'];

    //Check sellers Email
    $checkemail = $mysqli->prepare("SELECT id FROM users WHERE id=?");
    $checkemail->bind_param('s', $id);
    $checkemail->execute();
    $result = $checkemail->get_result()->fetch_assoc();

    if (!isset($result['id'])) {
        $response = [];
        $response["success"] = false;
        $response["message"] = "user does not exist";
        echo json_encode($response);
        exit();
    }
    
    if(isset($_POST['fname'])){
        $fname = $_POST['fname'];
        echo $fname;
        $query = $mysqli->prepare("UPDATE users SET fname=? WHERE id=?");
        $query->bind_param("ss", $fname, $id);
        $query->execute();
    }

    if(isset($_POST['lname'])){
        $lname = $_POST['lname'];
        $query = $mysqli->prepare("UPDATE users SET lname=? WHERE id=?");
        $query->bind_param("ss", $lname, $id);
        $query->execute();
    }

    if(isset($_POST['password'])){
        $password = hash("sha256", $_POST["password"]);
        $query = $mysqli->prepare("UPDATE users SET password=? WHERE id=?");
        $query->bind_param("ss", $password, $id);
        $query->execute();
    }

    if(isset($_POST['newemail'])){
        $newemail = $_POST['newemail'];
        $query = $mysqli->prepare("UPDATE users SET email=? WHERE id=?");
        $query->bind_param("ss", $newemail, $id);
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