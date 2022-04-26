/************************************************
 * confirm.js
 * Created at 2021. 10. 20 오후 2:14:44.
 *
 * @author hp
 ************************************************/



/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){

	/**
	 * @type cpr.controls.Dialog
	 */
	var dialog = app.getHost()
	dialog.close({closeState : "confirm"})
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/**
	 * @type cpr.controls.Dialog
	 */
	var dialog = app.getHost()
	dialog.close({closeState : "cancel"})
}



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	if(app.getHost().initValue){
		app.lookup("optMsg").value = app.getHost().initValue;
	}
}
