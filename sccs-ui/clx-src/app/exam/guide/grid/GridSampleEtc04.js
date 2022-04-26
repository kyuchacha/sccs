/************************************************
 * GridSampleEtc04.js
 * Created at 2022. 3. 18. 오후 4:21:05.
 *
 * @author 1amthomas
 ************************************************/


/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	var ds = app.lookup("dsList");
	
	if (e.targetObject.cellIndex == 0) {
		var rowIndex = grd1.getSelectedRowIndex(); //그리드에서 선택된 행의 index
		if (ds.getValue(rowIndex, "condition") == "N") {
			grd1.setCheckRowIndex(rowIndex, false);
		}
	}
}

var _true = true;
/*
 * 그리드에서 header-check 이벤트 발생 시 호출.
 * Grid의 Header Checkbox가 체크 되었을 때 발생하는 이벤트. (columnType=checkbox)
 */
function onGrdListHeaderCheck( /* cpr.events.CGridEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdList = e.control;
	
	var ds = app.lookup("dsList");
	var dsCnt = ds.getRowCount();
	
	if (_true) {
		for (var i = 0; i < dsCnt; i++) {
			if (ds.getValue(i, "condition") == "N") {
				grdList.setCheckRowIndex(i, false);
			}
		}
	} else {
		for (var i = 0; i < dsCnt; i++) {
			grdList.setCheckRowIndex(i, false);
		}
	}
	
	_true = !_true;
}