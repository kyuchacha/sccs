/************************************************
 * mbCalendar.js
 * Created at 2021. 7. 9. 오후 5:46:11.
 *
 * @author minhye
 ************************************************/

//공통 모듈 사용
var util = createCommonUtil();


/*
 * "DEMO" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 팝업호출
	util.Dialog.open(app, "app/exam/mobile/mbPopCalendar", 450, 548);
}


