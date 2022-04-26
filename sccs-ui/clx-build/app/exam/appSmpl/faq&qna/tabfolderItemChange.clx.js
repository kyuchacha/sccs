/*
 * App URI: app/exam/appSmpl/faq&qna/tabfolderItemChange
 * Source Location: app/exam/appSmpl/faq&qna/tabfolderItemChange.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/appSmpl/faq&qna/tabfolderItemChange", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* tabfolderItemChange.js
			 * Created at 2022. 3. 22. 오전 10:01:19.
			 *
			 * @author aaajd
			 ************************************************/
			
			
			//QnA나 FAQ 예제가 아닌 경우 삭제
			/*
			 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click2(e){
				//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
			    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
				var selOpt = app.lookup("selOpt").value;
				var selNum = app.lookup("selNum").value;
				var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
				window.open(vsLink);
			}
			
			function reorderTab(){
				var vcTf = app.lookup("tf");
				var index = app.lookup("cmbVal").value;
				var isFutureIndex = app.lookup("cbxTrue").value;
				
				var vcTfItem = vcTf.getSelectedTabItem();
				
				var vsLblVal = "변경 전 아이템의 index:" + vcTfItem.itemIndex;
				
				vcTf.reorderTabItem(vcTfItem, index, isFutureIndex);
				
				vsLblVal = vsLblVal + ", 입력값:" + index + ", 변경후 아이템의 index:" + vcTfItem.itemIndex;
				app.lookup("optRslt").value = vsLblVal ;
				
			}
			
			/*
			 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(e){
				/* 동작 실행*/
				reorderTab();
			}
			
			/*
			 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
			 */
			function onAce2AfterLoad(e){
				/* 에디터에 소스표시 */
				var vcAceEditor = app.lookup("ace2");
				vcAceEditor.value = reorderTab;
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsPropVw");
			dataSet_1.parseData({
				"info": "프로퍼티 뷰 (속성 뷰)",
				"columns": [
					{"name": "CTRL_NM"},
					{"name": "PROP_SJ"},
					{"name": "PROP_NM"},
					{"name": "PROP_VAL"},
					{"name": "PROP_STY_DESC"}
				],
				"rows": [{"CTRL_NM": "tabfolder", "PROP_SJ": "일반", "PROP_NM": "itemDraggingMode", "PROP_VAL": "internal", "PROP_STY_DESC": ""}]
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
						output_1.value = "탭폴더 아이템 순서 변경";
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
					output_2.value = "이 문서는 텝 폴더의 탭 아이템의 순서 변경 기능에 대하여 설명합니다.\r\n탭 폴더에서 제공하는 API를 통해 탭 아이템의 순서를 변경할 수 있습니다.";
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
					output_4.value = "1. reorderTabItem API를 사용하여 선택된 탭 아이템의 순서 변경을 확인합니다.";
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
					var group_6 = new cpr.controls.Container("groAddExp");
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
						output_6.value = "TabFolder.reorderTabItem API는 1.0.2474 버전에 추가되었기에 그 이후 버전부터 사용 가능합니다.";
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
						var group_9 = new cpr.controls.Container();
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
							var group_10 = new cpr.controls.Container();
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
								output_8.value = "<기능 확인 탭폴더>";
								output_8.style.setClasses(["text-center"]);
								container.addChild(output_8, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var tabFolder_1 = new cpr.controls.TabFolder("tf");
								tabFolder_1.itemDraggingMode = "internal";
								
								var tabItem_1 = (function(tabFolder){
									var tabItem_1 = new cpr.controls.TabItem();
									tabItem_1.text = "tab1";
									tabItem_1.name = "tab1";
									var group_11 = new cpr.controls.Container("grp4");
									// Layout
									var xYLayout_1 = new cpr.controls.layouts.XYLayout();
									group_11.setLayout(xYLayout_1);
									(function(container){
										var output_9 = new cpr.controls.Output();
										output_9.value = "tab1 화면입니다.";
										output_9.style.css({
											"font-size" : "35px",
											"text-align" : "center"
										});
										container.addChild(output_9, {
											"width": "300px",
											"height": "50px",
											"left": "calc(50% - 150px)",
											"top": "calc(50% - 25px)"
										});
									})(group_11);
									tabItem_1.content = group_11;
									return tabItem_1;
								})(tabFolder_1);
								tabFolder_1.addTabItem(tabItem_1);
								
								var tabItem_2 = (function(tabFolder){
									var tabItem_2 = new cpr.controls.TabItem();
									tabItem_2.text = "tab 2";
									var group_12 = new cpr.controls.Container("grp5");
									// Layout
									var xYLayout_2 = new cpr.controls.layouts.XYLayout();
									group_12.setLayout(xYLayout_2);
									(function(container){
										var output_10 = new cpr.controls.Output();
										output_10.value = "tab2 화면입니다.";
										output_10.style.css({
											"font-size" : "35px",
											"text-align" : "center"
										});
										container.addChild(output_10, {
											"width": "300px",
											"height": "50px",
											"left": "calc(50% - 150px)",
											"top": "calc(50% - 25px)"
										});
									})(group_12);
									tabItem_2.content = group_12;
									return tabItem_2;
								})(tabFolder_1);
								tabFolder_1.addTabItem(tabItem_2);
								
								var tabItem_3 = (function(tabFolder){
									var tabItem_3 = new cpr.controls.TabItem();
									tabItem_3.text = "tab 3";
									var group_13 = new cpr.controls.Container("grp6");
									// Layout
									var xYLayout_3 = new cpr.controls.layouts.XYLayout();
									group_13.setLayout(xYLayout_3);
									(function(container){
										var output_11 = new cpr.controls.Output();
										output_11.value = "tab3 화면입니다.";
										output_11.style.css({
											"font-size" : "35px",
											"text-align" : "center"
										});
										container.addChild(output_11, {
											"width": "300px",
											"height": "50px",
											"left": "calc(50% - 150px)",
											"top": "calc(50% - 25px)"
										});
									})(group_13);
									tabItem_3.content = group_13;
									return tabItem_3;
								})(tabFolder_1);
								tabFolder_1.addTabItem(tabItem_3);
								
								var tabItem_4 = (function(tabFolder){
									var tabItem_4 = new cpr.controls.TabItem();
									tabItem_4.text = "tab 4";
									var group_14 = new cpr.controls.Container("grp7");
									// Layout
									var xYLayout_4 = new cpr.controls.layouts.XYLayout();
									group_14.setLayout(xYLayout_4);
									(function(container){
										var output_12 = new cpr.controls.Output();
										output_12.value = "tab4 화면입니다.";
										output_12.style.css({
											"font-size" : "35px",
											"text-align" : "center"
										});
										container.addChild(output_12, {
											"width": "300px",
											"height": "50px",
											"left": "calc(50% - 150px)",
											"top": "calc(50% - 25px)"
										});
									})(group_14);
									tabItem_4.content = group_14;
									return tabItem_4;
								})(tabFolder_1);
								tabFolder_1.addTabItem(tabItem_4);
								tabFolder_1.setSelectedTabItem(tabItem_1);
								container.addChild(tabFolder_1, {
									"colIndex": 0,
									"rowIndex": 0
								});
							})(group_10);
							container.addChild(group_10, {
								"autoSize": "none",
								"width": "200px",
								"height": "300px"
							});
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "height",
							"width": "1210px",
							"height": "400px"
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
				var output_13 = new cpr.controls.Output();
				output_13.value = "주요코드";
				output_13.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
				output_13.style.css({
					"font-weight" : "bold",
					"padding-left" : "1rem",
					"font-size" : "1.75rem"
				});
				container.addChild(output_13, {
					"autoSize": "none",
					"width": "1210px",
					"height": "40px"
				});
				var group_15 = new cpr.controls.Container();
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
				group_15.setLayout(formLayout_3);
				(function(container){
					var group_16 = new cpr.controls.Container();
					group_16.style.setClasses(["form-box"]);
					// Layout
					var verticalLayout_10 = new cpr.controls.layouts.VerticalLayout();
					group_16.setLayout(verticalLayout_10);
					(function(container){
						var userDefinedControl_2 = new udc.tmp.Ace("ace2");
						if(typeof onAce2AfterLoad == "function") {
							userDefinedControl_2.addEventListener("afterLoad", onAce2AfterLoad);
						}
						container.addChild(userDefinedControl_2, {
							"autoSize": "height",
							"width": "418px",
							"height": "295px"
						});
					})(group_16);
					container.addChild(group_16, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var group_17 = new cpr.controls.Container();
					// Layout
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.horizontalSpacing = "5px";
					formLayout_4.verticalSpacing = "10px";
					formLayout_4.setColumns(["1fr", "10px"]);
					formLayout_4.setColumnAutoSizing(1, true);
					formLayout_4.setRows(["1fr"]);
					group_17.setLayout(formLayout_4);
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
						var group_18 = new cpr.controls.Container();
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
						group_18.setLayout(formLayout_5);
						(function(container){
							var group_19 = new cpr.controls.Container("grpFormFunc");
							group_19.style.setClasses(["form-box"]);
							// Layout
							var formLayout_6 = new cpr.controls.layouts.FormLayout();
							formLayout_6.topMargin = "5px";
							formLayout_6.rightMargin = "5px";
							formLayout_6.bottomMargin = "5px";
							formLayout_6.leftMargin = "5px";
							formLayout_6.horizontalSpacing = "5px";
							formLayout_6.verticalSpacing = "5px";
							formLayout_6.setColumns(["1fr"]);
							formLayout_6.setRows(["25px", "100px"]);
							formLayout_6.setRowAutoSizing(1, true);
							group_19.setLayout(formLayout_6);
							(function(container){
								var group_20 = new cpr.controls.Container("grp1");
								// Layout
								var formLayout_7 = new cpr.controls.layouts.FormLayout();
								formLayout_7.horizontalSpacing = "5px";
								formLayout_7.verticalSpacing = "5px";
								formLayout_7.setColumns(["24px", "1fr", "2fr", "1fr", "120px"]);
								formLayout_7.setRows(["25px"]);
								group_20.setLayout(formLayout_7);
								(function(container){
									var output_14 = new cpr.controls.Output();
									output_14.value = "No";
									output_14.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_14, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var output_15 = new cpr.controls.Output();
									output_15.value = "함수";
									output_15.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_15, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_16 = new cpr.controls.Output();
									output_16.value = "설명";
									output_16.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_16, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var output_17 = new cpr.controls.Output();
									output_17.value = "입력값";
									output_17.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_17, {
										"colIndex": 3,
										"rowIndex": 0
									});
									var output_18 = new cpr.controls.Output();
									output_18.value = "동작";
									output_18.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_18, {
										"colIndex": 4,
										"rowIndex": 0
									});
								})(group_20);
								container.addChild(group_20, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
								var group_21 = new cpr.controls.Container("grp2");
								// Layout
								var formLayout_8 = new cpr.controls.layouts.FormLayout();
								formLayout_8.horizontalSpacing = "5px";
								formLayout_8.verticalSpacing = "5px";
								formLayout_8.setColumns(["24px", "80px", "2fr", "1fr", "120px"]);
								formLayout_8.setColumnAutoSizing(1, true);
								formLayout_8.setRows(["1fr"]);
								group_21.setLayout(formLayout_8);
								(function(container){
									var output_19 = new cpr.controls.Output();
									output_19.value = "1";
									output_19.style.css({
										"background-color" : "#e1edfe",
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none",
										"text-align" : "center"
									});
									container.addChild(output_19, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var inputBox_1 = new cpr.controls.InputBox("ipb2");
									inputBox_1.readOnly = true;
									inputBox_1.value = "TabFolder.reorderTabItem";
									container.addChild(inputBox_1, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var button_1 = new cpr.controls.Button("btn3");
									button_1.value = "실행";
									button_1.style.setClasses(["btn-primary"]);
									if(typeof onBtn3Click == "function") {
										button_1.addEventListener("click", onBtn3Click);
									}
									container.addChild(button_1, {
										"colIndex": 4,
										"rowIndex": 0
									});
									var group_22 = new cpr.controls.Container("grp3");
									// Layout
									var formLayout_9 = new cpr.controls.layouts.FormLayout();
									formLayout_9.topMargin = "0px";
									formLayout_9.rightMargin = "0px";
									formLayout_9.bottomMargin = "0px";
									formLayout_9.leftMargin = "0px";
									formLayout_9.horizontalSpacing = "5px";
									formLayout_9.verticalSpacing = "5px";
									formLayout_9.setColumns(["2fr", "1fr"]);
									formLayout_9.setRows(["1fr"]);
									group_22.setLayout(formLayout_9);
									(function(container){
										var comboBox_1 = new cpr.controls.ComboBox("cmbVal");
										comboBox_1.placeholder = "index";
										(function(comboBox_1){
											comboBox_1.addItem(new cpr.controls.Item("0", "0"));
											comboBox_1.addItem(new cpr.controls.Item("1", "1"));
											comboBox_1.addItem(new cpr.controls.Item("2", "2"));
											comboBox_1.addItem(new cpr.controls.Item("3", "3"));
											comboBox_1.addItem(new cpr.controls.Item("4", "4"));
										})(comboBox_1);
										container.addChild(comboBox_1, {
											"colIndex": 1,
											"rowIndex": 0,
											"verticalAlign": "fill"
										});
										var checkBox_1 = new cpr.controls.CheckBox("cbxTrue");
										checkBox_1.text = "isFutureIndex";
										container.addChild(checkBox_1, {
											"colIndex": 0,
											"rowIndex": 0
										});
									})(group_22);
									container.addChild(group_22, {
										"colIndex": 3,
										"rowIndex": 0
									});
									var output_20 = new cpr.controls.Output();
									output_20.readOnly = true;
									output_20.value = "탭 아이템을 선택하여 특정 탭 아이템의 순서를 변경합니다. API의 마지막 파라미터인 isFutureIndex는 새로운 인덱스가 순서 조정 이후 상태의 탭 아이템 순서 인덱스인지 여부를 설정합니다. isFutureIndex의 값이 true이면 새로운 인덱스는 메소드 실행 후의 인덱스로 해석되고 false이면 새로운 인덱스는 현재 상태를 기준으로 해석됩니다.";
									output_20.style.css({
										"background-color" : "#ffffff",
										"font-weight" : "normal",
										"text-align" : "left"
									});
									container.addChild(output_20, {
										"colIndex": 2,
										"rowIndex": 0
									});
								})(group_21);
								container.addChild(group_21, {
									"colIndex": 0,
									"rowIndex": 1,
									"colSpan": 1,
									"rowSpan": 1
								});
							})(group_19);
							container.addChild(group_19, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var group_23 = new cpr.controls.Container("grpRslt");
							group_23.style.setClasses(["form-box"]);
							// Layout
							var formLayout_10 = new cpr.controls.layouts.FormLayout();
							formLayout_10.scrollable = false;
							formLayout_10.topMargin = "5px";
							formLayout_10.rightMargin = "30px";
							formLayout_10.bottomMargin = "5px";
							formLayout_10.leftMargin = "5px";
							formLayout_10.horizontalSpacing = "5px";
							formLayout_10.verticalSpacing = "5px";
							formLayout_10.setColumns(["100px", "1fr"]);
							formLayout_10.setRows(["1fr"]);
							group_23.setLayout(formLayout_10);
							(function(container){
								var output_21 = new cpr.controls.Output();
								output_21.value = "결과값";
								output_21.style.css({
									"background-color" : "#e1edfe",
									"background-image" : "none",
									"padding-right" : "1rem"
								});
								container.addChild(output_21, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var output_22 = new cpr.controls.Output("optRslt");
								output_22.value = "";
								output_22.style.css({
									"background-color" : "white",
									"border-right-style" : "none",
									"border-left-style" : "none",
									"padding-left" : "1rem",
									"border-bottom-style" : "none",
									"border-top-style" : "none",
									"text-align" : "left"
								});
								container.addChild(output_22, {
									"colIndex": 1,
									"rowIndex": 0
								});
							})(group_23);
							container.addChild(group_23, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_18);
						container.addChild(group_18, {
							"colIndex": 0,
							"rowIndex": 0,
							"colSpan": 1,
							"rowSpan": 1
						});
					})(group_17);
					container.addChild(group_17, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
				})(group_15);
				container.addChild(group_15, {
					"autoSize": "none",
					"width": "1270px",
					"height": "295px"
				});
				var group_24 = new cpr.controls.Container("grpTechdom");
				group_24.style.setClasses(["card-inner"]);
				// Layout
				var verticalLayout_11 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_11.spacing = 15;
				verticalLayout_11.leftMargin = 0;
				verticalLayout_11.rightMargin = 0;
				verticalLayout_11.topMargin = 20;
				verticalLayout_11.bottomMargin = 40;
				group_24.setLayout(verticalLayout_11);
				(function(container){
					var output_23 = new cpr.controls.Output();
					output_23.value = "토마토 시스템 기술지원(Techdom)";
					output_23.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_23.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_23, {
						"autoSize": "none",
						"width": "1270px",
						"height": "40px"
					});
					var group_25 = new cpr.controls.Container();
					group_25.style.css({
						"background-color" : "#fef6e0",
						"background-image" : "none"
					});
					// Layout
					var verticalLayout_12 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_12.leftMargin = 30;
					verticalLayout_12.rightMargin = 30;
					verticalLayout_12.topMargin = 20;
					verticalLayout_12.bottomMargin = 20;
					group_25.setLayout(verticalLayout_12);
					(function(container){
						var output_24 = new cpr.controls.Output();
						output_24.style.css({
							"color" : "#FF9149",
							"font-weight" : "bolder"
						});
						output_24.bind("value").toExpression("#selOpt.value + ' ' + #selNum.value");
						container.addChild(output_24, {
							"width": "100px",
							"height": "25px"
						});
						var output_25 = new cpr.controls.Output("selOpt");
						output_25.visible = false;
						output_25.value = "QNA";
						output_25.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_25, {
							"autoSize": "height",
							"width": "1210px",
							"height": "25px"
						});
						var output_26 = new cpr.controls.Output("selNum");
						output_26.visible = false;
						output_26.value = "8111";
						output_26.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_26, {
							"autoSize": "height",
							"width": "100px",
							"height": "25px"
						});
						var output_27 = new cpr.controls.Output();
						output_27.value = "우측하단 '이동' 버튼을 통해 관련글을 조회할 수 있습니다.";
						output_27.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_27, {
							"autoSize": "height",
							"width": "1210px",
							"height": "25px"
						});
						var group_26 = new cpr.controls.Container();
						// Layout
						var formLayout_11 = new cpr.controls.layouts.FormLayout();
						formLayout_11.scrollable = false;
						formLayout_11.topMargin = "0px";
						formLayout_11.rightMargin = "0px";
						formLayout_11.bottomMargin = "0px";
						formLayout_11.leftMargin = "0px";
						formLayout_11.horizontalSpacing = "0px";
						formLayout_11.verticalSpacing = "0px";
						formLayout_11.setColumns(["1fr", "50px"]);
						formLayout_11.setRows(["1fr"]);
						group_26.setLayout(formLayout_11);
						(function(container){
							var button_2 = new cpr.controls.Button("moveButton");
							button_2.value = "이동";
							button_2.ariaButtonType = "link";
							button_2.style.css({
								"border-right-style" : "none",
								"color" : "#FF9149",
								"border-bottom-color" : "none",
								"font-weight" : "bolder",
								"border-left-color" : "none",
								"border-right-color" : "none",
								"border-top-style" : "none",
								"background-color" : "#fef6e0",
								"border-left-style" : "none",
								"border-top-color" : "none",
								"border-bottom-style" : "none",
								"background-image" : "none",
								"text-align" : "center"
							});
							if(typeof onBtn5Click2 == "function") {
								button_2.addEventListener("click", onBtn5Click2);
							}
							container.addChild(button_2, {
								"colIndex": 1,
								"rowIndex": 0
							});
						})(group_26);
						container.addChild(group_26, {
							"width": "400px",
							"height": "20px"
						});
					})(group_25);
					container.addChild(group_25, {
						"autoSize": "height",
						"width": "1040px",
						"height": "200px"
					});
				})(group_24);
				container.addChild(group_24, {
					"autoSize": "height",
					"width": "1270px",
					"height": "300px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "1320px",
				"height": "2800px"
			});
		}
	});
	app.title = "QNA8111";
	cpr.core.Platform.INSTANCE.register(app);
})();
