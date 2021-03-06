/*
 * App URI: app/cmn/cmnPFileUpload
 * Source Location: app/cmn/cmnPFileUpload.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/cmn/cmnPFileUpload", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * cmnPFileUplaod.js
			 * Created at 
			 * 첨부파일 업로드 및 파일 다운로드에 대한 요건은 프로젝트별 상이하므로 
			 * 해당 샘플 파일의 업로드 및 다운로드 기능만 참고하시길 바랍니다.
			 * @author 
			 ************************************************/
			var util = createCommonUtil();
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				//초기 파라메터 셋팅
				var initValue = app.getHostProperty("initValue");
				
				var dmParam = app.lookup("dmParam");
				
				var vcFileInput = app.lookup("fileinput1");
				vcFileInput.limitFileSize = initValue.maxUploadSize + initValue.fileSizeUnit;
				if(!ValueUtil.isNull(initValue.allowFileExt)){
					vcFileInput.acceptFile = initValue.allowFileExt;
				}
				//업로드 가능한 경우에만.... 버튼 활성화
				if(initValue.onlyDownload != true && (util.Auth.getMenuInfo(app, "USE_AUTH_RCD") != "CMN045.0002" || initValue.forceUpload == true)){
					app.lookup("btnUpload").visible = true;
					app.lookup("btnDelete").visible = true;
				}
				
				//첨부파일 번호 정보 셋팅
				if(!ValueUtil.isNull(initValue.strAttcFileNo)){
					dmParam.setValue("strAttcFileNo", initValue.strAttcFileNo);
					doList();
				}
				//사용자정의 첨부파일 업로드 경로에 대한 프로그램ID
				if(!ValueUtil.isNull(initValue.userDefineStorePgmId)){
					dmParam.setValue("strUserDefinePgmId", initValue.userDefineStorePgmId);
				}
				
				// 팝업닫기후 다른 메시지를 사용자에게 알려주고싶을때 셋팅 
				//사용자정의 첨부파일 업로드 경로에 대한 프로그램ID
				if(!ValueUtil.isNull(initValue.strCloseMsg)){
					app.lookup("dmMsg").setValue("strMsg", initValue.strCloseMsg);
				}
			}
			
			/**
			 * 첨부파일 목록데이터를 조회한다.
			 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
			 */
			function doList(psStatus){
				if(psStatus == "save"){
					app.lookup("dmParam").setValue("strFileStatRcd", "");
				}else{
					app.lookup("dmParam").setValue("strFileStatRcd", "");
			//		app.lookup("dmParam").setValue("strFileStatRcd", "CMN101.SAVE");
				}
				
				util.Submit.send(app, "subList", function(pbSuccess){
					if(pbSuccess){
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
			 * "파일 업로드" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnUploadClick(/* cpr.events.CMouseEvent */ e){
				app.lookup("fileinput1").openFileChooser();
			}
			
			/*
			 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
			 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onFileinput1ValueChange(/* cpr.events.CValueChangeEvent */ e){
				var fileinput1 = e.control;
				var vaFiles = fileinput1.files;
				
				var initValue = app.getHostProperty("initValue");
				
				if(vaFiles != null && vaFiles.length > 0){
					var submit = app.lookup("subUpload");
					var voFile;
					for(var i = 0, len = vaFiles.length; i < len; i++){
						voFile = vaFiles[i];
						//허용 가능 파일 유형 체크
						if(!FileUtil.checkFileExt(voFile.name, ValueUtil.fixNull(initValue.allowFileExt))) return false;
						
						submit.addFileParameter(voFile.name, voFile);
					}
					
					var initValue = app.getHostProperty("initValue");
					
					util.Submit.send(app, submit.id, function(pbSuccess){
						if(pbSuccess){
							//초기 파라메터 셋팅
							if(ValueUtil.isNull(initValue.strAttcFileNo)){
								//업로드한 첨부번호로 데이터 재조회
								var vsAttcFileNo = ValueUtil.fixNull(app.lookup("dmUpload").getValue("attcFileNo"));
								app.lookup("dmParam").setValue("strAttcFileNo", vsAttcFileNo);
							}
							
							doList('save');
						}
					});
				}
			}
			
			/*
			 * 파일 인풋에서 maxsize-exceed 이벤트 발생 시 호출.
			 * 파일을 추가 시 파일의 크기가 최대 일 경우 발생하는 이벤트. 추가할 파일이 최대 크기보다 큰 경우 발생합니다. 추가된 파일들의 합계가 최대 크기보다 큰 경우 발생합니다.
			 */
			function onFileinput1MaxsizeExceed(/* cpr.events.CFileUploadEvent */ e){
				var fileinput1 = e.control;
				var maxUploadSize = fileinput1.limitFileSize;
				//파일사이즈는 {0}를 초과 할 수 없습니다.
				util.Msg.alert("WRN-M016", [maxUploadSize]);
			}
			
			/*
			 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
				var vaCheckRowIndexes = app.lookup("grdFile").getCheckRowIndices();
				if(vaCheckRowIndexes.length < 1){
					//삭제할 데이터가 없습니다.
					util.Msg.alert("INF-M007");
				}else{
					//{0}을(를) 삭제하시겠습니까?
					if(util.Msg.confirm("CRM-M016", ["선택된 파일"])){
						//ROW 삭제
						util.Grid.deleteRow(app, "grdFile", vaCheckRowIndexes);
						
						//삭제 서브미션 호출
						util.Submit.send(app, "subDelete", function(pbSuccess){
							if(pbSuccess){
								doList('save');
							}
						});
					}
				}
			}
			
			/*
			 * 그리드에서 cell-click 이벤트 발생 시 호출.
			 * Grid의 Cell 클릭시 발생하는 이벤트.
			 */
			function onGrdCodeCellClick(/* cpr.events.CGridEvent */ e){
				if(e.cellIndex == 5){
					var vsSaveFileNm = e.row.getValue("SAVE_FILE_NM");	//저장 파일명
					var vsFileNm = e.row.getValue("FILE_NM");			//파일명
					var vsFilePath = e.row.getValue("FILE_PATH");		//파일경로
					
					app.lookup("dmParamDown").setValue("filePath", vsFilePath+"/"+vsSaveFileNm);
					app.lookup("dmParamDown").setValue("fileNm", vsFileNm);
					
					var voSumit = app.lookup("subCheckExist");
					util.Submit.send(app, "subCheckExist", function(pbSuccess){
						if(pbSuccess){
							if(voSumit.getMetadata("exist") == "Y"){
								doDownFile(vsFilePath+"/"+vsSaveFileNm, vsFileNm);
							}
						}
					});
				}
			}
			
			//파일 다운로드 요청을 보낸다.
			function doDownFile(psSaveFileNm, psFileNm){
				//공통코드 서브미션 호출
				util.Submit.send(app, "subDownload", function(pbSuccess){
					if(pbSuccess) {
					}
				});
			}
			
			/*
			 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
				app.close();
			}
			
			/*
			 * Body에서 before-unload 이벤트 발생 시 호출.
			 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
			 */
			function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
				var vsAttcFileNo = app.lookup("dmParam").getValue("strAttcFileNo");
				var vnFileCnt = app.lookup("grdFile").rowCount;
				var vnFileName = "";
				if(vnFileCnt > 0){
					vnFileName = app.lookup("grdFile").getCellValue(0, "FILE_NM");
					vnFileName += vnFileCnt > 1 ? "외 "+(vnFileCnt-1)+"건" : ""; 
				}
				//첨부파일이 없으면... 모두 삭제된 걸로 판단
				if(vnFileCnt < 1){
					vsAttcFileNo = "";
				}
				
				var initValue = app.getHostProperty("initValue");
				
				/**
				 * 파일업로드 후 부모페이지에서 바로 저장이 실행되는 경우 안내문구가 필요없어서 예외처리함.
				 */
				if(initValue.infoMsgShowYn == "Y"){
					if(vnFileCnt > 0 && ValueUtil.isNull(initValue.strAttcFileNo)){
						var strMsg = app.lookup("dmMsg").getValue("strMsg");
						if(!ValueUtil.isNull(strMsg)){
							util.Msg.alert(strMsg);
						}else{				
							util.Msg.alert("최초 첨부파일 업로드시 창을 닫은 후 저장버튼을 클릭해야 합니다.");
						}
					}else if(vnFileCnt < 1 && !ValueUtil.isNull(initValue.strAttcFileNo)){
						util.Msg.alert("전체 첨부파일 삭제시 창을 닫은 후 저장버튼을 클릭해야 합니다.");
					}
				}
				app.setHostProperty("returnValue", {"attcFileNo":vsAttcFileNo, "fileCnt":vnFileCnt, "fileNm": vnFileName});
			}
			
			
			/*
			 * "전체다운" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnDownAllClick(/* cpr.events.CMouseEvent */ e){
				if(app.lookup("grdFile").getRowCount() < 1) return;
				
				var voSumit = app.lookup("subDownloadAll");
				voSumit.addParameter("strAttcFileNo", app.lookup("dmParam").getValue("strAttcFileNo"));
				//공통코드 서브미션 호출
				util.Submit.send(app, voSumit.id, function(pbSuccess){
					if(pbSuccess) {
					}
				});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsFile");
			dataSet_1.parseData({
				"info": "ATTC_FILE_NO,SEQ",
				"columns": [
					{"name": "ATTC_FILE_NO"},
					{"name": "SEQ"},
					{"name": "PGM_ID"},
					{"name": "USER_ID"},
					{"name": "FILE_NM"},
					{"name": "SAVE_FILE_NM"},
					{"name": "FILE_STAT_NM"},
					{"name": "FILE_PATH"},
					{"name": "FILE_EXT"},
					{"name": "FILE_SIZE"},
					{"name": "CRT_DTTM"},
					{"name": "FILE_ICON_IMG"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmParam");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "strAttcFileNo",
						"dataType": "string",
						"defaultValue": ""
					},
					{"name": "strUserDefinePgmId"},
					{
						"name": "strFileStatRcd",
						"defaultValue": ""
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmUpload");
			dataMap_2.parseData({
				"columns" : [
					{"name": "attcFileNo"},
					{"name": "fileNm"},
					{"name": "fileSize"}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmParamDown");
			dataMap_3.parseData({
				"columns" : [
					{"name": "filePath"},
					{"name": "fileNm"}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmMsg");
			dataMap_4.parseData({
				"columns" : [{"name": "strMsg"}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("subUpload");
			submission_1.action = "/CmnFile/upload.do";
			submission_1.mediaType = "multipart/form-data";
			submission_1.responseType = "text";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_2, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subList");
			submission_2.action = "/CmnFile/list.do";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subDelete");
			submission_3.action = "/CmnFile/delete.do";
			submission_3.addRequestData(dataMap_1);
			submission_3.addRequestData(dataSet_1);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subCheckExist");
			submission_4.action = "/CmnFile/checkFileExist.do";
			submission_4.addRequestData(dataMap_3);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("subDownload");
			submission_5.action = "/CmnFile/download.do";
			submission_5.mediaType = "application/x-www-form-urlencoded";
			submission_5.responseType = "blob";
			submission_5.addRequestData(dataMap_3);
			app.register(submission_5);
			
			var submission_6 = new cpr.protocols.Submission("subDownloadAll");
			submission_6.action = "/CmnFile/downloadAll.do";
			submission_6.mediaType = "application/x-www-form-urlencoded";
			submission_6.responseType = "filedownload";
			submission_6.addRequestData(dataMap_3);
			app.register(submission_6);
			
			app.supportMedia("all and (min-width: 1320px)", "eXFrame");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1319px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
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
			group_1.style.setClasses(["header-box"]);
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.scrollable = false;
			verticalLayout_2.spacing = 0;
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				userDefinedControl_1.groupBoxIds = "grpData";
				userDefinedControl_1.searchBoxId = "grpSearch";
				container.addChild(userDefinedControl_1, {
					"autoSize": "none",
					"width": "690px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "700px",
				"height": "30px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "5px";
			formLayout_1.verticalSpacing = "5px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["20px", "1fr", "30px"]);
			formLayout_1.setRowAutoSizing(0, true);
			group_2.setLayout(formLayout_1);
			(function(container){
				var group_3 = new cpr.controls.Container("grp4");
				group_3.userAttr({
					"mobile-column-count": "1",
					"tablet-column-count": "2"
				});
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr", "270px"]);
				formLayout_2.setRows(["20px"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var userDefinedControl_2 = linker.userDefinedControl_2 = new udc.com.comFormTitle("comformtitle1");
					container.addChild(userDefinedControl_2, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var group_4 = new cpr.controls.Container("grp5");
					group_4.userAttr({"not_responsive_target": "true"});
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.topMargin = "0px";
					formLayout_3.rightMargin = "0px";
					formLayout_3.bottomMargin = "0px";
					formLayout_3.leftMargin = "0px";
					formLayout_3.setColumns(["100px", "10px", "80px", "60px"]);
					formLayout_3.setRows(["1fr"]);
					group_4.setLayout(formLayout_3);
					(function(container){
						var button_1 = new cpr.controls.Button("btnDelete");
						button_1.visible = false;
						button_1.value = "삭제";
						button_1.style.setClasses(["btn-delete-save"]);
						if(typeof onBtnDeleteClick == "function") {
							button_1.addEventListener("click", onBtnDeleteClick);
						}
						container.addChild(button_1, {
							"colIndex": 3,
							"rowIndex": 0
						});
						var button_2 = new cpr.controls.Button("btnDownAll");
						button_2.value = "전체다운";
						if(typeof onBtnDownAllClick == "function") {
							button_2.addEventListener("click", onBtnDownAllClick);
						}
						container.addChild(button_2, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var button_3 = new cpr.controls.Button("btnUpload");
						button_3.visible = false;
						button_3.value = "파일 업로드";
						button_3.style.setClasses(["btn-commit"]);
						if(typeof onBtnUploadClick == "function") {
							button_3.addEventListener("click", onBtnUploadClick);
						}
						container.addChild(button_3, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_4);
					container.addChild(group_4, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grdFile");
				grid_1.fieldLabel = "첨부파일목록";
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("dsFile"),
					"autoFit": "3",
					"columns": [
						{"width": "25px"},
						{"width": "40px"},
						{
							"width": "20px",
							"visible": false
						},
						{"width": "359px"},
						{"width": "95px"},
						{"width": "70px"},
						{
							"width": "60px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						},
						{
							"width": "100px",
							"visible": false
						}
					],
					"header": {
						"rows": [{"height": "24"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "No";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2, "rowSpan": 1, "colSpan": 2},
								"configurator": function(cell){
									cell.text = "파일명";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "사이즈(byte)";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "상태";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "업로드일시";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "업로드사용자ID";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "checkbox";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.style.css({
										"border-right-style" : "none",
										"border-top-width" : "0px",
										"border-left-style" : "none",
										"border-right-width" : "0px",
										"border-left-width" : "0px",
										"border-top-style" : "none"
									});
									cell.control = (function(){
										var image_1 = new cpr.controls.Image("img1");
										image_1.bind("src").toDataColumn("FILE_ICON_IMG");
										(function(image_1){
										})(image_1);
										return image_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "FILE_NM";
									cell.style.css({
										"padding" : "0px 2px 0px 2px"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "FILE_SIZE";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.control = (function(){
										var button_4 = new cpr.controls.Button("btn1");
										button_4.value = "다운로드";
										return button_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "FILE_STAT_NM";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "CRT_DTTM";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "USER_ID";
								}
							}
						]
					}
				});
				if(typeof onGrdCodeCellClick == "function") {
					grid_1.addEventListener("cell-click", onGrdCodeCellClick);
				}
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var group_5 = new cpr.controls.Container("grp3");
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.topMargin = "5px";
				formLayout_4.rightMargin = "0px";
				formLayout_4.bottomMargin = "5px";
				formLayout_4.leftMargin = "0px";
				formLayout_4.setColumns(["1fr", "70px", "1fr"]);
				formLayout_4.setRows(["20px"]);
				group_5.setLayout(formLayout_4);
				(function(container){
					var button_5 = new cpr.controls.Button("btnClose");
					button_5.value = "화면닫기";
					button_5.style.setClasses(["btn-pop-close"]);
					if(typeof onBtnCloseClick == "function") {
						button_5.addEventListener("click", onBtnCloseClick);
					}
					container.addChild(button_5, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var fileInput_1 = new cpr.controls.FileInput("fileinput1");
					fileInput_1.visible = false;
					fileInput_1.multiple = true;
					fileInput_1.limitFileSizeUnit = "mb";
					fileInput_1.limitFileSize = 50;
					if(typeof onFileinput1ValueChange == "function") {
						fileInput_1.addEventListener("value-change", onFileinput1ValueChange);
					}
					if(typeof onFileinput1MaxsizeExceed == "function") {
						fileInput_1.addEventListener("maxsize-exceed", onFileinput1MaxsizeExceed);
					}
					container.addChild(fileInput_1, {
						"colIndex": 2,
						"rowIndex": 0
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 0,
					"rowIndex": 2
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "none",
				"width": "700px",
				"height": "315px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyBeforeUnload == "function"){
				app.addEventListener("before-unload", onBodyBeforeUnload);
			}
			// Linking
			linker.userDefinedControl_2.ctrl = linker.grid_1;
		}
	});
	app.title = "첨부파일팝업";
	cpr.core.Platform.INSTANCE.register(app);
})();
