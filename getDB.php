<?php
    $db_host = "localhost";
    $db_user = "";
    $db_password = "";
    $db_name = "";
    $con = mysqli_connect($db_host,$db_user,$db_password,$db_name);
    mysqli_query($con, "set names utf8");
    $arr = array();
    $total = array();
    //테이블에 있는 값 읽어오기
    $query = "SELECT * FROM pharmacy";
    $jbresult = mysqli_query($con, $query);
    

    // $row = mysqli_fetch_array($jbresult);
    // $rowcount = count($row);
    
    
    // while($row = mysqli_fetch_array($jbresult)){
    //     $arr["name"]=$row[0];
    //     echo $arr["name"]; //연세대학교강남세브란스병원
    //     echo "<br>";
    // }
    $i=0;
    while($row = mysqli_fetch_array($jbresult)){
        $arr[$i]["name"]=$row[0];
        $arr[$i]["address"]=$row[1];
        $arr[$i]["number"]=$row[2];
        $arr[$i]["Latitude"]=$row[3];
        $arr[$i]["Longitude"]=$row[4];
        
        $i++;
    }
    //print_r($arr);
    
    $json=json_encode($arr,JSON_UNESCAPED_UNICODE); //encoding
    
    echo "success";
    //JSON파일 이름 설정, 파일 생성하여 저장
    $bytes=file_put_contents("pharData.json", $json);
    echo "The number of bytes written are $bytes.";
    mysqli_close($con);
?>
   