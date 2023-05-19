<?php
ini_set("display_errors", 1);

require_once "../helper.php";

allowCORS();
allowMethod("GET");

$filename = "../DB/users.json";
$id = $_GET["id"];

if (file_exists($filename)) {
  $json = file_get_contents($filename);
  $users = json_decode($json, true);
}

if (isset($id)) {
  foreach($users as $user) {
    if ($user["id"] === $id) {
      send(200, $user);
    }
  }

  $error = ["error" => "User is not found"];
  abort(404, $error);
} else {
  send(200, $users);
}
?>
