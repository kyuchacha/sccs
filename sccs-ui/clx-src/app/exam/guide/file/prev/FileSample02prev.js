/************************************************
 * Template101.js
 * Created at 2020. 3. 7. 오전 9:52:37.
 *
 * @author 1073727
 ************************************************/

//공통모듈 선언
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	//*************화면 load 스크립트
	
	//화면 하단 플로팅 영역 set
//	util.Group.setFloatGrp(app, app.lookup("grpFloat"));
	
	//화면이 로드 된후 공통코드 등을 바인딩 하기 위해 전체 그룹을 redraw 해준다.
	util.Control.redraw(app, ["grpContent"]);
	
	//현재 날짜를 화면에 셋팅해준다.
	var toDate = DateUtil.format(new Date(), "YYYYMMDD");
	app.lookup("udccomdatepicker1").setAppProperty("value", toDate + app.lookup("udccomdatepicker1").getAppProperty("delimiter") + DateUtil.addDate(toDate, 10));
	
	doList();
	
};

/*
 * "조회" 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	
	//조회조건 필수값 유효성 체크
	if (!util.validate(app, ["grpSearch"])) return false;
	
	//조회
	doList();
};

//조회
function doList() {
	//*************조회 사전체크(조회조건필수값체크)는 화면 스크립트로 직접 확인
//	util.Submit.send(app, "subList", function(pbSuccess) {
//		if (pbSuccess) {
//			//조회 후 그리드 redraw
//			util.Control.redraw(app, ["grd1"]);
//			app.lookup("grd1").setCellValue(1, "FILE_MNG_SEQ", "2020092113222300032601")
//			app.lookup("grd1").setCellValue(0, "FILE_MNG_SEQ", "2020092114542900034601")
//			
//		};
//	});
};

/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick( /* cpr.events.CMouseEvent */ e) {
	//*******저장 전 체크 로직	
	//그리드 변경여부 체크
	if (!util.Grid.isModified(app, ["grd1"], "MSG")) return false;
	
	//그리드 필수값 체크
	if (!util.validate(app, ["grd1"])) return false;
	
	doSave();
	
}

//저장
function doSave() {
	//첨부파일 Attach
	
	//서브미션 send
	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			//저장 후 재 조회 한다.
			//			doList();
			app.lookup("grd1").setCellValue(util.Grid.getIndex(app, "grd1"), "FILE_MNG_SEQ", app.lookup("dmFileInfo").getValue("FILE_MNG_SEQ"));
		}
	});
}

/*
 * "삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick( /* cpr.events.CMouseEvent */ e) {
	
	//현재 선택 되어있는 행 삭제플래그
	util.Grid.deleteRow(app, "grd1");
	
	doSave();
	
}

/*
 * "초기화" 버튼(btnFormClear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFormClearClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFormClear = e.control;
	
	util.Group.clear(app, "grpForm1");
}


/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	var fileMngSeq = util.Grid.getCellValue(app, "grd1", "FILE_MNG_SEQ");
}