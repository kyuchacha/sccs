/************************************************
* inputValidation.js
 * Created at 2022. 3. 21. 오전 10:55:01.
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

/**
 * @param {any} newVal
 * @param {Event} e
 */
function checkChange(newVal,e){
	if(newVal == "홍길동"){
		alert("홍길동은 입력할 수 없습니다.");
		e.preventDefault();
	}
}

function valueChange(){
	var ipbVal = app.lookup("ipbVal");
	if(ipbVal.value == "장보고"){
		ipbVal.value=""
		alert("장보고는 입력할수 없습니다.");
	}
}
/*
 * 인풋 박스에서 before-value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장되기 전에 발생하는 이벤트. 다음 이벤트로 value-change가 발생합니다.
 */
function onIpbValBeforeValueChange(e){
	var ipbVal = e.control;
	checkChange(e.newValue,e);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = checkChange;
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbValValueChange(e){
	valueChange();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = valueChange;
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var ipbVal = app.lookup("ipbVal");
	ipbVal.value = "홍길동";
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var ipbVal = app.lookup("ipbVal");
	ipbVal.value = "장보고";
}
