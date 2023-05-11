<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

$filename = "../DB/users.json";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $json = file_get_contents($filename);
    $users = json_decode($json, true);

    $requestInput = file_get_contents("php://input");
    $requestDATA = json_decode($requestInput, true);

    $userEmail = $requestDATA["email"];
    $preferenceGender = $requestDATA["preference"]["genderOf"];
    $preferenceAgeMax = $requestDATA["preference"]["ageOfMax"];
    $preferenceAgeMin = $requestDATA["preference"]["ageOfMin"];
    $gender = $requestDATA["gender"];
    $age = $requestDATA["age"];

    $prefUser = [];
    
// Need to find a solution for how we will add "both" values in if

// skapa json-fil för matchningar, bestående av email & ja/nej, en stor json fil för alla som sedan matchas ihop users.json för att visa matchningar.)

    $json = file_get_contents($filename);
    $users = json_decode($json, true);

    $requestInput = file_get_contents("php://input");
    $requestDATA = json_decode($requestInput, true);

    $userEmail = $requestDATA["email"];
    $preferenceGender = $requestDATA["preference"]["genderOf"];
    $preferenceAgeMax = $requestDATA["preference"]["ageOfMax"];
    $preferenceAgeMin = $requestDATA["preference"]["ageOfMin"];
    $gender = $requestDATA["gender"];
    $age = $requestDATA["age"];

    $prefUser = [];

    forEach($users as $user){
        if($user["email"] != $userEmail){
             if($user["age"] >= $preferenceAgeMin && $user["age"] <= $preferenceAgeMax && $user["gender"] === $preferenceGender){
                if($user["preference"]["ageOfMin"] <= $age && $user["preference"]["ageOfMax"] >= $age && $user["gender"] === $gender)

                $newUser = $user;
                unset($newUser["interests"]["contact"]);
                unset($newUser["password"]);
                unset($newUser["preference"]);
                $prefUser[] = $newUser;          
            }
        }
    }

    $randIndex = array_rand($prefUser, 1);
    $randUser = $prefUser[$randIndex];

    send(200, $randUser);

}

?> 