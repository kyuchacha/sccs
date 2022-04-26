/************************************************
 * Slider.js
 * Created at 2022. 3. 11. 오전 9:15:09.
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
	if(select == "50"){
		app.lookup("sampleSld1").value = "50";
	}else{
		app.lookup("sampleSld1").range = true;
		app.lookup("sampleSld1").value = "50,70";
	}
	app.lookup("sampleSld1").redraw();	
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
	app.lookup("sampleSld2").direction = select;
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
		app.lookup("sampleSld3").range = true;		
	}else{
		app.lookup("sampleSld3").range = false;
	}
	app.lookup("sampleSld3").redraw();	
	
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
	app.lookup("sampleSld4").orientation = select;
	app.lookup("sampleSld4").redraw();
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
	app.lookup("sampleSld5").step = Number(select);
	app.lookup("sampleSld5").redraw();
}

/*
 * 슬라이더에서 value-change 이벤트 발생 시 호출.
 * 값이 변경된 후 발생하는 이벤트
 */
function onSampleSld5ValueChange(e){
	var sampleSld5 = e.control;
	var vsStep = sampleSld5.step;
	console.log(vsStep);
	app.lookup("optRslt").value = "step 이동값 : "+vsStep;
}
