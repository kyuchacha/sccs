/************************************************
 * ControlSample03.js
 * Created at 2022. 3. 10. 오후 9:19:53.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();
var ctrl, idx;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.FreeForm.init(app, ["grpFormFunc", "grp8"]);
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
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb2SelectionChange(e){
	var cmb2 = e.control;
	
	idx = ValueUtil.fixNumber(cmb2.value);
}

//util.SelectCtl.selectItem(app, psCtlId, puRowIdx, emitEvent)
//util.SelectCtl.addItem(app, psCtlId, psLabel, psValue, pnIndex);
//util.SelectCtl.cascadeList(app, psMainId, psSubId, psFilterColumnName, pbFirstItemSelect);
//util.SelectCtl.getItemLabel(app, psCtlId, pnIndex);
//util.SelectCtl.getItemValue(app, psCtlId, pnIndex)
//util.SelectCtl.getSelectedIndex(app, psCtlId)
//util.SelectCtl.reset(app, psCtlId);
//util.SelectCtl.selectAllItem(app, psCtlId);


/*
 * "selectItem" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "cmb2"])) return false;
	
	f_selectItem();
	
	printSource(f_selectItem);
}

function f_selectItem() {
	//네번째 인자값은 selection-change 이벤트를 발생시킬지 여부
	util.SelectCtl.selectItem(app, ctrl, idx, false);
};


/*
 * "getSelectedIndex" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getSelectedIndex();
	
	
	printResult(util.SelectCtl.getSelectedIndex(app, ctrl));
	printSource(f_getSelectedIndex);
}

function f_getSelectedIndex() {
	util.SelectCtl.getSelectedIndex(app, ctrl);
}


/*
 * "getItemValue" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getItemValue();
	
	printSource(f_getItemValue);
	printResult(util.SelectCtl.getItemValue(app, ctrl, idx));
}

function f_getItemValue() {
	//세번쨰 인자값을 입력하지 않을 경우 현재 선택된 아이템의 값을 가져온다.
	util.SelectCtl.getItemValue(app, ctrl, idx);
}


/*
 * "getItemLabel" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_getItemLabel();
	
	printSource(f_getItemLabel);
	printResult(util.SelectCtl.getItemLabel(app, ctrl, idx));
}

function f_getItemLabel() {
	//세번쨰 인자값을 입력하지 않을 경우 현재 선택된 아이템의 값을 가져온다.
	util.SelectCtl.getItemLabel(app, ctrl, idx);
}


/*
 * "addItem" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "cmb2"])) return false;
	
	f_addItem();
	
	printSource(f_addItem);
}

function f_addItem() {
	//5번째 인자값 idx 를 입력하지 않을 시 0번째로 item이 추가된다.
	util.SelectCtl.addItem(app, ctrl, "label" + app.lookup(ctrl).getItemCount(), "value" + app.lookup(ctrl).getItemCount(), idx);
}


/*
 * "selectAllItem" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "cmb2"])) return false;
	
	f_selectAllItem();
	
	printSource(f_selectAllItem);
}

function f_selectAllItem() {
	util.SelectCtl.selectAllItem(app, ctrl);
}


/*
 * "cascadeList" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1", "cmb2"])) return false;
	
	f_cascadeList();
	
	printSource(f_cascadeList);
	printResult("콤보박스D의 아이템리스트를 확인한다.");
}

function f_cascadeList() {
	util.SelectCtl.cascadeList(app, "cmb3", "cmb4", "P", true);
}


/*
 * "reset" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	printResult("");
	
	if (!util.validate(app, ["cmb1"])) return false;
	
	f_reset();
	
	printSource(f_reset);
}

function f_reset() {
	util.SelectCtl.reset(app, ctrl);
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
