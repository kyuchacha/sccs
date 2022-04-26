/************************************************
 * FormSampleEtc01.js
 * Created at 2020. 5. 29. 오후 5:43:51.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//그리드 초기화
	util.Grid.init(app, ["grd1"]);
	
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont", "grp3", "grpFreeForm"]);
}


/*
 * "초기화" 버튼(btnFormClear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFormClearClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFormClear = e.control;
	util.Group.clear(app, "grpFreeForm");
}