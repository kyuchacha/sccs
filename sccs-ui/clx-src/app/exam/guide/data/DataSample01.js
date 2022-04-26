/************************************************
 * DataSample01.js
 * Created at 2022. 3. 10. 오후 1:35:43.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * "그리드 원상태로 되돌리기" 버튼(btnSrcGridInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSrcGridInitClick(e){
	var btnSrcGridInit = e.control;
	
	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}

/*
 * "그리드 초기화" 버튼(btnTrgGridInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnTrgGridInitClick(e){
	var btnTrgGridInit = e.control;
	
	util.Grid.reset(app, "grdTargetList");
}



/*
 * "getCondValue" 버튼(btnGetValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetValueClick(e){
	var btnGetValue = e.control;
	
	//함수 실행
	var result = f_onGetValue();
	if (!result) return;
	
	//스크립트 출력
	printSource(f_onGetValue);
	
	//결과 표시
	printResult(f_onGetValue());
}

function f_onGetValue() {
	//콤보박스에서 선택된 값
	var vsSelCol = util.Control.getValue(app, "cmbGetValueColumn");
	if (ValueUtil.isNull(vsSelCol)) {
		util.Msg.alert("값을 가져올 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	//조건식 
	var vsCondVal = util.Control.getValue(app, "ipbGetValueCondition");
	if (vsCondVal == null) {
		util.Msg.alert("조건식을 입력하고 클릭하시기 바랍니다.");
		return;
	}
	
	//가져오기
	var result = util.DataSet.getCondValue(app, "dsList", vsCondVal, vsSelCol);
	
	return result;
}


/*
 * "setValue" 버튼(btnSetValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetValueClick(e){
	var btnSetValue = e.control;
	
	//함수 실행
	f_onSetValue();
	
	//스크립트 출력
	printSource(f_onSetValue);
	
	//결과 표시
	printResult("입력 받은 rowIndex와 columnName에 해당되는 데이터를 수정합니다.");
}

function f_onSetValue() {
	// 그리드에서 선택된 행의 index
	var vnRowIdx = util.Grid.getIndex(app, "grdList");
	if (vnRowIdx < 0) {
		util.Msg.alert("그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return false;
	};
	//콤보박스에서 선택된 값
	var vsSelCol = util.Control.getValue(app, "cmbSetValueColumn");
	if (ValueUtil.isNull(vsSelCol)) {
		util.Msg.alert("변경할 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	//변경할 값 
	var vsSetVal = util.Control.getValue(app, "ipbSetValue");
	if (vsSetVal == null) {
		util.Msg.alert("변경할 값을 입력하고 진행하시기 바랍니다.");
		return;
	}
	
	//변경 
	util.DataSet.setValue(app, "dsList", vnRowIdx, vsSelCol, vsSetVal);
}


/*
 * "확인" 버튼(btnGetRowCount)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowCountClick(e){
	var btnGetRowCount = e.control;
	
	//함수 실행
	var result = f_onGetRowCount();
	
	//스크립트 출력
	printSource(f_onGetRowCount);
	
	//결과 표시
	var txt = "데이터셋의 전체 Row개수 : [" + result + "]";
	printResult(txt);
}

function f_onGetRowCount() {
	
	var result = util.DataSet.getRowCount(app, "dsList");
	
	return result;
}


/*
 * "추가" 버튼(btnInsertRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertRowClick(e){
	var btnInsertRow = e.control;
	
	//함수 실행
	f_onInsertRow();
	
	//스크립트 출력
	printSource(f_onInsertRow);
	
	//결과 표시
	printResult("선택한 Row의 뒤에 rowData의 신규행을 추가합니다. rowData는 임시로 설정함");
}

function f_onInsertRow() {
	// 그리드에서 선택된 행의 index
	var vnRowIdx = util.Grid.getIndex(app, "grdList");
	if (vnRowIdx < 0) {
		util.Msg.alert("그리드에서 행을 선택 후 진행해 주시기 바랍니다.");
		return;
	};
	
	//추가할 row data. (key: header명, value: value 를 갖는 json data)
	var poRowData = {
		"id": "ID99999",
		"name": "행추가",
		"tel": "02-7777-9999",
		"addr": "서울시 주소 123"
	};
	
	var pbAfter = true; //해당 row index의 뒤에 삽입할지 여부. (true:뒤 / false:앞)
	//추가
	util.DataSet.insertRow(app, "dsList", vnRowIdx, pbAfter, poRowData);
}


/*
 * "확인" 버튼(btnFindRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindRowClick(e){
	var btnFindRow = e.control;
	
	//함수 실행
	var result = f_onFindRow();
	
	//스크립트 출력
	printSource(f_onFindRow);
	
	//결과 표시
	var txt = "조건식에 해당하는 Row객체 [ " + result + " ]"
	printResult(txt);
}

function f_onFindRow() {
	
	//조건식
	//  ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
	// 	사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
	var psCondition = util.Control.getValue(app, "ipbFindRow");
	if (psCondition == null) {
		util.Msg.alert("조건식을 입력하고 진행하시기 바랍니다.");
		return;
	}
	
	var pbAllStatus = true; //true : 조건에 맞는 모든 row 리턴, default : 조건에 맞는 첫번째 row 리턴
	
	//결과
	var findRows = util.DataSet.findRow(app, "dsList", psCondition, pbAllStatus);
	
	var resultArray = [];
	findRows.forEach(function(each) {
		resultArray.push(each.getRowData())
	});
	
	var result = JSON.stringify(resultArray);
	
	return result;
}

/*
 * "확인" 버튼(btnGetFindRowValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetFindRowValueClick(e){
	var btnGetFindRowValue = e.control;
	
	//함수 실행
	var result = f_BtnGetFindRowValue();
	
	//스크립트 출력
	printSource(f_BtnGetFindRowValue);
	
	//결과 표시
	var txt = "지정범위 Row중 조건에 맞는 첫번째 Row객체의 지정한 컬럼value 반환 [ " + result + " ]"
	printResult(txt);
}

function f_BtnGetFindRowValue() {
	
	//콤보박스에서 선택된 값
	var vsSelCol = util.Control.getValue(app, "cmbGetFindRowValue");
	if (ValueUtil.isNull(vsSelCol)) {
		util.Msg.alert("가져올 컬럼을 선택 후 진행해주시기 바랍니다.");
		return false;
	};
	
	//조건식
	//  ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
	// 	사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
	var psCondition = util.Control.getValue(app, "ipbGetFindRowValue");
	if (psCondition == null) {
		util.Msg.alert( "조건식을 입력하고 진행하시기 바랍니다.");
		return;
	}
	
	var pbAllStatus = true; //true : 조건에 맞는 모든 row 리턴, default : 조건에 맞는 첫번째 row 리턴
	
	//결과
	var result = util.DataSet.getFindRowValue(app, "dsList", psCondition, vsSelCol);
	
	return result;
}


/*
 * "추가" 버튼(btnAddColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColumnClick(e){
	var btnAddColumn = e.control;
	
	//함수 실행
	f_onAddColumn();
	
	//alert(JSON.stringify(app.lookup("dsList").getRowDataRanged()));
	
	//스크립트 출력
	printSource(f_onAddColumn);
	
	//결과 표시
	var txt = "데이터셋 컬럼 정보 [ " + app.lookup("dsList").getColumnNames() + " ]";
	printResult(txt);
}

function f_onAddColumn() {
	//추가하려는 컬럼명
	var psColumnNm = util.Control.getValue(app, "ipbAddColumn");
	if (psColumnNm == null) {
		util.Msg.alert( "추가하려는 컬럼ID를 입력하고 진행하시기 바랍니다.");
		return;
	}
	
	var psColumnType = "string"; //컬럼유형(string/number/decimal/expression)
	
	var resultBoolean = util.DataSet.addColumn(app, "dsList", psColumnNm, psColumnType);
	
	//성공시 true
	return resultBoolean;
}


/*
 * "복사" 버튼(btnCopyToDataSet)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToDataSetClick(e){
	var btnCopyToDataSet = e.control;
	
	//함수 실행
	f_onCopyToDataSet();
	
	//스크립트 출력
	printSource(f_onCopyToDataSet);
	
	//결과 표시
	printResult("데이터셋을 Target데이터셋으로 복사합니다. target의 기존 데이터는 삭제됨");
}

function f_onCopyToDataSet() {
	util.DataSet.copyToDataSet(app, "dsList", "dsListTarget");
}


/*
 * "clear" 버튼(btnClear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearClick(e){
	var btnClear = e.control;
	
	//함수 실행
	f_onClear();
	
	//스크립트 출력
	printSource(f_onClear);
	
	//결과 표시
	printResult("모든 데이터셋 정보를 제거합니다.");
}

function f_onClear() {
	util.DataSet.clear(app, "dsList");
}



//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}



//== 결과 표시 ==//
function printResult(value) {
	app.lookup("optRslt").value = value;
}