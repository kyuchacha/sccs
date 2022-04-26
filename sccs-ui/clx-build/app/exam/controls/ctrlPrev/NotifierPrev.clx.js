/*
 * App URI: app/exam/controls/ctrlPrev/NotifierPrev
 * Source Location: app/exam/controls/ctrlPrev/NotifierPrev.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/controls/ctrlPrev/NotifierPrev", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				app.lookup("ntf").notify("알림");
			}
			
			
			/*
			 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn2Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn2 = e.control;
				app.lookup("ntf").info("정보 알림");
				
			}
			
			
			/*
			 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn3Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn3 = e.control;
				app.lookup("ntf").success("성공 알림");
			}
			
			
			/*
			 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn4Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn4 = e.control;
				app.lookup("ntf").danger("위험 알림");
				
			}
			
			
			/*
			 * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn5Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn5 = e.control;
				app.lookup("ntf").warning("경고 알림");
			}
			
			
			/*
			 * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn6Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn6 = e.control;
				app.lookup("ntf2").notify("알림");
			}
			
			
			/*
			 * "다이얼로그 버튼" 버튼(btn7)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn7Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn7 = e.control;
				
				app.openDialog("app/exam/controls/Notifier", {
					left : 100,
					top : 100,
					width: 1000,
					height: 700
				});
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
				output_1.value = "알림(Notifier)는 알림 표현하는 컨트롤입니다.";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_3 = new cpr.controls.Container("grp2");
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
				formLayout_2.setColumns(["300px", "1fr"]);
				formLayout_2.setUseColumnShade(0, true);
				formLayout_2.setRows(["1fr", "1fr"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var group_4 = new cpr.controls.Container("grp1");
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.horizontalSpacing = "5px";
					formLayout_3.verticalSpacing = "5px";
					formLayout_3.horizontalSeparatorWidth = 1;
					formLayout_3.verticalSeparatorWidth = 1;
					formLayout_3.setColumns(["1fr"]);
					formLayout_3.setRows(["30px", "1fr"]);
					group_4.setLayout(formLayout_3);
					(function(container){
						var notifier_1 = new cpr.controls.Notifier("ntf");
						notifier_1.animation = "fadeIn";
						notifier_1.close = true;
						container.addChild(notifier_1, {
							"colIndex": 0,
							"rowIndex": 1,
							"verticalAlign": "top",
							"height": 35
						});
						var group_5 = new cpr.controls.Container("grp8");
						// Layout
						var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
						group_5.setLayout(flowLayout_1);
						(function(container){
							var button_1 = new cpr.controls.Button("btn1");
							button_1.value = "사용자 정의";
							if(typeof onBtn1Click == "function") {
								button_1.addEventListener("click", onBtn1Click);
							}
							container.addChild(button_1, {
								"autoSize": "none",
								"width": "102px",
								"height": "25px"
							});
							var button_2 = new cpr.controls.Button("btn2");
							button_2.value = "정보";
							if(typeof onBtn2Click == "function") {
								button_2.addEventListener("click", onBtn2Click);
							}
							container.addChild(button_2, {
								"autoSize": "none",
								"width": "60px",
								"height": "25px"
							});
							var button_3 = new cpr.controls.Button("btn3");
							button_3.value = "성공";
							if(typeof onBtn3Click == "function") {
								button_3.addEventListener("click", onBtn3Click);
							}
							container.addChild(button_3, {
								"autoSize": "none",
								"width": "60px",
								"height": "25px"
							});
							var button_4 = new cpr.controls.Button("btn4");
							button_4.value = "위험";
							if(typeof onBtn4Click == "function") {
								button_4.addEventListener("click", onBtn4Click);
							}
							container.addChild(button_4, {
								"autoSize": "none",
								"width": "60px",
								"height": "25px"
							});
							var button_5 = new cpr.controls.Button("btn5");
							button_5.value = "경고";
							if(typeof onBtn5Click == "function") {
								button_5.addEventListener("click", onBtn5Click);
							}
							container.addChild(button_5, {
								"autoSize": "none",
								"width": "60px",
								"height": "25px"
							});
						})(group_5);
						container.addChild(group_5, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_4);
					container.addChild(group_4, {
						"colIndex": 1,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "속성 별 알림창 표시\r\n1. 우측의 버튼을 클릭한다.\r\n2. 해당하는 알림창이 플로팅 된다.";
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "[maxNotifyCount = 3]\r\n1. 알림 버튼을 눌러 알림을 계속해서 띄운다.\r\n2. 알림이 3개까지 띄워진다.\r\n\r\n[delay = 10000 (10초)]\r\n1. 알림창이 10초간 표시된다.\r\n\r\n[scope = system]\r\n1. 알림 버튼을 클릭한다.\r\n2. 다이얼로그 버튼을 클릭한다.\r\n3. 다이얼로그창 위로 알림버튼이 보인다.\r\n\r\n[icon 설정]\r\n1. 알림창 우측에 아이콘이 표시된다.";
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var group_6 = new cpr.controls.Container("grp7");
					// Layout
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.horizontalSpacing = "5px";
					formLayout_4.verticalSpacing = "5px";
					formLayout_4.horizontalSeparatorWidth = 1;
					formLayout_4.verticalSeparatorWidth = 1;
					formLayout_4.setColumns(["1fr"]);
					formLayout_4.setRows(["25px", "25px", "1fr"]);
					group_6.setLayout(formLayout_4);
					(function(container){
						var notifier_2 = new cpr.controls.Notifier("ntf2");
						notifier_2.maxNotifyCount = 3;
						notifier_2.delay = 10000;
						notifier_2.icon = "app/theme/common/images/icon/flag/001-south-korea.svg";
						notifier_2.close = true;
						container.addChild(notifier_2, {
							"colIndex": 0,
							"rowIndex": 2,
							"colSpan": 1,
							"rowSpan": 1,
							"verticalAlign": "top",
							"height": 50
						});
						var button_6 = new cpr.controls.Button("btn6");
						button_6.value = "알림 버튼";
						if(typeof onBtn6Click == "function") {
							button_6.addEventListener("click", onBtn6Click);
						}
						container.addChild(button_6, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var button_7 = new cpr.controls.Button("btn7");
						button_7.value = "다이얼로그 버튼";
						if(typeof onBtn7Click == "function") {
							button_7.addEventListener("click", onBtn7Click);
						}
						container.addChild(button_7, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_6);
					container.addChild(group_6, {
						"colIndex": 1,
						"rowIndex": 1
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "400px",
				"height": "641px"
			});
		}
	});
	app.title = "알림 관련 속성";
	cpr.core.Platform.INSTANCE.register(app);
})();
