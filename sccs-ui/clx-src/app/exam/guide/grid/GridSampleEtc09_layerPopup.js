/************************************************
 * GridSampleEtc09_layerPopup.js
 * Created at 2020. 6. 4. 오후 5:57:48.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/*
 * "닫기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var initValue = app.getHostProperty("initValue")
	
	var returnValue = {
		"aaaaa": "eeeee"
	}
	
	if (app.hasAppMethod("returnValueFunc")) {
		initValue["hostApp"].callAppMethod("returnValueFunc", returnValue)
	}
	
	util.getMainApp(app).removeFloatingControl(util.getMainApp(app).lookup("callApp"));
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	var initValue = app.getHostProperty("initValue")
	
	util.Control.setValue(app, "ipb1", initValue["val1"]);
	util.Control.setValue(app, "ipb2", initValue["val2"]);
}