<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

    if(isset($_FILES["profilePicture"])) {
      $imagesJSON = "imageSource.json";
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
              $destination = "../uploads/".$fileName;
              $source = $fileTmpName;
              if(move_uploaded_file($source, $destination)) {
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

    $fileName = "../users.json";
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
    $gender = $dataREQUEST["gender"];  
    $userQuestionOne = $dataREQUEST["interests"][0]["userQuestionOne"];
    $userQuestionTwo = $dataREQUEST["interests"][0]["userQuestionTwo"];
    $userQuestionThree = $dataREQUEST["interests"][0]["userQuestionThree"];
    $userInfo = $dataREQUEST["interests"][0]["userInfo"];
    $contact = $dataREQUEST["interests"][0]["contact"];
    $genderOf = $dataREQUEST["preference"][0]["genderOf"];   
    $ageOf = $dataREQUEST["preference"][0]["ageOf"];
                                 
    for($i = 0; $i < count($users); $i++){
       if($email == $users[$i]["email"]){        
        header("Content-type: application/json");
        http_response_code(409);
        $message = "The email is already registered";
        echo (json_encode($message));
        exit();  
     }  
   }   

   if($age < 18){
        header("Content-type: application/json");
        http_response_code(409);
        $message = "You need to be over 18 to use this app";
        echo (json_encode($message));
        exit();
   }

    if(!($name == "" && $email == "" && $password == "" && $gender == "none" && $contact == "" && $age == null)){
        $imagesJSON = "imageSource.json";
        if(file_exists($imagesJSON)) {
          $json = file_get_contents($imagesJSON);
          $AllImages = json_decode($json, true);
        }
        $imageSource = end($AllImages);

        $newUser = [
          "name" => $name,
          "email" => $email,
          "password" => $password,
          "age" => $age,
          "gender" => $gender,
          "image" => $imageSource,
          "interests" => [
            "userQuestionOne" => $userQuestionOne,
            "userQuestionTwo" => $userQuestionTwo,
            "userQuestionThree" => $userQuestionThree,
            "userInfo" => $userInfo,
            "contact" => $contact,
          ],
          "preference" => [
            "genderOf" => $genderOf,
            "ageOf" => $ageOf,
          ],
          ];
          $users[] = $newUser;

        $data = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($fileName, $data);
                  
         header("Content-type: application/json");
         http_response_code(200);
         $message = "A new user have been added!";
         echo (json_encode($message));
         exit();  

         } else {
            header("Content-type: application/json");
            http_response_code(401);
            $message = "You need to fill in all the fields before you proceed";
            echo (json_encode($message));
            exit();  
         }          
} else {
  header("Content-type: application/json");
  http_response_code(405);
  $message = "Wrong HTTP-method";
  echo (json_encode($message));
  exit(); 
}
 
?>