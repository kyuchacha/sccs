/************************************************
* embeddedParam.js
 * Created at 2022. 3. 21. 오전 11:22:17.
 *
 * @author 1amthomas
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

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btnBeforeChange = e.control;
	var vsParam = app.lookup("cmb2").value;
	//loadApp(vsParam);
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = loadApp;
}

/**
 * 
 * @param {String} vsParam
 */
function loadApp(vsParam){
	cpr.core.App.load("app/exam/appSmpl/faq&qna/embedded/embeddedParam_A", function(loadedApp){
		app.close();
		var newInst = loadedApp.createNewInstance();
		newInst.setAppProperty("param",vsParam);
		newInst.run();
	});
}

function initParam(){
	
	var vcEmbeddedApp = app.lookup("ea2");
	
	var vsParam = app.lookup("cmb2").value;
	
	//이미 임베디드 앱에 호출된 앱이 있다면 호출된 앱을 닫습니다.
	var voEmbeddedAppInstance = vcEmbeddedApp.getEmbeddedAppInstance();
	if(voEmbeddedAppInstance != null){
		voEmbeddedAppInstance.dispose();
	}
	//initValue로 임베디드앱에 값을 전달해 줍니다.
	cpr.core.App.load("app/exam/appSmpl/faq&qna/embedded/embeddedParam_A", function(loadedApp){
		if(loadedApp){
			vcEmbeddedApp.initValue = vsParam;
			vcEmbeddedApp.app = loadedApp;
		}
	});	
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	//임베디드 앱 객체를 가져옵니다.
	initParam();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = initParam;	
}
