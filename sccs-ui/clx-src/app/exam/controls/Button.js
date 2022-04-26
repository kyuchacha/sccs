/************************************************
 * Button.js
 * Created at 2022. 3. 6. 오후 6:40:31.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var btnInit = e.control;
	var select = app.lookup("sampleCmb").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleBtn").enabled = true;		
	}else{
		app.lookup("sampleBtn").enabled = false;	
	}
	app.lookup("sampleBtn").focus();	
}

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(e){
	var btnInit2 = e.control;
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleBtn2").visible = true;		
	}else{
		app.lookup("sampleBtn2").visible = false;	
	}
	app.lookup("sampleBtn2").focus();		
}

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var btnInit3 = e.control;
	var select = app.lookup("sampleCmb3").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "tomato"){
		app.lookup("sampleBtn3").tooltip = "tomato";		
	}else{
		app.lookup("sampleBtn3").tooltip = "system";
	}
	app.lookup("sampleBtn3").focus();		
}

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var btnInit4 = e.control;
	var select = app.lookup("sampleCmb4").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "tomato"){
		app.lookup("sampleBtn4").value = "tomato";		
	}else{
		app.lookup("sampleBtn4").value = "system";
	}
	app.lookup("sampleBtn4").focus();		
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var btnInit5 = e.control;
	var select = app.lookup("sampleCmb5").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleBtn5").iconAlign = select;
}
