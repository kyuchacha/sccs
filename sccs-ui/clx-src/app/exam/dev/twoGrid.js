/************************************************
 * cmnCGrid.js
 * Created at 2020. 3. 9. 오후 12:49:14.
 *
 * @author skyha
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		
	util.Submit.send(app, "subOnload", function(pbSuccess){
		if(pbSuccess){
			
		}
	});
}


/**
 * 메시지 목록데이터를 조회한다.
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList(psStatus){
	
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


/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl(psStatus){
     
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
			util.Control.redraw(app, ["grpMst","grpDtl"]);
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch1Search(/* cpr.events.CUIEvent */ e){
	
	// 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMst", "CRM")) {
		return false;
	}
	
	// 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	doList();
	
	
}

 
/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton1Save(/* cpr.event.CUIEvent */ e){
	
	if (!util.Grid.isModified(app, "grdMst", "MSG")) return false;
	
	if (!util.validate(app, "grdMst")) return false;
	
	util.Submit.send(app, "subSaveMst", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMstSelectionChange(/* cpr.events.CSelectionEvent */ e){

	if(util.Grid.getRowState(app, "grdMst") == cpr.data.tabledata.RowState.INSERTED){
		util.Grid.reset(app, "grdDetail");
		return false;
	}
	
	doListDtl();	
}


/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 * 신규 클릭 이벤트
 */
function onCombutton2Insert(/* cpr.event.CUIEvent */ e){
	
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
function onCombutton2Save(/* cpr.event.CUIEvent */ e){
	
	if (!util.Grid.isModified(app, "grdDetail", "MSG")) return false;
	
	if (!util.validate(app, "grdDetail")) return false;
	
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl("save");
		}
	});
	
	
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
//마스터/디테일 그리드 각 작업시 반대되는 작업 영역 비활성화 제어 (각 그룹에 바인딩 처리함.)	
//	var vsMstGrid = "grdMst";
//	var vsDtlGrid = "grdDetail";
//	
//	var vsMstGrp = "grpMst";
//	var vsDtlGrp = "grpDtl";
//	
//	var vcMstGrid = app.lookup(vsMstGrid);
//	var vcDtlGrid = app.lookup(vsDtlGrid);
//	var vcMstDataSet = vcMstGrid.dataSet;
//	var vcDtlDataSet = vcDtlGrid.dataSet;
//	
//	var vcMstGrp = app.lookup(vsMstGrp);
//	var vcDtlGrp = app.lookup(vsDtlGrp);
//	
//	vcMstGrp.bind("enabled").toExpression("#" + vcDtlDataSet.id + ".isModified() ? false : true");
//	vcDtlGrp.bind("enabled").toExpression("(#" + vsMstGrid + ".getRowCount() < 1  || #" + vcMstDataSet.id + ".isModified()) ? false : true");
//	
//	vcMstGrid.addEventListener("update", function(e){
//		vcDtlGrp.redraw();
//	});
//	
//	vcDtlGrid.addEventListener("update", function(e){
//		vcMstGrp.redraw();
//	});
	
}


/*
 * 사용자 정의 컨트롤에서 beforeDelete 이벤트 발생 시 호출.
 * 삭제버튼 클릭전 호출 이벤트(행 삭제전에 체크할 비지니스 로직이 있는 경우 사용)
 */
function onCombutton1BeforeDelete(/* cpr.events.CUIEvent */ e){
	
	//상세내역이 존재하면... 삭제 불가
	var vnDtlRowCnt = util.Grid.getRowCount(app, "grdDetail");
	
	if(vnDtlRowCnt  > 0){
			util.Msg.alert("WRN-M054", [util.Grid.getIndex(app, "grdMst") + 1, 
					util.Control.getProperty(app, "grdMst", "fieldLabel"),
		                       util.Control.getProperty(app, "grdDetail", "fieldLabel")]);
		return false;
	}
	return true;
}



//마스터/디테일 그리드 각 작업시 반대되는 작업 영역 비활성화 제어
/*
 * 사용자 정의 컨트롤에서 commonEvent 이벤트 발생 시 호출.
 * 신규, 삭제, 취소 클릭 공통 이벤트(e.status 로 구분가능)
 */
function onCombutton1CommonEvent(/* cpr.events.CUIEvent */ e){
	util.Control.redraw(app, ["grpDtl"]);
}


/*
 * 사용자 정의 컨트롤에서 commonEvent 이벤트 발생 시 호출.
 * 신규, 삭제, 취소 클릭 공통 이벤트(e.status 로 구분가능)
 */
function onCombutton2CommonEvent(/* cpr.events.CUIEvent */ e){
	util.Control.redraw(app, ["grpMst"]);
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdMstUpdate(/* cpr.events.CGridValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMst = e.control;
	util.Control.redraw(app, ["grpDtl"]);
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrdDetailUpdate(/* cpr.events.CGridValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdDetail = e.control;
	util.Control.redraw(app, ["grpMst"]);
}
