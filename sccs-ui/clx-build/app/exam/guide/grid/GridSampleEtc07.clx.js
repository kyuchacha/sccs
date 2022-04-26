/*
 * App URI: app/exam/guide/grid/GridSampleEtc07
 * Source Location: app/exam/guide/grid/GridSampleEtc07.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/grid/GridSampleEtc07", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* GridSampleEtc07.js
			 * Created at 2022. 3. 18. 오후 5:05:55.
			 *
			 * @author 1amthomas
			 ************************************************/
			
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(e){
				//첫번째 그룹 펼치기
				var gridRowGroup = app.lookup("grdList").getGridRowGroup(0);
				if (gridRowGroup) {
					gridRowGroup.expanded = true;
				}	
			}
			
			/*
			 * 그리드에서 rowgroup-click 이벤트 발생 시 호출.
			 * Grid의 RowGroup 클릭시 발생하는 이벤트.
			 */
			function onGrd1RowgroupClick( /* cpr.events.CGridEvent */ e) {
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
				
				/** @type HTMLElement */
				var dom = e.target;
				
				var classNames = dom.className.split(/\s+/g);
				
				// 접기 펼치기 클릭
				if (classNames.indexOf("expander") !== -1) {
					e.rowgroup.expanded = !e.rowgroup.expanded;
				}
				
			}
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsList");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "gbn",
						"dataType": "string"
					},
					{
						"name": "col1",
						"dataType": "string"
					},
					{
						"name": "col2",
						"dataType": "string"
					},
					{
						"name": "col3",
						"dataType": "number"
					},
					{"name": "col4"}
				],
				"rows": [
					{"gbn": "토마토", "col1": "A1234567", "col2": "홍길동1", "col3": "520000", "col4": "2018-09-01"},
					{"gbn": "토마토", "col1": "A1234567", "col2": "홍길동2", "col3": "30000", "col4": "2018-09-01"},
					{"gbn": "토마토", "col1": "A1234567", "col2": "홍길동3", "col3": "1500000", "col4": "2018-09-01"},
					{"gbn": "토마토", "col1": "A1234567", "col2": "홍길동4", "col3": "900000", "col4": "2018-09-01"},
					{"gbn": "퇴직연금", "col1": "A1234567", "col2": "홍길동5", "col3": "2000000", "col4": "2018-09-01"},
					{"gbn": "퇴직연금", "col1": "A1234567", "col2": "홍길동6", "col3": "25000", "col4": "2018-09-01"},
					{"gbn": "퇴직연금", "col1": "A1234567", "col2": "홍길동7", "col3": "300000", "col4": "2018-09-01"},
					{"gbn": "퇴직연금", "col1": "A1234567", "col2": "홍길동8", "col3": "1000000", "col4": "2018-09-01"},
					{"gbn": "리버사이드", "col1": "A1234567", "col2": "홍길동9", "col3": "850000", "col4": "2018-09-01"},
					{"gbn": "리버사이드", "col1": "A1234567", "col2": "홍길동10", "col3": "150000", "col4": "2018-09-01"},
					{"gbn": "리버사이드", "col1": "A1234567", "col2": "홍길동11", "col3": "370000", "col4": "2018-09-01"}
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
						output_1.value = "그리드 그룹소계 디자인";
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
					output_2.value = "이 페이지는 그리드의 그룹소계 디자인에 대해 설명합니다.";
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
					output_4.value = "1. 그리드의 단체별 부담금합계가 계산되어 각 그룹헤더에 표시되는것을 확인합니다.\r\n2. 단체별로 표시된 그룹헤더의 [-접기] 와 [+펼치기] 기능이 올바르게 동작하는지 확인합니다.";
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
						output_6.value = "풋터에 디자인을 위한 테이블 태그와 데이터 값을 복합적으로 표시하는 expression을 사용하고, css명칭을 불러와 이벤트를 호출하는 방법을 사용합니다.";
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
								output_8.value = "<기능 확인 컨트롤>";
								output_8.style.setClasses(["text-center"]);
								container.addChild(output_8, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var grid_1 = new cpr.controls.Grid("grdList");
								grid_1.init({
									"dataSet": app.lookup("dsList"),
									"collapsible": true,
									"columns": [
										{"width": "100px"},
										{"width": "100px"},
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
													cell.targetColumnName = "gbn";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "단체";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 1},
												"configurator": function(cell){
													cell.targetColumnName = "col1";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "가입자증번";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 2},
												"configurator": function(cell){
													cell.targetColumnName = "col2";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "성명";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 3},
												"configurator": function(cell){
													cell.targetColumnName = "col3";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "부담금";
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 4},
												"configurator": function(cell){
													cell.targetColumnName = "col4";
													cell.filterable = false;
													cell.sortable = false;
													cell.text = "지급일자";
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
													cell.columnName = "gbn";
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
													cell.control = (function(){
														var numberEditor_1 = new cpr.controls.NumberEditor("ned1");
														numberEditor_1.bind("value").toDataColumn("col3");
														return numberEditor_1;
													})();
												}
											},
											{
												"constraint": {"rowIndex": 0, "colIndex": 4},
												"configurator": function(cell){
													cell.columnName = "col4";
												}
											}
										]
									},
									"rowGroup": [{
										"groupCondition": "gbn",
										"startCollapse": true,
										"gheader": {
											"rows": [{"height": "32px"}],
											"cells": [
												{
													"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 4},
													"configurator": function(cell){
														cell.expr = "\"<span>\" + gbn + \"<\/span>&nbsp&nbsp\"\r\n+ (expanded ? \"<span class='expander expanded'>[-접기]<\/span>\" : \"<span class='expander collapsed'>[+펼치기]<\/span>\")";
														cell.control = (function(){
															var hTMLSnippet_1 = new cpr.controls.HTMLSnippet("htmlsnp1");
															hTMLSnippet_1.value = "<p>HTML Snippet<\/p>";
															return hTMLSnippet_1;
														})();
													}
												},
												{
													"constraint": {"rowIndex": 0, "colIndex": 4},
													"configurator": function(cell){
														cell.expr = "\"부담금 총액 : \"+ getSum(\"col3\").toNumber().toLocaleString() + \"원\" ";
													}
												}
											]
										}
									}]
								});
								if(typeof onGrd1RowgroupClick == "function") {
									grid_1.addEventListener("rowgroup-click", onGrd1RowgroupClick);
								}
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
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "none",
							"width": "1210px",
							"height": "500px"
						});
					})(group_8);
					container.addChild(group_8, {
						"autoSize": "height",
						"width": "1270px",
						"height": "450px"
					});
				})(group_7);
				container.addChild(group_7, {
					"autoSize": "height",
					"width": "1270px",
					"height": "450px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "1320px",
				"height": "2800px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "그리드 그룹소계 디자인";
	cpr.core.Platform.INSTANCE.register(app);
})();
