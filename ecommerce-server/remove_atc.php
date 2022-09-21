<?php
include('connection.php');

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

//VERIFICATION IF ALREADY Added to cart
$userverf = $mysqli->prepare("SELECT * FROM add_to_cart WHERE products_id=? AND users_id=?");
$userverf->bind_param('ss', $productid, $userid);
$userverf->execute();
$result = $userverf->get_result()->fetch_assoc();

//IF FOUND DELETE THE ATC
if(isset($result['amount'])){
    $query = $mysqli->prepare("DELETE FROM add_to_cart WHERE users_id=? AND products_id=?");
    $query->bind_param("ss", $userid, $productid);
    $query->execute();
    $response = [
        "success" => true,
        "message" => "item deleted from cart"
    ];
    echo json_encode($response);
}
else{
    $response = [
        "success" => true,
        "message" => "item not found in cart"
    ];
    echo json_encode($response);
}

?>