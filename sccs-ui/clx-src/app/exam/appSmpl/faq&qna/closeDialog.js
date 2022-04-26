/************************************************
* closeDialog.js
 * Created at 2022. 3. 21. 오전 9:01:07.
 *
 * @author aaajd
 ************************************************/

//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrp7Click(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}

var testDialog = null;// 전역변수로 생성

function openDialog(){
	app.openDialog("app/exam/appSmpl/faq&qna/closeDialog_popup", {
		width: 520,
		height: 500,
		modal : false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialog.focus();
			var vcBtnDialogClose = dialogApp.getEmbeddedAppInstance().lookup("btnDialogClose");
			vcBtnDialogClose.addEventListener("click", function(e){
				//다이얼로그내에 있는 컨트롤에서는 app.close(); 를 실행해도 동일한 결과를 수행합니다.
				dialog.close();
			});
			dialogApp.addEventListener("keydown", function(e){
				//esc를 눌렀을경우, 다이얼로그를 닫습니다.
				if (e.key == "Escape"){
					dialog.close();
				}		
			});
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후 , 앱 속성을 전달하십시오.
			testDialog = dialog;
		});
	}).then(function(returnValue) {
		;
	});	
}

/*
 * "실행" 버튼(btnOpen)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenClick(e){
	var btnOpen = e.control;
	openDialog();
}

/*
 * "실행" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(e){
	var btnClose = e.control;
	//다이얼로그를 호출한 화면의 컨트롤을 통해서 다이얼로그를 닫습니다.
	testDialog.close();
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce2AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = "//전역변수로 생성"+ "\n" +"var testDialog = null;" + "\n" 
						+ openDialog + onBtnCloseClick;	
}


