/************************************************
 * PageIndexer.js
 * Created at 2022. 3. 10. 오후 2:52:11.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("samplePix4").pageIndexWidth = select;	
	app.lookup("samplePix4").redraw();
}

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(e){
	var select = app.lookup("sampleCmb1").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("samplePix3").viewPageCount = Number(select);	
	app.lookup("samplePix3").redraw();
}

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var select = app.lookup("sampleCmb3").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("samplePix5").visibleFirstButton = true;
		app.lookup("samplePix5").visibleLastButton = true;
		app.lookup("samplePix5").visibleNextButton = true;
		app.lookup("samplePix5").visiblePrevButton = true;
	}else{
		app.lookup("samplePix5").visibleFirstButton = false;
		app.lookup("samplePix5").visibleLastButton = false;
		app.lookup("samplePix5").visibleNextButton = false;
		app.lookup("samplePix5").visiblePrevButton = false;
	}
	app.lookup("samplePix5").redraw();
}
