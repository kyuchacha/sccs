/************************************************
 * PAGE_01.js
 * Created at 2021. 12. 30. 오후 6:44:14.
 *
 * @author HANS
 ************************************************/

var util = createCommonUtil();

/*
 * "팝업 열기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	util.Dialog.open(app, "app/exam/hanjin/popup/DailogUI", 500, 600, function(){
		
	});
}
