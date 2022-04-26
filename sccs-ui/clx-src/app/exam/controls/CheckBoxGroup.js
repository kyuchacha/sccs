/************************************************
 * CheckBoxGroup.js
 * Created at 2022. 3. 29. 오전 11:15:00.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var vsSelect = app.lookup("sampleCmb1").value;
	if(vsSelect == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleCbg1").colCount=Number(vsSelect);
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
		app.lookup("sampleCbg2").fixedWidth = true;		
	}else if(select =="false"){
		app.lookup("sampleCbg2").fixedWidth = false;
	}else{
		app.lookup("sampleCbg2").fixedWidth = "30px";
	}
	app.lookup("sampleCbg2").redraw();	
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
	app.lookup("sampleCbg3").horizontalSpacing = Number(select);
	app.lookup("sampleCbg3").verticalSpacing = Number(select);
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
	app.lookup("sampleCbg4").iconAlign = select;	
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var vsMaxSel = app.lookup("sampleNbe").value
	app.lookup("sampleCbg5").maxSelect = Number(vsMaxSel);
}
