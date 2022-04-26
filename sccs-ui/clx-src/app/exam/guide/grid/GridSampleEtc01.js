/************************************************
 * GridSampleEtc01.js
 * Created at 2022. 3. 8. 오후 5:38:37.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.Grid.init(app, "grdList");
//	util.FreeForm.init(app, ["grpFormFunc"]);
}


/*
 * "필수값체크" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	printSource(validate)
	
	validate();
}

function validate() {
	if(!util.validate(app, ["grdList"], "modify")) return false;
}



//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}