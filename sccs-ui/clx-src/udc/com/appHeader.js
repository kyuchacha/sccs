var util = createCommonUtil();

var mbCollapsed = false;
var mnOriginCtrlHeight = "0px";
var maResizeCtrlsConstraint = [];

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 * app 초기화 내역
 * - 1. 그리드 초기화 (util.Grid.init)
 *      관련 앱 속성 : gridIds
 * - 2. 그리드와 연결된 입력 폼레이아웃 초기화 (util.FreeForm.init)
 *      관련 앱 속성 : freeformIds
 * - 3. 조회조건 그룹 초기화 (util.Group.initSearchBox)
 *     관련 앱 속성 : searchBoxId
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	//	var vsInitializeYn  = app.getAppProperty("initializeYn");
	//	if("N" == vsInitializeYn) return;
	//어플리케이션 메뉴 정보
	var voMenuInfo = util.Auth.getMenuInfo(app);
	//어플리케이션 타이틀 셋팅
	var vcPgmTitle = app.lookup("ipbPgmId");
	var hostApp = app.getHostAppInstance();
	
	if (!util.Dialog.isPopup(hostApp)) {
		
		if (app.getRootAppInstance().hasAppMethod("getMenuPath")) {
			var vsCallPage = voMenuInfo.get("CALL_PAGE");
			var vsMenuId = voMenuInfo.get("MENU_ID");
			if (!vsCallPage) return;
			
			if(vsCallPage.indexOf("layout/pattern") > -1){
				util.Control.setVisible(app, true, "btnLayout");
			}
			
			vsCallPage = vsCallPage.replace(".clx", "");
			vsCallPage = vsCallPage.substring(vsCallPage.lastIndexOf("/") + 1, vsCallPage.length);
			vcPgmTitle.value = vsCallPage;
			if (hostApp.targetScreen.name == "mobile" || hostApp.targetScreen.name == "tablet") {
				util.Control.setVisible(app, false, "ipbPgmId");
			}
			
			//		if(!(hostApp.getContainer().getLayout() instanceof cpr.controls.layouts.FormLayout)){
			//			hostApp.getContainer().style.css("min-width", "1320px");
			//			hostApp.getContainer().style.css("min-height", "680px");
			//		}
			var vcGrpMenuPath = app.lookup("grpMenuPath");
			var voDmMenuNaviPath = app.getRootAppInstance().callAppMethod("getMenuPath", vsMenuId);
			if (voDmMenuNaviPath) {
				var vaMenuNaviPathId = voDmMenuNaviPath.get("MENU_PATH_ID");
				var vaMenuNaviPathNm = voDmMenuNaviPath.get("MENU_PATH_NM");
				
				var vcGrpMenuPathLayout = vcGrpMenuPath.getLayout();
				
				var vaCols = vaMenuNaviPathId.map(function(each) {
					return "10px";
				});
				
				vcGrpMenuPathLayout.setColumns(vaCols);
				
				vaMenuNaviPathId.some(function(cos, idx) {
					var vcBtnMenuPath = new cpr.controls.Button(cos);
					var vsPathNm = vaMenuNaviPathNm[idx];
					
					vcBtnMenuPath.value = vsPathNm + (idx < (vaMenuNaviPathId.length - 1) ? ">" : "");
					
					if (idx == vaMenuNaviPathId.length - 1) {
						vcBtnMenuPath.tooltip = vsCallPage;
					}
					
					vcBtnMenuPath.style.addClass("btn-menu-path");
					vcBtnMenuPath.addEventListener("click", function(e) {
						app.getRootAppInstance().callAppMethod("doMenuPath", cos);
						app.getRootAppInstance().lookup("cbxToggle").value = "true";
					});
					
					vcGrpMenuPathLayout.setColumnAutoSizing(idx, true);
					
					vcGrpMenuPath.addChild(vcBtnMenuPath, {
						"colIndex": idx,
						"rowIndex": 0
					});
				});
			}
		} else {
			util.Control.setVisible(app, false, ["grpMenuPath", "optUnitTestPopup"]);
		}
	} else {
		
		var vsTitleNm = hostApp.app.title;
		
		if (!ValueUtil.isNull(vsTitleNm)) {
			var vcGrpMenuPath = app.lookup("grpMenuPath");
			var vcGrpMenuPathLayout = vcGrpMenuPath.getLayout();
			vcGrpMenuPathLayout.setColumns(["10px"]);
			var vcBtnTitle = new cpr.controls.Button(hostApp.app.id + "_pop");
			
			vcBtnTitle.value = vsTitleNm;
			vcBtnTitle.style.addClass("btn-menu-path");
			vcGrpMenuPathLayout.setColumnAutoSizing(0, true);
			vcGrpMenuPath.addChild(vcBtnTitle, {
				"colIndex": 0,
				"rowIndex": 0
			});
		} else {
			util.Control.setVisible(app, false, ["grpMenuPath", "optUnitTestPopup"]);
		}
	}
	
	//그리드 초기화
	//그리드ID가 지정된 경우가 아니면... 화면 내의 모든 그리드를 대상으로 초기화 작업을 수행한다.
	var vaGridIds = [];
	if (!ValueUtil.isNull(app.getAppProperty("gridIds"))) {
		vaGridIds = ValueUtil.split(app.getAppProperty("gridIds"), ",");
	} else {
		vaGridIds = util.Group.getAllChildrenByType(hostApp, "grid");
	}
	
	util.Grid.init(hostApp, vaGridIds);
	
	//프리폼 초기화
	var vaFreeformIds = [];
	if (!ValueUtil.isNull(app.getAppProperty("freeformIds"))) {
		vaFreeformIds = ValueUtil.split(app.getAppProperty("freeformIds"), ",");
	} else {
		var tempForms = util.Group.getAllChildrenByType(hostApp, "container", null, true);
		var vsSearchBoxId = app.getAppProperty("searchBoxId") != null ? app.getAppProperty("searchBoxId") : "grpSearch";
		var vaSearchBoxIds = ValueUtil.split(vsSearchBoxId, ",");
		tempForms.forEach(function(each) {
			/**@type cpr.controls.Container*/
			var form = each;
			if (vaSearchBoxIds.indexOf(form.id) == -1 && form.getLayout() instanceof cpr.controls.layouts.FormLayout &&
				form.style.getClasses().indexOf(AppProperties.FORM_LAYOUT_CSS) != -1) {
				if (util.Group.getBindDataSet(app, form) != null) {
					vaFreeformIds.push(form.id);
				}
			}
		});
	}
	util.FreeForm.init(hostApp, vaFreeformIds);
	
	//조회조건 그룹 
	var vsSearchBoxId = app.getAppProperty("searchBoxId");
	
	vsSearchBoxId = vsSearchBoxId != null ? vsSearchBoxId : "grpSearch";
	var vsDisableBoxId = app.getAppProperty("groupBoxIds");
	var vaDisableBoxIds = vsDisableBoxId != null ? ValueUtil.split(vsDisableBoxId, ",") : ["grpData"];
	if (!ValueUtil.isNull(vsSearchBoxId)) {
		var pbExist = false;
		for (var i = 0, len = vaDisableBoxIds.length; i < len; i++) {
			if (hostApp.lookup(vaDisableBoxIds[i]) != null) {
				pbExist = true;
				break;
			}
		}
		if (pbExist) {
			// 화면 조회시 grpData 그룹 비활 예외 처리
			var vsInitializeYn = app.getAppProperty("initializeYn");
			if ("N" != vsInitializeYn)
				util.Group.initSearchBox(hostApp, vsSearchBoxId, vaDisableBoxIds);
		}
	}
	
	//		//앱컨테이너가 버티컬 레이아웃이고 작업영역그룹이 하나이거나 해당 컨테이너의 자식컨트롤 중 fillLayout 사용자정의속성이 Y인 그룹의
	//		// 높이를 재지정함(화면에 꽉차이게..)
	//		   
	//		var vcFillLayout;
	//		var flExclusionHeight = 0;
	//		var vaChildren = hostApp.getContainer().getChildren();
	//		var vaFillLayout = vaChildren.filter(function(each){
	//			return "Y" == each.userAttr("fillLayout");
	//		});
	//
	//		if(vaFillLayout.length == 1){
	//			vcFillLayout = vaFillLayout[0];
	//		}else if (vaDisableBoxIds.length == 1){
	//			vcFillLayout = hostApp.lookup(vaDisableBoxIds[0]);
	//		}else{
	//			vcFillLayout = null;
	//		}
	//		
	//		var mainRootApp = util.getMainApp(app);
	//		var mainRootCon = mainRootApp.getContainer();
	//		var mainRootLayout = mainRootCon.getLayout();
	//			
	//		if( vcFillLayout && hostApp.getContainer().getLayout() instanceof cpr.controls.layouts.VerticalLayout 
	//						&& !(mainRootLayout instanceof cpr.controls.layouts.VerticalLayout) ){
	////			hostApp.setPreferredSize(hostApp.getPreferredSize().width, 680);
	//			vaChildren.forEach(function(each){
	//				if(each.id != vcFillLayout.id){
	//					var voChildConst = hostApp.getContainer().getConstraint(each);
	//					var vsHeight = voChildConst.height;
	//	  				var vnHeight = vsHeight.replace("px", "");
	//	  				flExclusionHeight += ValueUtil.fixNumber(vnHeight);	
	//				}
	//			});
	//			
	//			if(flExclusionHeight > 0){
	//				//최소 사이즈
	//				var vsHeight = "680px";
	//				var mainHeight = mainRootApp.getActualRect().height;
	//				if(mainHeight >= 900) {
	//					vsHeight  =  "calc(100% - " + (flExclusionHeight + 10) +"px)"
	//				} 
	//				var poConstraint = {
	//							height : vsHeight
	//					};
	//				hostApp.getContainer().updateConstraint(vcFillLayout, poConstraint);	
	//			}
	//		}
	
	//조회조건 확대/축소 초기 영역 Height
	var vcSearchBox = hostApp.lookup(ValueUtil.split(vsSearchBoxId, ",")[0]);
	if (vcSearchBox == null) {
		util.Control.setVisible(app, false, ["btnCollapse"]);
	} else {
		var hostContainer = hostApp.getContainer();
		var hostLayout = hostContainer.getLayout();
		var targetCtrl = app.getHost().getParent();
		if (targetCtrl && targetCtrl != hostApp.getContainer() && targetCtrl.style.getClasses().indexOf("header-box") != -1) {
			//초기 헤더 그룹 높이(Height)
			if (targetCtrl) {
				var voOriginConstraint = hostContainer.getConstraint(targetCtrl);
				if (hostLayout instanceof cpr.controls.layouts.FormLayout) {
					mnOriginCtrlHeight = hostLayout.getRows()[voOriginConstraint["rowIndex"]];
				} else {
					mnOriginCtrlHeight = voOriginConstraint["height"];
				}
			}
			
			//접기시 Resize 대상 컨트롤ID가 지정되어 있는 경우...
			if (!ValueUtil.isNull(app.getAppProperty("expandCtrlIds"))) {
				if (!(hostLayout instanceof cpr.controls.layouts.FormLayout)) {
					var vaGroupCtrls = ValueUtil.split(app.getAppProperty("expandCtrlIds"), ",");
					vaGroupCtrls.forEach(function(each) {
						var ctrl = hostApp.lookup(each);
						if (ctrl) {
							var constraint = hostContainer.getConstraint(ctrl);
							maResizeCtrlsConstraint.push({
								"ctrl": ctrl,
								"top": constraint["top"],
								"bottom": ValueUtil.fixNull(constraint["top"]),
								"height": ValueUtil.fixNull(constraint["height"])
							});
						}
					});
				}
				//Resize 대상이 지정되어 있지 않은경우에는 화면에서 자동으로 그룹 컨테이너의 top 포지션을 보고 찾음
			} else {
				if (!(hostLayout instanceof cpr.controls.layouts.FormLayout)) {
					var baseTopPosition = ValueUtil.fixNumber(mnOriginCtrlHeight.replace("px", "")) + 15; //헤더 그룹 높이 + 15가 기준임
					hostContainer.getChildren().filter(function( /* cpr.controls.UIControl */ each) {
						return each instanceof cpr.controls.Container;
					}).forEach(function(ctrl) {
						if (ctrl != targetCtrl) {
							var constraint = hostContainer.getConstraint(ctrl);
							if (!ValueUtil.isNull(constraint["top"])) {
								if (ValueUtil.fixNumber(constraint["top"].replace("px", "")) <= baseTopPosition) {
									maResizeCtrlsConstraint.push({
										"ctrl": ctrl,
										"top": constraint["top"],
										"bottom": ValueUtil.fixNull(constraint["top"]),
										"height": ValueUtil.fixNull(constraint["height"])
									});
								}
							}
						}
					});
				}
			}
		}
	}
}

/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCollapseClick( /* cpr.events.CMouseEvent */ e) {
	var hostApp = app.getHostAppInstance();
	var vsSearchBoxId = app.getAppProperty("searchBoxId");
	vsSearchBoxId = vsSearchBoxId != null ? vsSearchBoxId : "grpSearch";
	
	/** @type cpr.controls.Container */
	var vcSearchBox = hostApp.lookup(ValueUtil.split(vsSearchBoxId, ",")[0]);
	if (vcSearchBox == null) return;
	
	/** @type cpr.controls.Container */
	var targetCtrl = app.getHost().getParent();
	if (targetCtrl == null || targetCtrl == hostApp.getContainer() || targetCtrl.style.getClasses().indexOf("header-box") == -1) return;
	
	var hostContainer = hostApp.getContainer();
	var hostLayout = hostContainer.getLayout();
	var btnCollapse = e.control;
	btnCollapse.style.addClass("btn-search-box-expand");
	if (mbCollapsed === false) {
		//조회조건 영역 접기
		targetCtrl.getChildren().filter(function( /* cpr.controls.UIControl */ each) {
			return !(each instanceof udc.com.appHeader || each.id == "btnSearch");
		}).forEach(function(ctrl) {
			ctrl.visible = false;
		});
		try {
			if (hostLayout instanceof cpr.controls.layouts.FormLayout) {
				var rowIndex = hostContainer.getConstraint(targetCtrl)["rowIndex"];
				var rowHeights = hostLayout.getRows();
				for (var i = 0, len = rowHeights.length; i < len; i++) {
					if (i == rowIndex) {
						rowHeights[i] = "30px";
						break;
					}
				}
				hostLayout.setRows(rowHeights);
			} else {
				hostContainer.updateConstraint(targetCtrl, {
					"height": "30px"
				});
				
				//하단 데이터 영역 top 조정
				var resizeHeight = ValueUtil.fixNumber(mnOriginCtrlHeight.replace("px", "")) - 30;
				maResizeCtrlsConstraint.forEach(function(each) {
					var changedConstraint = {
						"top": (ValueUtil.fixNumber(each.top.replace("px", "")) - resizeHeight) + "px"
					};
					if (each.height != "") {
						changedConstraint["height"] = (ValueUtil.fixNumber(each.height.replace("px", "")) + resizeHeight) + "px";
					}
					
					hostContainer.updateConstraint(each.ctrl, changedConstraint);
				});
			}
		} catch (ex) {
			console.log(ex);
		}
		
		mbCollapsed = true;
	} else {
		//조회조건 영역 펼치기
		targetCtrl.getChildren().filter(function( /* cpr.controls.UIControl */ each) {
			return !(each instanceof udc.com.appHeader);
		}).forEach(function(ctrl) {
			ctrl.visible = true;
		});
		
		try {
			if (hostLayout instanceof cpr.controls.layouts.FormLayout) {
				var rowIndex = hostContainer.getConstraint(targetCtrl)["rowIndex"];
				var rowHeights = hostLayout.getRows();
				for (var i = 0, len = rowHeights.length; i < len; i++) {
					if (i == rowIndex) {
						rowHeights[i] = mnOriginCtrlHeight;
						break;
					}
				}
				hostLayout.setRows(rowHeights);
				hostLayout.setRowAutoSizing(rowIndex, true);
			} else {
				hostContainer.updateConstraint(targetCtrl, {
					"height": mnOriginCtrlHeight
				});
				
				//하단 데이터 영역 top 조정
				maResizeCtrlsConstraint.forEach(function(each) {
					var revokeConstraint = {
						"top": each.top
					};
					if (each.height != "") {
						revokeConstraint["height"] = each.height;
					}
					hostContainer.updateConstraint(each.ctrl, revokeConstraint);
				});
			}
		} catch (ex) {
			console.log(ex);
		}
		
		mbCollapsed = false;
	}
}

/*
 * "" 버튼에서 animationend 이벤트 발생 시 호출.
 * 애니메이션 종료 후 발생하는 이벤트.
 */
function onBtnCollapseAnimationend( /* cpr.events.CAnimationEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCollapse = e.control;
	btnCollapse.style.removeClass("btn-search-box-expand");
	
	if (mbCollapsed == false) {
		btnCollapse.style.removeClass("btn-header-plus");
		btnCollapse.style.addClass("btn-header-minus");
	} else {
		btnCollapse.style.removeClass("btn-header-minus");
		btnCollapse.style.addClass("btn-header-plus");
	}
}

/*
 * "아이콘" 버튼(btnLayout)에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBtnLayoutMouseenter(e) {
	var buttonRect = e.control.getActualRect();
	var top = buttonRect.top + buttonRect.size.height;
	var left = buttonRect.left + buttonRect.size.width;
	var dialogManager = app.getRootAppInstance().dialogManager;
	
	if (dialogManager.getActiveDialogName() == undefined) {
		dialogManager.openDialog("app/exam/layout/imgViewer",
			'layout', {
				width: 800,
				height: 500,
				top: top,
				left: left - 800,
				modal: false
			},
			function(dialog) {
				dialog.ready(function(dialogApp) {
					dialogApp.setAppProperty('src', 'app/exam/layout/img/' + 
											 util.Auth.getMenuInfo(app).get('CALL_PAGE').split('/')[4].split('.')[0] + 
											 '.png');
					dialog.headerVisible = false;
					
					//MDI폴더 selection-change 시, 다이얼로그 제거
					app.getRootAppInstance().getContainer().getChild("mdiCn").addEventListener("selection-change", function(e){
						dialogApp.dispose();
					});
				});
			});
	}
	
}

///*
// * "아이콘" 버튼(btnLayout)에서 mouseleave 이벤트 발생 시 호출.
// * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
// */
//function onBtnLayoutMouseleave2(e) {
//	var dialogManager = app.getRootAppInstance().dialogManager;
//	dialogManager.getDialogByName(dialogManager.getActiveDialogName()).close();
//}