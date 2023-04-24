<?php 

ini_set("display_errors", 1);

if($_SERVER["REQUEST_METHOD"] === "POST"){
    
    $fileName = "users.json";
    $users = [];

    if(file_exists($fileName)){
        $JSONusers = file_get_contents($fileName);
        $users = json_decode($JSONusers, true);   
    } else { 
        file_put_contents($fileName, $users);
    }

    $jsonREQUEST = file_get_contents("php://input");
    $dataREQUEST = json_decode($jsonREQUEST, true);

    $username = $dataREQUEST["username"];
    $password = $dataREQUEST["password"];
    $age = $dataREQUEST["age"];
    $gender = $dataREQUEST["gender"];
    //$image = $dataREQUEST["image"];  
    $userInfo = $dataREQUEST["interests"][0]["userInfo"];
    $contact = $dataREQUEST["interests"][0]["contact"];
    $genderOf = $dataREQUEST["preference"][0]["genderOf"];   
    $ageOf = $dataREQUEST["preference"][0]["ageOf"];
                                 

    for($i = 0; $i < count($users); $i++){
       if($username == $users[$i]["username"]){        
        header("Content-type: application/json");
        http_response_code(409);
        $message = "The username is already taken";
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

    if(!($username == "" && $password == "" && $gender == "none" && $userInfo == "" && $contact == "" && $age == null)){
        
        $newUser = [
          "username" => $username,
          "password" => $password,
          "age" => $age,
          "gender" => $gender,
         // "image" => $image,
          "interests" => [
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
        http_response_code(405);
        $message = "Wrong HTTP-method";
        echo (json_encode($message));
        exit(); 
        
    }


?>