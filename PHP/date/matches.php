<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $fileName = "../DB/users.json";
    $json = file_get_contents($fileName);
    $users = json_decode($json, true);
    
    $jsonREQUEST = file_get_contents("php://input");
    $dataREQUEST = json_decode($jsonREQUEST, true);

    $foundUserMatch = null;

    $loggedInUser = $dataREQUEST["loggedInUser"];
    $foundUser = $dataREQUEST["matchedUser"];

    forEach($users as &$user){
        if($loggedInUser === $user["id"]){
           $user["matches"]["yes"][] = ($foundUser);
            break;
        } 
    }
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);
    
    foreach ($users as &$user) {
        if ($foundUser === $user["id"]) {
            if (in_array($loggedInUser, $user["matches"]["yes"])) {
                $foundUserMatch = $user;
                break;
            } else {
                send(200, "no match");
            }
        }
    }

    if ($foundUserMatch) {
        $userContact = $foundUserMatch["general"]["contact"];
        send(200, $userContact);
    } else {
        send(404, ["user not found"]);
    }
 
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);
}

?> 