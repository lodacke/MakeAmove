<?php
ini_set("display_errors", 1);

require_once "../helper.php";

allowCORS();
allowMethod("DELETE");
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

if (!isset($requestData["email"])) {
  $error = ["error" => "Something goes wrong to delete your account. Please try again!"];
  abort(400, $error);
}

$email = $requestData["email"];
file_put_contents("dump.txt", json_encode($email));

foreach ($users as $index => $user) {
  if ($user["email"] == $email) {
    array_splice($users, $index, 1);
    $json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    send(200, $user);
  }
}

$error = ["error" => "User is not found"];
abort(404, $error);
?>
