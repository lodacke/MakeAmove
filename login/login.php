<?php
ini_set("display_errors", 1);

require_once "../helper.php";

allowCORS();
allowMethod("POST");
allowJSON();

$filename = "../users.json";

if (!file_exists($filename)) {
  $json = json_encode($users);
  file_put_contents($filename, $json);
} else {
  $json = file_get_contents($filename);
  $users = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if(
  !isset(
    $requestData["email"],
    $requestData["password"]
  ) || (
    $requestData["email"] === "" ||
    $requestData["password"] === ""
  )
) {
  $error = ["message" => "wrong values or no values were added"];
  abort(400, $error);
} else {
  $email = $requestData["email"];
  $password = $requestData["password"];

  $userToSend = null;
  $userIsFound = false;

  foreach($users as $user) {
    if (
      $user["email"] === $email &&
      $user["password"] === $password
    ) {
      unset($user["password"]);
      $userIsFound = true;
      $userToSend = $user;
      break;
    }
  }

  if ($userIsFound) {
    send(200, $userToSend);
  } else {
    $error = ["message" => "Invalid user/password"];
    abort(404, $error);
  }
}

?>
