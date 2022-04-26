/************************************************
 * TreeSample01.js
 * Created at 2022. 3. 10. 오후 4:49:13.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.FreeForm.init(app, ["grpFormFunc"]);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	//'expandAllItems()
	var treItem = app.lookup("tre1");
	treItem.expandAllItems();
}

/*
 * "확인" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//함수 실행
	var result = f_getSelectedValue();
	
	//스크립트 출력
	printSource(f_getSelectedValue);
	
	//결과 표시
	var txt = "트리에서 선택 된 행의 value [" + result + "]";
	printResult(txt);
}

function f_getSelectedValue() {
	return util.Tree.getSelectedValue(app, "tre1");
}


/*
 * "확인" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	//함수 실행
	var result = f_getItem();
	
	//스크립트 출력
	printSource(f_getItem);
	
	//결과 표시
	var txt = "입력한 value에 해당하는 아이템의 " + result;
	printResult(txt);
}

function f_getItem() {
	var vsVal = util.Control.getValue(app, "ipb12");
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
function onBtn3Click(e){
	var btn3 = e.control;
	
	//함수 실행
	f_expandParentItem();
	
	//스크립트 출력
	printSource(f_expandParentItem);
	
	//결과 표시
	printResult("");
}

function f_expandParentItem() {
	//util.Msg.alert( "테스트를 위해 우선 전체접기를 수행합니다.");
	//접기
	util.Tree.expandAllItems(app, "tre1", false);
	
	//var vsSel = util.Tree.getSelectedValue(app, "tre1");
	var vsSel = util.Control.getValue(app, "ipb13");
	var vsItem = app.lookup("tre1").getItemByValue(vsSel);
	
	//해당 아이템의 상위 아이템을 펼친다.
	util.Tree.expandParentItem(app, "tre1", vsItem, true);
}


/*
 * "펼침/접기" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	//함수 실행
	var result = f_expandAllItems();
	
	//스크립트 출력
	printSource(f_expandAllItems);
	
	//결과 표시
	printResult(result);
}

function f_expandAllItems() {
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
 * "확인" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	//함수 실행
	var result = f_selectItem();
	
	//스크립트 출력
	printSource(f_selectItem);
	
	//결과 표시
	printResult(result);
}

function f_selectItem() {
	//search value
	var vsVal = util.Control.getValue(app, "ipb14");
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
