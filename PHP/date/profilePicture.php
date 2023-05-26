<?php
ini_set("display_errors", 1);

require_once("helper.php");

allowCORS();
allowMethod("POST");

if(isset($_FILES["profilePicture"])) {

  $AllImages = [];

  $file = $_FILES["profilePicture"];

  $fileName = $file["name"];
  $fileTmpName = $file["tmp_name"];
  $fileSize = $file["size"];
  $fileError = $file["error"];
  $fileType = $file["type"];

  $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

  $allowed = ["jpg", "jpeg", "png"];
  if(in_array($fileExtension, $allowed)) {

    if($fileSize < 2000000) {
      if($fileError === 0) {
        $destination = "DB/uploads/".$fileName;
        $source = $fileTmpName;

        if(move_uploaded_file($source, $destination)) {
          $imageSource = "PHP/DB/uploads/".$fileName;
          send(200, $imageSource);
        }
      } else {
        $error = ["error" => "Something went wrong when uploading image."];
        abort(400, $error);
      }
    } else {
      $error = ["error" => "The file you uploaded is to big."];
      abort(413, $error);
    }
  } else {
        $error = ["error" => "We only allow JPG, JPEG & PNG files."];
        abort(405, $error);
    }
  }
  ?>
