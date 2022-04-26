/************************************************
* gridAddedEdit.js
 * Created at 2022. 3. 21. 오후 1:21:12.
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
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	newRowEditable();
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var sampleGrd = app.lookup('sampleGrd');
	sampleGrd.insertRow(sampleGrd.rowCount, true);
	sampleGrd.focusCell(sampleGrd.rowCount-1, 0);
	printSource();
}

function printSource() {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = newRowEditable;	
}

function newRowEditable() {
	//루트컨테이너에 속해있는 모든 컨트롤들 재귀호출
	app.getContainer().getAllRecursiveChildren().forEach(function(each){
		//부모컨트롤이 'grid'인 컨트롤
		if (each.getParent().type == 'grid') {
			//자신이 'inputbox'인 컨트롤
			if (each.type == 'inputbox') {
				//표현식 바인딩
				each.bind('readOnly').toExpression('getStateString() == "I" ? false : true');
			}
		}
	});
}
