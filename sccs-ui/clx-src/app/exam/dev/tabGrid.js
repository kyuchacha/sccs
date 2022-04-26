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
	util.Submit.send(app, "subOnload", function(pbSuccess){
		if(pbSuccess){
			
		}
	});
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
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton2Save(/* cpr.event.CUIEvent */ e){
	
	if (!util.Grid.isModified(app, "grdCmnTmpReg", "MSG")) return false;
	
	if (!util.validate(app, "grdCmnTmpReg")) return false;
	
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
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
	
	if (util.isAppModified(app, "CRM", app.getContainer())){
		return false;
	}
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
	
	if(util.Grid.getRowState(app, "grdCmnTmpReg") == cpr.data.tabledata.RowState.INSERTED){
		util.Grid.reset(app, "grdDetail");
	}
	
	doListDtl();	
}

/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl(psStatus){
     var vnStudNo = util.Grid.getCellValue(app, "grdCmnTmpReg", "STUD_NO");
     util.DataMap.setValue(app, "dmParam", "strMstStudNo", vnStudNo);
     
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
function onCombutton2Save2(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton2 = e.control;
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdDetail", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdDetail")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl("save");
		}
	});
}


/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnTmpRegUpdate(/* cpr.events.CGridValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnTmpReg = e.control;
	
	util.Control.redraw(app, "grpCmnTmpReg");
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
	
	//  데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdDetail", "CRM")) return false;
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
	
	if (util.Grid.isModified(app, "grdDetail")) {
		util.Grid.revertAllData(app, "grdDetail");
	}
	
	if (util.Grid.isModified(app, "grdCmnTmpReg")) doList();
}
