<?php

ini_set("display_errors", 1);

require_once("helper.php");

allowCORS();
allowMethod("POST");

$newUser = [];
  if(isset($_FILES["profilePicture"])) {
    $imagesJSON = "DB/imageSource.json";
    $AllImages = [];

  if(!file_exists($imagesJSON)) {
      file_put_contents($imagesJSON, $AllImages);
  } else {
      $json = file_get_contents($imagesJSON);
      $AllImages = json_decode($json, true);
  }
  $file = $_FILES["profilePicture"];

  $fileName = $file["name"];
  $fileTmpName = $file["tmp_name"];
  $fileSize = $file["size"];
  $fileError = $file["error"];
  $fileType = $file["type"];

  $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

  $allowed = ["jpg", "jpeg"];
  if(in_array($fileExtension, $allowed)) {

    if($fileError == 0) {

      $destination = "DB/uploads/".$fileName;
      $source = $fileTmpName;

      if(move_uploaded_file($source, $destination)) {

          $destination = "PHP/DB/uploads/".$fileName;
          $imageSource = ["source" => $destination];
          $AllImages[] = $imageSource;

          $json = json_encode($AllImages, JSON_PRETTY_PRINT);
          file_put_contents($imagesJSON, $json);
          send(200, $imageSource);
        }
      } else {
          $error = ["error" => "Something went wrong when uploading image."];
          send(405, $error);
      }
    } else {
        $error = ["error" => "We only allow JPG and JPEG files."];
        send(405, $error);
    }
  }

  $fileName = "DB/users.json";
  $users = [];

  if(file_exists($fileName)){
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
 $interests = array_values($dataREQUEST["interests"][0]);
 $bio = $dataREQUEST["general"][0]["bio"];
 $tel = $dataREQUEST["general"][0]["tel"];
 $facebook = $dataREQUEST["general"][0]["facebook"];
 $instagram = $dataREQUEST["general"][0]["instagram"];
 $genderOf = $dataREQUEST["preference"][0]["genderOf"];
 $ageOfMax = $dataREQUEST["preference"][0]["ageOfMax"];
 $ageOfMin = $dataREQUEST["preference"][0]["ageOfMin"];

  if($age < 18){
    send(409, [$data = "You need to be over 18 to use this app"]);
  }

if(!($name == "" && $email == "" && $password == "" && $gender == "none" && $tel == "" && $age == null && $city == null)){
  $imagesJSON = "DB/imageSource.json";
    if(file_exists($imagesJSON)) {
      $json = file_get_contents($imagesJSON);
      $AllImages = json_decode($json, true);
    }
  $image = end($AllImages);
  $imageSource = $image["source"];
  $newUser = [
    "id" => uniqid(),
    "name" => $name,
    "email" => $email,
    "password" => $password,
    "age" => $age,
    "city" => $city,
    "gender" => $gender,
    "imageSource" => $imageSource,
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
    "matches" => [
      "yes" => [],
      "no" => [],
    ],
  ];

  $users[] = $newUser;

  $userToSend = $newUser;
  unset($userToSend["password"]);
  unset($userToSend["email"]);

  $data = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  file_put_contents($fileName, $data);

   send(200, $data = $userToSend);
   } else {
    send(401, [$data = "You need to fill in all the fields before you proceed."]);
   }



?>
