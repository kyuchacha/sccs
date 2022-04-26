/************************************************
 * LinkedListBox.js
 * Created at 2022. 3. 8. 오후 5:42:44.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var select = app.lookup("sampleCmb").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleLib1").space = select;
	
}

/*
 * "실행" 버튼(btnInit6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit6Click(e){
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleLib6").direction = select;
	app.lookup("sampleLib6").redraw();	
}
