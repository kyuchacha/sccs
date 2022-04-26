/************************************************
 * MoveSample04.js
 * Created at 2022. 3. 31. 오전 10:22:36.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//폼 초기화
	util.FreeForm.init(app, "grpFormFunc");
}

/*
 * "실행" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	printResult("");
	
	var result = f_notify();
	
	if(result !== false) {
		printSource(f_notify);
	}
}

function f_notify() {
	var vsCode = app.lookup("cmbNotifyMsg").value;
	
	if(vsCode === null || vsCode == "") {
		alert("출력할 메시지를 선택해주세요.");
		return false;
	}
	
	util.Msg.notify(app, vsCode, null, "INFO", 5000);
}


/*
 * "실행" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	f_alert();
	
	printSource(f_alert);
	
	printResult("");
}

function f_alert() {
	util.Msg.alert("CRM-M016", ["선택된 파일"]);
}


/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	f_alertDlg();
	
	printSource(f_alertDlg);
}

function f_alertDlg() {
	util.Msg.alertDlg(app, "CRM-M016", ["해당 파일"], function() {
		app.lookup("optRslt").value = "[확인확인] 버튼을 누른 뒤 alertDlg 콜백 함수 실행";
	}, "확인확인", "alertDlg 기능 확인")
}


/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	printResult("");
	
	var result = f_confirm();
	
	if(result !== false) {
		printSource(f_confirm);
	}
}

function f_confirm() {
	var vsCode = app.lookup("cmbConfirmMsg").value;
	
	if(vsCode === null || vsCode == "") {
		alert("출력할 메시지를 선택해주세요.")
		return false;
	}
	
	util.Msg.confirm(vsCode);
}


/*
 * "실행" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	f_confirmDlg();
	
	printSource(f_confirmDlg);
}

function f_confirmDlg() {
	util.Msg.confirmDlg(app, "CRM-M016", ["선택되지 않은 파일"], function() {
		app.lookup("optRslt").value = "[확인확인] 버튼을 누른 뒤 confirmDlg 콜백 함수 실행";
	}, function() {
		app.lookup("optRslt").value = "[취소취소] 버튼을 누른 뒤 confirmDlg 콜백 함수 실행";
	}, "확인확인", "취소취소", "confirmDlg 기능 확인")
}



//== 스크립트 호출 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}

//== 결과 표시 ==//
function printResult(value) {
	app.lookup("optRslt").value = value;
}