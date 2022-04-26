/************************************************
* platformParam.js
 * Created at 2022. 3. 21. 오후 1:04:51.
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
	var btnInit = e.control;
	showInitParam();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = showInitParam;
	
}

function showInitParam(){
	//Platform의 initParameter는 위 값을 초기화 하는 함수입니다.
	cpr.core.Platform.INSTANCE.initParameter({"param":"value"});
	
	//초기설정된 값을 획득하는 함수 입니다.
	var paramValue = cpr.core.Platform.INSTANCE.getParameter("param");
	
	app.lookup("opt1").value = "초기 파라미터 값 : " + paramValue;
}