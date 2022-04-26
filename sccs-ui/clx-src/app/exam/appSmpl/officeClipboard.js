/************************************************
 * CopyPaste.js
 * Created at 2020. 9. 9. 오후 2:46:09.
 *
 * @author ryu54
 ************************************************/

var util = createCommonUtil();

/************************************************
 * 그리드 -> 오피스 복사/붙여넣기
 ************************************************/

/**
 * 
 * @param {cpr.controls.Grid} grd
 * @param {"cell" | "row" | "column"} selUnit
 * @parem {String} data
 */
function copyHtml(grd, selUnit, data) {
	var tagArr = null;
	switch(selUnit) {
		case "cell" : {
			tagArr = copyCellHtml(grd, data);
			break;
		}
		case "row" : {
			tagArr = copyRowHtml(grd, data);
		}
		case "column" : {
			tagArr = copyColumnHtml(grd, data);
		}
	}
	
	var clipTag = getClipboardNode();
	var tblTag = clipTag.firstElementChild;
	tblTag.innerHTML = tagArr.join("");
	tagArr = null;
	
	var selection = window.getSelection();
	selection.removeAllRanges();
	
	var isIE = (cpr.core.Platform.INSTANCE.browserInfo.name == "ie");
	if(isIE) {
		var range = document.createRange();
    	range.selectNode(tblTag);
    	selection.addRange(range);
	} else {
		selection.selectAllChildren(tblTag);
	}
	
	document.execCommand("copy");
	
	selection.removeAllRanges();
	
	/* 클립보드 태그 삭제 (스크롤 방지) */
	var clipTag = document.getElementById("gridClipboard");
	document.body.removeChild(clipTag);
}

function getClipboardNode() {
	var clipTag = document.getElementById("gridClipboard");
	if(!clipTag) {
		clipTag = document.createElement("div");
		clipTag.id = "gridClipboard";
		clipTag.style.width = "1px";
		clipTag.style.height = "1px";
		clipTag.style.overflow = "hidden";
		clipTag.style.position = "absolute";
		clipTag.style.left = "-1px";
		clipTag.style.top = "-1px";
		
		var tblTag = document.createElement("table");
		tblTag.style.border = "1px solid black";
		tblTag.style.borderCollapse = "collapse";
		clipTag.appendChild(tblTag);
		
		clipTag = document.body.appendChild(clipTag);
	}
	
	return clipTag;
}


function copyCellHtml(/* cpr.controls.Grid */ grd, data) {
	var htmlText = [];
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length - 1; i++){
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}
	
	return htmlText;
}

/**
 * 행을 복사합니다.
 * @param {cpr.controls.Grid} grd
 * @param {String} data
 */
function copyRowHtml(grd, data) {
	var htmlText = [];
	var selectDataRowCount = grd.getSelectedRowIndices().length;
	var designRowCount = grd.detail.getRowHeights().length;
	var selectedRowCount = selectDataRowCount * designRowCount;
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length; i++){
		if(i >= selectedRowCount){
			break;
		}
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}
	
	return htmlText;
}

/**
 * 열을 복사합니다.
 * @param {cpr.controls.Grid} grd
 * @param {String} data
 */
function copyColumnHtml(grd, data) {
	
	var htmlText = [];
	var totalDataRowCount = grd.getRowCount();
	var designRowCount = grd.detail.getRowHeights().length;
	var selectedRowCount = totalDataRowCount * designRowCount;
	
	var rows = data.split("\n");
	for(var i = 0; i < rows.length; i++){
		if(i >= selectedRowCount){
			break;
		}
		
		var datas = rows[i].split("\t");
		if(datas.length > 0) {
			htmlText[htmlText.length] = "<tr>";
			for(var j = 0; j < datas.length; j++){
				htmlText[htmlText.length] = "<td style='border-left: 1px solid #000000; "
				 + "border-right: 1px solid #000000; "
				 + "border-bottom: 1px solid #000000; "
				 + "border-top: 1px solid #000000;'>";
				htmlText[htmlText.length] = datas[j];
				htmlText[htmlText.length] = "</td>";
			}
			htmlText[htmlText.length] = "</tr>";
		}
	}

	
	return htmlText;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.SelectCtl.selectItem(app, "cmbCpPst", 0);
	
	util.Submit.send(app, "subList", null, function (pbSuccess) {
		if (pbSuccess){
			util.Control.redraw(app, "grdMst");
		}	
	});
}


/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	/* 그리드의 셀렉션을 제거 */
	if (e.keyCode == cpr.events.KeyCode.ESC){
		app.lookup("grdMst").clearSelection();
	}
}


/*
 * 그리드에서 copy 이벤트 발생 시 호출.
 * Grid의 선택된 요소를 ctrl + c 로 복사했을 때 발생하는 이벤트.
 */
function onGrdMstCopy(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMst = e.control;

	var vsCpPstVal = util.Control.getValue(app, "cmbCpPst");

	if (vsCpPstVal == "office"){
		var selUnit = grdMst.selectionUnit;
		
		e.preventDefault();
		
		copyHtml(grdMst, selUnit, e.data);
	}
}


/*
 * 그리드에서 before-paste 이벤트 발생 시 호출.
 * Grid에서 ctrl + v 로 붙여넣기시 붙여넣기 전에 발생하는 이벤트.
 */
function onGrdMstBeforePaste(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMst = e.control;
	
	var vsCpPstVal = util.Control.getValue(app, "cmbCpPst");

	if (vsCpPstVal == "grid"){
		var vaSelectedCells = grdMst.getSelectedCellIndices();
	
		if(vaSelectedCells != null && vaSelectedCells.length == 0) {
			var data = e.data.split("\n");
			var vnCount = data.length - 1;
			
			for(var idx = 0; idx < vnCount; idx++){
				grdMst.insertRow(0);
			}
			grdMst.redraw();
		}
	}
}


/*
 * "초기화" 버튼(btnRvrt)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRvrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRvrt = e.control;
	
	app.lookup("dsList").revert();
	
	app.lookup("grdMst").clearSelection();
}
