/************************************************
 * ControlSample02.js
 * Created at 2022. 3. 10. 오후 6:02:45.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

var ctrl, inputVal, tf;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.FreeForm.init(app, ["grpFormFunc", "grp8"]);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("cmb1").selectItem(0);
	app.lookup("rdb1").selectItem(0);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(e){
	var cmb1 = e.control;
	
	ctrl = cmb1.value;
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbInputValueChange(e){
	var ipbInput = e.control;
	
	inputVal = ipbInput.value;
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb1SelectionChange(e){
	var rdb1 = e.control;
	
	tf = ValueUtil.fixBoolean(rdb1.value);
}


/*
 * "redraw" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	//결과값 초기화
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) {
		return false;
	}
	
	//함수 실행
	f_redraw();
	
	//스크립트 출력
	printSource(f_redraw);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_redraw() {
	//두번째 파라미터는 ["cmb1", "cmb2"] 배열로 대체 가능
	util.Control.redraw(app, ctrl);
}


/*
 * "setFocus" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	//결과값 초기화
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	//함수 실행
	f_setFocus();
	
	//스크립트 출력
	printSource(f_setFocus);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_setFocus() {
	util.Control.setFocus(app, ctrl);
}

/*
 * "setValue" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "ipb1"])) return false;
	
	f_setValue();
	
	printSource(f_setValue);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_setValue() {
	util.Control.setValue(app, ctrl, inputVal);
}


/*
 * "getValue" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getValue();
	
	printSource(f_getValue);
	printResult(util.Control.getValue(app, ctrl));
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_getValue() {
	util.Control.getValue(app, ctrl);
};


/*
 * "reset" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_reset();
	
	printSource(f_reset);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_reset() {
	//두번째 파라미터는 ["cmb1", "cmb2"] 배열로 대체 가능
	util.Control.reset(app, ctrl);
}


/*
 * "getConstraint" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getConstraint();
	
	printSource(f_getConstraint);
	printResult(JSON.stringify(util.Control.getConstraint(app, ctrl, "grp8")));
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_getConstraint() {
	var consts = util.Control.getConstraint(app, ctrl, "grp8");
	
	//아래의 방식으로 사용
	var hori = util.Control.getConstraint(app, ctrl, "grp8")["horizontalAlign"]
};


/*
 * "getActualRectPosition" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	printResult("");
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getActualRectPosition();
	
	printSource(f_getActualRectPosition);
	printResult(util.Control.getActualRectPosition(app, ctrl, app.lookup("cmb3").value));
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_getActualRectPosition() {
	util.Control.getActualRectPosition(app, ctrl, app.lookup("cmb3").value);
}


/*
 * "updateConstraint" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_updateConstraint();
	
	printSource(f_updateConstraint);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_updateConstraint() {
	//내부 제약조건은 상단 getConstraint 함수로 확인할수 있다.
	util.Control.updateConstraint(app, ctrl, "grp8", {
		"horizontalAlign": "center",
		"verticalAlign": "center",
		"width": "100",
		"height": "20"
	});
};


/*
 * "setReadOnly" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(e){
	var btn8 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "rdb1"])) return false;
	
	f_setReadOnly();
	
	printSource(f_setReadOnly);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_setReadOnly() {
	//세번째 인자값은 ["ipb1", "cmb1"] 배열로 사용가능
	util.Control.setReadOnly(app, tf, ctrl);
}


/*
 * "setVisible" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(e){
	var btn9 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "rdb1"])) return false;
	
	f_setVisible();
	
	printSource(f_setVisible);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_setVisible() {
	//세번째 인자값은 ["ipb1", "cmb1"] 배열로 사용가능
	util.Control.setVisible(app, tf, [ctrl]);
}


/*
 * "setEnable" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(e){
	var btn10 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "rdb1"])) return false;
	
	f_setEnable();
	
	printSource(f_setEnable);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_setEnable() {
	//세번째 인자값은 ["ipb1", "cmb1"] 배열로 사용가능
	util.Control.setEnable(app, tf, ctrl);
}

/*
 * "dispatchEvent" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(e){
	var btn11 = e.control;
	
	printResult("");
	
	f_dispatchEvent();
	
	printSource(f_dispatchEvent);
	
	//입력값 초기화
	app.lookup("ipbInput").value = "";
}

function f_dispatchEvent() {
	util.Control.setValue(app, "ipbInput", "setValue 버튼 클릭 dispatch");
	
	util.Control.dispatchEvent(app, "btn2", "click");
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
