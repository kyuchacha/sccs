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
}
