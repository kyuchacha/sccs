/************************************************
 * customcombo1.js
 * Created at 2018. 12. 27. 오후 2:47:57.
 *
 * @author tomato
 ************************************************/



var popupManager = cpr.core.Module.require("module/PopupManager");
var beforeSelItem = null;

/*
 * 콤보 박스에서 close 이벤트 발생 시 호출.
 * 리스트박스를 닫을때 발생하는 이벤트.
 */
function onCmb1Close(/* cpr.events.CUIEvent */ e){
	if(beforeSelItem){
		e.preventDefault();
	}
}



var _popup = null;

/*
 * 콤보 박스에서 before-selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onCmb1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var item = e.newSelection[0];
	if(item.value == "add" && (_popup == null ||_popup.disposed)){
		beforeSelItem = item;
		e.preventDefault();
		_popup = new udc.template.CustomComboPop();
		_popup.title = item.label;
		var dv = app.lookup("dv1");
		dv.refresh();
		
		_popup.initValue = {"app":app,ds:dv};
		popupManager.tooltipPopup(app.getContainer(), _popup, {position:app.getAppProperty("popupPos"),width:app.getAppProperty("popupWidth"),height:app.getAppProperty("popupHeight")});
		
	}else if(_popup && !_popup.disposed){
		e.preventDefault();
	}
	else{
		beforeSelItem = null;
		_popup = null;
	}
}

exports.reset = function(){
	beforeSelItem = null;
	app.lookup("cmb1").focus();
}

exports.transferData = function(/*cpr.data.DataSet*/dataset){
	var ds = app.lookup("combodata");
	ds.clear();
	dataset.copyToDataSet(ds);
	updateAddLabel();

}

/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(/* cpr.events.CUIEvent */ e){
	updateAddLabel();
	
}

function updateAddLabel(){
	var ds = app.lookup("combodata");
	var row = ds.findFirstRow("value == 'add'");
	var label = app.getAppProperty("addLabel");
	if(!row){
		ds.addRowData({"label":label,"value":"add"});
	}else{
		if(row.getValue("label") != label){
			ds.realDeleteRow(row.getIndex());
			ds.addRowData({"label":label,"value":"add"});
		}
	}
}
