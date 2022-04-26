//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMain", "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	// 3. 데이터 조회
	doList();
	
}

/**
 * 그리드 데이터를 조회
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 * 
 */
function doList(psStatus) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if(pbSuccess) {
			//조회되었습니다.
			util.Msg.notify(app, "INF-M001");
			util.Grid.selectRow(app, "grdMain", 0);
		}
	});
}

/*
 * "선택닫기" 버튼(btnSelect)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelect = e.control;
	
}

/*
 * "화면닫기" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}
