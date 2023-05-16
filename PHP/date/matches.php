<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $fileName = "../DB/users.json";
    $json = file_get_contents($fileName);
    $users = json_decode($json, true);
    
    $jsonREQUEST = file_get_contents("php://input");
    $dataREQUEST = json_decode($jsonREQUEST, true);

    var_dump($dataREQUEST);

    $loggedInUser = $dataREQUEST["loggedInUser"];
    $foundUser = $dataREQUEST["MatchedUser"];



    forEach($users as $user){
        if($loggedInUser === $user["email"]){
            $user["matches"]["yes"] = $foundUser;
        }
    }
 
    forEach($users as $user){
        if($user["email"] === $foundUser){
            if(in_array($loggedInUser, $user["matches"]["yes"])){
                 $userContact = $user["interests"]["contact"];
                 send(200, [$userContact]);
            }     
        }
    }
   
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);
}

?> 