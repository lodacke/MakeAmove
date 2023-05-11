<?php
ini_set("display_errors", 1);

require_once "../PHP/helper.php";

allowCORS();
allowMethod("PATCH");

$filename = "../DB/users.json";

if (file_exists($filename)) {
  $json = file_get_contents($filename);
  $users = json_decode($json, true);
} else {
  $error = ["message" => "Something goes wrong..."];
  abort(400, $error);
}

if(isset($_PATCH["email"])) {
  $index = -1;
  $user;

  foreach($users as $user) {
    $index = $index + 1;

    if ($user["email"] === $_PATCH["email"]) {
      $user["bio"] = $_PATCH["bio"];
      $user["age"] = $_PATCH["age"];
      $user["gender"] = $_PATCH["gender"];
      $user["country"] = $_PATCH["country"];
      $user["haveChildren"] = isset($_PATCH["haveChildren"]) ? $_PATCH["haveChildren"] : "no";
      $user["smoke"] = isset($_PATCH["smoke"]) ? $_PATCH["smoke"] : "no";
      $user["drink"] = isset($_PATCH["drink"]) ? $_PATCH["drink"] : "no";
      $user["exercise"] = isset($_PATCH["exercise"]) ? $_PATCH["exercise"] : "no";
      $user["haveReligion"] = isset($_PATCH["haveReligion"]) ? $_PATCH["haveReligion"] : "no";
      $user["preference"]["genderOf"] = isset($_PATCH["genderOf"]) ? $_PATCH["genderOf"] : null;
      $user["preference"]["ageOf"] = $_PATCH["ageOf"];
      break;
    }
  }

  $users[$index] = $user;

  $jsonData = json_encode($users, JSON_PRETTY_PRINT);

  file_put_contents("../DB/users.json", $jsonData);

  send(200, $user);
}
?>
