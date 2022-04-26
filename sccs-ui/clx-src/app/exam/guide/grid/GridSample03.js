/************************************************
 * GridSample03.js
 * Created at 2022. 3. 8. 오후 3:54:09.
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
	util.Grid.init(app, "grdSourceList");
	
	//폼 초기화
	util.FreeForm.init(app, "grpFormFunc");
}





/*
 * "그리드 원상태로 되돌리기" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick2(e){
	var btnReset = e.control;
	
	var dsList = app.lookup("dsList");
	
	util.DataSet.copyToDataSet(app, "dsListOrg", "dsList");
	dsList.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}


/*
 * "그리드 초기화" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick2(e){
	var btnInit = e.control;
	
	util.Grid.reset(app, "grdTargetList");
}





/*
 * "Row 복사" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(e){
	var btn1 = e.control;
	
	//함수 실행
	f_onCopyRow();
	
	//스크립트 출력
	printSource(f_onCopyRow);
	
	//결과 표시
	app.lookup("optRslt").value = "그리드에 선택된 Row들을 타겟 그리드에 복사한다. \n이미 있는 Row는 추가되지 않는다.";
}

function f_onCopyRow() {
	// 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.
	// 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
	util.Grid.copyToGridData(app, "grdSourceList", "grdTargetList");
}


/*
 * "전체 복사" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click2(e){
	var btn2 = e.control;
	
	//함수 실행
	f_onBtnCopyAllClick();
	
	//스크립트 출력
	printSource(f_onBtnCopyAllClick);
	
	//결과 표시
	app.lookup("optRslt").value = "소스(Source)그리드의 모든 행(Row)의 데이터를 타겟(Target)그리드로 복사한다. \n이미 있는 Row는 추가되지 않는다.";
}

function f_onBtnCopyAllClick() {
	// 소스(Source) 그리드의 모든 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.
	//  단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
	util.Grid.copyToAllGridData(app, "grdSourceList", "grdTargetList");
	
}


/*
 * "Row 이동" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	//함수 실행
	f_onMoveRow();
	
	//스크립트 출력
	printSource(f_onMoveRow);
	
	//결과 표시
	app.lookup("optRslt").value = "그리드에 선택된 Row들을 타겟 그리드로 이동한다. \n소스(Source)그리드의  이동된 로우는 delete모드로 상태값만 변경됨";
}

function f_onMoveRow() {
	// 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 이동한다.
	// 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
	util.Grid.moveToGridData(app, "grdSourceList", "grdTargetList");
}


/*
 * "전체 이동" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	//함수 실행
	f_onMoveAll();
	
	//스크립트 출력
	printSource(f_onMoveAll);
	
	//결과 표시
	app.lookup("optRslt").value = "소스(Source)그리드의 모든 행(Row)의 데이터를 타겟(Target)그리드로 이동한다. \n소스(Source)그리드의 이동된 로우는 delete모드로 상태값만 변경됨";
}

function f_onMoveAll() {
	// 소스(Source) 그리드의 모든 데이터행(Row)을 타겟(Target) 그리드로 이동한다.
	// 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
	util.Grid.moveToAllGridData(app, "grdSourceList", "grdTargetList");
}



//== 스크립트 출력 함수 ==//

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}

