/*
 * App URI: app/com/main/ExmMain
 * Source Location: app/com/main/ExmMain.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/com/main/ExmMain", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsAllMenu");
			dataSet_1.parseData({
				"sortCondition": "",
				"filterCondition": "",
				"columns": [
					{"name": "MENU_ID"},
					{"name": "MENU_NM"},
					{"name": "UP_MENU_ID"},
					{"name": "TOP_MENU_ID"},
					{"name": "CALL_PAGE"},
					{"name": "PGM_ID"},
					{"name": "ICON"},
					{"name": "MENU_KEY"},
					{"name": "MOBILE_YN"},
					{"name": "ROOT_MENU_ID"},
					{"name": "MENU_LVL"},
					{"name": "UP_MENU_NM"},
					{"name": "DESC"}
				]
			});
			(function(dataSet){
				var dataView_1 = new cpr.data.DataView("dvExmMenu", dataSet);
				dataView_1.parseData({});
				app.register(dataView_1);
				var dataView_2 = new cpr.data.DataView("dvModuleMenu", dataSet);
				dataView_2.parseData({});
				app.register(dataView_2);
				var dataView_3 = new cpr.data.DataView("dvTemplateMenu", dataSet);
				dataView_3.parseData({});
				app.register(dataView_3);
			})(dataSet_1);
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("subOnLoad");
			submission_1.method = "get";
			submission_1.action = "app/exam/data/main/main.json";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1320px)", "eXFrame");
			app.supportMedia("all and (min-width: 1020px) and (max-width: 1319px)", "default");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["1fr", "1fr"]);
			container.setLayout(formLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grpData");
			// Layout
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.topMargin = "5px";
			formLayout_2.rightMargin = "5px";
			formLayout_2.bottomMargin = "5px";
			formLayout_2.leftMargin = "5px";
			formLayout_2.horizontalSpacing = "5px";
			formLayout_2.verticalSpacing = "5px";
			formLayout_2.setColumns(["1fr"]);
			formLayout_2.setRows(["25px", "1fr"]);
			group_1.setLayout(formLayout_2);
			(function(container){
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.comTitle("comtitle3");
				container.addChild(userDefinedControl_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMain3");
				grid_1.fieldLabel = "예제샘플 목록";
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("dvExmMenu"),
					"autoRowHeight": "all",
					"autoFit": "3",
					"suppressedCellType": "merged",
					"columns": [
						{"width": "50px"},
						{"width": "100px"},
						{"width": "250px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.targetColumnName = "MENU_NM";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "메뉴명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "설명";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "MENU_NM";
									cell.control = (function(){
										var output_1 = new cpr.controls.Output();
										output_1.value = "Output";
										output_1.bind("value").toDataColumn("MENU_NM");
										return output_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "UP_MENU_NM";
									cell.suppressible = true;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "DESC";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output();
										output_2.value = "Output";
										output_2.bind("tooltip").toDataColumn("DESC");
										output_2.bind("value").toDataColumn("DESC");
										return output_2;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdMainRowDblclick == "function") {
					grid_1.addEventListener("dblclick", onGrdMainRowDblclick);
				}
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"colIndex": 0,
				"rowIndex": 0
			});
			
			var group_2 = new cpr.controls.Container("grpData2");
			// Layout
			var formLayout_3 = new cpr.controls.layouts.FormLayout();
			formLayout_3.topMargin = "5px";
			formLayout_3.rightMargin = "5px";
			formLayout_3.bottomMargin = "5px";
			formLayout_3.leftMargin = "5px";
			formLayout_3.horizontalSpacing = "5px";
			formLayout_3.verticalSpacing = "5px";
			formLayout_3.setColumns(["1fr"]);
			formLayout_3.setRows(["25px", "1fr"]);
			group_2.setLayout(formLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle("comtitle2");
				container.addChild(userDefinedControl_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grdMain2");
				grid_2.fieldLabel = "모듈샘플 목록";
				grid_2.readOnly = true;
				grid_2.init({
					"dataSet": app.lookup("dvModuleMenu"),
					"autoFit": "3",
					"suppressedCellType": "merged",
					"columns": [
						{"width": "50px"},
						{"width": "100px"},
						{"width": "250px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.targetColumnName = "MENU_NM";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "메뉴명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "설명";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "MENU_NM";
									cell.control = (function(){
										var output_3 = new cpr.controls.Output();
										output_3.value = "Output";
										output_3.bind("value").toDataColumn("MENU_NM");
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "UP_MENU_NM";
									cell.suppressible = true;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "DESC";
									cell.style.css({
										"text-align" : "left"
									});
									cell.control = (function(){
										var output_4 = new cpr.controls.Output();
										output_4.value = "Output";
										output_4.bind("value").toDataColumn("DESC");
										return output_4;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdMainRowDblclick == "function") {
					grid_2.addEventListener("dblclick", onGrdMainRowDblclick);
				}
				container.addChild(grid_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"colIndex": 1,
				"rowIndex": 0,
				"colSpan": 1,
				"rowSpan": 2
			});
			
			var group_3 = new cpr.controls.Container("grpData3");
			// Layout
			var formLayout_4 = new cpr.controls.layouts.FormLayout();
			formLayout_4.topMargin = "5px";
			formLayout_4.rightMargin = "5px";
			formLayout_4.bottomMargin = "5px";
			formLayout_4.leftMargin = "5px";
			formLayout_4.horizontalSpacing = "5px";
			formLayout_4.verticalSpacing = "5px";
			formLayout_4.setColumns(["1fr"]);
			formLayout_4.setRows(["25px", "1fr"]);
			group_3.setLayout(formLayout_4);
			(function(container){
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle("comtitle4");
				container.addChild(userDefinedControl_3, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_3 = linker.grid_3 = new cpr.controls.Grid("grdMain4");
				grid_3.fieldLabel = "유형별 화면패턴";
				grid_3.readOnly = true;
				grid_3.init({
					"dataSet": app.lookup("dvTemplateMenu"),
					"autoFit": "3",
					"suppressedCellType": "merged",
					"columns": [
						{"width": "50px"},
						{"width": "100px"},
						{"width": "250px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.targetColumnName = "MENU_NM";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "메뉴명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "설명";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "MENU_NM";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output();
										output_5.value = "Output";
										output_5.bind("value").toDataColumn("MENU_NM");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "UP_MENU_NM";
									cell.suppressible = true;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "DESC";
									cell.control = (function(){
										var output_6 = new cpr.controls.Output();
										output_6.value = "Output";
										output_6.bind("value").toDataColumn("DESC");
										return output_6;
									})();
								}
							}
						]
					}
				});
				if(typeof onGrdMainRowDblclick == "function") {
					grid_3.addEventListener("dblclick", onGrdMainRowDblclick);
				}
				container.addChild(grid_3, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_3);
			container.addChild(group_3, {
				"colIndex": 0,
				"rowIndex": 1
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.ctrl = linker.grid_1;
			linker.userDefinedControl_2.ctrl = linker.grid_2;
			linker.userDefinedControl_3.ctrl = linker.grid_3;
		}
	});
	app.title = "ExmMain";
	cpr.core.Platform.INSTANCE.register(app);
})();
