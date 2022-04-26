/************************************************
 * MoveSample01.js
 * Created at 2022. 3. 31. 오전 9:17:03.
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
 * "화면A 호출" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//함수 실행
	callPageA();
	
	//스크립트 출력
	printSource(callPageA);
}

function callPageA() {
	var vsEmbId = "embapp1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub1";
	var initValue = {
		"initValue1": "Value1",
		"initValue2": "Value2",
		"initValue3": "Value3"
	}
	
	util.EmbApp.setPage(app, vsEmbId, vsCallAppId, initValue);
}


/*
 * "화면B 호출" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	callPageB();
	
	printSource(callPageB);
}

function callPageB() {
	var vsEmbId = "embapp1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub2";
	var initValue = {};
	util.EmbApp.setPage(app, vsEmbId, vsCallAppId, initValue);
}


/*
 * "함수 호출" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	callFunc();
	
	printSource(callFunc);
}

function callFunc() {
	//샘플화면 임베디드앱내 호출
	var vsEdaId = "embapp1";
	var vsCallAppId = "app/exam/guide/move/Sample01Sub2";
	var paArgs = {
		"Args1": "파라미터값1",
		"Args2": "파라미터값2",
		"Args3": "파라미터값3"
	};
	util.EmbApp.setPage(app, vsEdaId, vsCallAppId, paArgs);
	
	//함수 호출
	var vsFuncname = "f_callMethod";
	util.EmbApp.callAppMethod(app, vsEdaId, vsFuncname, paArgs);
}



//== 스크립트 출력 ==//

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}
