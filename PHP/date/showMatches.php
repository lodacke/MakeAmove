<?php

ini_set("display_errors", 1);

require_once("../helper.php");

allowCORS();
allowMethod("GET");

$fileName = "../DB/users.json";

$json = file_get_contents($fileName);
$users = json_decode($json, true);
$userToSend = [];

$loggedInUser = $_GET["id"];


forEach($users as $user){
    if($user["id"] === $loggedInUser){
    $loggedinUserMatches = array_column($user["matches"]["yes"], null);
    break;
    }
    if(in_array($loggedInUser, $user["matches"]["yes"])){
       $otherMatches[] = $user["id"];
    }
};

$match = array_intersect($otherMatches, $loggedinUserMatches);

if($match){

forEach($users as $user){
    if(in_array($user["id"], $match)){
        $userToSend[] = $user;
    }
}

forEach($userToSend as &$user){
    unset($user["password"]);
    unset($user["email"]);
}

send(200, $userToSend);

} else {
    send(200, "No matches to show");
}


