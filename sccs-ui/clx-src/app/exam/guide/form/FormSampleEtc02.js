/************************************************
 * FormSampleEtc02.js
 * Created at 2022. 3. 15. 오전 10:24:55.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//그리드 초기화
	util.Grid.init(app, ["grdList"]);
	
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFreeForm"]);
}


/*
 * "초기화" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var btnInit = e.control;
	
	util.FreeForm.init(app, "grpFreeForm");
	
	printSource(null);
}


/*
 * "필수값 체크" 버튼(btnValidate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnValidateClick(e){
	var btnValidate = e.control;
	
	validateForm();
	
	printSource(validateForm);
}

function validateForm() {
	// 폼레이아웃에 필수 입력값에 포커스 지정
	app.lookup("grpFreeForm").getChildren().forEach(function(each){
		if (each.value != "") each.style.removeClass("cl-focus");
		if (each.userAttr("required") == "Y" && each.value == "") {
			each.style.addClass("cl-focus");
		} 
	});
}





//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}