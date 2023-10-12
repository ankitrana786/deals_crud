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
//      print_r($data); die;
         $desc = $conn->real_escape_string($data['description']);
         $tabsData = $conn->real_escape_string($data['tabsArray']);

    if($data['action'] == 'ADD' && $data['rowId'] == 0){
        $query = "SELECT * FROM product_detail where item_code = '".$data['ITEM_CODE']."' order by id desc limit 1";
//      echo $query; die;
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) == 0){
                 $query = "INSERT INTO product_detail(id, item_code, item_name,  tabs_data, dateTime, category_code, category_name, subCategCodes)VALUES(NULL, '".$data['ITEM_CODE']."', '".$desc."', '".$tabsData."', NOW(), '".$data['categoryCode']."', '".$data['categoryName']."', '".$data['subCategariesList']."')";
  //                   echo $query; die;
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
                 $query = "INSERT INTO product_detail(id, item_code, item_name,  tabs_data, dateTime, category_code, category_name, subCategCodes)VALUES(NULL, '".$data['ITEM_CODE']."', '".$desc."', '".$tabsData."', NOW(), '".$data['categoryCode']."', '".$data['categoryName']."', '".$data['subCategariesList']."')";
  //                   echo $query; die;
                    $resultNew = mysqli_query($conn, $query);
                    if ($resultNew){
                            // echo ("<br> Input data is succeed");
                            $retVal = '{"status": true, "message":"Successfully Created"}';
                    }else{
                            $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                    }
            }
        }
        echo $retVal;
        $conn -> close();
        die;
       // echo "jhakkass"; die;

    }else{
//      print_r($data['tabsArray']); die;
        $query = "UPDATE product_detail SET item_name = '".$desc."', tabs_data='".$tabsData."', dateTime = NOW(), category_code = '".$data['categoryCode']."', category_name='".$data['categoryName']."', subCategCodes='".$data['subCategariesList']."' WHERE item_code = '".$data['ITEM_CODE']."'";
//                      echo $query; die;
                    $resultNew = mysqli_query($conn, $query);
                    if ($resultNew){
                        $retVal = '{"status": true, "message":"Successfully updated"}';
                    }else{
                            $retVal = '{"status": false, "message":"Opps! Something went wrong, please try after some time"}';
                    }
        echo $retVal;
        $conn -> close();
        die;
    }

    function uploadImage ($categName){
            $target_dir = "categoryBanners/";
            // print_r($_FILES["myfile"])); die;
            if(isset($_FILES["myfile"])){
                    // echo "Jhakkass";
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
                        // echo "file uploaded";
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
