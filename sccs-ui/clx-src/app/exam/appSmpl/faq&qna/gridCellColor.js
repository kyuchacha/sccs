/************************************************
* gridCellColor.js
 * Created at 2022. 3. 21. 오후 3:04:37.
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
	expressionBinding();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = expressionBinding;	
}

function expressionBinding() {
	var vcGrd = app.lookup("grd2");
	var voCell = vcGrd.detail.getColumn(2);
	
	//표현식 바인딩
	var voExpress = "switch(getValue(\"color\")){\n\tcase \"Red\" : \"red\"\n\tcase \"Blue\" : \"blue\"\n\tcase \"Green\" : \"green\"\n\tcase \"Yellow\" : \"yellow\"\n\tdefault : \"gray\"\n}";
	voCell.style.bind("background-color").toExpression(voExpress);
	
	//style속성 변경 후 그리드를 다시 그려줍니다.
	vcGrd.redraw(); 
}