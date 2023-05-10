<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

$filename = "../DB/users.json";

if($_SERVER["REQUEST_METHOD"] === "GET"){
    $json = file_get_contents($filename);
    $users = json_decode($json, true);

    $requestInput = file_get_contents("php://input");
    $requestDATA = json_decode($requestInput, true);

    $email = $requestDATA["email"];

    for($i = 0; $i < count($users); $i++){
        $user = $users[$i];
        if($user["email"] == $email)



    if(in_array("", $users))

    $randomIndex = array_rand($users);
    $randomuserIndex = array_rand($users, 1);
    $randomUser = array_rand($users, $randomIndex);


}

?> 