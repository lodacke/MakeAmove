<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $fileName = "../DB/users.json";
    $json = file_get_contents($fileName);
    $users = json_decode($json, true);
    
    $jsonREQUEST = file_get_contents("php://input");
    $dataREQUEST = json_decode($jsonREQUEST, true);
    

    $loggedInUser = $dataREQUEST["loggedInUser"];
    $foundUser = $dataREQUEST["matchedUser"];
    
    forEach($users as &$user){
        if($loggedInUser === $user["id"]){
            $user["matches"]["no"][] = ($foundUser);
        break;
        }
    }
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);

  
}

?> 