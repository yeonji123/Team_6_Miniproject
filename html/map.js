//버튼 이벤트

var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
};
//지도생성
var map = new kakao.maps.Map(container, options);


//사용자의 위치 - 서버 문제로 안됨,,ㅠㅠ
var x = document.getElementById("mylocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(panTo);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function panTo(position) {
    //x.innerHTML = "Latitude: " + position.coords.latitude + "    Longitude: " + position.coords.longitude; //사용자의 위치 값 html태그에 넣기(<p> id="location")
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    //사용자의 위치로 전환
    var moveLatLon=new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //부드럽게 지도를 바꾸게 한다 (지도의 크기보다 멀리 있는 곳은 그냥 바뀜)
    map.panTo(moveLatLon);
}





//json파일을 읽어와서 배열 생성하기
var dataHos =Array(); //국민안심
var dataPha = Array(); //약국
var dataClinic=Array(); //보건소?
var dataMoon = Array(); //신속항원검사

//전체 데이터
var all=[];


//제일 처음에 데이터를 수집해서 넣기(dataHos, dataPha ...)
getData();

function getData(e){
    const xhr = new XMLHttpRequest(); //xml파일을 읽을 준비
    // xml을 실행시켜서 데이터가 저장된 json파일에 접근
    xhr.open('GET', 'hospitalData.json', true);
    xhr.onload = function () {//loadData를 실행하면 자동으로 실행됨
        if (this.status === 200) {
            var hospital = JSON.parse(this.responseText);//jon파일에 접근
            var j=0;
            for (var i=0; i<257; i++){        
                var arr= new Array();//이차원배열생성
                //배열생성하여 저장
                arr[0]=hospital[i].name;
                arr[1] = hospital[i].address;
                arr[2]=hospital[i].number;
                arr[3] = hospital[i].Latitude;
                arr[4] = hospital[i].Longitude;
                
                dataHos[j]=new Array(arr);//넣기
                j++;
            }
        }
    }
    xhr.send();

    //pharData
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'pharData.json', true);
    xhr2.onload = function () {
        if (this.status === 200) {
            var phar = JSON.parse(this.responseText);
            
            var j=0;
            for (var i=0; i<230; i++){        
                var arr= new Array();
                //배열생성하여 저장
                arr[0] = phar[i].name;
                arr[1]=phar[i].address;
                arr[2]=phar[i].number;
                arr[3]=phar[i].Latitude;
                arr[4] = phar[i].Longitude;
                
                dataPha[j]=new Array(arr);
                j++;
            }
        }
    }
    xhr2.send();

    //clinicData
    const xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'clinicjson.json', true);
    xhr3.onload = function () {
        if (this.status === 200) {
            var clinic = JSON.parse(this.responseText);
            
            var j=0;
            for (var i=0; i<230; i++){        
                var arr= new Array();
                //배열생성하여 저장
                arr[0] = clinic[i].name;
                arr[1]=clinic[i].address;
                arr[2]=clinic[i].number;
                arr[3]=clinic[i].Latitude;
                arr[4] = clinic[i].Longitude;
                
                dataClinic[j]=new Array(arr);
                j++;
            }
        }
    }
    
    xhr3.send();

    //moondata
    const xhr4 = new XMLHttpRequest();
    xhr4.open('GET', 'moon.json', true);
    xhr4.onload = function () {
        if (this.status === 200) {
            var moon = JSON.parse(this.responseText);
            var j=0;
            for (var i=0; i<moon.length; i++){        
                var arr= new Array();
                //배열생성하여 저장
                arr[0] = moon[i].title;
                arr[1] = moon[i].address;
                arr[2] = moon[i].phoneNum;
                arr[3] = moon[i].Latitude;
                arr[4] = moon[i].Longitude;
                
                dataMoon[j]=new Array(arr);
                j++;
            }
        }
    }
    xhr4.send();
    
}

    



// 로드 국민안심병원
function loadDataHos(e) {
    //검색 결과 테이블에 출력
    changeColor();//아무것도 선택하지 않는것으로 하기 위해
    var hosb = document.getElementById("button1");
    hosb.style="background-color:#416df4; position:absolute; z-index:8; top:8px;  left:120px; color:#ebecef";

    $('#dataTbl > tbody:last').remove(); //검색창에 있는 값 모두 삭제
    for (var i=0; i<dataHos.length; i++){ //데이터를 모두 출력
        var row = "<tr><td><b>" + dataHos[i][0][0] + "</td></tr><tr><td>" + dataHos[i][0][1] + "</td></tr><tr><td> TEL: " + dataHos[i][0][2]+ "<hr></td></tr>";
        $(row).appendTo('#dataTbl');
    }



    //마커표시
    const xhr3 = new XMLHttpRequest(); //xml파일을 읽을 준비
    // xml을 실행시켜서 데이터가 저장된 json파일에 접근
    xhr3.open('GET', 'http://xpfjsdmlghkd.dothome.co.kr/hospitalData.json', true);
    xhr3.onload = function () {//loadData를 실행하면 자동으로 실행됨
        if (xhr3.status === 200) {
            hospital = JSON.parse(xhr3.responseText);//jon파일에 접근

            if (marker1 != null) {
                RemoveMaker1();
            }
            if (marker2 != null) {
                RemoveMaker2();
            }
            if (marker4 != null) {
                RemoveMaker4();
            }
            closeOverlay1();
            closeOverlay2();
            closeOverlay4();


            positions3 = [];

            for (var i = 0; i < hospital.length; i++) {

                var dic = {
                    title: hospital[i]["name"],
                    latlng: new kakao.maps.LatLng(hospital[i]["Latitude"], hospital[i]["Longitude"])
                }
                positions3.push(dic)

            }


            var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png ";

            for (var i = 0; i < positions3.length; i++) {
                // console.log(positions);
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(25, 31);

                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                // 마커를 생성합니다
                // var marker1 = new kakao.maps.Marker({
                var markerpush3 = new kakao.maps.Marker({

                    map: map, // 마커를 표시할 지도
                    position: positions3[i].latlng, // 마커를 표시할 위치
                    title: positions3[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage // 마커 이미지 

                });

                // 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                    content: positions3[i].title, // 인포윈도우에 표시할 내용
                    tal: positions3[i].tal

                });


                var content = '<div class="wrap">' +
                    '    <div class="info">' +
                    '        <div class="title" align="center" >' +
                        hospital[i]["name"] +
                    '            <div class="close" onclick="closeOverlay3()" title="닫기"></div>' +
                    '        </div>' +
                    '        <div class="body">' +
                    '           </div>' +
                    '            <div align="center" >' +
                    '                <div class="ellipsis">' + hospital[i]["address"] + '</div>' +
                    '                <div class="jibun ellipsis">' + hospital[i]["number"] + '</div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';


                var overlay = new kakao.maps.CustomOverlay({
                    content: content,           // 오버레이의 정보 담는다.
                    position: markerpush3.getPosition() // 오버레이에 담을 포지션값.
                });

                // 각 오버레이 객체를 따로 list로 저장.
                overlays3.push(overlay);

                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                // kakao.maps.event.addListener(markerpush3, 'mouseover', makeOverListener1(map, markerpush3, infowindow));
                // kakao.maps.event.addListener(markerpush3, 'mouseout', makeOutListener1(infowindow));


                marker3.push(markerpush3)

            }

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            for (let i = 0; i < marker3.length; i++) {
                kakao.maps.event.addListener(marker3[i], 'click', function () {
                    // 마커 갯수만큼 반복을 돌린다.
                    var m_title = marker3[i]["Gb"].split('\n');
                    var o_title = overlays3[i]["cc"];

                    if (o_title.includes(m_title[0])) {
                        overlays3[i].setMap(map);
                    }
                });
            }

        }
    }
    xhr3.send();

}

//약국
function loadDataPha(e){
    //검색 테이블에 결과값 출력
    changeColor();
    var phab = document.getElementById("button2");
    phab.style="position:absolute; z-index:8; top:8px; left:340px; background-color:#416df4; color:#ebecef";

    $('#dataTbl > tbody:last').remove(); 
   for (var i=0; i<dataPha.length; i++){
       var row = "<tr><td><b>" + dataPha[i][0][0] + "</td></tr><tr><td>" + dataPha[i][0][1] + "</td></tr><tr><td> TEL: " + dataPha[i][0][2]+ "<hr></td></tr>";
       $(row).appendTo('#dataTbl');
   }



   //마커
   const xhr = new XMLHttpRequest(); //xml파일을 읽을 준비
            // xml을 실행시켜서 데이터가 저장된 json파일에 접근
            xhr.open('GET', 'http://xpfjsdmlghkd.dothome.co.kr/pharmacy.json', true);
            xhr.onload = function () {//loadData를 실행하면 자동으로 실행됨
                if (xhr.status === 200) {
                    pharmacy = JSON.parse(xhr.responseText);//jon파일에 접근

                    //마커 취소2,3,4
                    if (marker2 != null) {
                        RemoveMaker2();
                    }
                    if (marker3 != null) {
                        RemoveMaker3();
                    }
                    if (marker4 != null) {
                        RemoveMaker4();
                    }
                    closeOverlay2();
                    closeOverlay3();
                    closeOverlay4();



                    positions1 = [];

                    // 마커에 넣을 정보 만들기
                    for (var i = 0; i < pharmacy.length; i++) {
                        var dic = {
                            title: pharmacy[i]["약국명"] + "\n" + pharmacy[i]["대표전화"] + "\n" + pharmacy[i]["주소"],
                            latlng: new kakao.maps.LatLng(pharmacy[i]["Latitude"], pharmacy[i]["Longitude"])
                        }
                        positions1.push(dic);
                    }


                    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";


                    // 마커 생성하기
                    for (var i = 0; i < positions1.length; i++) {

                        // console.log(positions);
                        // 마커 이미지의 이미지 크기 입니다
                        var imageSize = new kakao.maps.Size(16, 20);

                        // 마커 이미지를 생성합니다    
                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                        // 마커를 생성합니다
                        var markerpush1 = new kakao.maps.Marker({
                            map: map,                        // 마커를 표시할 지도
                            position: positions1[i].latlng,  // 마커를 표시할 위치
                            title: positions1[i].title,      // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            image: markerImage,               // 마커 이미지
                        });


                        // 마커에 표시할 인포윈도우를 생성합니다 
                        var infowindow = new kakao.maps.InfoWindow({
                            content: positions1[i].title, // 인포윈도우에 표시할 내용
                            tal: positions1[i].tal
                        });




                        var content = '<div class="wrap">' +
                            '    <div class="info">' +
                            '        <div class="title" align="center" >' +
                            pharmacy[i]["약국명"] +
                            '            <div class="close" onclick="closeOverlay1()" title="닫기"></div>' +
                            '        </div>' +
                            '        <div class="body">' +
                            '           </div>' +
                            '            <div align="center" >' +
                            '                <div class="ellipsis">' + pharmacy[i]["주소"] + '</div>' +
                            '                <div class="jibun ellipsis">' + pharmacy[i]["대표전화"] + '</div>' +
                            '            </div>' +
                            '        </div>' +
                            '    </div>' +
                            '</div>';



                        var overlay = new kakao.maps.CustomOverlay({
                            content: content,           // 오버레이의 정보 담는다.
                            position: markerpush1.getPosition() // 오버레이에 담을 포지션값.
                        });


                        // 각 오버레이 객체를 따로 list로 저장.
                        overlays1.push(overlay);


                        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                        // kakao.maps.event.addListener(markerpush1, 'mouseover', makeOverListener1(map, markerpush1, infowindow));
                        // kakao.maps.event.addListener(markerpush1, 'mouseout', makeOutListener1(infowindow));


                        marker1.push(markerpush1)
                    }

                    // [ 각 마커 띄우기 이론 ]
                    // 마커[i].title에 "\n"을 구분자로 자른 값과
                    // overlays1[i].content 값이 같다면
                    // 같은 위치에 있는 것이다.

                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    for (let i = 0; i < marker1.length; i++) {
                        kakao.maps.event.addListener(marker1[i], 'click', function () {
                            //console.log(marker1[i]);
                            //console.log(marker1[i]["Gb"]);
                            // 마커 갯수만큼 반복을 돌린다.
                            var m_title = marker1[i]["Gb"].split('\n');
                            //console.log(m_title[0])
                            //console.log(overlays1[i])
                            //console.log(overlays1[i]["cc"])
                            var o_title = overlays1[i]["cc"];
                            //console.log(o_title.includes(m_title[0]));
                            if (o_title.includes(m_title[0])) {
                                overlays1[i].setMap(map);
                            }
                        });
                    }

                }
            }
            xhr.send();
}

//보건소
function loadDataCli(e){
    //검색 결과 테이블에 값 출력
    changeColor();
    var clib = document.getElementById("button3");
    clib.style="position:absolute; z-index:8; top:8px; left:580px; background-color:#416df4; color:#ebecef";
    
    $('#dataTbl > tbody:last').remove();
    for (var i=0; i<dataClinic.length; i++){
        var row = "<tr><td><b>" + dataClinic[i][0][0] + "</td></tr><tr><td>" + dataClinic[i][0][1] + "</td></tr><tr><td> TEL: " + dataClinic[i][0][2]+ "<hr></td></tr>";
        $(row).appendTo('#dataTbl');
    }



//마커 표시
const xhr2 = new XMLHttpRequest(); //xml파일을 읽을 준비
            // xml을 실행시켜서 데이터가 저장된 json파일에 접근
            xhr2.open('GET', 'http://xpfjsdmlghkd.dothome.co.kr/clinicjson.json', true);
            xhr2.onload = function () {//loadData를 실행하면 자동으로 실행됨


                if (xhr2.status === 200) {
                    clinicjson = JSON.parse(xhr2.responseText);//jon파일에 접근

                    // var positions = [];
                    positions2 = [];


                    if (marker1 != null) {
                        RemoveMaker1();
                    }
                    if (marker3 != null) {
                        RemoveMaker3();
                    }
                    if (marker4 != null) {
                        RemoveMaker4();
                    }
                    closeOverlay1();
                    closeOverlay3();
                    closeOverlay4();


                    for (var i = 0; i < clinicjson.length; i++) {

                        var dic = {
                            title: clinicjson[i]["name"],
                            latlng: new kakao.maps.LatLng(clinicjson[i]["Latitude"], clinicjson[i]["Longitude"])
                        }
                        positions2.push(dic)

                    }


                    var imageSrc = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';

                    for (var i = 0; i < positions2.length; i++) {

                        // console.log(positions);
                        // 마커 이미지의 이미지 크기 입니다
                        var imageSize = new kakao.maps.Size(20, 20);

                        // 마커 이미지를 생성합니다    
                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                        // 마커를 생성합니다
                        // var marker2 = new kakao.maps.Marker({
                        var markerpush2 = new kakao.maps.Marker({

                            map: map, // 마커를 표시할 지도
                            position: positions2[i].latlng, // 마커를 표시할 위치
                            title: positions2[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            image: markerImage // 마커 이미지 
                        });


                        // 마커에 표시할 인포윈도우를 생성합니다 
                        var infowindow2 = new kakao.maps.InfoWindow({
                            content: positions2[i].title // 인포윈도우에 표시할 내용

                        });
                        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                        // kakao.maps.event.addListener(markerpush2, 'mouseover', makeOverListener2(map, markerpush2, infowindow2));
                        // kakao.maps.event.addListener(markerpush2, 'mouseout', makeOutListener2(infowindow2));


                        var content = '<div class="wrap">' +
                            '    <div class="info">' +
                            '        <div class="title" align="center" >' +
                            clinicjson[i]["name"] +
                            '            <div class="close" onclick="closeOverlay2()" title="닫기"></div>' +
                            '        </div>' +
                            '        <div class="body">' +
                            '           </div>' +
                            '            <div align="center" >' +
                            '                <div class="ellipsis">' + clinicjson[i]["address"] + '</div>' +
                            '                <div class="jibun ellipsis">' + clinicjson[i]["number"] + '</div>' +
                            '            </div>' +
                            '        </div>' +
                            '    </div>' +
                            '</div>';


                        var overlay = new kakao.maps.CustomOverlay({
                            content: content,           // 오버레이의 정보 담는다.
                            position: markerpush2.getPosition() // 오버레이에 담을 포지션값.
                        });


                        // 각 오버레이 객체를 따로 list로 저장.
                        overlays2.push(overlay);


                        marker2.push(markerpush2)
                    }


                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    for (let i = 0; i < marker2.length; i++) {
                        kakao.maps.event.addListener(marker2[i], 'click', function () {
                            //console.log(marker1[i]);
                            //console.log(marker1[i]["Gb"]);
                            // 마커 갯수만큼 반복을 돌린다.
                            var m_title = marker2[i]["Gb"].split('\n');
                            //console.log(m_title[0])
                            //console.log(overlays1[i])
                            //console.log(overlays1[i]["cc"])
                            var o_title = overlays2[i]["cc"];
                            //console.log(o_title.includes(m_title[0]));
                            if (o_title.includes(m_title[0])) {
                                overlays2[i].setMap(map);
                            }
                        });
                    }

                }
            }
            xhr2.send();

}

//신속항원검사
function loadDataMoon(e){
    //검색 결과 테이블에 데이터 출력
    changeColor();
    var moonb = document.getElementById("button4");
    moonb.style="position:absolute; z-index:8; top:8px; left:780px; background-color:#416df4; color:#ebecef";
    
    $('#dataTbl > tbody:last').remove();
    for (var i=0; i<dataMoon.length; i++){
        var row = "<tr><td><b>" + dataMoon[i][0][0] + "</td></tr><tr><td>" + dataMoon[i][0][1] + "</td></tr><tr><td> TEL : " + dataMoon[i][0][2]+ "<hr></td></tr>";
        $(row).appendTo('#dataTbl');
    }


    //마커 표시
    const xhr4 = new XMLHttpRequest(); //xml파일을 읽을 준비
    // xml을 실행시켜서 데이터가 저장된 json파일에 접근
    xhr4.open('GET', 'http://xpfjsdmlghkd.dothome.co.kr/moon.json', true);
    xhr4.onload = function () {//loadData를 실행하면 자동으로 실행됨
        if (xhr4.status === 200) {
            moon = JSON.parse(xhr4.responseText);//jon파일에 접근

            if (marker1 != null) {
                RemoveMaker1();
            }
            if (marker2 != null) {
                RemoveMaker2();
            }
            if (marker3 != null) {
                RemoveMaker3();
            }
            closeOverlay1();
            closeOverlay2();
            closeOverlay3();


            positions4 = [];

            for (var i = 0; i < moon.length; i++) {
                var dic = {
                    title: moon[i]["title"],
                    tal: moon[i]["phoneNum"],
                    latlng: new kakao.maps.LatLng(moon[i]["Latitude"], moon[i]["Lon gitude"])
                }
                positions4.push(dic)
            }



            var imageSrc = "http://xpfjsdmlghkd.dothome.co.kr/markgreen.png";

            for (var i = 0; i < positions4.length; i++) {

                // console.log(positions);
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(20, 28);

                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                // 마커를 생성합니다
                // var marker1 = new kakao.maps.Marker({
                var markerpush4 = new kakao.maps.Marker({

                    map: map, // 마커를 표시할 지도
                    position: positions4[i].latlng, // 마커를 표시할 위치
                    title: positions4[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage // 마커 이미지 

                });

                // 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                    content: positions4[i].title, // 인포윈도우에 표시할 내용 
                });


                var content = '<div class="wrap">' +
                    '    <div class="info">' +
                    '        <div class="title" align="center" >' +
                        moon[i]["title"] +
                    '            <div class="close" onclick="closeOverlay4()" title="닫기"></div>' +
                    '        </div>' +
                    '        <div class="body">' +
                    '           </div>' +
                    '            <div align="center" >' +
                    '                <div class="ellipsis">' + moon[i]["address"] + '</div>' +
                    '                <div class="jibun ellipsis">' + moon[i]["phoneNum"] + '</div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';



                var overlay = new kakao.maps.CustomOverlay({
                    content: content,           // 오버레이의 정보 담는다.
                    position: markerpush4.getPosition() // 오버레이에 담을 포지션값.
                });


                // 각 오버레이 객체를 따로 list로 저장.
                overlays4.push(overlay);



                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                // kakao.maps.event.addListener(markerpush4, 'mouseover', makeOverListener1(map, markerpush4, infowindow));
                // kakao.maps.event.addListener(markerpush4, 'mouseout', makeOutListener1(infowindow));
                
                
                marker4.push(markerpush4)
            }

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            for (let i = 0; i < marker4.length; i++) {
                kakao.maps.event.addListener(marker4[i], 'click', function () {
                    // 마커 갯수만큼 반복을 돌린다.
                    var m_title = marker4[i]["Gb"].split('\n');
                    var o_title = overlays4[i]["cc"];

                    if (o_title.includes(m_title[0])) {
                        overlays4[i].setMap(map);
                    }
                });
            }
        }
    }
    xhr4.send();

}

function changeColor(){
    //원래색으로 바꾸기
    var hosb = document.getElementById("button1");
    hosb.style="position:absolute; z-index:8; top:8px; left:120px;";

    var phab = document.getElementById("button2");
    phab.style="position:absolute; z-index:8; top:8px; left:340px;";


    var clib = document.getElementById("button3");
    clib.style="position:absolute; z-index:8; top:8px; left:580px;";

    var moonb = document.getElementById("button4");
    moonb.style="position:absolute; z-index:8; top:8px; left:780px;";

}


//검색하면 다 보여주기
//자연어 처리
function search(){
    changeColor();
    
    $('#dataTbl > tbody:last').remove();
    all=[];
    
    //검색 내용가져오기
    var search =document.getElementById("search").value;
    var checkarr = document.getElementsByName("keyword");
    
    //모든 데이터를 all에 넣음
    //all= dataClinic.concat(dataHos,dataPha,dataMoon);

    if(search!=""){
        console.log(all);
        $('#dataTbl tbody:last').remove();
        if(checkarr[0].checked){
            all=all.concat(dataPha);
        }
        if(checkarr[1].checked){
            all=all.concat(dataHos);
        }
        if(checkarr[2].checked){
            all=all.concat(dataClinic);
        }
        if(checkarr[3].checked){
            all=all.concat(dataMoon);
        }else{
            all=all.concat(dataHos, dataClinic, dataMoon,dataPha);
        }
        
        console.log(all);
        for (var i=0; i<all.length; i++){
            //이름에 search가 있으면
            var num = all[i][0][0].indexOf(search);
            var num1 = all[i][0][1].indexOf(search);
            if(num!=-1 || num1!=-1){//이름에 있거나 주소에 search단어가 있으면 추가
                var row = "<tr><td><b><p type='button' id='tab' value='"+all[i][0][0]+ "' >"+all[i][0][0]+"</p></td></tr><tr><td>" + all[i][0][1] + "</td></tr><tr><td>" + all[i][0][2]+ "<hr></td></tr>";
                $(row).appendTo('#dataTbl');
            }
        }
    }else{
        alert("검색어를 입력해주세요");
    }
    if(isEmpty($('#dataTbl'))){
        var row="<tr><td>검색 결과가 없습니다</td></tr>";
        $(row).appendTo('#dataTbl');
    }
    
}

//테이블에 있는 값 삭제
function isEmpty( el ){
    return !$.trim(el.html())
}



$(document.body).delegate('#tab', 'click', function() {
    
    if (marker1 != null) {
        RemoveMaker1();
    }
    if (marker2 != null) {
        RemoveMaker2();
    }
    if (marker3 != null) {
        RemoveMaker3();
    }
    closeOverlay1();
    closeOverlay2();
    closeOverlay3();

    var make=[];

    var txtvalue= $(this).text();
    console.log(txtvalue);
    console.log(all);

    
    for (var i=0; i<all.length;i++){ //값이 있는 지 확인
        if(all[i][0][0]==txtvalue){
            make[0]=all[i][0][0]; //이름
            make[1]=all[i][0][1]; //주소
            make[2]=all[i][0][2]; //번호
            make[3]=all[i][0][3]; //위도
            make[4]=all[i][0][4]; //경도
        }
    }
    console.log(make);  


    var title = make[0];
    var latlng=new kakao.maps.LatLng(make[3], make[4]);

    var imageSrc = "http://xpfjsdmlghkd.dothome.co.kr/markgreen.png";

    var imageSize = new kakao.maps.Size(20, 28);

    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    // var marker1 = new kakao.maps.Marker({
    var searchmarker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: latlng, // 마커를 표시할 위치
        title: title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 

    });
    searchmarker.setMap(map);

   
});



//---------------------------------------------------------------------------
//마커 표시 함수
//버튼은 위에 있는 걸로 지정

var hospital = 0;   // 국민 안심 병원
        var clinicjson = 0; // 보건소
        var pharmacy = 0;   // 약국
        var moon = 0;       // 신속병원

        var positions1 = [];// 좌표값 배열
        var positions2 = [];
        var positions3 = [];
        var positions4 = [];


        var marker1 = []; //마커 삭제 배열
        var marker2 = [];
        var marker3 = [];
        var marker4 = [];



        var overlays1 = []; // 오버레이 객체 담을 리스트
        var overlays2 = [];
        var overlays3 = [];
        var overlays4 = [];



        var container = document.getElementById('map');     //지도
        var options = {                                     //초기 이동 좌표값 
            center: new kakao.maps.LatLng(36.7824629, 127.0048106),
            level: 8
        };
        var map = new kakao.maps.Map(container, options); // 지도를 생성합니다





        //마커 취소 함수 1,2,3,4
        function RemoveMaker1() {
            var cnt = marker1.length;
            for (var i = 0; i < cnt; i++) {
                marker1[i].setMap(null);
                // overlist[i].setMap(null);    
            }
        }

        function RemoveMaker2() {
            var cnt = marker2.length;
            for (var i = 0; i < cnt; i++) {
                marker2[i].setMap(null);
                // overlist[i].setMap(null);    

            }
        }

        function RemoveMaker3() {
            var cnt = marker3.length;
            for (var i = 0; i < cnt; i++) {
                marker3[i].setMap(null);
                // overlist[i].setMap(null);    
            }
        }

        function RemoveMaker4() {
            var cnt = marker4.length;
            for (var i = 0; i < cnt; i++) {
                marker4[i].setMap(null);
                // overlist[i].setMap(null);    
            }
        }




        // ------------------ 마커 위에 뜬 overlay 삭제 ------------------
        function closeOverlay1() {
            for (let i = 0; i < marker1.length; i++) {
                var m_title = marker1[i]["Gb"].split('\n');
                var o_title = overlays1[i]["cc"];
                if (o_title.includes(m_title[0])) {
                    overlays1[i].setMap(null);
                }
            }
        }

        function closeOverlay2() {
            // 마커 갯수만큼 반복을 돌린다.
            for (let i = 0; i < marker2.length; i++) {
                var m_title = marker2[i]["Gb"].split('\n');
                var o_title = overlays2[i]["cc"];
                if (o_title.includes(m_title[0])) {
                    overlays2[i].setMap(null);
                }
            }
        }


        function closeOverlay3() {
            // 마커 갯수만큼 반복을 돌린다.
            for (let i = 0; i < marker3.length; i++) {
                var m_title = marker3[i]["Gb"].split('\n');
                var o_title = overlays3[i]["cc"];
                if (o_title.includes(m_title[0])) {
                    overlays3[i].setMap(null);
                }
            }
        }


        function closeOverlay4() {
            // 마커 갯수만큼 반복을 돌린다.
            for (let i = 0; i < marker4.length; i++) {
                var m_title = marker4[i]["Gb"].split('\n');
                var o_title = overlays4[i]["cc"];
                if (o_title.includes(m_title[0])) {
                    overlays4[i].setMap(null);
                }
            }
        }
        // ------------------------------------------------------------

 // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
 function makeOverListener1(map, marker1, infowindow) {
    return function () {
        infowindow.open(map, marker1);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener1(infowindow) {
    return function () {
        infowindow.close();
    };
}


// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener2(map, marker2, infowindow2) {
    return function () {
        infowindow2.open(map, marker2);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener2(infowindow2) {
    return function () {
        infowindow2.close();
    };
}


// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener3(map, marker3, infowindow) {
    return function () {
        infowindow.open(map, marker3);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener3(infowindow) {
    return function () {
        infowindow.close();
    };
}


// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener4(map, marker4, infowindow) {
    return function () {
        infowindow.open(map, marker4);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener4(infowindow) {
    return function () {
        infowindow.close();
    };
}


