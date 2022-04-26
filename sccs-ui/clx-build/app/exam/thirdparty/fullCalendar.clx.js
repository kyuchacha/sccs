/*
 * App URI: app/exam/thirdparty/fullCalendar
 * Source Location: app/exam/thirdparty/fullCalendar.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/thirdparty/fullCalendar", {
		onPrepare: function(loader){
			loader.addCSS("thirdparty/scheduler/main.min.css");
			loader.addScript("thirdparty/scheduler/main.min.js");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			* fullCalendar2.js
			 * Created at 2022. 3. 8. 오전 10:15:13.
			 *
			 * @author aaajd
			 ************************************************/
			
			var elCalendar, fcCalendar;
			
			
			/*
			 * 쉘에서 init 이벤트 발생 시 호출.
			 */
			function onShlCalendarInit(e){
				/** 
				 * @type cpr.controls.UIControlShell
				 */
				var shlCalendar = e.control;
				// 캘린더가 이미 생성된 경우 preventDefault 실행
				if(elCalendar) {
					if(fcCalendar) fcCalendar.refetchEvents();
					e.preventDefault();
				}
			}
			
			/*
			 * 쉘에서 load 이벤트 발생 시 호출.
			 */
			function onShlCalendarLoad(e){
				/** 
				 * @type cpr.controls.UIControlShell
				 */
				var shlCalendar = e.control;
				// 캘린더 그리기 위한 요소 추가
				if(!elCalendar) {
					elCalendar = document.createElement("calendar");
					e.content.appendChild(elCalendar);
				}
				
				// 캘린더 생성
				fcCalendar = new FullCalendar.Calendar(elCalendar, {
					googleCalendarApiKey: "AIzaSyBelxdJBd1pXW7owis2RF5gI_H4XxoOEH0",
					initialView: 'dayGridMonth',
					locale: 'ko',
					height: "100%",
					customButtons: {
						customPrevY: {	// 이전 연도로 이동
							icon: 'fc-icon-chevrons-left',
							click: function() {
								fcCalendar.prevYear();
								
							}
							
						},
						customPrev: {	// 이전 달로 이동
							icon: 'fc-icon-chevron-left',
							click: function() {
								fcCalendar.prev();
							}
						},
						customToday: {	// 오늘 날짜로 이동
							text: 'Today',
							click: function() {
								fcCalendar.today();
							}
							
						},
						customNext: {	// 다음 월로 이동
							icon: 'fc-icon-chevron-right',
							click: function() {
								fcCalendar.next();
							}
						},
						customNextY: {	// 다음 연도로 이동
							icon: 'fc-icon-chevrons-right',
							click: function() {
								fcCalendar.nextYear();
							}
						}
					},
					headerToolbar: { // 캘린더 헤더 툴바 설정
						left: 'customPrevY,customPrev,customToday,customNext,customNextY',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
					},
					allDaySlot: true,
					dayMaxEvents: true, // 최대 이벤트 개수
					displayEventTime: false, // 이벤트에 시간 표시 여부
					eventSources: [{ // 공휴일 데이터 추가
						googleCalendarId: "ko.south_korea.official#holiday@group.v.calendar.google.com",
						backgroundColor: "transparent",
						borderColor: "transparent",
						className: "kr-holiday",
						textColor: "red"
					}],
					eventOrder: "-resourceId", // 이벤트 정렬 기준 설정
					editable: true,
					dateClick: function(info) { // 날짜 클릭 시 발생할 이벤트
					},
					eventClick: function(info) { // 일정 클릭 시 발생할 이벤트
						// 이벤트 클릭 시 연결된 url로 이동하지 않도록 설정
						if (info.event.url) return info.jsEvent.preventDefault();
					},
					eventDrop: function(info) {
					},
					eventResize: function(info) {
					}
				});
				// 캘린더를 그려준다.
				fcCalendar.render();
			}
			
			/*
			 * "https://fullcalendar.io/docs/initialize-globals" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(e){
				window.open('https://fullcalendar.io/docs/initialize-globals');
			}
			
			/*
			 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
			 */
			function onAce1AfterLoad(e){
				/* 에디터에 소스 표시 */
				var vcAceEditor = app.lookup("ace1");
				vcAceEditor.value = onShlCalendarLoad;
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
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.leftMargin = 20;
			verticalLayout_3.rightMargin = 30;
			verticalLayout_3.topMargin = 30;
			verticalLayout_3.bottomMargin = 30;
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container("grp1");
				// Layout
				var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_4.spacing = 30;
				verticalLayout_4.topMargin = 20;
				verticalLayout_4.bottomMargin = 40;
				group_3.setLayout(verticalLayout_4);
				(function(container){
					var group_4 = new cpr.controls.Container("grp3");
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
						var output_1 = new cpr.controls.Output();
						output_1.value = "캘린더";
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
					var output_2 = new cpr.controls.Output();
					output_2.value = "FullCalendar는 자바스크립트 기반 오픈소스 라이브러리로 웹, 앱 개발 달력이나 일정, 스케줄러 관련 구현 시 사용되는 라이브러리입니다.";
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
				var group_5 = new cpr.controls.Container("grp2");
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
					var output_4 = new cpr.controls.Output("ipbScenario");
					output_4.value = "1. 캘린더가 정상작동하는지 확인합니다.";
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
					var group_6 = new cpr.controls.Container("grp4");
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
						output_5.value = "FullCalendar";
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
						output_6.value = "js파일은 아래 링크에서 최신 버전을 다운로드합니다.";
						output_6.style.css({
							"color" : "#09c2de"
						});
						container.addChild(output_6, {
							"autoSize": "height",
							"width": "100px",
							"height": "25px"
						});
						var button_1 = new cpr.controls.Button("btn1");
						button_1.value = "https://fullcalendar.io/docs/initialize-globals";
						button_1.ariaButtonType = "link";
						button_1.style.css({
							"background-color" : "#dff7fb",
							"color" : "false",
							"border-top-width" : "0px",
							"border-right-width" : "0px",
							"border-bottom-width" : "0px",
							"background-image" : "none",
							"border-left-width" : "0px",
							"text-align" : "left"
						});
						if(typeof onBtn1Click == "function") {
							button_1.addEventListener("click", onBtn1Click);
						}
						container.addChild(button_1, {
							"autoSize": "none",
							"width": "1210px",
							"height": "20px"
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
						var group_9 = new cpr.controls.Container("grp11");
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
							var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comFormTitle("comformtitle1");
							container.addChild(userDefinedControl_2, {
								"autoSize": "none",
								"width": "1320px",
								"height": "25px"
							});
							var uIControlShell_1 = linker.uIControlShell_1 = new cpr.controls.UIControlShell("shlCalendar");
							uIControlShell_1.fieldLabel = "일정 관리";
							if(typeof onShlCalendarInit == "function") {
								uIControlShell_1.addEventListener("init", onShlCalendarInit);
							}
							if(typeof onShlCalendarLoad == "function") {
								uIControlShell_1.addEventListener("load", onShlCalendarLoad);
							}
							container.addChild(uIControlShell_1, {
								"autoSize": "none",
								"width": "1320px",
								"height": "585px"
							});
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "height",
							"width": "1210px",
							"height": "700px"
						});
					})(group_8);
					container.addChild(group_8, {
						"autoSize": "height",
						"width": "1270px",
						"height": "700px"
					});
				})(group_7);
				container.addChild(group_7, {
					"autoSize": "height",
					"width": "1270px",
					"height": "700px"
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
				var group_10 = new cpr.controls.Container("grp15");
				// Layout
				var verticalLayout_10 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_10.spacing = 20;
				verticalLayout_10.leftMargin = 30;
				verticalLayout_10.rightMargin = 30;
				verticalLayout_10.topMargin = 0;
				verticalLayout_10.bottomMargin = 0;
				group_10.setLayout(verticalLayout_10);
				(function(container){
					var group_11 = new cpr.controls.Container("grp7");
					// Layout
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.scrollable = false;
					formLayout_2.topMargin = "0px";
					formLayout_2.rightMargin = "0px";
					formLayout_2.bottomMargin = "0px";
					formLayout_2.leftMargin = "0px";
					formLayout_2.horizontalSpacing = "5px";
					formLayout_2.verticalSpacing = "5px";
					formLayout_2.setColumns(["1fr"]);
					formLayout_2.setRows(["1fr"]);
					group_11.setLayout(formLayout_2);
					(function(container){
						var group_12 = new cpr.controls.Container("grp9");
						group_12.style.setClasses(["form-box"]);
						// Layout
						var verticalLayout_11 = new cpr.controls.layouts.VerticalLayout();
						group_12.setLayout(verticalLayout_11);
						(function(container){
							var userDefinedControl_3 = new udc.tmp.Ace("ace1");
							if(typeof onAce1AfterLoad == "function") {
								userDefinedControl_3.addEventListener("afterLoad", onAce1AfterLoad);
							}
							container.addChild(userDefinedControl_3, {
								"autoSize": "height",
								"width": "300px",
								"height": "300px"
							});
						})(group_12);
						container.addChild(group_12, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_11);
					container.addChild(group_11, {
						"autoSize": "height",
						"width": "1210px",
						"height": "310px"
					});
				})(group_10);
				container.addChild(group_10, {
					"autoSize": "height",
					"width": "1270px",
					"height": "350px"
				});
				var group_13 = new cpr.controls.Container("grp5");
				group_13.style.setClasses(["card-inner"]);
				// Layout
				var verticalLayout_12 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_12.spacing = 15;
				verticalLayout_12.leftMargin = 0;
				verticalLayout_12.rightMargin = 0;
				verticalLayout_12.topMargin = 20;
				verticalLayout_12.bottomMargin = 40;
				group_13.setLayout(verticalLayout_12);
				(function(container){
					var output_9 = new cpr.controls.Output();
					output_9.value = "서드파티 버전 및 라이센스 정책";
					output_9.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_9.style.css({
						"font-weight" : "bold",
						"padding-left" : "1rem",
						"font-size" : "1.75rem"
					});
					container.addChild(output_9, {
						"autoSize": "none",
						"width": "1270px",
						"height": "40px"
					});
					var group_14 = new cpr.controls.Container("grp8");
					group_14.style.css({
						"background-color" : "#FFF5EF"
					});
					// Layout
					var verticalLayout_13 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_13.leftMargin = 30;
					verticalLayout_13.rightMargin = 30;
					verticalLayout_13.topMargin = 20;
					verticalLayout_13.bottomMargin = 20;
					group_14.setLayout(verticalLayout_13);
					(function(container){
						var output_10 = new cpr.controls.Output();
						output_10.value = "라이센스 정책 및 호환";
						output_10.style.css({
							"color" : "#FF9149",
							"font-weight" : "bolder"
						});
						container.addChild(output_10, {
							"width": "100px",
							"height": "25px"
						});
						var output_11 = new cpr.controls.Output();
						output_11.value = "MIT License를 따릅니다.";
						output_11.style.css({
							"color" : "#FF9149"
						});
						container.addChild(output_11, {
							"autoSize": "height",
							"width": "100px",
							"height": "36px"
						});
					})(group_14);
					container.addChild(group_14, {
						"autoSize": "height",
						"width": "1270px",
						"height": "250px"
					});
				})(group_13);
				container.addChild(group_13, {
					"autoSize": "height",
					"width": "1100px",
					"height": "500px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "1320px",
				"height": "2056px"
			});
			// Linking
			linker.userDefinedControl_2.ctrl = linker.uIControlShell_1;
		}
	});
	app.title = "풀캘린더";
	cpr.core.Platform.INSTANCE.register(app);
})();
