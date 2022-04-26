/*
 * App URI: app/system/PUI_CM_039_01-01
 * Source Location: app/system/PUI_CM_039_01-01.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/system/PUI_CM_039_01-01", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * PUI_CM_039_01-01.js
			 * Created at 2022. 3. 31. 오후 3:27:38.
			 *
			 * @author ksk19
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
					{"name": "column5"},
					{"name": "column6"},
					{
						"name": "column7",
						"dataType": "string"
					},
					{"name": "column8"},
					{"name": "column10"},
					{"name": "column11"},
					{"name": "column12"},
					{"name": "column13"},
					{"name": "column14"},
					{"name": "column15"},
					{"name": "column18"},
					{"name": "column19"},
					{"name": "column20"},
					{"name": "column21"}
				],
				"rows": [
					{"column1": "123456", "column2": "홍길동", "column3": "운영부서", "column4": "계정잠김", "column5": "gildong@naver.com", "column6": "신시 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123457", "column2": "홍길순", "column3": "운영부서", "column4": "정상", "column5": "gildong@naver.com", "column6": "신시 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123458", "column2": "김명수", "column3": "운영부서", "column4": "정상", "column5": "gildong@naver.com", "column6": "신시 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123459", "column2": "김영희", "column3": "가력사무소", "column4": "정상", "column5": "gildong@naver.com", "column6": "가력 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123460", "column2": "김동수", "column3": "운영부서", "column4": "정상", "column5": "gildong@naver.com", "column6": "유지 관리부", "column7": "", "column11": "20211022"},
					{"column1": "123461", "column2": "김철수", "column3": "운영부서", "column4": "정상", "column5": "gildong@naver.com", "column6": "가력 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123462", "column2": "홍철수", "column3": "운영부서", "column4": "정상", "column5": "gildong@naver.com", "column6": "가력 상황실", "column7": "", "column11": "20211022"},
					{"column1": "123463", "column2": "최철수", "column3": "상황실", "column4": "탈퇴", "column5": "gildong@naver.com", "column6": "시설 운영부", "column7": "", "column11": "20211022"},
					{"column1": "123464", "column2": "이철수", "column3": "상황실", "column4": "가입승인 요청", "column5": "gildong@naver.com", "column6": "시설 운영부", "column7": "", "column11": "20211022"},
					{"column1": "123465", "column2": "양철수", "column3": "상황실", "column4": "가입승인 요청", "column5": "gildong@naver.com", "column6": "관리자", "column7": "", "column11": "20211022"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns": [{"name": "column1"}],
				"rows": [
					{"column1": "관리자"},
					{"column1": "신시 상황실"},
					{"column1": "가력 상황실"},
					{"column1": "시설 운영부"},
					{"column1": "유지 관리부"}
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
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				container.addChild(userDefinedControl_1, {
					"width": "500px",
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
				formLayout_1.scrollable = false;
				formLayout_1.topMargin = "5px";
				formLayout_1.rightMargin = "5px";
				formLayout_1.bottomMargin = "5px";
				formLayout_1.leftMargin = "5px";
				formLayout_1.setColumns(["120px", "200px", "120px", "200px", "1fr", "60px"]);
				formLayout_1.setRows(["25px", "25px"]);
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "권한";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var comboBox_1 = new cpr.controls.ComboBox("cmb3");
					(function(comboBox_1){
						comboBox_1.addItem(new cpr.controls.Item("관리자", "value1"));
						comboBox_1.addItem(new cpr.controls.Item("신시 상황실", "value2"));
						comboBox_1.addItem(new cpr.controls.Item("가력 상황실", "value3"));
						comboBox_1.addItem(new cpr.controls.Item("유지 관리부", "value4"));
						comboBox_1.addItem(new cpr.controls.Item("시설 운영부", "value5"));
					})(comboBox_1);
					container.addChild(comboBox_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "계정상태";
					container.addChild(output_2, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var comboBox_2 = new cpr.controls.ComboBox("cmb4");
					(function(comboBox_2){
						comboBox_2.addItem(new cpr.controls.Item("정상 ", "value1"));
						comboBox_2.addItem(new cpr.controls.Item("탈퇴", "value2"));
						comboBox_2.addItem(new cpr.controls.Item("계정잠김", "value3"));
						comboBox_2.addItem(new cpr.controls.Item("가입승인 요청", "value4"));
					})(comboBox_2);
					container.addChild(comboBox_2, {
						"colIndex": 3,
						"rowIndex": 0
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "검색";
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var comboBox_3 = new cpr.controls.ComboBox("cmb1");
					(function(comboBox_3){
						comboBox_3.addItem(new cpr.controls.Item("아이디", "value1"));
						comboBox_3.addItem(new cpr.controls.Item("성명", "value2"));
						comboBox_3.addItem(new cpr.controls.Item("부서명", "value3"));
						comboBox_3.addItem(new cpr.controls.Item("이메일", "value4"));
						comboBox_3.addItem(new cpr.controls.Item("권한", "value5"));
					})(comboBox_3);
					container.addChild(comboBox_3, {
						"colIndex": 1,
						"rowIndex": 1
					});
					var inputBox_1 = new cpr.controls.InputBox("ipbEName");
					inputBox_1.fieldLabel = "사원명";
					inputBox_1.userAttr({"autoKeydownSearch": "Y"});
					container.addChild(inputBox_1, {
						"colIndex": 2,
						"rowIndex": 1,
						"colSpan": 2,
						"rowSpan": 1,
						"verticalAlign": "fill"
					});
					var group_3 = new cpr.controls.Container("grp2");
					// Layout
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.setColumns(["3fr", "60px"]);
					formLayout_2.setRows(["25px"]);
					group_3.setLayout(formLayout_2);
					(function(container){
						var userDefinedControl_2 = new udc.com.comBtnSearch("btnSearch");
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
					"height": "65px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "1320px",
				"height": "108px"
			});
			
			var group_4 = new cpr.controls.Container("grpData");
			// Layout
			var formLayout_3 = new cpr.controls.layouts.FormLayout();
			formLayout_3.scrollable = false;
			formLayout_3.setColumns(["1fr"]);
			formLayout_3.setRows(["25px", "1fr"]);
			group_4.setLayout(formLayout_3);
			(function(container){
				var group_5 = new cpr.controls.Container("grp1");
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.topMargin = "0px";
				formLayout_4.rightMargin = "0px";
				formLayout_4.bottomMargin = "0px";
				formLayout_4.leftMargin = "0px";
				formLayout_4.horizontalSpacing = "5px";
				formLayout_4.verticalSpacing = "5px";
				formLayout_4.setColumns(["1fr", "195px"]);
				formLayout_4.setColumnAutoSizing(1, true);
				formLayout_4.setRows(["1fr"]);
				group_5.setLayout(formLayout_4);
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
						"rowIndex": 0,
						"horizontalAlign": "right",
						"width": 195
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdMain");
				grid_1.fieldLabel = "사용자 정보 등록";
				grid_1.init({
					"dataSet": app.lookup("ds1"),
					"resizableColumns": "3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16",
					"columns": [
						{"width": "25px"},
						{"width": "25px"},
						{"width": "40px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "100px"},
						{"width": "130px"},
						{"width": "130px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "75px"},
						{"width": "100px"},
						{"width": "75px"}
					],
					"header": {
						"rows": [{"height": "27px"}],
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
									cell.text = "No.";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.targetColumnName = "column1";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "아이디";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.targetColumnName = "column2";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "성명";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.targetColumnName = "column3";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "부서명";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.targetColumnName = "column4";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "계정상태";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.targetColumnName = "column5";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.targetColumnName = "column6";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "권한";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.targetColumnName = "column7";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "연락처(사무실)";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.targetColumnName = "column8";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "휴대폰 번호";
									cell.style.setClasses(["require"]);
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.targetColumnName = "column10";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "최근 접속일시";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.targetColumnName = "column11";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "등록일시";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.targetColumnName = "column12";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "등록자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.targetColumnName = "column13";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "수정일시";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.targetColumnName = "column14";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "수정자";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.targetColumnName = "column15";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "탈퇴신청일시";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.targetColumnName = "column18";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "초기화 비밀번호 부여";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.targetColumnName = "column19";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "가입승인";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.targetColumnName = "column20";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "계정잠김 해제";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.targetColumnName = "column21";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "탈퇴승인";
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
						"rows": [{"height": "25px"}],
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
									cell.control = (function(){
										var output_4 = new cpr.controls.Output();
										output_4.style.css({
											"text-align" : "center"
										});
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column1";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("ipb1");
										inputBox_2.bind("value").toDataColumn("column1");
										return inputBox_2;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column2";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("ipb2");
										inputBox_3.bind("value").toDataColumn("column2");
										return inputBox_3;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column3";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("ipb3");
										inputBox_4.bind("value").toDataColumn("column3");
										return inputBox_4;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.control = (function(){
										var inputBox_5 = new cpr.controls.InputBox("ipb5");
										inputBox_5.enabled = false;
										inputBox_5.bind("value").toDataColumn("column4");
										return inputBox_5;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var inputBox_6 = new cpr.controls.InputBox("ipb4");
										inputBox_6.bind("value").toDataColumn("column5");
										return inputBox_6;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.control = (function(){
										var comboBox_4 = new cpr.controls.ComboBox("cmb2");
										(function(comboBox_4){
											comboBox_4.setItemSet(app.lookup("ds2"), {
												"label": "column1",
												"value": "column1"
											});
										})(comboBox_4);
										comboBox_4.bind("value").toDataColumn("column6");
										return comboBox_4;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column7";
									cell.control = (function(){
										var maskEditor_1 = new cpr.controls.MaskEditor("mse1");
										maskEditor_1.mask = "000-0000-0000";
										maskEditor_1.bind("value").toDataColumn("column7");
										return maskEditor_1;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "column8";
									cell.control = (function(){
										var maskEditor_2 = new cpr.controls.MaskEditor("mse2");
										maskEditor_2.mask = "000-0000-0000";
										maskEditor_2.bind("value").toDataColumn("column8");
										return maskEditor_2;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "column10";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("dti1");
										dateInput_1.enabled = false;
										dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
										dateInput_1.bind("value").toDataColumn("column10");
										return dateInput_1;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "column11";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("dti2");
										dateInput_2.enabled = false;
										dateInput_2.mask = "YYYY-MM-DD HH:mm:ss";
										dateInput_2.bind("value").toDataColumn("column11");
										return dateInput_2;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "column12";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("ipb8");
										inputBox_7.enabled = false;
										inputBox_7.style.setClasses(["text-center"]);
										inputBox_7.bind("value").toDataColumn("column12");
										return inputBox_7;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "column13";
									cell.control = (function(){
										var dateInput_3 = new cpr.controls.DateInput("dti3");
										dateInput_3.enabled = false;
										dateInput_3.mask = "YYYY-MM-DD HH:mm:ss";
										dateInput_3.bind("value").toDataColumn("column13");
										return dateInput_3;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "column14";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("ipb10");
										inputBox_8.enabled = false;
										inputBox_8.style.setClasses(["text-center"]);
										inputBox_8.bind("value").toDataColumn("column14");
										return inputBox_8;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "column15";
									cell.control = (function(){
										var dateInput_4 = new cpr.controls.DateInput("dti4");
										dateInput_4.enabled = false;
										dateInput_4.mask = "YYYY-MM-DD HH:mm:ss";
										dateInput_4.bind("value").toDataColumn("column15");
										return dateInput_4;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.control = (function(){
										var button_1 = new cpr.controls.Button();
										button_1.value = "초기화 비밀번호 부여";
										button_1.style.setClasses(["btn-outline-primary"]);
										return button_1;
									})();
									cell.controlConstraint = {
										"topSpacing": 1,
										"rightSpacing": 1,
										"bottomSpacing": 1,
										"leftSpacing": 1
									};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.control = (function(){
										var button_2 = new cpr.controls.Button();
										button_2.value = "가입승인";
										button_2.style.setClasses(["btn-outline-primary"]);
										return button_2;
									})();
									cell.controlConstraint = {
										"topSpacing": 1,
										"rightSpacing": 1,
										"bottomSpacing": 1,
										"leftSpacing": 1
									};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.control = (function(){
										var button_3 = new cpr.controls.Button();
										button_3.value = "계정잠김 해제";
										button_3.style.setClasses(["btn-outline-primary"]);
										return button_3;
									})();
									cell.controlConstraint = {
										"topSpacing": 1,
										"rightSpacing": 1,
										"bottomSpacing": 1,
										"leftSpacing": 1
									};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 20},
								"configurator": function(cell){
									cell.control = (function(){
										var button_4 = new cpr.controls.Button();
										button_4.value = "탈퇴승인";
										button_4.style.setClasses(["btn-outline-primary"]);
										return button_4;
									})();
									cell.controlConstraint = {
										"topSpacing": 1,
										"rightSpacing": 1,
										"bottomSpacing": 1,
										"leftSpacing": 1
									};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.control = (function(){
										var output_5 = new cpr.controls.Output();
										return output_5;
									})();
									cell.controlConstraint = {};
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_4);
			container.addChild(group_4, {
				"autoSize": "none",
				"width": "1320px",
				"height": "573px"
			});
			// Linking
			linker.userDefinedControl_3.ctrl = linker.grid_1;
			linker.userDefinedControl_4.grid = linker.grid_1;
		}
	});
	app.title = "사용자정보 목록";
	cpr.core.Platform.INSTANCE.register(app);
})();
