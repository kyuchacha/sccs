/************************************************
 * MoveSample01Sub1.js
 * Created at 2020. 5. 15. 오전 10:11:32.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	util.FreeForm.init(app, ["grpSubForm1"]);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	app.lookup("grd1").redraw();
	
}

//
function fncSampleMethod(paArgs) {
	
	alert("임베디드앱 내 함수 호출 : 전달받은 파라미터\n " + JSON.stringify(paArgs));
	
}

exports.f_callMethod = function(paArgs) {
	fncSampleMethod(paArgs);
}