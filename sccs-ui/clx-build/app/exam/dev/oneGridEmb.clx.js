/*
 * App URI: app/exam/dev/oneGridEmb
 * Source Location: app/exam/dev/oneGridEmb.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/dev/oneGridEmb", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * oneGridEmb.js
			 * Created at 2021. 7. 22. 오후 2:32:30.
			 *
			 * @author kim su hyun
			 ************************************************/
			
			var util = createCommonUtil();
			
			exports.doInsertDmParam = function doInsertDmParam(psParam) {
				util.DataMap.setValue(app, "dmParam", "strMstStudNo", psParam);
			}
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				util.DataMap.setValue(app, "dmParam", "strMstStudNo", app.getHost().initValue);
			}
			
			/*
			 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
			 * 저장 클릭 이벤트
			 */
			function onCombutton1Save(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.com.comButton
				 */
				var combutton1 = e.control;
				// 1. 데이터 변경사항 체크
				if (!util.Grid.isModified(app, "grdDetail", "MSG")) return false;
				
				// 2. 유효성 체크
				if (!util.validate(app, "grdDetail")) return false;
				
				// 3. 데이터 저장
				util.Submit.send(app, "subSaveDtl", function(pbSuccess){
					if(pbSuccess){
						doListDtl("save");
					}
				});
			}
			
			
			/**
			 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
			 */
			function doListDtl(psStatus){
				//조회 서브미션 호출
				util.Submit.send(app, "subListDtl", function(pbSuccess){
					if(pbSuccess) {
						if(psStatus == "save"){
							//갱신된 데이터가 조회되었습니다.
							util.Msg.notify(app, "INF-M005");
						}else{
							//조회되었습니다.
							util.Msg.notify(app, "INF-M001");
							util.DataMap.clear(app, "dmParam");
						}
						
					}
				});
			}
			
			/*
			 * 데이터맵에서 update 이벤트 발생 시 호출.
			 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
			 */
			function onDmParamUpdate(/* cpr.events.CDataEvent */ e){
				/** 
				 * @type cpr.data.DataMap
				 */
				var dmParam = e.control;
				doListDtl();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsDetail");
			dataSet_1.parseData({
				"info": "SCH_YEAR,SMT_RCD,STUD_NO,REG_CLS_RCD",
				"columns": [
					{
						"name": "SCH_YEAR",
						"dataType": "string"
					},
					{
						"name": "SMT_RCD",
						"dataType": "string"
					},
					{
						"name": "STUD_NO",
						"dataType": "string"
					},
					{
						"name": "REG_CLS_RCD",
						"dataType": "string"
					},
					{
						"name": "IFR_DT",
						"dataType": "string"
					},
					{
						"name": "PAY_CLOSE_DT",
						"dataType": "string"
					},
					{
						"name": "DIV_PAY_REQ_DT",
						"dataType": "string"
					},
					{
						"name": "DIV_PAY_DESC",
						"dataType": "string"
					},
					{
						"name": "DIV_PAY_TYPE_CD",
						"dataType": "string"
					},
					{
						"name": "DIV_PAY_STAT_RCD",
						"dataType": "string"
					},
					{
						"name": "DIV_PAY_NO",
						"dataType": "string"
					},
					{
						"name": "BKG_PNT",
						"dataType": "decimal"
					},
					{
						"name": "BKG_TIME",
						"dataType": "decimal"
					},
					{
						"name": "REG_STUD_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "REMARK",
						"dataType": "string"
					},
					{
						"name": "REF_KEY",
						"dataType": "string"
					}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSmtRcd");
			dataSet_2.parseData({
				"columns" : [
					{"name": "CD"},
					{"name": "CD_NM"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("dsRegClsRcd");
			dataSet_3.parseData({
				"columns" : [
					{"name": "CD"},
					{"name": "CD_NM"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("dsDivPayStatRcd");
			dataSet_4.parseData({
				"columns" : [
					{"name": "CD"},
					{"name": "CD_NM"}
				]
			});
			app.register(dataSet_4);
			
			var dataSet_5 = new cpr.data.DataSet("dsRegStudDivRcd");
			dataSet_5.parseData({
				"columns" : [
					{"name": "CD"},
					{"name": "CD_NM"}
				]
			});
			app.register(dataSet_5);
			var dataMap_1 = new cpr.data.DataMap("dmParam");
			dataMap_1.parseData({
				"columns" : [{"name": "strMstStudNo"}]
			});
			if(typeof onDmParamUpdate == "function") {
				dataMap_1.addEventListener("update", onDmParamUpdate);
			}
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subSaveDtl");
			submission_1.action = "/TwoGrid/saveDtl.do";
			submission_1.addRequestData(dataSet_1);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subListDtl");
			submission_2.action = "/TwoGrid/listDtl.do";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
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
				var userDefinedControl_1 = new udc.com.appHeader("appheader");
				userDefinedControl_1.searchBoxId = "grpSearch";
				container.addChild(userDefinedControl_1, {
					"width": "500px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "1310px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "5px";
			formLayout_1.verticalSpacing = "5px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["25px", "1fr"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var group_3 = new cpr.controls.Container("grp1");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr", "260px"]);
				formLayout_2.setRows(["1fr"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle("comtitle");
					container.addChild(userDefinedControl_2, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comButton("combutton");
					if(typeof onCombutton1Save == "function") {
						userDefinedControl_3.addEventListener("save", onCombutton1Save);
					}
					container.addChild(userDefinedControl_3, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdDetail");
				grid_1.fieldLabel = "학생등록정보";
				grid_1.init({
					"dataSet": app.lookup("dsDetail"),
					"columnMovable": true,
					"resizableColumns": "all",
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "100px"},
						{"width": "100px"},
						{
							"width": "100px",
							"visible": false
						},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
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
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.targetColumnName = "SCH_YEAR";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "학년도";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.targetColumnName = "SMT_RCD";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "학기";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.targetColumnName = "STUD_NO";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "학번";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.targetColumnName = "REG_CLS_RCD";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "등록분류";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.targetColumnName = "IFR_DT";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "고지일자";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.targetColumnName = "PAY_CLOSE_DT";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "납일일자";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.targetColumnName = "DIV_PAY_REQ_DT";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "분납요청일자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.targetColumnName = "DIV_PAY_DESC";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "분납내역";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.targetColumnName = "DIV_PAY_TYPE_CD";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "분납유형코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.targetColumnName = "DIV_PAY_STAT_RCD";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "분납상태코드";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.targetColumnName = "DIV_PAY_NO";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "분납번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.targetColumnName = "BKG_PNT";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "수강신청학점";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.targetColumnName = "BKG_TIME";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "수강신청시간";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.targetColumnName = "REG_STUD_DIV_RCD";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "등록생구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.targetColumnName = "REMARK";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "비고";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.targetColumnName = "REF_KEY";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "참조키";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "F";
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
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnType = "rowindex";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "SCH_YEAR";
									cell.control = (function(){
										var numberEditor_1 = new cpr.controls.NumberEditor("nbe3");
										numberEditor_1.min = 1900.0;
										numberEditor_1.max = 9999.0;
										numberEditor_1.bind("value").toDataColumn("SCH_YEAR");
										return numberEditor_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "SMT_RCD";
									cell.control = (function(){
										var comboBox_1 = new cpr.controls.ComboBox("cmb2");
										(function(comboBox_1){
											comboBox_1.setItemSet(app.lookup("dsSmtRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_1);
										comboBox_1.bind("value").toDataColumn("SMT_RCD");
										return comboBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "STUD_NO";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("ipb2");
										inputBox_1.bind("value").toDataColumn("STUD_NO");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "REG_CLS_RCD";
									cell.control = (function(){
										var comboBox_2 = new cpr.controls.ComboBox("cmb3");
										(function(comboBox_2){
											comboBox_2.setItemSet(app.lookup("dsRegClsRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_2);
										comboBox_2.bind("value").toDataColumn("REG_CLS_RCD");
										return comboBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "IFR_DT";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("dti4");
										dateInput_1.bind("value").toDataColumn("IFR_DT");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "PAY_CLOSE_DT";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("dti5");
										dateInput_2.bind("value").toDataColumn("PAY_CLOSE_DT");
										return dateInput_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "DIV_PAY_REQ_DT";
									cell.control = (function(){
										var dateInput_3 = new cpr.controls.DateInput("dti6");
										dateInput_3.bind("value").toDataColumn("DIV_PAY_REQ_DT");
										return dateInput_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "DIV_PAY_DESC";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("ipb3");
										inputBox_2.bind("value").toDataColumn("DIV_PAY_DESC");
										return inputBox_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "DIV_PAY_TYPE_CD";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("ipb4");
										inputBox_3.bind("value").toDataColumn("DIV_PAY_TYPE_CD");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "DIV_PAY_STAT_RCD";
									cell.control = (function(){
										var comboBox_3 = new cpr.controls.ComboBox("cmb4");
										(function(comboBox_3){
											comboBox_3.setItemSet(app.lookup("dsDivPayStatRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_3);
										comboBox_3.bind("value").toDataColumn("DIV_PAY_STAT_RCD");
										return comboBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "DIV_PAY_NO";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("ipb5");
										inputBox_4.bind("value").toDataColumn("DIV_PAY_NO");
										return inputBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "BKG_PNT";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("ipb6");
										inputBox_5.bind("value").toDataColumn("BKG_PNT");
										return inputBox_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "BKG_TIME";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("ipb7");
										inputBox_6.bind("value").toDataColumn("BKG_TIME");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "REG_STUD_DIV_RCD";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("cmb5");
										(function(comboBox_4){
											comboBox_4.setItemSet(app.lookup("dsRegStudDivRcd"), {
												"label": "CD_NM",
												"value": "CD"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("REG_STUD_DIV_RCD");
										return comboBox_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "REMARK";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("ipb8");
										inputBox_7.bind("value").toDataColumn("REMARK");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "REF_KEY";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("ipb9");
										inputBox_8.bind("value").toDataColumn("REF_KEY");
										return inputBox_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.control = (function(){
										var output_1 = new cpr.controls.Output();
										return output_1;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "1310px",
				"height": "640px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.grid = linker.grid_1;
		}
	});
	app.title = "템플릿(그리드)";
	cpr.core.Platform.INSTANCE.register(app);
})();
