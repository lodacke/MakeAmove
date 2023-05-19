<?php

ini_set("display_errors", 1);

require_once("../helper.php");

$filename = "../DB/users.json";

allowCORS();
allowMethod("GET");

$json = file_get_contents($filename);

$users = json_decode($json, true);

$sortedUsers = [];
$matchedUsers = [];
$userMatches = [];

forEach ($users as &$user) {
    if (in_array($_GET["id"], $user["matches"]["yes"])) {
        $matchedUsers[] = $user["id"];
    }
}

forEach ($users as &$user) {
    if ($user["id"] === $_GET["id"]) {
        $preferenceGender = $user["preference"]["genderOf"];
        $preferenceAgeMax = $user["preference"]["ageOfMax"];
        $preferenceAgeMin = $user["preference"]["ageOfMin"];
        $gender = $user["gender"];
        $age = $user["age"];
        foreach ($user["matches"]["yes"] as $matches) {
            $userMatches[] = $matches;
        }
        break;
    }
}

forEach ($users as &$user) {
    if (
        $user["id"] != $_GET["id"] &&
        $user["age"] >= $preferenceAgeMin &&
        $user["age"] <= $preferenceAgeMax &&
        $user["gender"] === $preferenceGender &&
        $user["preference"]["ageOfMin"] <= $age &&
        $user["preference"]["ageOfMax"] >= $age &&
        $user["preference"]["genderOf"] === $gender &&
        !in_array($_GET["id"], $user["matches"]["no"])
    ) {
        unset($user["general"]["contact"]);
        unset($user["password"]);
        unset($user["email"]);
        unset($user["preference"]);
        $sortedUsers[] = $user;
    }
}

forEach($matchedUsers as $matches){
    if(in_array($matches, $userMatches)){
        forEach($sortedUsers as $value =>  &$user){
            if($user["id"] === $matches &&
            in_array($user["id"], $userMatches)){
                unset($sortedUsers[$value]);
            }
        }
    }
}  

if (count($sortedUsers) > 0) {
    $randIndex = array_rand($sortedUsers, 1);
    $randUser = $sortedUsers[$randIndex];
    send(200, $randUser);
} else {
    abort(400, "Not found");
}


        


// Need to find a solution for how we will add "both" values in if


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

?>
