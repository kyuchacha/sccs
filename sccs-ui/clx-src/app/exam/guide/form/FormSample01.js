/************************************************
 * FormSample01.js
 * Created at 2022. 3. 8. 오후 7:30:25.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();
var column, inputVal;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//그리드 초기화
	util.Grid.init(app, ["grd1"]);
	
	//폼 초기화
	util.FreeForm.init(app, ["grpFormFunc", "grpFreeForm"]);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	util.Grid.selectRow(app, "grdList", 0);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbInputValSelectionChange(e){
	var cmbInputVal = e.control;
	
	column = cmbInputVal.value;
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbInputValValueChange(e){
	var ipbInputVal = e.control;
	
	inputVal = ipbInputVal.value;
}





/*
 * "init" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//스크립트 출력
	printSource(onBodyInit);
	
	//결과값 표시
	printResult("");
}


/*
 * "insertRow" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	//함수 실행
	var voRow = f_insertRow();
	
	//스크립트 출력
	printSource(f_insertRow);
	
	//결과 표시
	var result = "추가된 행의 인덱스 : [ " + voRow.getIndex() + " ]"
	printResult(result);
}

function f_insertRow() {
	//신규행 추가
	return util.FreeForm.insertRow(app, "grpFreeForm", column);
}


/*
 * "deleteRow" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	//함수 실행
	f_deleteRow();
	
	//스크립트 출력
	printSource(f_deleteRow);
	
	//결과 표시
	printResult("");
}

function f_deleteRow() {
	//행삭제 
	//세번째 파라미터    
	//true : 삭제하시겠습니까? 메세지 확인 후 삭제처리
	//false: 메세지 없이 삭제             
	//미입력시 false 
	util.FreeForm.deleteRow(app, "grpFreeForm", false);
}


/*
 * "getValue" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	//유효성 체크
	if (!util.validate(app, "cmbInputVal")) return false;
	
	if (util.Grid.getIndex(app, "grdList") == -1) util.Msg.alert( "INF-M008");
	
	//함수 실행
	f_getValue();
	
	//스크립트 출력
	printSource(f_getValue);
	
	//결과 표시
	printResult(util.FreeForm.getValue(app, "grpFreeForm", column));
}

function f_getValue() {
	//컬럼의 값을 다져온다.
	util.FreeForm.getValue(app, "grpFreeForm", column);
}


/*
 * "setValue" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	//유효성 검사
	if (!util.validate(app, ["cmbInputVal", "ipbInputVal"])) return false;
	
	if (util.Grid.getIndex(app, "grdList") == -1) util.Msg.alert( "INF-M008");
	
	//함수 실행
	f_setValue();
	
	//스크립트 출력
	printSource(f_setValue);
	
	//결과 표시
	printResult("");
}

function f_setValue() {
	//해당컬럼에 값을 셋팅한다.
	util.FreeForm.setValue(app, "grpFreeForm", column, inputVal);
};


/*
 * "setFocus" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	//유효성
	if (!util.validate(app, "cmbInputVal")) return false;
	
	//함수 실행
	f_setFocus();
	
	//스크립트 출력
	printSource(f_setFocus);
	
	//결과 표시
	printResult("");
}

function f_setFocus() {
	util.FreeForm.setFocus(app, "grpFreeForm", column);
};


/*
 * "revertRow" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	
	//유효성
	if (!util.validate(app, "cmbInputVal")) return false;
	
	if (!util.FreeForm.isModified(app, "grpFreeForm", "MSG")) return false;
	
	//함수 실행
	f_revertRow();
	
	//스크립트 출력
	printSource(f_revertRow);
	
	//결과 표시
	printResult("");
}

function f_revertRow() {
	//현재 선택되어있는 행 또는 선택한 행의 값을 초기값으로 되돌린다.
	util.FreeForm.revertRow(app, "grpFreeForm", util.Grid.getIndex(app, "grdList"), column);
}


/*
 * "revertAllData" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(e){
	var btn8 = e.control;
	
	//유효성
	if (!util.FreeForm.isModified(app, "grpFreeForm", "MSG")) return false;
	
	//함수 실행
	f_revertAllRow();
	
	//스크립트 출력
	printSource(f_revertAllRow);
	
	//결과 표시
	printResult("");
}

function f_revertAllRow() {
	//전체행의 데이터를 초기값으로 되돌린다.
	util.FreeForm.revertAllData(app, "grpFreeForm");
}


/*
 * "isModified" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(e){
	var btn9 = e.control;
	
	//함수 실행
	f_isModify();
	
	//스크립트 출력
	printSource(f_isModify);
	
	//결과 표시
	printResult(util.FreeForm.isModified(app, "grpFreeForm"));
}

function f_isModify() {
	//변경여부를 체크한다.
	//세번째 인자값
	// MSG : 변경된 사항이 없습니다.(alert)
	// CRM : 변경사항이 반영되지 않았습니다. 계속 하시겠습니까?(confirm)
	//util.FreeForm.isModified(app, "grpFreeForm", "CRM");
	
	if (util.FreeForm.isModified(app, "grpFreeForm")) {
		util.FreeForm.isModified(app, "grpFreeForm", "CRM", function() {
			util.Msg.alert( "확인버튼 클릭");
		}, function() {
			util.Msg.alert( "취소버튼 클릭");
		});
	} else {
		util.FreeForm.isModified(app, "grpFreeForm", "MSG");
	}
	
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


