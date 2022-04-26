//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "cmbJob");
			util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
		}
	});
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
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	if(util.Grid.getRowState(app, "grdMain") == cpr.data.tabledata.RowState.INSERTED){
		util.Grid.reset(app, "grdSub");
		return false;
	}
	
	doListDtl();	
}

/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl(psStatus){
     var vsDeptNo = util.Grid.getCellValue(app, "grdMain", "DEPTNO");
     util.DataMap.setValue(app, "dmParamDtl", "strDeptNo", vsDeptNo);
     
	//조회 서브미션 호출
	util.Submit.send(app, "subListDtl", function(pbSuccess){
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
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton1Save(/* cpr.events.CUIEvent */ e){
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdSub", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdSub")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl("save");
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton2Save(/* cpr.events.CUIEvent */ e){
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdSub2", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdSub2")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl("save");
		}
	});
}
