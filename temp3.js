//------------------------------날짜 계산 ---------------------------------
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate() - 1;

if (day == 0) {
    if (month == 5 && month == 7 && month == 11) {
        day = 30;
        month -= 1;
    }
    if (month == 2 && month == 4 && month == 6 && month == 8 && month == 9 && month == 10 && month == 12) {
        day = 31;
        month -= 1;
    }
    if (month == 3) {
        day = 28;
        month -= 1;
    }
    if (month == 1) {
        day = 31;
        month = 12;
    }
    if (month == 0) { month = 12; }
}

if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
const userDay = year + "-" + month + "-" + day; //공공데이터 검색할 때 필요한 내용
const mmdd = month + "." + day;

//------------------------------날짜 계산 ---------------------------------


var oldList = [];   //성별 연령별 현황 배열
//-----------------------------------------------------------

//--------------성별 연령별 현황--------------------------------------------------------------

var xhr1 = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1352000/ODMS_COVID_05/callCovid05Api'; /*URL*/
var queryParams1 = '?' + encodeURIComponent('serviceKey') + '=' + 'ENvDFs%2Byy2NJpiEFHhyboaOWGxpGA4rqxkT9XkuW8LrpXIHGpT6ZwwQIPA7ssC6pXg4JyB16ITxOwHs8ikz8TA%3D%3D'; /*Service Key*/
queryParams1 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams1 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
queryParams1 += '&' + encodeURIComponent('apiType') + '=' + encodeURIComponent('xml'); /**/
queryParams1 += '&' + encodeURIComponent('create_dt') + '=' + encodeURIComponent(userDay); /**/
xhr1.open('GET', url + queryParams1);
xhr1.onreadystatechange = function () {
    if (this.readyState == 4) {
        var responseList1 = this.responseText;
        let xml = new DOMParser();
        let doc1 = xml.parseFromString(responseList1, "text/xml");
        for (var i = 0; i < 11; i++) {

            var dic = {
                "old": doc1.getElementsByTagName("gubun")[i].textContent,                //명 , 남,여 00
                "confCase": doc1.getElementsByTagName("confCase")[i].textContent,        //확진자수  00
                "confCaseRate": doc1.getElementsByTagName("confCaseRate")[i].textContent, //확진률 00
                "createDt": doc1.getElementsByTagName("createDt")[i].textContent,        //
                "criticalRate": doc1.getElementsByTagName("criticalRate")[i].textContent, //치명률 00
                "death": doc1.getElementsByTagName("death")[i].textContent,              //사망자수 00
                "deathRate": doc1.getElementsByTagName("deathRate")[i].textContent,       //사망률
            }
            oldList.push(dic);
            
        }

        //-------------------------------html에 데이터 입력--------------------------------------------
        // 큰틀
        document.getElementById("p2").innerHTML = "□ 연령/성별 확진 현황" + "(" + mmdd + " 기준)";
        //연령
        console.log(oldList);
        for(var i=0;i<11;i++){
            if(oldList[i]["old"]=="0-9"){
                document.getElementById("old0").innerHTML=oldList[i]["old"];
                document.getElementById("confCase0").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate0").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate0").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death0").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate0").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="10-19"){
                document.getElementById("old1").innerHTML=oldList[i]["old"];
                document.getElementById("confCase1").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate1").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate1").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death1").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate1").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="20-29"){
                document.getElementById("old2").innerHTML=oldList[i]["old"];
                document.getElementById("confCase2").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate2").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate2").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death2").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate2").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="30-39"){
                document.getElementById("old3").innerHTML=oldList[i]["old"];
                document.getElementById("confCase3").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate3").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate3").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death3").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate3").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="40-49"){
                document.getElementById("old4").innerHTML=oldList[i]["old"];
                document.getElementById("confCase4").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate4").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate4").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death4").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate4").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="50-59"){
                document.getElementById("old5").innerHTML=oldList[i]["old"];
                document.getElementById("confCase5").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate5").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate5").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death5").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate5").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="60-69"){
                document.getElementById("old6").innerHTML=oldList[i]["old"];
                document.getElementById("confCase6").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate6").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate6").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death6").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate6").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="70-79"){
                document.getElementById("old7").innerHTML=oldList[i]["old"];
                document.getElementById("confCase7").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate7").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate7").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death7").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate7").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="80 이상"){
                document.getElementById("old8").innerHTML=oldList[i]["old"];
                document.getElementById("confCase8").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate8").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate8").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death8").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate8").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="남성"){
                document.getElementById("old9").innerHTML=oldList[i]["old"];
                document.getElementById("confCase9").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate9").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate9").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death9").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate9").innerHTML=oldList[i]["deathRate"];
            }
            if(oldList[i]["old"]=="여성"){
                document.getElementById("old10").innerHTML=oldList[i]["old"];
                document.getElementById("confCase10").innerHTML = oldList[i]["confCase"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById("confCaseRate10").innerHTML = oldList[i]["confCaseRate"];
                document.getElementById("criticalRate10").innerHTML = oldList[i]["criticalRate"];
                document.getElementById("death10").innerHTML=oldList[i]["death"];
                document.getElementById("deathRate10").innerHTML=oldList[i]["deathRate"];
            }

        }
        
        //------------------------------------------------------------------------------------------
    };
}
xhr1.send('');


