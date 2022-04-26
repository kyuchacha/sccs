/************************************************
 * MoveSample03.js
 * Created at 2022. 3. 31. 오전 10:03:05.
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
 * "Modal 팝업 호출" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//함수 실행
	callModal();
	
	//스크립트 출력
	printSource(callModal);
	
	//결과 표시
	printResult("");
}

//Modal 팝업 호출
function callModal() {
	//전달 파라미터 설정
	var initValue = {
		"initCd": "C12345",
		"initNm": "Open Modal"
	}
	
	util.Dialog.open(app, "app/exam/guide/move/Sample03Sub1", 800, 600, function(e) {
		
	}, initValue);
}


/*
 * "Modaless 팝업 호출" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	//함수 호출
	callModaless();
	
	//스크립트 출력
	printSource(callModaless);
	
	//결과 표시
	printResult("");
}

function callModaless() {
	//전달 파라미터 설정
	var initValue = {
		"initCd": "C12345",
		"initNm": "Open Modaless"
	}
	
	util.Dialog.openModaless(app, "app/exam/guide/move/Sample03Sub1", 800, 650, function(e) {
		
	}, initValue);
}


/*
 * "팝업 화면인가?" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	isPopup();
	
	printSource(isPopup);
}

//현재 화면이 팝업 화면인지 여부 리턴
function isPopup() {
	//현재 앱이 팝업인지 여부를 반환한다.
	app.lookup("optRslt").value = util.Dialog.isPopup(app);
}


/*
 * "window 팝업 호출" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	callWindowPopup();
	
	printSource(callWindowPopup);
	
	printResult("");
}

//윈도우 팝업 호출
function callWindowPopup() {
	var openPopNms = {
		"openPop": "../index.do",
		"openPopNm": "윈도우팝업",
		"openPopNo": "",
		"openFullPath": util.Auth.getMenuInfo(app, "fullPath")
	}
	util.Dialog.windowOpen(app, openPopNms.openPop, openPopNms.openPop ,openPopNms, 800, 600, 10, 10, true, function(e) {});
}


/*
 * "returnValue" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	printResult("");
	
	closeCallback();
	
	printSource(closeCallback);
}

//다이얼로그 닫힘 시 부모창에 파라미터 전달 콜백 함수
function closeCallback() {
	//전달 파라미터 설정
	var initValue = {
		"initCd": "C12345",
		"initNm": "명칭설정"
	}
	
	util.Dialog.open(app, "app/exam/guide/move/Sample03Sub1", 800, 600, function(e) {
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if (!ValueUtil.isNull(returnValue)) {
			//값 후처리
		}
		
		app.lookup("optRslt").value = JSON.stringify(returnValue);
		
		//예시: 데이터셋 수신시 
		//app.lookup("otpRslt").value = "전체건수:["+ returnValue.getRowCount() + "], 1Row 데이터: " + JSON.stringify(returnValue.getRowData(1));
		//app.lookup("otpRslt").value = "전체건수:["+ returnValue.getRowCount() + "], 전체 데이터: " + JSON.stringify(returnValue.getRowDataRanged());
		
	}, initValue);
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