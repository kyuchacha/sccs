/************************************************
 * ExmMain4.js
 * Created at 2022. 2. 18. 오후 1:57:24.
 *
 * @author 1amthomas
 ************************************************/
/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrdMainRowDblclick( /* cpr.events.CGridMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	//메인화면 호스트앱의 instance 를 가져온다.
	var vcMdiCn = app.getRootAppInstance().lookup("mdiCn");
	
	//매핑페이지, 메뉴 ID 가져오기(클릭된 rowIndex)
	var rowIndex = grd1.getSelectedRowIndex();
	
	//배열형태
	var vsCallPage = grd1.getCellValue(rowIndex, "CALL_PAGE");
	var vsMenuId = grd1.getCellValue(rowIndex, "MENU_ID");
	
	var vaCallPgm = vsCallPage.toString().split("/");
	//vaCallPgm 에서 앱이름을 가져옴(배열의 맨 마지막)
	
	var vsPgm = vaCallPgm[vaCallPgm.length - 1];
	//.clx확장자를 뺀 아이디값을 가져옴
	var vsPgmId = vsPgm.substr(0, vsPgm.length - 4);
	
	var mainRoot = app.getHostAppInstance();
	
	if (mainRoot.hasAppMethod("isExistTabItem")) {
		var vbIsExistTabItem = mainRoot.callAppMethod("isExistTabItem", vsCallPage.substr(0, vsCallPage.length - 4), vsPgmId);
		
		if (mainRoot.hasAppMethod("doSetMenuNaviPath")) {
			mainRoot.callAppMethod("doSetMenuNaviPath", vsMenuId);
		}
		if (mainRoot.hasAppMethod("doOpenMenuToMdi")) {
			mainRoot.callAppMethod("doOpenMenuToMdi", vsMenuId);
		}
	}
	
	if (!ValueUtil.isNull(vsCallPage) && window.eb6Preview){
		window.eb6Preview.openAppEditor(vsCallPage.split(".clx")[0]);
	}
};

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	
	var container = app.getContainer();
	
	app.lookup("subOnLoad").send().then(function(input) {
		//서브미션 발송후 , ROOT_MENU_ID, UP_MENU_NM에 값을 넣어줌
		app.lookup("dsAllMenu").forEachOfUnfilteredRows(function(each) {
			each.setValue("ROOT_MENU_ID", MenuManager.getRootMenu(each.getString("MENU_ID")));
			each.setValue("UP_MENU_NM", MenuManager.getMenuNm(each.getString("UP_MENU_ID")));
		});
		
		app.lookup("dsAllMenu").setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
		
		//UP_MENU_ID가 없는 root메뉴들의 숫자를 가져옴
		var dsAllMenu = app.lookup("dsAllMenu");
		var rootCount = dsAllMenu.findAllRow("UP_MENU_ID == ''").length;
		
		//4개 이상일 경우 grp를 2개로 만들어서 아래로 그룹을 더 붙임
//		if (rootCount % 4 != 0) {
//			rootCount += 4;
//		}
		
		var vaUpMenuIds = dsAllMenu.findAllRow("UP_MENU_ID == ''");
		var vaCols = vaUpMenuIds.map(function(each) {
			return "1fr";
		});
		
		var grdInfo = app.lookup("grd1").getInitConfig();
		
		container.getLayout().removeColumns([0]);
		
		container.getLayout().setColumns(vaCols);
		
				
		for (var idx = 0; idx < rootCount; idx++) {
			
			//1) 데이터 뷰 생성
			var dvMenu = "dvMenu_LD" + idx;
			dvMenu = new cpr.data.DataView(dvMenu, dsAllMenu);
			dvMenu.parseData({});
			app.register(dvMenu);
			//1-2) 데이터 뷰 필터링 작업
			var vsRootMenu = dsAllMenu.findAllRow("UP_MENU_ID == ''")[idx].getValue("MENU_ID");
			dvMenu.setFilter("ROOT_MENU_ID == '" + vsRootMenu + "' && CALL_PAGE != ''");
			//2) 그룹 생성 및 레이아웃 설정
			var grp = "grp" + idx;
			grp = new cpr.controls.Container(grp);
			
			var grpLayout = "grpLayout_LD" + idx;
			grpLayout = new cpr.controls.layouts.FormLayout();
			grpLayout.scrollable = true;
			grpLayout.topMargin = "5px";
			grpLayout.rightMargin = "5px";
			grpLayout.bottomMargin = "5px";
			grpLayout.leftMargin = "5px";
			grpLayout.horizontalSpacing = "5px";
			grpLayout.verticalSpacing = "5px";
			grpLayout.setColumns(["1fr"]);
			grpLayout.setRows(["25px", "1fr"]);
			grp.setLayout(grpLayout);
			
			//3) UDC comtitle 생성후 삽입
			var comtitle = "comtitle" + idx;
			comtitle = new udc.com.comTitle(comtitle);
			comtitle.rowCount = dvMenu.getRowCount();
			grp.addChild(comtitle, {
				"colIndex": 0,
				"rowIndex": 0
			});
			//4) 그리드 생성
			var grd = "grd_LD" + idx;
			grd = new cpr.controls.Grid(grd);
			//데이터셋에서 UP_MENU_ID가 없는 루트메뉴들의 배열을 가져와서, 차례대로 grd.field에 넣어줌
			var vaRootRow = dsAllMenu.findAllRow("UP_MENU_ID == ''");
			//샘플로 만들어놓은 그리드의 정보를 가져온뒤 , 동적으로 생성 될 그리드에 연결 해줌
			grdInfo.dataSet = dvMenu;
			grd.init(grdInfo);
			grd.readOnly = true;
			grd.fieldLabel = vaRootRow[idx].getValue("MENU_NM");
			comtitle.ctrl = grd;
			
			//row 더블클릭이벤트 추가 
			if (typeof onGrdMainRowDblclick == "function") {
				grd.addEventListener("row-dblclick", onGrdMainRowDblclick);
			}
			
			grp.addChild(grd, {
				"colIndex": 0,
				"rowIndex": 1
			});
			
			// TODO: 진영 수정 idx-1에서 idx로 변경
			container.addChild(grp, {
				"colIndex": idx,
				"rowIndex": 0					
			});
		} //for문 종료
		
		// TODO: 진영 수정 초기 그리드만 있는 컬럼 제거 
//		container.getLayout().removeColumns([0]);
		//for 문 나오고 나서 , redraw
		app.getContainer().redraw();
		
		// TODO: 진영 수정 - 반응형 폼을 적용하기 위한 내용
		var rForm = makeResponsive(container);
		rForm.setColumnSettings("mobile", 1);
		rForm.setColumnSettings("tablet", 1);
		rForm.start();
		
	});
	
	var MenuManager = {
		/**
		 * 메뉴의 이름을 반환합니다
		 * @param {String} menuKey 메뉴ID
		 * @return {String}
		 */
		getMenuNm: function(menuKey) {
			var row = app.lookup("dsAllMenu").findFirstRow("MENU_ID == '" + menuKey + "'");
			return menuKey && row.getString("MENU_NM");
		},
		
		/**
		 * 최상위 메뉴ID를 반환합니다.
		 * @param {String} menuKey 메뉴ID
		 * @return {String}
		 */
		getRootMenu: function(menuKey) {
			var menuData = app.lookup("dsAllMenu");
			var row = menuData.findFirstRow("MENU_ID =='" + menuKey + "'");
			var result = "";
			
			if(row){
				var parentRow = menuData.findFirstRow("MENU_ID =='" + row.getString("UP_MENU_ID") + "'");
				if (!parentRow) {
					return row.getString("MENU_ID");
				}
				//최상위 부모 ID와 연결 될 수 있도록 while문
				while (parentRow && parentRow.getString("UP_MENU_ID")) {
					//더이상 부모가 없으면 parentRow == null 이 되면서 while문 나감
					parentRow = menuData.findFirstRow("MENU_ID =='" + parentRow.getString("UP_MENU_ID") + "'");
					result = parentRow ? parentRow.getString("MENU_ID") : "";
				}	
			}
			
			
			return result;
		}
	}
}