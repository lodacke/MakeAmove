<?php 

ini_set("display_errors", 1);

require_once("../helper.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){

  $newUser = [];

    if(isset($_FILES["profilePicture"])) {
      $imagesJSON = "../DB/imageSource.json";
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
              $destination = "../DB/uploads/".$fileName;
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

    $fileName = "/PHP/DB/users.json";
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
   $interestsOne= $dataREQUEST["interests"][0]["interestsOne"];
   $interestsTwo = $dataREQUEST["interests"][0]["interestsTwo"];
   $interestsThree = $dataREQUEST["interests"][0]["interestsThree"];
   $interestsFour = $dataREQUEST["interests"][0]["interestsFour"];
   $interestsFive = $dataREQUEST["interests"][0]["interestsFive"];
   $bio = $dataREQUEST["interests"][0]["bio"];
   $contact = $dataREQUEST["interests"][0]["contact"];
   $genderOf = $dataREQUEST["preference"][0]["genderOf"];   
   $ageOfMax = $dataREQUEST["preference"][0]["ageOfMax"];
    $ageOfMin = $dataREQUEST["preference"][0]["ageOfMin"];
                                
   for($i = 0; $i < count($users); $i++){
      if($email == $users[$i]["email"]){    
        send(409, [$data = "The email is already registered"]); 
      }  
    }   
  if($age < 18){
    send(409, [$data = "You need to be over 18 to use this app"]);
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
          $imageSource,
          "interests" => [
            "interestsOne" => $interestsOne,
            "interestsTwo" => $interestsTwo,
            "interestsThree" => $interestsThree,
            "interestsFour" => $interestsFour,
            "interestsFive" => $interestsFive,
            "bio" => $bio,
            "contact" => $contact,
          ],
          "preference" => [
            "genderOf" => $genderOf,
            "ageOfMax" => $ageOfMax,
            "ageOfMin" => $ageOfMin,
          ],
          ];
          $users[] = $newUser;

        $data = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($fileName, $data);
                  
         send(200, [$data = "A new user have been added!"]);

         } else {
          send(401, [$data = "You need to fill in all the fields before you proceed."]);
         }          
} else {
  allowJSON();
}
 
?>