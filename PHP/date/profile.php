<?php
ini_set("display_errors", 1);

require_once "../helper.php";

allowCORS();
allowMethod("POST");

$filename = "../users.json";

if (!file_exists($filename)) {
  $json = json_encode($users);
  file_put_contents($filename, $json);
} else {
  $json = file_get_contents($filename);
  $users = json_decode($json, true);
}

if(isset($_POST["email"])) {
  $index = -1;
  $user;

  foreach($users as $user) {
    $index = $index + 1;

    if ($user["email"] === $_POST["email"]) {
      $user["bio"] = $_POST["bio"];
      $user["age"] = $_POST["age"];
      $user["gender"] = $_POST["gender"];
      $user["country"] = $_POST["country"];
      $user["haveChildren"] = isset($_POST["haveChildren"]) ? $_POST["haveChildren"] : "no";
      $user["smoke"] = isset($_POST["smoke"]) ? $_POST["smoke"] : "no";
      $user["drink"] = isset($_POST["drink"]) ? $_POST["drink"] : "no";
      $user["exercise"] = isset($_POST["exercise"]) ? $_POST["exercise"] : "no";
      $user["haveReligion"] = isset($_POST["haveReligion"]) ? $_POST["haveReligion"] : "no";
      $user["preference"]["genderOf"] = isset($_POST["genderOf"]) ? $_POST["genderOf"] : null;
      $user["preference"]["ageOf"] = $_POST["ageOf"];
      break;
    }
  }

  $users[$index] = $user;

  $jsonData = json_encode($users, JSON_PRETTY_PRINT);

  file_put_contents("../users.json", $jsonData);

  send(200, $user);
}
?>
