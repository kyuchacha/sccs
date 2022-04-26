/************************************************
* callParentMethod.js
 * Created at 2022. 3. 21. 오후 2:41:49.
 *
 * @author aaajd
 ************************************************/


//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}

//자식 앱으로 보낼 함수 export
function createButton(text){
	
	//임베디드 앱 안에 생성될 버튼 컨트롤
	var btn = new cpr.controls.Button();
	btn.style.css({
		"background": "#008ea1",
		"color": "white"
	});
	btn.value = text;
	
	//임베디드 앱 내 컨테이너에 컨트롤 추가
	var vcEmbeddedApp = app.lookup("embapp1");
	vcEmbeddedApp.getEmbeddedAppInstance().getContainer().addChild(btn, {
		"width": "150px",
		"height": "40px"
	});
}

//자식앱으로 내보낼 함수 export
exports.createButton = createButton;

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btnExport = e.control;

	var ipbFuncName = app.lookup("ipbFuncName");
	var optFuncName1 = app.lookup("optFuncName1");
	var optFuncName2 = app.lookup("optFuncName2");
	var args = app.lookup("args");
	
	optFuncName1.value = ipbFuncName.value;
	optFuncName2.value = ipbFuncName.value;
	
	args.enabled = true;
	
	var btnCallMethod = app.lookup("btnCallMethod");
	btnCallMethod.enabled = true;
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = "//부모 앱에서 export할 함수" + "\n" +
		createButton + "\n" +
		"//자식 앱으로 함수 export" + "\n" +
		"exports.createButton = createButton;";	
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btnCallMethod = e.control;
	var vcEmb = app.lookup("embapp1");
	
	var vcName = 'callMethod';
	var vcArgs = app.lookup("args").value;
	if(vcEmb.hasAppMethod(vcName)) {
		vcEmb.callAppMethod(vcName, vcArgs);	
	}
	vcEmb.redraw();
}

function loadEmbeddedApp(name, args) {
	
	//임베디드앱 연결
	var url = "/app/exam/appSmpl/faq&qna/embedded/callParentMethod_A";
	var vcEmb = app.lookup("embapp1");
	var voInitValue = args;
	
	cpr.core.App.load(url, function(loadedApp) {
		
		if (vcEmb.getEmbeddedAppInstance()) {
			vcEmb.getEmbeddedAppInstance().dispose();
		}
		
		if (loadedApp) {
			vcEmb.ready(function(embApp) {
				embApp.initValue = voInitValue;
			})
			vcEmb.app = loadedApp;
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce2AfterLoad(e){
	var vcEmb = app.lookup('embapp1');
	
	if (vcEmb.hasAppMethod('setValue')) {
		vcEmb.callAppMethod('setValue');
	}
}
