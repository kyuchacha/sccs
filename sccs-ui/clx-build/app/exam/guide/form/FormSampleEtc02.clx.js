/*
 * App URI: app/exam/guide/form/FormSampleEtc02
 * Source Location: app/exam/guide/form/FormSampleEtc02.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/form/FormSampleEtc02", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * FormSampleEtc02.js
			 * Created at 2022. 3. 15. 오전 10:24:55.
			 *
			 * @author jiyeon
			 ************************************************/
			
			var util = createCommonUtil();
			
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(e){
				//그리드 초기화
				util.Grid.init(app, ["grdList"]);
				
				//폼 초기화
				util.FreeForm.init(app, ["grpFormFunc", "grpFreeForm"]);
			}
			
			
			/*
			 * "초기화" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnInitClick(e){
				var btnInit = e.control;
				
				util.FreeForm.init(app, "grpFreeForm");
				
				printSource(null);
			}
			
			
			/*
			 * "필수값 체크" 버튼(btnValidate)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnValidateClick(e){
				var btnValidate = e.control;
				
				validateForm();
				
				printSource(validateForm);
			}
			
			function validateForm() {
				// 폼레이아웃에 필수 입력값에 포커스 지정
				app.lookup("grpFreeForm").getChildren().forEach(function(each){
					if (each.value != "") each.style.removeClass("cl-focus");
					if (each.userAttr("required") == "Y" && each.value == "") {
						each.style.addClass("cl-focus");
					} 
				});
			}
			
			
			
			
			
			//== 스크립트 출력 ==//
			function printSource(value) {
				/* 에디터에 소스 표시 */
				var vcAceEditor = app.lookup("ace1");
				vcAceEditor.value = value;	
			}
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsList");
			dataSet_1.parseData({
				"columns": [
					{"name": "col1"},
					{"name": "col2"},
					{"name": "col3"},
					{"name": "col4"}
				],
				"rows": [
					{"col1": "ID0001", "col2": "박보검", "col3": "010-1234-5678", "col4": "서울시 여의도"},
					{"col1": "ID0002", "col2": "홍길동", "col3": "010-1234-5678", "col4": "서울시 동작구 123"},
					{"col1": "ID0003", "col2": "이순신", "col3": "010-1234-5678", "col4": "경기도 의정부시 111"},
					{"col1": "ID0004", "col2": "송혜교", "col3": "010-1234-5678", "col4": "서울시 노원구 중계동"},
					{"col1": "ID0004", "col2": "이보영", "col3": "010-1234-5678", "col4": "서울시 강북구"},
					{"col1": "ID0005", "col2": "임장군", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"},
					{"col1": "ID0005", "col2": "김토마토", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"},
					{"col1": "ID0005", "col2": "김퇴직", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsListOrg");
			dataSet_2.parseData({
				"columns": [
					{"name": "col1"},
					{"name": "col2"},
					{"name": "col3"},
					{"name": "col4"}
				],
				"rows": [
					{"col1": "ID0001", "col2": "박보검", "col3": "010-1234-5678", "col4": "서울시 여의도"},
					{"col1": "ID0002", "col2": "홍길동", "col3": "010-1234-5678", "col4": "서울시 동작구 123"},
					{"col1": "ID0003", "col2": "이순신", "col3": "010-1234-5678", "col4": "경기도 의정부시 111"},
					{"col1": "ID0004", "col2": "송혜교", "col3": "010-1234-5678", "col4": "서울시 노원구 중계동"},
					{"col1": "ID0004", "col2": "이보영", "col3": "010-1234-5678", "col4": "서울시 강북구"},
					{"col1": "ID0005", "col2": "임장군", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"},
					{"col1": "ID0005", "col2": "김토마토", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"},
					{"col1": "ID0005", "col2": "김퇴직", "col3": "010-1234-5678", "col4": "서울시 여의도 영등포동"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsSubList");
			dataSet_3.parseData({
				"columns": [
					{"name": "CD"},
					{"name": "CNM"},
					{"name": "CD_DESC"},
					{"name": "SORT_ODR"},
					{"name": "LOAD_YN"},
					{"name": "OUT_YN"},
					{"name": "USE_YN"}
				],
				"rows": [
					{"CD": "00001", "CNM": "코드1", "CD_DESC": "코드설명1", "SORT_ODR": "0001", "LOAD_YN": "N", "OUT_YN": "Y", "USE_YN": "Y"},
					{"CD": "00002", "CNM": "코드2", "CD_DESC": "코드설명2", "SORT_ODR": "0002", "LOAD_YN": "N", "OUT_YN": "N", "USE_YN": "Y"},
					{"CD": "00003", "CNM": "코드3", "CD_DESC": "코드설명3", "SORT_ODR": "0003", "LOAD_YN": "Y", "OUT_YN": "Y", "USE_YN": "N"},
					{"CD": "00004", "CNM": "코드4", "CD_DESC": "코드설명4", "SORT_ODR": "0004", "LOAD_YN": "Y", "OUT_YN": "Y", "USE_YN": "N"},
					{"CD": "00005", "CNM": "코드5", "CD_DESC": "코드설명5", "SORT_ODR": "0005", "LOAD_YN": "Y", "OUT_YN": "N", "USE_YN": "Y"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsCode03");
			dataSet_4.parseData({
				"columns": [
					{"name": "cd"},
					{
						"name": "cd_nm",
						"displayOnly": false
					}
				],
				"rows": [
					{"cd": "Y", "cd_nm": "Y"},
					{"cd": "N", "cd_nm": "N"}
				]
			});
			app.register(dataSet_4);
			
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
						output_1.value = "폼 내의 필수값 체크";
						output_1.style.css({
							"font-weight" : "bold",
							"padding-left" : "1rem",
							"font-size" : "2.5rem"
						});
						container.addChild(output_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var output_2 = new cpr.controls.Output();
						output_2.value = "util.FreeForm";
						output_2.style.setClasses(["text-primary"]);
						output_2.style.css({
							"font-weight" : "bold",
							"padding-left" : "3rem",
							"font-size" : "1.25rem",
							"text-align" : "left"
						});
						container.addChild(output_2, {
							"colIndex": 1,
							"rowIndex": 0,
							"verticalAlign": "bottom",
							"height": 35
						});
					})(group_4);
					container.addChild(group_4, {
						"autoSize": "height",
						"width": "1270px",
						"height": "40px"
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "이 페이지에서는 프리폼 내의 필수값을 체크하는 공통모듈에 대해 설명합니다.";
					output_3.style.setClasses(["opt-tmpl"]);
					output_3.style.css({
						"padding-left" : "1rem",
						"font-size" : "1rem"
					});
					container.addChild(output_3, {
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
					var output_4 = new cpr.controls.Output();
					output_4.value = "시나리오";
					output_4.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_4.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_4, {
						"width": "100px",
						"height": "40px"
					});
					var output_5 = new cpr.controls.Output("ipbScenario");
					output_5.value = "1. 프리폼의 필수값을 체크하는 방법을 확인한다.";
					output_5.style.setClasses(["opt-tmpl"]);
					output_5.style.css({
						"padding-left" : "1rem",
						"font-size" : "1rem"
					});
					container.addChild(output_5, {
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
						var output_6 = new cpr.controls.Output();
						output_6.value = "추가설명";
						output_6.style.setClasses(["text-info", "opt-tmpl"]);
						output_6.style.css({
							"font-weight" : "bold"
						});
						container.addChild(output_6, {
							"width": "100px",
							"height": "25px"
						});
						var output_7 = new cpr.controls.Output();
						output_7.value = "1. 필수값 지정 방법 : 프리폼의 각 컨트롤 선택 후 properties > 사용자 속성 > required 속성을 Y로 세팅\r\n2. 필수입력 컨트롤 : properties > 일반 > fieldLabel을 필수로 입력";
						output_7.style.setClasses(["text-info", "opt-tmpl"]);
						container.addChild(output_7, {
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
					var output_8 = new cpr.controls.Output();
					output_8.value = "기능 확인";
					output_8.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_8.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_8, {
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
						formLayout_2.setColumns(["1fr", "2fr"]);
						formLayout_2.setRows(["25px", "25px", "1fr"]);
						group_9.setLayout(formLayout_2);
						(function(container){
							var output_9 = new cpr.controls.Output();
							output_9.value = "<상세 입력폼>";
							output_9.style.setClasses(["opt-tmpl"]);
							output_9.style.css({
								"text-align" : "center"
							});
							output_9.bind("tooltip").toExpression("#ipbScenario.value");
							container.addChild(output_9, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_10 = new cpr.controls.Output();
							output_10.value = "<프리폼 연결 그리드>";
							output_10.style.setClasses(["opt-tmpl"]);
							output_10.style.css({
								"text-align" : "center"
							});
							output_10.bind("tooltip").toExpression("#ipbScenario.value");
							container.addChild(output_10, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var group_10 = linker.group_10 = new cpr.controls.Container("grpFreeForm");
							group_10.style.setClasses(["form-box"]);
							// Layout
							var formLayout_3 = new cpr.controls.layouts.FormLayout();
							formLayout_3.scrollable = true;
							formLayout_3.topMargin = "5px";
							formLayout_3.rightMargin = "5px";
							formLayout_3.bottomMargin = "5px";
							formLayout_3.leftMargin = "5px";
							formLayout_3.setColumns(["85px", "1fr", "85px", "1fr"]);
							formLayout_3.setRows(["25px", "25px", "25px", "25px"]);
							group_10.setLayout(formLayout_3);
							(function(container){
								var output_11 = new cpr.controls.Output("otp9");
								output_11.value = "코드";
								output_11.style.setClasses(["require"]);
								container.addChild(output_11, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var output_12 = new cpr.controls.Output("otp10");
								output_12.value = "로드여부";
								output_12.style.setClasses(["require"]);
								container.addChild(output_12, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var output_13 = new cpr.controls.Output("otp11");
								output_13.value = "사용여부";
								container.addChild(output_13, {
									"colIndex": 0,
									"rowIndex": 2
								});
								var output_14 = new cpr.controls.Output("otp12");
								output_14.value = "코드명";
								output_14.style.setClasses(["require"]);
								container.addChild(output_14, {
									"colIndex": 2,
									"rowIndex": 0
								});
								var output_15 = new cpr.controls.Output("otp13");
								output_15.value = "출력여부";
								container.addChild(output_15, {
									"colIndex": 2,
									"rowIndex": 1
								});
								var output_16 = new cpr.controls.Output("otp14");
								output_16.value = "정렬순서";
								container.addChild(output_16, {
									"colIndex": 2,
									"rowIndex": 2
								});
								var output_17 = new cpr.controls.Output("otp16");
								output_17.value = "코드설명";
								container.addChild(output_17, {
									"colIndex": 0,
									"rowIndex": 3
								});
								var inputBox_1 = new cpr.controls.InputBox("ipbCnm");
								inputBox_1.fieldLabel = "코드명";
								inputBox_1.userAttr({"required": "Y"});
								inputBox_1.bind("value").toDataColumn("CNM");
								container.addChild(inputBox_1, {
									"colIndex": 3,
									"rowIndex": 0
								});
								var inputBox_2 = new cpr.controls.InputBox("ipbCd");
								inputBox_2.fieldLabel = "코드";
								inputBox_2.userAttr({"required": "Y"});
								inputBox_2.bind("value").toDataColumn("CD");
								container.addChild(inputBox_2, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var inputBox_3 = new cpr.controls.InputBox("ipbCdDesc");
								inputBox_3.bind("value").toDataColumn("CD_DESC");
								container.addChild(inputBox_3, {
									"colIndex": 1,
									"rowIndex": 3,
									"colSpan": 3,
									"rowSpan": 1
								});
								var inputBox_4 = new cpr.controls.InputBox("ipbStOd");
								inputBox_4.bind("value").toDataColumn("SORT_ODR");
								container.addChild(inputBox_4, {
									"colIndex": 3,
									"rowIndex": 2
								});
								var comboBox_1 = new cpr.controls.ComboBox("cmbLdYn");
								comboBox_1.fieldLabel = "로드여부";
								comboBox_1.userAttr({"required": "Y"});
								comboBox_1.bind("value").toDataColumn("LOAD_YN");
								(function(comboBox_1){
									comboBox_1.addItem(new cpr.controls.Item("전체", ""));
									comboBox_1.setItemSet(app.lookup("dsCode03"), {
										"label": "cd_nm",
										"value": "cd"
									});
								})(comboBox_1);
								container.addChild(comboBox_1, {
									"colIndex": 1,
									"rowIndex": 1
								});
								var comboBox_2 = new cpr.controls.ComboBox("cmbUsYn");
								comboBox_2.bind("value").toDataColumn("USE_YN");
								(function(comboBox_2){
									comboBox_2.addItem(new cpr.controls.Item("전체", ""));
									comboBox_2.setItemSet(app.lookup("dsCode03"), {
										"label": "cd_nm",
										"value": "cd"
									});
								})(comboBox_2);
								container.addChild(comboBox_2, {
									"colIndex": 1,
									"rowIndex": 2
								});
								var comboBox_3 = new cpr.controls.ComboBox("cmbOtYn");
								comboBox_3.bind("value").toDataColumn("OUT_YN");
								(function(comboBox_3){
									comboBox_3.addItem(new cpr.controls.Item("전체", ""));
									comboBox_3.setItemSet(app.lookup("dsCode03"), {
										"label": "cd_nm",
										"value": "cd"
									});
								})(comboBox_3);
								container.addChild(comboBox_3, {
									"colIndex": 3,
									"rowIndex": 1
								});
							})(group_10);
							container.addChild(group_10, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdList");
							grid_1.fieldLabel = "그리드 제목";
							grid_1.userAttr({"bindDataFormId": "grpFreeForm"});
							grid_1.init({
								"dataSet": app.lookup("dsSubList"),
								"columns": [
									{"width": "100px"},
									{"width": "100px"},
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
												cell.targetColumnName = "CD";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "CD";
												cell.style.setClasses(["require"]);
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 1},
											"configurator": function(cell){
												cell.targetColumnName = "CNM";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "CNM";
												cell.style.setClasses(["require"]);
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 2},
											"configurator": function(cell){
												cell.targetColumnName = "CD_DESC";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "CD_DESC";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 3},
											"configurator": function(cell){
												cell.targetColumnName = "SORT_ODR";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "SORT_ODR";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 4},
											"configurator": function(cell){
												cell.targetColumnName = "LOAD_YN";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "LOAD_YN";
												cell.style.setClasses(["require"]);
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 5},
											"configurator": function(cell){
												cell.targetColumnName = "OUT_YN";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "OUT_YN";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 6},
											"configurator": function(cell){
												cell.targetColumnName = "USE_YN";
												cell.filterable = false;
												cell.sortable = false;
												cell.text = "USE_YN";
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
												cell.columnName = "CD";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 1},
											"configurator": function(cell){
												cell.columnName = "CNM";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 2},
											"configurator": function(cell){
												cell.columnName = "CD_DESC";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 3},
											"configurator": function(cell){
												cell.columnName = "SORT_ODR";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 4},
											"configurator": function(cell){
												cell.columnName = "LOAD_YN";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 5},
											"configurator": function(cell){
												cell.columnName = "OUT_YN";
											}
										},
										{
											"constraint": {"rowIndex": 0, "colIndex": 6},
											"configurator": function(cell){
												cell.columnName = "USE_YN";
											}
										}
									]
								}
							});
							container.addChild(grid_1, {
								"colIndex": 1,
								"rowIndex": 2
							});
							var group_11 = new cpr.controls.Container("grp8");
							// Layout
							var formLayout_4 = new cpr.controls.layouts.FormLayout();
							formLayout_4.scrollable = false;
							formLayout_4.topMargin = "0px";
							formLayout_4.rightMargin = "0px";
							formLayout_4.bottomMargin = "0px";
							formLayout_4.leftMargin = "0px";
							formLayout_4.horizontalSpacing = "5px";
							formLayout_4.verticalSpacing = "5px";
							formLayout_4.setColumns(["1fr", "60px", "100px"]);
							formLayout_4.setRows(["1fr"]);
							group_11.setLayout(formLayout_4);
							(function(container){
								var button_1 = new cpr.controls.Button("btnValidate");
								button_1.value = "필수값 체크";
								button_1.style.setClasses(["btn-primary"]);
								if(typeof onBtnValidateClick == "function") {
									button_1.addEventListener("click", onBtnValidateClick);
								}
								container.addChild(button_1, {
									"colIndex": 2,
									"rowIndex": 0
								});
								var button_2 = new cpr.controls.Button("btnInit");
								button_2.value = "초기화";
								button_2.style.setClasses(["btn-gray"]);
								if(typeof onBtnInitClick == "function") {
									button_2.addEventListener("click", onBtnInitClick);
								}
								container.addChild(button_2, {
									"colIndex": 1,
									"rowIndex": 0
								});
							})(group_11);
							container.addChild(group_11, {
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
					var group_12 = new cpr.controls.Container("grp4");
					// Layout
					var formLayout_5 = new cpr.controls.layouts.FormLayout();
					formLayout_5.userResizingMode = "standard";
					formLayout_5.topMargin = "0px";
					formLayout_5.rightMargin = "0px";
					formLayout_5.bottomMargin = "0px";
					formLayout_5.leftMargin = "0px";
					formLayout_5.horizontalSpacing = "5px";
					formLayout_5.verticalSpacing = "5px";
					formLayout_5.setColumns(["1fr", "470px"]);
					formLayout_5.setRows(["1fr"]);
					group_12.setLayout(formLayout_5);
					(function(container){
						var group_13 = new cpr.controls.Container("grp7");
						group_13.style.setClasses(["form-box"]);
						// Layout
						var verticalLayout_9 = new cpr.controls.layouts.VerticalLayout();
						group_13.setLayout(verticalLayout_9);
						(function(container){
							var userDefinedControl_2 = new udc.tmp.Ace("ace1");
							container.addChild(userDefinedControl_2, {
								"autoSize": "height",
								"width": "1275px",
								"height": "50px"
							});
						})(group_13);
						container.addChild(group_13, {
							"colIndex": 0,
							"rowIndex": 0,
							"colSpan": 2,
							"rowSpan": 1
						});
					})(group_12);
					container.addChild(group_12, {
						"autoSize": "height",
						"width": "1210px",
						"height": "50px"
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
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			// Linking
			linker.group_10.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "폼 내부 필수값 체크";
	cpr.core.Platform.INSTANCE.register(app);
})();
