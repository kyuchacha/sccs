/************************************************
 * sample.js
 * Created at 2022. 1. 19. 오후 1:57:25.
 *
 * @author USER
 *
 *  공통 js 사용방법
 ************************************************/

//
//
//var util = scriptUtil(); 
//var commonModule = cpr.core.Module.require("lib/sample/sample"); // 모듈 직접 접근
////commonModule.alertTest();
////alert(util.name);


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var submission = app.lookup("sampleList");
	submission.send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSampleListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sampleList = e.control;
	var grid = app.lookup("grd1");	
	grid.redraw();
	
	
}


/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	var grd1 = app.lookup("grd1");
	var sms1 = app.lookup("sms1");
	var empNo = grd1.getCellValue(grd1.getSelectedRow().getIndex(),"empNo");
	var dmParam = app.lookup("dmParam");
	dmParam.setValue("empNo", empNo);
	sms1.send();
	
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	var form = app.lookup("form1");
	var ss = app.lookup("resultData");

	form.redraw();
}
