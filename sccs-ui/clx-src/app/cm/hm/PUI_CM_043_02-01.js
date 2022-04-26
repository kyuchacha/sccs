//공통 모듈 사용
var util = createCommonUtil();
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
//		if (pbSuccess) {
//			util.Control.redraw(app, "dsSearch");
//			util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
//		}
//	});

	util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
}



/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMain", "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	// 3. 데이터 조회
	doList();
}

/**
 * 그리드 데이터를 조회
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList(psStatus) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
				util.Grid.selectRow(app, "grdMain", 0);
			}
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onComButtonSave(/* cpr.events.CUIEvent */ e){
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdMain", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdMain")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 pagechange 이벤트 발생 시 호출.
 */
function onPageindex1Pagechange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.com.pageindex
	 */
	var pageindex1 = e.control;
	
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMain", "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	// 3. 데이터 조회
	doList();
}


/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 버튼을 클릭했을 때 발생하는 이벤트
 */
function onMenusearchbutton1Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.menuSearchButton
	 */
	var menuSearchButton = e.control;
	
	app.openDialog("app/cm/dialog/PUI_CM_043_02-04", {width : 480, height : 480}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			// dialogApp.initValue = menuSearchButton.ipbLabel;
		});
	}).then(function(/** cpr.data.RowConfigInfo*/ returnValue){
		if(returnValue) {
			
			/** @type {{MENU_ID : String, MENU_NM : String}} */
			var returnData = returnValue;
			
			menuSearchButton.ipbLabel = returnData.MENU_NM;
			menuSearchButton.ipbValue = returnData.MENU_ID;
			
			menuSearchButton.redraw();
			
			util.DataSet.setValue(app, "dsHelp", util.Grid.getIndex(app, "grdMain"), "MENU_ID", returnData.MENU_ID);
			util.DataSet.setValue(app, "dsHelp", util.Grid.getIndex(app, "grdMain"), "MENU_PATH", returnData.MENU_NM);
			
			//app.lookup("tre1").redraw();
			
			//var dmParam = app.lookup("dmParam");
			//dmParam.setValue("deptCd", returnData.DEPT_CD);
			//dmParam.setValue("deptNm", returnData.DEPT_NM);
		}
	});
}



/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	
	var menuSearchButton = app.lookup("menusearchbutton1");
	
	menuSearchButton.ipbLabel = util.DataSet.getValue(app, "dsHelp", util.Grid.getIndex(app, "grdMain"), "MENU_PATH");
	menuSearchButton.ipbValue = util.DataSet.getValue(app, "dsHelp", util.Grid.getIndex(app, "grdMain"), "MENU_ID");
	menuSearchButton.redraw();
}
