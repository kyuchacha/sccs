/*
 * App URI: app/exam/guide/move/Sample01Sub1
 * Source Location: app/exam/guide/move/Sample01Sub1.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/guide/move/Sample01Sub1", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * MoveSample01Sub1.js
			 * Created at 2020. 5. 15. 오전 10:11:32.
			 *
			 * @author 1073727
			 ************************************************/
			
			var util = createCommonUtil();
			
			/*
			 * Body에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit( /* cpr.events.CEvent */ e) {
				util.FreeForm.init(app, ["grpSubForm1"]);
			}
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad( /* cpr.events.CEvent */ e) {
				
				var vsInitValue = app.getHostProperty("initValue");
				
				//alert(vsInitValue.initA);
				var opt1 = app.lookup("optParam");
				
				opt1.value = vsInitValue.initValue1 + ", " + vsInitValue.initValue2 + ", " + vsInitValue.initValue3;
			}
			// End - User Script
			
			// Header
			
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
			var group_1 = new cpr.controls.Container("grp1");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "15px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container("grp2");
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["26px", "180px", "30px", "30px", "1fr"]);
				formLayout_2.setRowAutoSizing(1, true);
				group_2.setLayout(formLayout_2);
				(function(container){
					var userDefinedControl_1 = new udc.com.comFormTitle("comformtitle3");
					userDefinedControl_1.title = "임베디드앱 화면";
					container.addChild(userDefinedControl_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var group_3 = new cpr.controls.Container("grpSubForm1");
					group_3.style.setClasses(["form-box"]);
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.topMargin = "5px";
					formLayout_3.rightMargin = "5px";
					formLayout_3.bottomMargin = "5px";
					formLayout_3.leftMargin = "5px";
					formLayout_3.setColumns(["85px", "1fr", "85px", "1fr", "73px", "1fr", "73px", "1fr"]);
					formLayout_3.setRows(["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]);
					group_3.setLayout(formLayout_3);
					(function(container){
						var output_1 = new cpr.controls.Output("otp1");
						output_1.value = "통합증번";
						container.addChild(output_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var inputBox_1 = new cpr.controls.InputBox("ipb26");
						inputBox_1.value = "N1234567";
						container.addChild(inputBox_1, {
							"colIndex": 1,
							"rowIndex": 0
						});
						var output_2 = new cpr.controls.Output("otp4");
						output_2.value = "통합단체명";
						container.addChild(output_2, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var comboBox_1 = new cpr.controls.ComboBox("cmb1");
						comboBox_1.placeholder = "콤보박스";
						(function(comboBox_1){
							comboBox_1.addItem(new cpr.controls.Item("SelectList1", "value1"));
							comboBox_1.addItem(new cpr.controls.Item("SelectList2", "value2"));
							comboBox_1.addItem(new cpr.controls.Item("SelectList3", "value3"));
							comboBox_1.addItem(new cpr.controls.Item("SelectList4", "value4"));
						})(comboBox_1);
						container.addChild(comboBox_1, {
							"colIndex": 3,
							"rowIndex": 0
						});
						var output_3 = new cpr.controls.Output("otp31");
						output_3.value = "라벨명칭";
						container.addChild(output_3, {
							"colIndex": 4,
							"rowIndex": 0
						});
						var radioButton_1 = new cpr.controls.RadioButton("rdb3");
						(function(radioButton_1){
							radioButton_1.addItem(new cpr.controls.Item("label1", "value1"));
							radioButton_1.addItem(new cpr.controls.Item("label2", "value2"));
						})(radioButton_1);
						container.addChild(radioButton_1, {
							"colIndex": 5,
							"rowIndex": 0
						});
						var output_4 = new cpr.controls.Output("otp33");
						output_4.value = "라벨명칭";
						container.addChild(output_4, {
							"colIndex": 6,
							"rowIndex": 0
						});
						var searchInput_1 = new cpr.controls.SearchInput();
						container.addChild(searchInput_1, {
							"colIndex": 7,
							"rowIndex": 0
						});
						var output_5 = new cpr.controls.Output("otp2");
						output_5.value = "계약상태";
						container.addChild(output_5, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var inputBox_2 = new cpr.controls.InputBox("ipb14");
						inputBox_2.enabled = false;
						inputBox_2.value = "계약상태 disable";
						container.addChild(inputBox_2, {
							"colIndex": 1,
							"rowIndex": 1
						});
						var output_6 = new cpr.controls.Output("otp5");
						output_6.value = "계약형태";
						container.addChild(output_6, {
							"colIndex": 2,
							"rowIndex": 1
						});
						var comboBox_2 = new cpr.controls.ComboBox("cmb2");
						comboBox_2.enabled = false;
						(function(comboBox_2){
							comboBox_2.addItem(new cpr.controls.Item("SelectList1", "value1"));
							comboBox_2.addItem(new cpr.controls.Item("SelectList2", "value2"));
							comboBox_2.addItem(new cpr.controls.Item("SelectList3", "value3"));
							comboBox_2.addItem(new cpr.controls.Item("SelectList4", "value4"));
						})(comboBox_2);
						container.addChild(comboBox_2, {
							"colIndex": 3,
							"rowIndex": 1
						});
						var output_7 = new cpr.controls.Output("otp32");
						output_7.value = "라벨명칭";
						container.addChild(output_7, {
							"colIndex": 4,
							"rowIndex": 1
						});
						var radioButton_2 = new cpr.controls.RadioButton("rdb4");
						radioButton_2.enabled = false;
						(function(radioButton_2){
							radioButton_2.addItem(new cpr.controls.Item("label1", "value1"));
							radioButton_2.addItem(new cpr.controls.Item("label2", "value2"));
						})(radioButton_2);
						container.addChild(radioButton_2, {
							"colIndex": 5,
							"rowIndex": 1
						});
						var output_8 = new cpr.controls.Output("otp34");
						output_8.value = "팝업조회";
						container.addChild(output_8, {
							"colIndex": 6,
							"rowIndex": 1
						});
						var group_4 = new cpr.controls.Container("grp3");
						// Layout
						var formLayout_4 = new cpr.controls.layouts.FormLayout();
						formLayout_4.setColumns(["1fr", "80px"]);
						formLayout_4.setRows(["1fr"]);
						group_4.setLayout(formLayout_4);
						(function(container){
							var button_1 = new cpr.controls.Button("btn1");
							button_1.value = "기관명조회";
							button_1.style.setClasses(["btnWhite"]);
							container.addChild(button_1, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var inputBox_3 = new cpr.controls.InputBox("ipb6");
							container.addChild(inputBox_3, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_4);
						container.addChild(group_4, {
							"colIndex": 7,
							"rowIndex": 1
						});
						var output_9 = new cpr.controls.Output("otp3");
						output_9.value = "설정비율(%)";
						container.addChild(output_9, {
							"colIndex": 0,
							"rowIndex": 2
						});
						var dateInput_1 = new cpr.controls.DateInput("dti6");
						dateInput_1.placeholder = "2020-04-04";
						container.addChild(dateInput_1, {
							"colIndex": 1,
							"rowIndex": 2
						});
						var output_10 = new cpr.controls.Output("otp6");
						output_10.value = "수금기관";
						container.addChild(output_10, {
							"colIndex": 2,
							"rowIndex": 2
						});
						var checkBox_1 = new cpr.controls.CheckBox("cbx3");
						checkBox_1.text = "Check";
						container.addChild(checkBox_1, {
							"colIndex": 3,
							"rowIndex": 2
						});
						var output_11 = new cpr.controls.Output("otp8");
						output_11.value = "수금인";
						container.addChild(output_11, {
							"colIndex": 4,
							"rowIndex": 2
						});
						var searchInput_2 = new cpr.controls.SearchInput();
						container.addChild(searchInput_2, {
							"colIndex": 5,
							"rowIndex": 2
						});
						var output_12 = new cpr.controls.Output("otp17");
						output_12.value = "수금인";
						container.addChild(output_12, {
							"colIndex": 6,
							"rowIndex": 2
						});
						var inputBox_4 = new cpr.controls.InputBox("ipb21");
						container.addChild(inputBox_4, {
							"colIndex": 7,
							"rowIndex": 2
						});
						var output_13 = new cpr.controls.Output("otp9");
						output_13.value = "계약일자";
						container.addChild(output_13, {
							"colIndex": 0,
							"rowIndex": 3
						});
						var dateInput_2 = new cpr.controls.DateInput("dti7");
						dateInput_2.enabled = false;
						container.addChild(dateInput_2, {
							"colIndex": 1,
							"rowIndex": 3
						});
						var output_14 = new cpr.controls.Output("otp7");
						output_14.value = "제도종류";
						container.addChild(output_14, {
							"colIndex": 2,
							"rowIndex": 3
						});
						var checkBox_2 = new cpr.controls.CheckBox("cbx4");
						checkBox_2.enabled = false;
						checkBox_2.text = "Check";
						container.addChild(checkBox_2, {
							"colIndex": 3,
							"rowIndex": 3
						});
						var output_15 = new cpr.controls.Output("otp10");
						output_15.value = "당사역할";
						container.addChild(output_15, {
							"colIndex": 4,
							"rowIndex": 3
						});
						var inputBox_5 = new cpr.controls.InputBox("ipb15");
						container.addChild(inputBox_5, {
							"colIndex": 5,
							"rowIndex": 3
						});
						var output_16 = new cpr.controls.Output("otp18");
						output_16.value = "당사역할";
						container.addChild(output_16, {
							"colIndex": 6,
							"rowIndex": 3
						});
						var inputBox_6 = new cpr.controls.InputBox("ipb19");
						container.addChild(inputBox_6, {
							"colIndex": 7,
							"rowIndex": 3
						});
						var output_17 = new cpr.controls.Output("otp11");
						output_17.value = "연락처";
						container.addChild(output_17, {
							"colIndex": 0,
							"rowIndex": 4
						});
						var maskEditor_1 = new cpr.controls.MaskEditor("mse2");
						maskEditor_1.value = "01012345678";
						maskEditor_1.mask = "XXX-XXXX-XXXX";
						container.addChild(maskEditor_1, {
							"colIndex": 1,
							"rowIndex": 4
						});
						var output_18 = new cpr.controls.Output("otp12");
						output_18.value = "제도종류";
						container.addChild(output_18, {
							"colIndex": 2,
							"rowIndex": 4
						});
						var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg4");
						checkBoxGroup_1.fixedWidth = false;
						checkBoxGroup_1.horizontalSpacing = 0;
						checkBoxGroup_1.verticalSpacing = 0;
						(function(checkBoxGroup_1){
							checkBoxGroup_1.addItem(new cpr.controls.Item("label1", "value1"));
							checkBoxGroup_1.addItem(new cpr.controls.Item("label2", "value2"));
						})(checkBoxGroup_1);
						container.addChild(checkBoxGroup_1, {
							"colIndex": 3,
							"rowIndex": 4
						});
						var output_19 = new cpr.controls.Output("otp16");
						output_19.value = "연락처";
						container.addChild(output_19, {
							"colIndex": 4,
							"rowIndex": 4
						});
						var inputBox_7 = new cpr.controls.InputBox("ipb16");
						container.addChild(inputBox_7, {
							"colIndex": 5,
							"rowIndex": 4
						});
						var output_20 = new cpr.controls.Output("otp14");
						output_20.value = "제도종류";
						container.addChild(output_20, {
							"colIndex": 6,
							"rowIndex": 4
						});
						var inputBox_8 = new cpr.controls.InputBox("ipb18");
						container.addChild(inputBox_8, {
							"colIndex": 7,
							"rowIndex": 4
						});
						var output_21 = new cpr.controls.Output("otp21");
						output_21.value = "라벨명칭";
						container.addChild(output_21, {
							"colIndex": 0,
							"rowIndex": 5
						});
						var dateInput_3 = new cpr.controls.DateInput("dti8");
						dateInput_3.placeholder = "2020-04-04";
						container.addChild(dateInput_3, {
							"colIndex": 1,
							"rowIndex": 5
						});
						var output_22 = new cpr.controls.Output("otp22");
						output_22.value = "라벨명칭";
						container.addChild(output_22, {
							"colIndex": 2,
							"rowIndex": 5
						});
						var checkBoxGroup_2 = new cpr.controls.CheckBoxGroup("cbg6");
						checkBoxGroup_2.fixedWidth = false;
						checkBoxGroup_2.horizontalSpacing = 0;
						checkBoxGroup_2.verticalSpacing = 0;
						(function(checkBoxGroup_2){
							checkBoxGroup_2.addItem(new cpr.controls.Item("label1", "value1"));
							checkBoxGroup_2.addItem(new cpr.controls.Item("label2", "value2"));
						})(checkBoxGroup_2);
						container.addChild(checkBoxGroup_2, {
							"colIndex": 3,
							"rowIndex": 5
						});
						var output_23 = new cpr.controls.Output("otp23");
						output_23.value = "라벨명칭";
						container.addChild(output_23, {
							"colIndex": 4,
							"rowIndex": 5
						});
						var inputBox_9 = new cpr.controls.InputBox("ipb31");
						container.addChild(inputBox_9, {
							"colIndex": 5,
							"rowIndex": 5,
							"colSpan": 3,
							"rowSpan": 1
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var output_24 = new cpr.controls.Output("otp35");
					output_24.value = "메인화면으로부터 전달받은 파라미터정보";
					output_24.style.css({
						"font-weight" : "bold"
					});
					container.addChild(output_24, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var output_25 = new cpr.controls.Output("optParam");
					output_25.value = "Output";
					container.addChild(output_25, {
						"colIndex": 0,
						"rowIndex": 3
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "both",
				"width": "1320px",
				"height": "680px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "서브페이지1";
	cpr.core.Platform.INSTANCE.register(app);
})();
