<?php
ini_set("display_errors", 1);

require_once "../helper.php";

allowCORS();
allowMethod("PATCH");
allowJSON();

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

if(
  !isset(
    $requestData["email"],
    $requestData["passwordOld"],
    $requestData["passwordNew"],
    $requestData["passwordRepeat"]
  ) || (
    $requestData["email"] === "" ||
    $requestData["passwordOld"] === "" ||
    $requestData["passwordNew"] === "" ||
    $requestData["passwordRepeat"] === ""
  )
) {
  $error = ["message" => "Password inputs can not be empty!"];
  abort(400, $error);
} else {
  $email = $requestData["email"];
  $oldPassword = $requestData["passwordOld"];
  $newPassword = $requestData["passwordNew"];
  $passwordRepeat = $requestData["passwordRepeat"];

  $userToSend = null;
  $userIsFound = false;
  $index = -1;

  foreach($users as $user) {
    $index = $index + 1;

    if ($user["email"] === $email) {
      if ($user["password"] !== $oldPassword) {
        $error = ["message" => "Wrong old password! >_<"];
        abort(400, $error);
      } else if ($newPassword !== $passwordRepeat) {
        $error = ["message" => "New password and repeated new password do not match! (☉̃o☉)"];
        abort(400, $error);
      } else if ($newPassword === $oldPassword) {
        $error = ["message" => "New password and old password should not be the same! (☉̃o☉)"];
        abort(400, $error);
      } else {
        $user["password"] = $newPassword;

        $userIsFound = true;
        $userToSend = $user;

        break;
      }
    }
  }

  if ($userIsFound) {
    $users[$index] = $userToSend;

    $jsonData = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents("../DB/users.json", $jsonData);

    send(200, $userToSend);
  }
}
?>
