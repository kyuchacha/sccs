//공통 유틸(Util) 클래스
var util = createCommonUtil();

/**
 * 그리드가 팝 아웃 되어있는지 여부.
 */
var mbPopOuted = false;
/**
 * 원래 부모에 속해 있었을 때의 레이아웃 컨스트레인트.
 */
var moOriginalConstraint = null;
/** 
 * 그리드의 원래 부모.
 * @type cpr.controls.Container 
 */
var moOriginalParent = null;
/** 
 * 그리드가 팝아웃 되었을 때 부모역할을 할 래퍼.
 * @type cpr.controls.Container 
 */
var moWrapper = null;

var moHostApp = null;

function onBodyLoad(/* cpr.events.CEvent */ e){
	var vcCtrl = app.getAppProperty("ctrl");
	if(vcCtrl){
		app.lookup("optTilte").value = vcCtrl.fieldLabel;
		if(vcCtrl.type == "grid"){
			if(vcCtrl.dataSet){
				app.setAppProperty("rowCount", vcCtrl.dataSet.getRowCount());
			}else{
				app.setAppProperty("rowCount", "0");
			}
		}
	}
	
	//다운로드 권한이 없으면... 엑셀버튼 숨김
	if(util.Auth.getMenuInfo(app, "DOWNLD_YN") !== "Y"){
		//app.setAppProperty("showExportExcel", false);
	}
	
	//모바일 화면이면... 엑셀버튼 숨김
	var mainApp = util.getMainApp(app);
	if(mainApp){
		if(mainApp.getContainer().userAttr("adaptive-screen") === "true"){
			app.setAppProperty("showExportExcel", false);
			
			var layout = app.lookup("grp1").getLayout();
			layout.setColumnVisible(1, false);
			layout.setColumnVisible(2, false);
			layout.setColumnVisible(3, false);
			layout.setColumnVisible(4, false);
		}
	}
	
	//View-Port에 대한 확대보기 사용여부에 따른 이벤트 추가
	var vbUseViewPartPopout = true;//어플리케이션 설정에서 사용 유/무 설정 가능
	try{
		var dmAppConfig = app.getRootAppInstance().callAppMethod("getAppConfig");
		vbUseViewPartPopout = dmAppConfig.getValue("userViewPartPopOut") === "N" ? false : true;
	}catch(ex){vbUseViewPartPopout = false;}
	
	if(vbUseViewPartPopout){
		app.lookup("optTilte").addEventListener("dblclick", function(e){
			if(mbPopOuted === true){
				doClosePopView();
			}else{
				doPopoutView();
			}
		});
	}
	
	var vcBtnYn = app.getAppProperty("showExpandBtn");

	if(vcBtnYn){
		app.lookup("grp1").getLayout().setColumnVisible(4, vcBtnYn);
	}
}

/*
 * "엑셀출력" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExcelExportClick(/* cpr.events.CMouseEvent */ e){
	var vcCtrl = app.getAppProperty("ctrl");
	var exportTitle = !ValueUtil.isNull(app.getAppProperty("exportTitle")) ? app.getAppProperty("exportTitle") : app.lookup("optTilte").value;
	var _app = vcCtrl.getAppInstance();
	util.Grid.exportData(_app, vcCtrl.id, exportTitle, null, "xlsx", null, !app.getAppProperty("exportHiddenColumns"), app.getAppProperty("exportExcludePart"));
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	if(e.property == "rowCount"){
		app.lookup("optRowCount").redraw();
		
//		if ( app.getAppProperty("optRowCount") == "0"){
//			app.lookup("grp1").getLayout().setColumnVisible(5, false);
//		} else{
//			app.lookup("grp1").getLayout().setColumnVisible(5, true);
//		}
		
	}else if(e.property == "showExportExcel"){
		if(app.getAppProperty("showExportExcel") === false){
			app.lookup("grp1").getLayout().setColumnVisible(6, false);
		}
	}else if(e.property == "title"){
		app.lookup("optTilte").value = e.newValue;
	}else if(e.property == "showExpandBtn"){
		app.lookup("grp1").getLayout().setColumnVisible(4, app.getAppProperty("showExpandBtn"));
	}
}

/**
 * 선택된 View-Port를 화면 최상위로 올려, 확대보기 처리한다.
 */
function doPopoutView(){
	/** @type cpr.controls.Grid */
	var vcGrid = app.getAppProperty("ctrl");
	if(vcGrid == null) return;
	
	if (mbPopOuted === true) return;
	
	var vcViewCtrl = vcGrid.getParent();
	
	moHostApp = vcGrid.getAppInstance();
	
	// 팝 아웃 시키기전 필요한 상태들을 백업 함.
	moOriginalParent = vcViewCtrl.getParent();
	moOriginalConstraint = moOriginalParent.getConstraint(vcViewCtrl);

	// 원래 부모로 부터 그리드 제거.
	moOriginalParent.removeChild(vcViewCtrl);

	// 플로팅 시킬 그룹
	moWrapper = new cpr.controls.Container();
	moWrapper.style.css({
		position: "fixed",
		top: "50px",
		right: "50px",
		bottom: "50px",
		left: "50px",
		background: "white", // 배경을 가려 줘야 함.
	});
	
	// 닫기 버튼 생성 및 추가.
	var closeButton = new cpr.controls.Button();
	closeButton.value = "닫기";
	closeButton.addEventListenerOnce("click", (function() {
		doClosePopView();
	}));

	moWrapper.addChild(closeButton, {
		bottom: "10px",
		width: "80px",
		height: "25px",
		left: "calc(50% - 40px)"
	});

	// 플로팅 될 그룹에 그리드 추가.
	moWrapper.addChild(vcViewCtrl, {
		top: "5px",
		right: "5px",
		bottom: "45px",
		left: "5px"
	});

	// 그룹을 플로팅 시킴.
	moHostApp.getRootAppInstance().floatControl(moWrapper);

	// 플로팅 된 그룹에 애니메이션 재생.
	moWrapper.style.animateFrom({
		"transform": "translateZ(-300px)"
	}, 0.3, cpr.animation.TimingFunction.EASE_OUT_BACK);
	
	mbPopOuted = true;
}

/**
 * View-Port 확대보기 되돌리기
 * 확대보기 처리된 컨트롤을 다시 원래상태로 되돌린다.
 */
function doClosePopView(){
	/** @type cpr.controls.Grid */
	var vcGrid = app.getAppProperty("ctrl");
	if(vcGrid == null) return;
	
	if (mbPopOuted === false) return;
	
	var vcViewCtrl = vcGrid.getParent();
	
	// 래퍼로 부터 그리드 제거.
	moWrapper.removeChild(vcViewCtrl);
	
	// 원래 부모에 그리드를 다시 추가.
	moOriginalParent.addChild(vcViewCtrl, moOriginalConstraint);

	// 플롯된 래퍼를 제거.
	moWrapper.getParent().removeChild(moWrapper);
	moWrapper = null;
	
	// 그리드에 애니메이션 추가.
	vcViewCtrl.style.animateFrom({
		"transform" : "translateZ(100px)",
		"opacity" : "0"
	}, 0.1);
	
	mbPopOuted = false;
}



/*
 * 버튼(btnTools)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnToolsClick(/* cpr.events.CMouseEvent */ e){
	/**@type cpr.controls.Grid */
	var grid = app.getAppProperty("ctrl");
	if(grid == null || grid.type !== "grid"){
		alert("Can not find Target Grid Control!");
		return false;
	}
	
	var vsGridKey = grid.getAppInstance().id + grid.id;
	
	var ctxMenu = new cpr.controls.Menu("ctx_menu");
	//ctxMenu.addItem(new cpr.controls.TreeItem("찾기", "1", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("정렬취소", "2", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("필터", "3", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("필터취소", "4", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("개인화저장", "7", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("초기화", "8", "root"));
//	ctxMenu.addItem(new cpr.controls.TreeItem("컬럼숨김", "5", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("인쇄", "6", "root"));
	ctxMenu.addItem(new cpr.controls.TreeItem("컬럼 설정", "9", "root"));
	
	// 인쇄시 그리드에 선택된 행이 존재할 경우 컨트롤 영역이 보여져 그리드 선택 clear 후 재 선택되도록 수정 (2021.07.29 추가)
	var vaGrdSelectIdx = grid.getSelectedIndices();
	ctxMenu.addEventListener("before-selection-change", function(e){
		vaGrdSelectIdx = grid.getSelectedIndices();
		grid.clearSelection();
	});
	
	// 인쇄시 그리드에 선택된 행이 존재할 경우 컨트롤 영역이 보여져 그리드 선택 clear 후 재 선택되도록 수정 (2021.07.29 추가)
	ctxMenu.addEventListener("dispose", function(e){
		grid.selectRows(vaGrdSelectIdx);
	});
	
	ctxMenu.addEventListener("item-click", function(/**@type cpr.events.CItemEvent */ e){
		var itemValue = e.item.value;
		
		//찾기
		if(itemValue == "1"){
			//팝업 호출 파라메터
			var initValue = {"grid": grid, "headerRowIndex":app.getAppProperty("headerRowIndex")};
			util.Dialog.open(app, "app/cmn/cmnPFind", 500, 150, function(e){
			
			}, initValue);
		//정렬취소
		}else if(itemValue == "2"){
			if(grid) grid.header.clearSort();
		//필터 보여주기
		}else if(itemValue == "3"){
			var isHFiltered = false;
			var column, filterStr;
			for(var i=0, len=grid.header.cellCount; i<len; i++){
				column = grid.header.getColumn(i);
				filterStr = column.getFilter();
				if(filterStr != null && filterStr[0] != "__all__"){
					isHFiltered = true;
					break;
				}
			}
			if(!isHFiltered){
				var hTRowIndex = app.getAppProperty("headerRowIndex");
				for(var i=0, len=grid.header.cellCount; i<len; i++){
					column = grid.header.getColumn(i);
					if(hTRowIndex > -1){
						if((column.rowIndex + column.rowSpan) == (hTRowIndex+1) && column.targetColumnName != ""){
							column.filterable = true;
						}
					}else{
						if(column.targetColumnName != ""){
							column.filterable = true;
						}
					}
				}
			}
		//필터 해제 및 필터 숨김
		}else if(itemValue == "4"){
			if(grid){
				grid.header.clearFilter();
				var column;
				for(var i=0, len=grid.header.cellCount; i<len; i++){
					column = grid.header.getColumn(i);
					column.filterable = false;
				}
			}
		//컬럼 숨김/보이기
		}else if(itemValue == "5"){
			//팝업 호출 파라메터
			var initValue = {"grid": grid, "headerRowIndex":app.getAppProperty("headerRowIndex")};
			util.Dialog.open(app, "app/cmn/cmnPColumns", 400, 330, function(e){
			
			}, initValue);
		
		//인쇄
		}else if(itemValue == "6"){
			/*
			var targetEle = document.getElementById("uuid-"+grid.uuid);
			// 3.DOM의 text를 얻습니다.
			var content = targetEle.innerHTML;
			// 오픈되는 윈도우에 프린트하려는 데이터를 공유합니다.
		    sessionStorage.setItem("print-content", content);
		    var windowWidth = (window.innerWidth | document.body.clientWidth)-500;
			var windowHeight = (window.innerHeight | document.body.clientHeight)-300;
			var width = windowWidth > 600 ? windowWidth : 600;
			var height = windowHeight > 400 ? windowHeight : 400;
			
			//print하는 페이지를 엽니다.
			var popWindow = window.open('app/com/inc/print.html',"print",'left=100,top=100, resizable=yes, height='+height+',width='+width);
			* */
			
			sessionStorage.setItem("print-content", getHTMLToGrid([grid], {
					title : grid.fieldLabel,
				})); 
			
			var windowWidth = (window.innerWidth | document.body.clientWidth)-500;
			var windowHeight = (window.innerHeight | document.body.clientHeight)-300;
			var width = windowWidth > 600 ? windowWidth : 600;
			var height = windowHeight > 400 ? windowHeight : 400;
			var popWindow = window.open('app/com/inc/print.html',"print",'left=100,top=100, resizable=yes, height='+height+',width='+width);
		}else if(itemValue == "7"){
			var voGridLayout = grid.getColumnLayout();
			var vsGridLayout = JSON.stringify(voGridLayout);
			localStorage.setItem( vsGridKey , vsGridLayout);
			util.Msg.notify(app, "그리드 상태가 저장되었습니다.");
		}else if(itemValue == "8"){
			localStorage.setItem( vsGridKey , null);
			grid.resetGrid();
			util.Msg.notify(app, "그리드가 초기화 되었습니다.");
		
		// 그리드 컬럼 필터팝업 (2021.10.05 추가)
		} else if(itemValue == "9") {
			if(rootContainer == null || showConstraint == null) return;
			
			var grdFilter = new udc.com.gridFilter();
			grdFilter.userAttr("grid-filter", "true");
			grdFilter.grid = grid;
			grdFilter.addEventListenerOnce("cnclClick", function(e) {
				rootContainer.removeChild(grdFilter);
			})
			grdFilter.addEventListenerOnce("okClick", function(e) {
				rootContainer.removeChild(grdFilter);
			})
			
			var vnWidth = 320;
			showConstraint.width = vnWidth + "px";
			showConstraint.left = parseInt(_.clone(showConstraint.left)) - (vnWidth/2) + "px";
			
			rootContainer.addEventListenerOnce("click", function(){
				rootContainer.removeChild(grdFilter);
			})
			
			rootContainer.floatControl(grdFilter, showConstraint);
		}
		ctxMenu.dispose();
	});
	
	ctxMenu.addEventListenerOnce("blur", function(/**@type cpr.events.CFocusEvent*/ e){
		// 인쇄시 그리드에 선택된 행이 존재할 경우, 컨트롤 영역이 보여져 그리드 선택 clear 후 재 선택되도록 수정 (2021.07.29 추가)
		grid.selectRows(vaGrdSelectIdx);
		e.control.dispose();
	});
		
	/**@type cpr.controls.Container */
	var rootContainer = null;
	var showConstraint = {
		"position" : "absolute",
		"width" : "auto",
		"height" : "auto"
	};
	if(util.Dialog.isPopup(grid.getAppInstance())){
		rootContainer = grid.getAppInstance().getContainer();
		
		if((e.clientY - rootContainer.getActualRect().top + 130) > rootContainer.getActualRect().height )
			showConstraint.top = (e.clientY - rootContainer.getActualRect().top - 130) +"px";
		else
			showConstraint.top = (e.clientY - rootContainer.getActualRect().top) +"px";
		
		showConstraint.left = (e.clientX - (rootContainer.getActualRect().left + 130)) + "px";
	}else{
		rootContainer = grid.getAppInstance().getRootAppInstance().getContainer();
		
		showConstraint.top = e.clientY + "px";
		if(e.clientX < 130){
			showConstraint.left = "0px";
		}else{
			showConstraint.left = (e.clientX - 130) + "px";
		}
	}
	var layout = rootContainer.getLayout();
	if(layout instanceof cpr.controls.layouts.FormLayout
		|| layout instanceof cpr.controls.layouts.VerticalLayout){
		rootContainer.floatControl(ctxMenu, showConstraint);
	}else{
		rootContainer.addChild(ctxMenu, showConstraint);
	}
	ctxMenu.focus();
}



/**
 * 프린트할 html 반환
 */
function getHTMLToGrid(gridArr, pageInfo){
	var htmlTagArr= [];
	htmlTagArr[htmlTagArr.length] = "<div class='page'>";

	if (pageInfo != null) {
		// 제목
		if (pageInfo.hasOwnProperty("title")) {
			htmlTagArr[htmlTagArr.length] = "<h1>"+pageInfo["title"]+"</h1>";
		}
		// 결재선 테이블
		if (pageInfo.hasOwnProperty("approvalLine")) {
			var approvalLineTagArr = [];
			approvalLineTagArr[approvalLineTagArr.length] = "<table class='approval_table' >";
			approvalLineTagArr[approvalLineTagArr.length] = "<tr>";
			for (var i = 0; i < pageInfo["approvalLine"].length; i++) {
				approvalLineTagArr[approvalLineTagArr.length] = "<td>"+pageInfo["approvalLine"][i]+"</td>";
			}
			approvalLineTagArr[approvalLineTagArr.length] = "</tr><tr>";
			for (var i = 0; i < pageInfo["approvalLine"].length; i++) {
				approvalLineTagArr[approvalLineTagArr.length] = "<td></td>";
			}
			approvalLineTagArr[approvalLineTagArr.length] = "</tr>";
			approvalLineTagArr[approvalLineTagArr.length] = "</table>";
			htmlTagArr[htmlTagArr.length] = approvalLineTagArr.join("");
		}
	}
	
	
	// 그리드
	for (var i = 0; i < gridArr.length; i++) {
		htmlTagArr[htmlTagArr.length] = getGridTable(gridArr[i]).join("");
		
		if (i != (gridArr.length-1)) {
			htmlTagArr[htmlTagArr.length] = "<div style='page-break-before: always; '> </div>";
		}
	}
	htmlTagArr[htmlTagArr.length] = "</div>";
	
	return htmlTagArr.join("");
}

/**
 * 그리드 데이터를 통한 table 반환
 * @param {cpr.controls.Grid} grid
 */
function getGridTable(grid) {
	var exportData = grid.getExportData({
		exceptStyle : false,
		applyFormat: true,
		applySuppress: true
	});
	
	var tableTagArr = [];
	tableTagArr[tableTagArr.length] = "<table class='cl-control cl-grid'>";
	var cols = exportData.cols;
	tableTagArr[tableTagArr.length] = "<colgroup>";
	var colWidths = [];
	var totalColumnWidth = 0;
	for (var ci = 0; ci < cols.length; ci++) {
		var colWidth = cpr.utils.ParamUtil.parseSize(cols[ci]["width"]).size;
		totalColumnWidth += colWidth;
		colWidths[colWidths.length] = colWidth;
	}
	for (var ci = 0; ci < colWidths.length; ci++) {
		tableTagArr[tableTagArr.length] = "<col style='width : " + (colWidths[ci] / totalColumnWidth) + "%'>";
	}
	tableTagArr[tableTagArr.length] = "</colgroup>";
	
	var layouts = exportData.rowgroups;
	for (var li = 0; li < layouts.length; li++) {
		var layout = layouts[li];
		var datas = layout.data;
		var styles = layout.style;
		var trTagArr = [];
		
		// 셀별 데이터를 trTagArr에 배열로 추가
		for (var ri = 0; ri < datas.length; ri++) {
			var tdTagArr = [];
			for (var ci = 0; ci < datas[ri].length; ci++) {
				var rowIndex = styles[ci]["rowindex"];
				if (tdTagArr[rowIndex] == null) {
					tdTagArr[rowIndex] = [];
				}
				if (Object.keys(datas[ri][ci]).length != 0) {
					tdTagArr[rowIndex][tdTagArr[rowIndex].length] = getTd(datas[ri][ci], styles[ci]).join("");
				}
			}
			trTagArr = trTagArr.concat(tdTagArr);
		}
		
		if (layout["region"] == "header") {
			tableTagArr[tableTagArr.length] = "<thead class='cl-grid-header'>";
		}
		for (var tri=0; tri < trTagArr.length; tri++) {
			tableTagArr[tableTagArr.length] = "<tr class='cl-grid-row'>";
			tableTagArr[tableTagArr.length] = trTagArr[tri].join("");
			tableTagArr[tableTagArr.length] = "</tr>";
		}
		if (layout["region"] == "header") {
			tableTagArr[tableTagArr.length] = "</thead>";
		}
	}
	
	tableTagArr[tableTagArr.length] = "</table>";
	return tableTagArr;
	
}

/**
 * 셀 데이터를 통한 td 반환
 * @param {any} cell
 * @param {any} columnInfo
 * @returns {string[]}
 */
function getTd(cell, columnInfo) {
	var value = cell["value"];
	var cellStyle = cell["style"];
	var columnStyle = columnInfo["style"];
	var style = _.extend({}, columnStyle, cellStyle);
	var styleKeys = Object.keys(style);
	
	var tdTagArr = [];
	tdTagArr[tdTagArr.length] = "<td class='cl-grid-cell'"; 
	if (cell.hasOwnProperty("rowspan")) {
		if (cell["rowspan"] > 1) {
			tdTagArr[tdTagArr.length] = " rowspan='"+cell["rowspan"]+"'";
		}
	} else if (columnInfo["rowspan"] > 1) {
		tdTagArr[tdTagArr.length] = " rowspan='"+columnInfo["rowspan"]+"'";
	}
	if (cell.hasOwnProperty("colspan")) {
		if (cell["colspan"] > 1) {
			tdTagArr[tdTagArr.length] = " colspan='"+cell["colspan"]+"'";
		}
	} else if (columnInfo["colspan"] > 1) {
		tdTagArr[tdTagArr.length] = " colspan='"+columnInfo["colspan"]+"'";
	}
	
	if (styleKeys.length > 0) {
		tdTagArr[tdTagArr.length] = " style='";
		for (var si = 0; si < styleKeys.length; si++) {
			tdTagArr[tdTagArr.length] = styleKeys[si] + " : " + style[styleKeys[si]] +"; ";
		}
		tdTagArr[tdTagArr.length] = "'"
	}
	tdTagArr[tdTagArr.length] = ">" + value + "</td>";
	
	return tdTagArr;
}


/*
 * 버튼(btnTools2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnTools2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnTools2 = e.control;
	doPopoutView();
}
