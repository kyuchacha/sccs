/************************************************
 * Output.js
 * Created at 2022. 3. 10. 오후 2:00:24.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var select = app.lookup("sampleCmb1").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleOpt").ellipsis = true;		
	}else{
		app.lookup("sampleOpt").ellipsis = false;	
	}
	app.lookup("sampleOpt").focus();	
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
	if(select == "true"){
		app.lookup("optRslt").unselectable = true;		
	}else{
		app.lookup("optRslt").unselectable = false;	
	}
	app.lookup("optRslt").focus();	
	
}
