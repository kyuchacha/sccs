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
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "frfMain", "CRM")) {
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
 */
function doList(psStatus) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
				app.lookup("tre1").selectItem(0);
			}
			util.Control.redraw(app, ["tre1", "frfMain"]);
		}
	});
}


/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	//dsEmp 데이터셋에서 선택된 트리 컨트롤 아이템에 value와 같은 행 찾음
	var voDsEmpRow = util.DataSet.findRow(app, "dsEmp", "DEPTNO == " + util.Tree.getSelectedValue(app, "tre1"));
	var vcGrpMain = app.lookup("frfMain");
	
	//frfMain 프리폼에 바인딩 컨텍스트 문맥 지정
	if (voDsEmpRow != null)
		vcGrpMain.setBindContext(new cpr.bind.DataRowContext(app.lookup("dsEmp"), voDsEmpRow.getIndex()));
	else
		vcGrpMain.setBindContext(new cpr.bind.DataRowContext(app.lookup("dsEmp"), -1));
}
