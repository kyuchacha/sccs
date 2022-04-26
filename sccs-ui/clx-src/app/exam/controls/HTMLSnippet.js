/************************************************
 * HTMLSnippet.js
 * Created at 2022. 3. 8. 오후 1:45:37.
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
	if(select == "true"){
		app.lookup("sampleHspt1").unselectable = true;		
	}else{
		app.lookup("sampleHspt1").unselectable = false;	
	}
	app.lookup("sampleHspt1").focus();	
}
