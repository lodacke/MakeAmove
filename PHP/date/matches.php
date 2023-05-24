<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

allowCORS();
allowMethod("POST");


$fileName = "../DB/users.json";

$json = file_get_contents($fileName);
$users = json_decode($json, true);

$jsonREQUEST = file_get_contents("php://input");
$dataREQUEST = json_decode($jsonREQUEST, true);

$userContact = [];
$foundUserMatch = null;
$loggedInUser = $dataREQUEST["loggedInUser"];
$foundUser = $dataREQUEST["matchedUser"];

forEach($users as &$user){
    if($loggedInUser === $user["id"]){
       $user["matches"][] = $foundUser;
        break;
    } 
}

$data = json_encode($users, JSON_PRETTY_PRINT);
file_put_contents($fileName, $data);
foreach ($users as &$user) {
    if ($foundUser === $user["id"]) {
        if (in_array($loggedInUser, $user["matches"])) {
            $foundUserMatch[] = ($user);
            break;
        } else {
            send(200, "no match");
        }
    }
}

if ($foundUserMatch) {

  forEach($foundUserMatch as $userMatch){
        $userContact = [
        "phone" => $userMatch["general"]["tel"],
        "facebook" => $userMatch["general"]["facebook"],
        "instagram" => $userMatch["general"]["instagram"],
    ];
  }

    send(200, $userContact);
} else {
    send(404, ["user not found"]);
}

$data = json_encode($users, JSON_PRETTY_PRINT);
file_put_contents($fileName, $data);

?> 