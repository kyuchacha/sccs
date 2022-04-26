//공통 모듈 사용
var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.ComUdcBtn.dispatchEvent(app, "btnSearch", "click");
			util.ComUdcBtn.dispatchEvent(app, "btnSearch2", "click");
			util.ComUdcBtn.dispatchEvent(app, "btnSearch3", "click");
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onBtnSearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var btnSearch = e.control;
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
 * 
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
function onCombutton1Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton1 = e.control;
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
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch = e.control;
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMain2", "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch2")) return false;
	
	// 3. 데이터 조회
	doList();
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMain3SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain3 = e.control;
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
function onCombutton3Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton3 = e.control;
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdMain3", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdMain3")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton4Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton4 = e.control;
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
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onBtnSearch3Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var btnSearch3 = e.control;
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app,  ["grdSub","grdMain3"] , "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch3")) return false;
	
	// 3. 데이터 조회
	doList();
}


/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTab1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tab1 = e.control;
	if (util.Grid.isModified(app, "grdMain")) {
		doList();
	}
	
	if (util.Grid.isModified(app, "grdMain2")) {
		doList();
	}
	
	if (util.Grid.isModified(app, ["grdMain3","grdSub"])) {
		doList();
	}
}


/*
 * 탭 폴더에서 before-selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택하기 전 발생하는 이벤트. 다음 이벤트로 select 이벤트를 발생합니다.
 */
function onTab1BeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tab1 = e.control;
	// 임베디드 앱 변경 사항 체크
	if (util.isAppModified(app, "CRM",app.getContainer())){
		return false;
	}
}


/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton2Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton2 = e.control;
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdMain2", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdMain2")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}
