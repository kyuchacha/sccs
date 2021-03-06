/*
 * App URI: app/exam/appSmpl/faq&qna/callParentMethod
 * Source Location: app/exam/appSmpl/faq&qna/callParentMethod.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/appSmpl/faq&qna/callParentMethod", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* callParentMethod.js
			 * Created at 2022. 3. 21. 오후 2:41:49.
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
			
			//자식 앱으로 보낼 함수 export
			function createButton(text){
				
				//임베디드 앱 안에 생성될 버튼 컨트롤
				var btn = new cpr.controls.Button();
				btn.style.css({
					"background": "#008ea1",
					"color": "white"
				});
				btn.value = text;
				
				//임베디드 앱 내 컨테이너에 컨트롤 추가
				var vcEmbeddedApp = app.lookup("embapp1");
				vcEmbeddedApp.getEmbeddedAppInstance().getContainer().addChild(btn, {
					"width": "150px",
					"height": "40px"
				});
			}
			
			//자식앱으로 내보낼 함수 export
			exports.createButton = createButton;
			
			/*
			 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(e){
				var btnExport = e.control;
			
				var ipbFuncName = app.lookup("ipbFuncName");
				var optFuncName1 = app.lookup("optFuncName1");
				var optFuncName2 = app.lookup("optFuncName2");
				var args = app.lookup("args");
				
				optFuncName1.value = ipbFuncName.value;
				optFuncName2.value = ipbFuncName.value;
				
				args.enabled = true;
				
				var btnCallMethod = app.lookup("btnCallMethod");
				btnCallMethod.enabled = true;
				
				/* 에디터에 소스 표시 */
				var vcAceEditor = app.lookup("ace2");
				vcAceEditor.value = "//부모 앱에서 export할 함수" + "\n" +
					createButton + "\n" +
					"//자식 앱으로 함수 export" + "\n" +
					"exports.createButton = createButton;";	
			}
			
			/*
			 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click(e){
				var btnCallMethod = e.control;
				var vcEmb = app.lookup("embapp1");
				
				var vcName = 'callMethod';
				var vcArgs = app.lookup("args").value;
				if(vcEmb.hasAppMethod(vcName)) {
					vcEmb.callAppMethod(vcName, vcArgs);	
				}
				vcEmb.redraw();
			}
			
			function loadEmbeddedApp(name, args) {
				
				//임베디드앱 연결
				var url = "/app/exam/appSmpl/faq&qna/embedded/callParentMethod_A";
				var vcEmb = app.lookup("embapp1");
				var voInitValue = args;
				
				cpr.core.App.load(url, function(loadedApp) {
					
					if (vcEmb.getEmbeddedAppInstance()) {
						vcEmb.getEmbeddedAppInstance().dispose();
					}
					
					if (loadedApp) {
						vcEmb.ready(function(embApp) {
							embApp.initValue = voInitValue;
						})
						vcEmb.app = loadedApp;
					}
				});
			}
			
			/*
			 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
			 */
			function onAce2AfterLoad(e){
				var vcEmb = app.lookup('embapp1');
				
				if (vcEmb.hasAppMethod('setValue')) {
					vcEmb.callAppMethod('setValue');
				}
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
						output_1.value = "자식 화면에서 부모 화면의 함수를 호출하는 방법";
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
					output_2.value = "이 문서는 임베디드 앱에 연결된 앱에서 부모 앱의 함수를 호출하는 방법에 대해 설명합니다.\r\n자식 앱에서 원하는 부모 앱에 접근하기 위해 getHostAppInstance, getRootAppInstance API를 통해 상위 앱에 접근한 후,\r\nexports로 출판된 함수를 hasAppMethod API, callAppMethod API를 통해 호출하여 사용할 수 있습니다.";
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
					output_4.value = "1. 주요코드 1번을 실행하여 createButton이라는 함수를 출판합니다.\r\n2. 3번에 파라미터에 입력값을 작성하고 실행을 하면 임베디드 앱 내부에 해당 입력값을 text값으로 가진 Button이 생성되는지 확인합니다.";
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
						output_6.value = "getHostAppInstance는 직속부모 앱 인스턴스 반환하고, getRootAppInstance는 최상위 부모 앱 인스턴스 반환합니다.";
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
								output_8.value = "<기능 확인 컨트롤>";
								output_8.style.setClasses(["text-center"]);
								container.addChild(output_8, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var embeddedApp_1 = new cpr.controls.EmbeddedApp("embapp1");
								cpr.core.App.load("app/exam/appSmpl/faq&qna/embedded/callParentMethod_A", function(app) {
									if(app){
										embeddedApp_1.app = app;
									}
								});
								container.addChild(embeddedApp_1, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
							})(group_10);
							container.addChild(group_10, {
								"autoSize": "height",
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
				var output_9 = new cpr.controls.Output();
				output_9.value = "주요코드";
				output_9.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
				output_9.style.css({
					"font-weight" : "bold",
					"padding-left" : "1rem",
					"font-size" : "1.75rem"
				});
				container.addChild(output_9, {
					"autoSize": "none",
					"width": "1210px",
					"height": "40px"
				});
				var group_11 = new cpr.controls.Container();
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
				group_11.setLayout(formLayout_3);
				(function(container){
					var group_12 = new cpr.controls.Container();
					group_12.style.setClasses(["form-box"]);
					// Layout
					var verticalLayout_10 = new cpr.controls.layouts.VerticalLayout();
					group_12.setLayout(verticalLayout_10);
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
					})(group_12);
					container.addChild(group_12, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var group_13 = new cpr.controls.Container();
					// Layout
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.horizontalSpacing = "5px";
					formLayout_4.verticalSpacing = "10px";
					formLayout_4.setColumns(["1fr", "10px"]);
					formLayout_4.setColumnAutoSizing(1, true);
					formLayout_4.setRows(["1fr"]);
					group_13.setLayout(formLayout_4);
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
						var group_14 = new cpr.controls.Container();
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
						group_14.setLayout(formLayout_5);
						(function(container){
							var group_15 = new cpr.controls.Container("grpFormFunc");
							group_15.style.setClasses(["form-box"]);
							// Layout
							var formLayout_6 = new cpr.controls.layouts.FormLayout();
							formLayout_6.topMargin = "5px";
							formLayout_6.rightMargin = "5px";
							formLayout_6.bottomMargin = "5px";
							formLayout_6.leftMargin = "5px";
							formLayout_6.horizontalSpacing = "5px";
							formLayout_6.verticalSpacing = "5px";
							formLayout_6.setColumns(["1fr"]);
							formLayout_6.setRows(["25px", "25px", "25px", "50px", "25px", "25px"]);
							formLayout_6.setRowAutoSizing(1, true);
							formLayout_6.setRowAutoSizing(2, true);
							formLayout_6.setRowAutoSizing(3, true);
							formLayout_6.setRowAutoSizing(4, true);
							formLayout_6.setRowAutoSizing(5, true);
							group_15.setLayout(formLayout_6);
							(function(container){
								var group_16 = new cpr.controls.Container("grp1");
								// Layout
								var formLayout_7 = new cpr.controls.layouts.FormLayout();
								formLayout_7.horizontalSpacing = "5px";
								formLayout_7.verticalSpacing = "5px";
								formLayout_7.setColumns(["24px", "1fr", "2fr", "1fr", "100px"]);
								formLayout_7.setRows(["25px"]);
								group_16.setLayout(formLayout_7);
								(function(container){
									var output_10 = new cpr.controls.Output();
									output_10.value = "No";
									output_10.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_10, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var output_11 = new cpr.controls.Output();
									output_11.value = "함수";
									output_11.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_11, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var output_12 = new cpr.controls.Output();
									output_12.value = "설명";
									output_12.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_12, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var output_13 = new cpr.controls.Output();
									output_13.value = "입력값";
									output_13.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_13, {
										"colIndex": 3,
										"rowIndex": 0
									});
									var output_14 = new cpr.controls.Output();
									output_14.value = "동작";
									output_14.style.css({
										"background-color" : "#e1edfe",
										"background-image" : "none",
										"text-align" : "center"
									});
									container.addChild(output_14, {
										"colIndex": 4,
										"rowIndex": 0
									});
								})(group_16);
								container.addChild(group_16, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
								var group_17 = new cpr.controls.Container("grp2");
								// Layout
								var formLayout_8 = new cpr.controls.layouts.FormLayout();
								formLayout_8.horizontalSpacing = "5px";
								formLayout_8.verticalSpacing = "5px";
								formLayout_8.setColumns(["24px", "1fr", "2fr", "1fr", "100px"]);
								formLayout_8.setRows(["25px"]);
								formLayout_8.setRowAutoSizing(0, true);
								group_17.setLayout(formLayout_8);
								(function(container){
									var output_15 = new cpr.controls.Output();
									output_15.value = "1";
									output_15.style.css({
										"background-color" : "#e1edfe",
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none",
										"text-align" : "center"
									});
									container.addChild(output_15, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var inputBox_1 = new cpr.controls.InputBox("ipb2");
									inputBox_1.readOnly = true;
									inputBox_1.value = "exports";
									container.addChild(inputBox_1, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var inputBox_2 = new cpr.controls.InputBox("ipb3");
									inputBox_2.readOnly = true;
									inputBox_2.value = "작성된 함수를 exports을 사용하여 다른 앱으로 출판합니다.";
									container.addChild(inputBox_2, {
										"colIndex": 2,
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
									var group_18 = new cpr.controls.Container("grp5");
									// Layout
									var formLayout_9 = new cpr.controls.layouts.FormLayout();
									formLayout_9.scrollable = false;
									formLayout_9.horizontalSpacing = "10px";
									formLayout_9.verticalSpacing = "10px";
									formLayout_9.setColumns(["120px", "1fr"]);
									formLayout_9.setRows(["30px"]);
									formLayout_9.setRowAutoSizing(0, true);
									group_18.setLayout(formLayout_9);
									(function(container){
										var output_16 = new cpr.controls.Output();
										output_16.value = "출판할 함수명 : ";
										output_16.style.css({
											"text-align" : "right"
										});
										container.addChild(output_16, {
											"colIndex": 0,
											"rowIndex": 0
										});
										var inputBox_3 = new cpr.controls.InputBox("ipbFuncName");
										inputBox_3.readOnly = true;
										inputBox_3.value = "createButton";
										inputBox_3.placeholder = "내보낼 함수명";
										inputBox_3.style.css({
											"text-align" : "center"
										});
										container.addChild(inputBox_3, {
											"colIndex": 1,
											"rowIndex": 0
										});
									})(group_18);
									container.addChild(group_18, {
										"colIndex": 3,
										"rowIndex": 0
									});
								})(group_17);
								container.addChild(group_17, {
									"colIndex": 0,
									"rowIndex": 1,
									"colSpan": 1,
									"rowSpan": 1
								});
								var group_19 = new cpr.controls.Container("grp3");
								// Layout
								var formLayout_10 = new cpr.controls.layouts.FormLayout();
								formLayout_10.horizontalSpacing = "5px";
								formLayout_10.verticalSpacing = "5px";
								formLayout_10.setColumns(["24px", "1fr", "2fr", "1fr", "100px"]);
								formLayout_10.setRows(["25px"]);
								formLayout_10.setRowAutoSizing(0, true);
								group_19.setLayout(formLayout_10);
								(function(container){
									var output_17 = new cpr.controls.Output();
									output_17.value = "2";
									output_17.style.css({
										"background-color" : "#e1edfe",
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none",
										"text-align" : "center"
									});
									container.addChild(output_17, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var inputBox_4 = new cpr.controls.InputBox("ipb4");
									inputBox_4.readOnly = true;
									inputBox_4.value = "App의 method를 가지고 있는지에 대한 여부를 반환합니다.";
									container.addChild(inputBox_4, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var inputBox_5 = new cpr.controls.InputBox("ipb5");
									inputBox_5.readOnly = true;
									inputBox_5.value = "hasAppMethod(name)";
									container.addChild(inputBox_5, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var group_20 = new cpr.controls.Container("grp6");
									// Layout
									var formLayout_11 = new cpr.controls.layouts.FormLayout();
									formLayout_11.scrollable = false;
									formLayout_11.horizontalSpacing = "10px";
									formLayout_11.verticalSpacing = "10px";
									formLayout_11.setColumns(["120px", "1fr"]);
									formLayout_11.setRows(["30px"]);
									formLayout_11.setRowAutoSizing(0, true);
									group_20.setLayout(formLayout_11);
									(function(container){
										var output_18 = new cpr.controls.Output();
										output_18.value = "확인할 함수명 : ";
										output_18.style.css({
											"text-align" : "right"
										});
										container.addChild(output_18, {
											"colIndex": 0,
											"rowIndex": 0
										});
										var output_19 = new cpr.controls.Output("optFuncName1");
										output_19.readOnly = true;
										output_19.value = "";
										output_19.style.css({
											"text-align" : "center"
										});
										container.addChild(output_19, {
											"colIndex": 1,
											"rowIndex": 0
										});
									})(group_20);
									container.addChild(group_20, {
										"colIndex": 3,
										"rowIndex": 0
									});
								})(group_19);
								container.addChild(group_19, {
									"colIndex": 0,
									"rowIndex": 2,
									"colSpan": 1,
									"rowSpan": 1
								});
								var group_21 = new cpr.controls.Container("grp4");
								// Layout
								var formLayout_12 = new cpr.controls.layouts.FormLayout();
								formLayout_12.horizontalSpacing = "5px";
								formLayout_12.verticalSpacing = "5px";
								formLayout_12.setColumns(["24px", "1fr", "2fr", "1fr", "100px"]);
								formLayout_12.setRows(["50px"]);
								formLayout_12.setRowAutoSizing(0, true);
								group_21.setLayout(formLayout_12);
								(function(container){
									var output_20 = new cpr.controls.Output();
									output_20.value = "3";
									output_20.style.css({
										"background-color" : "#e1edfe",
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none",
										"text-align" : "center"
									});
									container.addChild(output_20, {
										"colIndex": 0,
										"rowIndex": 0
									});
									var inputBox_6 = new cpr.controls.InputBox("ipb6");
									inputBox_6.readOnly = true;
									inputBox_6.value = "App의 method를 호출합니다. (name : 메소드명, args : 파라미터)";
									container.addChild(inputBox_6, {
										"colIndex": 2,
										"rowIndex": 0
									});
									var inputBox_7 = new cpr.controls.InputBox("ipb7");
									inputBox_7.readOnly = true;
									inputBox_7.value = "callAppMethod(name, args)";
									container.addChild(inputBox_7, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var group_22 = new cpr.controls.Container("grp7");
									// Layout
									var formLayout_13 = new cpr.controls.layouts.FormLayout();
									formLayout_13.scrollable = false;
									formLayout_13.horizontalSpacing = "10px";
									formLayout_13.verticalSpacing = "10px";
									formLayout_13.horizontalSeparatorWidth = 1;
									formLayout_13.setColumns(["120px", "1fr"]);
									formLayout_13.setColumnAutoSizing(0, true);
									formLayout_13.setRows(["30px", "30px"]);
									formLayout_13.setRowAutoSizing(0, true);
									formLayout_13.setRowAutoSizing(1, true);
									group_22.setLayout(formLayout_13);
									(function(container){
										var output_21 = new cpr.controls.Output();
										output_21.value = "호출할 함수명 : ";
										output_21.style.css({
											"text-align" : "right"
										});
										container.addChild(output_21, {
											"colIndex": 0,
											"rowIndex": 0
										});
										var output_22 = new cpr.controls.Output("optFuncName2");
										output_22.readOnly = true;
										output_22.value = "";
										output_22.style.css({
											"text-align" : "center"
										});
										container.addChild(output_22, {
											"colIndex": 1,
											"rowIndex": 0
										});
										var output_23 = new cpr.controls.Output();
										output_23.value = "파라미터 값 : ";
										output_23.style.css({
											"text-align" : "right"
										});
										container.addChild(output_23, {
											"colIndex": 0,
											"rowIndex": 1
										});
										var inputBox_8 = new cpr.controls.InputBox("args");
										inputBox_8.enabled = false;
										inputBox_8.placeholder = "원하는 버튼명";
										inputBox_8.style.css({
											"text-align" : "center"
										});
										container.addChild(inputBox_8, {
											"colIndex": 1,
											"rowIndex": 1
										});
									})(group_22);
									container.addChild(group_22, {
										"colIndex": 3,
										"rowIndex": 0
									});
									var button_2 = new cpr.controls.Button("btnCallMethod");
									button_2.value = "실행";
									button_2.style.setClasses(["btn-primary"]);
									if(typeof onBtn4Click == "function") {
										button_2.addEventListener("click", onBtn4Click);
									}
									container.addChild(button_2, {
										"colIndex": 4,
										"rowIndex": 0
									});
								})(group_21);
								container.addChild(group_21, {
									"colIndex": 0,
									"rowIndex": 3
								});
							})(group_15);
							container.addChild(group_15, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var group_23 = new cpr.controls.Container("grpRslt");
							group_23.style.setClasses(["form-box"]);
							// Layout
							var formLayout_14 = new cpr.controls.layouts.FormLayout();
							formLayout_14.scrollable = false;
							formLayout_14.topMargin = "5px";
							formLayout_14.rightMargin = "30px";
							formLayout_14.bottomMargin = "5px";
							formLayout_14.leftMargin = "5px";
							formLayout_14.horizontalSpacing = "5px";
							formLayout_14.verticalSpacing = "5px";
							formLayout_14.setColumns(["100px", "1fr"]);
							formLayout_14.setRows(["1fr"]);
							group_23.setLayout(formLayout_14);
							(function(container){
								var output_24 = new cpr.controls.Output();
								output_24.value = "결과값";
								output_24.style.css({
									"background-color" : "#e1edfe",
									"background-image" : "none",
									"padding-right" : "1rem"
								});
								container.addChild(output_24, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var output_25 = new cpr.controls.Output("optRslt");
								output_25.value = "";
								output_25.style.css({
									"background-color" : "white",
									"border-right-style" : "none",
									"border-left-style" : "none",
									"padding-left" : "1rem",
									"border-bottom-style" : "none",
									"border-top-style" : "none",
									"text-align" : "left"
								});
								container.addChild(output_25, {
									"colIndex": 1,
									"rowIndex": 0
								});
							})(group_23);
							container.addChild(group_23, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_14);
						container.addChild(group_14, {
							"colIndex": 0,
							"rowIndex": 0,
							"colSpan": 1,
							"rowSpan": 1
						});
					})(group_13);
					container.addChild(group_13, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
				})(group_11);
				container.addChild(group_11, {
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
					var output_26 = new cpr.controls.Output();
					output_26.value = "토마토 시스템 기술지원(Techdom)";
					output_26.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_26.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_26, {
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
						var output_27 = new cpr.controls.Output();
						output_27.style.css({
							"color" : "#FF9149",
							"font-weight" : "bolder"
						});
						output_27.bind("value").toExpression("#selOpt.value + ' ' + #selNum.value");
						container.addChild(output_27, {
							"width": "100px",
							"height": "25px"
						});
						var output_28 = new cpr.controls.Output("selOpt");
						output_28.visible = false;
						output_28.value = "FAQ";
						output_28.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_28, {
							"autoSize": "height",
							"width": "1210px",
							"height": "25px"
						});
						var output_29 = new cpr.controls.Output("selNum");
						output_29.visible = false;
						output_29.value = "132";
						output_29.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_29, {
							"autoSize": "height",
							"width": "100px",
							"height": "25px"
						});
						var output_30 = new cpr.controls.Output();
						output_30.value = "우측하단 '이동' 버튼을 통해 관련글을 조회할 수 있습니다.";
						output_30.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_30, {
							"autoSize": "height",
							"width": "1210px",
							"height": "25px"
						});
						var group_26 = new cpr.controls.Container();
						// Layout
						var formLayout_15 = new cpr.controls.layouts.FormLayout();
						formLayout_15.scrollable = false;
						formLayout_15.topMargin = "0px";
						formLayout_15.rightMargin = "0px";
						formLayout_15.bottomMargin = "0px";
						formLayout_15.leftMargin = "0px";
						formLayout_15.horizontalSpacing = "0px";
						formLayout_15.verticalSpacing = "0px";
						formLayout_15.setColumns(["1fr", "50px"]);
						formLayout_15.setRows(["1fr"]);
						group_26.setLayout(formLayout_15);
						(function(container){
							var button_3 = new cpr.controls.Button("moveButton");
							button_3.value = "이동";
							button_3.ariaButtonType = "link";
							button_3.style.css({
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
								button_3.addEventListener("click", onBtn5Click2);
							}
							container.addChild(button_3, {
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
	app.title = "FAQ132";
	cpr.core.Platform.INSTANCE.register(app);
})();
