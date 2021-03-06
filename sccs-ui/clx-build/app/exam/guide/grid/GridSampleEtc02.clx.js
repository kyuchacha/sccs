/*
 * App URI: app/exam/guide/grid/GridSampleEtc02
 * Source Location: app/exam/guide/grid/GridSampleEtc02.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/grid/GridSampleEtc02", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * GridSampleEtc02.js
			 * Created at 2022. 3. 17. 오전 9:32:01.
			 *
			 * @author 1amthomas
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "gbnCd"},
					{
						"name": "gbnName",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "switch(gbnCd) {\r\ncase \"END\" : \"완료\"\r\ncase \"ING\" : \"진행중\"\r\ncase \"REQ\" : \"요청\"\r\n}"
					},
					{"name": "bgcolor"},
					{"name": "color"}
				],
				"rows": [
					{"gbnCd": "END", "bgcolor": "pink", "color": "red"},
					{"gbnCd": "ING", "bgcolor": "skyblue", "color": "navy"},
					{"gbnCd": "REQ", "bgcolor": "gray", "color": "black"},
					{"gbnCd": "END", "bgcolor": "pink", "color": "red"},
					{"gbnCd": "END", "bgcolor": "pink", "color": "red"},
					{"gbnCd": "ING", "bgcolor": "skyblue", "color": "navy"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsCombo");
			dataSet_2.parseData({
				"columns": [
					{"name": "cd"},
					{"name": "cdNm"}
				],
				"rows": [
					{"cd": "END", "cdNm": "완료"},
					{"cd": "ING", "cdNm": "진행중"},
					{"cd": "REQ", "cdNm": "요청"}
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
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				container.addChild(userDefinedControl_1, {
					"width": "500px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "400px",
				"height": "30px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.leftMargin = 20;
			verticalLayout_3.rightMargin = 30;
			verticalLayout_3.topMargin = 30;
			verticalLayout_3.bottomMargin = 20;
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container();
				// Layout
				var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_4.spacing = 20;
				verticalLayout_4.topMargin = 20;
				verticalLayout_4.bottomMargin = 40;
				group_3.setLayout(verticalLayout_4);
				(function(container){
					var group_4 = new cpr.controls.Container("grp1");
					// Layout
					var formLayout_1 = new cpr.controls.layouts.FormLayout();
					formLayout_1.scrollable = false;
					formLayout_1.rightMargin = "50px";
					formLayout_1.horizontalSpacing = "5px";
					formLayout_1.verticalSpacing = "5px";
					formLayout_1.setColumns(["150px", "100px"]);
					formLayout_1.setColumnAutoSizing(0, true);
					formLayout_1.setColumnAutoSizing(1, true);
					formLayout_1.setRows(["1fr"]);
					group_4.setLayout(formLayout_1);
					(function(container){
						var output_1 = new cpr.controls.Output();
						output_1.value = "데이터 셋의 익스프레션";
						output_1.style.css({
							"font-weight" : "bold",
							"padding-left" : "1rem",
							"font-size" : "2.5rem"
						});
						container.addChild(output_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_4);
					container.addChild(group_4, {
						"autoSize": "height",
						"width": "1270px",
						"height": "40px"
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "이 페이지는 데이터 셋의 익스프레션 기능에 대해 설명합니다.";
					output_2.style.setClasses(["opt-tmpl"]);
					output_2.style.css({
						"padding-left" : "1rem",
						"font-size" : "1rem"
					});
					container.addChild(output_2, {
						"autoSize": "height",
						"width": "1210px",
						"height": "46px"
					});
				})(group_3);
				container.addChild(group_3, {
					"autoSize": "height",
					"width": "1270px",
					"height": "120px"
				});
				var group_5 = new cpr.controls.Container();
				// Layout
				var verticalLayout_5 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_5.spacing = 20;
				verticalLayout_5.topMargin = 20;
				verticalLayout_5.bottomMargin = 40;
				group_5.setLayout(verticalLayout_5);
				(function(container){
					var output_3 = new cpr.controls.Output();
					output_3.value = "시나리오";
					output_3.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_3.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_3, {
						"width": "100px",
						"height": "40px"
					});
					var output_4 = new cpr.controls.Output("ipbScenario");
					output_4.value = "1. 데이터셋의 컬럼 expression 사용방법 및 기능동작을 확인한다.\r\n2. 그리드내 콤보박스의 바인딩(label/value) 방법 및 기능동작을 확인한다.";
					output_4.style.setClasses(["opt-tmpl"]);
					output_4.style.css({
						"padding-left" : "1rem",
						"font-size" : "1rem"
					});
					container.addChild(output_4, {
						"autoSize": "height",
						"width": "1210px",
						"height": "107px"
					});
					var group_6 = new cpr.controls.Container("grp2");
					group_6.style.css({
						"background-color" : "#dff7fb"
					});
					// Layout
					var verticalLayout_6 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_6.leftMargin = 30;
					verticalLayout_6.rightMargin = 30;
					verticalLayout_6.topMargin = 20;
					verticalLayout_6.bottomMargin = 20;
					group_6.setLayout(verticalLayout_6);
					(function(container){
						var output_5 = new cpr.controls.Output();
						output_5.value = "추가설명";
						output_5.style.setClasses(["text-info", "opt-tmpl"]);
						output_5.style.css({
							"font-weight" : "bold"
						});
						container.addChild(output_5, {
							"width": "100px",
							"height": "25px"
						});
						var output_6 = new cpr.controls.Output();
						output_6.value = "1. 데이터 셋 - 컬럼(expression), 콤보박스 - label / value 이용\r\n2. 데이터셋의 익스프레션을 이용하여 출력된 구분명과 콤보 구분명이 동일한지 확인한다.\r\n3. 그리드 행의 배경색 - 그리드를 선택한 후 바인딩 - 스타일속성 rowStyle(상대컬럼 바인딩) - background-color\r\n4. 그리드 열의 폰트색 - 그리드 편집기에서 열의 디테일 영역을 선택한 후 바인딩 - 스타일속성 - color(상대컬럼바인딩)";
						output_6.style.setClasses(["text-info", "opt-tmpl"]);
						container.addChild(output_6, {
							"autoSize": "height",
							"width": "100px",
							"height": "25px"
						});
					})(group_6);
					container.addChild(group_6, {
						"autoSize": "height",
						"width": "1100px",
						"height": "100px"
					});
				})(group_5);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "1270px",
					"height": "345px"
				});
				var group_7 = new cpr.controls.Container();
				group_7.userAttr({"floating-header": "true"});
				// Layout
				var verticalLayout_7 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_7.spacing = 15;
				verticalLayout_7.topMargin = 20;
				verticalLayout_7.bottomMargin = 0;
				group_7.setLayout(verticalLayout_7);
				(function(container){
					var output_7 = new cpr.controls.Output();
					output_7.value = "기능 확인";
					output_7.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_7.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_7, {
						"autoSize": "none",
						"width": "1270px",
						"height": "40px"
					});
					var group_8 = new cpr.controls.Container("grp3");
					group_8.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#dedede",
						"border-right-width" : "1px",
						"border-left-color" : "#dedede",
						"border-right-color" : "#dedede",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#F0F0F0",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#dedede",
						"border-bottom-style" : "solid"
					});
					// Layout
					var verticalLayout_8 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_8.leftMargin = 30;
					verticalLayout_8.rightMargin = 30;
					verticalLayout_8.topMargin = 5;
					verticalLayout_8.bottomMargin = 10;
					group_8.setLayout(verticalLayout_8);
					(function(container){
						var group_9 = new cpr.controls.Container("grp5");
						// Layout
						var formLayout_2 = new cpr.controls.layouts.FormLayout();
						formLayout_2.scrollable = false;
						formLayout_2.topMargin = "0px";
						formLayout_2.rightMargin = "0px";
						formLayout_2.leftMargin = "0px";
						formLayout_2.horizontalSpacing = "5px";
						formLayout_2.verticalSpacing = "5px";
						formLayout_2.setColumns(["1fr"]);
						formLayout_2.setRows(["25px", "1fr"]);
						group_9.setLayout(formLayout_2);
						(function(container){
							var output_8 = new cpr.controls.Output();
							output_8.value = "<기능 확인 컨트롤>";
							output_8.style.setClasses(["opt-tmpl"]);
							output_8.style.css({
								"text-align" : "center"
							});
							output_8.bind("tooltip").toExpression("#ipbScenario.value");
							container.addChild(output_8, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var grid_1 = new cpr.controls.Grid("grdList");
							grid_1.fieldLabel = "데이터셋의 익스프레션";
							grid_1.readOnly = true;
							grid_1.init({
								"dataSet": app.lookup("ds1"),
								"columns": [
									{"width": "100px"},
									{"width": "100px"},
									{"width": "100px"}
								],
								"header": {
									"rows": [{"height": "27px"}],
									"cells": [
										{
											"constraint": {"rowIndex": 0, "colIndex": 0},
											"configurator": function(cell){
												cell.targetColumnName = "gbnCd";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "구분";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 1},
											"configurator": function(cell){
												cell.targetColumnName = "gbnName";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "구분명";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 2},
											"configurator": function(cell){
												cell.targetColumnName = "bgcolor";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "콤보 구분명";
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
												cell.columnName = "gbnCd";
												cell.style.bind("color").toDataColumn("color");
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 1},
											"configurator": function(cell){
												cell.columnName = "gbnName";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 2},
											"configurator": function(cell){
												cell.columnName = "gbnCd";
												cell.control = (function(){
													var comboBox_1 = new cpr.controls.ComboBox("cmb1");
													(function(comboBox_1){
														comboBox_1.setItemSet(app.lookup("dsCombo"), {
															"label": "cdNm",
															"value": "cd"
														});
													})(comboBox_1);
													comboBox_1.bind("value").toDataColumn("gbnCd");
													return comboBox_1;
												})();
											}
										}
									]
								}
							});
							grid_1.style.row.bind("background-color").toDataColumn("bgcolor");
							container.addChild(grid_1, {
								"colIndex": 0,
								"rowIndex": 1
							});
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "height",
							"width": "860px",
							"height": "250px"
						});
					})(group_8);
					if(typeof onGrp11Click == "function") {
						group_8.addEventListener("click", onGrp11Click);
					}
					container.addChild(group_8, {
						"autoSize": "height",
						"width": "1210px",
						"height": "300px"
					});
				})(group_7);
				container.addChild(group_7, {
					"autoSize": "height",
					"width": "1270px",
					"height": "1000px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "400px",
				"height": "1800px"
			});
		}
	});
	app.title = "데이터셋의 익스프레션 예제";
	cpr.core.Platform.INSTANCE.register(app);
})();
