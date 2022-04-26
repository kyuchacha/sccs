/************************************************
* gridCellControls.js
 * Created at 2022. 3. 22. 오전 10:27:41.
 *
 * @author 1amthomas
 ************************************************/



function grdUdConstraint(){
	var vcGrid = app.lookup("grd2");
	
	var vsConstraint = app.lookup("cmbCol").value;
	
	/* 입력값 */
	var vnVal = app.lookup("cmbHrz").value;
	
	var vcControl = app.lookup(vsConstraint)
	
	vcGrid.updateConstraint(vcControl, {
		"horizontalAlign": vnVal,
		"width": "100px"
	});
	
}

function grdUdConstraintSpacing(){
	var vcGrid = app.lookup("grd2");
	
	var vsConstraint = app.lookup("cmbCol2").value;
	
	/* 입력값 */
	var vnVal = app.lookup("ipbSp").value;
	
	var vcControl = app.lookup(vsConstraint)
	
	
	vcGrid.updateConstraint(vcControl, {
		 "leftSpacing" : vnVal,
		 "rightSpacing" : vnVal
	});
}

function grdUdConstraintHeight(){
	var vcGrid = app.lookup("grd2");
	
	var vsConstraint = app.lookup("cmbCol3").value;
	
	/* 입력값 */
	var vnVal = app.lookup("ipbWd").value;
	
	var vcControl = app.lookup(vsConstraint)
	
	var vcControlVt = vcGrid.getConstraint(vcControl).verticalAlign;
	
	/* 입력값이 없으면 */
	if (vnVal == '') {
		vcGrid.updateConstraint(vcControl, {
			"verticalAlign": "fill"
		});
		
		/* 그리드 row의 height 초기값 설정 */
		for (var i = 0; i < vcGrid.getDataRowCount(); i++) {
			vcGrid.setRowHeight(i, [40]);
		}
		
	}else {
		
		if (vcControlVt == "fill") {
			vcGrid.updateConstraint(vcControl, {
				"verticalAlign": "center"
			});
		}
		
		vcGrid.updateConstraint(vcControl, {
			"height": vnVal
		});
		
		var vnRowHeight = Number(vnVal) + 10;
		
		/* 그리드 row의 height 설정 */
		for (var i = 0; i < vcGrid.getDataRowCount(); i++) {
			vcGrid.setRowHeight(i, [vnRowHeight]);
		}
	}
	
}

function grdReset(){
	var vcGrd = app.lookup("grd2");
	
	vcGrd.resetGrid();
	
	vcGrd.clearAllRowHeight();
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	/* 동작 실행 */	
	grdUdConstraintSpacing();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = grdUdConstraintSpacing;
	
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	/* 동작 실행 */
	grdUdConstraint();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = grdUdConstraint;
}

/*
 * "실행" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/* 동작 실행 */
	grdUdConstraintHeight();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = grdUdConstraintHeight;	
}

/*
 * "실행" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	/* 동작 실행 */
	grdReset();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = grdReset;
}
