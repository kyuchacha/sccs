/************************************************
 * SearchInput.js
 * Created at 2022. 3. 10. 오후 4:41:09.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var select = app.lookup("sampleCmb1").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleSpb1").placeholder = select;	
}

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(e){
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleSpb2").hideClearButton = true;		
	}else{
		app.lookup("sampleSpb2").hideClearButton = false;
	}
	app.lookup("sampleSpb2").redraw();	
}

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var select = app.lookup("sampleCmb3").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleSpb3").hideSearchButton = true;		
	}else{
		app.lookup("sampleSpb3").hideSearchButton = false;
	}
	app.lookup("sampleSpb3").redraw();
}

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var select = app.lookup("sampleCmb4").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleSpb4").searchPosition = select;
	app.lookup("sampleSpb4").redraw();
}
