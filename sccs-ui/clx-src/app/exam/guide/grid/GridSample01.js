/************************************************
 * GridSample01.js
 * Created at 2022. 3. 8. 오후 12:38:56.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//그리드 초기화
	util.Grid.init(app, "grdList");
	//폼 초기화
	util.FreeForm.init(app, "grpFormFunc");
}





/*
 * "그리드 원상태로 되돌리기" 버튼(btnRe)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnReClick(e){
	var btnRe = e.control;
	
	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}





/*
 * "Init" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * init 함수
 */
function onBtnInitClick(e){
	var btnInit = e.control;
	
	//함수 실행
	f_onInit();
	
	//스크립트 출력
	printSource(f_onInit);
	
	//결과 표시
	app.lookup("optRslt").value = "";
}

function f_onInit() {
	//그리드를 초기화한다.
	util.Grid.init(app, "grdList");
}


/*
 * "Clear" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * reset 함수
 */
function onBtnResetClick(e){
	var btnReset = e.control;
	
	f_onReset();
	
	printSource(f_onReset);
	
	app.lookup("optRslt").value = "";
}

function f_onReset() {
	util.Grid.reset(app, "grdList");
}


/*
 * "Row 추가" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * row 추가
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	f_onInsertRow();
	
	printSource(f_onInsertRow);
	
	app.lookup("optRslt").value = "";
}

function f_onInsertRow() {
	//그리드에 신규 행(Row) 추가
	util.Grid.insertRow(app, "grdList", 1);
}


/*
 * "Row 삭제" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * row 삭제
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	f_onDeleteRow();
	
	printSource(f_onDeleteRow);
	
	app.lookup("optRslt").value = "";
}

function f_onDeleteRow() {
	
	var vnIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdList");
	
	if (vnIdx.length == 0) {
		util.Msg.alert( "그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	
	//그리드의 선택된 행(Row) 삭제
	util.Grid.deleteRow(app, "grdList", vnIdx)
	
}


/*
 * "확인" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 그리드의 변경사항 유/무 반환
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	var result = f_onIsModified();
	
	printSource(f_onIsModified);
	
	app.lookup("optRslt").value = result;
}

function f_onIsModified() {
	
	//그리드의 변경사항 유/무를 반환한다. 
	if (util.Grid.isModified(app, "grdList")) {
		return true;
	} else {
		return false;
	}
}


/*
 * "가져오기" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 선택 혹은 체크된 행의 인덱스 반환
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	var result = f_onGetChkSelRowIndex();
	
	printSource(f_onGetChkSelRowIndex);
	
	app.lookup("optRslt").value = "그리드에서 체크 또는 선택된 행의 Index : [ " + result + " ]";
}

function f_onGetChkSelRowIndex() {
	//그리드의 선택 또는 체크된 행의 인덱스(Index) 반환
	var result = util.Grid.getCheckOrSelectedRowIndex(app, "grdList");
	
	return result;
}


/*
 * "가져오기" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 체크된 행의 인덱스 반환
 */
function onBtn7Click(e){
	var btn7 = e.control;
	
	var result = f_onGetChkRowIndex();
	
	printSource(f_onGetChkRowIndex);
	
	app.lookup("optRslt").value = "그리드에서 체크된 행의 Index : [ " + result + " ]";
}

function f_onGetChkRowIndex() {
	//그리드의 체크된 행의 인덱스(Index) 반환
	var result = util.Grid.getCheckedRowIndex(app, "grdList");
	
	return result;
}


/*
 * "가져오기" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 현재 선택된 행의 인덱스 반환
 */
function onBtn8Click(e){
	var btn8 = e.control;
	
	var result = f_onGetIndex();
	
	printSource(f_onGetIndex);
	
	app.lookup("optRslt").value = result;
}

function f_onGetIndex() {
	//Index 가져오기 
	var result = util.Grid.getIndex(app, "grdList");
	
	return result;
}


/*
 * "행 복구" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 특정 행 복구
 */
function onBtn9Click(e){
	var btn9 = e.control;
	
	f_onRevertRowData();
	
	printSource(f_onRevertRowData);
	
	app.lookup("optRslt").value = "";
}

function f_onRevertRowData() {
	
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
 * "전체 복구" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 전체 행 복구
 */
function onBtn10Click(e){
	var btn10 = e.control;
	
	f_onRevertAllData();
	
	printSource(f_onRevertAllData);
	
	app.lookup("optRslt").value = "";
}

function f_onRevertAllData() {
	util.Grid.revertAllData(app, "grdList");
}


/*
 * "선택" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(e){
	var btn11 = e.control;
	
	f_onSelectRow();
	
	printSource(f_onSelectRow);
	
	app.lookup("optRslt").value = "";
}


function f_onSelectRow() {
	
	//선택할 로우의 인덱스를 가져옴
	var vsIndex = util.Control.getValue(app, "ipbSelectRow");
	
	if (vsIndex != null && vsIndex != "") {
		//그리드에서 로우(Row)를 선택
		util.Grid.selectRow(app, "grdList", ValueUtil.fixNumber(vsIndex));
	} else {
		util.Msg.alert("선택 할 row index를 입력하시고 클릭하시기 바랍니다.");
	}
}


/*
 * "선택" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 조건을 만족하는 행 선택
 */
function onBtn12Click(e){
	var btn12 = e.control;
	
	f_onSelectRowByCondition();
	
	printSource(f_onSelectRowByCondition);
	
	app.lookup("optRslt").value = "";
}

function f_onSelectRowByCondition() {
	
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
 * "확인" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 그리드의 개수 반환
 */
function onBtn13Click(e){
	var btn13 = e.control;
	
	var result = f_onGetRowCount();
	
	printSource(f_onGetRowCount);
	
	app.lookup("optRslt").value = "그리드 행의 개수 : [ " + result + " ]";
}

function f_onGetRowCount() {
	var result = util.Grid.getRowCount(app, "grdList");
	
	return result;
}


/*
 * "확인" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 그리드 특정 Cell의 값을 반환
 */
function onBtn14Click(e){
	var btn14 = e.control;
	
	var result = f_onGetCellValue();
	
	printSource(f_onGetCellValue);
	
	//cellIndex 값을 가져오고자 하는 cell의 컬럼  index
	var vsSelVal = util.Control.getValue(app, "cmbGetCellValue"); //콤보박스에서 선택된 컬럼명
	app.lookup("optRslt").value = "현재 선택된 행에서 " + vsSelVal + " 컬럼의 값 : " + result;
}

function f_onGetCellValue() {
	
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
 * "변경" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 특정 Cell의 값을 변경
 */
function onBtn15Click(e){
	var btn15 = e.control;
	
	f_onSetCellValue();
	
	printSource(f_onSetCellValue);
	
	app.lookup("optRslt").value = "";
}

function f_onSetCellValue() {
	
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
	
	//그리드 특정 cell의 값을 변경
	var vsValue = util.Control.getValue(app, "ipbSetCellValue");
	util.Grid.setCellValue(app, "grdList", vsSelVal, vsValue, vnIdx);
	
}


/*
 * "확인" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 특정 Row의 상태값 반환
 */
function onBtn16Click(e){
	var btn16 = e.control;
	
	var result = f_onGetRowState();
	
	printSource(f_onGetRowState);
	
	app.lookup("optRslt").value = result;
}

function f_onGetRowState() {
	
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
 * "Row 상태 변경" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 특정 Row의 상태 변경
 */
function onBtn17Click(e){
	var btn17 = e.control;
	
	f_onSetRowState();
	
	printSource(f_onSetRowState);
	
	app.lookup("optRslt").value = "[ " + util.Grid.getIndex(app, "grdList") + " ] Row의 상태 변경";
}

function f_onSetRowState() {
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
 * "일괄 상태 변경" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 전체 Row의 상태 일괄 변경
 */
function onBtn18Click(e){
	var btn18 = e.control;
	
	var result = f_onSetRowStateAll();
	
	printSource(f_onSetRowStateAll);
	
	app.lookup("optRslt").value = "그리드의 전체 Row 상태 변경 [ " + app.lookup("cmbSetRowStateAll").getItemByValue(result).label + " ]";
}

function f_onSetRowStateAll() {
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
 * "확인" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 특정 상태값의 Row 인덱스를 배열로 반환
 */
function onBtn19Click(e){
	var btn19 = e.control;
	
	var result = f_onGetRowStatedIndices();
	
	printSource(f_onGetRowStatedIndices);
	
	app.lookup("optRslt").value = "해당 상태 값을 갖는 row를 검색하여 row index 배열을 반환 [ " + result + " ]";
}

function f_onGetRowStatedIndices() {
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



//== 스크립트 출력 ==//

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}


