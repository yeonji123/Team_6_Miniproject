<?php
    $db_host = "localhost";
    $db_user = "xpfjsdmlghkd";
    $db_password = "ckdgns6078!";
    $db_name = "xpfjsdmlghkd";
    $con = mysqli_connect($db_host,$db_user,$db_password,$db_name);
    mysqli_query($con, "set names utf8");
       
    if(!$con){
        die("연결에 실패했습니다.".mysql_error());//실패하면 연결중지 
    }
    $curl= curl_init();                                                                     //curl 세션 초기화
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                             //요청 결과를 문자열로 반환 (cURL 전송 옵션을 설정합니다.)
    curl_setopt($curl, CURLOPT_URL, 'http://xpfjsdmlghkd.dothome.co.kr/clinicjson.json');   //URL 지정하기
    $res = curl_exec($curl);                                                                // cURL 세션 실행
    curl_close($curl);                                                                       // cURL 세션을 닫기

    //json_decode 의 두번째 인수를 true 로 하면 배열값으로 리턴된다.
    $array = json_decode($res,true);
    $arraycount = count($array);
    // class Change{
    // public function __toString(){
    //     return $this->$array;
    //    }
    // }
    // $change = new Change;
    //print_r($array);   
    //count($array)

  
    // $query = "INSERT INTO clinic VALUE ('$name','$address','$number','$Latitude','$Longitude')";
    // mysqli_query($con,$query);

    for($i=0;$i<$arraycount;$i++){
        $name = $array[$i]['name'];
        $address = $array[$i]['address'];
        $number = $array[$i]['number'];
        $Latitude = $array[$i]['Latitude'];
        $Longitude = $array[$i]['Longitude'];
        
        $query = "INSERT INTO clinic VALUE ('$name','$address','$number','$Latitude','$Longitude')";
        mysqli_query($con,$query);
    }
    mysqli_close($con);
    echo "success";
    
?>