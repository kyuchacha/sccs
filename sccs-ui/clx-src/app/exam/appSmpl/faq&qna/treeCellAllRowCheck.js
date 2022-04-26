/************************************************
* treeCellAllRowCheck.js
 * Created at 2022. 3. 21. 오전 10:48:48.
 *
 * @author aaajd
 ************************************************/


//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}

/**
 * 사용자 정의 함수
 */

/*
 * 트리그리드에서 부모 클릭시 하위 로우 모두 선택하는 함수
 */
function afterRowCheck(grid, rowIndex, checked) {
	var gridRowGroup = grid.getGridRowGroup(rowIndex);
	// 이동된 셀 선택

	for (var i = gridRowGroup.startRowIndex; i <= gridRowGroup.endRowIndex; i++) {
		grid.setCheckRowIndex(i, checked);
	}
	
}

//스크립트 출력 함수
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = value;	
}

//체크박스
function checkboxAfterRowCheck(e) {
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx2 = e.control;
	
	var vcGrid 			= cbx2.getParent();
	var vnRowIdx 		= vcGrid.getSelectedRowIndex();
	var vnCellIdx 		= vcGrid.getCellIndex("check");
	var vsCbxValue 		= cbx2.value;
	var gridRowGroup	= vcGrid.getGridRowGroup(vnRowIdx);
	
	for (var i = gridRowGroup.startRowIndex; i <= gridRowGroup.endRowIndex; i++) {
		vcGrid.setCellValue(i, vnCellIdx, vsCbxValue);
	}
}

//컬럼타입=checkbox
function columnTypeAfterRowCheck(grid, rowIndex, cellIndex, checked) {
	var gridRowGroup = grid.getGridRowGroup(rowIndex);
	
	for (var i = gridRowGroup.startRowIndex; i <= gridRowGroup.endRowIndex; i++) {
		 grid.setCheckRowIndex(i, checked);
	}
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	printSource(columnTypeAfterRowCheck);
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	printSource(checkboxAfterRowCheck);
}

/*
 * 그리드에서 row-check 이벤트 발생 시 호출.
 * Grid의 RowCheckbox가 체크 되었을 때 발생하는 이벤트. (columnType=checkbox)
 */
function onGrd3RowCheck(e){
	var grd3 = e.control;
	
	afterRowCheck(grd3, e.rowIndex, true);
}

/*
 * 그리드에서 row-uncheck 이벤트 발생 시 호출.
 * Grid의 RowCheckbox가 체크 해제되었을 때 발생하는 이벤트. (columnType=checkbox)
 */
function onGrd3RowUncheck(e){
	var grd3 = e.control;
	
	afterRowCheck(grd3, e.rowIndex, false);
}

/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx2ValueChange(e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx2 = e.control;
	
	var vcGrid 			= cbx2.getParent();
	var vnRowIdx 		= vcGrid.getSelectedRowIndex();
	var vnCellIdx 		= vcGrid.getCellIndex("check");
	var vsCbxValue 		= cbx2.value;
	var gridRowGroup	= vcGrid.getGridRowGroup(vnRowIdx);
	
	for (var i = gridRowGroup.startRowIndex; i <= gridRowGroup.endRowIndex; i++) {
		vcGrid.setCellValue(i, vnCellIdx, vsCbxValue);
	}
}
