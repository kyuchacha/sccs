/************************************************
 * udcComboList.js
 * Created at 2022. 1. 14. 오전 9:28:44.
 *
 * @author suhyun
 ************************************************/

var vaCmbValue = [];
/** @type cpr.controls.ComboBox */
var vcCmb = null;

function appCloser(){
	app.close();
	window.removeEventListener("resize", appCloser);
}

/*
 * "전체선택" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vcGrd = app.lookup("grd1");
	
	if (!vcGrd.getFilter()) {
		for (var i = 0; i < vcGrd.rowCount; i++) {
			vcGrd.setCheckRowIndex(i, true);
			vcGrd.dataSet.setValue(vcGrd.getCheckRowIndices()[i], "checked", true);
		}
	} else {
		vcGrd.dataSet.forEachOfUnfilteredRows(function( /* cpr.data.Row */ dataRow) {
			dataRow.setValue("checked", false);
		});
		for (var i = 0; i < vcGrd.rowCount; i++) {
			vcGrd.setCellValue(i, "checked", true);
		}
	}
	
	comboData();
}

/*
 * "전체취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vcGrd = app.lookup("grd1");
	vcCmb.value = "";
	for (var i = 0; i < vcGrd.rowCount; i++) {
		vcGrd.dataSet.setValue(i, "checked", false);
	}
	
	vcGrd.dataSet.setUnfilteredRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
	vcCmb.redraw();
}

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트.
 */
function onIpb1Keyup( /* cpr.events.CKeyboardEvent */ e) {
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	app.lookup("ds1").setFilter("label *= '" + ipb1.displayText + "'");
	app.lookup("grd1").redraw();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	vcCmb = app.getAppProperty("combobox");
	var vcDs = app.lookup("ds1");
	var vcGrd = app.lookup("grd1");
	
	app.lookup("ipb1").focus();
	
	/** @type cpr.data.DataSet */
	var vcDsList = app.getAppProperty("dataset");
	vcDsList.copyToDataSet(vcDs);
	
	if (vcCmb.value) {
		vcCmb.values.forEach(function(each) {
			vcGrd.findAllRow("value == '" + each + "'").forEach(function(each) {
				vcGrd.setCellValue(each.getIndex(), "checked", true);
			});
		});
	}
	window.addEventListener("resize", appCloser);
	vcDs.setUnfilteredRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
}

/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx1ValueChange( /* cpr.events.CValueChangeEvent */ e) {
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx1 = e.control;
	comboData();
}

function comboData(){
	var vcGrd = app.lookup("grd1");
	
	vaCmbValue = [];
	
	vcGrd.dataSet.getUnfilteredRowDatas().forEach(function(each) {
		if (each.checked == "true") {
			vaCmbValue.push(each.value);
		}
	});
	
	vcGrd.dataSet.setUnfilteredRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
	
	vcCmb.putValues(vaCmbValue);
	vcCmb.redraw();
}
/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown( /* cpr.events.CKeyboardEvent */ e) {
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	if (cpr.events.KeyCode.ENTER == e.keyCode) {
		app.lookup("btnAllChk").click();
	}
}
