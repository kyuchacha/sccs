/*
 * App URI: app/system/PUI_CM_041_01-02
 * Source Location: app/system/PUI_CM_041_01-02.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/system/PUI_CM_041_01-02", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * PUI_CM_041_01-02.js
			 * Created at 2022. 3. 31. 오후 4:17:05.
			 *
			 * @author ksk19
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "column1",
						"dataType": "string"
					},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"}
				],
				"rows": [
					{"column1": "100", "column2": "홍수경보 시스템", "column3": "/", "column4": "홍수예경보시스템", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100", "column2": "기본정보관리", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100100", "column2": "수위조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리>수위조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100200", "column2": "방조제 계측정보 관리", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리>발령 정보 조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100300", "column2": "발령내역 조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>방조제유지개발>환경설정>방조제 계측", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100400", "column2": "오류정보 조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리>발령내역 조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100500", "column2": "기상자료 조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리>오류정보 조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100100600", "column2": "자료조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>기본정보관리>기상자료 조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100200", "column2": "자료조회", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>자료조회", "column5": "홍길동", "column6": "2021-10-22"},
					{"column1": "100200100", "column2": "기상자료 통계", "column3": "/fw/aaa.do", "column4": "홍수예경보시스템>자료조회>기상자료통계", "column5": "홍길동", "column6": "2021-10-22"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsMenu");
			dataSet_2.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"},
					{"name": "parent"},
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{
						"name": "column10",
						"dataType": "string"
					}
				],
				"rows": [
					{"label": "방조제유지개발", "value": "value1", "parent": "", "column3": "", "column2": "", "column1": "", "column4": "", "column5": "", "column6": "", "column7": "", "column8": "", "column9": ""},
					{"label": "환경설정", "value": "value2", "parent": "value1", "column3": "", "column2": "", "column1": "", "column4": "", "column5": "", "column6": "", "column7": "", "column8": "", "column9": "", "column10": ""},
					{"label": "방조제 계측정보 관리", "value": "value3", "parent": "value2", "column1": "200100", "column2": "11001103", "column3": "방조제 계측정보 관리", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "3", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": "value1,value2"},
					{"label": "방조제 모니터링", "value": "value4", "parent": "value2", "column3": "방조제 모니터링", "column2": "11001104", "column1": "200200", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "4", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": ""},
					{"label": "홍수예경보시스템", "value": "value5", "parent": "", "column3": "", "column2": "", "column1": "", "column4": "", "column5": "", "column6": "", "column7": "", "column8": "", "column9": ""},
					{"label": "기본정보관리", "value": "value6", "parent": "value5", "column3": "", "column2": "", "column1": "", "column4": "", "column5": "", "column6": "", "column7": "", "column8": "", "column9": ""},
					{"label": "자료관리", "value": "value7", "parent": "value5", "column3": "자료관리", "column2": "11001107", "column1": "300200", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "7", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": "value1,value2"},
					{"label": "환경설정", "value": "value8", "parent": "value5", "column3": "환경설정", "column2": "11001108", "column1": "300300", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "8", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": ""},
					{"label": "통합관제", "value": "value9", "parent": "", "column3": "", "column2": "", "column1": "", "column4": "", "column5": "", "column6": "", "column7": "", "column8": "", "column9": ""},
					{"label": "배수갑문현황", "value": "value10", "parent": "value9", "column3": "배수갑문현황", "column2": "11001110", "column1": "400100", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "10", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": "value1,value2"},
					{"label": "도로안정 현황", "value": "value11", "parent": "value9", "column3": "도로안정 현황", "column2": "11001111", "column1": "400200", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "11", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": ""},
					{"label": "기본정보관리", "value": "value13", "parent": "value6", "column3": "기본정보관리", "column2": "11001112", "column1": "400300", "column4": "/cm/menu/selectMenuList.do", "column5": "표시", "column6": "12", "column7": "신청", "column8": "2022-02-01 11:00:00", "column9": "2022-02-01 11:00:00", "column10": "value1,value3"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("ds2");
			dataSet_3.parseData({
				"columns": [{"name": "column1"}],
				"rows": [
					{"column1": "표시"},
					{"column1": "미표시"}
				]
			});
			app.register(dataSet_3);
			
			app.supportMedia("all and (min-width: 1320px)", "eXFrame");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1319px)", "default");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grpHeader");
			group_1.style.setClasses(["header-box"]);
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 0;
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader");
				container.addChild(userDefinedControl_1, {
					"autoSize": "none",
					"width": "1320px",
					"height": "30px"
				});
				var group_2 = new cpr.controls.Container("grpSearch");
				group_2.userAttr({
					"mobile-column-count": "2",
					"tablet-column-count": "2"
				});
				group_2.style.setClasses(["search-box"]);
				// Layout
				var formLayout_1 = new cpr.controls.layouts.FormLayout();
				formLayout_1.topMargin = "5px";
				formLayout_1.rightMargin = "5px";
				formLayout_1.bottomMargin = "5px";
				formLayout_1.leftMargin = "5px";
				formLayout_1.setColumns(["120px", "200px", "120px", "200px", "1fr", "60px"]);
				formLayout_1.setRows(["25px", "25px"]);
				formLayout_1.setRowAutoSizing(0, true);
				formLayout_1.setRowAutoSizing(1, true);
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "단위 시스템";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var comboBox_1 = new cpr.controls.ComboBox("cmb1");
					(function(comboBox_1){
					})(comboBox_1);
					container.addChild(comboBox_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "신청상태";
					if(typeof onOutputValueChange == "function") {
						output_2.addEventListener("value-change", onOutputValueChange);
					}
					container.addChild(output_2, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var comboBox_2 = new cpr.controls.ComboBox("cmb2");
					(function(comboBox_2){
						comboBox_2.addItem(new cpr.controls.Item("신청", "value1"));
						comboBox_2.addItem(new cpr.controls.Item("승인", "value2"));
						comboBox_2.addItem(new cpr.controls.Item("거절", "value3"));
					})(comboBox_2);
					container.addChild(comboBox_2, {
						"colIndex": 3,
						"rowIndex": 0
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "메뉴명";
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var inputBox_1 = new cpr.controls.InputBox("ipb1");
					container.addChild(inputBox_1, {
						"colIndex": 1,
						"rowIndex": 1,
						"colSpan": 3,
						"rowSpan": 1
					});
					var group_3 = new cpr.controls.Container("grp4");
					// Layout
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.setColumns(["3fr", "60px"]);
					formLayout_2.setRows(["25px"]);
					group_3.setLayout(formLayout_2);
					(function(container){
						var userDefinedControl_2 = new udc.com.comBtnSearch("combtnsearch1");
						container.addChild(userDefinedControl_2, {
							"colIndex": 1,
							"rowIndex": 0,
							"horizontalAlign": "right",
							"verticalAlign": "fill",
							"width": 60
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 4,
						"rowIndex": 1,
						"colSpan": 2,
						"rowSpan": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"autoSize": "height",
					"width": "1320px",
					"height": "74px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "1320px",
				"height": "100px"
			});
			
			var group_4 = new cpr.controls.Container("grpData");
			group_4.userAttr({
				"mobile-column-count": "1",
				"tablet-column-count": "1"
			});
			// Layout
			var formLayout_3 = new cpr.controls.layouts.FormLayout();
			formLayout_3.userResizingMode = "standard";
			formLayout_3.horizontalSpacing = "5px";
			formLayout_3.verticalSpacing = "5px";
			formLayout_3.setColumns(["1fr"]);
			formLayout_3.setRows(["1fr", "466px"]);
			formLayout_3.setRowAutoSizing(1, true);
			group_4.setLayout(formLayout_3);
			(function(container){
				var group_5 = new cpr.controls.Container("grp1");
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.scrollable = false;
				formLayout_4.setColumns(["1fr"]);
				formLayout_4.setRows(["25px", "1fr"]);
				group_5.setLayout(formLayout_4);
				(function(container){
					var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMain");
					grid_1.fieldLabel = "메뉴 신청 목록";
					grid_1.init({
						"dataSet": app.lookup("ds1"),
						"columns": [
							{"width": "50px"},
							{"width": "100px"},
							{"width": "140px"},
							{"width": "100px"},
							{"width": "342px"},
							{"width": "100px"},
							{"width": "100px"}
						],
						"header": {
							"rows": [{"height": "27px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.targetColumnName = "column1";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "메뉴코드";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.targetColumnName = "column2";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "메뉴명";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.targetColumnName = "column3";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "메뉴 URL";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.targetColumnName = "column4";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "메뉴 경로";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.targetColumnName = "column5";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "신청자";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.targetColumnName = "column6";
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "신청일자";
									}
								}
							]
						},
						"detail": {
							"rows": [{"height": "25px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.columnType = "rowindex";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.columnName = "column1";
										cell.control = (function(){
											var output_4 = new cpr.controls.Output();
											output_4.value = "Output";
											output_4.bind("value").toDataColumn("column1");
											return output_4;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.columnName = "column2";
										cell.control = (function(){
											var output_5 = new cpr.controls.Output();
											output_5.value = "Output";
											output_5.bind("value").toDataColumn("column2");
											return output_5;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.columnName = "column3";
										cell.control = (function(){
											var output_6 = new cpr.controls.Output();
											output_6.value = "Output";
											output_6.bind("value").toDataColumn("column3");
											return output_6;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.columnName = "column4";
										cell.control = (function(){
											var output_7 = new cpr.controls.Output();
											output_7.value = "Output";
											output_7.bind("value").toDataColumn("column4");
											return output_7;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.columnName = "column5";
										cell.control = (function(){
											var output_8 = new cpr.controls.Output();
											output_8.value = "Output";
											output_8.bind("value").toDataColumn("column5");
											return output_8;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.columnName = "column6";
										cell.control = (function(){
											var output_9 = new cpr.controls.Output();
											output_9.value = "Output";
											output_9.style.setClasses(["text-center"]);
											output_9.bind("value").toDataColumn("column6");
											return output_9;
										})();
										cell.controlConstraint = {};
									}
								}
							]
						}
					});
					container.addChild(grid_1, {
						"colIndex": 0,
						"rowIndex": 1,
						"colSpan": 1,
						"rowSpan": 1,
						"horizontalAlign": "fill",
						"verticalAlign": "fill"
					});
					var group_6 = new cpr.controls.Container("grp5");
					// Layout
					var formLayout_5 = new cpr.controls.layouts.FormLayout();
					formLayout_5.setColumns(["1fr", "100px"]);
					formLayout_5.setRows(["25px"]);
					group_6.setLayout(formLayout_5);
					(function(container){
						var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle("comtitle1");
						container.addChild(userDefinedControl_3, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var button_1 = new cpr.controls.Button("btn1");
						button_1.value = "메뉴등록 신청";
						button_1.style.setClasses(["btn-primary"]);
						container.addChild(button_1, {
							"colIndex": 1,
							"rowIndex": 0
						});
					})(group_6);
					container.addChild(group_6, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_7 = new cpr.controls.Container("grpData2");
				group_7.userAttr({
					"mobile-column-count": "1",
					"tablet-column-count": "1"
				});
				// Layout
				var formLayout_6 = new cpr.controls.layouts.FormLayout();
				formLayout_6.userResizingMode = "standard";
				formLayout_6.setColumns(["1fr", "2fr"]);
				formLayout_6.setRows(["1fr"]);
				group_7.setLayout(formLayout_6);
				(function(container){
					var group_8 = new cpr.controls.Container("grp2");
					// Layout
					var formLayout_7 = new cpr.controls.layouts.FormLayout();
					formLayout_7.horizontalSpacing = "5px";
					formLayout_7.verticalSpacing = "5px";
					formLayout_7.setColumns(["1fr"]);
					formLayout_7.setRows(["25px", "1fr"]);
					group_8.setLayout(formLayout_7);
					(function(container){
						var userDefinedControl_4 = new udc.com.comFormTitle("comformtitle2");
						userDefinedControl_4.title = "메뉴 목록";
						container.addChild(userDefinedControl_4, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var tree_1 = linker.tree_1 = new cpr.controls.Tree("tre1");
						tree_1.fieldLabel = "부서정보";
						tree_1.showLines = true;
						(function(tree_1){
							tree_1.setItemSet(app.lookup("dsMenu"), {
								"label": "label",
								"value": "value",
								"parentValue": "parent"
							});
						})(tree_1);
						container.addChild(tree_1, {
							"colIndex": 0,
							"rowIndex": 1
						});
					})(group_8);
					container.addChild(group_8, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var group_9 = new cpr.controls.Container("grp3");
					group_9.userAttr({"needs-auto-height": "true"});
					// Layout
					var formLayout_8 = new cpr.controls.layouts.FormLayout();
					formLayout_8.setColumns(["1fr"]);
					formLayout_8.setRows(["25px", "1fr"]);
					group_9.setLayout(formLayout_8);
					(function(container){
						var group_10 = new cpr.controls.Container("grp6");
						// Layout
						var formLayout_9 = new cpr.controls.layouts.FormLayout();
						formLayout_9.setColumns(["1fr", "115px", "125px"]);
						formLayout_9.setColumnAutoSizing(1, true);
						formLayout_9.setColumnAutoSizing(2, true);
						formLayout_9.setRows(["25px"]);
						group_10.setLayout(formLayout_9);
						(function(container){
							var userDefinedControl_5 = new udc.com.comFormTitle("comformtitle1");
							userDefinedControl_5.title = "메뉴 상세 정보";
							container.addChild(userDefinedControl_5, {
								"colIndex": 0,
								"rowIndex": 0,
								"colSpan": 1,
								"rowSpan": 1
							});
							var userDefinedControl_6 = linker.userDefinedControl_6 = new udc.com.comButton("combutton1");
							userDefinedControl_6.focusColumnName = "EMPNO";
							userDefinedControl_6.visibleRestoreButton = false;
							userDefinedControl_6.visibleNewButton = false;
							container.addChild(userDefinedControl_6, {
								"colIndex": 2,
								"rowIndex": 0,
								"horizontalAlign": "fill",
								"verticalAlign": "fill"
							});
							var button_2 = new cpr.controls.Button("btnNew");
							button_2.value = "하위메뉴 등록";
							button_2.style.setClasses(["btn-new"]);
							container.addChild(button_2, {
								"colIndex": 1,
								"rowIndex": 0
							});
						})(group_10);
						container.addChild(group_10, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var group_11 = linker.group_11 = new cpr.controls.Container("frfMain");
						group_11.fieldLabel = "사원정보";
						group_11.userAttr({
							"mobile-column-count": "",
							"tablet-column-count": ""
						});
						group_11.style.setClasses(["form-box"]);
						// Layout
						var formLayout_10 = new cpr.controls.layouts.FormLayout();
						formLayout_10.topMargin = "5px";
						formLayout_10.rightMargin = "5px";
						formLayout_10.bottomMargin = "5px";
						formLayout_10.leftMargin = "5px";
						formLayout_10.setColumns(["120px", "1fr"]);
						formLayout_10.setRows(["25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "154px"]);
						formLayout_10.setRowAutoSizing(9, true);
						group_11.setLayout(formLayout_10);
						(function(container){
							var output_10 = new cpr.controls.Output("opt2");
							output_10.value = "상위메뉴코드";
							output_10.style.setClasses(["require"]);
							container.addChild(output_10, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var inputBox_2 = new cpr.controls.InputBox("ipb2");
							inputBox_2.bind("value").toDataColumn("column1");
							container.addChild(inputBox_2, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var output_11 = new cpr.controls.Output();
							output_11.value = "메뉴코드";
							output_11.style.setClasses(["require"]);
							container.addChild(output_11, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var inputBox_3 = new cpr.controls.InputBox("ipb3");
							inputBox_3.bind("value").toDataColumn("column2");
							container.addChild(inputBox_3, {
								"colIndex": 1,
								"rowIndex": 1
							});
							var output_12 = new cpr.controls.Output();
							output_12.value = "메뉴명";
							output_12.style.setClasses(["require"]);
							container.addChild(output_12, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var inputBox_4 = new cpr.controls.InputBox("ipb4");
							inputBox_4.bind("value").toDataColumn("column3");
							container.addChild(inputBox_4, {
								"colIndex": 1,
								"rowIndex": 2
							});
							var output_13 = new cpr.controls.Output();
							output_13.value = "메뉴URL";
							output_13.style.setClasses(["require"]);
							container.addChild(output_13, {
								"colIndex": 0,
								"rowIndex": 3
							});
							var inputBox_5 = new cpr.controls.InputBox("ipb5");
							inputBox_5.bind("value").toDataColumn("column4");
							container.addChild(inputBox_5, {
								"colIndex": 1,
								"rowIndex": 3
							});
							var output_14 = new cpr.controls.Output();
							output_14.value = "메뉴표시여부";
							output_14.style.setClasses(["require"]);
							container.addChild(output_14, {
								"colIndex": 0,
								"rowIndex": 4
							});
							var comboBox_3 = new cpr.controls.ComboBox("cmb3");
							comboBox_3.bind("value").toDataColumn("column5");
							(function(comboBox_3){
							})(comboBox_3);
							container.addChild(comboBox_3, {
								"colIndex": 1,
								"rowIndex": 4
							});
							var output_15 = new cpr.controls.Output();
							output_15.value = "순서\r\n";
							container.addChild(output_15, {
								"colIndex": 0,
								"rowIndex": 5
							});
							var inputBox_6 = new cpr.controls.InputBox("ipb6");
							inputBox_6.bind("value").toDataColumn("column6");
							container.addChild(inputBox_6, {
								"colIndex": 1,
								"rowIndex": 5
							});
							var output_16 = new cpr.controls.Output("opt4");
							output_16.value = "신청상태";
							output_16.style.setClasses(["require"]);
							container.addChild(output_16, {
								"colIndex": 0,
								"rowIndex": 6
							});
							var comboBox_4 = new cpr.controls.ComboBox("cmb4");
							comboBox_4.bind("value").toDataColumn("column7");
							(function(comboBox_4){
							})(comboBox_4);
							container.addChild(comboBox_4, {
								"colIndex": 1,
								"rowIndex": 6
							});
							var output_17 = new cpr.controls.Output();
							output_17.value = "신청일시";
							container.addChild(output_17, {
								"colIndex": 0,
								"rowIndex": 7
							});
							var dateInput_1 = new cpr.controls.DateInput("dti3");
							dateInput_1.enabled = false;
							dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
							dateInput_1.bind("value").toDataColumn("column8");
							container.addChild(dateInput_1, {
								"colIndex": 1,
								"rowIndex": 7
							});
							var output_18 = new cpr.controls.Output();
							output_18.value = "승인일시";
							container.addChild(output_18, {
								"colIndex": 0,
								"rowIndex": 8
							});
							var dateInput_2 = new cpr.controls.DateInput("dti2");
							dateInput_2.enabled = false;
							dateInput_2.mask = "YYYY-MM-DD HH:mm:ss";
							dateInput_2.bind("value").toDataColumn("column9");
							container.addChild(dateInput_2, {
								"colIndex": 1,
								"rowIndex": 8
							});
							var output_19 = new cpr.controls.Output();
							output_19.value = "그룹권한";
							container.addChild(output_19, {
								"colIndex": 0,
								"rowIndex": 9
							});
							var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg1");
							checkBoxGroup_1.colCount = 1;
							checkBoxGroup_1.verticalSpacing = 6;
							checkBoxGroup_1.style.setClasses(["align-top"]);
							checkBoxGroup_1.bind("value").toDataColumn("column10");
							(function(checkBoxGroup_1){
								checkBoxGroup_1.addItem(new cpr.controls.Item("관리자", "value1"));
								checkBoxGroup_1.addItem(new cpr.controls.Item("신시 상황실", "value2"));
								checkBoxGroup_1.addItem(new cpr.controls.Item("가력 상황실", "value3"));
								checkBoxGroup_1.addItem(new cpr.controls.Item("시설 운영부", "value4"));
								checkBoxGroup_1.addItem(new cpr.controls.Item("유지 관리부", "value5"));
							})(checkBoxGroup_1);
							container.addChild(checkBoxGroup_1, {
								"colIndex": 1,
								"rowIndex": 9
							});
						})(group_11);
						container.addChild(group_11, {
							"colIndex": 0,
							"rowIndex": 1,
							"height": 436
						});
					})(group_9);
					container.addChild(group_9, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_7);
				container.addChild(group_7, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_4);
			container.addChild(group_4, {
				"autoSize": "none",
				"width": "1320px",
				"height": "840px"
			});
			// Linking
			linker.userDefinedControl_3.ctrl = linker.grid_1;
			linker.userDefinedControl_6.grid = linker.grid_1;
			linker.group_11.setBindContext(new cpr.bind.ItemSelectionContext(linker.tree_1));
		}
	});
	app.title = "메뉴 등록 신청 목록";
	cpr.core.Platform.INSTANCE.register(app);
})();
