/************************************************
 * FileSample01.js
 * Created at 2020. 6. 3. 오후 3:42:30.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/*
 * "테스트용 엑셀다운로드" 버튼(btnPopup3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopup3Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPopup3 = e.control;
	util.Grid.exportData(app, "grdTest", "테스트용 엑셀(오픈 및 수정금지!!)", "column2,column5");
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	var vcGrp = app.lookup("grp4");
	
	if(e.newSelection[0].label == "개인형IRP") {
		vcGrp.getLayout().setColumnVisible(1, false);
		vcGrp.getLayout().setColumnVisible(2, true);
	}else{
		vcGrp.getLayout().setColumnVisible(1, true);
		vcGrp.getLayout().setColumnVisible(2, false);
	}
}

/*
 * "샘플다운로드" 버튼(btnPopup3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopup3Click2(e){
	var btnPopup3 = e.control;
	util.Grid.exportData(app, "grdTest", "테스트용 엑셀(오픈 및 수정금지!!)", "column2,column5");
}
