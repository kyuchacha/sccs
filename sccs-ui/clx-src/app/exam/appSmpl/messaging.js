/************************************************
 * messagingRevise.js
 * Created at 2022. 1. 26. 오후 1:34:25.
 *
 * @author jiyeon
 ************************************************/

var openWindow = null;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	//init 시점에 메시지 받아오는 이벤트 실행
	window.addEventListener("message", function getPostMessage(e) {
		if(app.lookup("mainWindowOpt") != null) {
			app.lookup("mainWindowOpt").value = e.data;
		}
	});
}


/*
 * 임베디드 앱에서 load 이벤트 발생 시 호출.
 * 임베디드 앱이 준비되고 그려진 후에 디스패치 되는 이벤트.
 */
function onEmbAppLoad(e){
	setAppObjectToEmb();
}

function setAppObjectToEmb() {
	//임베디드 앱의 property 설정
	app.lookup('embApp').setAppProperty("mainApp", app);
}

/*
 * "보내기 버튼" 버튼(btnMsgEmbApp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMsgEmbAppClick(e){
	//임베디드 앱의 메서드 실행
	var vcEmbeddedApp = app.lookup("embApp");
	if(vcEmbeddedApp.hasAppMethod("setOptProperty")) {
		vcEmbeddedApp.callAppMethod("setOptProperty", app.lookup("mainEmbAppIpb").value);
	}
}

/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEmbPageLoad(e){
	/** 
	 * @type cpr.controls.EmbeddedPage
	 */
	var embpage = e.control;
	
	//임베디드 페이지의 속성 설정
	embpage.setPageProperty("_ownerApp", app);
}

/*
 * "보내기 버튼" 버튼(btnMsgEmbPg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMsgEmbPgClick(e){
	var btnMsgEmbPg = e.control;
	
	var vcEmbeddedPage = app.lookup("embPage");
	
	//임베디드 페이지의 메서드 실행
	if(vcEmbeddedPage.hasPageMethod("getOutputText")) {
		vcEmbeddedPage.callPageMethod("getOutputText");
	}
}

/*
 * "새 창 열기" 버튼(btnPopUp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopUpClick(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPopUp = e.control;
	
	openWindow = window.open("./app/exam/appSmpl/windowPopUp.clx", "_popup", "height=300,left=100,top=100,width=350,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");
}

/*
 * "보내기 버튼" 버튼(btnMsgWindow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMsgWindowClick(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMsgWindow = e.control;
	
	//window 창으로 메세지 전달
	openWindow.postMessage(app.lookup("mainWindowIpb").value, "*");
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = onBodyInit + 
						setAppObjectToEmb + 
						onBtnMsgEmbAppClick + 
						onEmbPageLoad + 
						onBtnMsgEmbPgClick + 
						onBtnPopUpClick + 
						onBtnMsgWindowClick;
}

