/*
 * App URI: app/exam/guide/grid/prev/GridSampleEtc02Prev
 * Source Location: app/exam/guide/grid/prev/GridSampleEtc02Prev.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/grid/prev/GridSampleEtc02Prev", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * GridSampleEtc02.js
			 * Created at 2020. 6. 2. 오후 2:37:47.
			 *
			 * @author 1073727
			 ************************************************/
			
			var util = createCommonUtil();
			
			/*
			 * Body에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit( /* cpr.events.CEvent */ e) {
				util.Grid.init(app, "grdList");
				util.FreeForm.init(app, ["grpFormCont"]);
			}
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
			app.supportMedia("all and (min-width: 500px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var userDefinedControl_1 = new udc.com.appHeader("appheader");
			userDefinedControl_1.initializeYn = "N";
			userDefinedControl_1.groupBoxIds = "grp1";
			container.addChild(userDefinedControl_1, {
				"autoSize": "none",
				"width": "998px",
				"height": "30px"
			});
			
			var group_1 = new cpr.controls.Container("grp1");
			group_1.userAttr({"fillLayout": "Y"});
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["25px", "1fr", "25px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comFormTitle("comformtitle3");
				container.addChild(userDefinedControl_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdList");
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
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comFormTitle("comformtitle2");
				container.addChild(userDefinedControl_3, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var group_2 = new cpr.controls.Container("grpFormCont");
				group_2.style.setClasses(["form-box"]);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "5px";
				formLayout_2.rightMargin = "5px";
				formLayout_2.bottomMargin = "5px";
				formLayout_2.leftMargin = "5px";
				formLayout_2.setColumns(["100px", "1fr"]);
				formLayout_2.setRows(["1fr", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output("otp25");
					output_1.value = "시나리오";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var output_2 = new cpr.controls.Output("otp26");
					output_2.value = "추가설명";
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var textArea_1 = new cpr.controls.TextArea("txa1");
					textArea_1.readOnly = true;
					textArea_1.value = "1. 데이터셋 의 컬럼 expression 사용방법 및 기능동작을 확인한다.\r\n2. 그리드내 콤보박스의 바인딩(label/value) 방법 및 기능동작을 확인한다. \r\n";
					container.addChild(textArea_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var textArea_2 = new cpr.controls.TextArea("txa2");
					textArea_2.readOnly = true;
					textArea_2.value = "1. 데이터 셋 - 컬럼(expression), 콤보박스 - label / value 이용\r\n2. 데이터셋의 익스프레션을 이용하여 출력된 구분명과 콤보 구분명이 동일한지 확인한다.\r\n3. 그리드의 행의 배경색 - 그리드를 선택한 후 바인딩 - 스타일속성- rowStyle  (상대컬럼 바인딩) - background-color\r\n4. 그리드의 열의 폰트색 - 그리드편집기에서 열의 디테일 영역을 선택한 후 바인딩 - 스타일속성- color - (상대컬럼 바인딩)";
					container.addChild(textArea_2, {
						"colIndex": 1,
						"rowIndex": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 3
				});
			})(group_1);
			container.addChild(group_1, {
				"width": "972px",
				"height": "645px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.ctrl = linker.grid_1;
		}
	});
	app.title = "데이터셋 익스프레션 예제";
	cpr.core.Platform.INSTANCE.register(app);
})();
