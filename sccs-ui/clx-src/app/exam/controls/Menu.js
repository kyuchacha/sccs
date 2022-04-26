/************************************************
 * Menu.js
 * Created at 2022. 3. 9. 오전 10:08:50.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var select = app.lookup("sampleCmb").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	console.log(select);
	app.lookup("sampleMenu4").direction = select;
	app.lookup("sampleMenu4").redraw();	
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	console.log(select);
	app.lookup("sampleMenu5").expandTrigger = select;
	app.lookup("sampleMenu5").redraw();	
}
