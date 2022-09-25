//----------------------------------------------------시 / 도 별 확진 현황 -------------------------------
var list = [];
var slist = [];
var dlist = [];
var cnt = 0;
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'ENvDFs%2Byy2NJpiEFHhyboaOWGxpGA4rqxkT9XkuW8LrpXIHGpT6ZwwQIPA7ssC6pXg4JyB16ITxOwHs8ikz8TA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
queryParams += '&' + encodeURIComponent('apiType') + '=' + encodeURIComponent('xml'); /**/
queryParams += '&' + encodeURIComponent('std_day') + '=' + encodeURIComponent(userDay); /**/
//queryParams += '&' + encodeURIComponent('gubun') + '=' + encodeURIComponent('경기'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var responseList = this.responseText;
        let xml = new DOMParser();
        let doc = xml.parseFromString(responseList, "text/xml");
        for (var i = 0; i < 38; i++) {
            var dic = {
                "name": doc.getElementsByTagName("gubun")[i].textContent,          //시 , 도명
                "check": doc.getElementsByTagName("defCnt")[i].textContent,        //확진자
                "deth": doc.getElementsByTagName("deathCnt")[i].textContent,       //사망자
                "cure": doc.getElementsByTagName("isolClearCnt")[i].textContent,   //격리 해제
                "yesterday": doc.getElementsByTagName("incDec")[i].textContent     //전일대비 인원
            }

            list.push(dic);
        }
        //console.log(typeof (list[0]["name"])); // string

        //-------가져온 데이터 넣는 구간--------- sdlist

        //초기값 넣기
        // 경기 , 경남 , 경북 , 강원 , 전남 , 전북 , 충남 , 충북 , 제주  slist
        // 서울 , 부산 , 인천 , 대구 , 세종 , 울산 , 광주 , 대전 dlist
        for (var i = 0; i < 38; i++) {
            //console.log("메인 for문"+i);
            if (slist.length == 0) {
                if (list[i]["name"] === "경기" || list[i]["name"] === "경남" || list[i]["name"] === "경북" || list[i]["name"] === "강원" || list[i]["name"] === "전남" || list[i]["name"] === "전북" || list[i]["name"] === "충남" || list[i]["name"] === "충북" || list[i]["name"] === "제주") {
                    var dic = {
                        "name": list[i]["name"],
                        "check": list[i]["check"],
                        "yesterday": list[i]["yesterday"]
                    }
                    slist.push(dic);
                    //console.log("첫 데이터 들어갔음");
                }
            } else {
                if (list[i]["name"] === "경기" || list[i]["name"] === "경남" || list[i]["name"] === "경북" || list[i]["name"] === "강원" || list[i]["name"] === "전남" || list[i]["name"] === "전북" || list[i]["name"] === "충남" || list[i]["name"] === "충북" || list[i]["name"] === "제주") {
                    var cnt = 0;
                    for (var k = 0; k < slist.length; k++) {    //500
                        if (list[i]["name"] != (slist[k]["name"])) {
                            cnt++;
                        } else {
                            cnt = 0;
                            break;
                        }
                    }
                    //console.log("다른값 들어감"+slist.length);
                }
                if (cnt > 0) {
                    var dic = {
                        "name": list[i]["name"],
                        "check": list[i]["check"],
                        "yesterday": list[i]["yesterday"]
                    }
                    slist.push(dic);
                }
                cnt = 0;
            }

        }
         // 서울 , 부산 , 인천 , 대구 , 세종 , 울산 , 광주 , 대전 dlist
        for (var i = 0; i < 38; i++) {
            //console.log("메인 for문"+i);
            if (dlist.length == 0) {
                if (list[i]["name"] === "서울" || list[i]["name"] === "부산" || list[i]["name"] === "인천" || list[i]["name"] === "대구" || list[i]["name"] === "세종" || list[i]["name"] === "울산" || list[i]["name"] === "광주" || list[i]["name"] === "대전") {
                    var dic = {
                        "name": list[i]["name"],
                        "check": list[i]["check"],
                        "yesterday": list[i]["yesterday"]
                    }
                    dlist.push(dic);
                    //console.log("첫 데이터 들어갔음");
                }
            } else {
                if (list[i]["name"] === "서울" || list[i]["name"] === "부산" || list[i]["name"] === "인천" || list[i]["name"] === "대구" || list[i]["name"] === "세종" || list[i]["name"] === "울산" || list[i]["name"] === "광주" || list[i]["name"] === "대전") {
                    var cnt = 0;
                    for (var k = 0; k < dlist.length; k++) {    //500
                        if (list[i]["name"] != (dlist[k]["name"])) {
                            cnt++;
                        } else {
                            cnt = 0;
                            break;
                        }
                    }
                    //console.log("다른값 들어감"+slist.length);
                }
                if (cnt > 0) {
                    var dic = {
                        "name": list[i]["name"],
                        "check": list[i]["check"],
                        "yesterday": list[i]["yesterday"]
                    }
                    dlist.push(dic);
                }
                cnt = 0;
            }

        }

        console.log(dlist);
        document.getElementById("p3").innerHTML="□ 도별 누적 현황("+mmdd+" 기준)";
        //---------------------------------------
        Highcharts.chart('container', {
            title: {
                text: '',
                align: 'left'
            },
            xAxis: {//경기 ,  도 명 데이터
                categories: [slist[0]["name"], slist[1]["name"], slist[2]["name"], slist[3]["name"], slist[4]["name"], slist[5]["name"], slist[6]["name"], slist[7]["name"], slist[8]["name"]]
            },
            yAxis: {
                title: {
                    text: '단위 : 100만'
                }
            },
            labels: {
                items: [{
                    style: {
                        left: '50px',
                        top: '18px',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: '누적확진자',   //첫번째 줄
                data: [parseInt(slist[0]["check"]), parseInt(slist[1]["check"]), parseInt(slist[2]["check"]), parseInt(slist[3]["check"]), parseInt(slist[4]["check"]), parseInt(slist[5]["check"]), parseInt(slist[6]["check"]), parseInt(slist[7]["check"]), parseInt(slist[8]["check"])]
            }, {
                type: 'column',
                name: '전일 확진자',   //두번째 줄
                data: [parseInt(slist[0]["check"]) - parseInt(slist[0]["yesterday"]), parseInt(slist[1]["check"]) - parseInt(slist[1]["yesterday"]), parseInt(slist[2]["check"]) - parseInt(slist[2]["yesterday"]), parseInt(slist[3]["check"]) - parseInt(slist[3]["yesterday"])
                    , parseInt(slist[4]["check"]) - parseInt(slist[4]["yesterday"]), parseInt(slist[5]["check"]) - parseInt(slist[5]["yesterday"]), parseInt(slist[6]["check"]) - parseInt(slist[6]["yesterday"]), parseInt(slist[7]["check"]) - parseInt(slist[7]["yesterday"]), parseInt(slist[8]["check"]) - parseInt(slist[8]["yesterday"])]
            }]
        });

        document.getElementById("p4").innerHTML="□ 시별 누적 현황("+mmdd+" 기준)";
        //---------------------------------------2번째 그래프
        Highcharts.chart('container2', {
            title: {
                text: '',
                align: 'left'
            },
            xAxis: {//경기 ,  도 명 데이터
                categories: [dlist[0]["name"], dlist[1]["name"], dlist[2]["name"], dlist[3]["name"], dlist[4]["name"], dlist[5]["name"], dlist[6]["name"], dlist[7]["name"]]
            },
            yAxis: {
                title: {
                    text: '단위 : 100만'
                }
            },
            labels: {
                items: [{
                    style: {
                        left: '50px',
                        top: '18px',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: '누적확진자',   //첫번째 줄
                data: [parseInt(dlist[0]["check"]), parseInt(dlist[1]["check"]), parseInt(dlist[2]["check"]), parseInt(dlist[3]["check"]), parseInt(dlist[4]["check"]), parseInt(dlist[5]["check"]), parseInt(dlist[6]["check"]), parseInt(slist[7]["check"])]
            }, {
                type: 'column',
                name: '전일 확진자',   //두번째 줄
                data: [parseInt(dlist[0]["check"]) - parseInt(dlist[0]["yesterday"]), parseInt(dlist[1]["check"]) - parseInt(dlist[1]["yesterday"]), parseInt(dlist[2]["check"]) - parseInt(dlist[2]["yesterday"]), parseInt(dlist[3]["check"]) - parseInt(dlist[3]["yesterday"])
                    , parseInt(dlist[4]["check"]) - parseInt(dlist[4]["yesterday"]), parseInt(dlist[5]["check"]) - parseInt(dlist[5]["yesterday"]), parseInt(dlist[6]["check"]) - parseInt(dlist[6]["yesterday"]), parseInt(dlist[7]["check"]) - parseInt(dlist[7]["yesterday"])]
            }]
        });



    }//제일큰 if문 끝


};//fuction문 끝

xhr.send('');