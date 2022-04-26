/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();
var comDiv;
var comMdiClose;
/************************************************
 * 전역 변수 선언
 ************************************************/
var _originalOrder = new cpr.utils.ObjectMap(); // 컨트롤 순서
var mMaxWindowCnt = 0;
var mAppDefaultLocale = "ko";
var mbCollapsed = false;
var mnInitMnMenuSize = 60;
var mnInitGrpAsideMenuSize = 230;
var vsDefaultTime = "59:59";
var timerInterval = "";
/************************************************
 * 사용자 정의 함수
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe(AppProperties.MSG_TOPIC_ID, this, function(poMsgInfo) {
	
	var vcNotiToastr = app.lookup("notiToastr");
	
	if (poMsgInfo["TYPE"] == "SUCCESS") {
		vcNotiToastr.success(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "INFO") {
		vcNotiToastr.info(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "WARNING") {
		vcNotiToastr.warning(poMsgInfo["MSG"]);
	} else if (poMsgInfo["TYPE"] == "DANGER") {
		vcNotiToastr.danger(poMsgInfo["MSG"]);
	} else {
		if(!ValueUtil.isNull(poMsgInfo["DELAY"])){
			vcNotiToastr.infoDelay = poMsgInfo["DELAY"];
		}else{
			vcNotiToastr.infoDelay = 2000;
		}
		poMsgInfo["TYPE"] = "INFO";
		vcNotiToastr.info(poMsgInfo["MSG"]);
	}
	
	/* 알림방에 메세지 저장 */
	if (!poMsgInfo["REPLAY"]) {
		stackMsgInfo(poMsgInfo);
	}
	
});


/**
 * 
 * @param {{TYPE: "DEFAULT" | "INFO" | "SUCCESS" | "WARNING" | "DANGER", MSG:String}} poMsgInfo
 */
function stackMsgInfo(poMsgInfo) {
	var vcDsMsgStack = app.lookup("dsMsgStack");
	
	var voNewStack = vcDsMsgStack.insertRowData(0, false, {
		"status": poMsgInfo["TYPE"],
		"text": poMsgInfo["MSG"],
		"time": moment().format("YYYY-MM-DD hh:mm:ss")
	});
	
	createNotificationItem(voNewStack);
	
	util.Control.redraw(app, "btnAlrt");
}

/**
 * 
 * @param {cpr.data.DataRow} poRow
 */
function createNotificationItem(poRow) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	var vcNotiItem = new udc.main.NotificationItem();
	
	vcNotiItem.status = poRow.getValue("status");
	vcNotiItem.text = poRow.getValue("text");
	vcNotiItem.time = poRow.getValue("time");
	
	/* 아이템 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("click", function(e) {
		var vcClickedItem = e.control;
		
		/* 알림 재호출 (다시 저장하지 않으므로 공통 사용하지 않음) */
		cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
			TYPE: vcClickedItem.status,
			MSG: vcClickedItem.text,
			REPLAY: true
		});
		
		removeNotificationItem(vcClickedItem);
	});
	
	/* 아이템 닫기 클릭 시 발생할 이벤트 정의 */
	vcNotiItem.addEventListener("close", function(e) {
		var vcClickedItem = e.control;
		
		removeNotificationItem(vcClickedItem);
	});
	
	vcGrpNotiItemWrap.insertChild(0, vcNotiItem, {
		autoSize: "height"
	});
}

/**
 * 메세지 아이템을 삭제합니다. 파라미터를 넘기지 않는 경우 모든 아이템을 삭제합니다.
 * @param {udc.com.main.NotificationItem} pcItem?
 */
function removeNotificationItem(pcItem) {
	var vcGrpNotiItemWrap = app.lookup("grpNotiItemWrap");
	
	if (ValueUtil.isNull(pcItem)) {
		vcGrpNotiItemWrap.removeAllChildren(true);
		return;
	}
	
	var vnItemIdx = vcGrpNotiItemWrap.getChildren().indexOf(pcItem);
	
	vcGrpNotiItemWrap.removeChild(pcItem, true);
	
	app.lookup("dsMsgStack").realDeleteRow(vnItemIdx);
}

//어플리케이션 설정정보 반환
exports.getAppConfig = function(){
	return app.lookup("dmGlobalConfig");
}

exports.doOpenMenuToMdi = doOpenMenuToMdi;

exports.isExistTabItem = isExistTabItem;

exports.setTheme = setTheme;

exports.getMenuPath = getMenuPath;

exports.getMenuKey = function(psMenuId){
	
	var dsAllMenu = app.lookup("dsAllMenu");
	if(!ValueUtil.isNull(psMenuId)){
		var voRow = dsAllMenu.findFirstRow("MENU_ID == '"+psMenuId+"'");
		
		if(voRow == null) {
			return "";	
		}else{
			return voRow.getValue("MENU_ID");
		}
	}
}

/**
 * 메뉴를 바로 오픈할 경우 부모페이지에서 전달하는 파라미터 세팅
 */
exports.getMenuParam = function() {
	var dmMenuParam = app.lookup("dmMenuParam");
	return dmMenuParam.getValue("strMenuParamVal");
}

exports.doMenuPath = function(psMenuId) {
	expandSideMenu();
	doFocusTreeItem(psMenuId);
}

/**
 * 현재메뉴의 메뉴 path 리턴
 * @param {String} psMenuId
 */
function getMenuPath(psMenuId) {
	/** @type cpr.data.DataSet */
	var voAllMenus = app.lookup("dsAllMenu");
	if (voAllMenus == null) return "";
	
	var voCurrMenu = voAllMenus.findFirstRow("MENU_ID == '" + psMenuId + "'");
	var vaMenuPathId = [];
	var vaMenuPathNm = [];
	var voMenu = null;

	while (true) {
		voMenu = voAllMenus.findFirstRow("MENU_ID == '" + psMenuId + "'");
		if (voMenu == null) break;
		if (voMenu.getValue("UP_MENU_ID") == "") {
			vaMenuPathId.push(voMenu.getValue("MENU_ID"));
			vaMenuPathNm.push(voMenu.getValue("MENU_NM"));
			break;
		}
		
		vaMenuPathId.push(voMenu.getValue("MENU_ID"));
		vaMenuPathNm.push(voMenu.getValue("MENU_NM"));
		psMenuId = voMenu.getValue("UP_MENU_ID");
	}
	
	var lbxMenuBarItem = null;
//	if (voCurrMenu != null) {
//		//lbxMenuBarItem = app.lookup("lbxMenuBar").findItem({value:voCurrMenu.getValue("TOP_MENU_ID")});
//	}
	
	vaMenuPathId.reverse();
	vaMenuPathNm.reverse();
	
	var vaMenuPathInfo = new cpr.utils.ObjectMap();
	vaMenuPathInfo.put("MENU_PATH_ID", vaMenuPathId);
	vaMenuPathInfo.put("MENU_PATH_NM", vaMenuPathNm);
	
	return vaMenuPathInfo;
	
}

/**
 * 디폴트 테마에 해당하는 css를 로드합니다. 그 외의 css는 disabled 합니다.
 * 스위칭할 테마를 선택할 때마다 해당 메서드를 실행합니다.
 * @param {String} psSrc Style 경로
 */
function setTheme(psSrc) {
	/** @type NodeList */
	var nodeList = document.getElementsByTagName("link");
	var vaNodeList = Array.prototype.slice.call(nodeList);
	vaNodeList.filter(function(/* HTMLDivElement */each){
		return each.rel == "stylesheet" && each.href.indexOf("common-theme") != -1;
	}).forEach(function(/* HTMLDivElement */each){
		if (each.href.indexOf(psSrc) == -1){
			each.disabled = "disabled";
		} else {
			each.removeAttribute("disabled");
		}
	});
}

/**
 * 사용자 정보를 반환한다.
 * @param {String} psUserInfoType (Optional) 사용자 정보 변수(ex: USER_ID)
 * @return {String | cpr.data.DataMap} 사용자 정보
 */
exports.getUserInfo = function(psUserInfoType){
	var dmUserInfo = app.lookup("dmUserInfo");
	if(ValueUtil.isNull(psUserInfoType)){
		return dmUserInfo
	}
	return dmUserInfo.getValue(psUserInfoType);
}

function backup() {
	var vcGrpCont = app.getContainer();
	vcGrpCont.getChildren().forEach(function(each, index){
		_originalOrder.put(each.id, index);
	});
}

/**
 * 
 * @param {cpr.controls.UIControl} pcControl
 * @param {{top:String, right:String, bottom:String, left:String, width:String, height:String}} poConstraint
 * @param {Function} poCallbackFunc
 */
function floating(pcControl, poConstraint, poCallbackFunc) {
	var vcFloatingTarget = pcControl;
	
	var vcGrpCont = app.getContainer();
	
	var vcGrpOverlay = new cpr.controls.Container();
	vcGrpOverlay.setLayout(new cpr.controls.layouts.XYLayout());
	
	vcGrpOverlay.userAttr("floated-configuration", "true");
	
	vcGrpOverlay.addEventListenerOnce("click", function(e) {
		unfloating(vcFloatingTarget);
		
		if (_.isFunction(poCallbackFunc)) poCallbackFunc();
	});
	
	vcGrpCont.addChild(vcGrpOverlay, {
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px"
	});
	
	app.lookup(vcFloatingTarget.id).visible = true;
	
	vcGrpCont.floatControl(vcFloatingTarget, poConstraint);
	
	vcFloatingTarget.focus();
}


/**
 * 
 * @param {cpr.controls.UIControl} pcControl
 */
function unfloating(pcControl) {
	var vcGrpCont = app.getContainer();
	
	vcGrpCont.getChildren().filter(function(each){
		return each.userAttr("floated-configuration") == "true";
	}).forEach(function(each){
		vcGrpCont.removeChild(each, true);
	});
		
	var voActualRect = pcControl.getActualRect();
	vcGrpCont.insertChild(_originalOrder.get(pcControl.id), pcControl, {
		top : "10px",
		bottom : "10px",
		left : voActualRect.left + "px",
		width : voActualRect.width + "px"
	});
	
	if (pcControl.userAttr("prevent-hide") != "true"){
		util.Control.setVisible(app, false, pcControl.id);
	}
	
	transitionEnd();
}


/**
 * 트리 메뉴를 숨기고 미니 메뉴를 표시합니다.
 */
function collapseSideMenu() {
	
	var vcGrpCont = app.getContainer();
	//헤더
	var vcGrpHeader = app.lookup("grpHeader");
	//MDI
	var vcMdiCn = app.lookup("mdiCn");
	
	var vnStndSize = mnInitMnMenuSize;
	
	if (app.targetScreen.name != "default") {
		vnStndSize = 0;
		util.Control.setVisible(app, false, ["mnuMnMenu","grpMiniMnBox"]);
		
		/* 상태에 따라 컨트롤 크기 및 위치 변경 */
		vcGrpCont.updateConstraint(vcMdiCn, {
			left : "10px"
		});
		
		/* 상태에 따라 컨트롤 크기 및 위치 변경 */
		vcGrpCont.updateConstraint(vcGrpHeader, {
			left : "10px"
		});
	} else {
		/* 상태에 따라 컨트롤 숨김 또는 표시 */
		if(vnStndSize != 0){
			util.Control.setVisible(app, true, ["mnuMnMenu","grpMiniMnBox"]);
		}
		
		/* 상태에 따라 컨트롤 크기 및 위치 변경 */
		vcGrpCont.updateConstraint(vcMdiCn, {
			left : vnStndSize + 20 + "px"
		});
		
		/* 상태에 따라 컨트롤 크기 및 위치 변경 */
		vcGrpCont.updateConstraint(vcGrpHeader, {
			left : vnStndSize + 20 + "px"
		});
	}
	
	util.Control.setVisible(app, false, "grpAside");
}


/**
 * 미니 메뉴를 숨기고 트리 메뉴를 표시합니다.
 */
function expandSideMenu() {
	var vcGrpCont = app.getContainer();
	var vcGrpHeader = app.lookup("grpHeader");
	var vcGrpAside = app.lookup("grpAside");
	var vcMdiCn = app.lookup("mdiCn");
	
	/* 상태에 따라 컨트롤 크기 및 위치 변경 */
	vcGrpCont.updateConstraint(vcGrpHeader, {
		left : mnInitGrpAsideMenuSize + 20 + "px"
	});
	
	vcGrpCont.updateConstraint(vcGrpAside, {
		top : "10px",
		bottom : "10px",
		left : "10px",
		width : mnInitGrpAsideMenuSize + "px"
	});
	
	vcGrpCont.updateConstraint(vcMdiCn, {
		left : mnInitGrpAsideMenuSize + 20 + "px"
	});
	
	/* 레프트 메뉴 에니메이션 효과 지정*/
	vcGrpAside.style.css("opacity","0");
	vcGrpAside.style.animateTo({
		"opacity" : "1"
	}, 0.3, cpr.animation.TimingFunction.EASE_IN_OUT);
	setTimeout(function(){
		util.Control.setVisible(app, false, ["mnuMnMenu","grpMiniMnBox"]);
		util.Control.setVisible(app, true, "grpAside");
	}, 200);
}


/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 */
function toggleMenuItem(pcItem) {
	var vcTreMenu = app.lookup("treMenu");

	/* 클릭한 아이템이 최상위 아이템인 경우 모든 아이템 닫기 */
	if (ValueUtil.isNull(pcItem.parentItem)){
		if(!vcTreMenu.isExpanded(pcItem)){
			vcTreMenu.collapseAllItems();
		}
	}
	
	vcTreMenu.toggle(pcItem);
}

/**
 * 해당 메뉴가 이미 오픈되어 있는지 여부를 반환한다.
 * @param psAppId
 */
function isExistTabItem(psAppId, psMenuKey){
	var mdiCn = app.lookup("mdiCn");
	var items = mdiCn.getTabItems();
	if(items != null && items.length > 0) {
		var alreadyOpened = items.some(function(item) {
			if(!item.content) return false;
			if(item.content.app) { // embeddedApp
				if(item.content.app.id == psAppId) {
					mdiCn.setSelectedTabItem(item);
					return true;
				}
			} else { // embeddedPage
				if(item.content.src == psAppId) {
					mdiCn.setSelectedTabItem(item);
					return true;
				}
			}
			return false;
		});
		return alreadyOpened;
	}else{
		return false;
	}
}

//트리 Item을 선택해준다.
function doFocusTreeItem(psValue){
	
	if(ValueUtil.isNull(psValue)) return;
	
	var dsAllMenu = app.lookup("dsAllMenu");
	if(dsAllMenu == null) return;
	
	var voFindMenu = dsAllMenu.findFirstRow("MENU_ID == '"+psValue+"'");
	
	if(voFindMenu == null) return;
	
	//트리를 일단 접어줌
	var vcTree = app.lookup("treMenu");
	vcTree.collapseAllItems();
	
	vcTree.getItems().filter(function(item){
		if(item.value == psValue ){
			var vsPValue = item.parentValue;
			var vaChildItem = vcTree.getChildren(item);
			var voParent = vcTree.getItemByValue(vsPValue);
			getParentMenuNode(vcTree, voParent);
			vcTree.focusItem(item);
			vcTree.selectItemByValue(item.value, false);
		}
		return false;
	});
}

function getParentMenuNode(pcTree, poTreeItem){
	if(!poTreeItem) return;
	
	if(poTreeItem.parentValue == "root"){
		pcTree.expandItem(poTreeItem);
	}else{
		pcTree.expandItem(poTreeItem);
		getParentMenuNode(pcTree, pcTree.getItemByValue(poTreeItem.parentValue));
	}
}

function doOpenMenu(appId, poRow, pbByMenuEvent){
	
	appId = appId.substring(0, appId.lastIndexOf(".clx"));
	//기존에 열려진 창이 있으면... 다시 띄우지 않음
	var isExistItem = isExistTabItem(appId, poRow.getValue("MENU_ID"));
	if(isExistItem){
		return;
	} 
	
	var mdiCn = app.lookup("mdiCn");
	//오픈 창갯수 제한
	if(mdiCn.getTabItems().length > mMaxWindowCnt-1){
		//프로그램 탭은 @개를 초과할 수 없습니다. \n열려있는 프로그램을 닫은후 선택해 주세요.
		util.Msg.alert("INF-M012", [mMaxWindowCnt]);
		return;
	}
	
//	mdiCn.addItemWithApp(appId, true, function(/* cpr.controls.TabItem */tabItem) {
//			tabItem._menuKey = poRow.getValue("MENU_KEY");
//			tabItem.userAttr("__menuInfo", JSON.stringify(poRow.getRowData()));
//			tabItem.text = poRow.getValue("MENU_NM");
//		/** @type cpr.controls.EmbeddedApp */
//		var vcEmb = tabItem.content;
//		//임베디드앱이 준비가 되면 처리할 작업 등록
//		vcEmb.ready(function( /* cpr.events.CEvent */ e) {
//			var voEmbApp = vcEmb.getEmbeddedAppInstance();
//		});
//	});
	
	var vsDivideMdiUseYn = util.DataMap.getValue(app, "dmGlobalConfig", "divideMdiUseYn");
	
	if ("Y" == vsDivideMdiUseYn) {
		
		var vbExists = false;
		
		// 동일한 화면 추가 제외(2021.07.27 수정)
		if (comDiv.getDivGroup() != null) {
			comDiv.getDivGroup().getChildren().forEach(function(each){
				if (each.type == "embeddedapp") {
					if (each.getEmbeddedAppInstance().app.id == appId) {
						vbExists = true;
					}
				}
			});
		}
		// 동일한 화면 추가 제외(2021.07.27 수정)
		if (!vbExists) {
			/* 화면분할 유지한 채 메뉴 오픈 */
			comDiv.selectMenu(appId, poRow, {
				text: poRow.getValue("MENU_NM"),
				tooltip: poRow.getValue("MENU_NM"),
				closable: true
			}, function(pcEmb){
				pcEmb.addEventListenerOnce("load", function( /* cpr.events.CEvent */ e) {
					doFillLayoutHeigth(e.control);
					if(pbByMenuEvent != false){
						util.AppStack.push(poRow.getValue("MENU_ID"));	
					}
					pcEmb.addEventListener("screen-change", function( /* cpr.events.CEvent */ e) {
						doFillLayoutHeigth(e.control);
					});
				});
			});
		}
		
	} else {	
		mdiCn.addItemWithApp(appId, true, function( /* cpr.controls.TabItem */ tabItem) {
			tabItem._menuKey = poRow.getValue("MENU_ID");
			tabItem.userAttr("__menuInfo", JSON.stringify(poRow.getRowData()));
			tabItem.text = poRow.getValue("MENU_NM");
			/** @type cpr.controls.EmbeddedApp */
			var vcEmb = tabItem.content;
			//임베디드앱이 준비가 되면 처리할 작업 등록
			vcEmb.ready(function( /* cpr.events.CEvent */ e) {
				//var voEmbApp = vcEmb.getEmbeddedAppInstance();
				vcEmb.addEventListenerOnce("load", function( /* cpr.events.CEvent */ e) {
					doFillLayoutHeigth(e.control);
					if(pbByMenuEvent != false){
						util.AppStack.push(poRow.getValue("MENU_ID"));	
					}
					vcEmb.addEventListener("screen-change", function( /* cpr.events.CEvent */ e) {
						doFillLayoutHeigth(e.control);
					});
				});
			});
		});
	}
	
}

function doFillLayoutHeigth(pcEmb){
	var embApp = pcEmb.getEmbeddedAppInstance();
	var vsFixLayout = embApp.getContainer().userData("fixLayout");
	if(vsFixLayout == "Y") return;
	//앱컨테이너가 버티컬 레이아웃이고 작업영역그룹이 하나이거나 해당 컨테이너의 자식컨트롤 중 fillLayout 사용자정의속성이 Y인 그룹의
	// 높이를 재지정함(화면에 꽉차이게..)
	var vcFillLayout;
	var flExclusionHeight = 0;
	var flExclusionRectHeight = 0;
	var vaChildren = embApp.getContainer().getChildren();
	var vaFillLayout = vaChildren.filter(function(each){
		return "Y" == each.userAttr("fillLayout");
	});
	
	var vaDisableBoxIds = embApp.getContainer().getChildren().filter(function(child){
		return child.type == "container" 
			&& ( child.id != "grpSearch" && child.id != "grpHeader" && child.style.getClasses().indexOf("search-box") == -1 && child.visible == true);
	});
	
	if(vaFillLayout.length == 1){
		vcFillLayout = vaFillLayout[0];
	}else if (vaDisableBoxIds.length >= 1){
		vcFillLayout = vaDisableBoxIds[0];
	}else{
//			vcFillLayout = null;
		return;
	}
	
	if( vcFillLayout && embApp.getContainer().getLayout() instanceof cpr.controls.layouts.VerticalLayout) {
		
		var mainRootCon = app.getContainer();
		var mainRootLayout = mainRootCon.getLayout();
	
		vaChildren.forEach(function(each){
			if(each.id != vcFillLayout.id){
				var voChildConst = embApp.getContainer().getConstraint(each);
				var vsHeight = voChildConst.height;
 				var vnHeight = vsHeight.replace("px", "");
				var vnRectHeight = each.getActualRect().height;
  				flExclusionRectHeight += ValueUtil.fixNumber(vnRectHeight);	
  				flExclusionHeight += ValueUtil.fixNumber(vnHeight);
			}
		});
		var vbEmbHeight = embApp.getContainer().getConstraint(vcFillLayout).height;
		if(!vbEmbHeight){
			return;
		}
		var vnEmbHeight = vbEmbHeight.replace("px", "");
  	    vnEmbHeight = ValueUtil.fixNumber(vnEmbHeight);
  	    	
  	     //보수적으로 데이터 레이아웃 높이가 700이 넘으면 기존 유지
  	    if( vnEmbHeight > 700){
  	    	embApp.getContainer().userData("fixLayout", "Y");
  	    	return;
  	    }
  	    
		var mainHeight = app.getActualRect().height;
		
		if(mainHeight >= 800) {
			
			var embHeight = embApp.getContainer().getConstraint(vcFillLayout).height;
			
			if(embHeight.indexOf("calc(100%") < 0){
				vcFillLayout.userAttr("origin.height", embHeight);	
			}
			var poConstraint = {
					height : "calc(100% - " + (flExclusionHeight + 10) +"px)"
				 /* , minHeight: 0
				  , autoSize: "none"*/
				};
		}else{
			
			var vsHeightPx = "680px";
			var vsFillLayoutOrgH = vcFillLayout.userAttr("origin.height");
			
			if(!ValueUtil.isNull(vsFillLayoutOrgH)){
				vsHeightPx = vsFillLayoutOrgH;
			}
			var poConstraint = {
						height : vsHeightPx
					/*  , minHeight: 500
					  , autoSize: "height"*/
				};
		}
		embApp.getContainer().updateConstraint(vcFillLayout, poConstraint);
	}
		
}

/**
 * 해당 메뉴를 MDI에 오픈한다.
 * @param psMenuId 메뉴ID
 * @param poParam 오픈될 메뉴에 전달할 파라미터 (JOSN 형태로 만들어야함.)
 */
function doOpenMenuToMdi(psMenuId, poParam){
	var dsAllMenu = app.lookup("dsAllMenu");
	var voRow = dsAllMenu.findFirstRow("MENU_ID == '"+psMenuId+"'");
	if(voRow != null){
		// 메뉴 다이렉트 오픈시 전달하고 싶은 파라미터 세팅 (반드시 JSON 형태로 파라미터를 저장할 것!!)
		app.lookup("dmMenuParam").setValue("strMenuParamVal", JSON.stringify(poParam));
		var appId = voRow.getValue("CALL_PAGE");
		doOpenMenu(appId, voRow, false);
	}else{
		util.Msg.alert("해당 메뉴에 대한 권한이 없습니다.");
	}
}

/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 */
function miniMenuItemClick(pcItem) {
	var vcMnuMiniMenu = app.lookup("mnuMnMenu");
		var vsMenuItemValue = null;
	if (!app.lookup("treMenu").hasChild(pcItem)){
		vsMenuItemValue = findParentMenuItem(pcItem).value;
	} else {
		vsMenuItemValue = pcItem.value;
	}
	
	app.lookup("mnuMnMenu").selectItemByValue(vsMenuItemValue);
}

/**
 * 
 * @param {cpr.controls.TreeItem} pcItem
 * @return {cpr.controls.TreeItem} vsParentItem
 */
function findParentMenuItem(pcItem) {
	var vcTreLeftMenu = app.lookup("treMenu");
	
	var vcParentItem = pcItem;
	do{
		var vcFindtreeItem = vcTreLeftMenu.findItem({value : vcParentItem.parentValue});
		if (vcFindtreeItem != null){
			vcParentItem = vcFindtreeItem;
		}
	}
	while(vcParentItem.value == "");
	
	return vcParentItem;
}

/**
 * 
 * @param {cpr.controls.Item} pcItem
 */
function openMenuItem(pcItem) {
	var treMenu = app.lookup("treMenu");
	var selectedMenu = pcItem.row;
	var appId = selectedMenu.getValue("CALL_PAGE");
	if(appId) {
		//메뉴경로 지정 (UP_MENU_ID 컬럼을 가져감)
		doOpenMenu(appId, selectedMenu);
		
		miniMenuItemClick(pcItem);
		//모바일일경우.
		if(app.lookup("btnMToggle").visible && app.targetScreen.name != "default"){
			util.Control.setVisible(app, false, "grpAside");
		}
//		else{
//			util.Control.setValue(app, "cbxToggle", "false");
//		}
	}
	else{
		var vsKey = selectedMenu.getValue("MENU_ID");
		var voItem = treMenu.getItemByValue(vsKey);
		if(voItem){
		}
	}
}


/**
 * 컨텐츠 영역 (MDIFolder)를 확대합니다.
 */
function zoomInContent() {
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : "0px",
		left : "0px",
		right : "0px",
		bottom : "0px"
	});
	
	app.lookup("btnZoom").style.addClass("cl-selected");
	app.lookup("btnVrtZoom").style.addClass("cl-selected");
}


/**
 * 컨텐츠 영역 (MDIFolder)를 축소합니다.
 */
function zoomOutConent() {
	var voHeaderActualRect = app.lookup("grpHeader").getActualRect();
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		top : voHeaderActualRect.height + 20 + "px",
		left : voHeaderActualRect.left + "px",
		bottom : "10px",
		right : "10px"
	});

	app.lookup("btnZoom").style.removeClass("cl-selected");
	app.lookup("btnVrtZoom").style.removeClass("cl-selected");
}


/************************************************
 * 컨트롤 이벤트 (앱)
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	backup();
	
//	if(mbCollapsed){
//		util.Control.setVisible(app, true, "mnuMnMenu");
//	}else{
//		util.Control.setVisible(app, false, "mnuMnMenu");
//	}
	
	startTimer(vsDefaultTime);
	
	comDiv = comDivideScr(app, app.lookup("mdiCn"));
 	comMdiClose = mdiTabClose(app, comDiv);
 	
	util.Submit.send(app, "subOnLoad_json", function(pbSuccess) {
		if (pbSuccess){
			
			
			//사용자명
			util.Control.setValue(app, "lblUserNm", util.DataMap.getValue(app, "dmUserInfo", "USER_NM"));
			util.Control.setValue(app, "lblUserAuth", moment().format("YYYY-MM-DD hh:mm") );
			
			//Global 설정
			var dmConfig = app.lookup("dmGlobalConfig");
			mMaxWindowCnt = ValueUtil.fixNumber(dmConfig.getValue("mdiWindowMaxCount")); //MDI 최대 창갯수
			mAppDefaultLocale = dmConfig.getValue("defaultLocale"); //어플리케이션 로케일
			
			// left 메뉴 첫번째 아이템 선택
			util.SelectCtl.selectItem(app, "treMenu", 0);
			
			// 토글 value에 다라 미니 메뉴 visible 처리
			app.lookup("mnuMnMenu").visible = app.lookup("cbxToggle").value == "true" ?  false : true;
			
			var vsDivideMdiUseYn = util.DataMap.getValue(app, "dmGlobalConfig", "divideMdiUseYn");

			if ("Y" == vsDivideMdiUseYn) {
				util.Control.setVisible(app, true, "cmbLayout");
			} else {
				util.Control.setVisible(app, false, "cmbLayout");
			}
		
			/* 메인 파츠 다시 그리기 요청 */
			util.Control.redraw(app, ["grpLogo", "mnuMnMenu", "grpAside", "grpHeader", "mdiCn"]);
		}
	});
	
}

/**
 * 접속시간의 타이머를 설정하는 함수입니다. mm:ss 포맷 형식의 string을 입력받으며, (00:00 ~ 59:59) 사이의 값을 제공받아야합니다.
 * @param {String} psTime 타이머가 시작될 시간
 */
function startTimer(psTime) {
	var vcOptTime = app.lookup("optTime");
	
	vcOptTime.value = psTime;
	var vsTime = moment(psTime, "mm:ss");
	
	clearInterval(timerInterval);
	
	timerInterval = setInterval(function() {
		var vsLimitTime = vsTime.subtract(1, "seconds");
		vcOptTime.value = vsLimitTime.format("mm:ss");
		vcOptTime.redraw();
	}, 1000);
}

function changeToMobile() {
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : "10px"
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		width : "0px"
	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : "10px"
	});
	
	/* 알림 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "notiToastr", null, {
		left: "10px",
		bottom: "20px",
		right : "10px",
		height : "60px"
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, true, ["btnDropdown"]);
	util.Control.setVisible(app, false, ["cbxToggle", "btnSearch","grpBtnSearch"]);
	
	/* 상태에 따른 레이아웃 변경 */
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "35"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn", "notiToastr"]);
}


function changeToDefault() {
	
	if(app.lookup("grpAside").isFloated()){
		unfloating(app.lookup("grpAside"));
	}
	
	if(app.lookup("grpCnHdRVrt").isFloated()) {
		unfloating(app.lookup("grpCnHdRVrt"));
	}
	
	/* 모바일이 아닐 경우 레프트 메뉴 border-radius 속성 default 속성으로 변경 */
	util.Control.setStyleAttr(app, "grpAside", "border-radius", "");
	
	var vbExpanded = app.lookup("cbxToggle").checked;
	var vsToggleWidth = null;
	var vnMenuSize = null;
	
	if (vbExpanded){
		vnMenuSize = mnInitGrpAsideMenuSize;
		util.Control.setVisible(app, true, "grpAside");
//		if(msInitMnMenuSize == "0px"){
//			util.Control.setVisible(app, false, "mnuMnMenu");
//		}
	} else {
		//vsStdrSize = "60px";
		//vsStdrSize = "0px";
		vnMenuSize = mnInitMnMenuSize;
		util.Control.setVisible(app, true, ["mnuMnMenu","grpMiniMnBox"]);
		util.Control.setVisible(app, false, "grpAside");
	}
	
	/* 컨텐츠 확대 상태의 경우 상태 되돌리기 */
	if (app.lookup("btnZoom").style.hasClass("cl-selected")){
		app.lookup("btnZoom").click();
	}
	
	/* 상태에 따른 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "grpHeader", null, {
		left : vnMenuSize + 20 + "px"
	});
	
	util.Control.updateConstraint(app, "grpAside", null, {
		top : "10px",
		bottom : "10px",
		left : "10px",
		width : vnMenuSize + "px"
	});
	
	util.Control.updateConstraint(app, "mdiCn", null, {
		left : vnMenuSize + 20 + "px"
	});
	
	
	/* 알림 컨트롤 위치 및 크기 변경 */
	util.Control.updateConstraint(app, "notiToastr", null, {
		bottom: "20px",
		right : "20px",
		left : "",
		height : "60px",
		width : "434px"
	});
	
	/* 컨트롤 숨김 또는 표시 설정 */
	util.Control.setVisible(app, false, "btnDropdown");
	util.Control.setVisible(app, true, ["cbxToggle",  "btnSearch","grpBtnSearch"]);
	
	app.lookup("mdiCn").addHeaderControl(app.lookup("grpCnHdR"), {position : "right", width : "350"});
	
	/* 컨트롤 다시 그리기 요청 */
	util.Control.redraw(app, ["grpHeader", "mdiCn", "notiToastr"]);	
	
}

/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var vbMbScrn = e.screen.name != "default";
	var vcMnMenu = app.lookup("grpMiniMnBox");
	var cmbScreen = app.lookup("cmbScreen")
	if (vbMbScrn){
		vcMnMenu.visible = false;
		changeToMobile();
		cmbScreen.value = "mobile"
	} else {
		vcMnMenu.visible = app.lookup("cbxToggle").value != "true" ? true : false;
		changeToDefault();
		cmbScreen.value = "pc"
	}
	
	transitionEnd();
}


/************************************************
 * 컨트롤 이벤트 (헤더 영역)
 ************************************************/

/*
 * 버튼(btnMToggle)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMToggleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMToggle = e.control;
	
	if(app.lookup("grpAside").isFloated()){
		unfloating(app.lookup("grpAside"));
		return false;
	}
	
	if(app.lookup("mnuMnMenu").isFloated()){
		unfloating(app.lookup("mnuMnMenu"));
		return false;
	}
	
	/* 모바일일 때 트리 메뉴를 표시 */
	util.Control.setVisible(app, true, "grpAside");
	
	/* 모바일일 때 레프트 메뉴 border-radius = 0 으로 변경 */
	util.Control.setStyleAttr(app, "grpAside", "border-radius", "0");
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
	floating(app.lookup("grpAside"), {
		top: "0px",
		left: "0px",
		bottom: "0px",
		width: mnInitGrpAsideMenuSize + "px"
	}, function() {
		/* 플로팅 해제 후 토글 상태에 따라 일반 메뉴 또는 미니 메뉴 표시 */
		if (app.lookup("cbxToggle").checked){
			util.Control.setVisible(app, true, "grpMenuWrap");
		} 
	});
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxToggleValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxToggle = e.control;
	
	/* 트리 메뉴 <-> 미니 메뉴로 변경 */
	if (!cbxToggle.checked){ // change to mini-menu
		collapseSideMenu();
	} else { // change to menu
		expandSideMenu();
	}
	transitionEnd();
	localStorage.setItem( "cbxToggle" , cbxToggle.checked);
}

/*
 * 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
//	var voActualRect = app.lookup("grpHeader").getActualRect();
//	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
//	floating(app.lookup("cmbUnfd"), {
//		top: voActualRect.top + "px",
//		left: voActualRect.left + "px",
//		right: "10px",
//		height: voActualRect.height + "px"
//	});

	var btnSearch = e.control;
	var voActualRect = app.lookup("btnSearch").getActualRect();
	
	floating(app.lookup("grpSch"), {
		top: voActualRect.bottom + 15 + "px",
		left: "80px",
		width: "500px",
		height: "300px"
	});
	
}


/*
 * 네비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNvbMgMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var nvbMgMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	openMenuItem(vcMenuItem);
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbLangSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbLang = e.control;
	
	/* 언어 코드에 따른 다국어 설정 */
	cpr.I18N.INSTANCE.currentLanguage = util.SelectCtl.getItemValue(app, "cmbLang");
	
	//TODO 다국어 바인딩 이외의 다국어 처리 로직을 작성하십시오.
}


/*
 * 버튼(btnCstmzMenu)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCstmzMenuClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCstmzMenu = e.control;
	
	if(confirm("로그아웃 하시겠습니까?")){
		util.Submit.send(app, "subLogout",  function(pbSuccess){
			if(pbSuccess){
				app.close();
				top.location.reload();
			}
			
		});
	}
}





/*
 * 버튼(btnSetting)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSettingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetting = e.control;
	floating(app.lookup("grpRghtbar"), {
		top : "0px",
		right : "0px",
		bottom : "0px",
		width: "280px"
	});
}

/************************************************
 * 컨트롤 이벤트 (레프트 영역)
 ************************************************/


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpLogoWrapClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpLogoWrap = e.control;
	
	/* 이벤트 추가 전파 방지 */
	e.stopPropagation();
}


/*
 * 버튼(btnPfSetting)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPfSettingClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPfSetting = e.control;
	
	util.Msg.notify(app, "INF-M000", "준비 중인 서비스입니다.");
}


/*
 * 버튼(btnLogout)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLogoutClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLogout = e.control;
	
	util.Msg.confirmDialog(app, "로그아웃 하시겠습니까?", null, function(e){
		if(e.control.returnValue.closeState === "confirm") {
			
			util.Submit.send(app, "subLogout", function(pbSuccess) {
				if (pbSuccess){
					alert("로그아웃되었습니다.");
					
					/* 메인 화면으로 전환 (SPA 전환) */
					window.location.href = "/";
					return;
					
					/* 메인 화면으로 전환 (SPA 전환) */
//					cpr.core.App.load("app/com/inc/login", function(newapp) {
//						//app.close();
//						newapp.createNewInstance().run();
//					});
//					return;
				}
			});

		}
	});
	
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	toggleMenuItem(vcMenuItem);
	
	openMenuItem(vcMenuItem);
	
	app.lookup("mnuMnMenu").selectItemByValue(vcMenuItem.value);
	
}


/*
 * 메뉴에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMnuMnMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Menu
	 */
	var mnuMnMenu = e.control;
	
	var vcMenuItem = e.item;
	
	if (ValueUtil.isNull(vcMenuItem)){
		return;
	}
	
	openMenuItem(vcMenuItem);
	
	app.lookup("treMenu").selectItemByValue(vcMenuItem.value);
}

/************************************************
 * 컨트롤 이벤트 (컨텐츠 영역)
 ************************************************/


/*
 * 버튼(btnDfItem)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDfItemClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDfItem = e.control;
	
	/* 디폴트 탭 아이템 선택 스타일 설정 */
	var vbSelcted = btnDfItem.style.hasClass("cl-selected");
	if (vbSelcted == false){
		btnDfItem.style.addClass("cl-selected");
	}

	/* 디폴트 탭 아이템 선택 (숨겨진 탭 아이템 선택) */
	var vcMdiCn = app.lookup("mdiCn");
	vcMdiCn.setSelectedTabItem(vcMdiCn.getTabItems()[0], false);
}


/*
 * MDI 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onMdiCnSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	var treMenu = app.lookup("treMenu");
	/** @type cpr.controls.EmbeddedApp */
	var EmbeddedApp = e.newSelection.content;
	
	var btnDfItem = app.lookup("btnDfItem");
	btnDfItem.style.removeClass("cl-selected");
	
	//메뉴를 새로 연 경우는 제외
	if(!EmbeddedApp)	return ;
	
	cpr.core.NotificationCenter.INSTANCE.post("check-menu-auth", {
		vcEmb : EmbeddedApp
	});
}


/*
 * MDI 폴더에서 close 이벤트 발생 시 호출.
 * 탭 아이템을 닫을 때 발생하는 이벤트이며, 사용자가 취소할 수 있습니다.
 */
function onMdiCnClose(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	if(e.content && e.content.content){
		
		var vcItemApp = e.content.content.getEmbeddedAppInstance();
		
		if(util.isAppModified(vcItemApp, "CRM", vcItemApp.getContainer())){
			e.preventDefault();
			mdiCn.setSelectedTabItem(e.content);
			return false;
		}
		
		e.content.content.removeAllUserAttr();
		e.content.content.removeAllEventListeners();		
		
	}
	
	/* 첫 아이템을 제외한 나머지 탭 아이템이 닫혔을 때 첫 아이템 선택 */
	var vaLastTabItems = _.reject(mdiCn.getTabItems(), function(each) {
		return each == e.content;
	});
	
	if (vaLastTabItems.length > 1){
		return;
	}
	
	mdiCn.setSelectedTabItem(vaLastTabItems[0]);
	
	var btnDfItem = app.lookup("btnDfItem");
	btnDfItem.style.addClass("cl-selected");
	
}


/*
 * 버튼(btnDropdown)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDropdownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDropdown = e.control;
	
	var vcGrpCnHdRVrt = app.lookup("grpCnHdRVrt");
	
	var voActualRect = btnDropdown.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpCnHdRVrt);
	
	floating(vcGrpCnHdRVrt, {
		top : voActualRect.bottomCenter.y + "px",
		right : "20px",
		height : voTargetConstraint.height,
		width: voTargetConstraint.width	
	});	
}



/*
 * 버튼(btnZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnZoom = e.control;
	
	var vbZoomed = btnZoom.style.hasClass("cl-selected");
	if (vbZoomed){
		zoomOutConent();
	} else {
		zoomInContent();
	}
}


/*
 * 버튼(btnRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRefresh = e.control;
	
	/* 현재 선택되어 있는 화면을 새로고침 합니다. */
	var vcMdiCn = app.lookup("mdiCn");
	
	var vcSelectedTabItem = vcMdiCn.getSelectedTabItem();
	var vcItemCn = vcSelectedTabItem.content;
	
	if (vcItemCn instanceof cpr.controls.EmbeddedApp) {
		
		var vsAppId = vcItemCn.app.id;
		vcItemCn.app = null;
//		vcItemCn.getEmbeddedAppInstance().dispose();
		cpr.core.App.load(vsAppId, function(loadedApp) {
			vcItemCn.app = loadedApp;
			vcItemCn.redraw();
		});
	}
}



/*
 * 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	
	var vcMdiCn = app.lookup("mdiCn");
	
	var vsDivideMdiUseYn = util.DataMap.getValue(app, "dmGlobalConfig", "divideMdiUseYn");
	
	if ("Y" == vsDivideMdiUseYn) {
		// 첫번째 탭 고정 (2021.07.27 수정)
		comMdiClose.setFixedItem();
		
		// 전체닫기 모듈적용 (2021.07.27 수정)
		comMdiClose.closeTabAll("cmbLayout");
		
		// 분할 아이콘 초기화
//		var voItem = app.lookup("cmbLayout").getItem(0);
//		app.lookup("cmbLayout").selectItem(voItem);
	} else {
		if (confirm("오픈된 전체 화면을 닫으시겠습니까?")) {
			app.lookup("mdiCn").closeOthers(vcMdiCn.getTabItems()[0]);
		}
	}
}


/************************************************
 * 컨트롤 이벤트 (라이트 영역)
 ************************************************/
/*
 * 버튼(btnRbClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRbCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRbClose = e.control;
	
	app.lookup("grpRghtbar").visible = false;
}


/************************************************
 * 컨트롤 이벤트 (플로팅 영역)
 ************************************************/


/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSchUnfdSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.SearchInput
	 */
    var ipbMenuSearch = e.control;
	var vsValue = ipbMenuSearch.value;
	var vcTree = app.lookup("treMenu");
	vcTree.collapseAllItems();
	if(!vsValue) return;
	vcTree.getItems().filter(function(item){
		if(item.label.indexOf(vsValue) >-1){
			var vsPValue = item.parentValue;
			var vaChildItem = vcTree.getChildren(item);
			var voParent = vcTree.getItemByValue(vsPValue);
			getParentMenuNode(voParent);
			vcTree.focusItem(item);
		}
		return false;
	});
	
	function getParentMenuNode(poTreeItem){
		
		if(!poTreeItem) return;
		
		if(poTreeItem.parentValue == ""){
			vcTree.expandItem(poTreeItem);
		}else{
			vcTree.expandItem(poTreeItem);
			getParentMenuNode(vcTree.getItemByValue(poTreeItem.parentValue));
		}
	}
}


/*
 * "Clear All" 아웃풋(optNtClrAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtClrAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtClrAll = e.control;
	
	util.Control.redraw(app, ["btnAlrt"]);
	
}


/*
 * "View All" 아웃풋(optNtVwAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtVwAllClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optNtVwAll = e.control;
	
	//TODO 공지사항 또는 알림 관련 로직을 작성하십시오.
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrpCnHdRVrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpCnHdRVrt = e.control;
	
	unfloating(grpCnHdRVrt);	
}


/*
 * 버튼(btnVrtZoom)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtZoomClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtZoom = e.control;
	
	app.lookup("btnZoom").click();
}


/*
 * 버튼(btnVrtRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtRefreshClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtRefresh = e.control;
	
	app.lookup("btnRefresh").click();
}


/*
 * 버튼(btnVrtClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnVrtCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnVrtClose = e.control;
	
	app.lookup("btnClose").click();
}


/*
 * MDI 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트입니다.
 */
function onMdiCnTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.MDIFolder
	 */
	var mdiCn = e.control;
	
	if(e.button == 2){
		var item = e.item;
		
		/** 
		 * @type cpr.controls.MDIFolder
		 */
		var mainMdi = e.control;
		var vcSelectedTabItem = mainMdi.getSelectedTabItem();
		
		e.preventDefault();
	
//		var vcMenuOrg = app.lookup("mdiTabmenu");
		var vcRootContainer = app.getRootAppInstance().getContainer();
	
//		if (vcMenuOrg) {
//			vcRootContainer.removeChild(vcMenuOrg);
//		}
		var vcMenu = new cpr.controls.Menu("mdiTabmenu");
		vcMenu.addItem(new cpr.controls.TreeItem("모든 탭 닫기", "closeAll", "root"));
		vcMenu.addItem(new cpr.controls.TreeItem("다른 탭 닫기", "closeOthers", "root"));
		vcMenu.addItem(new cpr.controls.TreeItem("앱ID 복사", "clipBoardAppId", "root"));
	
		vcMenu.addEventListener("selection-change", function( /**@type cpr.events.CSelectionEvent */ e) {
			var vaNewSelection = e.newSelection;
			switch (vaNewSelection[0].value) {
				case "closeAll":
					mainMdi.closeAll();
					break;
				case "closeOthers":
					mainMdi.closeOthers(item);
					mainMdi.setSelectedTabItem(item);
					break;
				case "clipBoardAppId":
					var input = document.createElement("input");
					input.style.position = "fixed";
					input.value = item.content.app.id;
					document.body.appendChild(input);
					input.focus();
					input.select();
					document.execCommand("copy");
					document.body.removeChild(input);
					util.Msg.notify(app, "앱 ID가 복사되었습니다.");
					break;
			}
			vcMenu.hide();
			vcMenu.dispose();
		});
	
		vcMenu.addEventListener("blur", function( /**@type cpr.events.CFocusEvent*/ e) {
			vcMenu.hide();
			vcMenu.dispose();
		});
		var showConstraint = {
				"position" : "absolute",
				"top" : e.clientY + "px",
				"left" : (e.clientX + 50) + "px",
				"width" : "150px",
				"height" : "auto"
			};
		if(vcRootContainer.getLayout() instanceof cpr.controls.layouts.FormLayout){
			app.floatControl(vcMenu, showConstraint);
		}else{
			vcRootContainer.addChild(vcMenu, showConstraint);
		}	
		vcMenu.focus();
	}
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	util.SelectCtl.selectItem(app, "cmbTheme", 
		util.DataMap.getValue(app, "dmGlobalConfig", "default_theme"));
	
	var vbCbxToggle = localStorage.getItem( "cbxToggle");
	if(vbCbxToggle){
		app.lookup("cbxToggle").checked =  ValueUtil.fixBoolean(vbCbxToggle);
	}
	
	var mdiFolder = app.lookup("mdiCn");
	util.AppStack.start(mdiFolder);
}



/*
 * 버튼(btnAlrt)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAlrtClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAlrt = e.control;
	
	var vcGrpNotiBox = app.lookup("grpNotiBox");
	
	var voActualRect = btnAlrt.getActualRect();
	var voTargetConstraint = app.getContainer().getConstraint(vcGrpNotiBox);
	
	if(voTargetConstraint.height == null || voTargetConstraint.height == undefined) {
		// 알림방 max-height 설정 (2021.10.05 추가)
		voTargetConstraint.height = "266px";
	}
	
	floating(vcGrpNotiBox, {
		top: "59px",
		left: voActualRect.centerRight.x - parseInt(voTargetConstraint.width) + "px",
		height: voTargetConstraint.height,
		width: voTargetConstraint.width
	});
}


/*
 * "Clear All" 아웃풋(optNtClrAll)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptNtClrAllClick2(/* cpr.events.CMouseEvent */ e){
		/** 
	 * @type cpr.controls.Output
	 */
	var optNtClrAll = e.control;
	
	/* 메세지 정보 모두 삭제 */
	app.lookup("dsMsgStack").clear();
	
	/* 메세지 아이템 삭제 */
	removeNotificationItem();
	
	util.Control.redraw(app, ["grpNotiBox", "btnAlrt"]);
}

/**
 * 메인 화면에 transition 으로 인해 그리드 column넓이를 재계산을 위한 redraw
 */
function transitionEnd(){
	
	var container = app.getContainer();
	var layout = container.getLayout();
	var animationDuration = layout.animationDuration;
	
	//animation duration이 0일경우 다시 그리지 않는다.
	if(animationDuration == 0){
		return ;
	}	
	
	var transitionTime = (animationDuration * 1000);
	var event = new cpr.events.CAppEvent('windowResize');
	
	setTimeout(function(){
		app.lookup("mdiCn").redraw();
		
		// 분할 플로팅 그룹 위치 재설정 추가 (2021.10.06 추가)
		comDiv.updateFloatConstraint();
		
		app.dispatchEvent(event);
	}, transitionTime);
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	if (cmb1.value.split('/')[1] == 'hyundai') {
		app.lookup('btnThm').visible = true;
	} else {
		app.lookup('btnThm').visible = false;
	}
			
	// 선택한 테마 타입과 그 외의 테마 타입에 대하여 스타일을 제거 또는 추가 합니다.
	setThemeTypeStyle(app.lookup("grp1"), cmb1);
	
	// 테마 스위칭 가능하도록 link 속성에 disabled관련 제어
	var voRootAppIns = app.getRootAppInstance();
	
	if (voRootAppIns){
		var vsTheme = util.SelectCtl.getValue(app, "cmbTheme");
		setTheme(vsTheme);
	}
	
}

/**
 * 선택된 타입 이외의 타입에는 selected 스타일을 제거하고, 
 * 선택된 타입에는 selected 스타일을 추가합니다.
 * 
 * @param {cpr.controls.Container} pcContainer
 * @param {cpr.controls.Output} pcControl
 */
function setThemeTypeStyle(pcContainer, pcControl) {
	pcContainer.getChildren().forEach(function(each){
		each.style.removeClass("selected");
	});
	
	pcControl.style.addClass("selected");
}


/*
 * 그룹에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onGrpMiniMnBoxMouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpMiniMnBox = e.control;
	
	/* 모바일일 때 트리 메뉴를 플로팅하여 보여줌 */
//	floating(app.lookup("grpAside"), {
//		top: "10px",
//		left: "10px",
//		bottom: "10px",
//		width: mnInitGrpAsideMenuSize + "px"
//	}, function() {
//		/* 플로팅 해제 후 토글 상태에 따라 일반 메뉴 또는 미니 메뉴 표시 */
//	});
}


/*
 * 그룹에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onGrpMenuWrapMouseleave(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpMenuWrap = e.control;
	// cbxToggle 체크되어 있을 경우 미니 메뉴 보이도록 설정
//	if (!app.lookup("cbxToggle").checked || app.targetScreen.name != "default") {
//		var vcGrpCont = app.getContainer();
//		//헤더
//		var vcGrpHeader = app.lookup("grpHeader");
//		/* 상태에 따라 컨트롤 크기 및 위치 변경 */
//		vcGrpCont.updateConstraint(vcGrpHeader, {
//			left : mnInitMnMenuSize + "px"
//		});
//		unfloating(app.lookup("grpAside"));
//		collapseSideMenu();
//	}
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbLayoutSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbLayout = e.control;
	
	comMdiClose.getTabList(cmbLayout, "divide");	
}


/*
 * 슬라이더에서 value-change 이벤트 발생 시 호출.
 * 값이 변경된 후 발생하는 이벤트
 */
function onSldZoomValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sldZoom = e.control;
	var vnScale = (Number(util.Control.getValue(app, "sldZoom")) / 100).toFixed(1);
	app.lookup("mdiCn").getTabItems().forEach(function(tabItem) {
		/** @type cpr.controls.EmbeddedApp */
		var EmbeddedApp = tabItem.content;
		EmbeddedApp.getEmbeddedAppInstance().getContainer().style.css({
			"transform": "scale3d(" + vnScale.toString() + ", " + vnScale.toString() + ", 1)",
			"transform-origin": "0 0"
		});
		EmbeddedApp.redraw();
	});
	util.Control.setValue(app, "optZoom", Number(util.Control.getValue(app, "sldZoom")).toFixed(0).toString());
}


/*
 * 버튼(btnScale)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnScaleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnScale = e.control;
	util.Control.setValue(app, "sldZoom", "100");
}

/**
 * 접속시간의 타이머를 설정하는 함수입니다. mm:ss 포맷 형식의 string을 입력받으며, (00:00 ~ 59:59) 사이의 값을 제공받아야합니다.
 * @param {String} psTime 타이머가 시작될 시간
 */
function startTimer(psTime) {
	var vcOptTime = app.lookup("optTime");
	
	vcOptTime.value = psTime;
	var vsTime = moment(psTime, "mm:ss");
	
	clearInterval(timerInterval);
	
	timerInterval = setInterval(function() {
		var vsLimitTime = vsTime.subtract(1, "seconds");
		vcOptTime.value = vsLimitTime.format("mm:ss");
		vcOptTime.redraw();
	}, 1000);
}



/*
 * 아웃풋(optTime)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOptTimeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var optTime = e.control;
	startTimer(vsDefaultTime);
}



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbUnfdSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmbUnfd = e.control;
	
	util.MDI.open(app, cmbUnfd.value);
	
	cmbUnfd.value = "";
	
	unfloating(cmbUnfd);

}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange2(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;

	cmb1.value === "pc" ? changeToDefault() : changeToMobile();
	transitionEnd();
	util.Group.changeScreen(app, cmb1.value);
}

/**
 * 특정 컨트롤을 플로팅합니다. modaless로 팝업을 열기 때문에, overlay한 부분을 클릭해도 플로팅이 사라지지 않습니다.
 * @param {cpr.controls.UIControl} pcControl
 * @param {any} poConstraint
 */
function floatingModaless(pcControl,poConstraint){
	var vcFloatingTarget = pcControl;
	
	var vcGrpCont = app.getContainer();
	util.Control.setVisible(app,true,vcFloatingTarget.id);
	vcGrpCont.floatControl(vcFloatingTarget,poConstraint);
	vcFloatingTarget.focus();
}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSchSrchSearch( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.SearchInput
	 */
	var schSrch = e.control;
	//TODO 통합검색 로직을 작성하십시오.
	var vsFindWrd = schSrch.value;
	var vcTreeMenu = app.lookup("treMenu");
	var vcTargetCont = app.lookup("grpSrchResult");
	if (ValueUtil.fixNull(vsFindWrd) == "") {
		vcTargetCont.removeAllChildren();
	} else {
		var vaFindItems = vcTreeMenu.dataSet.findAllRow("(MENU_NM *=  '" + vsFindWrd + "' || " + 
			"DESC *= '" + vsFindWrd + "') && CALL_PAGE != ''");
			
		if (vaFindItems.length > 0) {
			vcTargetCont.removeAllChildren();
			vaFindItems.forEach(function(each) {
				
				var newBtn = new cpr.controls.Output();
				newBtn.value = each.getValue("MENU_DESC");
				newBtn.userAttr("MENU_ID", each.getValue("MENU_ID"));
				newBtn.style.setClasses("badge badge-success");
				newBtn.addEventListener("click", function(ev) {
					var btnControl = ev.control;
					var vsMenuId = newBtn.userAttr("MENU_ID");
					if (!ValueUtil.isNull(vsMenuId)) {
						doOpenMenuToMdi(vsMenuId);
						unfloating(app.lookup("grpSch"));
						vcTargetCont.removeAllChildren();
						schSrch.value = "";
					}
				});
				vcTargetCont.addChild(newBtn, {
					"width": "100px",
					"height": "30px",
					"autoSize": "width"
				});
			});
			vcTreeMenu.redraw();
		} else {
			vcTargetCont.removeAllChildren();
			return false;
		}
	}
}

/*
 * 버튼(btnMenuSchClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMenuSchCloseClick(e){
	var btnMenuSchClose = e.control;
	unfloating(app.lookup("grpSch"), function() {
	util.Control.setValue(app, "schSrch", "");
	app.lookup("grpSrchResult").removeAllChildren();
	});
}

/*
 * 버튼(btnThm)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnThmClick(e){
	var btnThm = e.control;
	
	var voActlRct = btnThm.getActualRect();
	
	var vcLbxThm = app.lookup("lbxThm");
	vcLbxThm.visible = true;
	app.floatControl(vcLbxThm, {
		top: voActlRct.top + voActlRct.height + "px",
		left: voActlRct.left + "px",
		width: "130px"
	});
	
	vcLbxThm.focus();
}

/*
 * 리스트 박스에서 selection-change 이벤트 발생 시 호출.
 * ListBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onLbxThmSelectionChange(e){
	/** 
	 * @type cpr.controls.ListBox
	 */
	var lbxThm = e.control;
	
	var theme = lbxThm.value;
	
	var vcGrpCont = app.getContainer();
	var globalAside = document.querySelector(".cl-global-aside");

	// 클래스 초기화
	vcGrpCont.style.setClasses("");
	globalAside.className = "cl-global-aside";
	
	// 새 테마 클래스 추가
	vcGrpCont.style.addClass("is-" + theme);
	globalAside.classList.add("is-" + theme);
	
	// 버튼에 테마 표시
	var vcBtnThm = app.lookup("btnThm");
	vcBtnThm.style.setClasses(["btn-round", "btn-theme"]);
	
//	if (theme != "blue"){
//		vcBtnThm.style.addClass("bg-" + theme);
//	}

	vcBtnThm.style.addClass("bg-" + theme);
	
	lbxThm.blur();
}

/*
 * 리스트 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onLbxThmBlur(e){
	var lbxThm = e.control;
	
	lbxThm.visible = false;
	
	var vcGrpCont = app.getContainer();
	vcGrpCont.addChild(lbxThm, {
		width: "130px",
		height: "126px"
	});
}
