/************************************************
 * embeddedApp.js
 * Created at 2022. 2. 14. 오후 6:06:28.
 *
 * @author jiyeon
 ************************************************/

/*
 * "보내기 버튼" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	var vcApp = app.getAppProperty("mainApp");
	vcApp.lookup("mainEmbAppOpt").value = app.lookup("embAppIpb").value;
}


exports.setOptProperty = function(value) {
	app.lookup("embAppOpt").value = value;
}
