/************************************************
 * DataSample02.js
 * Created at 2022. 3. 10. 오후 2:52:02.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * "getValue" 버튼(btnGetValue)에서 click 이벤트 발생 시 호출.
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
	var txt = "가져온 컬럼 값 [ " + result + " ]";
	printResult(txt);
}

function f_onGetValue() {
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
function onBtnSetValueClick(e){
	var btnSetValue = e.control;
	
	//함수 실행
	var result = f_onSetValue();
	
	if (result) {
		//스크립트 출력
		printSource(f_onSetValue);
		
		//결과 표시
		printResult("입력 받은 columnName에 해당되는 데이터를 수정합니다.");
	}
}

function f_onSetValue() {
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
function onBtnResetClick(e){
	var btnReset = e.control;
	
	//함수 실행
	f_onReset();
	
	//스크립트 출력
	printSource(f_onReset);
	
	//결과 표시
	printResult("");
}

function f_onReset() {
	util.DataMap.reset(app, "dmInfo");
	app.lookup("grpFreeForm").redraw();
}


/*
 * "컬럼 삭제" 버튼(btnDeleteColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteColumnClick(e){
	var btnDeleteColumn = e.control;
	
	//삭제 전 
	var vsBefCols = app.lookup("dmInfo").getColumnNames().toString();
	
	var result = f_onDeleteColumn();
	
	if (result) {
		//삭제 후
		var vsAftCols = app.lookup("dmInfo").getColumnNames().toString();
		
		//스크립트 출력
		printSource(f_onDeleteColumn);
		
		//결과 표시
		var txt = "삭제 전 dataMap의 Column : [" + vsBefCols + "] \n삭제 후 DataMap의 Column : [" + vsAftCols + "]";
		printResult(txt);
	}
}

function f_onDeleteColumn() {
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
 * "컬럼 추가" 버튼(btnAddColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColumnClick(e){
	var btnAddColumn = e.control;
	
	//추가 전
	var vsBefCols = JSON.stringify(app.lookup("dmInfo").getDatas());
	
	var result = f_onAddColumn();
	if (!result) return;
	
	if (result) {
		//추가 후
		var vsAftCols = JSON.stringify(app.lookup("dmInfo").getDatas());
		
		//스크립트 출력
		printSource(f_onAddColumn);
		
		//결과 표시
		var txt = "추가 전 : " + vsBefCols + "\n추가 후 : " + vsAftCols;
		printResult(txt);
	}
}

function f_onAddColumn() {
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


/*
 * "복사" 버튼(btnCopyToDataSet)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToDataSetClick2(e){
	var btnCopyToDataSet = e.control;
	
	//함수 실행
	f_onCopyToDataSet();
	
	//스크립트 출력
	printSource(f_onCopyToDataSet);
	
	//결과 표시
	printResult("");
}

function f_onCopyToDataSet() {
	
	util.DataMap.copyToDataMap(app, "dmInfo", "dmInfoTarget");
	app.lookup("grpFreeFormTarget").redraw();
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
	printResult("");
}

function f_onClear() {
	util.DataMap.clear(app, "dmInfo");
	app.lookup("grpFreeForm").redraw();
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