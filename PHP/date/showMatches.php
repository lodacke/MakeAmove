<?php

ini_set("display_errors", 1);

require_once("../helper.php");

allowCORS();
allowMethod("GET");

$fileName = "../DB/users.json";

$json = file_get_contents($fileName);
$users = json_decode($json, true);
$userToSend = [];
$userWhoLoggedInLikes = [];
$othersMatches = [];
$loggedInUser = $_GET["id"];


forEach($users as $user){
    if($user["id"] === $loggedInUser){
    $userWhoLoggedInLikes = array_column($user["matches"], null);
    break;
    }
    if(in_array($loggedInUser, $user["matches"])){
       $othersMatches[] = $user["id"];
    }
};

$match = array_intersect($othersMatches, $userWhoLoggedInLikes);

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
    abort(300, "No matches to show");
}


