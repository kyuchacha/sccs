/************************************************
 * ProductList.js
 * Created at 2019. 8. 13. 오전 10:45:31.
 *
 * @author ryu
 ************************************************/

/**
 * 그리드 조회 함수
 */
function doList() {
	var dmPage = app.lookup("dmPage");
	dmPage.setValue("pageIdx", "1");
	
	var vcSubList = app.lookup("subList");
	vcSubList.send();
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	doList();
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){

	var vcSubInit = app.lookup("subInit");
	vcSubInit.send();
}

/*
 * "추가" 버튼(btnInsert)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInsert = e.control;
	
	var vcGrid = app.lookup("grdMst");
	
	var vnSelectedRowIdx = vcGrid.getSelectedRowIndex();
	
	vcGrid.insertRow(vnSelectedRowIdx, false);
}

/*
 * "삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelete = e.control;
	
	var vcGrid = app.lookup("grdMst");
	
	var vnCheckRowIdxs = vcGrid.getCheckRowIndices();
	
	vcGrid.deleteRow(vnCheckRowIdxs);
}

/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	
	var vcSubSave = app.lookup("subSave");
	
	vcSubSave.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subSave = e.control;
	
	var dmMsg = app.lookup("dm_msg");	
	var code = dmMsg.getValue("CODE");
	var message = dmMsg.getValue("MESSAGE");
	alert(message);
	if(code == "S") {
		doList();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	
	app.lookup("grdMst").redraw();
	app.lookup("pageIndex").currentPageIndex = 1;
	app.lookup("pageIndex").redraw();
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnSearch").click();
	}
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGridCUDButtonSave(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.GridCUDButton
	 */
	var gridCUDButton = e.control;
	
	var vcSubSave = app.lookup("subSave");
	
	vcSubSave.send();
	
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pageIndex = e.control;
	
	var dmPage = app.lookup("dmPage");
	
	//페이지 인덱서에서 사용자가 page index를 변경할 경우 인덱스에 맞는 새 데이터를 내려받도록 데이터 맵에 페이지 인덱스를 넣어서 서브미션을 전송합니다.
	dmPage.setValue("pageIdx", e.newSelection);
	app.lookup("subList").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubInitSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subInit = e.control;
	doList();
}


/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 버튼을 클릭했을 때 발생하는 이벤트
 */
function onSearchButtonSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.SearchButton
	 */
	var searchButton = e.control;
	
	app.openDialog("view/sample/dialog/DeptDialog", {width : 500, height : 350}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialogApp.initValue = searchButton.ipbLabel;
		});
	}).then(function(/** cpr.data.RowConfigInfo*/ returnValue){
		if(returnValue) {
			
			/** @type {{DEPT_CD : String, DEPT_NM : String}} */
			var returnData = returnValue;
			
			searchButton.ipbLabel = returnData.DEPT_NM;
			searchButton.ipbValue = returnData.DEPT_CD;
			
			searchButton.redraw();
			//app.lookup("tre1").redraw();
			
			var dmParam = app.lookup("dmParam");
			dmParam.setValue("deptCd", returnData.DEPT_CD);
			dmParam.setValue("deptNm", returnData.DEPT_NM);
		}
	});
	
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSubSaveSubmitError(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subSave = e.control;
	
	var dmMsg = app.lookup("dm_msg");	
	var code = dmMsg.getValue("CODE");
	var message = dmMsg.getValue("MESSAGE");
	if(code == "E") {
		alert(message);
	}
}
