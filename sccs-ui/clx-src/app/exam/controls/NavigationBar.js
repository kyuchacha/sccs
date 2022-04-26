/************************************************
 * NavigationBar.js
 * Created at 2022. 3. 9. 오후 6:13:10.
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
	console.log(select);
	app.lookup("sampleNavi").expandTrigger = select;
	app.lookup("sampleNavi").redraw();	
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var select = app.lookup("sampleCmb3").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("sampleNavi2").barItemSpacing = Number(select);
	
}

/*
 * "실행" 버튼(btnInit7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit7Click(e){
	var select = app.lookup("sampleCmb4").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleNavi3").tabTraversal = true;		
	}else{
		app.lookup("sampleNavi3").tabTraversal = false;	
	}
	app.lookup("sampleNavi3").focus();	
}
