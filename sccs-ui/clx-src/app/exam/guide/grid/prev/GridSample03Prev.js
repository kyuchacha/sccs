/************************************************
 * GridSample03.js
 * Created at 2020. 6. 1. 오후 7:01:00.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//그리드 초기화
	util.Grid.init(app, "grdSourceList");
	
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont"]);
	
}

/*
 * "Row복사" 버튼(btnCopyRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyRow = e.control;
	
	f_onBtnCopyRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "그리드에 선택된 Row들을 타겟 그리드에 복사한다. 이미 있는 Row는 추가되지 않는다.";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnCopyRowClick;
	
}

function f_onBtnCopyRowClick() {
	// 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.
	// 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
	util.Grid.copyToGridData(app, "grdSourceList", "grdTargetList");
}

/*
 * "전체복사" 버튼(btnCopyAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyAllClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyAll = e.control;
	
	f_onBtnCopyAllClick();
	
	//결과표시
	app.lookup("otpRslt").value = "소스(Source)그리드의 모든 행(Row)의 데이터를 타겟(Target)그리드로 복사한다. 이미 있는 Row는 추가되지 않는다.";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnCopyAllClick;
	
}

function f_onBtnCopyAllClick() {
	// 소스(Source) 그리드의 모든 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.
	//  단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
	util.Grid.copyToAllGridData(app, "grdSourceList", "grdTargetList");
	
}

/*
 * "그리드 초기화" 버튼(btnSrcGridInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSrcGridInitClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSrcGridInit = e.control;
	
	util.Grid.reset(app, "grdTargetList");
}

/*
 * "Row이동" 버튼(btnMoveRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMoveRow = e.control;
	
	f_onBtnMoveRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "그리드에 선택된 Row들을 타겟 그리드로 이동한다. 소스(Source)그리드의  이동된 로우는 delete모드로 상태값만 변경됨";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnMoveRowClick;
}

function f_onBtnMoveRowClick() {
	// 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 이동한다.
	// 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
	util.Grid.moveToGridData(app, "grdSourceList", "grdTargetList");
}

/*
 * "전체이동" 버튼(btnMoveAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveAllClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMoveAll = e.control;
	
	f_onBtnMoveAllClick();
	
	//결과표시
	app.lookup("otpRslt").value = "소스(Source)그리드의 모든 행(Row)의 데이터를 타겟(Target)그리드로 이동한다. 소스(Source)그리드의 이동된 로우는 delete모드로 상태값만 변경됨";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnMoveAllClick;
}

function f_onBtnMoveAllClick() {
	// 소스(Source) 그리드의 모든 데이터행(Row)을 타겟(Target) 그리드로 이동한다.
	// 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
	util.Grid.moveToAllGridData(app, "grdSourceList", "grdTargetList");
}

/*
 * "그리드 원상태로 되돌리기" 버튼(btnOrgInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOrgInitClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOrgInit = e.control;
	
	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}