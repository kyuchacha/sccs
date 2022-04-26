/************************************************
 * DataSample01.js
 * Created at 2020. 6. 4. 오전 9:40:49.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	
}

/*
 * "getValue" 버튼(btnGetValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetValue = e.control;
	
	var result = f_onBtnGetValueClick();
	if (!result) return;
	
	//결과표시
	app.lookup("otpRslt").value = util.Control.getValue(app, "cmbGetValueColumn") + "의 값: [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetValueClick;
	
}

function f_onBtnGetValueClick() {
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
function onBtnSetValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetValue = e.control;
	
	f_onBtnSetValueClick();
	
	//결과표시
	app.lookup("otpRslt").value = "입력 받은 rowIndex와 columnName에 해당되는 데이터를 수정합니다.";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnSetValueClick;
	
}

function f_onBtnSetValueClick() {
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
function onBtnGetRowCountClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowCount = e.control;
	
	var result = f_onBtnGetRowCountClick();
	
	//결과표시
	app.lookup("otpRslt").value = "데이터셋의 전체 Row개수 : [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetRowCountClick;
	
}

function f_onBtnGetRowCountClick() {
	
	var result = util.DataSet.getRowCount(app, "dsList");
	
	return result;
}

/*
 * "추가" 버튼(btnInsertRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInsertRow = e.control;
	
	f_onBtnInsertRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "선택한 Row의 뒤에 rowData의 신규행을 추가합니다. rowData는 임시로 설정함";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnInsertRowClick;
}

function f_onBtnInsertRowClick() {
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
function onBtnFindRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFindRow = e.control;
	
	var result = f_onBtnFindRowClick();
	
	//결과표시
	app.lookup("otpRslt").value = "조건식에 해당하는 Row객체 [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnFindRowClick;
}

function f_onBtnFindRowClick() {
	
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
 * "추가" 버튼(btnAddColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAddColumn = e.control;
	
	f_onBtnAddColumnClick();
	
	//alert(JSON.stringify(app.lookup("dsList").getRowDataRanged()));
	//결과표시
	app.lookup("otpRslt").value = "데이터셋 컬럼 정보 [" + app.lookup("dsList").getColumnNames() + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnAddColumnClick;
	
}

function f_onBtnAddColumnClick() {
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
 * "clear" 버튼(btnClear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClear = e.control;
	
	f_onBtnClearClick();
	
	//결과표시
	app.lookup("otpRslt").value = "모든 데이터셋 정보를 제거합니다.";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnClearClick;
	
}

function f_onBtnClearClick() {
	util.DataSet.clear(app, "dsList");
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
 * "복사" 버튼(btnCopyToDataSet)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToDataSetClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyToDataSet = e.control;
	
	f_onBtnCopyToDataSetClick();
	
	//결과표시
	app.lookup("otpRslt").value = "데이터셋을 Target데이터셋으로 복사합니다. target의 기존 데이터는 삭제됨";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnCopyToDataSetClick;
	
}

function f_onBtnCopyToDataSetClick() {
	util.DataSet.copyToDataSet(app, "dsList", "dsListTarget");
}

/*
 * "그리드 원상태로" 버튼(btnOrgInit)에서 click 이벤트 발생 시 호출.
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
 * "확인" 버튼(btnGetFindRowValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetFindRowValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetFindRowValue = e.control;
	
	var result = f_onBtnGetFindRowValueClick();
	
	//결과표시
	app.lookup("otpRslt").value = "지정범위 Row중 조건에 맞는 첫번째 Row객체의 지정한 컬럼value 반환 [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetFindRowValueClick;
	
}

function f_onBtnGetFindRowValueClick() {
	
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

