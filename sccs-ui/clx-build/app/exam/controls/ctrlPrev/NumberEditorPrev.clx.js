/*
 * App URI: app/exam/controls/ctrlPrev/NumberEditorPrev
 * Source Location: app/exam/controls/ctrlPrev/NumberEditorPrev.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/controls/ctrlPrev/NumberEditorPrev", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "column1",
						"defaultValue": "2020"
					},
					{
						"name": "column2",
						"defaultValue": ""
					},
					{
						"name": "column3",
						"dataType": "number",
						"defaultValue": "12.59"
					},
					{
						"name": "column4",
						"dataType": "number",
						"defaultValue": "123456789123"
					},
					{
						"name": "column5",
						"dataType": "number",
						"defaultValue": "3000"
					},
					{
						"name": "column6",
						"dataType": "number",
						"defaultValue": "-123456"
					},
					{
						"name": "column7",
						"dataType": "number",
						"defaultValue": "32546789568120"
					},
					{
						"name": "column8",
						"dataType": "number",
						"defaultValue": "1234567.999"
					}
				]
			});
			app.register(dataMap_1);
			
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
			var group_1 = new cpr.controls.Container("grpSearch");
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 0;
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				userDefinedControl_1.initializeYn = "N";
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
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["25px", "1fr"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output("opt7");
				output_1.value = "넘버에디터(NumberEditor)는 숫자를 입력하는 컨트롤입니다.";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_3 = new cpr.controls.Container("grp1");
				group_3.style.setClasses(["cl-form-group"]);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "5px";
				formLayout_2.rightMargin = "5px";
				formLayout_2.bottomMargin = "5px";
				formLayout_2.leftMargin = "5px";
				formLayout_2.horizontalSpacing = "5px";
				formLayout_2.verticalSpacing = "5px";
				formLayout_2.horizontalSeparatorWidth = 1;
				formLayout_2.verticalSeparatorWidth = 1;
				formLayout_2.setColumns(["1fr", "1fr", "2fr"]);
				formLayout_2.setUseColumnShade(0, true);
				formLayout_2.setRows(["50px", "40px", "40px", "40px", "40px", "30px", "30px", "30px", "30px", "30px", "60px", "40px", "30px", "30px", "40px"]);
				formLayout_2.setRowAutoSizing(0, true);
				formLayout_2.setRowAutoSizing(1, true);
				formLayout_2.setRowAutoSizing(2, true);
				formLayout_2.setRowAutoSizing(3, true);
				formLayout_2.setRowAutoSizing(4, true);
				formLayout_2.setRowAutoSizing(5, true);
				formLayout_2.setRowAutoSizing(6, true);
				formLayout_2.setRowAutoSizing(7, true);
				formLayout_2.setRowAutoSizing(8, true);
				formLayout_2.setRowAutoSizing(9, true);
				formLayout_2.setRowAutoSizing(10, true);
				formLayout_2.setRowAutoSizing(11, true);
				formLayout_2.setRowAutoSizing(12, true);
				formLayout_2.setRowAutoSizing(13, true);
				formLayout_2.setRowAutoSizing(14, true);
				group_3.setLayout(formLayout_2);
				(function(container){
					var output_2 = new cpr.controls.Output("opt1");
					output_2.value = "[min = 1900.0]\r\n1. 넘버에디터에 1900을 입력한다.\r\n2. 우측 아래 화살표를 클릭한다.\r\n3. 숫자가 내려가지 않는다.";
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var output_3 = new cpr.controls.Output("opt3");
					output_3.value = "[format = 999,999,999,999]\r\n1. 넘버데이터에 숫자를 더 입력한다.\r\n2. 12자리 이상은 입력되지 않는다.";
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var output_4 = new cpr.controls.Output("opt4");
					output_4.value = "[format = 999,999,999,990]\r\n1. 넘버에디터에 값이 없을 때 0이 표시된다.";
					container.addChild(output_4, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var output_5 = new cpr.controls.Output("opt5");
					output_5.value = "[format = 99.99]\r\n1. 넘버에디터에 소수점 둘째 자리까지 입력된다.";
					container.addChild(output_5, {
						"colIndex": 0,
						"rowIndex": 3
					});
					var output_6 = new cpr.controls.Output("opt6");
					output_6.value = "[spinButton = false]\r\n1. 스핀버튼이 보이지 않는다.";
					container.addChild(output_6, {
						"colIndex": 0,
						"rowIndex": 5
					});
					var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
					numberEditor_1.min = 1900.0;
					numberEditor_1.max = 9999.0;
					numberEditor_1.format = "9999";
					numberEditor_1.bind("value").toDataMap(app.lookup("dm1"), "column1");
					container.addChild(numberEditor_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var numberEditor_2 = new cpr.controls.NumberEditor("nbe3");
					numberEditor_2.format = "999,999,999,999";
					numberEditor_2.bind("value").toDataMap(app.lookup("dm1"), "column4");
					container.addChild(numberEditor_2, {
						"colIndex": 1,
						"rowIndex": 1
					});
					var numberEditor_3 = new cpr.controls.NumberEditor("nbe4");
					numberEditor_3.format = "999,999,999,990";
					numberEditor_3.bind("value").toDataMap(app.lookup("dm1"), "column2");
					container.addChild(numberEditor_3, {
						"colIndex": 1,
						"rowIndex": 2
					});
					var numberEditor_4 = new cpr.controls.NumberEditor("nbe5");
					numberEditor_4.format = "99.99";
					numberEditor_4.bind("value").toDataMap(app.lookup("dm1"), "column3");
					container.addChild(numberEditor_4, {
						"colIndex": 1,
						"rowIndex": 3
					});
					var numberEditor_5 = new cpr.controls.NumberEditor("nbe6");
					numberEditor_5.spinButton = false;
					numberEditor_5.bind("value").toDataMap(app.lookup("dm1"), "column5");
					container.addChild(numberEditor_5, {
						"colIndex": 1,
						"rowIndex": 5
					});
					var output_7 = new cpr.controls.Output("opt8");
					output_7.value = "[format = s999,999]\r\n1. 넘버에디터에 음수 입력이 가능하다.";
					container.addChild(output_7, {
						"colIndex": 0,
						"rowIndex": 4
					});
					var numberEditor_6 = new cpr.controls.NumberEditor("nbe7");
					numberEditor_6.format = "s999,999";
					numberEditor_6.bind("value").toDataMap(app.lookup("dm1"), "column6");
					container.addChild(numberEditor_6, {
						"colIndex": 1,
						"rowIndex": 4
					});
					var output_8 = new cpr.controls.Output("opt9");
					output_8.readOnly = true;
					output_8.value = "[readOnly = true]\r\n1. 넘버에디터에 숫자를 입력한다.\r\n2. 입력 되지 않는다.\r\n3. 스핀버튼을 클릭한다.\r\n4. 숫자가 증감하지 않는다.";
					container.addChild(output_8, {
						"colIndex": 0,
						"rowIndex": 6
					});
					var numberEditor_7 = new cpr.controls.NumberEditor("nbe8");
					numberEditor_7.readOnly = true;
					numberEditor_7.bind("value").toDataMap(app.lookup("dm1"), "column7");
					container.addChild(numberEditor_7, {
						"colIndex": 1,
						"rowIndex": 6
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = "[step = 10]\r\n1. 스핀버튼을 클릭한다.\r\n2. 10씩 증감한다.";
					container.addChild(output_9, {
						"colIndex": 0,
						"rowIndex": 7
					});
					var output_10 = new cpr.controls.Output();
					output_10.value = "[preventInput = true]\r\n1. 넘버에디터에 숫자를 입력한다.\r\n2. 입력 되지 않는다.\r\n3. 스핀버튼을 클릭한다.\r\n4. 숫자가 증감한다.";
					container.addChild(output_10, {
						"colIndex": 0,
						"rowIndex": 8
					});
					var numberEditor_8 = new cpr.controls.NumberEditor("nbe9");
					numberEditor_8.step = 10.0;
					numberEditor_8.bind("value").toDataMap(app.lookup("dm1"), "column1");
					container.addChild(numberEditor_8, {
						"colIndex": 1,
						"rowIndex": 7
					});
					var numberEditor_9 = new cpr.controls.NumberEditor("nbe10");
					numberEditor_9.preventInput = true;
					container.addChild(numberEditor_9, {
						"colIndex": 1,
						"rowIndex": 8
					});
					var output_11 = new cpr.controls.Output();
					output_11.value = "[autoSelect = true]\r\n1. 넘버에디터를 클릭한다.\r\n2. 수 전체가 선택된다.";
					container.addChild(output_11, {
						"colIndex": 0,
						"rowIndex": 9
					});
					var output_12 = new cpr.controls.Output();
					output_12.value = "[showClearButton = true]\r\n[buttonFocusable = true]\r\n1. 넘버에디터에 숫자를 클릭한다.\r\n2. Tab 키를 누른다.\r\n3. x 표시로 포커스가 이동한다.\r\n4. x 표시를 누르면 숫자가 지워진다.";
					container.addChild(output_12, {
						"colIndex": 0,
						"rowIndex": 10
					});
					var numberEditor_10 = new cpr.controls.NumberEditor("nbe11");
					numberEditor_10.autoSelect = true;
					numberEditor_10.bind("value").toDataMap(app.lookup("dm1"), "column1");
					container.addChild(numberEditor_10, {
						"colIndex": 1,
						"rowIndex": 9
					});
					var numberEditor_11 = new cpr.controls.NumberEditor("nbe12");
					numberEditor_11.showClearButton = true;
					numberEditor_11.buttonFocusable = true;
					numberEditor_11.bind("value").toDataMap(app.lookup("dm1"), "column1");
					container.addChild(numberEditor_11, {
						"colIndex": 1,
						"rowIndex": 10
					});
					var numberEditor_12 = new cpr.controls.NumberEditor("nbe13");
					numberEditor_12.enabledInputMask = false;
					numberEditor_12.bind("value").toDataMap(app.lookup("dm1"), "column4");
					container.addChild(numberEditor_12, {
						"colIndex": 1,
						"rowIndex": 11
					});
					var output_13 = new cpr.controls.Output();
					output_13.value = "[enabledInputMask = false]\r\n1. 넘버에디터에 숫자를 입력한다.\r\n2. 숫자가 마스킹 되지 않는다.";
					container.addChild(output_13, {
						"colIndex": 0,
						"rowIndex": 11
					});
					var output_14 = new cpr.controls.Output();
					output_14.value = "[displayExp = \"$\" + text]\r\n1. 숫자에 $ 표시가 붙는다.";
					container.addChild(output_14, {
						"colIndex": 0,
						"rowIndex": 12
					});
					var numberEditor_13 = new cpr.controls.NumberEditor("nbe14");
					numberEditor_13.displayExp = "\"$\" + text";
					numberEditor_13.bind("value").toDataMap(app.lookup("dm1"), "column4");
					container.addChild(numberEditor_13, {
						"colIndex": 1,
						"rowIndex": 12
					});
					var output_15 = new cpr.controls.Output();
					output_15.value = "[소수 구분자 decimalSeparator = ?]\r\n[정수 구분자 digitGroupSeparator = !]\r\n1. 정수 구분은 !, 소수 구분은 ?로 표시된다.";
					container.addChild(output_15, {
						"colIndex": 0,
						"rowIndex": 14
					});
					var output_16 = new cpr.controls.Output();
					output_16.value = "[placeholder = '숫자를 입력하세요']\r\n1. 넘버에디터에 '숫자를 입력하세요'라는 텍스트가 보인다.";
					container.addChild(output_16, {
						"colIndex": 0,
						"rowIndex": 13
					});
					var numberEditor_14 = new cpr.controls.NumberEditor("nbe15");
					numberEditor_14.placeholder = "숫자를 입력하세요";
					container.addChild(numberEditor_14, {
						"colIndex": 1,
						"rowIndex": 13
					});
					var numberEditor_15 = new cpr.controls.NumberEditor("nbe16");
					numberEditor_15.format = "s#,##0.###";
					numberEditor_15.decimalSeparator = "?";
					numberEditor_15.digitGroupSeparator = "!";
					numberEditor_15.bind("value").toDataMap(app.lookup("dm1"), "column8");
					container.addChild(numberEditor_15, {
						"colIndex": 1,
						"rowIndex": 14
					});
					var group_4 = new cpr.controls.Container("grp2");
					group_4.style.setClasses(["form-box"]);
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.scrollable = false;
					formLayout_3.topMargin = "0px";
					formLayout_3.rightMargin = "0px";
					formLayout_3.bottomMargin = "0px";
					formLayout_3.leftMargin = "0px";
					formLayout_3.horizontalSpacing = "0px";
					formLayout_3.verticalSpacing = "0px";
					formLayout_3.setColumns(["100px", "1fr"]);
					formLayout_3.setUseColumnShade(0, true);
					formLayout_3.setRows(["30px", "30px", "30px", "30px", "30px", "30px", "30px", "200px", "1fr"]);
					formLayout_3.setRowAutoSizing(2, true);
					formLayout_3.setRowAutoSizing(3, true);
					formLayout_3.setRowAutoSizing(4, true);
					formLayout_3.setRowAutoSizing(5, true);
					formLayout_3.setRowAutoSizing(6, true);
					formLayout_3.setRowAutoSizing(7, true);
					group_4.setLayout(formLayout_3);
					(function(container){
						var output_17 = new cpr.controls.Output();
						output_17.value = "포맷";
						output_17.style.setClasses(["cl-form-group"]);
						output_17.style.css({
							"text-align" : "center"
						});
						container.addChild(output_17, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var output_18 = new cpr.controls.Output();
						output_18.value = "s";
						output_18.style.setClasses(["cl-form-group"]);
						output_18.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_18, {
							"colIndex": 0,
							"rowIndex": 2
						});
						var output_19 = new cpr.controls.Output();
						output_19.value = "0";
						output_19.style.setClasses(["cl-form-group"]);
						output_19.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_19, {
							"colIndex": 0,
							"rowIndex": 3
						});
						var output_20 = new cpr.controls.Output();
						output_20.value = "9";
						output_20.style.setClasses(["cl-form-group"]);
						output_20.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_20, {
							"colIndex": 0,
							"rowIndex": 4
						});
						var output_21 = new cpr.controls.Output();
						output_21.value = ",";
						output_21.style.setClasses(["cl-form-group"]);
						output_21.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_21, {
							"colIndex": 0,
							"rowIndex": 5
						});
						var output_22 = new cpr.controls.Output();
						output_22.value = ".";
						output_22.style.setClasses(["cl-form-group"]);
						output_22.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_22, {
							"colIndex": 0,
							"rowIndex": 6
						});
						var output_23 = new cpr.controls.Output();
						output_23.value = "#";
						output_23.style.setClasses(["cl-form-group"]);
						output_23.style.css({
							"padding-right" : "20px"
						});
						container.addChild(output_23, {
							"colIndex": 0,
							"rowIndex": 7
						});
						var output_24 = new cpr.controls.Output();
						output_24.value = "Format 종류";
						output_24.style.css({
							"text-align" : "center"
						});
						container.addChild(output_24, {
							"colIndex": 0,
							"rowIndex": 0,
							"colSpan": 2,
							"rowSpan": 1
						});
						var output_25 = new cpr.controls.Output();
						output_25.value = "설명";
						output_25.style.setClasses(["cl-form-group"]);
						output_25.style.css({
							"text-align" : "center"
						});
						container.addChild(output_25, {
							"colIndex": 1,
							"rowIndex": 1
						});
						var output_26 = new cpr.controls.Output();
						output_26.value = "음수/양수 문자 표시 여부. 첫 번째로 지정해야 동작합니다.";
						output_26.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_26, {
							"colIndex": 1,
							"rowIndex": 2
						});
						var output_27 = new cpr.controls.Output();
						output_27.value = "[0~9]입력 받으며 값이 없으면 0을 채웁니다. 설정된 길이만큼 포맷팅됩니다.";
						output_27.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_27, {
							"colIndex": 1,
							"rowIndex": 3
						});
						var output_28 = new cpr.controls.Output();
						output_28.value = "[0~9]입력 받으며 값이 없으면 채우지 않습니다. 설정된 길이만큼 포맷팅됩니다.";
						output_28.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_28, {
							"colIndex": 1,
							"rowIndex": 4
						});
						var output_29 = new cpr.controls.Output();
						output_29.value = "숫자 구분자 콤마를 표시합니다.";
						output_29.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_29, {
							"colIndex": 1,
							"rowIndex": 5
						});
						var output_30 = new cpr.controls.Output();
						output_30.value = "소수점을 표시합니다.";
						output_30.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_30, {
							"colIndex": 1,
							"rowIndex": 6
						});
						var output_31 = new cpr.controls.Output();
						output_31.value = "[0~9]입력 받으며 값이 없으면 채우지 않습니다. 이 포맷팅은 길이 제한 없는 숫자입력이 설정됩니다.\r\n포맷의 정수부 또는 소수부의 마지막에 '#'문자가 입력이 되어 있으면 무제한으로 입력이 가능합니다.\r\n중간에 문자가 입력되어 있는 경우 포맷 문자 '9'와 같습니다.";
						output_31.style.css({
							"background-color" : "#ffffff",
							"padding-left" : "10px",
							"text-align" : "left"
						});
						container.addChild(output_31, {
							"colIndex": 1,
							"rowIndex": 7
						});
						var group_5 = new cpr.controls.Container("grp3");
						// Layout
						var xYLayout_1 = new cpr.controls.layouts.XYLayout();
						group_5.setLayout(xYLayout_1);
						(function(container){
						})(group_5);
						container.addChild(group_5, {
							"colIndex": 0,
							"rowIndex": 8,
							"colSpan": 2,
							"rowSpan": 1
						});
					})(group_4);
					container.addChild(group_4, {
						"colIndex": 2,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 15
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "400px",
				"height": "644px"
			});
		}
	});
	app.title = "넘버에디터 관련 속성";
	cpr.core.Platform.INSTANCE.register(app);
})();
