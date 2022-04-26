/************************************************
 * Template202.js
 * Created at 2020. 3. 7. 오전 9:52:37.
 *
 * @author 1073727
 ************************************************/

//공통모듈 선언
var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	//폼 초기화
	util.FreeForm.init(app, ["grpForm1", "grpForm2", "grpFormDetail", "grpFormCont"]);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	util.SelectCtl.selectItem(app, "rdb4", 0);
	util.SelectCtl.selectItem(app, "rdb2", 0);
};

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb4SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb4 = e.control;
	
	f_onRdb4SelectionChange();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onRdb4SelectionChange;
}

function f_onRdb4SelectionChange() {
	
	if (util.SelectCtl.getItemValue(app, "rdb4") == "3") {
		app.lookup("grpMainForm").getLayout().setRowVisible(2, true);
		app.lookup("grpMainForm").getLayout().setRowVisible(3, false);
	} else {
		app.lookup("grpMainForm").getLayout().setRowVisible(2, false);
		app.lookup("grpMainForm").getLayout().setRowVisible(3, true);
	};
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRbd2SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rbd2 = e.control;
	
	f_onRbd2SelectionChange();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_onRbd2SelectionChange;
}

function f_onRbd2SelectionChange() {
	var ctrl;
	if (util.SelectCtl.getItemValue(app, "rdb2") == "Y") {
		ctrl = new cpr.controls.ComboBox("ctrl");
		var comboItemSet = app.lookup("dsCombo");
		ctrl.setItemSet(comboItemSet, {
			label: "L",
			value: "V"
		});
	} else {
		ctrl = new cpr.controls.RadioButton("ctrl");
		var comboItemSet = app.lookup("dsCombo");
		ctrl.setItemSet(comboItemSet, {
			label: "L",
			value: "V"
		});
	};
	
	ctrl.bind("value").toDataMap(app.lookup("dmParam"), "col1");
	app.lookup("grpFormDetail").removeChild(app.lookup("grpFormDetail").getChild("ctrl"));
	
	app.lookup("grpFormDetail").addChild(ctrl, {
		"colIndex": 2,
		"rowIndex": 0,
		"colSpan": 1
	});
}