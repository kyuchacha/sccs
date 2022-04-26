/************************************************
* embPageParent.js
 * Created at 2022. 3. 21. 오후 1:57:20.
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
	//run이란 메소드가 임베디드 페이지에 있다면 실행
	if (app.lookup('ep2').hasPageMethod('run')) {
		app.lookup('ep2').callPageMethod('run');
	}
}

function printEditor() {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onEp2Load + onBtn3Click + test;
}

/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEp2Load(e){
	var ep2 = e.control;
	
	//앱 객체 전달
	ep2.setPageProperty("app", app);
}

exports.test = test; 

function test() {
	var ipbValue = app.lookup('ipbValue');
	
	//인풋 박스에 입력값이 있을 때
	if (ipbValue.value != '' && ipbValue.value != null && ipbValue.value != undefined) {
		//결과창에 입력값 출력
		app.lookup('optRslt').value = app.lookup('ipbValue').value;
		
		//코드 출력
		printEditor();		
	} else {
		alert('입력값을 입력해주세요.');
	}
}