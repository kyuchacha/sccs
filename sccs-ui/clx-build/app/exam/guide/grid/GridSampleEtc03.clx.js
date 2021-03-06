/*
 * App URI: app/exam/guide/grid/GridSampleEtc03
 * Source Location: app/exam/guide/grid/GridSampleEtc03.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/grid/GridSampleEtc03", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* GridSampleEtc03.js
			 * Created at 2022. 3. 18. 오후 4:46:17.
			 *
			 * @author 1amthomas
			 ************************************************/
			
			
			/*
			 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click2(e){
				//질의문자열 중 ps의 value 값에 해당 qna 요청번호 입력
				//faq인 경우, 질의문자열 중 tn의 value 값을 faq로 수정
				window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsList");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "col1",
						"dataType": "number"
					},
					{
						"name": "col2",
						"dataType": "number"
					},
					{
						"name": "col3",
						"dataType": "number"
					},
					{
						"name": "col4",
						"dataType": "number"
					},
					{
						"name": "col5",
						"dataType": "number"
					},
					{
						"name": "col6",
						"dataType": "number"
					},
					{
						"name": "col7",
						"dataType": "number"
					},
					{
						"name": "sum123",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "col1+col2+col3"
					}
				],
				"rows": [
					{"col1": "1", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "2", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "3", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "4", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "5", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "6", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "7", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "8", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "9", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"},
					{"col1": "10", "col2": "2", "col3": "3", "col4": "4", "col5": "5", "col6": "6", "col7": "7"}
				]
			});
			app.register(dataSet_1);
			
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
				"width": "1320px",
				"height": "30px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.leftMargin = 20;
			verticalLayout_3.rightMargin = 30;
			verticalLayout_3.topMargin = 30;
			verticalLayout_3.bottomMargin = 30;
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container("grp1");
				// Layout
				var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_4.spacing = 30;
				verticalLayout_4.topMargin = 20;
				verticalLayout_4.bottomMargin = 40;
				group_3.setLayout(verticalLayout_4);
				(function(container){
					var group_4 = new cpr.controls.Container("grp3");
					// Layout
					var formLayout_1 = new cpr.controls.layouts.FormLayout();
					formLayout_1.scrollable = false;
					formLayout_1.rightMargin = "50px";
					formLayout_1.horizontalSpacing = "5px";
					formLayout_1.verticalSpacing = "5px";
					formLayout_1.setColumns(["300px", "100px"]);
					formLayout_1.setColumnAutoSizing(0, true);
					formLayout_1.setColumnAutoSizing(1, true);
					formLayout_1.setRows(["1fr"]);
					group_4.setLayout(formLayout_1);
					(function(container){
						var output_1 = new cpr.controls.Output();
						output_1.value = "그리드 자동합산/특정행 합계";
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
					output_2.value = "이 페이지에서는 그리드의 자동합산/특정행 합계에 대해 설명합니다.";
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
					"height": "150px"
				});
				var group_5 = new cpr.controls.Container("grp2");
				// Layout
				var verticalLayout_5 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_5.spacing = 30;
				verticalLayout_5.topMargin = 10;
				verticalLayout_5.bottomMargin = 30;
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
					output_4.value = "1. 그리드 항목의 합계 및 평균에 대한 자동계산 내역을 확인합니다.\r\n2. 그리드 co1과 col2의 항목에 대한 합계 계산 내역을 확인합니다.";
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
					var group_6 = new cpr.controls.Container("grp4");
					group_6.style.css({
						"background-color" : "#dff7fb"
					});
					// Layout
					var verticalLayout_6 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_6.spacing = 10;
					verticalLayout_6.leftMargin = 30;
					verticalLayout_6.rightMargin = 30;
					verticalLayout_6.topMargin = 20;
					verticalLayout_6.bottomMargin = 20;
					group_6.setLayout(verticalLayout_6);
					(function(container){
						var output_5 = new cpr.controls.Output();
						output_5.value = "추가설명";
						output_5.style.setClasses(["ref-title"]);
						output_5.style.css({
							"color" : "#09c2de",
							"font-weight" : "bold"
						});
						container.addChild(output_5, {
							"width": "100px",
							"height": "25px"
						});
						var output_6 = new cpr.controls.Output();
						output_6.value = "익스프레션 함수를 이용하여서 해당 행의 숫자들의 합계 값과 평균값을 계산하여 출력하는 화면 예제입니다.";
						output_6.style.css({
							"color" : "#09c2de"
						});
						container.addChild(output_6, {
							"autoSize": "height",
							"width": "100px",
							"height": "25px"
						});
					})(group_6);
					container.addChild(group_6, {
						"autoSize": "height",
						"width": "1100px",
						"height": "150px"
					});
				})(group_5);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "1270px",
					"height": "370px"
				});
				var group_7 = new cpr.controls.Container("grpFunction");
				// Layout
				var verticalLayout_7 = new cpr.controls.layouts.VerticalLayout();
				group_7.setLayout(verticalLayout_7);
				(function(container){
					var group_8 = new cpr.controls.Container("grpFuncFloating");
					group_8.userAttr({"floating-header": "true"});
					// Layout
					var verticalLayout_8 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_8.bottomMargin = 30;
					group_8.setLayout(verticalLayout_8);
					(function(container){
						var output_7 = new cpr.controls.Output();
						output_7.value = "기능확인";
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
						var group_9 = new cpr.controls.Container("grp11");
						group_9.style.css({
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
						var verticalLayout_9 = new cpr.controls.layouts.VerticalLayout();
						verticalLayout_9.leftMargin = 30;
						verticalLayout_9.rightMargin = 30;
						verticalLayout_9.topMargin = 5;
						verticalLayout_9.bottomMargin = 10;
						group_9.setLayout(verticalLayout_9);
						(function(container){
							var group_10 = new cpr.controls.Container("grp9");
							// Layout
							var formLayout_2 = new cpr.controls.layouts.FormLayout();
							formLayout_2.topMargin = "0px";
							formLayout_2.rightMargin = "0px";
							formLayout_2.bottomMargin = "0px";
							formLayout_2.leftMargin = "0px";
							formLayout_2.horizontalSpacing = "5px";
							formLayout_2.verticalSpacing = "5px";
							formLayout_2.setColumns(["1fr"]);
							formLayout_2.setRows(["1fr", "20px"]);
							group_10.setLayout(formLayout_2);
							(function(container){
								var output_8 = new cpr.controls.Output();
								output_8.value = "<기능 확인 그리드>";
								output_8.style.setClasses(["text-center"]);
								container.addChild(output_8, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var grid_1 = new cpr.controls.Grid("grdList");
								grid_1.readOnly = true;
								grid_1.init({
									"dataSet": app.lookup("dsList"),
									"columnMovable": true,
									"autoFit": "1, 2, 3, 4, 5, 6, 7, 8",
									"resizableColumns": "all",
									"columns": [
										{"width": "60px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "100px"},
										{"width": "142px"}
									],
									"header": {
										"rows": [{"height": "27px"}],
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
												"constraint": {"rowIndex": 0, "colIndex": 1},
												"configurator": function(cell){
													cell.targetColumnName = "col1";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col1";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 2},
												"configurator": function(cell){
													cell.targetColumnName = "col2";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col2";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 3},
												"configurator": function(cell){
													cell.targetColumnName = "col3";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col3";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 4},
												"configurator": function(cell){
													cell.targetColumnName = "col4";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col4";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 5},
												"configurator": function(cell){
													cell.targetColumnName = "col5";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col5";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 6},
												"configurator": function(cell){
													cell.targetColumnName = "col6";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col6";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 7},
												"configurator": function(cell){
													cell.targetColumnName = "col7";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "col7";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 8},
												"configurator": function(cell){
													cell.targetColumnName = "sum123";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "sum(col1+col2+col3)";
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
												"constraint": {"rowIndex": 0, "colIndex": 1},
												"configurator": function(cell){
													cell.columnName = "col1";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 2},
												"configurator": function(cell){
													cell.columnName = "col2";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 3},
												"configurator": function(cell){
													cell.columnName = "col3";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 4},
												"configurator": function(cell){
													cell.columnName = "col4";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 5},
												"configurator": function(cell){
													cell.columnName = "col5";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 6},
												"configurator": function(cell){
													cell.columnName = "col6";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 7},
												"configurator": function(cell){
													cell.columnName = "col7";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 8},
												"configurator": function(cell){
													cell.columnName = "sum123";
												}
											}
										]
									},
									"footer": {
										"rows": [
											{"height": "24px"},
											{"height": "24px"}
										],
										"cells": [
											{
												"constraint": {"rowIndex": 0, "colIndex": 0},
												"configurator": function(cell){
													cell.expr = "\"합계\"";
													cell.control = (function(){
														var output_9 = new cpr.controls.Output("otp1");
														output_9.value = "Output";
														output_9.style.css({
															"font-weight" : "bold",
															"text-align" : "center"
														});
														return output_9;
													})();
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 1},
												"configurator": function(cell){
													cell.expr = "getSum(\"col1\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 2},
												"configurator": function(cell){
													cell.expr = "getSum(\"col2\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 3},
												"configurator": function(cell){
													cell.expr = "getSum(\"col3\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 4},
												"configurator": function(cell){
													cell.expr = "getSum(\"col4\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 5},
												"configurator": function(cell){
													cell.expr = "getSum(\"col5\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 6},
												"configurator": function(cell){
													cell.expr = "getSum(\"col6\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 7},
												"configurator": function(cell){
													cell.expr = "getSum(\"col7\")";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 8},
												"configurator": function(cell){
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 0},
												"configurator": function(cell){
													cell.expr = "\"평균\"";
													cell.control = (function(){
														var output_10 = new cpr.controls.Output("otp2");
														output_10.value = "Output";
														output_10.style.css({
															"font-weight" : "bold",
															"text-align" : "center"
														});
														return output_10;
													})();
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 1},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col1\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 2},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col2\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 3},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col3\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 4},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col4\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 5},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col5\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 6},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col6\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 7},
												"configurator": function(cell){
													cell.expr = "round(getAvg(\"col7\"))";
												}
											},
											{
												"constraint": {"rowIndex": 1, "colIndex": 8},
												"configurator": function(cell){
												}
											}
										]
									}
								});
								container.addChild(grid_1, {
									"colIndex": 0,
									"rowIndex": 0
								});
							})(group_10);
							container.addChild(group_10, {
								"autoSize": "height",
								"width": "200px",
								"height": "300px"
							});
							var group_11 = new cpr.controls.Container("grp5");
							// Layout
							var formLayout_3 = new cpr.controls.layouts.FormLayout();
							formLayout_3.topMargin = "0px";
							formLayout_3.rightMargin = "0px";
							formLayout_3.bottomMargin = "0px";
							formLayout_3.leftMargin = "0px";
							formLayout_3.horizontalSpacing = "5px";
							formLayout_3.verticalSpacing = "5px";
							formLayout_3.setColumns(["1fr"]);
							formLayout_3.setRows(["1fr", "20px"]);
							group_11.setLayout(formLayout_3);
							(function(container){
								var output_11 = new cpr.controls.Output();
								output_11.value = "<그리드 특정행 합산 내역>";
								output_11.style.setClasses(["text-center"]);
								container.addChild(output_11, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var group_12 = new cpr.controls.Container("grp6");
								group_12.style.setClasses(["form-box"]);
								// Layout
								var formLayout_4 = new cpr.controls.layouts.FormLayout();
								formLayout_4.topMargin = "5px";
								formLayout_4.rightMargin = "5px";
								formLayout_4.bottomMargin = "5px";
								formLayout_4.leftMargin = "5px";
								formLayout_4.setColumns(["180px", "200px", "180px", "200px", "1fr"]);
								formLayout_4.setRows(["25px"]);
								group_12.setLayout(formLayout_4);
								(function(container){
									var output_12 = new cpr.controls.Output("otp3");
									output_12.value = "col1 항목의 합계";
									container.addChild(output_12, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var output_13 = new cpr.controls.Output("otp4");
									output_13.style.css({
										"background-color" : "white",
										"font-weight" : "normal",
										"text-align" : "left"
									});
									output_13.bind("value").toExpression("#dsList.getSum(\"col1\")");
									container.addChild(output_13, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_14 = new cpr.controls.Output("otp5");
									output_14.value = "col2 항목의 합계";
									container.addChild(output_14, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var output_15 = new cpr.controls.Output("otp6");
									output_15.style.css({
										"background-color" : "white",
										"font-weight" : "normal",
										"text-align" : "left"
									});
									output_15.bind("value").toExpression("#dsList.getSum(\"col2\")");
									container.addChild(output_15, {
										"colIndex": 3,
										"rowIndex": 0
									});
								})(group_12);
								container.addChild(group_12, {
									"colIndex": 0,
									"rowIndex": 0
								});
							})(group_11);
							container.addChild(group_11, {
								"autoSize": "height",
								"width": "1208px",
								"height": "300px"
							});
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "height",
							"width": "1210px",
							"height": "736px"
						});
					})(group_8);
					container.addChild(group_8, {
						"autoSize": "height",
						"width": "1270px",
						"height": "705px"
					});
				})(group_7);
				container.addChild(group_7, {
					"autoSize": "height",
					"width": "1270px",
					"height": "824px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "1320px",
				"height": "2800px"
			});
		}
	});
	app.title = "그리드 자동합산/특정행 합계";
	cpr.core.Platform.INSTANCE.register(app);
})();
