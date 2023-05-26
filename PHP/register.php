<?php

ini_set("display_errors", 1);

require_once("helper.php");

allowCORS();
allowMethod("POST");

$fileName = "DB/users.json";
$users = [];
$newUser = [];

if(file_exists($fileName)) {
  $JSONusers = file_get_contents($fileName);
  $users = json_decode($JSONusers, true);
} else {
  file_put_contents($fileName, $users);
}

$jsonREQUEST = file_get_contents("php://input");
$dataREQUEST = json_decode($jsonREQUEST, true);

$name = $dataREQUEST["name"];
$email = $dataREQUEST["email"];
$password = $dataREQUEST["password"];
$age = $dataREQUEST["age"];
$city = $dataREQUEST["city"];
$gender = $dataREQUEST["gender"];
$image = $dataREQUEST["image"];
$interests = array_values($dataREQUEST["interests"][0]);
$bio = $dataREQUEST["general"][0]["bio"];
$tel = $dataREQUEST["general"][0]["tel"];
$facebook = $dataREQUEST["general"][0]["facebook"];
$instagram = $dataREQUEST["general"][0]["instagram"];
$genderOf = $dataREQUEST["preference"][0]["genderOf"];
$ageOfMax = $dataREQUEST["preference"][0]["ageOfMax"];
$ageOfMin = $dataREQUEST["preference"][0]["ageOfMin"];

if($age < 18) {
  abort(409, [$data = "You need to be over 18 to use this app"]);
}

forEach($users as $user) {
  if($email === $user["email"]){
    abort(403, [$data = "This email already exists."]);
  }
}

if(!($name == "" && $email == "" && $password == "" && $gender == "none" && $tel == "" && $age == "" && $city == "none")){

  $newUser = [
    "id" => uniqid(),
    "name" => $name,
    "email" => $email,
    "password" => $password,
    "age" => $age,
    "city" => $city,
    "gender" => $gender,
    "imageSource" => $image,
    "interests" => $interests,
    "general" => [
      "bio" => $bio,
      "tel" => $tel,
      "facebook" => $facebook,
      "instagram" => $instagram,
    ],
    "preference" => [
      "genderOf" => $genderOf,
      "ageOfMax" => $ageOfMax,
      "ageOfMin" => $ageOfMin,
    ],
    "matches" => [],
  ];

  $users[] = $newUser;
  $userToSend = $newUser;
  unset($userToSend["password"]);
  unset($userToSend["email"]);

  $data = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  file_put_contents($fileName, $data);

  send(201, $data = $userToSend);
} else {
  abort(400, [$data = "You need to fill in all the fields before you proceed."]);
}

?>
