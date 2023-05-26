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

if(!isset($requestData["id"])) {
  $error = ["error" => "Something goes wrong to delete your account. Please try again!"];
  abort(400, $error);
  }

$id = $requestData["id"];

foreach ($users as $index => $user) {
  if ($user["id"] == $id) {
    array_splice($users, $index, 1);
    $json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    $deleteMessage = ["message" => "Your account is successfully deleted! Good luck with your love journey (ﾉ´ з `)ノ"];
    send(200, $deleteMessage);
  }
}

?>
