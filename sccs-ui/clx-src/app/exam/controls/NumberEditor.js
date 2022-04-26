/************************************************
 * NumberEditor.js
 * Created at 2022. 3. 10. 오전 10:41:04.
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

	switch(select){
		case "1" :
			app.lookup("sampleNbe1").format = "999,999,999,999";
			app.lookup("sampleNbe1").value = "123,456,789,123";
			break;
		case "2" :
			app.lookup("sampleNbe1").format = "999,999,999,990";
			app.lookup("sampleNbe1").value = "";
			break;
		case "3" :
			app.lookup("sampleNbe1").format = "99,99";		
			app.lookup("sampleNbe1").value = "12.59";
			break;
		case "4" :
			app.lookup("sampleNbe1").format = "s999,999";		
			app.lookup("sampleNbe1").value = "-123,456";
			break;
	}		
}

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var select = app.lookup("sampleCmb2").value;
	var selectVal = app.lookup("sampleCmb3").value;
	if(select == null || selectVal == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleNbe3").step = Number(selectVal);
	if(select == "true"){
		app.lookup("sampleNbe3").spinButton = true;		
	}else{
		app.lookup("sampleNbe3").spinButton = false;	
	}
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
	if(select == "true"){
		app.lookup("sampleNbe4").readOnly = true;		
	}else{
		app.lookup("sampleNbe4").readOnly = false;	
	}
	app.lookup("sampleNbe4").focus();
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var select = app.lookup("sampleCmb5").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleNbe5").preventInput = true;		
	}else{
		app.lookup("sampleNbe5").preventInput = false;	
	}
	app.lookup("sampleNbe5").focus();
}

/*
 * "실행" 버튼(btnInit6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit6Click(e){
	var select = app.lookup("sampleCmb6").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleNbe6").autoSelect = true;		
	}else{
		app.lookup("sampleNbe6").autoSelect = false;	
	}
	app.lookup("sampleNbe6").focus();
	
}

/*
 * "실행" 버튼(btnInit8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit8Click(e){
	var select = app.lookup("sampleCmb8").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleNbe8").enabledInputMask = true;		
	}else{
		app.lookup("sampleNbe8").enabledInputMask = false;	
	}
	app.lookup("sampleNbe8").focus();
	
}

/*
 * "실행" 버튼(btnInit10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit10Click(e){
	var select = app.lookup("sampleCmb10").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleNbe10").placeholder = select;
}
