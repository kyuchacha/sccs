/************************************************
* respDataText.js
 * Created at 2022. 3. 21. 오후 1:37:37.
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
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onSub1Receive(e){
	var sub1 = e.control;
	var res = sub1.xhr.responseText;
	var jsonVal;

	try{
		jsonVal = JSON.parse(res);
	} catch(e){
		jsonVal = null;
	}
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce2AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onSub1Receive;
}
