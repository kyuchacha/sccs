/************************************************
 * GridSample02.js
 * Created at 2020. 6. 1. 오후 1:43:18.
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
	util.Grid.init(app, "grdList");
	
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont"]);
	
}

/*
 * "선택" 버튼(btnHideColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnHideColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnHideColumn = e.control;
	
	var result = f_onBtnHideColumnClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = util.Control.getValue(app, "cmbHideColumn") + "컬럼 숨기기";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnHideColumnClick;
	
}

function f_onBtnHideColumnClick() {
	//콤보박스에서 선택된 값
	var vsSelHideCol = util.Control.getValue(app, "cmbHideColumn");
	if (ValueUtil.isNull(vsSelHideCol)) {
		util.Msg.alert( "숨길 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	//컬럼 숨기기
	util.Grid.hideColumn(app, "grdList", vsSelHideCol);
	
	return true;
}

/*
 * "확인" 버튼(btnShowColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShowColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnShowColumn = e.control;
	
	var result = f_onBtnShowColumnClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = util.Control.getValue(app, "cmbShowColumn") + "숨김 컬럼 보이기";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnShowColumnClick;
	
}

function f_onBtnShowColumnClick() {
	//콤보박스에서 선택된 값
	var vsSelCol = util.Control.getValue(app, "cmbShowColumn");
	if (ValueUtil.isNull(vsSelCol)) {
		util.Msg.alert( "숨김 취소할 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	//숨김 컬럼 보이기
	util.Grid.showColumn(app, "grdList", vsSelCol);
	
	return true;
}

/*
 * "확인" 버튼(btnSort)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSortClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSort = e.control;
	
	var result = f_onBtnSortClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "현재 연결된 데이터 구조체에 sort 조건을 변경하고 sort 적용";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSortClick;
	
}

function f_onBtnSortClick() {
	var vsSelVal = util.Control.getValue(app, "cmbSort");
	var vsSelAsc = util.Control.getValue(app, "cmbSortAsc");
	
	if (vsSelVal == null || vsSelAsc == null) {
		util.Msg.alert( "sort 조건을 변경하고 클릭하시기 바랍니다.");
		return;
	}
	
	util.Grid.sort(app, "grdList", vsSelVal + " " + vsSelAsc);
	
	return true;
}

/*
 * "변경" 버튼(btnFilter)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFilterClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFilter = e.control;
	
	var result = f_onBtnFilterClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "현재 연결된 데이터 구조체에 filter 조건을 변경하고 filter 적용";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnFilterClick;
	
}

function f_onBtnFilterClick() {
	var vsCondVal = util.Control.getValue(app, "ipbFilterCondition");
	
	if (vsCondVal == null) {
		util.Msg.alert( "filter 조건을 입력하고 클릭하시기 바랍니다.");
		return;
	}
	
	// * Grid.filter(app, "grd1", "age >= 20")<br/>
	// * 	=> "age"컬럼의 값이 20이상인 값만 필터링합니다.<br/>
	// * Grid.filter(app, "grd1", "name ^= '김'")<br/>
	// * 	=> "name"컬럼의 값이 '김'으로 시작하는 값만 필터링합니다.
	util.Grid.filter(app, "grdList", vsCondVal);
	
	return true;
	
}

/*
 * "확인" 버튼(btnGetHeaderColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetHeaderColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetHeaderColumn = e.control;
	
	var result = f_onBtnGetHeaderColumnClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "취득 한 Header의 Index [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetHeaderColumnClick;
	
}

function f_onBtnGetHeaderColumnClick() {
	var vsSelVal = util.Control.getValue(app, "cmbGetHeaderColumn");
	if (vsSelVal == null) {
		util.Msg.alert( "header정보를 취득할 컬럼을 선택 후 진행하시기 바랍니다.");
		return;
	}
	
	var resultId = util.Grid.getHeaderColumn(app, "grdList", vsSelVal)[0].colIndex;
	
	return resultId;
}

/*
 * "확인" 버튼(btnGetHeaderColumnText)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetHeaderColumnTextClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetHeaderColumnText = e.control;
	
	var result = f_onBtnGetHeaderColumnTextClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "취득 한 Header의 TEXT [ " + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetHeaderColumnTextClick;
}

function f_onBtnGetHeaderColumnTextClick() {
	var vsSelVal = util.Control.getValue(app, "cmbGetHeaderColumnText");
	if (vsSelVal == null) {
		util.Msg.alert( "header정보를 취득할 컬럼을 선택 후 진행하시기 바랍니다.");
		return;
	}
	
	var resultText = util.Grid.getHeaderColumnText(app, "grdList", vsSelVal);
	
	return resultText;
	
}

/*
 * "그리드 원상태로 되돌리기" 버튼(btnOrgInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOrgInitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOrgInit = e.control;
	app.lookup("grdList").resetGrid();
}
