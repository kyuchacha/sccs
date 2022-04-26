/************************************************
 * TreeSample01.js
 * Created at 2020. 6. 8. 오후 3:39:54.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	util.FreeForm.init(app, ["grpFormFunc", "grpFormCont"]);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	//'expandAllItems()
	var treItem = app.lookup("tre1");
	treItem.expandAllItems();
}

/*
 * "확인" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var result = f_onBtn1Click();
	
	//결과표시
	app.lookup("otpRslt").value = "트리에서 선택 된 행의 value [" + result + "]";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtn1Click;
}

function f_onBtn1Click() {
	
	return util.Tree.getSelectedValue(app, "tre1");
}

/*
 * "확인" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	var result = f_onBtn2Click();
	
	//결과표시
	app.lookup("otpRslt").value = "입력한 value에 해당하는 아이템의 " + result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtn2Click;
}

function f_onBtn2Click() {
	var vsVal = util.Control.getValue(app, "ipb2");
	if (vsVal == null) {
		util.Msg.alert( "value값을 입력하고 클릭하시기 바랍니다.");
		return;
	}
	
	//입력한 value에 해당하는 아이템의 label 또는 parentValue를 반환
	var lbResult = util.Tree.getItem(app, "tre1", vsVal, "LABEL");
	var pvResult = util.Tree.getItem(app, "tre1", vsVal, "PVALUE");
	return "label = [" + lbResult + "], parentValue = [" + pvResult + "]";
}

/*
 * "펼침" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	f_onBtn3Click();
	
	//결과표시
	app.lookup("otpRslt").value = "";
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtn3Click;
}

function f_onBtn3Click() {
	//util.Msg.alert( "테스트를 위해 우선 전체접기를 수행합니다.");
	//접기
	util.Tree.expandAllItems(app, "tre1", false);
	
	//var vsSel = util.Tree.getSelectedValue(app, "tre1");
	var vsSel = util.Control.getValue(app, "ipb3");
	var vsItem = app.lookup("tre1").getItemByValue(vsSel);
	
	//해당 아이템의 상위 아이템을 펼친다.
	util.Tree.expandParentItem(app, "tre1", vsItem, true);
}

/*
 * "펼침/접기" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var result = f_onBtn4Click();
	
	//결과표시
	app.lookup("otpRslt").value = result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtn4Click;
}

function f_onBtn4Click() {
	//pbExpand	펴기 : true, 닫기 : false
	var vsSel = util.Control.getValue(app, "cmb4")
	var pbExpand = ValueUtil.fixBoolean(vsSel);
	
	//아이템에 해당하는 모든 child item을 펼치거나 닫습니다.
	util.Tree.expandAllItems(app, "tre1", pbExpand);
	
	if (pbExpand)
		var result = "최상위 아이템 펼치기";
	else
		var result = "최상위 아이템 접기";
	
	return result;
}

/*
 * "확인" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	var result = f_onBtn6Click();
	
	//결과표시
	app.lookup("otpRslt").value = result;
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onBtn6Click;
}

function f_onBtn6Click() {
	//search value
	var vsVal = util.Control.getValue(app, "ipb6");
	if (vsVal == null) {
		util.Msg.alert( "value값을 입력하고 클릭하시기 바랍니다.");
		return;
	}
	//가지고 오는 구분자 값(VALUE(디폴트), LABEL)
	var psDiv = "VALUE";
	
	//입력한 label 또는 value에 해당하는 트리 아이템을 선택		
	util.Tree.selectItem(app, "tre1", vsVal, psDiv);
	
	return "value가 " + vsVal + "인 트리 아이템 선택"
}