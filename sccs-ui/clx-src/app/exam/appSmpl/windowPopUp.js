/************************************************
 * windowPopUp.js
 * Created at 2022. 1. 26. 오후 2:10:27.
 *
 * @author jiyeon
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	window.addEventListener("message", function getPostMessage(e) {
			app.lookup("windowOpt").value = e.data;
		});
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	window.opener.postMessage(app.lookup("windowIpb").value, "*");
}
