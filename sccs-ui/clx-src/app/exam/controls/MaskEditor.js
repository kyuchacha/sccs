/************************************************
 * MaskEditor.js
 * Created at 2022. 3. 8. 오후 4:42:18.
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
	app.lookup("sampleMse1").mask = select;	
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
	app.lookup("sampleMse2").inputLetter = select;	
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
		app.lookup("sampleMse3").overwrite = true;		
	}else{
		app.lookup("sampleMse3").overwrite = false;	
	}
	app.lookup("sampleMse3").focus();
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	addPattern();
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = addPattern;
}
function addPattern(){
	
	var maskEditor_1 = app.lookup("sampleMse5");
	
	/* 사용자 정의 패턴을 추가 */
	maskEditor_1.addCustomPattern("k", /[1-2]/);
	maskEditor_1.mask = "000000-k000000"
	
	/* 사용자 정의 패턴 반환 */
	console.log(maskEditor_1.getCustomPatterns());
	
	/* 사용자 정의 패턴 삭제 */
	maskEditor_1.deleteCustomPattern("k");	
}

/*
 * "실행" 버튼(btnInit6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit6Click(e){
	setSelection();
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setSelection;
}

function setSelection(){
	var maskEditor_1 = app.lookup("sampleMse5");
	maskEditor_1.value = "tomatoSystem";
	
	/* cursor(start, end, text) */
	/* cursor는 텍스트 cursor 시작위치, 종료위치, 선택할 텍스트를 가진 정보  */
	/* start: number, end: number, text: string */
	maskEditor_1.setSelection({
		start : 0,
		end : 6,
		text : "tomato"
});
}