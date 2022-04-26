/************************************************
* targetControls.js
 * Created at 2022. 3. 22. 오전 9:57:23.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	app.lookup("ace2").value = onGrpContentClick;
}

/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpContentClick(e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpContent = e.control;
	
	var lblVal = app.lookup("optRslt");
	lblVal.value = "컨트롤 타입 : " + e.targetControl.type;
}
