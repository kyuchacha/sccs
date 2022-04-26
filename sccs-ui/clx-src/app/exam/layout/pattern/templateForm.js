//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "cmbJob");
			util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	// 1. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	// 2. 데이터 조회
	doList();
}

/**
 * 그리드 데이터를 조회
 */
function doList() {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "frfMain");
			util.Control.redraw(app, "ipb1");
		}
	});
}
