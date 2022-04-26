/*
 * App URI: app/exam/dev/tabEmbedded
 * Source Location: app/exam/dev/tabEmbedded.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/dev/tabEmbedded", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * tabGrid.js
			 * Created at 2021. 7. 21. 오후 5:38:13.
			 *
			 * @author kim su hyun
			 ************************************************/
			
			var util = createCommonUtil();
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				// 임베디드 앱에 APP 존재 여부 체크
				if (util.EmbApp.hasPage(app, "embapp1")) return false;
				if (util.EmbApp.hasPage(app, "embapp2")) return false;
				
				// 임베디드 앱에 APP 설정
				util.EmbApp.setPage(app, "embapp1", "app/exam/dev/oneForm");
				util.EmbApp.setPage(app, "embapp2", "app/exam/dev/oneGridEmb");
				
			}
			
			/*
			 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
			 * 조회버튼 클릭시 이벤트
			 */
			function onCombtnsearch1Search(/* cpr.events.CUIEvent */ e){
				
				// 데이터 변경사항 체크
				if (util.Grid.isModified(app, "grdCmnTmpReg", "CRM")) {
					return false;
				}
				
				// 조회조건 유효성 체크
				if(!util.validate(app, "grpSearch")) return false;
				
				doList();
				
			}
			/**
			 * 메시지 목록데이터를 조회한다.
			 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
			 */
			function doList(psStatus){
			
				//조회 서브미션 호출
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess) {
						if(psStatus == "save"){
							//갱신된 데이터가 조회되었습니다.
							util.Msg.notify(app, "INF-M005");
						}else{
							//조회되었습니다.
							util.Msg.notify(app, "INF-M001");
						}
					}
				});
			}
			
			/*
			 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
			 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
			 */
			function onTabMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.TabFolder
				 */
				var tabMain = e.control;
				
				// 임베디드 앱 변경 사항 체크
				if (util.isAppModified(app, "CRM",app.getContainer())){
					return false;
				}
				
				// 조회조건 유효성 체크
				if(!util.validate(app, "grpSearch")) return false;
			}
			
			
			/*
			 * 임베디드 앱에서 app-ready 이벤트 발생 시 호출.
			 * 임베디드 앱의 인스턴스와 관련 자원이 준비되는 시점에 디스패치되는 이벤트.
			 */
			function onEmbapp1AppReady(/* cpr.events.CEvent */ e){
				/** 
				 * @type cpr.controls.EmbeddedApp
				 */
				var embapp1 = e.control;
				
				app.lookup("embapp1").getEmbeddedAppInstance().lookup("grpCmnTmpReg").setBindContext(new cpr.bind.GridSelectionContext(app.lookup("grdCmnTmpReg")));
			}
			
			
			/*
			 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
			 * Tab Item을 선택한 후에 발생하는 이벤트.
			 */
			function onTabMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.TabFolder
				 */
				var tabMain = e.control;
				
				if (util.Tab.getSelectedId(app, "tabMain") == 1) {
					util.Control.setEnable(app, true, "combutton1");
					
					util.EmbApp.callAppMethod(app, "embapp2", "doInsertDmParam", util.Grid.getCellValue(app, "grdCmnTmpReg", "STUD_NO"));
				} else {
					if (util.Grid.isModified(app, "grdCmnTmpReg")) {
						doList();
					}
					util.Control.setEnable(app, false, "combutton1");
				}
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
				if (!util.Grid.isModified(app, "grdCmnTmpReg", "MSG")) return false;
				
				if (!util.validate(app, "grdCmnTmpReg")) return false;
				
				util.Submit.send(app, "subSave", function(pbSuccess){
					if(pbSuccess){
						doList("save");
					}
				});
			}
			
			
			/*
			 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
			 * 신규 클릭 이벤트
			 */
			function onCombutton1Insert(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.com.comButton
				 */
				var combutton1 = e.control;
				
				util.Control.redraw(app, "embapp1");
			}
			
			
			/*
			 * 사용자 정의 컨트롤에서 restore 이벤트 발생 시 호출.
			 * 취소 클릭 이벤트
			 */
			function onCombutton1Restore(/* cpr.events.CUIEvent */ e){
				/** 
				 * @type udc.com.comButton
				 */
				var combutton1 = e.control;
				
				util.Control.redraw(app, "embapp1");
			}
			
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
			 */
			function onGrdCmnTmpRegSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnTmpReg = e.control;
				
				util.EmbApp.callAppMethod(app, "embapp2", "doInsertDmParam", util.Grid.getCellValue(app, "grdCmnTmpReg", "STUD_NO"));
			}
			
			
			/*
			 * 그리드에서 before-selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트.
			 */
			function onGrdCmnTmpRegBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grdCmnTmpReg = e.control;
				
				if (util.Tab.getSelectedId(app, "tabMain") == 2) {
					// 임베디드 앱 변경 사항 체크
					if (util.isAppModified(app, "CRM", app.getContainer())){
						return false;
					}
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsCmnTmpReg");
			dataSet_1.parseData({
				"info": "STUD_NO",
				"columns": [
					{
						"name": "PARTY_ID",
						"dataType": "string"
					},
					{
						"name": "STUD_NO",
						"dataType": "string"
					},
					{
						"name": "REP_NM",
						"dataType": "string"
					},
					{
						"name": "ENG_NM",
						"dataType": "string"
					},
					{
						"name": "CHA_NM",
						"dataType": "string"
					},
					{
						"name": "GENDER_RCD",
						"dataType": "string"
					},
					{
						"name": "SSN",
						"dataType": "string"
					},
					{
						"name": "STUD_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "DEPT_CD",
						"dataType": "string"
					},
					{
						"name": "DAY_NIGHT_DIV_RCD",
						"dataType": "string"
					},
					{
						"name": "NAT_RCD",
						"dataType": "string"
					},
					{
						"name": "ZIPCODE",
						"dataType": "string"
					},
					{
						"name": "ADDR1",
						"dataType": "string"
					},
					{
						"name": "ADDR2",
						"dataType": "string"
					},
					{
						"name": "CLP_NO",
						"dataType": "string"
					},
					{
						"name": "AEN",
						"dataType": "string"
					},
					{
						"name": "EMAIL",
						"dataType": "string"
					},
					{
						"name": "BANK_RCD",
						"dataType": "string"
					},
					{
						"name": "ACCT_NO",
						"dataType": "string"
					},
					{
						"name": "OWNER_NM",
						"dataType": "string"
					},
					{
						"name": "ATTC_FILE_NO",
						"dataType": "string"
					}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsDetail");
			dataSet_2.parseData({
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
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("dmTime");
			dataMap_1.parseData({
				"columns" : [{"name": "strToday"}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmParam");
			dataMap_2.parseData({
				"columns" : [
					{"name": "strStudNo"},
					{"name": "strMstStudNo"}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "/OneGrid/list.do";
			submission_1.addRequestData(dataMap_2);
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "/OneGrid/save.do";
			submission_2.addRequestData(dataSet_1);
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
				var group_2 = new cpr.controls.Container("grpSearch");
				group_2.userAttr({
					"mobile-column-count": "2",
					"tablet-column-count": "2"
				});
				group_2.style.setClasses(["search-box"]);
				// Layout
				var formLayout_1 = new cpr.controls.layouts.FormLayout();
				formLayout_1.topMargin = "5px";
				formLayout_1.rightMargin = "5px";
				formLayout_1.bottomMargin = "5px";
				formLayout_1.leftMargin = "5px";
				formLayout_1.setColumns(["120px", "200px", "1fr", "60px"]);
				formLayout_1.setRows(["25px"]);
				formLayout_1.setRowAutoSizing(0, true);
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "학번";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var inputBox_1 = new cpr.controls.InputBox("ipb2");
					inputBox_1.tooltip = "학번";
					inputBox_1.userAttr({"autoKeydownSearch": "Y"});
					inputBox_1.bind("value").toDataMap(app.lookup("dmParam"), "strStudNo");
					container.addChild(inputBox_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var group_3 = new cpr.controls.Container("grp1");
					// Layout
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.setColumns(["3fr", "60px"]);
					formLayout_2.setRows(["25px"]);
					formLayout_2.setRowAutoSizing(0, true);
					group_3.setLayout(formLayout_2);
					(function(container){
						var userDefinedControl_2 = new udc.com.comBtnSearch("combtnsearch");
						if(typeof onCombtnsearch1Search == "function") {
							userDefinedControl_2.addEventListener("search", onCombtnsearch1Search);
						}
						container.addChild(userDefinedControl_2, {
							"colIndex": 1,
							"rowIndex": 0,
							"horizontalAlign": "right",
							"verticalAlign": "fill",
							"width": 60
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 2,
						"rowIndex": 0,
						"colSpan": 2,
						"rowSpan": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"autoSize": "height",
					"width": "1320px",
					"height": "37px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "1320px",
				"height": "67px"
			});
			
			var group_4 = new cpr.controls.Container("grpData");
			group_4.userAttr({
				"mobile-column-count": "1",
				"tablet-column-count": "1"
			});
			// Layout
			var formLayout_3 = new cpr.controls.layouts.FormLayout();
			formLayout_3.userResizingMode = "standard";
			formLayout_3.setColumns(["500px", "1fr"]);
			formLayout_3.setRows(["1fr"]);
			group_4.setLayout(formLayout_3);
			(function(container){
				var group_5 = new cpr.controls.Container("grp3");
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.horizontalSpacing = "5px";
				formLayout_4.verticalSpacing = "5px";
				formLayout_4.setColumns(["1fr"]);
				formLayout_4.setRows(["25px", "1fr"]);
				group_5.setLayout(formLayout_4);
				(function(container){
					var userDefinedControl_3 = linker.userDefinedControl_3 = new udc.com.comFormTitle("comformtitle1");
					container.addChild(userDefinedControl_3, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var tabFolder_1 = linker.tabFolder_1 = new cpr.controls.TabFolder("tabMain");
					tabFolder_1.fieldLabel = "학생 상세 탭";
					
					var tabItem_1 = (function(tabFolder){
						var tabItem_1 = new cpr.controls.TabItem();
						tabItem_1.text = "학생상세";
						tabItem_1.name = "tab1";
						var group_6 = new cpr.controls.Container("grpTpc1");
						// Layout
						var xYLayout_1 = new cpr.controls.layouts.XYLayout();
						group_6.setLayout(xYLayout_1);
						(function(container){
							var embeddedApp_1 = new cpr.controls.EmbeddedApp("embapp1");
							if(typeof onEmbapp1AppChange == "function") {
								embeddedApp_1.addEventListener("app-change", onEmbapp1AppChange);
							}
							if(typeof onEmbapp1AppReady == "function") {
								embeddedApp_1.addEventListener("app-ready", onEmbapp1AppReady);
							}
							container.addChild(embeddedApp_1, {
								"top": "0px",
								"right": "0px",
								"bottom": "0px",
								"left": "0px"
							});
						})(group_6);
						tabItem_1.content = group_6;
						return tabItem_1;
					})(tabFolder_1);
					tabFolder_1.addTabItem(tabItem_1);
					
					var tabItem_2 = (function(tabFolder){
						var tabItem_2 = new cpr.controls.TabItem();
						tabItem_2.text = "학생등록정보";
						tabItem_2.name = "tab2";
						var group_7 = new cpr.controls.Container("grpTpc2");
						// Layout
						var xYLayout_2 = new cpr.controls.layouts.XYLayout();
						group_7.setLayout(xYLayout_2);
						(function(container){
							var embeddedApp_2 = new cpr.controls.EmbeddedApp("embapp2");
							if(typeof onEmbapp2AppReady == "function") {
								embeddedApp_2.addEventListener("app-ready", onEmbapp2AppReady);
							}
							if(typeof onEmbapp2AppChange == "function") {
								embeddedApp_2.addEventListener("app-change", onEmbapp2AppChange);
							}
							container.addChild(embeddedApp_2, {
								"top": "0px",
								"right": "0px",
								"bottom": "0px",
								"left": "0px"
							});
						})(group_7);
						tabItem_2.content = group_7;
						return tabItem_2;
					})(tabFolder_1);
					tabFolder_1.addTabItem(tabItem_2);
					tabFolder_1.setSelectedTabItem(tabItem_1);
					if(typeof onTabMainBeforeSelectionChange == "function") {
						tabFolder_1.addEventListener("before-selection-change", onTabMainBeforeSelectionChange);
					}
					if(typeof onTabMainSelectionChange == "function") {
						tabFolder_1.addEventListener("selection-change", onTabMainSelectionChange);
					}
					container.addChild(tabFolder_1, {
						"colIndex": 0,
						"rowIndex": 1
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var group_8 = new cpr.controls.Container("grp5");
				// Layout
				var formLayout_5 = new cpr.controls.layouts.FormLayout();
				formLayout_5.setColumns(["1fr", "260px"]);
				formLayout_5.setRows(["25px", "1fr"]);
				group_8.setLayout(formLayout_5);
				(function(container){
					var userDefinedControl_4 = linker.userDefinedControl_4 = new udc.com.comTitle("comtitle");
					container.addChild(userDefinedControl_4, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
					var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdCmnTmpReg");
					grid_1.fieldLabel = "학생정보";
					grid_1.init({
						"dataSet": app.lookup("dsCmnTmpReg"),
						"columnMovable": true,
						"selectionMulti": "multi",
						"autoFit": "3, 4, 5, 6, 7",
						"resizableColumns": "all",
						"columns": [
							{"width": "25px"},
							{"width": "25px"},
							{"width": "40px"},
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
							"rows": [{"height": "27"}],
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
										cell.text = "구성원ID";
										cell.style.setClasses(["require"]);
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.text = "학번";
										cell.style.setClasses(["require"]);
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.text = "성명";
										cell.style.setClasses(["require"]);
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.text = "영문명";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 7},
									"configurator": function(cell){
										cell.text = "한자명";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.text = "F";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 10},
									"configurator": function(cell){
										cell.text = "이메일";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 9},
									"configurator": function(cell){
										cell.text = "휴대폰번호";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 8},
									"configurator": function(cell){
										cell.text = "주민번호";
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
										cell.columnName = "PARTY_ID";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.columnName = "STUD_NO";
										cell.control = (function(){
											var inputBox_2 = new cpr.controls.InputBox("ipb20");
											inputBox_2.readOnly = true;
											inputBox_2.userAttr({"required": "Y"});
											inputBox_2.bind("value").toDataColumn("STUD_NO");
											return inputBox_2;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.columnName = "REP_NM";
										cell.control = (function(){
											var inputBox_3 = new cpr.controls.InputBox("ipb21");
											inputBox_3.readOnly = true;
											inputBox_3.userAttr({"required": "Y"});
											inputBox_3.bind("value").toDataColumn("REP_NM");
											return inputBox_3;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.columnName = "ENG_NM";
										cell.control = (function(){
											var inputBox_4 = new cpr.controls.InputBox("ipb22");
											inputBox_4.readOnly = true;
											inputBox_4.bind("value").toDataColumn("ENG_NM");
											return inputBox_4;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 7},
									"configurator": function(cell){
										cell.columnName = "CHA_NM";
										cell.control = (function(){
											var inputBox_5 = new cpr.controls.InputBox("ipb23");
											inputBox_5.readOnly = true;
											inputBox_5.bind("value").toDataColumn("CHA_NM");
											return inputBox_5;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.control = (function(){
											var output_2 = new cpr.controls.Output();
											return output_2;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 10},
									"configurator": function(cell){
										cell.columnName = "EMAIL";
										cell.control = (function(){
											var inputBox_6 = new cpr.controls.InputBox("ipb26");
											inputBox_6.readOnly = true;
											inputBox_6.userAttr({"columnType": "email"});
											inputBox_6.bind("value").toDataColumn("EMAIL");
											return inputBox_6;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 9},
									"configurator": function(cell){
										cell.columnName = "CLP_NO";
										cell.control = (function(){
											var inputBox_7 = new cpr.controls.InputBox("ipb25");
											inputBox_7.readOnly = true;
											inputBox_7.userAttr({"columnType": "phone"});
											inputBox_7.bind("value").toDataColumn("CLP_NO");
											return inputBox_7;
										})();
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 8},
									"configurator": function(cell){
										cell.columnName = "SSN";
										cell.control = (function(){
											var inputBox_8 = new cpr.controls.InputBox("ipb24");
											inputBox_8.readOnly = true;
											inputBox_8.userAttr({"columnType": "ssn"});
											inputBox_8.bind("value").toDataColumn("SSN");
											return inputBox_8;
										})();
									}
								}
							]
						}
					});
					if(typeof onGrdCmnTmpRegUpdate == "function") {
						grid_1.addEventListener("update", onGrdCmnTmpRegUpdate);
					}
					if(typeof onGrdCmnTmpRegSelectionChange == "function") {
						grid_1.addEventListener("selection-change", onGrdCmnTmpRegSelectionChange);
					}
					if(typeof onGrdCmnTmpRegBeforeSelectionChange == "function") {
						grid_1.addEventListener("before-selection-change", onGrdCmnTmpRegBeforeSelectionChange);
					}
					container.addChild(grid_1, {
						"colIndex": 0,
						"rowIndex": 1,
						"colSpan": 2,
						"rowSpan": 1
					});
					var userDefinedControl_5 = linker.userDefinedControl_5 = new udc.com.comButton("combutton1");
					if(typeof onCombutton1Save == "function") {
						userDefinedControl_5.addEventListener("save", onCombutton1Save);
					}
					if(typeof onCombutton1Insert == "function") {
						userDefinedControl_5.addEventListener("insert", onCombutton1Insert);
					}
					if(typeof onCombutton1Restore == "function") {
						userDefinedControl_5.addEventListener("restore", onCombutton1Restore);
					}
					container.addChild(userDefinedControl_5, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_8);
				container.addChild(group_8, {
					"colIndex": 0,
					"rowIndex": 0
				});
			})(group_4);
			container.addChild(group_4, {
				"width": "1320px",
				"height": "608px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_3.ctrl = linker.tabFolder_1;
			linker.userDefinedControl_4.ctrl = linker.grid_1;
			linker.userDefinedControl_5.grid = linker.grid_1;
		}
	});
	app.title = "템플릿(탭 + 그리드)";
	cpr.core.Platform.INSTANCE.register(app);
})();
