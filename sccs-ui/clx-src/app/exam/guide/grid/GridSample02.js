/************************************************
 * GridSample02.js
 * Created at 2022. 3. 8. 오후 2:41:39.
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
 * "그리드 원상태로 되돌리기" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick2(e){
	var btnReset = e.control;
	
	//	app.lookup("grdList").resetGrid();

	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}





/*
 * "숨기기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	
	//함수 실행
	var result = f_onHideColumn();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onHideColumn)
	
	//결과 표시
	app.lookup("optRslt").value = util.Control.getValue(app, "cmbHideColumn") + "컬럼 숨기기";
}

function f_onHideColumn() {
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
 * "보이기" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	//함수 실행
	var result = f_onShowColumn();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onShowColumn);
	
	//결과 출력
	app.lookup("optRslt").value = util.Control.getValue(app, "cmbShowColumn") + "숨김 컬럼 보이기";
}

function f_onShowColumn() {
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
 * "정렬" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	//함수 실행
	var result = f_onSort();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onSort);
	
	//결과 표시
	app.lookup("optRslt").value = "현재 연결된 데이터 구조체의 sort 조건을 변경하고 sort 적용";
}

function f_onSort() {
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
 * "필터" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	//함수 실행
	var result = f_onFilter();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onFilter);
	
	//결과 표시
	app.lookup("optRslt").value = "현재 연결된 데이터 구조체의 filter 조건을 변경하고 filter 적용";
}

function f_onFilter() {
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
 * "확인" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * columnName으로 헤더 컬럼의 Index 취득
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	//함수 실행
	var result = f_onGetHeaderColumn();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onGetHeaderColumn);
	
	//결과 표시
	app.lookup("optRslt").value = "취득한 Header의 Index : [ " + result + " ]";
}

function f_onGetHeaderColumn() {
	var vsSelVal = util.Control.getValue(app, "cmbGetHeaderColumn");
	if (vsSelVal == null) {
		util.Msg.alert( "header정보를 취득할 컬럼을 선택 후 진행하시기 바랍니다.");
		return;
	}
	
	var resultId = util.Grid.getHeaderColumn(app, "grdList", vsSelVal)[0].colIndex;
	
	return resultId;
}


/*
 * "확인" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 
 * 그리드 헤더 컬럼의 TEXT 반환
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	//함수 실행
	var result = f_onGetHeaderColumnText();
	if(!result) return;
	
	//스크립트 출력
	printSource(f_onGetHeaderColumnText);
	
	//결과 표시
	app.lookup("optRslt").value = "취득 한 Header의 TEXT : [ " + result + " ]";
}

function f_onGetHeaderColumnText() {
	var vsSelVal = util.Control.getValue(app, "cmbGetHeaderColumnText");
	if (vsSelVal == null) {
		util.Msg.alert( "header정보를 취득할 컬럼을 선택 후 진행하시기 바랍니다.");
		return;
	}
	
	var resultText = util.Grid.getHeaderColumnText(app, "grdList", vsSelVal);
	
	return resultText;
	
}



//== 스크립트 출력 ==//

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}


