<?php
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    $servername = "localhost";
    $username = "root";
    $password = "x6qCeyrY";
    $db = 'ceramica_cbanner';
    // Create connection
    $conn = new mysqli($servername, $username, $password, $db);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }



    $data = $_POST;//json_decode(file_get_contents('php://input'), true);
    // $data1 = array($data);
//    print_r($data); die;
         $bTitle = $conn->real_escape_string($data['bannerTitle']);
         $desc = $conn->real_escape_string($data['description']);
         $tabsData = $conn->real_escape_string($data['tabsArray']);

    if(isset($data['action']) == 'ADD' && $data['rowId'] == 0){
        $categArray = JSON_DECODE($data['subCategariesList'], true);
        $lastSet = end($categArray);
        $imageInfo = uploadImage($lastSet['CODE']);
        if($imageInfo === "0"){
                $retVal = '{"status": false, "message": "File is not an image. Only accept jpg, png, jpeg"}';
        }else{
//              print_r($lastSet['CODE']); die;
                $query = "SELECT * FROM categoryData where category_name = '".$data['categoryName']."' and subCategCodes LIKE '%".$lastSet['CODE']."%' order by id desc limit 1";
        //      echo $query; die;
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0){
                    $query = "INSERT INTO categoryData (id, category_code, category_name, banner_title, description, content_type, filename, tabs_data, dateTime, subCategCodes) VALUES (NULL, '".$data['categoryCode']."', '".$data['categoryName']."', '".$bTitle."', '".$desc."', '".$data['fileType']."', '".$imageInfo."', '".$tabsData."', NOW(), '".$data['subCategariesList']."')";
                    // echo $query; die;
                    $resultNew = mysqli_query($conn, $query);
                    if ($resultNew){
                            // echo ("<br> Input data is succeed");
                            $retVal = '{"status": true, "message":"Successfully Created"}';
                    }else{
                            $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                    }
                }else{
                    $categ_row = mysqli_fetch_assoc($result);
                    // print_r($categ_row);
                    if($categ_row){
                        $retVal = '{"status": false, "message":"Record already exists"}';
                    }else{
                        $query = "INSERT INTO categoryData (id, category_code, category_name, banner_title, description, content_type, filename, tabs_data, dateTime, subCategCodes) VALUES (NULL, '".$data['categoryCode']."', '".$data['categoryName']."', '".$bTitle."', '".$desc."', '".$data['fileType']."', '".$imageInfo."', '".$tabsData."', NOW(), '".$data['subCategariesList']."')";
                            // echo $query; die;
                            $resultNew = mysqli_query($conn, $query);
                            if ($resultNew){
                                    // echo ("<br> Input data is succeed");
                                    $retVal = '{"status": true, "message":"Successfully Created"}';
                            }else{
                                    $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                            }
                        }
                }
        }
        echo $retVal;
        $conn -> close();
        die;
       // echo "jhakkass"; die;

    }else{
//      print_r($data['tabsArray']); die;
        // echo "jhakkass"; die;
        if(isset($_FILES["myfile"])){
                $categArray = JSON_DECODE($data['subCategariesList'], true);
                $lastSet = end($categArray);
                $imageInfo = uploadImage($lastSet['CODE']);
                if($imageInfo === "0"){
                    $returnVal = '{"status": false, "message": "File is not an image. Only accept jpg, png, jpeg"}';
                }else{
                    $query = "UPDATE categoryData SET banner_title = '".$bTitle."', description = '".$desc."', content_type = '".$data['fileType']."', filename = '".$imageInfo."', tabs_data='".$tabsData."', dateTime = NOW(), subCategCodes='".$data['subCategariesList']."' WHERE id = '".$data['rowId']."'";
                //      echo $query; die;

                    $resultNew = mysqli_query($conn, $query);
                    if ($resultNew){
                        $retVal = '{"status": true, "message":"Successfully updated"}';
                    }else{
                            $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                    }
                }
        }else{
                $query = "UPDATE categoryData SET banner_title = '".$bTitle."', description = '".$desc."', tabs_data='".$tabsData."', dateTime = NOW(), subCategCodes='".$data['subCategariesList']."' WHERE id = '".$data['rowId']."'";

                        $resultNew = mysqli_query($conn, $query);
                    if ($resultNew){
                        $retVal = '{"status": true, "message":"Successfully updated"}';
                    }else{
                            $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                    }
        }
        echo $retVal;
        $conn -> close();
        die;
    }

    function uploadImage ($categName){
            $target_dir = "categoryBanners/";
            // print_r($_FILES["myfile"])); die;
            if(isset($_FILES["myfile"])){
                    $target_file = $target_dir . basename($_FILES["myfile"]["name"]);
                    $uploadOk = 1;
                    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                    $filename = $_FILES['myfile']['tmp_name'];
                    $allowTypes = array('jpg','png','jpeg', 'mp4');
                      if(in_array($imageFileType, $allowTypes)) {
                            $temp = explode(".", $_FILES["myfile"]["name"]);
                            $newfilename = $categName.'.' . end($temp);
                            move_uploaded_file($filename, $target_dir . $newfilename);
                        // echo "File is an image - " . $check["mime"] . ".";
                        $uploadOk = 1;
                        return $newfilename;
                      } else {
                            // echo "Not an image file.";
                        $uploadOk = 0;
                    return "0";
                    }
            }
    }
?>
