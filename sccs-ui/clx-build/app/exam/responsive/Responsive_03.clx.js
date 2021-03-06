/*
 * App URI: app/exam/responsive/Responsive_03
 * Source Location: app/exam/responsive/Responsive_03.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/responsive/Responsive_03", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Responsive_03.js
			 * Created at 2021. 8. 19. 오전 11:30:50.
			 *
			 * @author ryu
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column0"},
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"}
				],
				"rows": [
					{"column1": "20200210", "column2": "NIN-2019-00232", "column3": "한사랑보험", "column4": "94000000", "column5": "여(2019-09-16 13:57)", "column6": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column7": "여(2019-09-16 13:57)", "column8": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column9": "여(2019-09-16 13:57)"},
					{"column1": "20200211", "column2": "NIN-2019-00232", "column3": "한사랑보험", "column4": "94000000", "column5": "여(2019-09-16 13:57)", "column6": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column7": "여(2019-09-16 13:57)", "column8": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column9": "여(2019-09-16 13:57)"},
					{"column1": "20200212", "column2": "NIN-2019-00232", "column3": "한사랑보험", "column4": "94000000", "column5": "여(2019-09-16 13:57)", "column6": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column7": "여(2019-09-16 13:57)", "column8": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column9": "여(2019-09-16 13:57)"},
					{"column1": "20200213", "column2": "NIN-2019-00232", "column3": "한사랑보험", "column4": "94000000", "column5": "여(2019-09-16 13:57)", "column6": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column7": "여(2019-09-16 13:57)", "column8": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column9": "여(2019-09-16 13:57)"},
					{"column1": "20200214", "column2": "NIN-2019-00232", "column3": "한사랑보험", "column4": "94000000", "column5": "여(2019-09-16 13:57)", "column6": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column7": "여(2019-09-16 13:57)", "column8": "여(2019-09-16 13:57) 여(2019-09-16 13:57)", "column9": "여(2019-09-16 13:57)"}
				]
			});
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1400px)", "default");
			app.supportMedia("all and (min-width: 800px) and (max-width: 1399px)", "tablet");
			app.supportMedia("all and (max-width: 799px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.leftMargin = 0;
			verticalLayout_1.rightMargin = 0;
			verticalLayout_1.topMargin = 0;
			verticalLayout_1.bottomMargin = 0;
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grpHeader");
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				userDefinedControl_1.searchBoxId = "grpHeader";
				container.addChild(userDefinedControl_1, {
					"width": "500px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"width": "1400px",
				"height": "30px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comTitle("comtitle1");
				container.addChild(userDefinedControl_2, {
					"width": "300px",
					"height": "25px"
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grd2");
				grid_1.fieldLabel = "데이터확인용";
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("ds1"),
					"columnMovable": true,
					"resizableColumns": "all",
					"columns": [
						{"width": "80px"},
						{"width": "100px"},
						{"width": "120px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"}
					],
					"header": {
						"rows": [
							{"height": "35px"},
							{"height": "35px"}
						],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column1";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "제한 확정일";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column2";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험 증권번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column3";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험종류";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column4";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험금액";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 5},
								"configurator": function(cell){
									cell.targetColumnName = "column5";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "사전동의서 작성";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 6},
								"configurator": function(cell){
									cell.targetColumnName = "column6";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 7},
								"configurator": function(cell){
									cell.targetColumnName = "column7";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "사전동의서 작성";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 8},
								"configurator": function(cell){
									cell.targetColumnName = "column8";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 9},
								"configurator": function(cell){
									cell.targetColumnName = "column9";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column0";
									cell.text = "선택";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5, "rowSpan": 1, "colSpan": 5},
								"configurator": function(cell){
									cell.text = "진행단계";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "35px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
									cell.control = (function(){
										var output_1 = new cpr.controls.Output();
										output_1.value = "Output";
										output_1.style.setClasses(["text-center"]);
										output_1.bind("value").toDataColumn("column1");
										return output_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
									cell.control = (function(){
										var output_2 = new cpr.controls.Output();
										output_2.value = "Output";
										output_2.style.setClasses(["text-center"]);
										output_2.bind("value").toDataColumn("column2");
										return output_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
									cell.control = (function(){
										var output_3 = new cpr.controls.Output();
										output_3.value = "Output";
										output_3.style.setClasses(["text-center"]);
										output_3.bind("value").toDataColumn("column3");
										return output_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.control = (function(){
										var output_4 = new cpr.controls.Output();
										output_4.value = "Output";
										output_4.style.setClasses(["text-center"]);
										output_4.bind("value").toDataColumn("column4");
										return output_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var output_5 = new cpr.controls.Output();
										output_5.value = "Output";
										output_5.style.setClasses(["text-center"]);
										output_5.bind("value").toDataColumn("column5");
										return output_5;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.control = (function(){
										var output_6 = new cpr.controls.Output();
										output_6.value = "Output";
										output_6.style.setClasses(["text-center"]);
										output_6.bind("value").toDataColumn("column6");
										return output_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column7";
									cell.control = (function(){
										var output_7 = new cpr.controls.Output();
										output_7.value = "Output";
										output_7.style.setClasses(["text-center"]);
										output_7.bind("value").toDataColumn("column7");
										return output_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column8";
									cell.control = (function(){
										var output_8 = new cpr.controls.Output();
										output_8.value = "Output";
										output_8.style.setClasses(["text-center"]);
										output_8.bind("value").toDataColumn("column8");
										return output_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column9";
									cell.control = (function(){
										var output_9 = new cpr.controls.Output();
										output_9.value = "Output";
										output_9.style.setClasses(["text-center"]);
										output_9.bind("value").toDataColumn("column9");
										return output_9;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnName = "column0";
									cell.control = (function(){
										var checkBox_1 = new cpr.controls.CheckBox("cbx2");
										checkBox_1.style.setClasses(["text-center"]);
										checkBox_1.bind("value").toDataColumn("column0");
										return checkBox_1;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"autoSize": "height",
					"width": "400px",
					"height": "200px"
				});
				var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comFormTitle("comformtitle1");
				container.addChild(userDefinedControl_3, {
					"width": "300px",
					"height": "25px"
				});
				var grid_2 = linker.grid_2 = new cpr.controls.Grid("grd1");
				grid_2.fieldLabel = "공통모듈 적용된 컨트롤";
				grid_2.readOnly = true;
				grid_2.userAttr({
					"transform-on-mobile": "true",
					"hide-column-indicies": "5,6,7,8,9,10"
				});
				grid_2.init({
					"dataSet": app.lookup("ds1"),
					"columnMovable": true,
					"autoFit": "1, 2, 3, 4, 5, 6, 7, 8, 9",
					"resizableColumns": "all",
					"columns": [
						{"width": "80px"},
						{"width": "100px"},
						{"width": "120px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"},
						{"width": "150px"}
					],
					"header": {
						"rows": [
							{"height": "35px"},
							{"height": "35px"}
						],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column1";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "제한 확정일";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column2";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험 증권번호";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column3";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험종류";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column4";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "보험금액";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 5},
								"configurator": function(cell){
									cell.targetColumnName = "column5";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "사전동의서 작성";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 6},
								"configurator": function(cell){
									cell.targetColumnName = "column6";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 7},
								"configurator": function(cell){
									cell.targetColumnName = "column7";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "사전동의서 작성";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 8},
								"configurator": function(cell){
									cell.targetColumnName = "column8";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 9},
								"configurator": function(cell){
									cell.targetColumnName = "column9";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이메일 인증";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5, "rowSpan": 1, "colSpan": 5},
								"configurator": function(cell){
									cell.text = "진행단계";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.targetColumnName = "column0";
									cell.text = "선택";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "35px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
									cell.control = (function(){
										var output_10 = new cpr.controls.Output();
										output_10.value = "Output";
										output_10.dataType = "date";
										output_10.format = "YYYY-MM-DD";
										output_10.style.setClasses(["text-center"]);
										output_10.bind("value").toDataColumn("column1");
										return output_10;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
									cell.control = (function(){
										var output_11 = new cpr.controls.Output();
										output_11.value = "Output";
										output_11.style.setClasses(["text-center"]);
										output_11.bind("value").toDataColumn("column2");
										return output_11;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
									cell.control = (function(){
										var output_12 = new cpr.controls.Output();
										output_12.value = "Output";
										output_12.style.setClasses(["text-center"]);
										output_12.bind("value").toDataColumn("column3");
										return output_12;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.control = (function(){
										var output_13 = new cpr.controls.Output();
										output_13.value = "Output";
										output_13.dataType = "number";
										output_13.format = "s#,##0";
										output_13.displayExp = "text + \"원\"";
										output_13.style.setClasses(["text-center"]);
										output_13.bind("value").toDataColumn("column4");
										return output_13;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var output_14 = new cpr.controls.Output();
										output_14.value = "Output";
										output_14.style.setClasses(["text-center"]);
										output_14.bind("value").toDataColumn("column5");
										return output_14;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.control = (function(){
										var output_15 = new cpr.controls.Output();
										output_15.value = "Output";
										output_15.style.setClasses(["text-center"]);
										output_15.bind("value").toDataColumn("column6");
										return output_15;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column7";
									cell.control = (function(){
										var output_16 = new cpr.controls.Output();
										output_16.value = "Output";
										output_16.style.setClasses(["text-center"]);
										output_16.bind("value").toDataColumn("column7");
										return output_16;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column8";
									cell.control = (function(){
										var output_17 = new cpr.controls.Output();
										output_17.value = "Output";
										output_17.style.setClasses(["text-center"]);
										output_17.bind("value").toDataColumn("column8");
										return output_17;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column9";
									cell.control = (function(){
										var output_18 = new cpr.controls.Output();
										output_18.value = "Output";
										output_18.style.setClasses(["text-center"]);
										output_18.bind("value").toDataColumn("column9");
										return output_18;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnName = "column0";
									cell.control = (function(){
										var checkBox_2 = new cpr.controls.CheckBox("cbx1");
										checkBox_2.style.setClasses(["text-center"]);
										checkBox_2.bind("value").toDataColumn("column0");
										return checkBox_2;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_2, {
					"autoSize": "height",
					"width": "400px",
					"height": "200px"
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "1400px",
				"height": "465px"
			});
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
			linker.userDefinedControl_3.ctrl = linker.grid_2;
		}
	});
	app.title = "Responsive_03";
	cpr.core.Platform.INSTANCE.register(app);
})();
