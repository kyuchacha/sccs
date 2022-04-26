/************************************************
 * ComboBox.js
 * Created at 2022. 3. 7. 오전 9:40:27.
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
	if(select == "true"){
		app.lookup("sampleCombo").preventInput = true;		
	}else{
		app.lookup("sampleCombo").preventInput = false;	
	}
	app.lookup("sampleCombo").focus();
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
		app.lookup("sampleCombo2").hideButton = true;		
	}else{
		app.lookup("sampleCombo2").hideButton = false;	
	}
	app.lookup("sampleCombo2").focus();	
}

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var itemsCount = Number(app.lookup("sampleCmb3").value);
	app.lookup("sampleCombo3").maxVisibleItems = itemsCount;
	app.lookup("sampleCombo3").open();
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
		app.lookup("sampleCombo4").multiple = true;		
	}else{
		app.lookup("sampleCombo4").multiple = false;	
	}
	app.lookup("sampleCombo4").open();
	
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
		app.lookup("sampleCombo5").showIcon = true;		
	}else{
		app.lookup("sampleCombo5").showIcon = false;	
	}
	app.lookup("sampleCombo5").open();
}

/*
 * "실행" 버튼(btnInit6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit6Click(e){
	app.lookup("sampleCombo6").enabledItemExp = "(value == 'value2' || value == 'value3') ? false : true" ;
	app.lookup("sampleCombo6").open();
}

/*
 * "실행" 버튼(btnInit7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit7Click(e){
	var btnInit7 = e.control;
	var select = app.lookup("sampleCmb7").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleCombo7").dropDownType = select;
	app.lookup("sampleCombo7").close();
	app.lookup("sampleCombo7").open();
}
