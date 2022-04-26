/************************************************
 * DataSample02.js
 * Created at 2020. 6. 4. 오후 4:44:57.
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
	app.lookup("otpRslt").value = "가져온 컬럼 값 [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnGetValueClick;
}

function f_onBtnGetValueClick() {
	//콤보박스에서 선택된 값
	var vsSelVal = util.Control.getValue(app, "cmbGetValueColumn");
	if (ValueUtil.isNull(vsSelVal)) {
		util.Msg.alert( "가져올 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	}
	
	var result = util.DataMap.getValue(app, "dmInfo", vsSelVal);
	
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
	
	var result = f_onBtnSetValueClick();
	
	if (result) {
		//결과표시
		app.lookup("otpRslt").value = "입력 받은 columnName에 해당되는 데이터를 수정합니다.";
		//스크립트 내용 표시
		app.lookup("txaScript").value = "" + f_onBtnSetValueClick;
	}
}

function f_onBtnSetValueClick() {
	//콤보박스에서 선택된 값
	var vsSelVal = util.Control.getValue(app, "cmbSetValueColumn");
	if (ValueUtil.isNull(vsSelVal)) {
		util.Msg.alert( "값을 변경할 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	}
	//변경할 값 
	var vsSetVal = util.Control.getValue(app, "ipbSetValue");
	if (vsSetVal == null) {
		util.Msg.alert( "변경할 값을 입력하고 진행하시기 바랍니다.");
		return false;
	}
	
	//변경
	var result = util.DataMap.setValue(app, "dmInfo", vsSelVal, vsSetVal);
	app.lookup("grpFreeForm").redraw();
	
	return result;
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
	util.DataMap.reset(app, "dmInfo");
	app.lookup("grpFreeForm").redraw();
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
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnClearClick;
}

function f_onBtnClearClick() {
	util.DataMap.clear(app, "dmInfo");
	app.lookup("grpFreeForm").redraw();
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
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtnCopyToDataSetClick;
}

function f_onBtnCopyToDataSetClick() {
	
	util.DataMap.copyToDataMap(app, "dmInfo", "dmInfoTarget");
	app.lookup("grpFreeFormTarget").redraw();
}

/*
 * "컬럼삭제" 버튼(btnDeleteColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteColumn = e.control;
	
	//삭제 전 
	var vsBefCols = app.lookup("dmInfo").getColumnNames().toString();
	
	var result = f_onBtnDeleteColumnClick();
	
	if (result) {
		//삭제 후
		var vsAftCols = app.lookup("dmInfo").getColumnNames().toString();
		
		//결과표시
		app.lookup("otpRslt").value = "삭제 전 dataMap의 Column : [" + vsBefCols + "] \n삭제 후 DataMap의 Column : [" + vsAftCols + "]";
		//스크립트 내용 표시
		app.lookup("txaScript").value = "" + f_onBtnDeleteColumnClick;
	}
}

function f_onBtnDeleteColumnClick() {
	//콤보박스에서 선택된 값
	var vsSelVal = util.Control.getValue(app, "cmbDeleteColumn");
	if (ValueUtil.isNull(vsSelVal)) {
		util.Msg.alert( "삭제할 컬럼명을 선택 후 진행해주시기 바랍니다.");
		return false;
	}
	
	//삭제
	var result = util.DataMap.deleteColumn(app, "dmInfo", vsSelVal);
	app.lookup("grpFreeForm").redraw();
	return result;
}

/*
 * "컬럼추가" 버튼(btnAddColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAddColumn = e.control;
	
	//추가 전
	var vsBefCols = JSON.stringify(app.lookup("dmInfo").getDatas());
	
	var result = f_onBtnAddColumnClick();
	if (!result) return;
	
	if (result) {
		//추가 후
		var vsAftCols = JSON.stringify(app.lookup("dmInfo").getDatas());
		
		//결과표시
		app.lookup("otpRslt").value = "추가 전 : " + vsBefCols +
			"\n추가 후 : " + vsAftCols;
		//스크립트 내용 표시
		app.lookup("txaScript").value = "" + f_onBtnAddColumnClick;
	}
}

function f_onBtnAddColumnClick() {
	//추가하려는 컬럼명
	var psColumnNm = util.Control.getValue(app, "ipbAddColumn");
	if (psColumnNm == null) {
		util.Msg.alert( "추가하려는 컬럼ID를 입력하고 진행하시기 바랍니다.");
		return false;
	}
	//초기값		
	var psColumnValue = util.Control.getValue(app, "ipbAddColumnValue");
	
	var result = util.DataMap.addColumn(app, "dmInfo", psColumnNm, psColumnValue);
	
	return result;
}