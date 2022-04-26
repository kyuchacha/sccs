/************************************************
* queryString.js
 * Created at 2022. 3. 21. 오전 10:26:52.
 *
 * @author 1amthomas
 ************************************************/


//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var isSuccess = insertQueryString();
	if (isSuccess) {
		/* 에디터에 소스 표시 */
		var vcAceEditor = app.lookup("ace2");
		vcAceEditor.value = insertQueryString;
	}
}

function insertQueryString() {
	if (app.lookup('ipbValue').value != null) {
		//입력값을 질의문자열에 삽입
		history.pushState(null, null, 'test?name=' + app.lookup('ipbValue').value);		
		return true;
	} else {
		alert('입력값을 입력해주세요.');
		return false;
	}
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var isSuccess = getUrl();
	
	if (isSuccess) {
		/* 에디터에 소스 표시 */
		var vcAceEditor = app.lookup("ace2");
		vcAceEditor.value = getUrl;
	}
}

function getUrl() {
	var url = new cpr.utils.URL(location.href);
	
	if (url.searchParams.get("name") != null) {
		//질의문자열 값 받아옴
		app.lookup('optRslt').value = url.searchParams.get("name");
		return true;		
	} else {
		alert('질의문자열을 먼저 추가해주세요.');
		return false;
	}
}
