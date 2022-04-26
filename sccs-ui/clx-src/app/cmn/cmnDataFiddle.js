/************************************************
 * cmnDataFiddle.js
 * Created at 2021. 12. 9 오전 10:35:05.
 *
 * @author hp
 ************************************************/

var util = createCommonUtil()
var initConfig;
var grdOriginConfig;
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var initValue = app.getHost().initValue;
	if(!initValue) return;
	
	initConfig = initValue;
	grdOriginConfig = app.lookup("grd1").getInitConfig();
	
	app.lookup("optMenuNm").value = initValue.menuNm;
	app.lookup("optAppId").value = initValue.menuId;
	app.lookup("cmbGrpList").visible = false;
	
	/** @type {cpr.core.AppInstance[]} **/
	var appList = initValue.childApp
	appList.forEach(function(each){
		var child = each;
		var row = app.lookup("dsAppList").addRow();
		row.setValue("value", child.id);
		row.setValue("name", child.app.id === initValue.menuId ? child.app.title + "(메인)" : child.app.title);		
	});
	
	var dataList = initValue.dataControls;
	dataList.forEach(function(each){
		var row = app.lookup("dsDataList").addRow();
		row.setValue("value", each.uuid);
		row.setValue("name", each.id);
		row.setValue("parent", each.getAppInstance().id);
	})
	
	app.lookup("cmbAppList").selectItem(0);
	
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbAppListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbAppList = e.control;
	app.lookup("grd1").init(grdOriginConfig);
	app.lookup("cmbDataList").setFilter("parent =='" + cmbAppList.value + "' || value ==''");
	app.lookup("cmbDataList").selectItem(0);
	app.lookup("cmbGrpList").selectItem(0);
	app.lookup("cmbDataList").redraw();
	
	var selectedApp = initConfig.childApp.find(function(each){
		return each.id === cmbAppList.value
	})

	app.lookup("dsGroup").clear();
	
	var childs = util.Control.getAllUiControl(app, selectedApp.getContainer()).filter(function(each){
		return each.type === "container";
	}).forEach(function(each){
		var row = app.lookup("dsGroup").addRow();
		row.setValue("value", each.uuid);
		row.setValue("name", each.fieldLabel || each.id || "아이디 없음");
	});
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbDataListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbDataList = e.control;
	if(!cmbDataList.value){
		app.lookup("grd1").init(grdOriginConfig);
		return;
	}
	
	var dataControl = initConfig.dataControls.find(function(each){
		return each.uuid === cmbDataList.value;
	});
	new GridLayoutBuilder().build(dataControl);
	util.Grid.init(app, "grd1");
	app.getContainer().redraw();
	
}

/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onChk1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var chk1 = e.control;
	app.lookup("cmbGrpList").visible = chk1.value !== "N";
	
	if(chk1.value === "N"){
		app.lookup("cmbDataList").setFilter("parent =='" + app.lookup("cmbAppList").value + "' || value ==''");
	}
	
	
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbGrpListSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbGrpList = e.control;
	if(!cmbGrpList.value) return;
	
	var dsList = [];
	var filterCondition = "";
	app.lookup("cmbDataList").selectItem(0);
	app.lookup("grd1").init(grdOriginConfig);
	
	/** @type {cpr.core.AppInstance} **/
	var selectedApp = initConfig.childApp.find(function(each){
		return each.id === app.lookup("cmbAppList").value
	})
	var selectedGrp = selectedApp.lookupByUUID(cmbGrpList.value);
	if(!selectedGrp) return;

	util.Control.getAllUiControl(app, selectedGrp, [selectedGrp]).filter(function(each){
		return each.type === "container" || each.type === "grid";
	}).forEach(function(each){
	    if(each.type === "container"){
	    	var bindInfo = each.getBindContext();
	        bindInfo ? dsList.push(bindInfo["grid"].dataSet) : ""
	    }
	    else{
	        dsList.push(each.dataSet);
	    }
	});
	
	_.uniq(dsList).forEach(function(each){
		filterCondition += "value == '" + each.uuid + "'||"
	});

	app.lookup("cmbDataList").setFilter(filterCondition + "value ==''");
}

var GridLayoutBuilder = function(){
	var gridCols = [];
	var gridHeaders = [];
	var detailCols = [];
	
	gridCols.push({width :"30px"});
	gridHeaders.push({
		constraint : {  rowIndex: 0, colIndex: 0, rowSpan: 1, colSpan: 1 }, 
		configurator : function(cell){
			cell.text = "F";
			cell.visible = true;
		}
	});
	detailCols.push({
		constraint : {  rowIndex: 0, colIndex: 0, rowSpan: 1, colSpan: 1 }, 
		configurator : function(cell){
			cell.columnName = "";
			cell.control = new cpr.controls.Output();
		}
		
	});
	
	var buildDataSet = function(dataControl){
		var columnNames;
		var dsDataStatus = new cpr.data.DataSet("dsDataStatus");

		if(dataControl instanceof cpr.data.DataSet || dataControl instanceof cpr.data.DataView){
			columnNames = dataControl.getColumnNames();
			
			columnNames.forEach(function(each){
				dsDataStatus.addColumn(new cpr.data.header.DataHeader(each, cpr.data.tabledata.DataType.STRING));
			});
			
			dataControl.forEachOfUnfilteredRows(function(each){
				dsDataStatus.addRowData(each.getRowData()).setState(each.getState());
			});
		}
		else if(dataControl instanceof cpr.data.DataMap){
			columnNames = ["KEY", "VALUE"];
			columnNames.forEach(function(each){
				dsDataStatus.addColumn(new cpr.data.header.DataHeader(each, cpr.data.tabledata.DataType.STRING));
			});
			dataControl.getColumnNames().forEach(function(each){
				var row = dsDataStatus.addRow();
				row.setValue("KEY", each);
				row.setValue("VALUE", dataControl.getValue(each)); 
				row.setState(cpr.data.tabledata.RowState.UNCHANGED);
			});
		}
		return dsDataStatus;
	}
	
	this.build = function(dataControl){
		var grd1 = app.lookup("grd1");
		var dsDataStatus = buildDataSet(dataControl);
		var pks = (dataControl.info || " ").split(",")
		
		dsDataStatus.getColumnNames().forEach(function(each, index){
			gridCols.push({width :"180px"});
			gridHeaders.push({ 
				constraint : {  rowIndex: 0, colIndex: index+1, rowSpan: 1, colSpan: 1 }, 
				configurator : function(cell){
					cell.text = _.contains(pks, each) ? each + "(PK)" : each;
					cell.visible = true;
				}
			});
				
			detailCols.push({
				constraint : {  rowIndex: 0, colIndex: index+1, rowSpan: 1, colSpan: 1 }, 
				configurator : function(cell){
					cell.columnName = each
				}
					
			});
		});
			
		grd1.init({
			dataSet: dsDataStatus,
			columns : gridCols,
			header : {
				rows : [{height:"24px"}],
				cells : gridHeaders
			},
			detail : {
				rows : [{height:"24px"}],
				cells : detailCols
			}
		});
		grd1.autoFit = "all";
		grd1.resizableColumns = "all"
	}
}




