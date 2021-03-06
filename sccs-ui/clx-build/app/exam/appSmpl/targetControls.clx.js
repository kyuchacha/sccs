/*
 * App URI: app/exam/appSmpl/targetControls
 * Source Location: app/exam/appSmpl/targetControls.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/appSmpl/targetControls", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* targetControls.js
			 * Created at 2022. 3. 22. 오전 9:57:23.
			 *
			 * @author 1amthomas
			 ************************************************/
			
			/*
			 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(e){
				var btn3 = e.control;
				app.lookup("ace2").value = onGrpContentClick;
			}
			
			/*
			 * 그룹에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onGrpContentClick(e){
				/** 
				 * @type cpr.controls.Container
				 */
				var grpContent = e.control;
				
				var lblVal = app.lookup("optRslt");
				lblVal.value = "컨트롤 타입 : " + e.targetControl.type;
			};
			// End - User Script
			
			// Header
			
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
			
			var group_2 = new cpr.controls.Container();
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.leftMargin = 20;
			verticalLayout_3.rightMargin = 30;
			verticalLayout_3.topMargin = 30;
			verticalLayout_3.bottomMargin = 30;
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container("grpTitle");
				// Layout
				var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_4.spacing = 30;
				verticalLayout_4.topMargin = 20;
				verticalLayout_4.bottomMargin = 40;
				group_3.setLayout(verticalLayout_4);
				(function(container){
					var group_4 = new cpr.controls.Container();
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
						var output_1 = new cpr.controls.Output("optTitle");
						output_1.value = "그룹에서 클릭한 위치에 배치된 컨트롤 찾기";
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
					var output_2 = new cpr.controls.Output("optSummary");
					output_2.value = "이 문서는 그룹을 클릭했을 때, 클릭한 위치에 배치된 컨트롤의 정보를 반환하는 방법에 대해 설명합니다.";
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
				var group_5 = new cpr.controls.Container("scenarioGrp");
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
					var output_4 = new cpr.controls.Output();
					output_4.value = "그룹 안에 배치된 컨트롤을 클릭하여 반환된 컨트롤 정보를 확인한다.";
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
				})(group_5);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "1270px",
					"height": "370px"
				});
				var group_6 = new cpr.controls.Container("grpFunction");
				// Layout
				var verticalLayout_6 = new cpr.controls.layouts.VerticalLayout();
				group_6.setLayout(verticalLayout_6);
				(function(container){
					var group_7 = new cpr.controls.Container("grpFuncFloating");
					group_7.userAttr({"floating-header": "true"});
					// Layout
					var verticalLayout_7 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_7.bottomMargin = 30;
					group_7.setLayout(verticalLayout_7);
					(function(container){
						var output_5 = new cpr.controls.Output();
						output_5.value = "기능확인";
						output_5.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
						output_5.style.css({
							"font-weight" : "bold",
							"padding-left" : "1rem",
							"font-size" : "1.75rem"
						});
						container.addChild(output_5, {
							"autoSize": "none",
							"width": "1270px",
							"height": "40px"
						});
						var group_8 = new cpr.controls.Container();
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
							var group_9 = new cpr.controls.Container("grpContent");
							group_9.style.css({
								"border-right-style" : "solid",
								"border-top-width" : "1px",
								"border-bottom-color" : "#cccccc",
								"border-right-width" : "1px",
								"border-left-style" : "solid",
								"border-bottom-width" : "1px",
								"border-left-color" : "#cccccc",
								"border-top-color" : "#cccccc",
								"border-bottom-style" : "solid",
								"border-right-color" : "#cccccc",
								"border-left-width" : "1px",
								"border-top-style" : "solid"
							});
							// Layout
							var formLayout_2 = new cpr.controls.layouts.FormLayout();
							formLayout_2.topMargin = "10px";
							formLayout_2.rightMargin = "10px";
							formLayout_2.bottomMargin = "10px";
							formLayout_2.leftMargin = "10px";
							formLayout_2.horizontalSpacing = "10px";
							formLayout_2.verticalSpacing = "10px";
							formLayout_2.setColumns(["1fr", "1fr"]);
							formLayout_2.setRows(["1fr", "1fr"]);
							group_9.setLayout(formLayout_2);
							(function(container){
								var output_6 = new cpr.controls.Output();
								output_6.value = "Output";
								container.addChild(output_6, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var button_1 = new cpr.controls.Button("btn11");
								button_1.value = "Button";
								container.addChild(button_1, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var inputBox_1 = new cpr.controls.InputBox("ipb4");
								container.addChild(inputBox_1, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var dateInput_1 = new cpr.controls.DateInput("dti2");
								container.addChild(dateInput_1, {
									"colIndex": 1,
									"rowIndex": 1
								});
							})(group_9);
							if(typeof onGrpContentClick == "function") {
								group_9.addEventListener("click", onGrpContentClick);
							}
							container.addChild(group_9, {
								"autoSize": "none",
								"width": "800px",
								"height": "275px"
							});
							var output_7 = new cpr.controls.Output();
							output_7.value = "<기능 확인 컨트롤>";
							output_7.style.setClasses(["text-center"]);
							container.addChild(output_7, {
								"autoSize": "none",
								"width": "1208px",
								"height": "20px"
							});
						})(group_8);
						container.addChild(group_8, {
							"autoSize": "height",
							"width": "1210px",
							"height": "400px"
						});
					})(group_7);
					container.addChild(group_7, {
						"autoSize": "height",
						"width": "1270px",
						"height": "450px"
					});
				})(group_6);
				container.addChild(group_6, {
					"autoSize": "height",
					"width": "1270px",
					"height": "450px"
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "주요코드";
				output_8.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
				output_8.style.css({
					"font-weight" : "bold",
					"padding-left" : "1rem",
					"font-size" : "1.75rem"
				});
				container.addChild(output_8, {
					"autoSize": "none",
					"width": "1210px",
					"height": "40px"
				});
				var group_10 = new cpr.controls.Container();
				// Layout
				var formLayout_3 = new cpr.controls.layouts.FormLayout();
				formLayout_3.userResizingMode = "standard";
				formLayout_3.topMargin = "0px";
				formLayout_3.rightMargin = "0px";
				formLayout_3.bottomMargin = "0px";
				formLayout_3.leftMargin = "0px";
				formLayout_3.horizontalSpacing = "5px";
				formLayout_3.verticalSpacing = "5px";
				formLayout_3.setColumns(["1fr", "700px"]);
				formLayout_3.setRows(["1fr"]);
				group_10.setLayout(formLayout_3);
				(function(container){
					var group_11 = new cpr.controls.Container();
					group_11.style.setClasses(["form-box"]);
					// Layout
					var verticalLayout_9 = new cpr.controls.layouts.VerticalLayout();
					group_11.setLayout(verticalLayout_9);
					(function(container){
						var userDefinedControl_2 = new udc.tmp.Ace("ace2");
						container.addChild(userDefinedControl_2, {
							"autoSize": "height",
							"width": "418px",
							"height": "295px"
						});
					})(group_11);
					container.addChild(group_11, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var group_12 = new cpr.controls.Container();
					// Layout
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.horizontalSpacing = "5px";
					formLayout_4.verticalSpacing = "10px";
					formLayout_4.setColumns(["1fr", "10px"]);
					formLayout_4.setColumnAutoSizing(1, true);
					formLayout_4.setRows(["1fr"]);
					group_12.setLayout(formLayout_4);
					(function(container){
						var userDefinedControl_3 = new udc.com.udcSplit("udcsplit1");
						userDefinedControl_3.leftGrpId = "grp6";
						userDefinedControl_3.rightGrpId = "grp7";
						container.addChild(userDefinedControl_3, {
							"colIndex": 1,
							"rowIndex": 0,
							"colSpan": 1,
							"rowSpan": 1,
							"horizontalAlign": "right",
							"width": 9
						});
						var group_13 = new cpr.controls.Container();
						// Layout
						var formLayout_5 = new cpr.controls.layouts.FormLayout();
						formLayout_5.scrollable = false;
						formLayout_5.topMargin = "0px";
						formLayout_5.rightMargin = "0px";
						formLayout_5.bottomMargin = "0px";
						formLayout_5.leftMargin = "0px";
						formLayout_5.horizontalSpacing = "10px";
						formLayout_5.verticalSpacing = "10px";
						formLayout_5.setColumns(["1fr"]);
						formLayout_5.setRows(["40px", "1fr"]);
						formLayout_5.setRowAutoSizing(0, true);
						group_13.setLayout(formLayout_5);
						(function(container){
							var group_14 = new cpr.controls.Container("grpFormFunc");
							group_14.style.setClasses(["form-box"]);
							// Layout
							var formLayout_6 = new cpr.controls.layouts.FormLayout();
							formLayout_6.topMargin = "5px";
							formLayout_6.rightMargin = "5px";
							formLayout_6.bottomMargin = "5px";
							formLayout_6.leftMargin = "5px";
							formLayout_6.horizontalSpacing = "5px";
							formLayout_6.verticalSpacing = "5px";
							formLayout_6.setColumns(["1fr"]);
							formLayout_6.setRows(["25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px"]);
							formLayout_6.setRowAutoSizing(1, true);
							formLayout_6.setRowAutoSizing(2, true);
							formLayout_6.setRowAutoSizing(3, true);
							formLayout_6.setRowAutoSizing(4, true);
							formLayout_6.setRowAutoSizing(5, true);
							formLayout_6.setRowAutoSizing(6, true);
							formLayout_6.setRowAutoSizing(7, true);
							group_14.setLayout(formLayout_6);
							(function(container){
								var group_15 = new cpr.controls.Container("grp1");
								// Layout
								var formLayout_7 = new cpr.controls.layouts.FormLayout();
								formLayout_7.horizontalSpacing = "5px";
								formLayout_7.verticalSpacing = "5px";
								formLayout_7.setColumns(["24px", "1fr", "2fr", "1fr", "120px"]);
								formLayout_7.setRows(["25px"]);
								group_15.setLayout(formLayout_7);
								(function(container){
									var output_9 = new cpr.controls.Output();
									output_9.value = "No";
									output_9.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_9, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var output_10 = new cpr.controls.Output();
									output_10.value = "함수";
									output_10.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_10, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_11 = new cpr.controls.Output();
									output_11.value = "설명";
									output_11.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_11, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var output_12 = new cpr.controls.Output();
									output_12.value = "입력값";
									output_12.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_12, {
										"colIndex": 3,
										"rowIndex": 0
									});
									var output_13 = new cpr.controls.Output();
									output_13.value = "동작";
									output_13.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_13, {
										"colIndex": 4,
										"rowIndex": 0
									});
								})(group_15);
								container.addChild(group_15, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
								var group_16 = new cpr.controls.Container("grp2");
								// Layout
								var formLayout_8 = new cpr.controls.layouts.FormLayout();
								formLayout_8.horizontalSpacing = "5px";
								formLayout_8.verticalSpacing = "5px";
								formLayout_8.setColumns(["24px", "1fr", "2fr", "1fr", "120px"]);
								formLayout_8.setRows(["25px"]);
								formLayout_8.setRowAutoSizing(0, true);
								group_16.setLayout(formLayout_8);
								(function(container){
									var output_14 = new cpr.controls.Output();
									output_14.value = "1";
									output_14.style.css({
										"background-color" : "#e1edfe",
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none",
										"text-align" : "center"
									});
									container.addChild(output_14, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.readOnly = true;
									inputBox_2.value = "e.targetControl";
									container.addChild(inputBox_2, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.readOnly = true;
									inputBox_3.value = "그룹 click 이벤트에서 최초 이벤트를 발생 시킨 컨트롤을 반환합니다.";
									container.addChild(inputBox_3, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var button_2 = new cpr.controls.Button("btn3");
									button_2.value = "실행";
									button_2.style.setClasses(["btn-primary"]);
									if(typeof onBtn3Click == "function") {
										button_2.addEventListener("click", onBtn3Click);
									}
									container.addChild(button_2, {
										"colIndex": 4,
										"rowIndex": 0
									});
								})(group_16);
								container.addChild(group_16, {
									"colIndex": 0,
									"rowIndex": 1,
									"colSpan": 1,
									"rowSpan": 1
								});
							})(group_14);
							container.addChild(group_14, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var group_17 = new cpr.controls.Container("grpRslt");
							group_17.style.setClasses(["form-box"]);
							// Layout
							var formLayout_9 = new cpr.controls.layouts.FormLayout();
							formLayout_9.scrollable = false;
							formLayout_9.topMargin = "5px";
							formLayout_9.rightMargin = "30px";
							formLayout_9.bottomMargin = "5px";
							formLayout_9.leftMargin = "5px";
							formLayout_9.horizontalSpacing = "5px";
							formLayout_9.verticalSpacing = "5px";
							formLayout_9.setColumns(["100px", "1fr"]);
							formLayout_9.setRows(["1fr"]);
							group_17.setLayout(formLayout_9);
							(function(container){
								var output_15 = new cpr.controls.Output();
								output_15.value = "결과값";
								output_15.style.css({
									"background-color" : "#e1edfe",
									"background-image" : "none",
									"padding-right" : "1rem"
								});
								container.addChild(output_15, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var output_16 = new cpr.controls.Output("optRslt");
								output_16.value = "";
								output_16.style.css({
									"background-color" : "white",
									"border-right-style" : "none",
									"border-left-style" : "none",
									"padding-left" : "1rem",
									"border-bottom-style" : "none",
									"border-top-style" : "none",
									"text-align" : "left"
								});
								container.addChild(output_16, {
									"colIndex": 1,
									"rowIndex": 0
								});
							})(group_17);
							container.addChild(group_17, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_13);
						container.addChild(group_13, {
							"colIndex": 0,
							"rowIndex": 0,
							"colSpan": 1,
							"rowSpan": 1
						});
					})(group_12);
					container.addChild(group_12, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
				})(group_10);
				container.addChild(group_10, {
					"autoSize": "none",
					"width": "1270px",
					"height": "295px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "1320px",
				"height": "2800px"
			});
		}
	});
	app.title = "타겟컨트롤의 값 반환";
	cpr.core.Platform.INSTANCE.register(app);
})();
