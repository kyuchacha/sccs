/*
 * App URI: app/system/PUI_CM_111_01-01
 * Source Location: app/system/PUI_CM_111_01-01.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/system/PUI_CM_111_01-01", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * PUI_CM_111_01-01.js
			 * Created at 2022. 3. 31. 오후 4:42:25.
			 *
			 * @author "nhyu"
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"}
				],
				"rows": [
					{"column1": "SMS001", "column2": "홍수예경보시스템", "column3": "비밀번호 초기화", "column4": "홍길동 회원님 비밀번호 초기화 요청\u2026", "column5": "@{userNm} 회원님 비밀번호 초기화 요청\u2026"},
					{"column1": "SMS002", "column2": "홍수예경보시스템", "column3": "탈퇴요청", "column4": "홍길동 회원님 회원탈퇴 요청을 \u2026", "column5": "@{userNm} 회원님 회원탈퇴 요청을 \u2026"},
					{"column1": "SMS003", "column2": "홍수예경보시스템", "column3": "장애발생", "column4": "홍길동 회원님 비밀번호 초기화 요청\u2026", "column5": "@{userNm} 회원님 비밀번호 초기화 요청\u2026"},
					{"column1": "SMS004", "column2": "홍수예경보시스템", "column3": "정비요청", "column4": "홍길동 회원님 회원탈퇴 요청을 \u2026", "column5": "@{userNm} 회원님 회원탈퇴 요청을 \u2026"},
					{"column1": "SMS005", "column2": "홍수예경보시스템", "column3": "정비확인요청", "column4": "홍길동 회원님 비밀번호 초기화 요청\u2026", "column5": "@{userNm} 회원님 비밀번호 초기화 요청\u2026"},
					{"column1": "SMS006", "column2": "기상정보수집시스템", "column3": "장애발생", "column4": "홍길동 회원님 회원탈퇴 요청을 \u2026", "column5": "@{userNm} 회원님 회원탈퇴 요청을 \u2026"},
					{"column1": "SMS007", "column2": "기상정보수집시스템", "column3": "정비요청", "column4": "홍길동 회원님 비밀번호 초기화 요청\u2026", "column5": "@{userNm} 회원님 비밀번호 초기화 요청\u2026"},
					{"column1": "SMS008", "column2": "기상정보수집시스템", "column3": "정비확인요청", "column4": "홍길동 회원님 회원탈퇴 요청을 \u2026", "column5": "@{userNm} 회원님 회원탈퇴 요청을 \u2026"},
					{"column1": "SMS009", "column2": "통합관제시스템", "column3": "센서등록", "column4": "홍길동 회원님 비밀번호 초기화 요청\u2026", "column5": "@{userNm} 회원님 비밀번호 초기화 요청\u2026"},
					{"column1": "SMS010", "column2": "통합관제시스템", "column3": "정비확인요청", "column4": "홍길동 회원님 회원탈퇴 요청을 \u2026", "column5": "@{userNm} 회원님 회원탈퇴 요청을 \u2026"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns": [{"name": "column1"}],
				"rows": [
					{"column1": "홍수예경보시스템"},
					{"column1": "기상정보수집시스템"},
					{"column1": "통합관제시스템"}
				]
			});
			app.register(dataSet_2);
			
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
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.com.appHeader("appheader");
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
				formLayout_1.setRows(["25px"]);
				formLayout_1.setRowAutoSizing(0, true);
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "단위 시스템";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var comboBox_1 = new cpr.controls.ComboBox();
					(function(comboBox_1){
					})(comboBox_1);
					container.addChild(comboBox_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "알림 제목";
					container.addChild(output_2, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var inputBox_1 = new cpr.controls.InputBox();
					container.addChild(inputBox_1, {
						"colIndex": 3,
						"rowIndex": 0
					});
					var group_3 = new cpr.controls.Container();
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
						"rowIndex": 0,
						"colSpan": 2,
						"rowSpan": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"autoSize": "height",
					"width": "1320px",
					"height": "37px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "760px",
				"height": "67px"
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
			formLayout_3.setRows(["1fr", "375px"]);
			formLayout_3.setRowAutoSizing(1, true);
			group_4.setLayout(formLayout_3);
			(function(container){
				var group_5 = new cpr.controls.Container("grp1");
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.setColumns(["1fr"]);
				formLayout_4.setRows(["25px", "1fr"]);
				group_5.setLayout(formLayout_4);
				(function(container){
					var group_6 = new cpr.controls.Container("grp5");
					// Layout
					var formLayout_5 = new cpr.controls.layouts.FormLayout();
					formLayout_5.setColumns(["1fr", "195px"]);
					formLayout_5.setColumnAutoSizing(1, true);
					formLayout_5.setRows(["25px"]);
					group_6.setLayout(formLayout_5);
					(function(container){
						var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comTitle("comtitle1");
						container.addChild(userDefinedControl_3, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comButton("combutton1");
						userDefinedControl_4.focusColumnName = "EMPNO";
						userDefinedControl_4.visibleRestoreButton = false;
						container.addChild(userDefinedControl_4, {
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
					var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMain");
					grid_1.fieldLabel = "SMS 템플릿 설정 목록";
					grid_1.userAttr({"bindDataFormId": "frfMain"});
					grid_1.init({
						"dataSet": app.lookup("ds1"),
						"autoFit": "3, 4, 5, 6",
						"columns": [
							{"width": "25px"},
							{"width": "25px"},
							{"width": "40px"},
							{
								"width": "100px",
								"visible": true
							},
							{
								"width": "150px",
								"visible": true
							},
							{
								"width": "100px",
								"visible": true
							},
							{
								"width": "300px",
								"visible": true
							}
						],
						"header": {
							"rows": [{"height": "27px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.columnType = "checkbox";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.text = "F";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.text = "No";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.text = "SMS 설정ID";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.text = "단위 시스템";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.text = "SMS 제목";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.text = "SMS 내용 예시";
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
										cell.columnType = "checkbox";
										cell.style.css({
											"text-align" : "center"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.control = (function(){
											var output_3 = new cpr.controls.Output();
											output_3.style.css({
												"text-align" : "center"
											});
											return output_3;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.columnType = "rowindex";
										cell.style.css({
											"text-align" : "center"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
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
									"constraint": {"rowIndex": 0, "colIndex": 4},
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
									"constraint": {"rowIndex": 0, "colIndex": 5},
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
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.columnName = "column4";
										cell.control = (function(){
											var output_7 = new cpr.controls.Output();
											output_7.value = "Output";
											output_7.ellipsis = true;
											output_7.bind("value").toDataColumn("column4");
											return output_7;
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
						"rowSpan": 1
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_7 = new cpr.controls.Container("grp2");
				group_7.userAttr({"needs-auto-height": "true"});
				// Layout
				var formLayout_6 = new cpr.controls.layouts.FormLayout();
				formLayout_6.setColumns(["1fr"]);
				formLayout_6.setRows(["25px", "1fr"]);
				formLayout_6.setRowAutoSizing(0, true);
				group_7.setLayout(formLayout_6);
				(function(container){
					var userDefinedControl_5 = linker.userDefinedControl_5 = new udc.com.comFormTitle("comformtitle1");
					container.addChild(userDefinedControl_5, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var group_8 = linker.group_8 = new cpr.controls.Container("frfMain");
					group_8.fieldLabel = "SMS 설정 템플릿 정보 등록";
					group_8.style.setClasses(["form-box"]);
					// Layout
					var formLayout_7 = new cpr.controls.layouts.FormLayout();
					formLayout_7.topMargin = "5px";
					formLayout_7.rightMargin = "5px";
					formLayout_7.bottomMargin = "5px";
					formLayout_7.leftMargin = "5px";
					formLayout_7.setColumns(["120px", "1fr"]);
					formLayout_7.setRows(["25px", "25px", "25px", "25px", "25px", "25px", "125px", "25px"]);
					formLayout_7.setRowAutoSizing(6, true);
					group_8.setLayout(formLayout_7);
					(function(container){
						var output_8 = new cpr.controls.Output();
						output_8.value = "SMS설정ID";
						output_8.style.setClasses(["label", "require"]);
						container.addChild(output_8, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var group_9 = new cpr.controls.Container("grp4");
						// Layout
						var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
						flowLayout_1.scrollable = false;
						flowLayout_1.horizontalSpacing = 5;
						flowLayout_1.verticalSpacing = 0;
						flowLayout_1.lineWrap = false;
						group_9.setLayout(flowLayout_1);
						(function(container){
							var inputBox_2 = new cpr.controls.InputBox("ipb1");
							inputBox_2.bind("value").toDataColumn("column1");
							container.addChild(inputBox_2, {
								"width": "200px",
								"height": "25px"
							});
							var button_1 = new cpr.controls.Button("btn2");
							button_1.value = "중복 조회";
							button_1.style.setClasses(["btn-gray"]);
							container.addChild(button_1, {
								"autoSize": "none",
								"width": "80px",
								"height": "25px"
							});
						})(group_9);
						container.addChild(group_9, {
							"colIndex": 1,
							"rowIndex": 0
						});
						var output_9 = new cpr.controls.Output();
						output_9.value = "단위시스템";
						output_9.style.setClasses(["label", "require"]);
						container.addChild(output_9, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var comboBox_2 = new cpr.controls.ComboBox("cmb1");
						comboBox_2.preventInput = true;
						comboBox_2.bind("value").toDataColumn("column2");
						(function(comboBox_2){
							comboBox_2.setItemSet(app.lookup("ds2"), {
								"label": "column1",
								"value": "column1"
							});
						})(comboBox_2);
						container.addChild(comboBox_2, {
							"colIndex": 1,
							"rowIndex": 1
						});
						var output_10 = new cpr.controls.Output();
						output_10.value = "SMS 제목";
						output_10.style.setClasses(["label", "require"]);
						container.addChild(output_10, {
							"colIndex": 0,
							"rowIndex": 2
						});
						var inputBox_3 = new cpr.controls.InputBox("ipb2");
						inputBox_3.bind("value").toDataColumn("column3");
						container.addChild(inputBox_3, {
							"colIndex": 1,
							"rowIndex": 2
						});
						var output_11 = new cpr.controls.Output();
						output_11.value = "SMS 내용";
						output_11.style.setClasses(["label", "require"]);
						container.addChild(output_11, {
							"colIndex": 0,
							"rowIndex": 3
						});
						var inputBox_4 = new cpr.controls.InputBox("ipb3");
						inputBox_4.bind("value").toDataColumn("column5");
						container.addChild(inputBox_4, {
							"colIndex": 1,
							"rowIndex": 3
						});
						var output_12 = new cpr.controls.Output();
						output_12.value = "SMS 예시";
						output_12.style.setClasses(["label", "require"]);
						container.addChild(output_12, {
							"colIndex": 0,
							"rowIndex": 4
						});
						var inputBox_5 = new cpr.controls.InputBox("ipb4");
						inputBox_5.bind("value").toDataColumn("column4");
						container.addChild(inputBox_5, {
							"colIndex": 1,
							"rowIndex": 4
						});
						var output_13 = new cpr.controls.Output();
						output_13.value = "전송시점";
						output_13.style.setClasses(["label", "require"]);
						container.addChild(output_13, {
							"colIndex": 0,
							"rowIndex": 5
						});
						var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg2");
						checkBoxGroup_1.colCount = -1;
						checkBoxGroup_1.fixedWidth = false;
						checkBoxGroup_1.horizontalSpacing = 10;
						checkBoxGroup_1.verticalSpacing = 12;
						(function(checkBoxGroup_1){
							checkBoxGroup_1.addItem(new cpr.controls.Item("즉시", "value1"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("당일", "value2"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("1일전", "value3"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("3일전", "value4"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("7일전", "value5"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("14일전", "value6"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("30일전", "value7"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("60일전", "value8"));
						})(checkBoxGroup_1);
						container.addChild(checkBoxGroup_1, {
							"colIndex": 1,
							"rowIndex": 5
						});
						var output_14 = new cpr.controls.Output();
						output_14.value = "SMS 발송\r\n대상 권한";
						output_14.style.setClasses(["label", "require"]);
						container.addChild(output_14, {
							"colIndex": 0,
							"rowIndex": 6,
							"verticalAlign": "fill",
							"height": 50
						});
						var checkBoxGroup_2 = new cpr.controls.CheckBoxGroup("cbg1");
						checkBoxGroup_2.colCount = 1;
						checkBoxGroup_2.fixedWidth = true;
						checkBoxGroup_2.horizontalSpacing = 0;
						checkBoxGroup_2.verticalSpacing = 5;
						checkBoxGroup_2.style.setClasses(["align-top"]);
						(function(checkBoxGroup_2){
							checkBoxGroup_2.addItem(new cpr.controls.Item("관리자", "value1"));
							checkBoxGroup_2.addItem(new cpr.controls.Item("신시 상황실", "value2"));
							checkBoxGroup_2.addItem(new cpr.controls.Item("가력 상황실", "value3"));
							checkBoxGroup_2.addItem(new cpr.controls.Item("시설 운영부", "value4"));
							checkBoxGroup_2.addItem(new cpr.controls.Item("유지 관리부", "value5"));
						})(checkBoxGroup_2);
						container.addChild(checkBoxGroup_2, {
							"colIndex": 1,
							"rowIndex": 6
						});
						var output_15 = new cpr.controls.Output();
						output_15.value = "사용여부";
						output_15.style.setClasses(["label", "require"]);
						container.addChild(output_15, {
							"colIndex": 0,
							"rowIndex": 7
						});
						var group_10 = new cpr.controls.Container("grp3");
						// Layout
						var flowLayout_2 = new cpr.controls.layouts.FlowLayout();
						flowLayout_2.scrollable = false;
						flowLayout_2.horizontalSpacing = 0;
						flowLayout_2.verticalSpacing = 0;
						flowLayout_2.lineWrap = false;
						group_10.setLayout(flowLayout_2);
						(function(container){
							var radioButton_1 = new cpr.controls.RadioButton("rdb1");
							radioButton_1.colCount = -1;
							radioButton_1.fixedWidth = false;
							radioButton_1.horizontalSpacing = 12;
							radioButton_1.verticalSpacing = 12;
							(function(radioButton_1){
								radioButton_1.addItem(new cpr.controls.Item("사용", "value1"));
								radioButton_1.addItem(new cpr.controls.Item("미사용", "value2"));
							})(radioButton_1);
							container.addChild(radioButton_1, {
								"autoSize": "width",
								"width": "200px",
								"height": "100%"
							});
						})(group_10);
						container.addChild(group_10, {
							"colIndex": 1,
							"rowIndex": 7
						});
					})(group_8);
					container.addChild(group_8, {
						"colIndex": 0,
						"rowIndex": 1,
						"height": 347
					});
				})(group_7);
				container.addChild(group_7, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_4);
			container.addChild(group_4, {
				"autoSize": "none",
				"width": "760px",
				"height": "608px"
			});
			// Linking
			linker.userDefinedControl_3.ctrl = linker.grid_1;
			linker.userDefinedControl_4.grid = linker.grid_1;
			linker.userDefinedControl_5.ctrl = linker.group_8;
			linker.group_8.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "SMS 설정 정보 목록";
	cpr.core.Platform.INSTANCE.register(app);
})();
