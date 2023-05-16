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

    $sortedUsers = [];

    forEach($users as $user){
        var_dump("inne");
    if($user["email"] != $userEmail){
         if($user["age"] >= $preferenceAgeMin && $user["age"] <= $preferenceAgeMax && $user["gender"] === $preferenceGender){
            if($user["preference"]["ageOfMin"] <= $age && $user["preference"]["ageOfMax"] >= $age && $user["gender"] === $gender){

            unset($user["interests"]["contact"]);
            unset($user["password"]);
            unset($user["preference"]);
            $sortedUsers[] = $user;   
                }       
            }
        }
    $randIndex = array_rand($sortedUsers, 1);
    $randUser = $sortedUsers[$randIndex];

    send(200, $randUser);
    };

   
    
// Need to find a solution for how we will add "both" values in if

// skapa json-fil för matchningar, bestående av email & ja/nej, en stor json fil för alla som sedan matchas ihop users.json för att visa matchningar.)

//    function sortUsers($users, $userEmail, $preferenceAgeMin, $preferenceAgeMax){
//        
//        $sortedUsers = [];
//        forEach($users as $user){
//            if($user["email"] != $userEmail && $user["age"] >= $preferenceAgeMin && $user["age"] <= $preferenceAgeMax){
//                $sortedUsers[] = $user;
//
//                sortByGender($sortedUsers);
//            }
//        }
//    };
//
//    sortUsers($users);
//
//    function sortByGender($sortedUsers){
//        $sortedByGenderUsers = [];
//        foreach($sortedUsers as $user){
//            if($preferenceGender === "both"){
//               sortByPreference($sortedUsers);
//        } else if($user["gender"] === $preferenceGender) { 
//             $sortedByGenderUsers[] = $user;
//                sortByPreference($sortedByGenderUsers);   
//            }
//        }
//    }
//
//    function sortByPreference($sortedByGenderUsers){
//        $sortedByPereferance = [];
//        forEach ($sortedByGenderUsers as $user){
//        if($user["preference"]["ageOfMin"] <= $age && $user["preference"]["ageOfMax"] >= $age){
//                $sortedByPereferance[] = $user;
//                sortByPreferanceGender($sortedByPereferance);
//            }
//        }
//    }
//    
//    function  sortByPreferanceGender($sortedByPereferance){
//        $finalSorting = [];
//        forEach($sortedByPereferance as $user){
//            if($user["preference"]["gender"] === "both"){
//                createUserArray($sortedByPereferance);
//            } else if($user["preference"]["gender"] === $preferenceGender){
//                $finalSorting[] = $user;
//                createUserArray($finalSorting);
//            }
//        }
//    }
//
//    function createUserArray($userArray){
//         $prefUser = [];
//        forEach($userArray as $user){
//            unset($user["interests"]["contact"]);
//            unset($user["password"]);
//            unset($user["preference"]);
//
//             $prefUser[] = $user;
//        }
//

     }

?> 