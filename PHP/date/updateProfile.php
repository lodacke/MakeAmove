<?php
ini_set("display_errors", 1);

require_once "../helper.php";

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

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if(isset($requestData["id"])) {

  $index = -1;
  $user;

  foreach($users as $user) {

    $index = $index + 1;

    if ($user["id"] === $requestData["id"]) {
      $user["city"] = isset($requestData["city"]) ? $requestData["city"] : $user["city"];
      $user["age"] = isset($requestData["age-my"]) ? $requestData["age-my"] : $user["age"];
      $user["general"]["bio"] = isset($requestData["bio"]) ? $requestData["bio"] : $user["general"]["bio"];
      $user["general"]["tel"] = isset($requestData["tel"]) ? $requestData["tel"] : $user["general"]["tel"];
      $user["general"]["facebook"] = isset($requestData["facebook"]) ? $requestData["facebook"] : $user["general"]["facebook"];
      $user["general"]["instagram"] = isset($requestData["instagram"]) ? $requestData["instagram"] : $user["general"]["instagram"];
      $user["interests"] = isset($requestData["interests"]) ? $requestData["interests"] : $user["interests"];
      $user["preference"]["genderOf"] = isset($requestData["genderOf"]) ? $requestData["genderOf"] : $user["preference"]["genderOf"];
      $user["preference"]["ageOfMax"] = isset($requestData["age-max"]) ? $requestData["age-max"] : $user["preference"]["ageOfMax"];
      $user["preference"]["ageOfMin"] = isset($requestData["age-min"]) ? $requestData["age-min"] : $user["preference"]["ageOfMin"];

      break;
    }
  }

  $users[$index] = $user;

  $jsonData = json_encode($users, JSON_PRETTY_PRINT);

  file_put_contents("../DB/users.json", $jsonData);

  send(200, $user);
}
?>
