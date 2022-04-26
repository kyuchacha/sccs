/************************************************
 * ${filename}
 * Created at ${date} ${time}.
 *
 * @author ${user}
 ************************************************/

var util = createCommonUtil();

/*
 * "비밀번호 초기화" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	util.Dialog.open(app, "app/system/PUI_CM_039_01-04", 500, 300, function(){
	});
}
