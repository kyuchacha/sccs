/************************************************
 * GridSample01.js
 * Created at 2020. 3. 7. 오전 9:52:37.
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
 * "초기화" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnReset = e.control;
	
	f_onBtnResetClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnResetClick;
}

function f_onBtnResetClick() {
	util.Grid.reset(app, "grdList");
}

/*
 * "그리드 원상태로 초기화" 버튼(btnOrgInit)에서 click 이벤트 발생 시 호출.
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

/*
 * "확인" 버튼(btnModi)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnModiClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnModi = e.control;
	
	var result = f_onBtnModiClick();
	
	//결과표시
	app.lookup("otpRslt").value = "" + result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnModiClick;
	
}

function f_onBtnModiClick() {
	
	//그리드의 변경사항 유/무를 반환한다. 
	if (util.Grid.isModified(app, "grdList")) {
		return true;
	} else {
		return false;
	}
}

/*
 * "확인" 버튼(btnRevertRowData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRevertRowDataClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRevertRowData = e.control;
	
	f_onBtnRevertRowDataClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnRevertRowDataClick;
	
}

function f_onBtnRevertRowDataClick() {
	
	if (!util.Grid.isModified(app, "grdList")) {
		util.Msg.alert( "그리드 특정행 내용 변경 후 진행해 주시기 바랍니다.");
		
		return false;
	};
	
	//Index 가져오기 
	var idxRow = util.Grid.getIndex(app, "grdList");
	//특정행 원상태로 복구
	util.Grid.revertRowData(app, "grdList", idxRow);
	
}

/*
 * "가져오기" 버튼(btnGetIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetIndexClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetIndex = e.control;
	
	var result = f_onBtnGetIndexClick();
	
	//결과표시
	app.lookup("otpRslt").value = "" + result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetIndexClick;
	
}

function f_onBtnGetIndexClick() {
	//Index 가져오기 
	var result = util.Grid.getIndex(app, "grdList");
	
	return result;
}

/*
 * "전체복구" 버튼(btnRevertAllData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRevertAllDataClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRevertAllData = e.control;
	
	f_onBtnRevertAllDataClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnRevertAllDataClick;
	
}

function f_onBtnRevertAllDataClick() {
	util.Grid.revertAllData(app, "grdList");
}

/*
 * "가져오기" 버튼(btnGetChkSelRowIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetChkSelRowIndexClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetChkSelRowIndex = e.control;
	
	var result = f_onBtnGetChkSelRowIndexClick();
	
	//결과표시
	app.lookup("otpRslt").value = result;
	app.lookup("otpRslt").value = "그리드에서 체크 또는 선택된 행의 Index: [ " + result + " ]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetChkSelRowIndexClick;
	
}

function f_onBtnGetChkSelRowIndexClick() {
	//그리드의 선택 또는 체크된 행의 인덱스(Index) 반환
	var result = util.Grid.getCheckOrSelectedRowIndex(app, "grdList");
	
	return result;
}

/*
 * "가져오기" 버튼(btnGetChkRowIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetChkRowIndexClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetChkRowIndex = e.control;
	
	var result = f_onBtnGetChkRowIndexClick();
	
	//결과표시
	app.lookup("otpRslt").value = "그리드에서 체크된 행의 Index: [ " + result + " ]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetChkRowIndexClick;
	
}

function f_onBtnGetChkRowIndexClick() {
	//그리드의 체크된 행의 인덱스(Index) 반환
	var result = util.Grid.getCheckedRowIndex(app, "grdList");
	
	return result;
}

/*
 * "가져오기" 버튼(btnGetCellValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetCellValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetCellValue = e.control;
	
	var result = f_onBtnGetCellValueClick();
	if (!result) return;
	
	//결과표시
	//cellIndex 값을 가져오고자 하는 cell의 컬럼  index
	var vsSelVal = util.Control.getValue(app, "cmbGetCellValue"); //콤보박스에서 선택된 컬럼명
	app.lookup("otpRslt").value = "현재 선택된 행에서 " + vsSelVal + " 컬럼의 값 : " + result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetCellValueClick;
	
}

function f_onBtnGetCellValueClick() {
	
	//cellIndex 값을 가져오고자 하는 cell의 행 index
	var vnIdx = util.Grid.getIndex(app, "grdList"); //그리드에서 선택된 행의 index
	if (vnIdx < 0) {
		util.Msg.alert( "그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	//cellIndex 값을 가져오고자 하는 cell의 컬럼  index
	var vsSelVal = util.Control.getValue(app, "cmbGetCellValue"); //콤보박스에서 선택된 컬럼명
	if (ValueUtil.isNull(vsSelVal)) {
		util.Msg.alert( "컬럼을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	//그리드 특정cell의 값을 반환
	var result = util.Grid.getCellValue(app, "grdList", vsSelVal, vnIdx);
	
	return result;
}

/*
 * "변경" 버튼(btnSetCellValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetCellValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetCellValue = e.control;
	
	var result = f_onBtnSetCellValueClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSetCellValueClick;
	
}

function f_onBtnSetCellValueClick() {
	
	//cellIndex 값을 가져오고자 하는 cell의 행 index
	var vnIdx = util.Grid.getIndex(app, "grdList"); //그리드에서 선택된 행의 index
	if (vnIdx < 0) {
		util.Msg.alert( "그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	//cellIndex 값을 가져오고자 하는 cell의 컬럼  index
	var vsSelVal = util.Control.getValue(app, "cmbSetCellValue"); //콤보박스에서 선택된 컬럼명
	if (ValueUtil.isNull(vsSelVal)) {
		util.Msg.alert( "컬럼을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	//그리드 특정cell의 값을 변경
	var vsValue = util.Control.getValue(app, "ipbSetCellValue");
	util.Grid.setCellValue(app, "grdList", vsSelVal, vsValue, vnIdx);
	
}

/*
 * "Row추가" 버튼(btnInsertRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInsertRow = e.control;
	
	f_onBtnInsertRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnInsertRowClick;
	
}

function f_onBtnInsertRowClick() {
	
	//그리드에 신규 행(Row) 추가
	util.Grid.insertRow(app, "grdList", 1);
}

/*
 * "Row삭제" 버튼(btnDeleteRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteRow = e.control;
	
	f_onBtnDeleteRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnDeleteRowClick;
}

function f_onBtnDeleteRowClick() {
	
	var vnIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdList");
	
	if (vnIdx.length == 0) {
		util.Msg.alert( "그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	
	//그리드의 선택된 행(Row) 삭제
	util.Grid.deleteRow(app, "grdList", vnIdx)
	
}

/*
 * "확인" 버튼(btnGetRowCount)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowCountClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowCount = e.control;
	
	var result = f_onBtnGetRowCountClick();
	
	//결과표시
	app.lookup("otpRslt").value = "그리드 행의 개수 : [ " + result + " ]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetRowCountClick;
	
}

function f_onBtnGetRowCountClick() {
	var result = util.Grid.getRowCount(app, "grdList");
	
	return result;
}

/*
 * "선택" 버튼(btnSelectRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelectRow = e.control;
	
	if (!f_onBtnSelectRowClick()) return;
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSelectRowClick;
}

function f_onBtnSelectRowClick() {
	
	//그리드 특정cell의 값을 변경
	var vsIndex = util.Control.getValue(app, "ipbSelectRow");
	if (vsIndex != null && vsIndex != "") {
		//그리드에서 로우(Row)를 선택
		util.Grid.selectRow(app, "grdList", ValueUtil.fixNumber(vsIndex));
	} else {
		util.Msg.alert("선택 할 row index를 입력하시고 클릭하시기 바랍니다.");
	}
}

/*
 * "선택" 버튼(btnSelectRowByCondition)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowByConditionClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelectRowByCondition = e.control;
	
	f_onBtnSelectRowByConditionClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + onBtnSelectRowByConditionClick;
	
}

function f_onBtnSelectRowByConditionClick() {
	
	//psCondition 조건식
	//	 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
	//		사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
	var psCondition = util.Control.getValue(app, "ipbSelectRowByCondition");
	if (psCondition != null && psCondition != "") {
		//그리드에서 조건에 만족하는 로우(Row)를 선택
		util.Grid.selectRowByCondition(app, "grdList", psCondition);
	} else {
		util.Msg.alert( "조건식을 입력하시고 클릭하시기 바랍니다.");
	}
	
	//그리드에서 조건을 만족하는 Row를 선택
	util.Grid.selectRowByCondition(app, "grdList", psCondition);
	
}

/*
 * "확인" 버튼(btnGetRowState)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowStateClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowState = e.control;
	
	var result = f_onBtnGetRowStateClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = util.Grid.getIndex(app, "grdList") + "Row 상태 [ " + result + " ]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetRowStateClick;
	
}

function f_onBtnGetRowStateClick() {
	
	var vnIdx = util.Grid.getIndex(app, "grdList");
	if (vnIdx < 0) {
		util.Msg.alert( "상태값을 가져올 행을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	var result = util.Grid.getRowState(app, "grdList", vnIdx);
	var vsDesc = "";
	if (result == "1") {
		vsDesc = "cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태\ncpr.data.tabledata.RowState.EMPTIED : 삭제된 로우를 커밋 시 삭제된 배열에서 제거하기 위한 임시 상태";
	} else if (result == "2") {
		vsDesc = "cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태.";
	} else if (result == "4") {
		vsDesc = "cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태";
	} else if (result == "8") {
		vsDesc = "cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태";
	} else if (result == "16") {
		vsDesc = "cpr.data.tabledata.RowState.INSERTDELETED : 행이 추가되었다가 삭제된 상태";
	};
	
	return vsDesc;
}

/*
 * "확인" 버튼(btnSetRowState)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetRowStateClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetRowState = e.control;
	
	var result = f_onBtnSetRowStateClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = util.Grid.getIndex(app, "grdList") + "Row의 상태 변경  ";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSetRowStateClick;
	
}

function f_onBtnSetRowStateClick() {
	//cellIndex 값을 가져오고자 하는 cell의 행 index
	var vnIdx = util.Grid.getIndex(app, "grdList"); //그리드에서 선택된 행의 index
	if (vnIdx < 0) {
		util.Msg.alert( "그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	//cellIndex 값을 가져오고자 하는 cell의 컬럼  index
	var vsSelState = util.Control.getValue(app, "cmbSetRowState"); //콤보박스에서 선택된 상태값
	if (ValueUtil.isNull(vsSelState)) {
		util.Msg.alert( "변경할 상태값을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	var state = null;
	if (vsSelState == "emp") {
		state = cpr.data.tabledata.RowState.EMPTIED; //삭제된 로우를 커밋 시 삭제된 배열을에서 제거하기 위한 임시 상태.
	} else if (vsSelState == "uc") {
		state = cpr.data.tabledata.RowState.UNCHANGED; //변경되지 않은 상태.
	} else if (vsSelState == "i") {
		state = cpr.data.tabledata.RowState.INSERTED; //행이 신규로 추가된 상태.
	} else if (vsSelState == "u") {
		state = cpr.data.tabledata.RowState.UPDATED; //행이 수정된 상태.
	} else if (vsSelState == "d") {
		state = cpr.data.tabledata.RowState.DELETED; //행이 삭제된 상태.
	} else if (vsSelState == "id") {
		state = cpr.data.tabledata.RowState.INSERTDELETED; //행이 추가되었다가 삭제된 상태.
	};
	
	util.Grid.setRowState(app, "grdList", state, vnIdx);
	
	return true;
}

/*
 * "일괄상태변경" 버튼(btnSetRowStateAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetRowStateAllClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetRowStateAll = e.control;
	
	var result = f_onBtnSetRowStateAllClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "그리드의 전체Row 상태 변경 [" + app.lookup("cmbSetRowStateAll").getItemByValue(result).label + "] ";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSetRowStateAllClick;
}

function f_onBtnSetRowStateAllClick() {
	//콤보박스에서 선택된 상태값
	var vsSelState = util.Control.getValue(app, "cmbSetRowStateAll");
	if (ValueUtil.isNull(vsSelState)) {
		util.Msg.alert( "변경할 상태값을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	var state = null;
	if (vsSelState == "emp") {
		state = cpr.data.tabledata.RowState.EMPTIED; //삭제된 로우를 커밋 시 삭제된 배열을에서 제거하기 위한 임시 상태.
	} else if (vsSelState == "uc") {
		state = cpr.data.tabledata.RowState.UNCHANGED; //변경되지 않은 상태.
	} else if (vsSelState == "i") {
		state = cpr.data.tabledata.RowState.INSERTED; //행이 신규로 추가된 상태.
	} else if (vsSelState == "u") {
		state = cpr.data.tabledata.RowState.UPDATED; //행이 수정된 상태.
	} else if (vsSelState == "d") {
		state = cpr.data.tabledata.RowState.DELETED; //행이 삭제된 상태.
	} else if (vsSelState == "id") {
		state = cpr.data.tabledata.RowState.INSERTDELETED; //행이 추가되었다가 삭제된 상태.
	};
	
	util.Grid.setRowStateAll(app, "grdList", state);
	
	return vsSelState;
}

/*
 * "확인" 버튼(btnGetRowStatedIndices)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowStatedIndicesClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowStatedIndices = e.control;
	
	var result = f_onBtnGetRowStatedIndicesClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = "해당 상태 값을 갖는 row를 검색하여 row index 배열을 반환 [ " + result + " ]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetRowStatedIndicesClick;
	
}

function f_onBtnGetRowStatedIndicesClick() {
	//콤보박스에서 선택된 상태값
	var vsSelState = util.Control.getValue(app, "cmbGetRowStatedIndices");
	if (ValueUtil.isNull(vsSelState)) {
		util.Msg.alert( "반환할 상태값을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	var state = null;
	if (vsSelState == "emp") {
		state = cpr.data.tabledata.RowState.EMPTIED; //삭제된 로우를 커밋 시 삭제된 배열을에서 제거하기 위한 임시 상태.
	} else if (vsSelState == "uc") {
		state = cpr.data.tabledata.RowState.UNCHANGED; //변경되지 않은 상태.
	} else if (vsSelState == "i") {
		state = cpr.data.tabledata.RowState.INSERTED; //행이 신규로 추가된 상태.
	} else if (vsSelState == "u") {
		state = cpr.data.tabledata.RowState.UPDATED; //행이 수정된 상태.
	} else if (vsSelState == "d") {
		state = cpr.data.tabledata.RowState.DELETED; //행이 삭제된 상태.
	} else if (vsSelState == "id") {
		state = cpr.data.tabledata.RowState.INSERTDELETED; //행이 추가되었다가 삭제된 상태.
	};
	
	var result = util.Grid.getRowStatedIndices(app, "grdList", state);
	
	return result;
}

/*
 * "Init" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit = e.control;
	f_onBtnInitClick();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnInitClick;
}

function f_onBtnInitClick() {
	//그리드를 초기화한다.
	util.Grid.init(app, "grdList");
}

/*
 * "그리드 원상태로 되돌리기" 버튼(btnOrgInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOrgInitClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOrgInit = e.control;
	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}
