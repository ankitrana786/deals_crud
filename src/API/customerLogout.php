<?php
 $reqVars = file_get_contents('php://input');
 $data = json_decode($reqVars, true);
 // print_r($data); die;
 $url = 'http://apps.ceramicarts.com/ClearCustomerLogin.php';
 $request = json_encode(array('CUSTOMER' => $data['customerId'], 'CUSTNAME'=>$data['cname'], 'SESSION'=>$data['session'], 'LEVEL'=>$data['cust_level'], 'COUNTRY'=>$data['countryCode'] ));
$data['rJSON'] = $request;

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

#var_dump($result);
print "$result";
?>
