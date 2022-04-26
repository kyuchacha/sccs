/************************************************
 * UdcCombo.js
 * Created at 2022. 1. 13. 오후 7:15:56.
 *
 * @author suhyun
 ************************************************/
var vaCmbValue = [];

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	e.preventDefault();
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	var vcDs = app.lookup("ds1");
	
	/** @type cpr.data.DataSet */
	var vcDsList = app.getAppProperty("dsComboList");
	if (!vcDsList) return;
	vcDsList.copyToDataSet(vcDs);
	vcDs.setUnfilteredRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}

/*
 * 콤보 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCmb1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	var voRect = cmb1.getActualRect();
	
	var voDpProp = { // 다이얼로그 프롭
		width: voRect.width,
		height: "auto",
		top: voRect.top + 30,
		left: voRect.left,
		headerVisible: false,
		resizable: false
	}
	app.getRootAppInstance().openDialog("app/exam/udcTmp/popup/comboList", voDpProp, function(dialog) {
		dialog.style.overlay.css("background-color", "transparent");
		dialog.ready(function(dialogApp) {
			if (!dialogApp) return;
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialogApp.setAppProperty("combobox", app.lookup("cmb1"));
			dialogApp.setAppProperty("dataset", app.lookup("ds1"));
		});
		dialog.addEventListener("overlay-click", function(e){
			dialog.close();
		});
	}).then(function(returnValue) {
		;
	});
	
}