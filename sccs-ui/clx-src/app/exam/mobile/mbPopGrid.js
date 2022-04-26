/************************************************
 * mbPopGrid.js
 * Created at 2021. 7. 11. 오전 5:09:15.
 *
 * @author minhye
 ************************************************/


/************************************************
 * 전역변수
 ************************************************/
/**
 * 컨트롤 복사 공통모듈
 */
var ctrlCopyModule = createCtrlCopyModule();

/**
 * 복사한 컨트롤
 */
var mcCopyGrd = null;


/************************************************
 * 사용자 함수
 ************************************************/
/**
 * 화면의 크기가 모바일 사이즈일 때, 
 * 그리드를 폼형태로 변환합니다.
 */
function changeGridToForm () {

	if(mcCopyGrd != null) return;
	
	var container = app.getContainer();
	var vcGrid = app.lookup("grdList");
	
	vcGrid.visible = false;
	
	mcCopyGrd = ctrlCopyModule.convertGridToForm(vcGrid, "page", null, {
		groupClass: "card",
		titleClass: "grid-title",
		countClass: "h5 text-blue",
	});
	
	container.addChild(mcCopyGrd, {
		autoSize : "height"
	});
}




/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subList").send().then(function(input){
		changeGridToForm();
	});
}

