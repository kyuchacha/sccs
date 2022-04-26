/************************************************
 * multiTabs.js
 * Created at 2021. 7. 22. 오후 3:53:50.
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
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTab1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tab1 = e.control;
	if (util.Grid.isModified(app, "grdCmnTmpReg")) {
		doList();
	}
	
	if (util.Grid.isModified(app, "grdCmnTmpReg2")) {
		doList2();
	}
	
	if (util.Grid.isModified(app, ["grdMst","grdDetail"])) {
		doList3();
	}
	
}

/******* 첫번째 탭(그리드) 스크립트 *******/
/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch = e.control;
	// 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdCmnTmpReg", "CRM")) {
		return false;
	}
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch1")) return false;
	
	doList();
}


/**
 * 그리드 데이터를 조회
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 * 
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
/******* 두번째 탭(그리드+폼) 스크립트 *******/
/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch2Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch2 = e.control;
	// 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdCmnTmpReg2", "CRM")) {
		return false;
	}
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch2")) return false;
	
	doList2();
}

/**
 * 메시지 목록데이터를 조회한다.
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList2(psStatus){

	//조회 서브미션 호출
	util.Submit.send(app, "subListTab", function(pbSuccess){
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
function onCombutton2Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton2 = e.control;
	if (!util.Grid.isModified(app, "grdCmnTmpReg2", "MSG")) return false;
	
	if (!util.validate(app, "grdCmnTmpReg2")) return false;
	
	util.Submit.send(app, "subSaveTab", function(pbSuccess){
		if(pbSuccess){
			doList2("save");
		}
	});
}

/******* 세번째 탭(그리드+그리드) 스크립트 *******/
/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch3Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comBtnSearch
	 */
	var combtnsearch3 = e.control;
	// 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMst", "CRM")) {
		return false;
	}
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch3")) return false;
	
	doList3();
}

/**
 * 메시지 목록데이터를 조회한다.
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList3(psStatus){
	
	util.Grid.reset(app, "grdDetail");
	//조회 서브미션 호출
	util.Submit.send(app, "subListMst", function(pbSuccess){
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
			}
			util.Control.redraw(app, ["grpMst","grpDtl"]);
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMstSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMst = e.control;
	if(util.Grid.getRowState(app, "grdMst") == cpr.data.tabledata.RowState.INSERTED){
		util.Grid.reset(app, "grdDetail");
		return false;
	}
	
	doListDtl3();	
}

/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl3(psStatus){
     
     var vsStudNo = util.Grid.getCellValue(app, "grdMst", "STUD_NO");
     util.DataMap.setValue(app, "dmParam", "strMstStudNo", vsStudNo);
     
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
 * 사용자 정의 컨트롤에서 beforeDelete 이벤트 발생 시 호출.
 * 삭제버튼 클릭전 호출 이벤트(행 삭제전에 체크할 비지니스 로직이 있는 경우 사용)
 */
function onCombutton3BeforeDelete(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton3 = e.control;
	//상세내역이 존재하면... 삭제 불가
	var vnDtlRowCnt = util.Grid.getRowCount(app, "grdDetail");
	
	if(vnDtlRowCnt  > 0){
			util.Msg.alert("WRN-M054", [util.Grid.getIndex(app, "grdMst") + 1, util.Control.getProperty(app, "grdMst", "fieldLabel"),
		                       util.Control.getProperty(app, "grdDetail", "fieldLabel")]);
		return false;
	}
	return true;
}


/*
 * 사용자 정의 컨트롤에서 commonEvent 이벤트 발생 시 호출.
 * 신규, 삭제, 취소 클릭 공통 이벤트(e.status 로 구분가능)
 */
function onCombutton3CommonEvent(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton3 = e.control;
	util.Control.redraw(app, ["grpMst","grpDtl"]);
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
	if (!util.Grid.isModified(app, "grdMst", "MSG")) return false;
	
	if (!util.validate(app, "grdMst")) return false;
	
	util.Submit.send(app, "subSaveMst", function(pbSuccess){
		if(pbSuccess){
			doList3("save");
		}
	});
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 * 신규 클릭 이벤트
 */
function onCombutton4Insert(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton4 = e.control;
	var vsToday = util.DataMap.getValue(app, "dmTime", "strToday");
	var vsStudNo = util.Grid.getCellValue(app, "grdMst", "STUD_NO");
	
	util.Grid.setCellValue(app, "grdDetail", "STUD_NO", vsStudNo);
	util.Grid.setCellValue(app, "grdDetail", "IFR_DT", vsToday);
	util.Grid.setCellValue(app, "grdDetail", "PAY_CLOSE_DT", vsToday);
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
	if (!util.Grid.isModified(app, "grdDetail", "MSG")) return false;
	
	if (!util.validate(app, "grdDetail")) return false;
	
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl3("save");
		}
	});
	
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var vsMstGrid = "grdMst";
	var vsDtlGrid = "grdDetail";
	
	var vsMstGrp = "grpMst";
	var vsDtlGrp = "grpDtl";
	
	var vcMstGrid = app.lookup(vsMstGrid);
	var vcDtlGrid = app.lookup(vsDtlGrid);
	var vcMstDataSet = vcMstGrid.dataSet;
	var vcDtlDataSet = vcDtlGrid.dataSet;
	
	var vcMstGrp = app.lookup(vsMstGrp);
	var vcDtlGrp = app.lookup(vsDtlGrp);
	vcMstGrp.bind("enabled").toExpression("#" + vcDtlDataSet.id + ".isModified() ? false : true");
	vcDtlGrp.bind("enabled").toExpression("(#" + vsMstGrid + ".getRowCount() < 1  || #" + vcMstDataSet.id + ".isModified()) ? false : true");
	
	vcMstGrid.addEventListener("update", function(e){
		vcDtlGrp.redraw();
	});
	
	vcDtlGrid.addEventListener("update", function(e){
		vcMstGrp.redraw();
	});
}



/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdCmnTmpReg2Update(/* cpr.events.CGridValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdCmnTmpReg2 = e.control;
	util.Control.redraw(app, "grpCmnTmpReg");
}

