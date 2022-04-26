/************************************************
 * MoveSample02.js
 * Created at 2020. 3. 7. 오전 9:52:37.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont"]);
	
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	//전달 파라미터 설정
	var initValue = {
		"initCd": "C12345",
		"initNm": "명칭설정"
	}
	
	util.Dialog.open(app, "app/exam/guide/move/Sample03Sub1", 800, 600, function(e) {
		
	}, initValue);
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtn2Click;
}

/*
 * "팝업호출" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	//현재 앱이 팝업인지 여부를 반환한다.
	app.lookup("otpRslt").value = util.Dialog.isPopup(app);
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtn4Click;
	
}

/*
 * "팝업호출" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var openPopNms = {
		"openPop": "../index.do",
		"openPopNm": "윈도우팝업",
		"openPopNo": "",
		"openFullPath": util.Auth.getMenuInfo(app, "fullPath")
	}
	util.Dialog.windowOpen(app, openPopNms.openPop, openPopNms.openPop ,openPopNms, 800, 600, 10, 10, true, function(e) {});
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtn5Click;
	
}

/*
 * "returnValue" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	f_returnValue();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_returnValue;
}

function f_returnValue() {
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
		
		app.lookup("otpRslt").value = JSON.stringify(returnValue);
		
		//예시: 데이터셋 수신시 
		//app.lookup("otpRslt").value = "전체건수:["+ returnValue.getRowCount() + "], 1Row 데이터: " + JSON.stringify(returnValue.getRowData(1));
		//app.lookup("otpRslt").value = "전체건수:["+ returnValue.getRowCount() + "], 전체 데이터: " + JSON.stringify(returnValue.getRowDataRanged());
		
	}, initValue);
}