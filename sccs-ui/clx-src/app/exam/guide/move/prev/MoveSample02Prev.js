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
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var initValue = {};
	
	f_MDIOpen();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_MDIOpen;
}

/**
 * 화면에 표시할 스크립트 내용을 기술 
 */
function f_MDIOpen() {
	
	var mdiValue = {
		"menuParam1": "파라미터1",
		"menuParam2": "파라미터2"
	};
	
	//함수호출
	util.MDI.open(app, "LEVEL04-58", mdiValue);
};

///*
// * "팝업호출" 버튼(btn4)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn4Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn4 = e.control;
//
//	//함수호출
//	f_MDIClose();
//
//	//스크립트 내용 표시
//	app.lookup("txaScript").value = ""+f_MDIClose;
//	
//}

///**
// * 화면에 표시할 스크립트 내용을 기술 
// */
//function f_MDIClose() {
//	util.MDI.close(app, "exam/template/Template101");
//}

/*
 * "메뉴파라미터" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	f_getMenuParam();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_getMenuParam;
	
	//결과값
	app.lookup("otpRslt").value = JSON.stringify(util.Auth.getMenuParam(app));
}

function f_getMenuParam() {
	var menuParam = util.Auth.getMenuParam(app);
}

///*
// * "MDI메뉴 호출" 버튼(btn3)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn3Click(/* cpr.events.CMouseEvent */ e){
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn3 = e.control;
//	
//	
//	
//	var initValue = {
//		"menuParam3" : "param1",
//		"menuParam4" : "param2"
//	};
//	
//	//함수호출
//	util.MDI.open(app, "exam/template/Template102", initValue);
//}