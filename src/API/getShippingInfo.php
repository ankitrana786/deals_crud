<?php
 $reqVars = file_get_contents('php://input');
 $data = json_decode($reqVars, true);
//  print_r($data); die;
        $url = 'http://apps.ceramicarts.com/GetCartShipingInfo.php';


// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'GET',
//        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

#var_dump($result);
print "$result";
?>
