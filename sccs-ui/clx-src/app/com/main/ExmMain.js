/************************************************
 * ExmMain.js
 * Created at 2021. 10. 1. 오전 11:35:46.
 *
 * @author kjh
 ************************************************/
var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(){
		
		app.lookup("dsAllMenu").forEachOfUnfilteredRows(function(each){
			each.setValue("ROOT_MENU_ID", MenuManager.getRootMenu(each.getString("MENU_ID")));
			each.setValue("UP_MENU_NM", MenuManager.getMenuNm(each.getString("UP_MENU_ID")));
		});
		
		app.lookup("dvExmMenu").setFilter("ROOT_MENU_ID == 'LEVEL01-01' && CALL_PAGE != ''");
		app.lookup("dvModuleMenu").setFilter("ROOT_MENU_ID == 'LEVEL01-03' && CALL_PAGE != ''");
		app.lookup("dvTemplateMenu").setFilter("ROOT_MENU_ID == 'LEVEL01-02' && CALL_PAGE != ''");
		
		app.lookup("dsAllMenu").setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
		
		app.lookup("comtitle3").rowCount = app.lookup("dvExmMenu").getRowCount();
		app.lookup("comtitle2").rowCount = app.lookup("dvModuleMenu").getRowCount();
		app.lookup("comtitle4").rowCount = app.lookup("dvTemplateMenu").getRowCount();
		
		app.getContainer().redraw();
	})
}



/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdMainRowDblclick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	
//	var vcMdiCn = app.getRootAppInstance().lookup("mdiCn");
//	
//	if (vcMdiCn == null){
//		return;
//	}
//	
//	var vsCallPage = util.Grid.getCellValue(app, e.control.id, "CALL_PAGE");
//	var vsMenuId = util.Grid.getCellValue(app, e.control.id, "MENU_ID");
//	var vsMenuNm= util.Grid.getCellValue(app, e.control.id, "MENU_NM");
//	
//	var vaCallPgm = vsCallPage.toString().split("/");
//	var vsPgm = vaCallPgm[vaCallPgm.length-1];
//	var vsPgmId = vsPgm.substr(0, vsPgm.length-4);
//	var vsAppId = vsCallPage.replace(".clx", "");
//	
//	var voAlreadyOpenedItem = vcMdiCn.findItemWithAppID(vsAppId);
//	if (voAlreadyOpenedItem != null){
//		vcMdiCn.setSelectedTabItem(voAlreadyOpenedItem);
//		return;
//	}
//	
//	vcMdiCn.addItemWithApp(vsAppId, true, function(item) {
//		/** @type cpr.controls.Output */
//		item.text = vsMenuNm;
//		item.tooltip = vsMenuNm;
//		item.closable = true;
//	});
	
	var vcMdiCn = app.getRootAppInstance().lookup("mdiCn");
	
	var vsCallPage = util.Grid.getCellValue(app, e.control.id, "CALL_PAGE");
	var vsMenuId = util.Grid.getCellValue(app, e.control.id, "MENU_ID");
	
	var vaCallPgm = vsCallPage.toString().split("/");
	var vsPgm = vaCallPgm[vaCallPgm.length-1];
	var vsPgmId = vsPgm.substr(0, vsPgm.length-4);
	
	var mainRoot = util.getMainApp(app);
	
	if(mainRoot.hasAppMethod("isExistTabItem")){
		var vbIsExistTabItem = mainRoot.callAppMethod("isExistTabItem", vsCallPage.substr(0, vsCallPage.length-4), vsPgmId);
		// 화면이 존재하면 화면을 닫고, 새로 오픈한다.
//		if (vbIsExistTabItem) vcMdiCn.removeTabItem(vcMdiCn.getSelectedTabItem());
		
		if(mainRoot.hasAppMethod("doSetMenuNaviPath")){
			mainRoot.callAppMethod("doSetMenuNaviPath", vsMenuId);
		}
		if(mainRoot.hasAppMethod("doOpenMenuToMdi")){
			mainRoot.callAppMethod("doOpenMenuToMdi", vsMenuId);
		}
	}
	
	
	if (!ValueUtil.isNull(vsCallPage) && window.eb6Preview){
		window.eb6Preview.openAppEditor(vsCallPage.split(".clx")[0]);
	}
}

/*****************************************************************
* private 영역입니다.
******************************************************************/

var MenuManager = {
	
	/**
	 * 메뉴의 이름을 반환합니다
	 * @param {String} menuKey 메뉴ID
	 * @return {String}
	 */
	getMenuNm : function(menuKey){
		var row = app.lookup("dsAllMenu").findFirstRow("MENU_ID == '" + menuKey + "'");
		return menuKey && row.getString("MENU_NM")
	},
	
	
	/**
	 * 최상위 메뉴ID를 반환합니다.
	 * @param {String} menuKey 메뉴ID
	 * @return {String}
	 */
	getRootMenu : function(menuKey){
		var menuData = app.lookup("dsAllMenu");
		var row = menuData.findFirstRow("MENU_ID =='" + menuKey + "'");
		var result;
		var parentRow = menuData.findFirstRow("MENU_ID =='" + row.getString("UP_MENU_ID") + "'");
		if(!parentRow){
			return row.getString("MENU_ID");
		}
		
		while(parentRow && parentRow.getString("UP_MENU_ID")){
			parentRow = menuData.findFirstRow("MENU_ID =='" + parentRow.getString("UP_MENU_ID") + "'")
			result = parentRow.getString("MENU_ID");
		}
		
		return result;
	}
}
