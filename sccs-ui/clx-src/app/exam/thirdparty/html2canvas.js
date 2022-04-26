/************************************************
* html2canvas2.js
 * Created at 2022. 3. 8. 오후 1:28:37.
 *
 * @author aaajd
 ************************************************/

//공통 모듈 사용
var util = createCommonUtil();

/*
 * "https://html2canvas.hertzen.com/" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://html2canvas.hertzen.com/');	
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = captureControlImage;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.redraw(app, "cmbJob");
			doList();
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch1Search(e){
	// 1. 데이터 변경사항 체크
	if (util.Grid.isModified(app, "grdMain", "CRM")) {
		return false;
	}
	
	// 2. 조회조건 유효성 체크
	if(!util.validate(app, "grpSearch")) return false;
	
	// 3. 데이터 조회
	doList();
}

/**
 * 그리드 데이터를 조회
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doList(psStatus) {
	util.Submit.send(app, "subList", function(pbSuccess) {
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
				util.Grid.selectRow(app, "grdMain", 0);
			}
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton2Save(e){
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdMain", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdMain")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSave", function(pbSuccess){
		if(pbSuccess){
			doList("save");
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMainSelectionChange(e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	if(util.Grid.getRowState(app, "grdMain") == cpr.data.tabledata.RowState.INSERTED){
		util.Grid.reset(app, "grdSub");
		return false;
	}
	
	doListDtl();
}

/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl(psStatus){
     var vsDeptNo = util.Grid.getCellValue(app, "grdMain", "DEPTNO");
     util.DataMap.setValue(app, "dmParamDtl", "strDeptNo", vsDeptNo);
     
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

function captureControlImage(control) {
	return new Promise(function(resolve, reject) {
		// DOM을 식별하기 위해 임시로 html 속성 부여.
		control.htmlAttr("capture-target", "true");
		
		// 임시 부여된 속성이 랜더링 된 이후에 실행.
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
			// 임시 부여 속성을 이용하여 DOM을 찾음.
			var targetDOM = document.querySelector("[data-usr-capture-target=\"true\"]");
			// 임시로 부여한 속성 제거.
			control.removeHtmlAttr("capture-target");
			
			// 돔 상태를 이용해 이미지 렌더링
			html2canvas(
				targetDOM, {
					// see https://github.com/niklasvh/html2canvas/wiki/Documentation
					logging: false
				}
			).then(function( /* HTMLCanvasElement */ canvas) {
				if (canvas.msToBlob){ // Only Works in IE
					var blob = canvas.msToBlob();
					window.navigator.msSaveBlob(blob, control.id + ".png");
				} else {
					var link = document.createElement("a");
					link.href = canvas.toDataURL("image/png");
					link.download = control.id + ".png";
					link.click();
				}
			});
		});
	});
	
}

/*
 * "직원정보그리드캡쳐" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	captureControlImage(app.lookup("grdMain"));
}

/*
 * "직원상세캡쳐" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	captureControlImage(app.lookup("tabMain"));
}
