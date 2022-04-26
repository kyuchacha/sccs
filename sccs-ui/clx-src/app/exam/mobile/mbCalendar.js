/************************************************
 * mbCalendar.js
 * Created at 2022. 3. 11. 오전 11:25:21.
 *
 * @author jiyeon
 ************************************************/

//공통 모듈 사용
var util = createCommonUtil();

/*
 * "모바일 캘린더 팝업 열기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	// 팝업호출
	util.Dialog.open(app, "app/exam/mobile/mbPopCalendar", 450, 548);
}
