/************************************************
 * MoveSample02.js
 * Created at 2020. 3. 7. 오전 9:52:37.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * "화면호출" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var vsEdaId = "eda1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub1";
	var initValue = {
		"initValue1": "Value1",
		"initValue2": "Value2",
		"initValue3": "Value3"
	}
	util.EmbApp.setPage(app, vsEdaId, vsCallAppId, initValue);
	
	//스크립트 내용 표시(개발시 삭제될 내용)
	app.lookup("txaScript").value = "" + onBtn2Click;
}

/*
 * "화면B 호출" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var vsEdaId = "eda1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub2";
	var initValue = {};
	util.EmbApp.setPage(app, vsEdaId, vsCallAppId, initValue);
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtn4Click;
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont"]);
//	cpr.core.ResourceLoader.loadScript("thirdparty/codemirror/codemirror.js").then(function(input){
//		app.lookup("shlCodeMirror").redraw();
//	});
}

/*
 * "함수호출" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	//샘플화면 임베디드앱내 호출
	var vsEdaId = "eda1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub2";
	var paArgs = {
		"Args1": "파라미터값1",
		"Args2": "파라미터값2",
		"Args3": "파라미터값3"
	};
	util.EmbApp.setPage(app, vsEdaId, vsCallAppId, paArgs);
	
	//함수 호출
	var vsFuncname = "f_callMethod";
	util.EmbApp.callAppMethod(app, vsEdaId, vsFuncname, paArgs);
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtn3Click;
	
}
