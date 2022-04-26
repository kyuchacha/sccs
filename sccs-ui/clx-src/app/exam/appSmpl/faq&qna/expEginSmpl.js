/************************************************
* expEginSmpl.js
 * Created at 2022. 3. 21. 오전 10:06:55.
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
	addExpression();
}

function printValue(id) {
	var vsVal = app.lookup(id).value;
	if (vsVal != null && vsVal != undefined && vsVal != '') {
		
		//코드출력
		printSource()
		
		return vsVal;
	} else {
		alert('입력값을 입력하세요');
		return null;
	}
}

function addExpression() {
	//사용자 정의 함수 등록
	cpr.expression.ExpressionEngine.INSTANCE.registerFunction('printValue', printValue);
	
	var lblVal = app.lookup('optRslt');
	
	//바인딩 제거
	lblVal.unbind('value');
	
	//익스프레션 바인딩
	lblVal.bind('value').toExpression("printValue('ipbValue')");
}

function printSource() {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = addExpression + printValue;	
}