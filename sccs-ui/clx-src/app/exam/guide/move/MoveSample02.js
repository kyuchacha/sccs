/************************************************
 * MoveSample02.js
 * Created at 2022. 3. 31. 오전 9:48:27.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//폼 초기화
	util.FreeForm.init(app, "grpFormFunc");
}


/*
 * "MDI 메뉴 호출" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//함수 실행
	f_MDIOpen();
	
	//스크립트 출력
	printSource(f_MDIOpen);
	
	//결과값 표시
	printResult("");
}

function f_MDIOpen() {
	
	var mdiValue = {
		"menuParam1": "파라미터1",
		"menuParam2": "파라미터2"
	};
	
	//함수호출
	util.MDI.open(app, "MoveSample03", mdiValue);
};


/*
 * "메뉴 파라미터" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	f_getMenuParam();
	
	printSource(f_getMenuParam);
	
	//결과값
	printResult(JSON.stringify(util.Auth.getMenuParam(app)));
}

function f_getMenuParam() {
	var menuParam = util.Auth.getMenuParam(app);
}



//== 스크립트 출력 ==//

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;
}

//== 결과 표시 ==//
function printResult(value) {
	app.lookup("optRslt").value = value;
}