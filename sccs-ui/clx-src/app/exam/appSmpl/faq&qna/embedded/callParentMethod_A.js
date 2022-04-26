/************************************************
 * SCRIPT_CONTROLS_EMBEDDEDAPP_03_A.js
 * Created at 2022. 1. 26. 오후 5:12:28.
 *
 * @author "nhyu"
 ************************************************/
//전역변수
var moHostAppIns = app.getHostAppInstance();

function callMethod(args){
	console.log(args);
	//직속부모 앱 인스턴스 접근 
	var voHostAppIns = app.getHostAppInstance();	
	
	//부모 앱에서 작성한 함수 유무 확인
	if(voHostAppIns.hasAppMethod('createButton')) {
		//함수 호출
		voHostAppIns.callAppMethod('createButton', args);
	}
}

function setValue() {
	//전달받은 초기값
	var host = app.getHost();
	var voInitValue = host.initValue;
	
	/** @type cpr.controls.TextInput */
	var vcFunctionName = moHostAppIns.lookup("optFuncName2");
	var vcname = vcFunctionName.value;

	/* 임베디드 앱의 인스턴스가 있으면 실행 */
	if (moHostAppIns){
		var vcAceEditor = moHostAppIns.lookup("ace2");
		vcAceEditor.value = callMethod;
	}
}

//부모앱으로 내보낼 함수 export
exports.setValue = setValue;
exports.callMethod = callMethod;