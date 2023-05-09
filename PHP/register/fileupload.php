<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

$images = [];
$database = "imageSource.json";

if(file_exists($database)){
    $JSONusers = file_get_contents($database);
    $images = json_decode($JSONusers, true);   
} else { 
    file_put_contents($database, $images);
}

    if(isset($_FILES["profilePicture"])) {
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
              $destination = "../uploads/".$fileName;
              $source = $fileTmpName;
              if(move_uploaded_file($source, $destination)) {
                  $imageSource = ["source" => $destination];
                  $images[] = $imageSource;

                  $json = json_encode($images, JSON_PRETTY_PRINT);
                  file_put_contents($database, $json);
                  
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
 ?>