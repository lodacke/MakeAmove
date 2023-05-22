<?php

ini_set("display_errors", 1);

require_once("../helper.php");

$filename = "../DB/users.json";

allowCORS();
allowMethod("GET");

$json = file_get_contents($filename);

$users = json_decode($json, true);

$sortedUsers = [];
$UserWhoLikesLoggedin = [];
$userWhoLoggedInLikes = [];

//Array av användare som gillar den inloggad användare 

forEach ($users as &$user) {
    if (in_array($_GET["id"], $user["matches"]["yes"])) {
        $UserWhoLikesLoggedin[] = $user["id"];
    }
}

forEach ($users as &$user) {
    if ($user["id"] === $_GET["id"]) {
        $preferenceGender = $user["preference"]["genderOf"];
        $preferenceAgeMax = $user["preference"]["ageOfMax"];
        $preferenceAgeMin = $user["preference"]["ageOfMin"];
        $gender = $user["gender"];
        $age = $user["age"];
        foreach ($user["matches"]["yes"] as &$user) {
            $userWhoLoggedInLikes[] = $user;
        }
        break;
    }
}

//Här filtreras fram de användarna som stämmer för den inloggades preferenser 
//och läggs till en arrayen sortedUsers.

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

$match = array_intersect($UserWhoLikesLoggedin, $userWhoLoggedInLikes);


forEach($sortedUsers as $index => $user){
    if(in_array($user["id"], $match)){
        unset($sortedUsers[$index]);
    } elseif (in_array($user["id"], $userWhoLoggedInLikes)){
        unset($sortedUsers[$index]);
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

?>
