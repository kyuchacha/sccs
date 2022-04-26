/************************************************
 * template.js
 * Created at 2021. 4. 28. 오후 2:12:45.
 *
 * @author kjyan
 ************************************************/
//공통 모듈 사용
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
		}
	});
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrdMainSelectionChange(/* cpr.events.CSelectionEvent */ e){
}





/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdMainRowDblclick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	
		/** @type cpr.controls.MDIFolder */
	var vcMdiCn = app.getRootAppInstance().lookup("mdiCn");
	
	if (vcMdiCn == null){
		return;
	}
	
	var vsCallPage = util.Grid.getCellValue(app, "grdMain", "CALL_PAGE");
	var vsMenuId = util.Grid.getCellValue(app, "grdMain", "MENU_ID");
	var vsMenuNm= util.Grid.getCellValue(app, "grdMain", "MENU_NM");
	
	var vaCallPgm = vsCallPage.toString().split("/");
	var vsPgm = vaCallPgm[vaCallPgm.length-1];
	var vsPgmId = vsPgm.substr(0, vsPgm.length-4);
	var vsAppId = vsCallPage.replace(".clx", "");
	
	
	var voAlreadyOpenedItem = vcMdiCn.findItemWithAppID(vsAppId);
	if (voAlreadyOpenedItem != null){
		vcMdiCn.setSelectedTabItem(voAlreadyOpenedItem);
		return;
	}
	
	vcMdiCn.addItemWithApp(vsAppId, true, function(item) {
		/** @type cpr.controls.Output */
		item.text = vsMenuNm;
		item.tooltip = vsMenuNm;
		item.closable = true;
	});
	
	
	if (!ValueUtil.isNull(vsCallPage) && window.eb6Preview){
		window.eb6Preview.openAppEditor(vsCallPage.split(".clx")[0]);
	}
}
