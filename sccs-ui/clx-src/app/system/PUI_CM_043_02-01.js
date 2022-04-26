/************************************************
 * PUI_CM_043_02-01.js
 * Created at 2022. 3. 31. 오후 4:22:55.
 *
 * @author "nhyu"
 ************************************************/

/*
 * "파일찾기" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	app.lookup("fi1").openFileChooser();
}

/*
 * "메뉴찾기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
		app.getRootAppInstance().openDialog("app/system/PUI_CM_043_02-04", {width: 555, height:390}, function(dialog){
	});
}
