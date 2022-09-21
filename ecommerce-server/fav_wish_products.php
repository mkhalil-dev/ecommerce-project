<?php
include('connection.php');

//GET OPERATION
if(isset($_POST['op'])){
    $op = $_POST['op'];
}
else{
    $response = [
        "success" => false,
        "message" => "operation not defined"
    ];
    echo json_encode($response);
    exit();
}

//Get Fav / Wish
if($op == 'favorite' || $op == 'unfavorite'){
    $db = 'favorites';
}
else if($op == 'wish' || $op == 'unwish'){
    $db = 'wish_list';
}
else{
    $response = [
        "success" => false,
        "message" => "operation type not found"
    ];
    echo json_encode($response);
    exit();
}

//Get Email and Product
if(isset($_POST['email']) && isset($_POST['product'])){
    $email = $_POST['email'];
    $product = $_POST['product'];
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

//Validating product ID
$getproduct = $mysqli->prepare("SELECT id FROM products WHERE id=?");
$getproduct->bind_param('s', $product);
$getproduct->execute();
$productid = $getproduct->get_result()->fetch_assoc()['id'];

//Checking if user and product exists
if(!$userid || !$productid){
    $response = [
        "success" => false,
        "message" => "user or product not found"
    ];
    echo json_encode($response);
    exit();
}

//VERIFICATION IF ALREADY Favorited / Unfavorited / Wishlisted / Unwished
$userverf = $mysqli->prepare("SELECT * FROM `$db` WHERE products_id=? AND users_id=?");
$userverf->bind_param('ss', $productid, $userid);
$userverf->execute();
$result = $userverf->get_result()->fetch_assoc();

//IF ALREADY Favorited / Unfavorited / Wishlisted / Unwished
if(($result && $op == 'favorite') || (!$result && $op == 'unfavorite') || ($result && $op == 'wish') || (!$result && $op == 'unwish')){
    $response = [
        "success" => true,
        "message" => 'already done'
    ];
    echo json_encode($response);
    exit();
}

//Setting the Favorite/Wish record
if($op == 'favorite' || $op == 'wish'){
    $query = $mysqli->prepare("INSERT INTO `$db` (`products_id`, `users_id`) VALUES (?, ?);");
    $query->bind_param("ss", $productid, $userid);
    $query->execute();
    $response = [
        "success" => true
    ];
    echo json_encode($response);
}
//Remove Favorite/Wish Record
else if($op == 'unfavorite' || $op == 'unwish'){
    $query = $mysqli->prepare("DELETE FROM `$db` WHERE products_id=? AND users_id=?");
    $query->bind_param("ss", $productid, $userid);
    $query->execute();
    $response = [
        "success" => true
    ];
    echo json_encode($response);
}

?>