/************************************************
* editor2.js
 * Created at 2022. 3. 7. 오후 5:30:33.
 *
 * @author aaajd
 ************************************************/

/**
 * 이벤트 발생 시 로그를 프린트합니다.
 * @param {String} psEventType
 */
function print(psEventType) {
	var vcTxaConsole = app.lookup("txaConsole");
	
	if (vcTxaConsole.value == null){
		vcTxaConsole.value = "";
	}
	
	var vsText = psEventType + "\n";
	vcTxaConsole.value = vsText;
	
	vcTxaConsole.scrollToBottom();
}

function redraw(){
	app.lookup("editor").redraw();
}

/*
 * "showHTML" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var embeddedPage = app.lookup("editor");
	
	var html =  embeddedPage.callPageMethod("showHTML");	
	print(html);
}

/*
 * "Reset" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	embeddedPage.callPageMethod("resetHTML");	
}

/*
 * "GetLength" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
		/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	var len = embeddedPage.callPageMethod("showHTML");	
	
	print(len.length);
}

/*
 * "pasteHTML" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var embeddedPage = app.lookup("editor");
	var inputBox = app.lookup("ipb1");
	if (inputBox.value == "" || inputBox.value == null) return false;
	embeddedPage.callPageMethod("pasteHTML",inputBox.value);	
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = print;
}

/*
 * "https://github.com/naver/smarteditor2/releases" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	window.open('https://github.com/naver/smarteditor2/releases');
}
