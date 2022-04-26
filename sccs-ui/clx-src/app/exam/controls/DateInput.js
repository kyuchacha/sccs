/************************************************
 * DateInput.js
 * Created at 2022. 3. 7. 오전 11:07:33.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	
	var select = app.lookup("sampleCmb").value;
	var sampleDti1 = app.lookup("sampleDti1");
	
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	switch(select){
		case "year" :
			sampleDti1.calendarType = "year";
			sampleDti1.format = 'YYYY';
			sampleDti1.mask = 'YYYY';
			break;
		case "yearmonth" :
			sampleDti1.calendarType = "yearmonth";
			sampleDti1.format = 'YYYY-MM';
			sampleDti1.mask = 'YYYY-MM';			
			break;
		case "yearmonthdate" :
			sampleDti1.calendarType = "yearmonthdate";
			sampleDti1.format = 'YYYY-MM-DD';
			sampleDti1.mask = 'YYYY-MM-DD';				
			break;
	}
	sampleDti1.open();
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
		app.lookup("sampleDti2").hideButton = true;		
	}else{
		app.lookup("sampleDti2").hideButton = false;	
	}
	app.lookup("sampleDti2").focus();
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
	app.lookup("sampleDti3").mask =	select;
	app.lookup("sampleDti3").focus();
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
		app.lookup("sampleDti4").readOnly = true;		
	}else{
		app.lookup("sampleDti4").readOnly = false;	
	}
	app.lookup("sampleDti4").focus();
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
		app.lookup("sampleDti5").spinLoop = true;		
	}else{
		app.lookup("sampleDti5").spinLoop = false;	
	}
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
	app.lookup("sampleDti6").buttonPosition = select;	
}

/*
 * "실행" 버튼(btnInit7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit7Click(e){
	var select = app.lookup("sampleCmb7").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleDti7").popupPosition = select;
	app.lookup("sampleDti7").close();
	app.lookup("sampleDti7").open();		
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
		app.lookup("sampleDti8").preventInput = true;		
	}else{
		app.lookup("sampleDti8").preventInput = false;	
	}
	app.lookup("sampleDti8").focus();
}

/*
 * "실행" 버튼(btnInit9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit9Click(e){
	var select = app.lookup("sampleCmb9").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleDti9").enabledInputMask = true;		
	}else{
		app.lookup("sampleDti9").enabledInputMask = false;	
	}
	app.lookup("sampleDti9").focus();
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
	if(select == "true"){
		app.lookup("sampleDti10").showClearButton = true;		
	}else{
		app.lookup("sampleDti10").showClearButton = false;	
	}
	app.lookup("sampleDti10").focus();
	
}
