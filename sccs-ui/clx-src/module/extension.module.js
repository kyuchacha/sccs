/************************************************
 * Control Wrapping Utils
 * 각 사이트별 커스터마이징하여 사용
 * version 2.0
 ************************************************/

// 의존 모듈 선언.
module.depends("module/common");



/* 앱스택 변수 *******************************************************************/

var _LAST_KNOWN_STATE_ID = 0;
/**
 * 현재 앱 스택. 화면이 열린 후 열렸던 화면에 대한 스택을 쌓습니다.
 * @type StackInfo[]
 */
var _stack = [];

/**
 * 앞으로 가기 앱 스택.
 * @type StackInfo[]
 */
var _redoStack = [];
var appStackInfo = null;
/* **************************************************************************************************/

/**
 * AppStack(앱스택) 유틸
 * @constructor
 * @param {common.module} appKit
 */
function AppStackKit(appKit){
	this._appKit = appKit;

};

/**
 * 메시지 ID에 해당되는 메시지를 반환한다.
 * @param {cpr.controls.EmbeddedApp | cpr.controls.MDIFolder} 앱스택을 쌓을 컨트롤 embeddedApp or mdiFolder
 */
AppStackKit.prototype.start = function(control) {
	
	var type = null;
	if(control instanceof cpr.controls.EmbeddedApp){
		type = "EmbeddedApp";
	}else if(control instanceof cpr.controls.MDIFolder){
		type = "MDIFolder";
	}else{
		return ;
	}
	
	//앱스택 정보를 저장
	appStackInfo = (function(control, type){
		var appStackControl = control;
		var appStackType = type;
		
		return {
			getControl : function(){
				return appStackControl;
			},
			getType : function(){
				return appStackType;
			}
		}
	})(control, type);
	
	window.addEventListener("popstate", handlePoppedState);
    
};

AppStackKit.prototype.stop = function(){
	appStackInfo = null;
	window.removeEventListener("popstate", handlePoppedState);
} 

/**
 * @param {String} appId 스택을 쌓을 appId
 */
AppStackKit.prototype.push = function(appId){
	var type = appStackInfo.getType();
	if(type == "EmbeddedApp"){
		cpr.core.App.load(appId, function(loadedApp) {
			var newInfo = new StackInfo(appId);
			
			_stack.push(newInfo);
			
			if (_stack.length === 1) {
				history.replaceState(newInfo.state, loadedApp.title);
			} else {
				history.pushState(newInfo.state, loadedApp.title);
			}
		});
	}else{
		var newInfo = new StackInfo(appId);	
		_stack.push(newInfo);
			
		if (_stack.length === 1) {
			history.replaceState(newInfo.state, appId);
		} else {
			history.pushState(newInfo.state, appId);
		}
	}
	
}

/**
 * 브라우저의 popstate 이벤트를 처리하는 핸들러.
 * @param {PopStateEvent} e
 */
function handlePoppedState(e) {
	var state = e.state;
	if (!state) {
		return;
	}
	var type = appStackInfo.getType();
	var control = appStackInfo.getControl();	
	var prevAppInfo = _stack.filter(function( /* StackInfo */ each) {
		return each.state.id == state["id"];
	})[0];
	
	// 이후 기록에서 일치하는 항목 검색.
	var nextAppInfo = _redoStack.filter(function( /* StackInfo */ each) {
		return each.state.id == state["id"];
	})[0];
	
	var current;
	
	// 이전 항목 일치 처리.
	if (prevAppInfo) {
		while (getActiveStackInfo() != prevAppInfo) {
			if (_stack.length === 0) {
				return;
			}
			var current = _stack.pop();
			_redoStack.push(current);
		}
		current = getActiveStackInfo();
	}
	
	// 이후 항목 일치 처리.
	else if (nextAppInfo) {
		do {
			current = _redoStack.pop();
			_stack.push(current);
		} while (current !== nextAppInfo)
	}
	
	if(!current)	return ;
	var appId = current.state.appId;
	
	if(type == "EmbeddedApp"){
		cpr.core.App.load(current.state.appId, function(loadedApp) {
			control.app = loadedApp;
		});
	}else if(type == "MDIFolder"){
		/** @type cpr.controls.MDIFolder */
		var mdiFolder = control;
		
		var appIns = mdiFolder.getAppInstance();
		
		if(appIns.getRootAppInstance().hasAppMethod("doOpenMenuToMdi")){
			appIns.getRootAppInstance().callAppMethod("doOpenMenuToMdi", appId);		
		}
		
		/** Main의 메뉴호출방식이 app.id로 이루어질 경우 아래 로직 적용
		var currentTabItems = mdiFolder.getTabItems().filter(function(each){
			return each.content.app.id == appId;
		});
		if(currentTabItems.length > 0){
			var tabItem = currentTabItems[currentTabItems.length-1];
			mdiFolder.setSelectedTabItem(tabItem);
		}else{
			var appIns = mdiFolder.getAppInstance();
			var newItem = new cpr.controls.TabItem();
			var ea = new cpr.controls.EmbeddedApp();
			cpr.core.App.load(current.state.appId, function(loadedApp) {
				newItem.content = ea;
				newItem.text = loadedApp.title;
				newItem.closable = true;
				ea.app = loadedApp;
				mdiFolder.addTabItem(newItem);
				mdiFolder.setSelectedTabItem(newItem);
			});
		}**/
	}
}

/**
 * 
 */

/**
 * 현재 화면에 표시중인 앱 정보를 얻습니다.
 */
function getActiveStackInfo() {
	if (_stack.length > 0) {
		return _stack[_stack.length - 1];
	} else {
		return null;
	}
}

/**
 * 각 앱의 정보를 담은 스택 엘리먼트 객체.
 * @param {String} appId 앱 아이디
 * @constructor
 */
function StackInfo(appId) {
	this.state = {
		"appId": appId,
		"id": _LAST_KNOWN_STATE_ID++, 
	};
}



/**
 * ComUdcBtnKit(공통, 버튼) 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function ComUdcBtnKit(appKit){
	this._appKit = appKit;
};

/**
 * 지정한 컨트롤의 Enable 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbEnable 컨트롤 활성화 여부
 * @param {String | Array} paCtlId 배열 [I:신규, D:삭제, S:저장, 미지정 : 전체]
 * @return void
 */
ComUdcBtnKit.prototype.setEnable = function(app, pbEnable, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbEnable) != "boolean") {
		pbEnable = ValueUtil.fixBoolean(pbEnable);
	}
	
	var comButton = this._appKit.Group.getAllChildrenByType(app, "udc.com.comButton");
	for (var i=0, len=comButton.length; i<len; i++) {	
		var ctrl = comButton[i];
		ctrl.setEnableCtrls(pbEnable, paCtlId);
	}
};

/**
 * 공통 버튼 UDC 있는 컨트롤의 이벤트를 발생시킨다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 아이디
 * @param {String} psEventType 이벤트명(ex-click)
 */
ComUdcBtnKit.prototype.dispatchEvent = function(app, psCtlId, psEventType){
	
	var comUdc;
	
	if(psCtlId == "btnSearch"){
		comUdc = this._appKit.Group.getAllChildrenByType(app, "udc.com.comBtnSearch");
	}else{
		comUdc = this._appKit.Group.getAllChildrenByType(app, "udc.com.comButton");
	}
	
	if(comUdc != null && comUdc.length > 0){
		var vcCtrl = comUdc[0].getEmbeddedAppInstance().lookup(psCtlId);
		if(vcCtrl){
			vcCtrl.dispatchEvent(new cpr.events.CEvent(psEventType));
		}
	}
};



/**
 * 일반 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function ControlKit(appKit){
	this._appKit = appKit;
};

/**
 * 지정한 컨트롤의 Visible 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbVisible 컨트롤 숨김 여부
 * @param {#uicontrol | Array} paCtlId 컨트롤 ID 또는 ID 배열
 * @return void
 */
ControlKit.prototype.setVisible = function(app, pbVisible, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbVisible) != "boolean") {
		pbVisible = ValueUtil.fixBoolean(pbVisible);
	}
	for (var i=0, len=paCtlId.length; i<len; i++) {
		app.lookup(paCtlId[i]).visible = pbVisible;
	}
};

/**
 * 지정한 컨트롤의 Enable 속성을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} pbEnable 컨트롤 활성화 여부
 * @param {#uicontrol | Array} paCtlId 컨트롤 ID 또는 ID 배열
 * @return void
 */
ControlKit.prototype.setEnable = function(app, pbEnable, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	if (typeof (pbEnable) != "boolean") {
		pbEnable = ValueUtil.fixBoolean(pbEnable);
	}
	var ctrl;
	for (var i=0, len=paCtlId.length; i<len; i++) {	
		ctrl = app.lookup(paCtlId[i]);
		if(ctrl) ctrl.enabled = pbEnable;
	}
};

/**
 * 지정한 컨트롤의 ReadOnly 속성을 설정한다.<br>
 * 만약, 해당 컨트롤에 readonly이 없을경우 enable 속성으로 제어된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {Boolean} 		pbReadOnly  컨트롤 readOnly 여부
 * @param {#uicontrol | Array} paCtlId 컨트롤 ID 또는 ID 배열
 * @return void
 */
ControlKit.prototype.setReadOnly = function(app, pbReadOnly, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
		
	for (var i=0, len=paCtlId.length; i<len; i++) {
		var voCtl = app.lookup(paCtlId[i]);
	  	if(voCtl == null || "undefined" == voCtl) continue;
		
		var vsCtlType = voCtl.type;
		if(voCtl.readOnly !== undefined){
			voCtl.readOnly = pbReadOnly;
		}else{
			this.setEnable(app, !pbReadOnly, paCtlId[i]);
		}
	}
};

/**
 * 컨트롤의 지정된 사용자 정의 속성(userattr) 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	  컨트롤 ID
 * @param {String} psAttrName  속성
 * @return {String} 속성값
 */
ControlKit.prototype.getUserAttr = function(app, psCtlId, psAttrName){
   return app.lookup(psCtlId).userAttr(psAttrName);
};

/**
 * 컨트롤의 지정된 사용자 정의 속성(userattr)의 값을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	   컨트롤 ID
 * @param {String} psAttrName  속성
 * @param {String} psAttrValue 속성값
 * @return void
 */
ControlKit.prototype.setUserAttr = function(app, psCtlId, psAttrName, psAttrValue){
	var ctrl = app.lookup(psCtlId);
	var userAttr = ctrl.userAttr();
	userAttr[psAttrName] = psAttrValue;
};

/**
 * 컨트롤를 포커스(focus) 한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 	   컨트롤 ID
 */
ControlKit.prototype.setFocus = function(app, psCtlId){
	var ctrl = app.lookup(psCtlId);
	if(ctrl instanceof cpr.controls.UDCBase){
		var focused = false;
		var embApp = ctrl.getEmbeddedAppInstance();
		embApp.getContainer().getChildren().some(function(embCtrl){
			if(embCtrl.getBindInfo("value") && embCtrl.getBindInfo("value").property == "value"){
				embCtrl.focus();
				focused = true;
				return true;
			}
		});
		if(focused !== true){
			app.focus(ctrl);
		}
	}else{
		app.focus(ctrl);
	}
}

/**
 * 컨트롤의 값을 초기화한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId  일반 컨트롤 및 그리드 컨트롤 ID		
 * @return void
 */
ControlKit.prototype.reset = function(app, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	var vcCtrl;
	for (var i=0, len=paCtlId.length; i<len; i++) {
		vcCtrl = app.lookup(paCtlId[i]);
		if(vcCtrl == null) continue;
		if(vcCtrl.type == "grid"){
			vcCtrl.dataSet.clear();
			//그리드 타이틀 영역의 데이터 건수 업데이트
			var titles = this._appKit.Group.getAllChildrenByType(app, "udc.com.comTitle");
			for(var j=0, jlen=titles.length; j<jlen; j++){
				if(titles[j] == null || titles[j].getAppProperty("ctrl") == null) continue;
				if(titles[j].getAppProperty("ctrl").id == vcCtrl.id){
					titles[j].setAppProperty("rowCount", vcCtrl.dataSet.getRowCount());
				}
			}
		}else if(vcCtrl.type == "container"){
			var voDs = this._appKit.Group.getBindDataSet(app, vcCtrl);
			if(voDs) voDs.clear();
			vcCtrl.redraw();
		}else{
			vcCtrl.value = "";
		}
	}
};

/**
 * 특정 컨트롤의 자료를 갱신하고 다시 그린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId 일반 컨트롤 및 그리드 컨트롤 ID
 * @return void
 */
ControlKit.prototype.redraw = function(app, paCtlId) {
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	for (var i=0, len=paCtlId.length; i<len; i++) {
		var vcCtrl = app.lookup(paCtlId[i]);
		if(vcCtrl) vcCtrl.redraw();
	}
};

/**
 * 컨트롤의 지정된 style 속성 값을 가져옵니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 ID
 * @param {String} psAttrName style 속성명
 * @return {String} style 속성값
 */
ControlKit.prototype.getStyleAttr = function(app, psCtlId, psAttrName){
	/**@type cpr.controls.UIControl*/
	var vcCtrl = app.lookup(psCtlId);
	return vcCtrl.style.css(psAttrName);
};

/**
 * 컨트롤의 지정된 style 속성값을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 ID
 * @param {String} psAttrName 속성
 * @param {String} psAttrValue 속성값
 * @return void
 */
ControlKit.prototype.setStyleAttr = function(app, psCtlId, psAttrName, psAttrValue){
	/**@type cpr.controls.UIControl*/
	var vcCtrl = app.lookup(psCtlId);
	return vcCtrl.style.css(psAttrName, psAttrValue);
};

/**
 * 컨트롤이 실제 그려진 사이즈를 리턴합니다.<br>
 * 컨트롤이 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 리턴됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId  컨트롤 ID
 * @param {String} psPosition 구하고자하는 위치 및 크기 정보<br>(width, height, left, top, bottom, right)
 * @return {Interface{width: Number, height: Number, left: Number, top: Number, bottom: Number, right: Number}} HTML DOM에서의 컨트롤의 위치 및 크기 정보
 */
ControlKit.prototype.getActualRectPosition = function(app, psCtlId, psPosition){
	/** @type cpr.controls.UIControl */
	var vcCtrl = app.lookup(psCtlId);
	var voActRec = vcCtrl.getActualRect();
	return voActRec[psPosition];
};

/**
 * 해당 컨트롤의 제약 조건을 반환합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 반환하고자 하는 컨트롤 ID
 * @param {String} psParentGrp? 상위 컨트롤 그룹내 컨트롤의 제약 조건을 구할시 사용
 * @return {cpr.controls.layouts.Constraint} 해당하는 제약조건
 */
ControlKit.prototype.getConstraint = function(app, psCtlId, psParentGrp){
	var ctrl = app.lookup(psCtlId);
	var container;
	if(!ValueUtil.isNull(psParentGrp)){
		container = app.lookup(psParentGrp);
	}else{
		container = app.getContainer();		
	}
	return container.getConstraint(ctrl);
};

/**
 * 컨트롤의 지정된 제약 조건(constraint)을 변경합니다.<br>
 * 타겟 컨트롤에서 부모 컨트롤과의 연계된 위치를 변경합니다.<br>
 * parameter의 constraints가 포함한 항목만 변경합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 ID
 * @param {#container} psParentGrpId 상위 컨트롤의 ID (app의 container일 경우 null)
 * @param {Object} poConstraint 제약조건<br>
 * 					상위 컨트롤의 레이아웃이 formlayout일 경우 rowIndex, colIndex 를 반드시 포함한 조건을 설정하여야합니다.
 * @return {Boolean} 성공여부
 */
ControlKit.prototype.updateConstraint = function(app, psCtlId, psParentGrpId, poConstraint){
 	/** @type cpr.controls.UIControl */
 	var vcChild = app.lookup(psCtlId);
 	if(vcChild == null) return false;
 	/** @type cpr.controls.Container */
 	var voContainer = null;
 	if(!ValueUtil.isNull(psParentGrpId)){
 		voContainer = app.lookup(psParentGrpId);
 	}else {
 		voContainer = app.getContainer();
 	}
 	
 	var voLayout = voContainer.getLayout();
 	var voConstraint = null;
 	if(voLayout instanceof cpr.controls.layouts.ResponsiveXYLayout){
 		var voSrcConstraint = voContainer.getConstraint(vcChild)["positions"][0];
 		voConstraint = {
 			positions:[Object.assign(voSrcConstraint, poConstraint)]
 		}
 	}else {
 		voConstraint = poConstraint;
 	}
 	
 	return voContainer.updateConstraint(vcChild, voConstraint);
};

/**
 * 해당 컨트롤의 이벤트를 발생시킨다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤의 ID
 * @param {String} psEventType 이벤트명(ex-click)
 */
ControlKit.prototype.dispatchEvent = function(app, psCtlId, psEventType){
	var vcCtrl = app.lookup(psCtlId);
	if(vcCtrl){
		vcCtrl.dispatchEvent(new cpr.events.CEvent(psEventType));
	}
};

/**
 * 지정한 컨트롤의 value를 지정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 ID
 * @param {String} psValue 값
 * @param {Boolean} pbEmitEvent? 값 변경후의 before-value-change, value-change 이벤트 발생시킬지 여부<br/>
 *                  만약 값만 바꾸고, 이벤트 발생은 일어나지 않도록 하는 경우에만 false로 지정
 * @return void
 */
ControlKit.prototype.setValue = function(app, psCtlId, psValue, pbEmitEvent){
   var ctrl = app.lookup(psCtlId);
   if(pbEmitEvent === false && ctrl.putValue != undefined){
   		ctrl.putValue(psValue);
   }else{
   		ctrl.value = psValue;
   }
};

/**
 * @desc 지정한 컨트롤의 value를 취득한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 ID
 * @return void
 */
ControlKit.prototype.getValue = function(app, psCtlId){
   return app.lookup(psCtlId).value;
};

/**
 * @desc 지정한 컨트롤의 value를 취득한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtlId 컨트롤 ID
 * @param {String} psProperty 컨트롤 속성명
 * @return void
 */
ControlKit.prototype.getProperty = function(app, psCtlId, psProperty){
   return app.lookup(psCtlId)[psProperty];
};

/**
 * 파라미터로받은 parent하위의 모든 uiComponent들을 찾아 리턴합니다.(그룹, 임베디드앱, UDC일떄 사용)
 * @param {cpr.core.AppInstance} app
 * @param {cpr.controls.UIControl[]} poParent
 * @return {cpr.controls.UIControl[]} 
 */
ControlKit.prototype.getAllUiControl = function(app, poParent, result){
	
	if(!(poParent instanceof Array)){
      poParent = [poParent];
   }
	result = result || []
	var childs = []
	
	
	poParent.forEach(function(each){ 
		if(each.type === "embeddedapp" || each instanceof cpr.controls.UDCBase){
			childs = childs.concat(each.getEmbeddedAppInstance().getContainer().getAllRecursiveChildren());
		}
		else if(each.type === "container"){
			childs = childs.concat(each.getAllRecursiveChildren())
		}
	});
	result = result.concat(childs);
	var containers = childs.filter(function(each){
		if(each.type === "embeddedapp" || each instanceof cpr.controls.UDCBase){
			return true;
		}
	})

	return containers.length === 0 ? result : this.getAllUiControl(app, containers, result)
}

/**
 * app에 있는 모든 데이터 컨트롤을 리턴합니다.
 * @param {cpr.core.AppInstance[]} apps
 */
ControlKit.prototype.getAllDataControl = function(apps){
	var getRecursiveApp = function(startApp, resArray){
		resArray = resArray || startApp;
		
		var appInstances = [];
		
		startApp.forEach(function(each){
			appInstances = appInstances.concat(
				each.getContainer().getAllRecursiveChildren().filter(function(ctrl){
						return ctrl.type === "embeddedapp" || ctrl instanceof cpr.controls.UDCBase
				}).map(function(emb){
					return emb.getEmbeddedAppInstance();
				})
			)
		});
		
		return appInstances.length === 0 ? resArray : getRecursiveApp(appInstances, resArray.concat(appInstances))
	}
	
	if(!(apps instanceof Array)){
      apps = [apps];
    }
    var res = []
	getRecursiveApp(apps).forEach(function(/* cpr.core.AppInstance */ each){
		res = res.concat(each.getAllDataControls().filter(function(dataControl){
			return !(dataControl instanceof cpr.protocols.Submission);
		}))
	})
	return res;
}

/**
 * 컨트롤에 invalid클래스를 추가합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#uicontrol} ctrlId
 */
ControlKit.prototype.addInvalidClass = function(app, ctrlId){
	if(!(app instanceof cpr.core.AppInstance) || !ctrlId) return;
	
	app.lookup(ctrlId).style.addClass("invalid")
}

/**
 * 컨트롤에 invalid클래스를 제거합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#uicontrol} ctrlId
 */
ControlKit.prototype.removeInvalidClass = function(app, ctrlId){
	if(!(app instanceof cpr.core.AppInstance) || !ctrlId) return;
	
	app.lookup(ctrlId).style.removeClass("invalid")
}

/**
 * 해당 컨트롤 하위에 있는 invalid클래스를 제거합니다.
 * @param {cpr.core.AppInstance} app
 * @param {String} ctrlId (그리드 / 그룹)
 */
ControlKit.prototype.removeInvalidClassAll = function(app, psCtrlId){
	var ctrl = app.lookup(psCtrlId);

	if(ctrl instanceof cpr.controls.Grid){
		var detailColumns = [];
		
		ctrl.detail.getCellIndices().forEach(function(each){
			detailColumns.push(ctrl.detail.getColumn(each));
		});
		
		detailColumns.forEach(function(/* cpr.controls.gridpart.GridColumn */ column){
			if(column.control){
				column.control.style.unbindClass();
			}
		});
	}
	else{
		this.getAllUiControl(app, ctrl).forEach(function(each){
			each.style.removeClass("invalid");
		});
	}
	
}



/**
 * 데이터맵(DataMap) 데이터 컴포넌트 유틸
 * @param {common.AppKit} appKit
 */
function DataMapKit(appKit){
	this._appKit = appKit;
}

/**
 * 입력 받은 columnName에 해당되는 데이터를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {#column} psColumnName 값을 가져오고자 하는 컬럼명
 * @return {Object} 해당 데이터<br>
 * 					header dataType에 따라 반환타입이 정해짐<br>
					해당 columnName의 column이 존재 할 경우 해당 값 반환<br>
					해당 columnName의 값이 없을 경우 ""(공백) 반환<br>
					해당 columnName이 존재하지 않을 경우 null 반환
 */
DataMapKit.prototype.getValue = function(app, psDataMapId, psColumnName){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.getValue(psColumnName);
};

/**
 * 입력 받은 columnName에 해당되는 데이터를 수정
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {#column} psColumnName 값을 가져오고자 하는 컬럼명
 * @param {String} psValue 수정할 value 값
 * @return {Boolean} 값 수정 성공 여부
 */
DataMapKit.prototype.setValue = function(app, psDataMapId, psColumnName, psValue){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.setValue(psColumnName, psValue);
};

/**
 * 데이터를 모두 제거합니다.<br>
 * (data가 모두 공백으로 설정됩니다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param  {#datamap} psDataMapId 데이터맵 ID
 */
DataMapKit.prototype.clear = function(app, psDataMapId){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	vcDataMap.clear();
};

/**
 * 데이터를 모두 초기화합니다.<br>
 * (data 모두 초기 설정값으로 설정됩니다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param  {#datamap} psDataMapId 데이터맵 ID
 */
DataMapKit.prototype.reset = function(app, psDataMapId){
	/** @type cpr.data.DataMap */
	var vcDataMap = app.lookup(psDataMapId);
	vcDataMap.reset();
};

/**
 * 현재 데이터맵의 데이터를 타겟 데이터맵으로 복사합니다. <br>
 * 복사시 타겟 데이터맵의 alterColumnLayout 속성에 따라 복사방법의 설정됩니다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psSourceDataMapId 데이터맵 ID
 * @param {#datamap} psTargetDataMapId 복사 데이터가 들어갈 타겟 맵 ID
 * @return {Boolean}
 */
DataMapKit.prototype.copyToDataMap = function(app, psSourceDataMapId, psTargetDataMapId){
	var vcDataMap = app.lookup(psSourceDataMapId);
	var vcTargetDataMap = app.lookup(psTargetDataMapId);
	return vcDataMap.copyToDataMap(vcTargetDataMap);
};

/**
 * Column을 추가합니다.<br>
 * Header정보에 추가되며, data가 있는 경우 row data에도 해당 column data가 추가됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {String} psColumnNm 추가하려는 Header 명
 * @param {String} psValue? 초기값 설정
 * @return {Boolean} 컬럼 추가 성공 여부
 */
DataMapKit.prototype.addColumn = function(app, psDataMapId, psColumnNm, psValue){
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.addColumn(new cpr.data.header.DataHeader(psColumnNm, "string"), psValue);
};

/**
 * Column을 삭제합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#datamap} psDataMapId 데이터맵 ID
 * @param {#column} psColumnName 삭제할 컬럼 명
 * @return {Boolean} 컬럼 삭제 성공 여부
 */
DataMapKit.prototype.deleteColumn = function(app, psDataMapId, psColumnName){
	var vcDataMap = app.lookup(psDataMapId);
	return vcDataMap.deleteColumn(psColumnName);
};

/**
 * 데이터맵이 비어있는지 체크합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#datamap} psDataMapId
 */
DataMapKit.prototype.isEmpty = function(app, psDataMapId){
	/** @type cpr.data.DataMap **/
	var dm = app.lookup(psDataMapId)

	return dm && dm.getColumnNames().every(function(col){
		return !dm.getString(col)
	})
}

/**
 * @desc 데이터맵을 동적으로 생성합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psDataMapId       생성할 데이터셋 아이디
 * @param {Object} poColumnInfo      컬럼정보 ex) {column1 : "string"} : 컬럼명 : 타입
 * @return {cpr.data.DataMap} 생성된 데이터맵
 */
DataMapKit.prototype.makeDataMap = function(app, psDataSetId, poColumnInfo){
	
	if(!psDataSetId || !poColumnInfo) return;
	
	var tmpDm = new cpr.data.DataMap(psDataSetId);
	var that = this;
	app.register(tmpDm);
	
	Object.keys(poColumnInfo).forEach(function(each){
		var columnNm = each;
		var type = poColumnInfo.each;

		that.addColumn(app, psDataSetId, columnNm, null, type)
	});

	return tmpDm;	
}


/**
 * 데이터셋 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function DataSetKit(appKit){
	this._appKit = appKit;
};

/**
 * 데이터셋 또는 데이터맵에 컬럼(Column)을 추가합니다.<br>
 * Header정보 추가되며, data가 있는 경우 row data에도 해당 column data가 추가됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psColumnNm 추가하려는 컬럼명
 * @param {Object} psValue? 초기값 설정
 * @param {"string" | "number" | "decimal" | "expression"} psColumnType? 컬럼유형
 * @return {Boolean} 컬럼 추가 성공 여부
 */
DataSetKit.prototype.addColumn = function(app, psDataSetId, psColumnNm, psValue, psColumnType){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	var columnType = !ValueUtil.isNull(psColumnType) ? psColumnType.toLowerCase() : "string";
	return dataset.addColumn(new cpr.data.header.DataHeader(psColumnNm, columnType), psValue);
};

/**
 * 데이터셋 특정 값을 가져오는 함수 입니다.
 * <pre><code>
 * util.DataSet.getCondValue(app, "dsLttmRcd", "CD == '" + vsNewVal + "'", "CD_USG_01");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psCondition 특정 값을 가져올 조건
 * @param {#column} psColumnName 가져오려는 값의 컬럼명
 */
DataSetKit.prototype.getCondValue = function(app, psDataSetId, psCondition, psColumnName){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	var voRow = dataset.findFirstRow(psCondition);
	return voRow != null ? voRow.getValue(psColumnName) : "";
};

/**
 * 데이터셋 특정 값을 가져오는 함수 입니다.
 * <pre><code>
 * util.DataSet.getValue(app, "dsLttmRcd", 1, "CD_USG_01");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {Number} pnRowIndex 값을 가져올 row의 row index
 * @param {#column} psColumnName 가져오려는 값의 컬럼명
 */
DataSetKit.prototype.getValue = function(app, psDataSetId, pnRowIndex, psColumnName){
	/** @type cpr.data.DataSet */
	var dataset = app.lookup(psDataSetId);
	
	return dataset.getValue(pnRowIndex, psColumnName)
};


/**
 * 입력 받은 rowIndex와 columnName에 해당되는 데이터를 수정합니다.<br>
 * <br>
 * 1. 상태변경<br>
 * 해당 columnName에 해당되는 Column이 DisplayColumn이 아니고 Row상태가 UNCHANGED 상태인 경우<br>
 * Row 상태가 UPDATED로 바뀝니다.(UNCHANGED -> UPDATED)<br>
 * DELEDED상태이거나 INSERTED상태인 row는 수정할 수 없습니다.<br>
 * 2. 이벤트<br>
 * 수정이 된 경우 <b>UPDATED 이벤트가 발생합니다.</b>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {Number} pnRowIndex 수정할 row의 row index
 * @param {#column} psColumnName 수정할 column의 columnName
 * @param {Object} psValue 수정할 value 값
 * @return {Boolean} 값 수정 성공 여부
 */
DataSetKit.prototype.setValue = function(app, psDataSetId, pnRowIndex, psColumnName, psValue){
	/** @type cpr.data.DataSet */
	var vcDataSet =  app.lookup(psDataSetId);
	return vcDataSet.setValue(pnRowIndex, psColumnName, psValue);
};

/**
 * 모든 데이터셋 정보를 제거합니다.<br>
 * data, sort, filter가 제거됩니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 */
DataSetKit.prototype.clear = function(app, psDataSetId) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	vcDataSet.clear();
}

/**
 * 지정한 범위 내의 row들 중 조건에 맞는 모든 Row 객체의 배열을 반환<br>
 * 또는 지정한 범위 내의 row들 중 조건에 맞는 첫번째 Row 객체를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {Boolean} pbAllStatus?
 *                             true : 조건에 맞는 모든 row 리턴<br>
 *                             default : 조건에 맞는 첫번째 row 리턴
 * @param {Number} pnStartIdx? Number  범위지정 시작 row index
 * @param {Number} pnEndIdx? Number  범위지정 끝 row index
 * @retrun 데이터 로우
 */
DataSetKit.prototype.findRow = function(app, psDataSetId, psCondition, pbAllStatus, pnStartIdx, pnEndIdx) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);

	if(pbAllStatus){
		return vcDataSet.findAllRow(psCondition, pnStartIdx, pnEndIdx);
	}else{
		return vcDataSet.findFirstRow(psCondition, pnStartIdx, pnEndIdx);
	}
};

/**
 * 지정한 범위 내의 row들 중 조건에 맞는 첫번째 Row 객체에 해당하는 컬럼의 value를 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {#column} psColumnName 컬럼명
 * @param {Number} pnStartIdx?  범위지정 시작 row index
 * @param {Number} pnEndIdx?   범위지정 끝 row index
 * @retrun 데이터 로우
 */
DataSetKit.prototype.getFindRowValue = function(app, psDataSetId, psCondition, psColumnName, pnStartIdx, pnEndIdx) {
	var voRow = this.findRow(app, psDataSetId, psCondition, false, pnStartIdx, pnEndIdx);
	if(voRow != null){
		return voRow.getValue(psColumnName);
	}else{
		return null;
	}
};

/**
 * 현재 Row 수를 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId 데이터셋 ID
 * @retrun {Number} 로우 갯수
 */
DataSetKit.prototype.getRowCount = function(app, psDataSetId) {
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	return vcDataSet.getRowCount();
};

/**
 * 현재 데이터셋의 데이터를 타겟 데이터셋으로 복사합니다.<br>
 * 타겟 데이터셋의 존재하는 컬럼의 데이터만 복사됩니다.<br>
 * 복사시 추가되는 데이터는 INSERT 상태입니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psSourceDataSetId DataSet ID
 * @param {#dataset} psTargetDataSetId 복사 데이터가 들어갈 타겟 DataSet ID
 * @param {String} psFilterCondition? 복사시 필터링할 조건 (생략시 전체 복사, target의 기존 데이터는 삭제됨)<br>
 * 				   "STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'" (동일한 로우가 있을경우 복사안함)
 * @return {Boolean}
 */
DataSetKit.prototype.copyToDataSet = function(app, psSourceDataSetId, psTargetDataSetId, psFilterCondition){
	var vcSourceDataSet = app.lookup(psSourceDataSetId);
	var vcTargetDataSet = app.lookup(psTargetDataSetId);
	if(!psFilterCondition) vcTargetDataSet.clear();
	else{
		var vaFindRow = vcTargetDataSet.findAllRow(psFilterCondition);
		if(vaFindRow != null && vaFindRow.length > 0){
			return;
		}
	}
	return vcSourceDataSet.copyToDataSet(vcTargetDataSet, psFilterCondition);
};

/**
 * rowData를 입력받아 원하는 특정 row index의 앞이나 뒤에 신규 row를 추가합니다.<br>
 * <b>INSERTED 이벤트가 발생합니다.</b>
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psDataSetId DataSet ID
 * @param {Number} pnIndex index 삽입하고자 하는 row index
 * @param {Boolean} pbAfter 해당 row index의 뒤에 삽입할지 여부 (true:뒤 / false:앞)
 * @param {cpr.data.RowConfigInfo} poRowData 추가할 row data (key: header명, value: value 를 갖는 json data)<br>
{[columnName: string]: string | number | boolean}
*  @return {cpr.data.Row} 추가한 신규 Row 객체
 */
DataSetKit.prototype.insertRow = function(app, psDataSetId, pnIndex, pbAfter, poRowData){
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	if(poRowData == null){
		return vcDataSet.insertRow(pnIndex, pbAfter);
	}else{
		return vcDataSet.insertRowData(pnIndex, pbAfter, poRowData);
	}

};

/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {String} psGridId
 * @param {cpr.events.CSelectionEvent} evt
 * @param {String} paDataSetId
 * @param {any} pfConfirmCallback
 */
DataSetKit.prototype.isModifyForRowBeforeChangEvent = function(app, psGridId, evt, paDataSetId, pfConfirmCallback){
	
	//데이터셋에 row가 추가되면 신규(insert이벤트)와 selection-change가 같이 발생하기때문에 신규행일경우 체크하지 않음?
	if(app.lookup(psGridId).dataSet && app.lookup(psGridId).dataSet.getRowState(evt.newSelection[0]) === cpr.data.tabledata.RowState.INSERTED) return;
	var SelectStrategy = {
		"grid" : {
			select : function(/* cpr.controls.Grid */ ctrl, idx){
				if(ctrl && !ValueUtil.isNull(idx)) ctrl.selectRows(idx);			
			},
			getIndex : function(selection){
				return selection[0]
			}
		},
		"tree" : {
			select : function(/* cpr.controls.Tree */ ctrl, idx){
				ctrl.selectItem(idx);
				ctrl.redraw();
			},
			getIndex : function(selection){
				return selection[0]
			}
		},
		"tabfolder" : {
			select : function(/* cpr.controls.TabFolder */ tab, idx){
				if(tab && !ValueUtil.isNull(idx)){
					tab.setSelectedTabItem(tab.getTabItemByID(idx));
				}
			},
			getIndex : function(selection){
				return selection.id;
			}
		}
	}
	
	/** @type cpr.data.DataSet[] */
	var targetDs = [];
	
	if(!(app.lookup(psGridId) instanceof cpr.controls.TabFolder)) targetDs.push(app.lookup(psGridId).dataSet.id);
	
	if(!(paDataSetId instanceof Array)){
     	paDataSetId = [paDataSetId];
    }
    targetDs = targetDs.concat(paDataSetId)
	
	var isModify = this.isModify(app, targetDs);
    if(isModify){
    	this._appKit.Msg.confirmDialog(app, "CRM-M003", null, function(e){
    		var ctrl = app.lookup(psGridId);
    		var idxRetouchCnt = 0;
    		var insertedRowIdxs = [];
    		var strategy = SelectStrategy[ctrl.type];
    		
			if(e.control.returnValue.closeState === "confirm"){
				
				if(pfConfirmCallback && typeof pfConfirmCallback === "function"){
					pfConfirmCallback();
				}

				targetDs.forEach(function(dsId){
					/** @type cpr.data.DataSet */
					var ds = app.lookup(dsId)
					
					if(ctrl.type !== "tabfolder" && ds.id === ctrl.dataSet.id){
						insertedRowIdxs = ds.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED);
						insertedRowIdxs = insertedRowIdxs.concat(ds.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTDELETED));
					}
					ds.revert();
				});
				insertedRowIdxs.forEach(function(each){
					if(evt.newSelection[0] > each){
						idxRetouchCnt++;
					}
				});
				
				
				strategy.select(ctrl, strategy.getIndex(evt.newSelection) - idxRetouchCnt);
			}
			else{
				strategy.select(ctrl, strategy.getIndex(evt.oldSelection));
			}
		})
    }
    
    return !(isModify);
}

/**
 * 신규시 데이터 변경사항 체크
 * @param {cpr.core.AppInstance} app
 * @param {#grid} psGridId
 * @param {#dataset} psGridId
 * @param {Function} pfCallback
 */
DataSetKit.prototype.isModifyForInsertRow = function(app, psGridId, paDataSetId, pfCallback) {
	if(!app || !psGridId) return;
	if(!app || !paDataSetId) return;
	
	if(!(paDataSetId instanceof Array)){
     	paDataSetId = [paDataSetId];
    }
	
	/** @type cpr.controls.Grid **/
	var grid = app.lookup(psGridId);
	var selectedRow = grid.getSelectedRow() === null? 0 : grid.getSelectedRow().getIndex();
	paDataSetId.push(grid.dataSet.id);
	
	if (this.isModify(app, paDataSetId)) {
		this._appKit.Msg.confirmDialog(app, "CRM-M003", null, function(e) {
			if (e.control.returnValue.closeState === "confirm") {
				
				var mainGridModify = grid.dataSet.isModified();
				
				if(mainGridModify){
					selectedRow--;
				}
				grid.selectRows(selectedRow, false)
				
				paDataSetId.forEach(function(each){
					app.lookup(each).revert();
				});
				pfCallback(selectedRow);
				//grid.dataSet.revert();
				

			}
		});
	}
	else pfCallback(selectedRow);
}

/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {Array} paDataSetId
 * @param {Function} pfConfirmCallback
 * @param {cpr.data.DataMap} searchDm
 * @param {cpr.events.CDataEvent} evt
 */
DataSetKit.prototype.isModifyForSearchBox = function(app, paDataSetId, pfConfirmCallback, searchDm, evt){
	if(!app || !paDataSetId) return;

	if(!(paDataSetId instanceof Array)){
     	paDataSetId = [paDataSetId];
    }
	var that = this;
    var isModify = this.isModify(app, paDataSetId);
    //그리드 타이틀 영역의 데이터 건수 0건으로 초기화
	var titles = that._appKit.Group.getAllChildrenByType(app, "udc.sys.gridFunction");
	for(var i=0, len=titles.length; i<len; i++){
		titles[i].setAppProperty("rowCount", 0);
	}
    if(isModify){
    	this._appKit.Msg.confirmDialog(app, "CRM-M003", null, function(e){
    		if(e.control.returnValue.closeState === "confirm"){
    			paDataSetId.forEach(function(each){
					app.lookup(each).revert();
				});
				
				if(searchDm && evt){
					searchDm.setValue(evt.columnName, evt.currentValue);
				}
				pfConfirmCallback();
				app.getContainer().redraw();
    		}
    		else{
    			
    		}
    	})
    }
    else pfConfirmCallback();
    
    
    return !isModify;
}
/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {cpr.events.CUIEvent} evt
 * @param {Function} pfConfirmCallback
 */
DataSetKit.prototype.isAppModifyForTabClose = function(app, evt, pfConfirmCallback){
	
	
	/** @type {cpr.data.DataSet[]} **/
	var allDataControl = this._appKit.Control.getAllDataControl(app).filter(function(each){
		return each instanceof cpr.data.DataSet;
	});
	var isModify = false;
	
	isModify = allDataControl.some(function(each){
		if(each.isModified()) return true;
	});

	if(isModify){
		this._appKit.Msg.confirmDialog(app, "CRM-M003", null, function(e){
    		if(e.control.returnValue.closeState === "confirm"){
    			allDataControl.forEach(function(each){
					each.revert();
				});
				
				if(evt){
					/** @type {cpr.controls.MDIFolder} **/
					var mdi = evt.control;
					/** @type {cpr.controls.TabItem} **/
					var willCloseTabItem = evt.content;
					
					var items = mdi.getTabItems();

					var nextIdx = items.findIndex(function(each){
						return each.id === willCloseTabItem.id
					})-1;
					var nextTabItem = mdi.getTabItemByID(items[nextIdx].id)
					mdi.close(willCloseTabItem);
				}
				pfConfirmCallback(nextTabItem);
    		}
    	})
	}
	else{
		pfConfirmCallback()
	}
	return !isModify
}

/**
 * @desc 데이터셋에 수정유무를 반환합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app
 * @param {#dataset | #dataset[]} paDataSetId
 * @param {"I" | "U" | "D"} psState?
 * @return {Boolean} 수정유무
 */
DataSetKit.prototype.isModify = function(app, paDataSetId, psState){
	 if(!(paDataSetId instanceof Array)){
     	paDataSetId = [paDataSetId];
     }
	
    return paDataSetId.some(function(each){
     	/**
     	 * @type cpr.data.DataSet
     	 */
     	var ds = app.lookup(each);
     	if(!psState && ds.isModified()){
     		return true;
     	}
     	else if(psState === "I" && ds.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED).length > 0){
     		return true;
     	}
     	else if(psState === "U" && ds.getRowStatedIndices(cpr.data.tabledata.RowState.UPDATED).length > 0){
     		return true;
     	}
     	else if(psState === "D" && ds.getRowStatedIndices(cpr.data.tabledata.RowState.DELETED).length > 0){
     		return true;
     	}
     })
}



/**
 * 특정 row index의 데이터만 원복시킵니다<br>
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psDataSetId DataSet ID
 * @param {Number} pnIndex index 삽입하고자 하는 row index
*  @return {cpr.data.Row} 추가한 신규 Row 객체
 */
DataSetKit.prototype.revertRow = function(app, psDataSetId, pnIndex){
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	vcDataSet.revertRow(pnIndex);
};


/**
 * 특정 Row의 상태 값을 string 타입으로 반환합니다. <br>
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psDataSetId DataSet ID
 * @param {Number} pnIndex index  row index
*  @return {String} Row을 찾을 수 없을 경우 null을 반환하고 그렇지 않은 경우 아래 값 중 하나를 반환합니다.
				       변경되지 않은 상태 : "UC", "UNCHANGED"
				    신규 상태 : "I", "INSERTED"
				     수정 상태 : "U", "UPDATED"
				     삭제 상태 : "D" , "DELETED"
				    추가되었다가 삭제된 상태 : "ID", "INSERTDELETED"
 */
DataSetKit.prototype.getRowStateString = function(app, psDataSetId, pnIndex){
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	return vcDataSet.getRowStateString(pnIndex);
};


/**
 * row index를 입력받아 해당 row를 제거합니다.
 *  DELETED 이벤트가 발생합니다.  <br>
 * @param {cpr.core.AppInstance} app 앱인스턴스 
 * @param {#dataset} psDataSetId DataSet ID
 * @param {Number} pnIndex index  삭제하고자하는 row index
*  @return {Boolean} 삭제 성공 여부
 */
DataSetKit.prototype.deleteRow = function(app, psDataSetId, pnIndex){
	/** @type cpr.data.DataSet */
	var vcDataSet = app.lookup(psDataSetId);
	return vcDataSet.deleteRow(pnIndex);
};

/**
 * @desc 데이터셋에서 삭제상태인 행을찾아 리스트에서 삭제합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDataSetId
 * @return {cpr.data.DataSet} 
 */
DataSetKit.prototype.removeRows = function(app, psDataSetId){
	
	if(!app || !psDataSetId || !(app.lookup(psDataSetId) instanceof cpr.data.DataSet)) return;
	/** 
	 * @type cpr.data.DataSet
	 */
	var targetDs = app.lookup(psDataSetId);

	for(var i = 0; i < targetDs.getRowCount(); i++){
		var row = targetDs.getRow(i);
		if(row.getState() === cpr.data.tabledata.RowState.DELETED){
			targetDs.realDeleteRow(row.getIndex());
			i--;
		}
	}
	
	return targetDs;
}

/**
 * @desc 데이터셋에 중복된 데이터가 있는지 체크합니다. (pk로 사용할 컬럼을 DataSet의 info에 ","로 구분지어 기술해야한다.)
 * @author kjh
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDataSetId
 * @return {Boolean} 중복 데이터 존재 유무
 */
DataSetKit.prototype.dupExistCheck = function(app, psDataSetId){
	if(!app || !psDataSetId || !(app.lookup(psDataSetId) instanceof cpr.data.DataSet)) return null;
	
	/**
	 * @type cpr.data.DataSet
	 */
	var targetDs = app.lookup(psDataSetId);
	
	if(ValueUtil.isNull(targetDs.info)) return false;
	
	var pkCols = ValueUtil.split(targetDs.info, ",");
	var pkValues = [];

	targetDs.forEachOfUnfilteredRows(function(row){
		var pkValue = ""
		pkCols.forEach(function(col){
			pkValue += row.getString(col);
		});
		
		pkValues.push(pkValue);
	});
	
	return pkValues.some(function(each){
		return pkValues.indexOf(each) !== pkValues.lastIndexOf(each);
	});
}

/**
 * @desc 데이터셋이 비어있는지 유무를 리턴합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app
 * @param {#dataset} psDataSetId
 * @return {Boolean} 비어있는지 유무
 */
DataSetKit.prototype.isEmpty = function(app, psDataSetId){
	/**
	 * @type cpr.data.DataSet
	 */
	var ds = app.lookup(psDataSetId);
	
	if(!ds || !(ds instanceof cpr.data.DataSet)) return;
	return ds.getRowCount() == 0
}

/**
 * @desc 조건에 맞는 행들을 찾아 특정컬럼의 합계를 반환합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId     데이터셋 아이디
 * @param {String} psCondition       검색조건
 * @param {#column} psColumn         합계를 구할 컬럼명(Number타입이어야함)
 * @param {Number} pnStartIndex?     검색시작 row Index
 * @param {Number} pnLastIndex?      검색마지막 row Index 
 * @return {Number} 합계
 */
DataSetKit.prototype.getCaseSum = function(app, psDataSetId, psCondition, psColumn, pnStartIndex, pnLastIndex){
	/**
	 * @type cpr.data.DataSet
	 */
	var targetDataSet = app.lookup(psDataSetId);
	if(!targetDataSet || !(targetDataSet instanceof cpr.data.DataSet) || !psColumn) return 0;
	
	var rows = targetDataSet.findAllRow(psCondition, pnStartIndex, pnLastIndex);
	
	return rows.reduce(function(acc, cur){
		if(!ValueUtil.isNumber(acc)){
			acc = acc.getNumber(psColumn)
		}
		return acc + cur.getNumber(psColumn) || 0;
	}, 0);
}

/**
 * @desc 조건에 맞는 행들을 찾아 특정컬럼의 평균을 반환합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId     데이터셋 아이디
 * @param {String} psCondition       검색조건
 * @param {#column} psColumn         평균을 구할 컬럼명(Number타입이어야함)
 * @param {Number} pnStartIndex?     검색시작 row Index
 * @param {Number} pnLastIndex?      검색마지막 row Index 
 * @return {Number} 평균값
 */
DataSetKit.prototype.getCaseAvg = function(app, psDataSetId, psCondition, psColumn, pnStartIndex, pnLastIndex){
	/**
	 * @type cpr.data.DataSet
	 */
	var targetDataSet = app.lookup(psDataSetId);
	if(!targetDataSet || !(targetDataSet instanceof cpr.data.DataSet) || !psColumn) return 0;
	
	var rows = targetDataSet.findAllRow(psCondition, pnStartIndex, pnLastIndex);
	
	return Number(rows.reduce(function(acc, cur){
		if(!ValueUtil.isNumber(acc)){
			acc = acc.getNumber(psColumn)
		}
		return acc + cur.getNumber(psColumn) || 0;
	}, 0) / rows.length);
}

/**
 * @desc 조건에 맞는 행들을 찾아 특정컬럼의 최대값을 반환합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId     데이터셋 아이디
 * @param {String} psCondition       검색조건
 * @param {#column} psColumn         최대값을 구할 컬럼명(Number타입이어야함)
 * @param {Number} pnStartIndex      검색시작 row Index
 * @param {Number} pnLastIndex       검색마지막 row Index 
 * @return {Number} 평균값
 */
DataSetKit.prototype.getCaseMax = function(app, psDataSetId, psCondition, psColumn, pnStartIndex, pnLastIndex){
	/**
	 * @type cpr.data.DataSet
	 */
	var targetDataSet = app.lookup(psDataSetId);
	if(!targetDataSet || !(targetDataSet instanceof cpr.data.DataSet) || !psColumn) return 0;
	
	var rows = targetDataSet.findAllRow(psCondition, pnStartIndex, pnLastIndex);
	
	return rows.reduce(function(prev, cur){
		if(!ValueUtil.isNumber(prev)){
			prev = prev.getValue(psColumn)
		}
		
		return prev > cur.getValue(psColumn) ? prev : cur.getValue(psColumn)
	});
}

/**
 * @desc 조건에 맞는 행들을 찾아 특정컬럼의 최소값을 반환합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#dataset} psDataSetId     데이터셋 아이디
 * @param {String} psCondition       검색조건
 * @param {#column} psColumn         최소값을 구할 컬럼명(Number타입이어야함)
 * @param {Number} pnStartIndex      검색시작 row Index
 * @param {Number} pnLastIndex       검색마지막 row Index 
 * @return {Number} 평균값
 */
DataSetKit.prototype.getCaseMin = function(app, psDataSetId, psCondition, psColumn, pnStartIndex, pnLastIndex){
	/**
	 * @type cpr.data.DataSet
	 */
	var targetDataSet = app.lookup(psDataSetId);
	if(!targetDataSet || !(targetDataSet instanceof cpr.data.DataSet) || !psColumn) return 0;
	
	var rows = targetDataSet.findAllRow(psCondition, pnStartIndex, pnLastIndex);
	
	return rows.reduce(function(prev, cur){
		if(!ValueUtil.isNumber(prev)){
			prev = prev.getValue(psColumn)
		}
		
		return prev > cur.getValue(psColumn) ? cur.getValue(psColumn) : prev
	}, 0);
}

/**
 * @desc 데이터셋을 동적으로 생성합니다.
 * @author kjh
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psDataSetId       생성할 데이터셋 아이디
 * @param {Object} poColumnInfo      컬럼정보 ex) {column1 : "string"} : 컬럼명 : 타입
 * @return {cpr.data.DataSet} 생성된 데이터셋
 */
DataSetKit.prototype.makeDataList = function(app, psDataSetId, poColumnInfo){
	
	if(!psDataSetId || !poColumnInfo) return;
	
	var tmpDs = new cpr.data.DataSet(psDataSetId);
	var that = this;
	app.register(tmpDs);
	
	Object.keys(poColumnInfo).forEach(function(each){
		var columnNm = each;
		var type = poColumnInfo.each;

		that.addColumn(app, psDataSetId, columnNm, null, type)
	});

	return tmpDs;	
}



/**
 * Dialog 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function DialogKit(appKit){
	this._appKit = appKit;
};

/**
 * 모달(Modal) 팝업을 호출한다.
 * <pre><code>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...});<br>
 * <p>또는</p><br>
 * Dialog.open(app, "app/cmn/CMN001", 700, 500, function(dialog){...}, {key1:"value1", key2:"value2"},{left : 400, top : 200});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소
 * @param {Number} width 팝업 창의 가로 사이즈
 * @param {Number} height 팝업 창의 세로 사이즈
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function)
 * @param {Object} initValue? 초기 파라메터 key/value쌍으로 팝업창에 넘길 파라메터 JSON 데이터 [예시)-{key1:"value1", key2:"value2"}]
 * @param { {left? : Number <!--다이얼로그의 x좌표 (default : 가운데 위치) -->, top? : Number <!-- 다이얼로그의 y좌표 (default : 가운데 위치) -->,
 * headerVisible? : Boolean <!-- 다이얼로그 헤더 보이기 여부 (default : true) -->, headerMovable? : Boolean <!--다이얼로그 헤더를 통해 이동 가능 여부 (default : true)  -->,
 * headerClose? : Boolean <!--다이얼로그 헤더 close 버튼 보이기 여부 (default : true)  -->, resizable? :Boolean <!-- 다이얼로그 Rect 부분에 크기 조정 가능 여부 (default : true) -->,
 * headerMin? :Boolean <!--다이얼로그 헤더 최소화 버튼 보이기 여부 (default : false)  -->, headerMax? :Boolean <!--  다이얼로그 헤더 최대화 버튼 보이기 여부 (default : false) -->
 *   }} prop? 팝업 설정 속성
 */
DialogKit.prototype.open = function(app, appid, width, height, handler, initValue, prop) {
	if (initValue == null) {
		initValue = {};
	}
	//윈도우 최소 창크기보다 작은 경우... 윈도우 사이즈에 맞게 사이즈 조정
	var windowWidth = (window.innerWidth | document.body.clientWidth)-10;
	var windowHeight = (window.innerHeight | document.body.clientHeight)-45;
	if(windowWidth < width) width = windowWidth;
	if(windowHeight < height) height = windowHeight;

	var dialogProp = {
		width : Number(width) + 10,
		height : Number(height) + 45,
		headerVisible : (prop && prop.headerVisible != undefined) ? prop.headerVisible : true,
		headerMovable : (prop && prop.headerMovable != undefined) ? prop.headerMovable : true,
		headerClose : (prop && prop.headerClose != undefined) ? prop.headerClose : true,
		resizable : (prop && prop.resizable != undefined) ? prop.resizable : false,
		headerMin : (prop && prop.headerMin != undefined) ? prop.headerMin : false,
		headerMax : (prop && prop.headerMax != undefined) ? prop.headerMax : false
	};
	
	if(prop != null && prop.left) { dialogProp.left = prop.left; }
	if(prop != null && prop.top) { dialogProp.top = prop.top; }

	// App에서 Dialog
	app.getRootAppInstance().openDialog(appid, dialogProp, function(/* cpr.controls.Dialog */dialog) {
		dialog.app.isPopup = true;
		dialog.app.modal = true;
		dialog._originWidth = dialogProp["width"];
		dialog._originHeight = dialogProp["height"];
		
		initValue._dialogRef = dialog;
		
		if (dialog.app.title) { 
			dialog.headerTitle = dialog.app.title;
		}
		if (handler) {
			dialog.addEventListenerOnce("close", handler);
		}
		if (initValue) {
			dialog.initValue = initValue;
		}
	});
};

/**
 * 모달리스(Modaless) 팝업을 호출한다.
 * <pre><code>
 * Dialog.openModaless(app, "app/cmn/CMN001", 700, 500, function(dialog){...});<br>
 * <p>또는</p><br>
 * Dialog.openModaless(app, "app/cmn/CMN001", 700, 500, function(dialog){...}, {key1:"value1", key2:"value2"},{left : 400, top : 200});
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#app} appid 팝업 화면 주소
 * @param {Number} width 팝업 창의 가로 사이즈
 * @param {Number} height 팝업 창의 세로 사이즈
 * @param {Function} handler 팝업이 닫힐 때 콜백함수(callback function)
 * @param {Object} initValue? 초기 파라메터 key/value쌍으로 팝업창에 넘길 파라메터 JSON 데이터[예시)-{key1:"value1", key2:"value2"}]
 * @param { {left? : Number <!--다이얼로그의 x좌표 (default : 가운데 위치) -->, top? : Number <!-- 다이얼로그의 y좌표 (default : 가운데 위치) -->,
 * headerVisible? : Boolean <!-- 다이얼로그 헤더 보이기 여부 (default : true) -->, headerMovable? : Boolean <!--다이얼로그 헤더를 통해 이동 가능 여부 (default : true)  -->,
 * headerClose? : Boolean <!--다이얼로그 헤더 close 버튼 보이기 여부 (default : true)  -->, resizable? :Boolean <!-- 다이얼로그 Rect 부분에 크기 조정 가능 여부 (default : true) -->,
 * headerMin? :Boolean <!--다이얼로그 헤더 최소화 버튼 보이기 여부 (default : false)  -->, headerMax? :Boolean <!--  다이얼로그 헤더 최대화 버튼 보이기 여부 (default : false) -->
 *   }} prop? 팝업 설정 속성
 */
DialogKit.prototype.openModaless = function(app, appid, width, height, handler, initValue, prop) {
	if (initValue == null) {
		initValue = {};
	}
	
	var dialogProp = {
		width : width,
		height : height,
		modal: false,
		headerVisible : (prop && prop.headerVisible) ? prop.headerVisible : true,
		headerMovable : (prop && prop.headerMovable) ? prop.headerMovable : true,
		headerMax : (prop && prop.headerMax) ? prop.headerMax : true,
		headerClose : (prop && prop.headerClose) ? prop.headerClose : true,
		resizable : (prop && prop.resizable) ? prop.resizable : true,
		headerMin : (prop && prop.headerMin != undefined) ? prop.headerMin : false,
		headerMax : (prop && prop.headerMax != undefined) ? prop.headerMax : false
	};
	
	if(prop != null && prop.left) { dialogProp.left = prop.left; }
	if(prop != null && prop.top) { dialogProp.top = prop.top; }

	app.getRootAppInstance().openDialog(appid, dialogProp, function(/* cpr.controls.Dialog */dialog) {
		dialog.app.isPopup = true;
		dialog.app.modal = false;
		if (dialog.app.title) { 
			dialog.headerTitle = dialog.app.title;
		}
		if (handler) {
			dialog.addEventListenerOnce("close", handler);
		}
		if (initValue) {
			dialog.initValue = initValue;
		}
	});
};

/**
 * 현재 앱이 팝업인지 여부를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @return {Boolean} 
 */
DialogKit.prototype.isPopup = function(app){
	
//	var voRootDiaMng = app.getRootAppInstance().dialogManager;
//	var vaDiaLogNm = voRootDiaMng.getDialogNames();
//	var isPopup = false;
//	vaDiaLogNm.every(function(diaLogNm){
//		var voDialog = voRootDiaMng.getDialogByName(diaLogNm);
//		if(voDialog.getAppInstance().id == app.app.id){
//				isPopup = true;
//				return false;
//		}
//	})
//	return isPopup;
	return (!ValueUtil.isNull(app.getHost()) && app.app.isPopup === true) ? true : false;
};


/**
 * window open<br>
 * var voMap = new cpr.utils.ObjectMap();<br>
	voMap.put("CLX_PATH", "app/tst/tstPTaskRsltImg");<br>
	voMap.put("imgData", "imgData");<br>
	voMap.put("popUpCls", "rsltImg");<br>
	voMap.put("testImagePath", util.DataMap.getValue(app, "dmParamImg", "testImagePath"));<br>
	util.Dialog.windowOpen(app, "/TstTaskMng/index.do", "_popup", voMap);
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psActionUrl 팝업 aution URL
 * @param {#app} psPopId 팝업 ID
 * @param {cpr.utils.ObjectMap} Parameter map
 * @param {Number} width?
 * @param {Number} height?
 * @param {Number} top?
 * @param {Number} left?
 * @param {Boolean} isModal?
 * @return {Boolean} 
 */
DialogKit.prototype.windowOpen = function(app, psActionUrl, psPopId, pmParameter, width, height, top, left, isModal){

   var vnWidth     = width == null ? window.screen.availWidth : width;
   var vnHeight     = height == null ? window.screen.availHeight : height;
   var vnTop       = top == null ? (window.screen.availHeight - height) / 2 : top;
   var vnLeft      = left == null ? (window.screen.availWidth - width) / 2 : left;
   var initValue   = {}
    if (vnTop < 0)  vnTop  = 0;
    if (vnLeft < 0) vnLeft = 0;
   var vbIsModal = isModal == null ? false : isModal;
   var vsProp = "menubar=0,resizable=yes,scrollbars=yes,status=0,top="+vnTop+",left="+vnLeft+",width="+vnWidth+",height="+vnHeight;
   var openWindow = window.open("about:blank", psPopId, vsProp);
   
   var voPostMethod = new cpr.protocols.HttpPostMethod(psActionUrl, psPopId);
   
   if(pmParameter != null){
	   Object.keys(pmParameter).forEach(function(key, value){
	   		voPostMethod.addParameter(key, ValueUtil.fixNull(value));
		});	
   }
		
	voPostMethod.submit();
	voPostMethod.dispose();
   
   window._app = app;
   return openWindow;
};

/**
 * 특정 컨트롤/컨트롤 그룹을 앱화면의 상단에 플로팅으로 띄운다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtrl 플로팅으로 띄울 컨트롤ID (로드마스크일 경우 udc.com.loadmask)
 * @param {#uicontrol} psTargetCtl 특정 컨트롤 위에 플로팅 할시 컨트롤ID
 * @param {Number} x x축 포지션 위치
 * @param {Number} y y축 포지션 위치
 * @param {Number} width 컨트롤 넓이
 * @param {Number} height 컨트롤 높이
 */
DialogKit.prototype.floading = function(app, psCtrl, psTargetCtl, x, y, width, height){
	
	/**@type cpr.controls.UIControl */
	var ctrl;
	if("udc.com.loadmask" == psCtrl){
		ctrl = new udc.com.loadmask("udc.com.loadmask");
	}else{
		ctrl = app.lookup(psCtrl);	
	}
	if(ctrl == null) return false;
	if(ctrl.visible === false){
		ctrl.visible = true;
	}
	
	
	var showConstraint = {	};
	var container = app.getContainer();
	if(psTargetCtl != null){
		var ctrlTarget = app.lookup(psTargetCtl);
		showConstraint = ctrlTarget.getActualRect();
	}else{
		showConstraint = {
			"position" : "absolute",
			"width" : width+"px",
			"height" : height+"px"
		};
	
		if(this.isPopup(app)){
			if(((y+height) - container.getActualRect().top) > container.getActualRect().height )
				showConstraint.top = (y - (container.getActualRect().top + height)) +"px";
			else
				showConstraint.top = (y - container.getActualRect().top) +"px";
			
			showConstraint.left = (x - (container.getActualRect().left + width)) + "px";
		}else{
			showConstraint.top = (y - 90) + "px";
			if(x < width){
				showConstraint.left = "0px";
			}else{
				showConstraint.left = (x - width - 230) + "px";
			}
		}
	}
	
	//floating하기 전에 해당 컨트롤의 부모객체 정보를 저장함
	var map = app.__floatingMap ? app.__floatingMap : new cpr.utils.ObjectMap();
	map.put(ctrl.id, ctrl.getParent());
	if(app.__floatingMap == null || app.__floatingMap == undefined){
		app.__floatingMap = map;
	}
	
	var layout = container.getLayout();
	if(layout instanceof cpr.controls.layouts.FormLayout
		|| layout instanceof cpr.controls.layouts.VerticalLayout){
		app.floatControl(ctrl, showConstraint);
	}else{
		container.addChild(ctrl, showConstraint);
	}
};

/**
 * 앱화면의 상단에 플로팅으로 띄워진 컨트롤/컨트롤그룹을 제거한다.
 * @param @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol} psCtrl 플로팅으로 띄워진 컨트롤ID
 */
DialogKit.prototype.removefloading = function(app, psCtrl){
	var ctrl = app.lookup(psCtrl);
	if(ctrl == null) return false;
	
	var container = app.getContainer();
	var layout = container.getLayout();
	if(layout instanceof cpr.controls.layouts.FormLayout
		|| layout instanceof cpr.controls.layouts.VerticalLayout){
		app.removeFloatingControl(ctrl);
	}else{
		container.removeChild(ctrl);
	}
	
	if(app.__floatingMap){
		var parent = app.__floatingMap.get(ctrl.id);
		if(ctrl.visible != false){
			ctrl.visible = false;
		}
		parent.addChild(ctrl);
		app.__floatingMap.remove(ctrl.id)
	}
};



/**
 * Embeded앱 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function EmbeddedAppKit(appKit){
	this._appKit = appKit;
};

/**
 * Embeded 앱내의 함수를 호출한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 * @param {String} psFuncName 호출 함수명
 * @param {String | Array} paArgs 함수에 전달할 아규먼트 
 * @return {any} method 내 파라미터
 */
EmbeddedAppKit.prototype.callAppMethod = function(app, psEmbeddedappId, psFuncName, paArgs){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	var value = null;
	if(emb){
		emb.ready(function(e){
			if(!e.hasAppMethod(psFuncName)){
				alert("The embeded page not have "+psFuncName+" function! (script error)");
				return null;
			}
			value = e.callAppMethod(psFuncName, paArgs);
		});
	}
	return value;
};

/**
 * 임베디드 앱을 포함하고 있는 Host앱의 특정 함수를 호출한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psFuncName 호출 함수명
 * @param {String | Array} paArgs? 함수에 전달할 아규먼트 
 * @return {any} 반환값
 */
EmbeddedAppKit.prototype.callHostAppMethod = function(app, psFuncName, paArgs){
	/** @type cpr.core.AppInstance */
	var hostApp = app.getHostAppInstance();
	if(hostApp && hostApp.hasAppMethod(psFuncName)){
		return hostApp.callAppMethod(psFuncName, paArgs);
	}
	return null;
};

/**
 * 해당 임베디드 앱에 연결된 페이지의 앱 APP가 존재하는지 여부를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 * @return {Boolean} 임베디드 앱 유/무 반환
 */
EmbeddedAppKit.prototype.hasPage = function(app, psEmbeddedappId){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	return (emb && emb.app) ? true : false;
};

/**
 * Embeded 앱에 호출할 화면을 설정한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 * @param {#app} psAppId 호출할 화면 앱ID
 * @param {any} poInitValue? 초기 파라메터
 */
EmbeddedAppKit.prototype.setPage = function(app, psEmbeddedappId, psAppId, poInitValue){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	return new Promise(function(resolve, reject) {
		if(emb){
			cpr.core.App.load(psAppId, function(loadedApp){
			   if(loadedApp){
			   	 /*로그된 앱을 임베디드 앱에 설정*/
			      emb.app = loadedApp;
			      emb.ready(function(e){
			      	/*통신전달값*/
			      	emb.initValue = poInitValue;
			      	resolve(emb);
			      });
			   }
			});
		}else{
			throw new cpr.exceptions.IllegalArgumentException("not found embedded app");
		}
	});
};

/**
 * 임베디드 컨트롤에 포함되어있는 앱객체들을 제거합니다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#embeddedapp} psEmbeddedappId 임베디드 앱 ID
 */
EmbeddedAppKit.prototype.dispose = function(app, psEmbeddedappId){
	/** @type cpr.controls.EmbeddedApp */
	var emb = app.lookup(psEmbeddedappId);
	if(emb && emb.getEmbeddedAppInstance()){
		emb.getEmbeddedAppInstance().dispose();
	}
};



/**
 * FreeForm컨트롤 유틸<br>
 * - 일반적으로 그리드가 바인딩되었거나 데이터셋을 사용하는 폼레이아웃 컨트롤에 적용<br>
 * - 그리드 + 상세(폼레이아웃) 화면에서 주로 사용 <br>
 * - 바인드컨텍스트가 지정된 그리드 및 트리컨트롤의 데이터셋 제어 
 * @constructor
 * @param {common.AppKit} appKit
 */
function FreeFormKit(appKit){
	this._appKit = appKit;
};

/**
 * 입력용 폼레이아웃 컨트롤들에 대해 초기화 로직을 수행한다.<br>
 *  폼레이아웃의 class는 form-box 지정 필수<br>
 * 1. 데이터 여부에 따른 비활성화 처리 (load, filter 이벤트)<br>
 *     (데이터가 없으면 입력 안됨 처리)<br>
 * 2. appHeader에서 폼레이아웃의 class가 form-box일 경우 초기화 지정<br>
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container | Array} paFreeFormId 프리폼 ID 또는 ID배열
 */
FreeFormKit.prototype.init = function(app, paFreeFormId) {
	if(!(paFreeFormId instanceof Array)){
		paFreeFormId = [paFreeFormId];
	}
	var vcForm = null, voBindContext = null, voDs = null;
	var voMap = new cpr.utils.ObjectMap();
	var voBindMap = new cpr.utils.ObjectMap();
	for(var i=0, len=paFreeFormId.length; i<len; i++){
		/**@type cpr.controls.Container */
		vcForm = app.lookup(paFreeFormId[i]);
		if(vcForm == null) continue;
		
		voBindContext = this._appKit.Group.getBindContext(app, vcForm);
		if(voBindContext){
			voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
			vcForm._originEnabled = vcForm.enabled;
			if(vcForm.getBindInfo("enabled") != null){
				vcForm._expressEnabled = vcForm.getBindInfo("enabled").expression;
			}
			if(voDs._freeforms){
				voDs._freeforms.push(vcForm.id);
			}else{
				voDs._freeforms = [vcForm.id];
			}	
		}
		
		var childCtrls = vcForm.getAllRecursiveChildren();
		childCtrls.forEach(function(ctrl){
			if(ctrl.type == "numbereditor"){
				if(ctrl.spinButton != false && ctrl.style.css("text-align") == ""){
					ctrl.style.css({"text-align":"center"});
				}
				if((ctrl.format === "0000" || ctrl.format === "9999") && ctrl.max == 0){
					ctrl.max = 1.7976931348623157E308;
				}
			}
		});
		
		if(voDs){
			if(voMap.get(voDs.id) == null){
				voMap.put(voDs.id, voDs);
			}
			
			if(voBindContext.grid == null && voBindMap.get(voDs.id) == null){
				voBindMap.put(voDs.id, voDs);
				voDs.stateRestore = true; //현재값과 Origin이 같으면... 변경없도록 처리
			}
		}
	}
	
	var _app = app, _appKit = this._appKit;
	voMap.keys().forEach(function(key){
		voMap.get(key).addEventListener("load", function(/* cpr.events.CDataEvent */e){
			var dataset = e.control;
			var freeforms = dataset._freeforms;
			freeforms.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var form = _app.lookup(formId);
				//데이터가 없으면... 프리폼 비활성화
				if(dataset.getRowCount() < 1) {
					if(form._expressEnabled){
						form.unbind("enabled");
					}
					form.enabled = false;
				}else{
					//데이터가 있으면  프리폼 활성화
					if(form._originEnabled !== false){
						if(form._expressEnabled){
							form.bind("enabled").toExpression(form._expressEnabled);
						}else{
							form.enabled = true;
						}
					}
				}
			});
		});
		
		voMap.get(key).addEventListener("filter", function(/* cpr.events.CDataEvent */e){
			var dataset = e.control;
			var freeforms = dataset._freeforms;
			freeforms.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var form = _app.lookup(formId);
				//데이터가 없으면... 프리폼 비활성화
				if(dataset.getRowCount() < 1) {
					if(form._expressEnabled){
						form.unbind("enabled");
					}
					form.enabled = false;
				}else{
					//데이터가 있으면 있고, 조회권한이 아니고... 프리폼 활성화
					if(form._originEnabled !== false){
						if(form._expressEnabled){
							form.bind("enabled").toExpression(form._expressEnabled);
						}else{
							form.enabled = true;
						}
					}
				}
			});
		});
	});
};


/**
 * 프리폼(폼레이아웃)에 신규 행(Row)을 추가한다.<br>
 * 바인드컨텍스트로 연결된 트리 및 그리드 컨트롤의 insertrow 수행<br>
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId 프리폼 ID
 * @param {#column} psEditCol 신규 이후 포커스 COLUMN명
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index<br>
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체
 */
FreeFormKit.prototype.insertRow = function(app, psFreeFormId, psEditCol, pnRowIdx, poRowData) {
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var vcGrid = voBindContext.grid;
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	/**@type cpr.controls.Tree */
	var vcTree = app.lookup(voDs._treeId);
	var rowIndex = -1;
	if(!ValueUtil.isNull(pnRowIdx)){
		rowIndex = pnRowIdx;
	}else{
		if(vcTree){
			rowIndex = vcTree.getIndex(vcTree.getSelectionFirst());
		}else{
			rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
		}
	}
	
	// InsertRow
	var insertedRow = null;
	if(poRowData != null){
		insertedRow = voDs.insertRowData(rowIndex, true, poRowData);
	}else{
		if(vcTree){
			// 트리
			var vsSelVal = ValueUtil.fixNull(vcTree.value);
			
			var voRow = {};
			voRow[vcTree.itemSetConfig.label] = "";
			voRow[vcTree.itemSetConfig.value] = "";
			voRow[vcTree.itemSetConfig.parentValue] = vsSelVal;
			
			insertedRow = voDs.insertRowData(rowIndex, true, voRow);
			if(vsSelVal != ""){
				var voItem = vcTree.getItemByValue(vsSelVal);
				vcTree.expandItem(voItem);
			}
		}else{
			insertedRow = voDs.insertRow(rowIndex, true);
		}
	}
	
	// SelectRow
	if(vcTree){
		// 트리
		vcTree.selectItemByValue("DEFAULT", true);
		vcTree.focusItem(vcTree.getItem(insertedRow.getIndex()));
	}else if(vcGrid){
		// 그리드
//		vcGrid.selectRows(-1, false);
		vcGrid.clearSelection();
		vcGrid.selectRows(insertedRow.getIndex(), true);
	}else{
		// 프리폼
		vcForm.redraw();
	}
	if(vcForm._expressEnabled){
		vcForm.bind("enabled").toExpression(vcForm._expressEnabled);
	}else{
		vcForm.enabled = true;
	}
	
	// Focus
	if(psEditCol){
		var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psEditCol);
		if(vcCtrl) vcCtrl.focus();
	}
	
	return insertedRow;
};

/**
 * 프리폼(폼레이아웃)에 행(Row)을 삭제한다.<br>
 * 바인드컨텍스트로 연결된 트리 및 그리드 컨트롤의 delete로직 수행<br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId 프리폼 ID
 * @param {String} psAftMsg? 메시지 유형(CRM)
 * @return void
 */
FreeFormKit.prototype.deleteRow = function(app, psFreeFormId, psAftMsg) {
	var _this = this;
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	/** @type cpr.bind.BindContext */
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var vcGrid = voBindContext.grid;
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(voDs._treeId);
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	if(voDs == null || voDs.getRowCount() < 1){
		//삭제할 데이터가 없습니다.
		this._appKit.Msg.alert("INF-M007");
	}else{
		if(!ValueUtil.isNull(psAftMsg)){
			//삭제하시겠습니까?
			if(this._appKit.Msg.confirm("CRM-M002")){
				if(voDs.getRowState(rowIndex) == cpr.data.tabledata.RowState.INSERTED){
					voDs.revertRow(rowIndex);
					vcForm.redraw();
					if(vcGrid){
						vcGrid.redraw();
						//가장 마지막 행에서 신규 행 추가 후, 삭제할 경우에 가장 마지막 행을 선택해줌
						if(voDs.getRowCount() -1 < rowIndex){
							vcGrid.selectRows([rowIndex-1]);
						}
					} 
					if(vcTree) vcTree.redraw();
					//데이터 건수가 없으면... 프리폼 비활성화
					if(voDs.getRowCount() < 1) {
						vcForm.enabled = false;
					}
					return false;
				}else{
					voDs.setRowState(rowIndex, cpr.data.tabledata.RowState.DELETED);
					return true;
				}
			}
		}else{
			if(voDs.getRowState(rowIndex) == cpr.data.tabledata.RowState.INSERTED){
				voDs.revertRow(rowIndex);
			}else{
				voDs.setRowState(rowIndex, cpr.data.tabledata.RowState.DELETED);
			}
		}
	}
	
	return false;
};

/**
 * 프리폼(폼레이아웃)에 바인딩된 값을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 컬럼명
 * @return {String} 프리폼의 컬럼값
 */
FreeFormKit.prototype.getValue = function(app, psFreeFormId, psColumnName){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/** @type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	
	return voDs.getValue(rowIndex, psColumnName);
};

/**
 * 프리폼(폼레이아웃)에 바인딩된 값을 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 컬럼명
 * @param {String} psValue 변경하고자 하는 값
 * @return void
 */
FreeFormKit.prototype.setValue = function(app, psFreeFormId, psColumnName, psValue){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/** @type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var rowIndex = voBindContext.grid ? this._appKit.Grid.getIndex(app, voBindContext.grid.id) : voBindContext.rowIndex;
	
	voDs.setValue(rowIndex, psColumnName, psValue);
	vcForm.redraw();
};

/**
 * 프리폼(폼레이아웃) 내의 특정 컬럼을 포커싱한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId 프리폼 ID
 * @param {#column} psColumnName 포커싱할 컬럼명
 */
FreeFormKit.prototype.setFocus = function(app, psFreeFormId, psColumnName){
	/** @type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	
	var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psColumnName);
	if(vcCtrl) this._appKit.Control.setFocus(app, vcCtrl.id);
};

/**
 * 프리폼(폼레이아웃)의 변경사항을 되돌린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId  해당 그룹 아이디
 * @param {Number} pnRowIndex? 되돌릴 행의 index
 * @param {#column} psEditCol? 포커싱할 컬럼명
 * @return void
 */
FreeFormKit.prototype.revertRow = function(app, psFreeFormId, pnRowIndex, psEditCol){
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	/**@type cpr.controls.Grid */
	var vcGrid = voBindContext.grid;
	/**@type cpr.data.DataSet */
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;

	var vnRowIndex = 0;
	if(!ValueUtil.isNull(pnRowIndex)){
		vnRowIndex = pnRowIndex;
	}else{
		if(vcGrid) vnRowIndex = this._appKit.Grid.getIndex(vcGrid.getAppInstance(), vcGrid.id);
		else vnRowIndex = voBindContext.rowIndex;
	}
	//데이터 Revert
	var rowData = voDs.getRow(vnRowIndex).getRowData();
	var vsGridRowState = vcGrid.getRowState(vnRowIndex);
	for(var column in rowData){
		voDs.setValue(vnRowIndex, column, voDs.getOriginalValue(vnRowIndex, column));
	}
	voDs.getRow(vnRowIndex).setState(cpr.data.tabledata.RowState.UNCHANGED);
	if(vsGridRowState == cpr.data.tabledata.RowState.INSERTED){
		vcGrid.setRowState(vnRowIndex, vsGridRowState);
	}
	var vcTree = app.lookup(voDs._treeId); 
		
	if(vcGrid) vcGrid.redraw();
	if(vcTree) vcTree.redraw();
	vcForm.redraw();
	
	if(!ValueUtil.isNull(psEditCol)){
		var vcCtrl = this._appKit.Group.getDataBindedControl(app, vcForm.id, psEditCol);
		if(vcCtrl) vcCtrl.focus();
	}
};

/**
 * 프리폼(폼레이아웃)의 변경사항을 되돌린다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psFreeFormId  해당 그룹 아이디
 * @return void
 */
FreeFormKit.prototype.revertAllData = function(app, psFreeFormId){
	/**@type cpr.controls.Container */
	var vcForm = app.lookup(psFreeFormId);
	var voBindContext = this._appKit.Group.getBindContext(app, vcForm);
	
	var vcGrid = voBindContext.grid;
	var voDs = voBindContext.grid ? voBindContext.grid.dataSet : voBindContext.dataSet;
	var vcTree = app.lookup(voDs._treeId); 
	
	//데이터 Revert
	voDs.revert();
		
	if(vcGrid) vcGrid.redraw();
	if(vcTree) vcTree.redraw();
	vcForm.redraw();
};

/**
 * 프리폼(폼레이아웃)의 변경사항 유/무를 반환를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container | Array} paFreeFormId 프리폼 ID
 * @param {"MSG" | "CRM"} psAftMsg? 
 *						MSG : 변경사항 내역이 없을 경우 '변경된 내역이 없습니다.' 메세지 출력<br>
 *  					CRM : 변경내역이 존재할경우 '변경사항이 반영되지 않았습니다. 계속 하시겠습니까?' confirm 메시지출력 
 * @return {Boolean} 데이터 변경 여부
 */
FreeFormKit.prototype.isModified = function(app, paFreeFormId, psAftMsg){
	if(!(paFreeFormId instanceof Array)){
		paFreeFormId = [paFreeFormId];
	}
	
	psAftMsg = psAftMsg == null ? "" : psAftMsg;
	
	var modify = false;
	var vcGroup = null;
	for (var i=0, len=paFreeFormId.length; i<len; i++) {
		if(paFreeFormId[i] instanceof cpr.controls.Container) {
			vcGroup = paFreeFormId[i];
		}else{
			vcGroup = app.lookup(paFreeFormId[i]);
		}
		
		var voDataSet = this._appKit.Group.getBindDataSet(app, vcGroup);
		if(voDataSet != null && voDataSet.isModified()) {
			modify = true;
			break;
		}
	}
	
	if(modify){
		if(psAftMsg.toUpperCase() == "CRM"){//변경사항이 반영되지 않았습니다. 계속 하시겠습니까? confirm
			if(!this._appKit.Msg.confirm("CRM-M003", [vcGroup.fieldLabel])) return true;
			else return false;
		}
	}else{
		if(psAftMsg.toUpperCase() == "MSG"){//변경된 내역이 없습니다.
			this._appKit.Msg.notify(app, "INF-M006");
		}
	}
	
	return modify;
};



/**
 * 그리드(Grid) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function GridKit(appKit){
	this._appKit = appKit;
//	this._userAttr = {
//		  bindDataFormId : "bindDataFormId"
//		, ignoreModify :    "ignoreModify"
//		, columnMoveFix :    "columnMoveFix"
//		, columnResizeFix :    "columnResizeFix"
//		, columnSortFix :    "columnSortFix"
//		, clickModeFix :    "clickModeFix"
//		, enableCheckDuplicatePk :    "enableCheckDuplicatePk"
//	}
};

/**
 * 그리드를 초기화한다.<br/>
 * appHeader에서 그리드 초기화 수행<br/>
 * 1. 상태 컬럼 바인드 지정  (N, U, D)<br/>
 * 2. 인덱스컬럼 text및 css지정<br/>
 * 3. 소트 컬럼 자동지정 <br/>
 * 4. 그리드, 프리폼 PK컬럼 enable 설정<br/>
 *   - 그리드의 선택형 컨텍스트 사용 그룹은 그리드의 사용자속성 bindDataFormId 지정 필수<br/>
 *   - 그리드 PK컬럼의 사용자 속성 editablePK = "Y"이면 enable 설정 X<br/>
 * 5. update이벤트 추가 ( 저장후 그리드의 마지막 작업행을 찾기 위함)<br/>
 * 6. 그리드 매핑 데이터셋에 load 이벤트 추가 (그리드의 마지막행 찾기, 조회 건수 업데이트)<br/>
 * 7. 그리드 selection-dispose 이벤트 추가(삭제로 인한, 선택행이 없는 경우... 이전 행 자동 선택하도록(행 추가 -> 삭제시))<br/>
 * 그리드에 대한 공통 로직 및 이벤트 추가 용도<br/>
 *  - appHeader에서 공통 적용됨<br/>
 *  - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid | Array} paGridId 그리드 ID
 * @return void
 */
GridKit.prototype.init = function(app, paGridId){
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	}
	
	//Index 컬럼 반환
	function getIndexDetailColumn(poGrid){
		var detail = poGrid.detail;
		var column;
		for(var i=0, len=detail.cellCount; i<len; i++){
			column = detail.getColumn(i);
			if(column.columnType == "rowindex"){
				return column;
			}
		}
		return null;
	}
	var _app = app;
	var _appKit = this._appKit;
	for (var i=0, len=paGridId.length; i <len; i++) {
		/**
		 * @type cpr.controls.Grid
		 */
		var vcGrid = (paGridId[i] instanceof cpr.controls.Grid) ? paGridId[i] : _app.lookup(paGridId[i]);
		if(vcGrid == null) continue;
		
//		var isNotcolumnSortable = ValueUtil.fixBoolean(vcGrid.userAttr("columnSortFix"));
		var vcDataSet =  vcGrid.dataSet;
		vcDataSet._gridId = vcGrid.id;
		
		//상태컬럼
		var statusColumn = this.getHeaderStatusColumn(app, vcGrid.id);
		if(statusColumn != null){
			// Status 컬럼 숨김
			//statusColumn.visible = false;
			var detailColumn = vcGrid.detail.getColumn(statusColumn.colIndex);
			var statusColumnCtrl = detailColumn ? detailColumn.control : null;
			if(statusColumnCtrl){
				/*
				statusColumnCtrl.bind("value").toExpression("switch(getStateString()){ case 'I' : 'N'  case 'U' : 'U'  case 'D' : 'D'  default : ''}");
				statusColumnCtrl.style.css({"text-align" : "center"});*/
				statusColumnCtrl.style.bindClass().toExpression("switch(getStateString()){ case 'I' : 'state-txt insert'  case 'U' : 'state-txt update'  case 'D' : 'state-txt delete'  default : ''}");
			}
		}
		//인덱스컬럼
		var indexColumn = getIndexDetailColumn(vcGrid);
		if(indexColumn != null){
			indexColumn.style.css({"text-align" : "center"});
			var hIndexColumn = vcGrid.header.getColumn(indexColumn.colIndex);
			if(hIndexColumn && hIndexColumn.text != "No") hIndexColumn.text = "No";
		}
		
		//소트 컬럼 자동지정
//		if(isNotcolumnSortable != true){
			var dColumn, hColumn, vaHColumns;
//			var vsFixColSort = "";
			for(var j=0, jlen=vcGrid.detail.cellCount; j<jlen; j++){
				dColumn = vcGrid.detail.getColumn(j);
				if(dColumn.columnType == "checkbox" || dColumn.columnType == "rowindex") continue;
				if(dColumn.columnName == null || dColumn.columnName == "") continue;
				
//				vsFixColSort = dColumn.control ? dColumn.control.userAttr("columnSortFix") : ""; //컬럼 정렬무시옵션
				vaHColumns = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
				if(vaHColumns){
					vaHColumns.forEach(function(/* cpr.controls.gridpart.GridColumn */ column){
//						if(vsFixColSort !== "Y"){
							column.sortable = true;
//						}
						if(column.targetColumnName == null || column.targetColumnName == "") {
							column.targetColumnName = dColumn.columnName;
						}
					});
				}
			}
//		}
		/*
		//읽기 전용 컬럼 헤더 Text 변경
		var vbGReadOnly = vcGrid.readOnly === true ? true : false;
		var readHTextClass = "readonly";
		var readHColor = "#959495";
		if(vbGReadOnly){
			vcGrid.style.header.css({color: readHColor});
			for(var k=0, klen=vcGrid.detail.cellCount; k<klen; k++){
				var dColumn = vcGrid.detail.getColumn(k);
				if(dColumn.control){
					if(dColumn.controlType == "numbereditor"){
						if(dColumn.control.spinButton != false && dColumn.control.style.css("text-align") == ""){
							dColumn.control.style.css({"text-align":"center"});
						}
					}
					if((dColumn.control.format === "0000" || dColumn.control.format === "9999") && dColumn.control.max == 0){
						dColumn.control.max = 1.7976931348623157E308;
					}
				}
			};
		}else{
			var vaHeaderColumn = null;
			for(var k=0, klen=vcGrid.detail.cellCount; k<klen; k++){
				var dColumn = vcGrid.detail.getColumn(k);
				if(dColumn.columnType == "rowindex"){
					vaHeaderColumn = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
					vaHeaderColumn.forEach(function(column){
						column.style.addClass(readHTextClass);
					});
				}else if(dColumn.control == null || dColumn.controlType == "output" || dColumn.controlType == "image" || dColumn.controlType == "button"){
					vaHeaderColumn = this.getHeaderColumnByColIdex(app, vcGrid.id, dColumn.colIndex);
					vaHeaderColumn.forEach(function(column){
						column.style.addClass(readHTextClass);
					});
				}else if((dColumn.control.getBindInfo("readOnly") == undefined && dColumn.control.readOnly === true) || (dColumn.control.getBindInfo("enabled") == undefined && dColumn.control.enabled === false)){
					vaHeaderColumn = this.getHeaderColumnByColIdex(app, vcGrid.id, dColumn.colIndex);
					vaHeaderColumn.forEach(function(column){
						if(column.style.getClasses().indexOf("require") == -1){
							column.style.addClass(readHTextClass);
						}
					});
				}
				
				if(dColumn.control){
					if(dColumn.controlType == "numbereditor" && dColumn.control.spinButton != false && dColumn.control.style.css("text-align") == ""){
						dColumn.control.style.css({"text-align":"center"});
					}
				}
			}
		}
		*/
		//헤더 컬럼 Visible 원래값 저장
		var vsHidenColumnIdxs = "";
		for(var k=0, klen=vcGrid.header.cellCount; k<klen; k++){
			if(vcGrid.header.getColumn(k).visible === false){
				vsHidenColumnIdxs += k+",";
			}
		}
		vcGrid.userAttr("originHiddenColumns", vsHidenColumnIdxs);
		
		//그리드 PK컬럼 enable 설정
		var vaPkColumnNames = ValueUtil.split(vcDataSet.info, ",");
		var vsDataBindCtxId = vcGrid.userAttr("bindDataFormId");
		vaPkColumnNames.some(function(value, idx){
			if(value == "") return false;
			//그리드 PK컬럼 설정(필수 스타일, 활성화/비활성화 바인딩 처리등)
			var columns = vcGrid.detail.getColumnByName(value);
			var vaHColumns = _appKit.Grid.getHeaderColumn(_app, vcGrid.id, value);
			if(columns != null && columns.length > 0){
				columns.forEach(function(col){
					if(col.control){
						if(col.control.userAttr("editablePK") !== "Y"){
							col.control.bind("enabled").toExpression("getStateString() == 'I' ? true : false");
							col.control.userAttr("required", "Y");
							if(vaHColumns){
								vaHColumns.forEach(function(/* cpr.controls.gridpart.GridColumn */ column){
									if(column.cellIndex == col.cellIndex) {
										column.style.setClasses("require");
									}
								});
							}
						}
					}
				});
			}
		});
		
		//프리폼 PK 컬럼 설정 
		if(!ValueUtil.isNull(vsDataBindCtxId) && vaPkColumnNames.length > 0){
			var freeformes = ValueUtil.split(vsDataBindCtxId, ",");
			freeformes.forEach(function(/* eachType */ formId){
				/**@type cpr.controls.Container */
				var freeform = _app.lookup(formId);
				if(freeform != null){
					var vaChildCtrls = freeform.getAllRecursiveChildren();
					vaPkColumnNames.some(function(value, idx){
						if(value == "") return false;
						vaChildCtrls.some(function(ctrl, ix){
							if(ctrl.type == "output") return false;
							if(ctrl.userAttr("ignorePk") == "Y") return false;
							if(ctrl.userAttr("editablePK") == "Y") return false;
							var bind = ctrl.getBindInfo("value");
							if(bind && bind.type == "datacolumn" && value == bind.columnName){
								ctrl.bind("enabled").toExpression("getStateString() == 'I' ? true : false");
								ctrl.userAttr("required", "Y");
							}
						});
					});	
				}
			});
		}
		var vsItemKey = app.id + vcGrid.id;
		var layout = localStorage.getItem(vsItemKey);
		if(!ValueUtil.isNull(layout)){
			vcGrid.setColumnLayout(JSON.parse(layout));	
		}
		
		//마지막 작업행을 찾기위해서...그리드 findRow 설정
		vcDataSet.addEventListener("update", function(/* cpr.events.CDataEvent */e){
			/** 
			 * @type cpr.data.DataSet
			 */
			var dataset = e.control;
			var rowIndex = e.row.getIndex();
			var row = e.row;
			var vaPkColumns = ValueUtil.split(dataset.info, ",");
			if(vaPkColumns.length < 1){
				dataset._findRowCondition = null;
			}else{
				var vaTempCond = [];
				vaPkColumns.forEach(function(column){
					vaTempCond.push(column + "==" + "'" + dataset.getValue(rowIndex, column) + "'");
				});
				dataset._findRowCondition = vaTempCond.length > 0 ? vaTempCond.join(" && ") : null;
			}
			
		});
		//그리드에 바인딩된 데이터셋(Dataset)이 로드될 때 처리
		//마지막행 찾기, 조회 건수 업데이트
		vcDataSet.addEventListener("load", function(/* cpr.events.CDataEvent */e){
			/** @type cpr.data.DataSet */
			var dataset = e.control;
			/** @type cpr.controls.Grid */
			var grd = dataset.getAppInstance().lookup(dataset._gridId);
			if(grd == null) return;
			
			//대상 그리드가 정렬된 상태라면... 정렬을 푼다.
			if(dataset.getSort() != ""){
				dataset.clearSort();
			}
			
			//마지막 작업행 찾기
			if(dataset.getRowCount() > 0) {
				if(dataset._findRowCondition){
					var row = dataset.findFirstRow(dataset._findRowCondition);
					if(row) {
						if(grd.selectionUnit == "cell"){
							grd.focusCell(row.getIndex(), 0);
							grd.moveToCell(row.getIndex(), 0);
						}else{
							setTimeout(function(){
								_appKit.Grid.selectRow(_app, grd.id, row.getIndex());
							}, 200);
						}
					}else{
						grd.selectionUnit == "cell" ? grd.focusCell(0, 0) : _appKit.Grid.selectRow(_app, grd.id, 0);
					}
				}else{
					if(grd.selectionUnit == "cell") grd.focusCell(0, 0); else _appKit.Grid.selectRow(_app, grd.id, 0);
				}
			}else{
			}
			
			//마지막 작업행 정보 Clear
			dataset._findRowCondition = null;
			
			//그리드 타이틀 영역의 데이터 건수 업데이트
			var titles = _appKit.Group.getAllChildrenByType(_app, "udc.com.comTitle");
			for(var i=0, len=titles.length; i<len; i++){
				if(titles[i] == null) continue;
				if(titles[i].getAppProperty("ctrl") == null) continue;
				if(titles[i].getAppProperty("ctrl").id == grd.id){
					titles[i].setAppProperty("rowCount", dataset.getRowCount());
					break;
				}
			}
		});
		
		vcDataSet.addEventListener("filter", function(e){
			/** @type cpr.data.DataSet */
			var dataset = e.control;
			/** @type cpr.controls.Grid */
			var grd = dataset.getAppInstance().lookup(dataset._gridId);
			if(grd == null) return;
			
			var titles = _appKit.Group.getAllChildrenByType(_app, "udc.com.comTitle");
			for(var i=0, len=titles.length; i<len; i++){
				if(titles[i] == null) continue;
				if(titles[i].getAppProperty("ctrl") == null) continue;
				if(titles[i].getAppProperty("ctrl").id == grd.id){
					titles[i].setAppProperty("rowCount", dataset.getRowCount());
					break;
				}
			}
		});
		//행 삭제로 인한, 선택행이 없는 경우... 이전 행 자동 선택하도록(행 추가 -> 삭제시)
		vcGrid.addEventListener("selection-dispose", function(/* cpr.events.CGridEvent */e){
			var oldSelection = e.oldSelection;
			if (oldSelection != null && oldSelection.length > 0 && oldSelection[0] > -1 && oldSelection[0] < e.control.rowCount) {
				e.control.selectRows(oldSelection[0]);
			}
		});
		
		vcGrid.addEventListener("selection-change", function(e){
			var grid = e.control;
			var bindFormId = grid.userAttr("bindDataFormId");
			
			if(bindFormId && app.lookup(bindFormId).userAttr("validationStatus") === "invalid"){
				ValueUtil.split(bindFormId, ",").forEach(function(each){

					_appKit.Control.getAllUiControl(app, app.lookup(bindFormId)).forEach(function(each){
						each.style.removeClass("invalid");
					});
					app.lookup(bindFormId).redraw();
					
					
				});
			}
		});
		
		//그리드 키다운(Up/Down) 이벤트 처리 - 현재 포커싱된 그리드 객체정보 저장
//		vcGrid.addEventListener("keydown", function(/* cpr.events.CKeyboardEvent */ e){
//			if(e.keyCode == cpr.events.KeyCode.UP || e.keyCode == cpr.events.KeyCode.DOWN){
//				_appKit.getMainApp(e.control.getAppInstance()).__focusGrid = e.control;
//			}
//		});
	}
};

/**
 * 그리드 특정 cell의 값을 변경한다. (detail 영역) <br>
 * (주의) for문 등으로 대량의 데이터를 setCellValue 호출하는 경우에는 pbEmitEvent값을 false로 주어서, 스크립트 실행시간을 줄여줄 수 있다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String | Number} psDataColmnId cellIndex 값을 변경하고자 하는 cell의 cell index <br>(또는 binding된 data column name)
 * @param {String} psValue 변경하고자 하는 값
 * @param {Number} pnRowIndex? 값을 변경하고자 하는 cell의 row index<br>
 *                 (defalut : 선택된 rowindex)
 * @param {Boolean} pbEmitEvent? 이벤트(before-update, update)를 발생시킬지 여부
 * @return void
 */
GridKit.prototype.setCellValue = function(app, psGridId, psDataColmnId, psValue, pnRowIndex, pbEmitEvent){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	vcGrid.setCellValue(rowIndex, psDataColmnId, psValue, pbEmitEvent);
};

/**
 * 그리드 특정 cell의 값을 반환한다.(detail 영역) 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String | Number} psDataColmnId cellIndex 값을 가져오고자 하는 cell의 cell index
 * 											<br> (또는 binding된 data column name)
 * @param {Number} pnRowIndex? 값을 변경하고자 하는 cell의 row index<br>
 *                 (defalut : 선택된 rowindex)
 * @return {Object} 해당 cell의 값
 */
GridKit.prototype.getCellValue = function(app, psGridId, psDataColmnId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return vcGrid.getCellValue(rowIndex, psDataColmnId);
};

/**
 * 그리드 특정 row cell의 origin 값을 반환한다.(detail 영역) 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String | Number} psDataColmnId cellIndex 값을 가져오고자 하는 cell의 cell index<br> (또는 binding된 data column name)
 * @param {Number} pnRowIndex? 값을 가져오고자 하는  cell의  행인덱스<br/>
 *                 defalut : 선택된 rowindex
 * @return {any} 해당 cell의 값
 */
GridKit.prototype.getOriginCellValue = function(app, psGridId, psDataColmnId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return grid.dataSet.getOriginalValue(rowIndex, psDataColmnId);
};

/**
 * 그리드 특정 row index의 GridRow객체를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {Number} pnRowIndex? 값을 가져오고자 하는  cell의  행인덱스<br/>
 *                 defalut : 선택된 rowindex
 * @return {cpr.controls.provider.GridRow} 해당 index의 GridRow 객체
 */
GridKit.prototype.getDataRow = function(app, psGridId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	return grid.getDataRow(rowIndex);
};

/**
 * 현재 연결된 데이터 구조체에 sort 조건을 변경하고, sort 적용<br>
 * <pre><code>
 * Grid.sort(app, "grd1", "a, b DESC")
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {String} psCondition sort 조건식
 * @return void
 */
GridKit.prototype.sort = function(app, psGridId, psCondition){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	vcGrid.clearSort();
	vcGrid.sort(psCondition);
	vcGrid.redraw();
};

/**
 * 그리드 초기화(데이터 clear)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid | Array} paGridId 그리드 ID
 * @return void
 */
GridKit.prototype.reset = function(app, paGridId){
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	 }
	
	for (var i = 0; i < paGridId.length; i++) {
		var vcGrid = app.lookup(paGridId[i]);
		vcGrid.dataSet.clear();
		vcGrid.redraw();
	}
};


/**
 * 현재 연결된 데이터 구조체에 filter 조건을 변경하고, filter합니다.<br/>
 * <pre><code>
 * Grid.filter(app, "grd1", "age >= 20")
 * </code></pre>
 * 	=> "age"컬럼의 값이 20이상인 값만 필터링합니다.<br/>
 * <pre><code>
 * Grid.filter(app, "grd1", "name ^= '김'")
 * </code></pre>
 * 	=> "name"컬럼의 값이 '김'으로 시작하는 값만 필터링합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 아이디
 * @param {#expression} psCondition filter 조건식
 * @return void
 */
GridKit.prototype.filter = function(app, psGridId, psCondition){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var vsFilter = vcGrid.getFilter();
	if(!ValueUtil.isNull(vsFilter)){
		vcGrid.clearFilter();	
	}
	vcGrid.filter(psCondition);
};


/**
 * 그리드의 변경사항 유/무를 반환를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid | Array} paGridId 그리드 ID
 * @param {"MSG" | "CRM" | "SAVE"} psAftMsg? 
 *						MSG : 변경사항 내역이 없을 경우 '변경된 내역이 없습니다.' 메세지 출력<br>
 *  					CRM : 변경내역이 존재할경우 '변경사항이 반영되지 않았습니다. 계속 하시겠습니까?' confirm 메시지출력 <br>
 * 						SAVE : 변경된 데이터가 있습니다. 저장 하시겠습니까? confirm 메시지출력
 * @param {cpr.events.CSelectionEvent} event? 이벤트 객체
 * @param {Function} poCallBackFunc? 콜백함수
 * @return {Boolean} 데이터 변경 여부
 */
GridKit.prototype.isModified = function(app, paGridId, psAftMsg, event, poCallBackFunc){
	//유효성 체크로 인해서 행선택 변경 발생으로 변경여부 체크가 되는 경우는 SKIP...
	if(event != null && event.control != null && event.control.userAttr("selectionChangeByValidation") === "true"){
		event.control.removeUserAttr("selectionChangeByValidation");
		return false;
	}
	
	if(!(paGridId instanceof Array)){
		paGridId = [paGridId];
	}
	psAftMsg = psAftMsg == null ? "" : psAftMsg;
	
	var modify = false;
	var vcGrid = null;
	for (var i=0, len=paGridId.length; i<len; i++) {
		if(paGridId[i] instanceof cpr.controls.Grid) { 
			vcGrid = paGridId[i];
		}else{
			vcGrid = app.lookup(paGridId[i]);
		}
		
		//사용자 정의 속성에 modify 무시 속성이 있는 경우... SKIP
		if(vcGrid.userAttr("ignoreModify") === "Y") continue;
		if(vcGrid.dataSet == null) continue;
		
		if (vcGrid.dataSet.isModified()) {
			modify = true;
			break;
		}
	}
	
	if(modify){
		if(psAftMsg.toUpperCase() == "CRM"){//변경사항이 반영되지 않았습니다. 계속 하시겠습니까? confirm
			if(!this._appKit.Msg.confirm("CRM-M003", [vcGrid.fieldLabel])) return true;
			else return false;
		}
	}else{
		if(psAftMsg.toUpperCase() == "MSG"){//변경된 내역이 없습니다.
			this._appKit.Msg.notify(app, "INF-M006");
		}
	}
	
	return modify;
};

/**
 * 해당 그리드의 체크된 행(Row)이나 선택된 행의 인덱스를 반환한다.(check된 행이 있는 경우, 체크된 행이 우선적으로 반환된다.)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @return {Number[]} 선택된 row index 배열
 */
GridKit.prototype.getCheckOrSelectedRowIndex = function(app, psGridId){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid.rowCount < 1) return [];
	
	var vaChkIndexs = vcGrid.getCheckRowIndices();
	if(vaChkIndexs != null && vaChkIndexs.length > 0 ){
		return vaChkIndexs;
	}else{
		if(vcGrid.selectionUnit == "cell"){
			var vaSelIndices = vcGrid.getSelectedIndices();
			var rowIndices = [];
			for(var i=0, len=vaSelIndices.length; i<len; i++){
				rowIndices.push(vaSelIndices[i].rowIndex);
			}
			return rowIndices;
		}else{
			return vcGrid.getSelectedRowIndices();
		}
	}
};

/**
 * 해당 그리드의 체크된 행(Row)의 인덱스를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @return {Number[]} 선택된 row index 배열
 */
GridKit.prototype.getCheckedRowIndex = function(app, psGridId){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid.rowCount < 1) return [];
	
	var vaChkIndexs = vcGrid.getCheckRowIndices();
	if(vaChkIndexs != null && vaChkIndexs.length > 0 ){
		return vaChkIndexs;
	}else{
		return [];
	}
};

/**
 * 그리드 내 변경된 특정 행(Row)의 데이터를 원상태로 복구한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 * @param {Number} pnRowIndex? 원복하고 싶은 row index<br>
 *                 (default : 현재 체크 및 선택된 로우)
 * @return void
 */
GridKit.prototype.revertRowData = function(app, psGridId, pnRowIndex){
	/**@type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	
	if(pnRowIndex == null){
		var vaSelectIdx = this.getCheckOrSelectedRowIndex(app, psGridId);
		if(vaSelectIdx.length < 1){
			return false;
		}
		var vcDataSet = vcGrid.dataSet;
		var rowIndex;
		for(var i = vaSelectIdx.length - 1; i >= 0; i--) {
			rowIndex = vaSelectIdx[i];
			if(vcGrid.isCheckedRow(rowIndex)) {
				vcGrid.setCheckRowIndex(rowIndex, false); //체크 해제
			}
			var vsStatus = "";
		    if (vcDataSet != null ){
				vsStatus = vcDataSet.getRowStateString(rowIndex);			    	
		    }
			vcGrid.revertRowData(rowIndex); //데이터 원복
			//신규 행이면...
			if (vsStatus == "I") {
				if(rowIndex == vcGrid.getRowCount()){
					if(rowIndex == 0){
						vcGrid.clearSelection();
					}else{
						this.selectRow(app, vcGrid.id, rowIndex-1);
					}
				}else{
					this.selectRow(app, vcGrid.id, rowIndex);
				}
			}
		}
	}else{
		vcGrid.revertRowData(pnRowIndex);
	}
};

/**
 * 그리드 내에서 변경된 모든 데이터를 원상태로 복구한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId  그리드 ID
 */
GridKit.prototype.revertAllData = function(app, psGridId){
	var vcGrid = app.lookup(psGridId);
	vcGrid.revertData();
};

/**
 * 그리드의 특정 행 데이터를 그룹 폼의 데이터셋에 복사한다.<br/>
 * (사용처) 그리드의 데이터셋을 바인딩하여 사용하지 않는 경우에... 그리드의 선택된 행 데이터를 프리폼/그룹에 매핑하기 위한 용도임
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {#container} psTargetForm 복사할 Group Form ID
 * @param {Number} pnRowIdx 복사할 그리드 로우 인덱스 
 * @return void
 */
GridKit.prototype.copyRowToGroupForm = function(app, psGridId, psTargetForm, pnRowIdx){
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var vcGrpFrm = app.lookup(psTargetForm);
	vcGrpFrm.getBindContext().rowIndex = rowIndex;
	vcGrpFrm.redraw();
};

/**
 * 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.<br>
 * 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드 ID
 * @param {#grid} psDesGridId 복사할 그리드 ID
 * @param {Number} pnSrcRowIdx? 그리드 로우 인덱스<br>
 *                 default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return void
 */
GridKit.prototype.copyToGridData = function(app, psSrcGridId, psDesGridId, pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDesGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psSrcGridId) :  pnSrcRowIdx;
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [rowIndexs];
	}
	//복사할 ROW가 없으면...SKIP
	if (rowIndexs.length < 1) return;
	
	var srcDataSet = vcSrcGrid.dataSet;
	var tarDataSet = vcDesGrid.dataSet;
	for (var i=0, len=rowIndexs.length; i<len; i++) {
		//신규 후 삭제된 행은 제외
		if(srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		var data = srcDataSet.getRowData(rowIndexs[i]);
		// json 형식의 row의 데이터
		var str = [];
		// 이미 존재하는 row를 찾기 위해 row의 모든 column을 비교하는 조건 제작
		// str = "column1 == 'value1' && column2 == 'value2'..."
		for ( var key in data) {
			str.push(key + " == '" + data[key] + "'");
		}
		str = str.join(" && ");
		// 조건에 맞는 row 탐색
		var findRow = tarDataSet.findAllRow(str);
		// 조건에 해당하는 row가 없다면 target 그리드에 선택된 row를 추가
		if (findRow == null || findRow.length < 1) {
			tarDataSet.addRowData(data);
		}
	}
	
	vcDesGrid.redraw();
};

/**
 * 소스(Source) 그리드의 모든 행(Row)의 데이터를 타겟(Target) 그리드로 복사한다.<br>
 * 단, 복사할려는 데이터가 타겟 그리드에 이미 존재하는 경우에는 복사하지 않는다.(중복 복사 방지)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드 ID
 * @param {#grid} psDesGridId 복사할 그리드 ID
 * @return void
 */
GridKit.prototype.copyToAllGridData = function(app, psSrcGridId, psDesGridId){
	var vcSrcGrid = app.lookup(psSrcGridId);

	var indices = [];
	for (var i=0, len=vcSrcGrid.rowCount; i<len; i++) {
		indices.push(i);
	}
	
	this.copyToGridData(app, psSrcGridId, psDesGridId, indices);
};

/**
 * 그리드 작업행을 찾기 위한 조건을 설정한다. 데이터셋에 설정된 PK정보를 기준으로 자동 지정된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {Number} pnRowIndex? 그리드 로우(Row) 인덱스
 * @param {Boolean} pbForce? 기존에 로우에 대한 정보가 있으면 SKIP 여부
 * @return void
 */
GridKit.prototype.markFindRowCondition = function(app, psGridId, pnRowIndex, pbForce){
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var voDataSet = vcGrid.dataSet;
	
	if(pbForce != undefined && ValueUtil.fixBoolean(pbForce) === true){
		if(!ValueUtil.isNull(voDataSet._findRowCondition)) return;
	}
	
	var rowIndex = !ValueUtil.isNull(pnRowIndex) ? pnRowIndex : this.getIndex(app, psGridId);
	
	var vaTempCond = [];
	var vaPkColumns = ValueUtil.split(voDataSet.info, ",");
	vaPkColumns.forEach(function(column){
		vaTempCond.push(column + "==" + "'" + voDataSet.getValue(rowIndex, column) + "'");
	});
	
	if(vaTempCond.length > 0){
		voDataSet._findRowCondition = vaTempCond.join(" && ");
	}else{
		voDataSet._findRowCondition = null;
	}
};

/**
 * 소스(Source) 그리드의 선택된 행(Row)의 데이터를 타겟(Target) 그리드로 이동한다.<br>
 * 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드ID
 * @param {#grid} psDesGridId 이동할 그리드 ID
 * @param {Number | Number[]} pnSrcRowIdx? 그리드 로우 인덱스<br/>
 *                            default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return void
 */
GridKit.prototype.moveToGridData = function(app, psSrcGridId, psDesGridId, pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDesGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psSrcGridId) :  pnSrcRowIdx;
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [rowIndexs];
	}
	//이동할 ROW가 없으면...SKIP
	if(rowIndexs.length < 1) return;
	
	var srcDataSet = vcSrcGrid.dataSet;
	var tarDataSet = vcDesGrid.dataSet;
	for(var i=0, len=rowIndexs.length; i<len; i++){
		//신규 후 삭제된 행은 제외
		if(srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		tarDataSet.addRowData(srcDataSet.getRowData(rowIndexs[i]));
	}
	vcDesGrid.redraw();
	vcSrcGrid.deleteRow(pnSrcRowIdx);
};

/**
 * 소스(Source) 그리드의 모든 데이터행(Row)을 타겟(Target) 그리드로 이동한다.<br>
 * 데이터 이동 후, 소스(Source) 그리드의 이동된 행(Row)의 상태는 delete모드로 상태값만 변경된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psSrcGridId 그리드 ID
 * @param {#grid} psDesGridId 이동할 그리드 ID
 */
GridKit.prototype.moveToAllGridData = function(app, psSrcGridId, psDesGridId) {
	var vcSrcGrid = app.lookup(psSrcGridId);

	var indices = [];
	for (var i=0, len=vcSrcGrid.rowCount; i<len; i++) {
		indices.push(i);
	}
	
	this.moveToGridData(app, psSrcGridId, psDesGridId, indices);
};

/**
 * 그리드에서 로우(Row)를 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {Number | Number[]} pnRowIndex? 포커스를 부여할 Row의 인덱스(default : 현재 행 인덱스)
 * @param {Boolean} pbEmitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return void
 */
GridKit.prototype.selectRow = function(app, psGridId, pnRowIndex, pbEmitEvent) {
	/** @type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	if(pnRowIndex == null || pnRowIndex == undefined){
		pnRowIndex = this.getIndex(app, psGridId);
	}
	
	grid.selectRows(pnRowIndex, pbEmitEvent);
	if(!(pnRowIndex instanceof Array)){
		grid.focusCell(pnRowIndex, 0);
		grid.moveToCell(pnRowIndex, 0);
	}
};

/**
 * 그리드에서 조건을 만족하는 로우(Row)를 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {String} psCondition 조건식<br>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'"
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||"
 * @param {Number} pnCellIdx? 포커스를 부여할 Cell의 인덱스<br>
 *                 (default : 조건에 만족하는 행 select)
 * @return void
 */
GridKit.prototype.selectRowByCondition = function(app, psGridId, psCondition, pnCellIdx) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var voRow = vcGrid.findFirstRow(psCondition);
	
	if(voRow){
		if(pnCellIdx) vcGrid.focusCell(voRow.getIndex(), pnCellIdx);
		else vcGrid.selectRows(voRow.getIndex());
	}
};

/**
 * 그리드 행선택 변경 이벤트 발생시, 변경 이전에 선택된 행을 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.events.CSelectionEvent} event 그리드 선택행 변경 이벤트
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return void
 */
GridKit.prototype.selectBeforeRow = function(app, event, emitEvent) {
	/** @type cpr.controls.Grid */
	var vcGrid = event.control;
	var emit = emitEvent === true ? true : false;
	
	var voOldSelection = event.oldSelection[0];
	var vsPkValues = this.getRowPKColumnValues(app, vcGrid.id, voOldSelection);
	var voFindRow = vcGrid.findFirstRow(vsPkValues);
	if(voFindRow){
		vcGrid.clearSelection(false);
		if(vcGrid.selectionUnit == "cell"){
			vcGrid.selectCells([{rowIndex:voFindRow["rowIndex"], cellIndex:voFindRow["cellIndex"]}], emit);
		}else{
			vcGrid.selectRows(voFindRow.getIndex(), emit);
		}
	}
};

/**
 * 그리드에 신규 행(Row)을 추가한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId      그리드 ID
 * @param {String | Number} pnEditCellIdx 시작 cellIndex cell index 또는 column name
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index<br>
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data<br> (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체.
 */
GridKit.prototype.insertRow = function(app, psGridId, pnEditCellIdx, pnRowIdx, poRowData) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var insertedRow = null;
	if(poRowData != null)
		insertedRow = vcGrid.insertRowData(rowIndex, true, poRowData);
	else
		insertedRow = vcGrid.insertRow(rowIndex, true);
	
	var vnInsIdx = insertedRow.getIndex();
	
	if(vcGrid.readOnly){
		vcGrid.selectRows([ vnInsIdx ]);
	}else{
		vcGrid.selectRows([ vnInsIdx ]);
		vcGrid.setEditRowIndex(vnInsIdx, true);
	}
	
		
	if(pnEditCellIdx){
		vcGrid.focusCell(vnInsIdx, pnEditCellIdx);
		//포커싱할 컬럼이 UDC인 경우에...
		if(!ValueUtil.isNumber(pnEditCellIdx)){
			for(var i=0,len=vcGrid.detail.cellCount; i<len; i++){
				if(vcGrid.detail.getColumn(i).columnName == pnEditCellIdx){
					var ctrl = vcGrid.detail.getColumn(i).control;
					if(ctrl instanceof cpr.controls.UDCBase){
						var empApp = ctrl.getEmbeddedAppInstance();
						ctrl = AppUtil.getUDCBindValueControl(ctrl);
						if(ctrl) empApp.focus(ctrl.id);
					}
					break;
				}
			}
		}
	}else{
		vcGrid.focusCell(vnInsIdx, 0);
	}
	//그리드에 바인딩된 프리폼이 있는 경우... 프리폼 활성화
	if(!ValueUtil.isNull(vcGrid.userAttr("bindDataFormId"))){
		var freeformes = ValueUtil.split(vcGrid.userAttr("bindDataFormId"), ",");
		freeformes.forEach(function(/* eachType */ formId){
			/**@type cpr.controls.Container */
			var freeform = vcGrid.getAppInstance().lookup(formId);
			if(freeform != null){
				if(freeform._expressEnabled) freeform.bind("enabled").toExpression(freeform._expressEnabled);
				else freeform.enabled = true;
			}
		});
	}
	
	return insertedRow;
};

/**
 * 그리드에 단 한건의 신규 행(Row)을 추가한다. (단하나의 신규 행만 추가하고자 하는 경우에 사용)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId      그리드 ID
 * @param {String | Number} pnEditCellIdx 시작 cell index 또는 column name
 * @param {#grid | Array} paModifiedGrid
 * @param {Number} pnRowIdx? 추가하고자 하는 Row index<br>
 *                 (defalut : 현재 선택된 로우 이후)
 * @param {Object} poRowData? 추가할 row data<br> (key: header명, value: value 를 갖는 json data)
 * @return {cpr.controls.provider.GridRow} 추가한 Row의 GridRow 객체
 */
GridKit.prototype.insertRowOnlyOne = function(app, psGridId, pnEditCellIdx, paModifiedGrid, pnRowIdx, poRowData) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	if(vcGrid == null) return null;
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	
	var insertedRow = null;
	if(vcGrid.dataSet.getRowStatedCount(cpr.data.tabledata.RowState.INSERTED) > 0){
		for(var i=0, len=vcGrid.rowCount; i<len; i++){
			if(vcGrid.getRowState(i) == cpr.data.tabledata.RowState.INSERTED){
				insertedRow = vcGrid.getRow(i);
				break;
			}
		}
	}
	
	if(insertedRow){
		//신규 추가된 행이 존재합니다.변경사항이 반영되지 않았습니다. 계속 하시겠습니까?
		if(!this._appKit.Msg.confirm("CRM-M206", [vcGrid.fieldLabel])) return null;
		this._appKit.Control.reset(app, paModifiedGrid);
		var vaColumns = vcGrid.dataSet.getColumnNames();
		vaColumns.forEach(function(column){
			vcGrid.setCellValue(insertedRow.getIndex(), column, "", false);
		});
	}else{
		if(this.isModified(app, paModifiedGrid, "CRM")) return null;
		this._appKit.Control.reset(app, paModifiedGrid);
		insertedRow = vcGrid.insertRow(rowIndex, true);
	}
	
	var vnInsIdx = insertedRow.getIndex();
	if(vcGrid.readOnly){
		vcGrid.selectRows([ vnInsIdx ]);
	}else{
		vcGrid.selectRows([ vnInsIdx ]);
		vcGrid.setEditRowIndex(vnInsIdx, true);
	}
		
	if(pnEditCellIdx){
		vcGrid.focusCell(vnInsIdx, pnEditCellIdx);
		//포커싱할 컬럼이 UDC인 경우에...
		if(!ValueUtil.isNumber(pnEditCellIdx)){
			for(var i=0,len=vcGrid.detail.cellCount; i<len; i++){
				if(vcGrid.detail.getColumn(i).columnName == pnEditCellIdx){
					var ctrl = vcGrid.detail.getColumn(i).control;
					if(ctrl instanceof cpr.controls.UDCBase){
						var empApp = ctrl.getEmbeddedAppInstance();
						ctrl = AppUtil.getUDCBindValueControl(ctrl);
						if(ctrl) empApp.focus(ctrl.id);
					}
					break;
				}
			}
		}
	}
	
	return insertedRow;
};

/**
 * 그리드의 선택된 행(Row)를 삭제한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {Number | Number[]} pnRowIdx? 삭제하고자 하는 Row index<br>
 *                 default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * @return {Number[]} 삭제된 행 (배열)                
 */
GridKit.prototype.deleteRow = function(app, psGridId, pnRowIdx) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var _this = this;
	
	var rowIndexs = pnRowIdx == null ? this.getCheckOrSelectedRowIndex(app, psGridId) :  pnRowIdx;
	
	if(!(rowIndexs instanceof Array)){
		rowIndexs = [pnRowIdx];
	}
	//삭제할 행이 없는 경우... 메시지 박스를 보여줌
	if(rowIndexs.length < 1){
		//삭제할 데이터가 없습니다.
		this._appKit.Msg.alert("INF-M007");
		return false;
	}
	
	//신규 후 삭제시... 디테일 데이터에 대한 Reference 삭제(삭제 플래그로 업데이트)
	var vaDetailCtrls = null;
	
	var vcDataSet = vcGrid.dataSet;
	for(var i = rowIndexs.length - 1; i >= 0; i--) {
	    var rowIdx = rowIndexs[i];
	    vcGrid.deleteRow(rowIdx);
	    
		if (vcDataSet != null ){
			if (vcDataSet.getRowState(rowIdx) == cpr.data.tabledata.RowState.INSERTDELETED) {
				
				vcGrid.revertRowData(rowIdx);
				if(rowIdx == vcGrid.getRowCount()){
					if(rowIdx == 0){
						vcGrid.clearSelection();
					}else{
						vcGrid.selectRows(rowIdx-1);						
					}
				}else{
					vcGrid.selectRows(rowIdx);
				}
			}
		}	
	}
	
	//그리드에 바인딩된 프리폼이 있는 경우... 프리폼 활성화
	if(!ValueUtil.isNull(vcGrid.userAttr("bindDataFormId"))){
		var freeformes = ValueUtil.split(vcGrid.userAttr("bindDataFormId"), ",");
		freeformes.forEach(function(/* eachType */ formId){
			/**@type cpr.controls.Container */
			var freeform = vcGrid.getAppInstance().lookup(formId);
			if(freeform != null){
				var voDs = _this._appKit.Group.getBindDataSet(freeform.getAppInstance(), freeform);
				//데이터 건수가 없으면... 프리폼 비활성화
				if(voDs.getRowCount() < 1) {
					freeform.enabled = false;
				}
			}
		});
	}
	
	return rowIndexs;
};

/**
 * 특정 row의 상태값을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {Number} pnRowIdx 상태를 알고자 하는 row index
 * @return {cpr.data.tabledata.RowState} 해당 row index의 상태값<br>
			<b>state 종류</b><br>
			cpr.data.tabledata.RowState.EMPTIED : 삭제된 로우를 커밋 시 삭제된 배열을에서 제거하기 위한 임시 상태<br>
			cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태<br>
			cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태<br>
			cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태<br>
			cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태<br>
			cpr.data.tabledata.RowState.INSERTDELETED : 행이 추가되었다가 삭제된 상태
 */
GridKit.prototype.getRowState = function(app, psGridId, pnRowIdx) {
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	return vcGrid.getRowState(rowIndex);
};

/**
 * 특정 row의 상태를 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 변경할 상태값. <br>
		<b>state 종류</b><br>
		cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태<br>
		cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태<br>
		cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태<br>
		cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태<br>
 * @param {Number} pnRowIdx 변경하고자 하는 row index
 */
GridKit.prototype.setRowState = function(app, psGridId, state, pnRowIdx) {
	var vcGrid = app.lookup(psGridId);
	var rowIndex = pnRowIdx == null ? this.getIndex(app, psGridId) : pnRowIdx;
	vcGrid.setRowState(rowIndex, state);
};

/**
 * 전체 row의 상태값을 특정 상태(state)로 일괄 업데이트 한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 변경할 상태값<br>
		<b>state 종류</b><br>
		cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태<br>
		cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태<br>
		cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태<br>
		cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태<br>
 */
GridKit.prototype.setRowStateAll = function(app, psGridId, state) {
	var vcGrid = app.lookup(psGridId);
	var vcDataSet = vcGrid.dataSet;
	vcDataSet.setRowStateAll(state);
	vcGrid.redraw();
};

/**
 * 해당 상태 값을 갖는 row를 검색하여 row index 배열을 반환합니다.
 * <pre><code>
 * Grid.getRowStatedIndices(app,"grd1",cpr.data.tabledata.RowState.UPDATED);
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {cpr.data.tabledata.RowState} state 검색할 상태값<br>
			<b>state 종류</b><br>
			cpr.data.tabledata.RowState.UNCHANGED : 변경되지 않은 상태<br>
			cpr.data.tabledata.RowState.INSERTED : 행이 신규로 추가된 상태<br>
			cpr.data.tabledata.RowState.UPDATED : 행이 수정된 상태<br>
			cpr.data.tabledata.RowState.DELETED : 행이 삭제된 상태<br>
 * @return {Array} row index 배열
 */
GridKit.prototype.getRowStatedIndices = function(app, psGridId, state) {
	var vcGrid = app.lookup(psGridId);
	return vcGrid.dataSet.getRowStatedIndices(state);
};

/**
 * 그리드의 로우 갯수 반환
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {Number}  로우 카운트 
 */
GridKit.prototype.getRowCount = function(app, psGridId) {
	var vcGrid = app.lookup(psGridId);
	return vcGrid.rowCount;
};

/**
 * 그리드의 현재 선택된 행의 인덱스(Index)를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {Number}  로우(Row) 인덱스 
 */
GridKit.prototype.getIndex = function(app, psGridId) {
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	return vcGrid.selectionUnit != "cell" ? vcGrid.getSelectedRowIndex() : vcGrid.getSelectedIndices()[0]["rowIndex"];
};

/**
 * 그리드의 타이틀명을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {String} 타이틀 문자열 
 */
GridKit.prototype.getTitle = function(app, psGridId) {
	var titleCtlrs = this._appKit.Group.getAllChildrenByType(app, "udc.com.comTitle");
	if(titleCtlrs != null){
		for(var i=0, len=titleCtlrs.length; i<len; i++){
			if(titleCtlrs[i].ctrl && titleCtlrs[i].ctrl.id == psGridId){
				return titleCtlrs[i].title;
			}
		}
	}
	return "";
};

/**
 * 그리드의 특정 컬럼에 포커싱을 처리한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psDataColumnId 데이터 컬럼 cell index 또는 column name
 * @param {Number} pnRowIndex? 행 인덱스
 * @return void
 */
GridKit.prototype.setFocusColumn = function(app, psGridId, psDataColumnId, pnRowIndex) {
	/** @type cpr.controls.Grid */
	var grid = app.lookup(psGridId);
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	if(grid.readOnly){
		grid.selectRows([ rowIndex ]);
	}else{
		grid.selectRows([ rowIndex ]);
		grid.setEditRowIndex(rowIndex, true);
	}
	grid.focusCell(rowIndex, psDataColumnId);
};

/**
 * 그리드 디테일 columnname로 헤더 컬럼 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼명
 * @return {Array} 헤더 컬럼 배열Array (cpr.controls.gridpart.GridColumn)
 */
GridKit.prototype.getHeaderColumn = function(app, psGridId, psColumnName) {
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
    var vaDetailColumn = vcGrid.detail.getColumnByName(psColumnName);
	
	var vaHeaderColumns = new Array();
	vaDetailColumn.forEach(function(dColumn){
//		var vaHeaderColumn = vcGrid.header.getColumnByColIndex(dColumn.colIndex, dColumn.colSpan);
//		vaHeaderColumn.forEach(function(hColumn){
//			vaHeaderColumns.push(hColumn);	
//		});
		var vaHeaderCellIndex = vcGrid.getHeaderCellIndices(dColumn.cellIndex);
		vaHeaderCellIndex.forEach(function(each){
			vaHeaderColumns.push(vcGrid.header.getColumn(each));
		});
	});
	
	return vaHeaderColumns;
};

/**
 * 그리드 디테일 컬럼의 ColIndex로 헤더 컬럼 취득
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드ID
 * @param {Number} pnColIndex 컬럼 ColIndex
 * @return {Array} 헤더 컬럼 배열Array (cpr.controls.gridpart.GridColumn)
 */
GridKit.prototype.getHeaderColumnByColIdex = function(app, psGridId, pnColIndex) {
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var voHeader = vcGrid.header;
	
	var vaHeaderColumns = new Array();
	var hColumn;
	for(var i=0, len=voHeader.cellCount; i<len; i++){
		hColumn = voHeader.getColumn(i);
		if(hColumn != null && hColumn.colIndex == pnColIndex){
			vaHeaderColumns.push(hColumn);
		}
	}
	
	return vaHeaderColumns;
};

/**
 * 그리드 헤더 컬럼의 텍스트(text) 문자열을 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼명
 * @return {String} 헤더 컬럼 text
 */
GridKit.prototype.getHeaderColumnText = function(app, psGridId, psColumnName) {
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
	return vaColumns.length > 0 ? vaColumns[0].getText() : "";
};

/**
 * 그리드 헤더 중에 STATUS 컬럼 객체를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return {cpr.controls.gridpart.GridHeaderColumn} 헤더 컬럼
 */
GridKit.prototype.getHeaderStatusColumn = function(app, psGridId) {
	var header = app.lookup(psGridId).header;
	var column = null;
	for(var i=0, len=header.cellCount; i<len; i++){
		column = header.getColumn(i);
		if(column.getText() == "F"){
			return column;
		}
	}
	return null;
};

/**
 * 그리드 내 컬럼을 숨긴다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼 명
 * @return void
 */	 
GridKit.prototype.hideColumn = function(app, psGridId, psColumnName){
 	/** @type cpr.controls.Grid*/
 	var vcGrid = app.lookup(psGridId);
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
//	if(vaColumns.length > 0){
//	 	vcGrid.columnVisible(vaColumns[0].colIndex, false);
//	}
	if(vaColumns) {
		vaColumns.forEach(function(/* cpr.controls.gridpart.GridHeaderColumn */each){
			each.visible = false;
		});
	}
};
 
/**
 * 그리드 컬럼을 보이도록 변경한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#column} psColumnName 컬럼명
 * @return void
 */	 
GridKit.prototype.showColumn = function(app, psGridId, psColumnName){
 	/** @type cpr.controls.Grid*/
 	var vcGrid = app.lookup(psGridId);
	var vaColumns = this.getHeaderColumn(app, psGridId, psColumnName);
//	if(vaColumns.length > 0){
//	 	vcGrid.columnVisible(vaColumns[0].colIndex, true);
//	}
	if(vaColumns) {
		vaColumns.forEach(function(/* cpr.controls.gridpart.GridHeaderColumn */each){
			each.visible = true;
		});
	}
};

/**
 * 그리드 데이터를 조건에 맞게 필터링한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {#expression} psCondition 데이터 필터링 조건
 * @return void
 */	
GridKit.prototype.setFilter = function(app, psGridId, psCondition){
 	/** @type cpr.controls.Grid*/
 	var grid = app.lookup(psGridId);
	grid.setFilter(psCondition);
};

/**
 * 그리드 데이터 필터링을 취소한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @return void
 */	
GridKit.prototype.clearFilter = function(app, psGridId){
 	/** @type cpr.controls.Grid*/
 	var grid = app.lookup(psGridId);
	grid.clearFilter();
};


/**
 * 그리드의 데이터셋의 FindRow를 지정한다.<br>
 * 해당 함수 사용시 그리드 조회시 psFindRowCond로 지정된 행이 자동 선택된다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psCondition 조건식 <br/>
 *                 ex)"STUD_DIV_RCD == 'CT101REGU' && SA_NM == '컴퓨터정보과'" <br/>
 * 					사용가능수식 !=", "!==", "$=", "%", "&&", "(", "*", "*=", "+", ",", "-", ".", "/", "/*", "//", "<", "<=", "==", "===", ">", ">=", "?", "[", "^=", "||" 
 * @return void
 */
GridKit.prototype.setFindRowCondition = function(app, psGridId, psCondition){
	var vcGrid = app.lookup(psGridId);
	vcGrid.dataSet._findRowCondition = psCondition;
};

/**
 * 현재 로우의 key(pk) value를 반환한다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {Number} pnRowIndex? 취득하고자하는 row index. <br/>
 *                 defalut : 선택된 rowindex
 * @return {String}
 */
GridKit.prototype.getRowPKColumnValues = function(app, psGridId, pnRowIndex){
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var vcDataSet = vcGrid.dataSet;
	
	var rowIndex = pnRowIndex == null ? this.getIndex(app, psGridId) : pnRowIndex;
	
	var vaPkColmns = ValueUtil.split(vcDataSet.info, ",");
	var vaTempCond = [];
	vaPkColmns.forEach(function(column){
		var vsPkValue = vcDataSet.getValue(rowIndex, column);
		vaTempCond.push(column + "==" + "'" + vcDataSet.getValue(rowIndex, column) + "'"); 
	});
	
	return vaTempCond.length > 0 ? vaTempCond.join(" && ") : "";
};

/**
 * 그리드의 선택 유/무 체크 및 PK값이 입려되어 있는지를 체크한다. 
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String | Array} paIgnoreCol PK값 입력 체크 예외 컬럼명
 * @return {Boolean}
 */
GridKit.prototype.checkSelectionWithPkValues = function(app, psGridId, paIgnoreCol){
	/** @type cpr.controls.Grid*/
	var vcGrid = app.lookup(psGridId);
	var rowIndex = this.getIndex(app, vcGrid.id);
	//Row 선택여부 확인
	if(rowIndex < 0){
		this._appKit.Msg.alert("INF-M129", [vcGrid.fieldLabel]); //선택된 데이터가 없습니다.
		return false;
	}
	//ROW의 PK값 입력여부 체크
	var vaPKColumns = ValueUtil.split(ValueUtil.fixNull(vcGrid.dataSet.info), ",");
	var valid = true, text, focusColumn, vbChk = false;
	for(var i=0, len=vaPKColumns.length; i<len; i++){
		if(ValueUtil.isNull(vcGrid.getCellValue(rowIndex, vaPKColumns[i]))){
		    if(!(paIgnoreCol instanceof Array)){
		        paIgnoreCol = [paIgnoreCol];
		    }
		    
		    vbChk = false;
            paIgnoreCol.some(function(colName){
                if(colName == vaPKColumns[i]) {
                	vbChk = true;
                	return false;
                }
            });
            
            if(vbChk) continue;
			
			valid = false;
			focusColumn = vaPKColumns[i];
			text = this.getHeaderColumnText(app, vcGrid.id, focusColumn);
			break;
		}
	}
	
	if(!valid){
		//항목은 필수입력 항목입니다.
		this._appKit.Msg.alert("WRN-M001", [vcGrid.fieldLabel+"의 "+text]);
		vcGrid.setEditRowIndex(rowIndex, true);
		vcGrid.focusCell(rowIndex, focusColumn);
		//포커싱할 컬럼이 UDC인 경우에...
		var vaDetailColumns = vcGrid.detail.getColumnByName(focusColumn);
		var dctrl = vaDetailColumns != null && vaDetailColumns.length > 0 ? vaDetailColumns[0].control : null;
		if(dctrl != null && dctrl instanceof cpr.controls.UDCBase){
			var empApp = dctrl.getEmbeddedAppInstance();
			dctrl = AppUtil.getUDCBindValueControl(dctrl);
			if(dctrl) empApp.focus(dctrl.id);
		}
		return false;
	}
	
	return true;
};

/**
 * 현재 로우의 key(pk) value를 반환한다. <br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#grid} psGridId 그리드 ID
 * @param {String} psFileName export 파일명
 * @param {String} psExcludeColumns? 출력시 제외할 컬럼명(여러개인 경우 콤마로 구분)<br> ex-COL1,COL2,COL3
 * @param {String} psFileType?  파일유형(xls,xlsx,cvs)
 * @param {Array} metadata 엑셀 익스포트시 설정 정보 (암호, 출력용지방향) 
 * @param {Boolean} pbExcludeHideColumn 숨김컬럼 제외 여부
 * @param {String} psExCludePart? 출력시 제외영역(ex-footer, gfooter)
 * @param {{applyFormat? : Boolean <!-- 익스포트시 포맷을 적용시킬 지 여부 (default true) --> ,
 * freezeHeader? : Boolean <!--엑셀 익스포트시 헤더 부분을 틀고정할지 여부를 설정 (default false)  -->,
 * useFormat? : Boolean <!--엑셀로 익스포트시 엑셀의 format 기능을 사용할지 여부 (default true)  -->,
 * applySuppress? : Boolean <!--  엑셀 익스포트시 suppress, mergedToIndexExpr에 의한 셀 병합을 반영할지 여부 (default false) -->}} options? 그리드 엑셀 익스포트 옵션
 * @param {String} psRowIndex? 익스포트시킬 특정 row index(여러개인 경우 콤마로 구분)
 * @param {(datas : Number, rowIndex : Number)=>Void } handler? 엑셀 익스포트시 행별 스타일 또는 데이터를 변경할 수 있는 핸들러
 * @return void
 */
GridKit.prototype.exportData = function(app, psGridId, psFileName, psExcludeColumns, psFileType, metadata, pbExcludeHideColumn, psExCludePart, options, psRowIndex, handler){
	var _this = this;
	/** @type cpr.controls.Grid */
	var vcGrid = app.lookup(psGridId);
	var vsFileType = !ValueUtil.isNull(psFileType) ? psFileType : "xlsx";
	
	pbExcludeHideColumn = ValueUtil.isNull(pbExcludeHideColumn) ? true : pbExcludeHideColumn;
	
	var subExport = new cpr.protocols.Submission();
	subExport.action = "../export/" + psFileName.replace("\/", "") + "."+vsFileType;
	subExport.mediaType = "application/json";
	subExport.responseType = "blob";
	subExport.addParameter("filename", psFileName.replace("\/", ""));
	//기본 출력 제외 컬럼(인덱스 컬럼, 선택용 체크 컬럼)
	var voColumn, voHColumn;
	var vaExcludeCellIndexs = [];
	var vaExportRowIndex = [];
	for(var i=0, len=vcGrid.detail.cellCount; i<len; i++){
		voColumn = vcGrid.detail.getColumn(i);
		if(voColumn.columnType == "checkbox" || voColumn.columnType == "rowindex"){
			vaExcludeCellIndexs.push(i);
		}else if(voColumn.control instanceof cpr.controls.UDCBase){
			if(voColumn.control == null || voColumn.control.getBindInfo("value") == null){
				vaExcludeCellIndexs.push(i);
			}
		}
//		else if(voColumn.columnName == null || voColumn.columnName == ""){
//			vaExcludeCellIndexs.push(i);
//		}
		else{
			//숨김컬럼 제외
			if(pbExcludeHideColumn){
				// 디테일 셀인덱스에 해당하는 헤더 셀 인덱스 반환
				voHColumn = vcGrid.getHeaderCellIndices(i); 
				if(voHColumn != null && voHColumn.length > 0){
					voHColumn.forEach(function(vnCellIndex) {
						if(vcGrid.header.getColumn(vnCellIndex).visible===false) {
							vaExcludeCellIndexs.push(vnCellIndex);
						}
					})
				}
			}
//			if(pbExcludeHideColumn){
//				voHColumn = this.getHeaderColumn(app, psGridId, voColumn.columnName);
//				if(voHColumn != null && voHColumn.length > 0){
//					if(voHColumn[0].visible === false){
//						vaExcludeCellIndexs.push(i);
//					}
//				}
//			}
		}
	}
	
	//상태컬럼 제외
	var statusColumn = this.getHeaderStatusColumn(app, vcGrid.id);
	if(statusColumn != null){
		vaExcludeCellIndexs.push(statusColumn.colIndex);
	}
	
	//그외 추가적인 출력 제외 컬럼이 존재하는 경우
	if(!ValueUtil.isNull(psExcludeColumns)){
		var vaExclColumns = ValueUtil.split(psExcludeColumns, ",");
		var vaDColumns;
		for(var j=0, jlen=vaExclColumns.length; j<jlen; j++){
			vaDColumns = vcGrid.detail.getColumnByName(vaExclColumns[j]);
			if(vaDColumns){
				vaDColumns.forEach(function(/* Object */ each){
//					vaExcludeCellIndexs.push(each.colIndex);
					vaExcludeCellIndexs.push(each.cellProp.constraint["cellIndex"]);
				});
			}
		}
	}
	
	// 출력시킬 특정 로우 인덱스
	if(!ValueUtil.isNull(psRowIndex)) {
		vaExportRowIndex  = ValueUtil.split(psRowIndex,",");
	}  else {
		for (var a = 0 ; a < vcGrid.getRowCount(); a++) {
			vaExportRowIndex.push(a);
		}
	}
	
	var exportData = vcGrid.getExportData({
		exceptStyle:false,
		applyFormat : (options && options.applyFormat? options.applyFormat : true),
		freezeHeader : (options && options.freezeHeader? options.freezeHeader :false),
		applySuppress : (options && options.applySuppress? options.applySuppress :false),
		useFormat : (options && options.useFormat ? options.useFormat : true),
		excludeCols: vaExcludeCellIndexs,
		rows : vaExportRowIndex,
		rowDataHandler: handler
	});

	if (metadata != null) {
		exportData["metadata"] = {};
		if (metadata["password"] != null) {
			exportData["metadata"]["password"] = metadata["password"];
		}
		if (metadata["printPageOrientation"] != null) {
			exportData["metadata"]["printPageOrientation"] = metadata["printPageOrientation"];
		}
	}
	//풋터 또는 그룹풋터 제외하는 경우
	if(!ValueUtil.isNull(psExCludePart)){
		var len = exportData.rowgroups.length;
		for(var i = (len-1); i >= 0; i--) {
			if (exportData.rowgroups[i].region == psExCludePart) {
				exportData.rowgroups.splice(i,1);
			}
		}
	}
	
	//그리드 출력 스타일지정
	for (var i=0, len=exportData.rowgroups.length; i<len; i++) {
		// band별로 원하는 스타일 추가 가능 (header, detail, footer, gheader, gfooter)
		var rowGroup = exportData.rowgroups[i];
		var cellLength = rowGroup.style.length;
		for (var j = 0; j < cellLength; j++) {
			rowGroup.style[j].style["border-bottom-color"] = "black";
			rowGroup.style[j].style["border-bottom-style"] = "solid";
			rowGroup.style[j].style["border-bottom-width"] = "1px";
			rowGroup.style[j].style["border-left-color"] = "black";
			rowGroup.style[j].style["border-left-style"] = "solid";
			rowGroup.style[j].style["border-left-width"] = "1px";
			rowGroup.style[j].style["border-right-color"] = "black";
			rowGroup.style[j].style["border-right-style"] = "solid";
			rowGroup.style[j].style["border-right-width"] = "1px";
			rowGroup.style[j].style["border-top-color"] = "black";
			rowGroup.style[j].style["border-top-style"] = "solid";
			rowGroup.style[j].style["border-top-width"] = "1px";
			
			if (rowGroup.region == "header") {
				rowGroup.style[j].style["background-color"] = "#dddddd";
				rowGroup.style[j].style["text-align"] = "center";
			}
		}
	}
	
	subExport.setRequestObject(exportData);

	subExport.send();
};

/**
 * 그리드의 행 레이아웃을 정의합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#grid} psGridId
 * @param {Number} pnRowCnt 그리드에 보여질 Header와 Detail영역의 Row수 
 * @param {Number} pnDefaultMergedColIndex
 */
GridKit.prototype.addHeaderRow = function(app, psGridId, pnRowCnt, pnDefaultMergedColIndex){
	/**
	 * @type cpr.controls.Grid
	 */
	var grid = app.lookup(psGridId);

	var originConfig = grid.getInitConfig();
	var originRowCnt = originConfig.header.rows.length;
	
	originConfig.header.rows = []
	for(var i = 0; i < pnRowCnt; i++){
		originConfig.header.rows.push({height : '24px'});	
	}
	
	originConfig.header.cells.forEach(function(cell){
		
		if(cell.constraint.colIndex <= pnDefaultMergedColIndex){
			cell.constraint.rowSpan = originConfig.header.rows.length;
		}
	});

	grid.init(_.clone(originConfig));
}

/**
 * 그리드의 행 레이아웃을 정의합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#grid} psGridId
 * @param {Number} pnRowCnt 그리드에 보여질 Header와 Detail영역의 Row수 
 * @param {Number} pnDefaultMergedColIndex
 */
GridKit.prototype.addDetailRow = function(app, psGridId, pnRowCnt, pnDefaultMergedColIndex){
	/**
	 * @type cpr.controls.Grid
	 */
	var grid = app.lookup(psGridId);
	
	var originConfig = grid.getInitConfig();
	var originRowCnt = originConfig.detail.rows.length;
	
	originConfig.detail.rows = []
	for(var i = 0; i < pnRowCnt; i++){
		originConfig.detail.rows.push({height : '24px'});	
	}
	
	originConfig.detail.cells.forEach(function(cell){
		
		if(cell.constraint.colIndex <= pnDefaultMergedColIndex){
			cell.constraint.rowSpan = originConfig.detail.rows.length;
		}
	});
	//originConfig.columns = originConfig.columns.slice(0, 18)
	originConfig.autoFit = "all"

	grid.init(_.clone(originConfig));
}

/**
 * 그리드의 행 레이아웃을 정의합니다.
 * @param {cpr.core.AppInstance} app
 * @param {#grid} psGridId
 * @param {Number} pnRowCnt 그리드에 보여질 Header와 Detail영역의 Row수 
 * @param {Number} pnDefaultMergedColIndex 자동으로 머지될 컬럼 인덱스(ex 2: 2열 이전의 컬럼은 자동으로 머지됩니다.)
 */
GridKit.prototype.defineRowLayout = function(app, psGridId, pnRowCnt, pnDefaultMergedColIndex){
	/**
	 * @type cpr.controls.Grid
	 */ 
	var grid = app.lookup(psGridId);
	var initConfig = grid.getInitConfig();

	if(!grid["_originConfigInfo"]){
		var dataSet = initConfig.dataSet
		initConfig.dataSet = null;
		grid["_originConfigInfo"] = deepCopy(initConfig)
		
		initConfig.dataSet = dataSet;
		grid["_originConfigInfo"].dataSet = dataSet;
	}
	
	//STEP1 - header, detail의 영역을 늘려 셀이 들어갈 공간 확보
	//헤더영역 row수 조정
	this.addHeaderRow(app, psGridId, pnRowCnt, pnDefaultMergedColIndex);
	//디테일영역 row수 조정
	this.addDetailRow(app, psGridId, pnRowCnt, pnDefaultMergedColIndex);

	var headerCells = [];
	var nextColIdx = pnDefaultMergedColIndex + 1;
	var layout = grid.getColumnLayout();
	
	
	var rowCursor = 0
	var cellCursor = 0
	
	var cellCntInRow = Math.ceil(( (layout.detail.length > layout.header.length ? layout.detail.length : layout.header.length
	                                -pnDefaultMergedColIndex - 1) / pnRowCnt));

	if(grid["_originConfigInfo"]){
		initConfig.columns = deepCopy(grid["_originConfigInfo"].columns.slice(0, cellCntInRow + pnDefaultMergedColIndex +1 ));
	}
	else{
		initConfig.columns = initConfig.columns.slice(0, cellCntInRow + pnDefaultMergedColIndex +1 );
	}
	
	//STEP2 - header영역에 셀을 재배치
	for(var i = pnDefaultMergedColIndex + 1; i < initConfig.header.cells.length; i++){
		

		var headerCell = initConfig.header.cells[i];
		headerCell.constraint.colIndex = nextColIdx;
		headerCell.constraint.rowIndex = rowCursor;
		nextColIdx += headerCell.constraint.colSpan || 1 ;
		cellCursor += headerCell.constraint.colSpan || 1; 
		
		if(cellCursor >= cellCntInRow){
			cellCursor = 0;
			nextColIdx = pnDefaultMergedColIndex + 1;
			rowCursor++;
		}
		
	}
	
	
	nextColIdx = pnDefaultMergedColIndex + 1;
	cellCursor = 0;
	rowCursor = 0;
	
	//STEP3 - detail영역에 셀을 재배치
	for(var i = pnDefaultMergedColIndex + 1; i < initConfig.detail.cells.length; i++){
		
		
		var detailCell = initConfig.detail.cells[i];
		detailCell.constraint.colIndex = nextColIdx;
		detailCell.constraint.rowIndex = rowCursor;
		nextColIdx += detailCell.constraint.colSpan || 1 
		cellCursor += detailCell.constraint.colSpan || 1 

		if(cellCursor >= cellCntInRow){
			cellCursor = 0;
			nextColIdx = pnDefaultMergedColIndex + 1;
			rowCursor++;
		}
	}
	
	//STEP4 - 변경한 config정보 반영
	grid.init(initConfig);
	
	/**
	 * 깊은복사
	 * @param {any} obj
	 */
	function deepCopy(obj) {
	    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
	        return obj;
	
	    if (obj instanceof Date)
	        var temp = new obj.constructor(); //or new Date(obj);
	    else
	        var temp = obj.constructor();
	
	    for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	            obj['isActiveClone'] = null;
	            temp[key] = deepCopy(obj[key]);
	            delete obj['isActiveClone'];
	        }
	    }
	    return temp;
	}
}

GridKit.prototype.revertRowLayout = function(app, psGridId){
	/**
	 * @type cpr.controls.Grid
	 */
	var grid = app.lookup(psGridId);
	grid.init(grid["_originConfigInfo"]);
	grid["_originConfigInfo"] = null;
}



/**
 * Group컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function GroupKit(appKit){
	this._appKit = appKit;
};

/**
 * 그룹 초기화시 공통 적용
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param  * @param {Array} paGrpId 그룹ID 배열
 */
GroupKit.prototype.init = function(app, paGrpId) {
}

/**
 * 조회조건 및 작업영역 그룹 컨트롤 초기화<br>
 * 1. AppProperties.SEARCH_BTN_ID 설정에 따라 조회조건 변경시 작업영역 데이터 Clear (선택)<br>
 *   - 조회영역내 조회조건 컨트롤의 selection-change, value-change시 작업영역(paDisableCtl) disable 및 그리드, 프리폼 초기화<br>
 * 2. 조회조건 변경시 작업영역 데이터 변경시 알림(확인) 메시지 출력 <br>
 *  - appHeader에서 공통 적용됨<br>
 * 3. 조회버튼의 ID는 'btnSearch'' 또는 value를 '조회''로 지정해야함<br>
 *  - 사이트별 Customizing 필요<br>
 * 4. input 컨트롤의 사용자 속성에 autoKeydownSearch = "Y" 지정시 keydown 이벤트 등록 (조회버튼 클릭)
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psSearchBoxId  		 조회조건 영역 그룹컨트롤ID
 * @param {#container | Array} paDisableCtl	 조회조건 변경시 비활성화 처리되는 영역의 그룹 컨트롤ID
 * @param {#uicontrol | Array} paExceptCtl? 적용 제외 컨트롤 ID
 * @return void
 */
GroupKit.prototype.initSearchBox = function(app, psSearchBoxId, paDisableCtl, paExceptCtl){
	//비활성화 영역 컨트롤
	paDisableCtl = paDisableCtl != null ? paDisableCtl : new Array();
	if(!(paDisableCtl instanceof Array)){
		paDisableCtl = [paDisableCtl];
	}
	//적용 제외 컨트롤 목록
	paExceptCtl = paExceptCtl != null ? paExceptCtl : new Array();
	if(!(paExceptCtl instanceof Array)){
		paExceptCtl = [paExceptCtl];
	}
	
	var _app = app;
	var _appKit = this._appKit;
	var vsSchBtnId = AppProperties.SEARCH_BTN_ID;
	
//	var vaSearchBoxIds = ValueUtil.split(psSearchBoxId, ",");
//	paDisableCtl.forEach(function(item){
//		var ctrl = _app.lookup(item);
//		if(ctrl) ctrl.style.addClass("data-box");
//	});
	
	function doAddSearchBoxEvent(ctrl, psSearchBoxId){
		//조회버튼인 경우
		if ( ctrl.type == "button" && (ctrl.id && ctrl.id.match(vsSchBtnId) || ctrl.value == "조회")){
			
			paExceptCtl.push(ctrl.id);
			vsSchBtnId = ctrl.id;
			ctrl.addEventListener("click", function(/* cpr.events.CEvent */ e){
				if(e.defaultPrevented === false){
					doShadowView(_app, true, psSearchBoxId);					
				}
			});
		}else{
			if(ctrl.type == "button" || ctrl.type == "output" || ctrl.type == "img" || ctrl.visible === false || ctrl.readOnly === true) return;
			
//			if(ctrl.type == "numbereditor"){
//				if(ctrl.spinButton != false && ctrl.style.css("text-align") == ""){
//					ctrl.style.css({"text-align":"center"});
//				}
//				if((ctrl.format === "0000" || ctrl.format === "9999") && ctrl.max == 0){
//					ctrl.max = 1.7976931348623157E308;
//				}
//			}

			/**
			 * 변경사항이 있는 경우
			 * 계속진행을 하시겠습니까? 에서 취소 선택시 업무단 value-change 이벤트가 호출되지 않게 하기 위해
			 * before 이벤드를 추가함.
			 */			
			var bfEventType = (ctrl.type == "combobox" || ctrl.type == "radiobutton") ? "before-selection-change" : "before-value-change";
			ctrl.addEventListener(bfEventType, function(e){
				if(_appKit.isAppModified(_app, "CRM", _app.getContainer())){
					return false;
				}else{
					return true;
				}
				return true;
			});
			
			var vbUseSearchBoxClear = AppProperties.IS_SEARCH_CLEAR;
			
			//조회조건 변경시 작업 영역 초기화
			if(vbUseSearchBoxClear){
				var eventType = (ctrl.type == "combobox" || ctrl.type == "radiobutton") ? "selection-change" : "value-change";
				ctrl.addEventListener(eventType, function(e){
					
					//화면내의 모든 데이터 Clear
					var dataSets = _appKit.getAllAppModifiedDataSet(_app);
					if(dataSets != null && dataSets.length > 0){
						dataSets.forEach(function(ds){
							ds.clear();
						});
					}
					doShadowView(_app, false);
				});
			}
			
			//인풋박스 컨트롤 Keydown 이벤트 추가
			if( (ctrl.type == "inputbox" || ctrl.type == "numbereditor") && ctrl.userAttr("autoKeydownSearch") == "Y"){
				ctrl.addEventListener("keydown", function(/* cpr.events.CKeyboardEvent */ e){
					if(e.keyCode == cpr.events.KeyCode.ENTER){
						//Enter키 입력시, 조회 버튼 클릭 이벤트 발생
						_appKit.Control.dispatchEvent(app, vsSchBtnId, "click");
						//_appKit.Header.dispatchEvent(app, "btnSearch", "click");
						var comBtnSch = _appKit.Group.getAllChildrenByType(app, "udc.com.comBtnSearch");
						if(comBtnSch != null && comBtnSch.length > 0){
							var vcCtrl = comBtnSch[0].getEmbeddedAppInstance().lookup(vsSchBtnId);
							if(vcCtrl){
								vcCtrl.dispatchEvent(new cpr.events.CEvent("click"));
							}
						}
					}
				});
			}
		}
	}
	
	function doShadowView(app, pbEnable, psSearchBoxId){
		if(paDisableCtl.length > 0){
//			setTimeout(function(){
				if(vaSearchBoxIds.length > 1){
					var vnIdx = vaSearchBoxIds.indexOf(psSearchBoxId);
					_appKit.Control.setEnable(app, pbEnable, paDisableCtl[vnIdx]);
				}else{
					_appKit.Control.setEnable(app, pbEnable, paDisableCtl);
				}
				
//			}, 50);
		}else{
			if(pbEnable === false){
				if(_app.lookup("grpSchShell") == null){
					var disableCtl = new cpr.controls.Container("grpSchShell");
					disableCtl.style.css({"background-color":"#ededed", "opacity":"0.2"});
					disableCtl.setLayout(new cpr.controls.layouts.XYLayout());
					/** @type cpr.controls.Container */
					var vcSearchBox = _app.lookup(psSearchBoxId);
					var heightPosix = vcSearchBox.getActualRect()["height"];
					_app.getContainer().addChild(disableCtl, {
								"top": (Number(heightPosix)+35)+"px",
								"right": "5px",
								"bottom": "5px",
								"left": "5px"
							});
				}
			}else{
				_app.getContainer().removeChild(_app.lookup("grpSchShell"), true);
			}
		}
	}
	
	var initFocus = false;
	function doFocusCtrl(poCtrl){
		if(poCtrl.type == "button" || poCtrl.type == "output" || poCtrl.type == "img") return;
		
		if(!initFocus){
			poCtrl.focus();
			initFocus = true;
		}
	}
	var vaSearchBoxIds = ValueUtil.split(psSearchBoxId, ",");
	for(var z=0, zlen=vaSearchBoxIds.length; z<zlen; z++){
		/** @type cpr.controls.Container */
		var vcSearchBox = app.lookup(vaSearchBoxIds[z]);
		if(vcSearchBox){
			var childCtrls = _appKit._getChildren(vcSearchBox);
			for (var i=0, len=childCtrls.length; i<len; i++) {
				//udc컨트롤일 경우.
				if(childCtrls[i] instanceof cpr.controls.UDCBase){
					var embApp = childCtrls[i].getEmbeddedAppInstance();
					embApp.getContainer().getChildren().some(function(ctrl){
						if(ctrl instanceof cpr.controls.Container){
							ctrl.getChildren().some(function(subCtrl){
								doAddSearchBoxEvent(subCtrl, vaSearchBoxIds[z]);
								doFocusCtrl(subCtrl);
							});
						}else{
							doAddSearchBoxEvent(ctrl, vaSearchBoxIds[z]);
							doFocusCtrl(ctrl);
						}
					});
				}else{
					//이벤트 추가
					doAddSearchBoxEvent(childCtrls[i], vaSearchBoxIds[z]);
					//포커싱
					doFocusCtrl(childCtrls[i]);
				}
			}
			doShadowView(_app, false, vaSearchBoxIds[z]);
		}
	}
};

/**
 * 해당 그룹 컴포넌트 내의 DataColumn에 바인딩된 컨트롤 객체를 반환한다.<br>
 * 이는 프리폼 내의 DataColumn의 값을 갖는(바인딩) 컨트롤을 찾기 위해 사용된다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#container} psGrpId 그룹ID
 * @param {#column} psDataColumnNm datacolumn 명
 * @return {Object} 컨트롤 객체
 */
GroupKit.prototype.getDataBindedControl = function(app, psGrpId, psDataColumnNm){
	/** @type cpr.controls.Container */
	var _grpKit = this._appKit.Group;
	var vcFrf = app.lookup(psGrpId);
	var vaChild = vcFrf.getChildren();
	var vcBindCtrl = null;
	vaChild.some(function(ctrl, idx){
		if(vcBindCtrl) return true;
		
		if(ctrl.type == "container") vcBindCtrl = _grpKit.getDataBindedControl(app, ctrl.id, psDataColumnNm);
		if(ctrl.type == "output") return false;
		var bind = ctrl.getBindInfo("value");
		if(bind && bind.type == "datacolumn" && psDataColumnNm === bind.columnName){
			if(ctrl instanceof cpr.controls.UDCBase){
				vcBindCtrl = AppUtil.getUDCBindValueControl(ctrl);
			}else{
				vcBindCtrl = ctrl;
			}
			
			return true;
		}
	});
	
	return vcBindCtrl;
};

/**
 * 그룹 또는 컨테이너 내의 특정 타입에 해당하는 자식 컨트롤을 취득한다.<br>
 * (사용처) 해당 화면내의 특정 유형의 컨트롤 목록을 얻고자 하는 경우에 사용
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {String} psCtlType		 컨트롤 타입(ex: grid)
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체  	
 * @param {Boolean} pbRecursive? 자식 컨테이너를 Recusive하게 찾을건지 여부
 * @return {Array} 자식 컨트롤 객체 배열
 */
GroupKit.prototype.getAllChildrenByType = function(app, psCtlType, poContainer, pbRecursive) {
	var vaTypesChild = new Array();
	
	var container = app.getContainer();
	function getChildRecursive(psCtlType, poContainer){
	    var vaChildCtrls = poContainer ? (pbRecursive === true ? poContainer.getAllRecursiveChildren() : poContainer.getChildren()) : (pbRecursive === true ? container.getAllRecursiveChildren() : container.getChildren());
	    for (var i=0, len=vaChildCtrls.length; i<len; i++) {
	        if (vaChildCtrls[i].type == psCtlType) {
	        	vaTypesChild.push(vaChildCtrls[i]);
	        }else if (vaChildCtrls[i] instanceof cpr.controls.Container ) {
	        	getChildRecursive(psCtlType, vaChildCtrls[i]);
	        }else if(vaChildCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(psCtlType, voUdcApp.getContainer());
	        }else if(vaChildCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(psCtlType, voEmbApp.getContainer());
	        }
	    }
	    vaChildCtrls = null;
	}
	
	getChildRecursive(psCtlType, poContainer);
	
	return vaTypesChild;
};

/**
 * 그룹 또는 컨테이너 내의 특정 ID를 갖는 자식 컨트롤을 취득한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {Array} paCtrlIds		 컨트롤 ID 배열
 * @param {cpr.controls.Container} poContainer? 자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체  	
 * @return {Array} 자식 컨트롤 객체 배열
 */
GroupKit.prototype.getControlByID = function(app, paCtrlIds, poContainer) {
	if(!(paCtrlIds instanceof Array)){
		paCtrlIds = [paCtrlIds];
	}
	var vaChildCtrls = new Array();
	var container = poContainer ? poContainer : this._appKit.getMainApp(app).getContainer();
	function getChildRecursive(paCtrlIds, poContainer){
	    var childCtrls = poContainer.getAllRecursiveChildren();
	    for (var i=0, len=childCtrls.length; i<len; i++) {
	        if (paCtrlIds.indexOf(childCtrls[i].id) != -1) {
	        	vaChildCtrls.push(childCtrls[i]);
	        }else if(childCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(paCtrlIds, voUdcApp.getContainer());
	        }else if(childCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(paCtrlIds, voEmbApp.getContainer());
	        }
	    }
	}
	
	getChildRecursive(paCtrlIds, container);
	
	return vaChildCtrls;
};

/**
 * 그룹 컨트롤에 바인딩된 데이터셋을 반환한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체 
 * @return {cpr.data.DataSet} 바인딩된 데이터셋 객체
 */
GroupKit.prototype.getBindDataSet = function(app, poContainer){
	/**@type cpr.data.DataSet */
	var voDataSet = null;
	/** @type cpr.bind.BindContext */
	var voBindContext = this.getBindContext(app, poContainer);
	if(voBindContext instanceof cpr.bind.GridSelectionContext){
		voDataSet = voBindContext.grid.dataSet;
	}else if(voBindContext instanceof cpr.bind.DataRowContext){
		voDataSet = voBindContext.dataSet;
	}
	
	return voDataSet;
};

/**
 * 그룹 컨트롤의 바인딩 문맥(Context) 객체를 반환한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} poContainer 		자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체 
 * @return {cpr.bind.BindContext} 바인딩 Context 객체
 */
GroupKit.prototype.getBindContext = function(app, poContainer){
	/** @type cpr.bind.BindContext */
	var voBindContext = poContainer.getBindContext();
	if(voBindContext == null || voBindContext == undefined){
		var vaChildCtrls = this.getAllChildrenByType(app, "container", poContainer);
		vaChildCtrls.forEach(function(/* Object */ ctrl){
			if(ctrl.getBindContext()){
				voBindContext = ctrl.getBindContext();
				return true;
			}
		});
	}
	
	return voBindContext;
};
/**
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} poContainer 자식 컨트롤을 취득하고자 하는 부모 컨테이너 객체 
 */
GroupKit.prototype.setFloatGrp = function(app, poGroup) {
	var _app = app;
	
	for (var i = 0; i < poGroup.getChildrenCount(); i++) {
		var pogrpChid = poGroup.getChildren()[i];
		
		if (pogrpChid instanceof cpr.controls.Container) {
			pogrpChid.getLayout().topMargin = 10;
			pogrpChid.getLayout().bottomMargin = 10;
			pogrpChid.getLayout().spacing = 3;
		}
	}
	
	poGroup.style.css({
		"border-top": "1px solid #DFDFDF",
		"background-color": "#FFFFFF"
	})
	
	poGroup.visible = true;
	
	var rightSpacing, leftSpacing;
	if(app.getHostAppInstance().app.id != AppProperties.MAIN_APP_ID) {
		rightSpacing = "0px";
		leftSpacing  = "0px";
	}else{
		rightSpacing = "11px";
		leftSpacing  = "11px";
	}
	
	
	poGroup.style.css({
		position: "absolute",
		right: rightSpacing,
		left: leftSpacing,
		bottom: "0px",
		height: "54px"
	});
	
	_app.floatControl(poGroup);
};
 
/**
 * Layout의 Type명을 정의한다. 
 *    사용예 : Group.layoutClass["XYLayout"];
 * 
 * 
 * @author : append 2021-09-09  : kjj 
 */
GroupKit.prototype.layoutClass = {
	   "XYLayout"          : cpr.controls.layouts.XYLayout 
	 , "ResponsiveXYLayout": cpr.controls.layouts.ResponsiveXYLayout
	 , "VerticalLayout"    : cpr.controls.layouts.VerticalLayout
	 , "FlowLayout"        : cpr.controls.layouts.FlowLayout
} ;

/**
 * contaner 의 layout type을 반환한다. 
 * 사용예 :
 *    Group.getLayoutType( "voGroup001"" ) == "XYLayout"
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} psContainer id
 * @return {String}  : [ XYLayout , ResponsiveXYLayout, VerticalLayout, FlowLayout, FlowLayout ]
 * @author : append 2021-09-09  : kjj 
 */
GroupKit.prototype.getLayoutTypeString = function(app, psContainer){  
	var poContainer = app.lookup(psContainer) ;
	
	if( poContainer == null || poContainer == undefined ) return "" ;
	
	var voLayout = poContainer.getLayout() ;
	
	var vLayoutNm = "XYLayout" ;
	  
	if( voLayout instanceof cpr.controls.layouts.XYLayout){
		vLayoutNm = "XYLayout" ;
	}else if( voLayout instanceof cpr.controls.layouts.ResponsiveXYLayout){
		vLayoutNm = "ResponsiveXYLayout" ; 
	}else if( voLayout instanceof cpr.controls.layouts.VerticalLayout){
		vLayoutNm = "VerticalLayout" ; 
	}else if( voLayout instanceof cpr.controls.layouts.FlowLayout){
		vLayoutNm = "FlowLayout" ; 
	} 
	return vLayoutNm ; 
	
} ;

/**
 * contaner 의 layout type을 반환한다. 
 * 사용예 :
 *    Group.getLayoutType( voGroup001 ) instanceof cpr.controls.layouts.XYLayout
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {cpr.controls.Container} psContainer id
 * @return {cpr.controls.layouts}  : cpr.controls.layouts.XYLayout , cpr.controls.layouts.ResponsiveXYLayout, cpr.controls.layouts.VerticalLayout, cpr.controls.layouts.FlowLayout, cpr.controls.layouts.FlowLayout
 * @author : append 2021-09-09  : kjj 
 */
GroupKit.prototype.getLayoutType = function(app, psContainer){   
	 
	var vLayoutNm = this.getLayoutTypeString(app, psContainer); 
	 
	return this.layoutClass[vLayoutNm] ; 
	
} ;

/**
 * 그룹에 속해있는 컨트롤의 데이터를 초기화 한다.
 * @param {any} app
 * @param {#Container} psGrpId
 */
GroupKit.prototype.clear = function(app, psGrpId) {
	var _app = app;
	var targetGrp = _app.lookup(psGrpId);
	var _appkit_ = this._appKit;
	var bindContext = _appkit_.Group.getBindContext(_app, targetGrp);
	
	if (bindContext) {
		if (bindContext.grid) {
			this._appKit.FreeForm.revertRow(_app, psGrpId);
		} else if (bindContext.dataSet) {
			var voDs = bindContext.dataSet;
			
			var vnRowIndex = bindContext.rowIndex;
			//데이터 Revert
			var rowData = voDs.getRow(vnRowIndex).getRowData();
			var vsGridRowState = voDs.getRowState(vnRowIndex);
			for (var column in rowData) {
				voDs.setValue(vnRowIndex, column, voDs.getOriginalValue(vnRowIndex, column));
			}
			//2019.11.21 추가
			if (vsGridRowState == cpr.data.tabledata.RowState.INSERTED) {
				voDs.setRowState(vnRowIndex, vsGridRowState);
			}
			
			_appkit_.Control.redraw(_app, targetGrp.id);
		} else if (bindContext.dataMap) {
			
			var voDm = bindContext.dataMap;
			
			var colNms = voDm.getColumnNames();
			
			colNms.forEach(function(each) {
				voDm.setValue(each, voDm.getOriginalValue(each));
			});
			
			_appkit_.Control.redraw(_app, targetGrp.id);
		} else {
			var targetGrp = _app.lookup(psGrpId);
			
			targetGrp.getAllRecursiveChildren().forEach(function(each) {
				if (each.type == "output" || each.type == "button") return false;
				
				each.value = "";
			});
		}
	} else {
		var targetGrp = _app.lookup(psGrpId);
		
		targetGrp.getAllRecursiveChildren().forEach(function(each) {
			if (each instanceof cpr.controls.Container) {
				each.getAllRecursiveChildren().forEach(function(child) {
					if (child.type == "output" || child.type == "button") return false;
					
					child.value = "";
				});
			} else if (each instanceof cpr.controls.UDCBase) {
				var embApp = each.getEmbeddedAppInstance();
				var children = embApp.getContainer().getAllRecursiveChildren();
				
				children.forEach(function(udcChild) {
					if (udcChild instanceof cpr.controls.Container) {
						_appkit_.Group.clear(embApp, udcChild.id);
					} else {
						if (udcChild.type == "output" || udcChild.type == "button") return false;
						
						udcChild.value = "";
					}
				});
			} else {
				if (each.type == "output" || each.type == "button") return false;
				
				each.value = "";
			}
			
		});
	}
}

/**
 * pc/mobile 화면보기 전환
 * @param {cpr.core.AppInstance} app
 * @param {"pc" | "mobile"} screenName
 */
GroupKit.prototype.changeScreen = function(app, screenName){
	
	var that = this;
	var actions = {
		pc: function() {
			app.getContainer().style.css("min-width", "1340px");
			that.getAllChildrenByType(app, "container", app.getContainer(), true).forEach(function(each) {
				if (each._RForm) each._RForm._restore();
			});

		},
		mobile: function() {
			app.getContainer().style.css("min-width", "none");
			that.getAllChildrenByType(app, "container", app.getContainer(), true).forEach(function(each) {
				if (each._RForm) {
					each._RForm._transform(each._RForm._columnSettings["mobile"]);
				}
			})

		}
	}
	actions[screenName]();
}



/**
 * 메인 MDI 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function MDIKit(appKit){
	this._appKit = appKit;
};

/**
 * close 메인 MDI의 탭으로 화면을 오픈한다.<br>
 * - Root App에 해당 함수 필요(doOpenMenuToMdi)<br>
 * - 사이트별 Customizing 필요
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#mdifolder} psMenuId 메뉴ID
 */
MDIKit.prototype.open = function(app, psMenuId, poParam){
	if(app.getRootAppInstance().hasAppMethod("doOpenMenuToMdi")){
		app.getRootAppInstance().callAppMethod("doOpenMenuToMdi", psMenuId, poParam);		
	}
};

/**
 * Msg(메시지) 유틸<br>
 * language.json 참조
 * @constructor
 * @param {common.module} appKit
 */
function MsgKit(appKit){
	this._appKit = appKit;
};

/**
 * 메시지 ID에 해당되는 메시지를 반환한다.
 * @param {String} psMsgId  메시지 ID
 * @param {String | Array} paArgs 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return {String} 메시지 문자열
 */
MsgKit.prototype.getMsg = function(psMsgId, paArgs) {
    if (psMsgId == null || psMsgId == "") return "";
    var psMsg = cpr.I18N.INSTANCE.message("NLS-"+psMsgId);
    if (psMsg == null || psMsg.indexOf("NLS-") >= 0) { return psMsgId.replace(/\\n/gi, "\n"); }
    
    if(!ValueUtil.isNull(paArgs)){
    	if(!(paArgs instanceof Array)){
    		paArgs = [paArgs];
    	}
    	//정규 표현식 사용하여 동적 메시지 치환
    	var regExp = psMsg.match(/\{[0-9]+\}/ig);
		regExp.forEach(function(/* String */ exp){
			var idx = ValueUtil.fixNumber(exp.replace("{", "").replace("}", "").trim());
			psMsg = psMsg.replace(exp, new String(paArgs[idx]).replace(/\r\n/ig, ""));
		});
    }
    
    return psMsg.replace(/\\n/ig, "\n");
};

/**
 * 확인 선택용 Confirm 메시지 박스를 띄운다.
 * <pre><code>
 * Msg.confirm("CRM-M001");<br>
 * <p>또는</p><br>
 * Msg.confirm("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지 ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return {Boolean} Confirm 창의 확인 결과
 */
MsgKit.prototype.confirm = function(psMsgId, paArgs) {
	return confirm(this.getMsg(psMsgId, paArgs));
};

/**
 * Confirm 에 해당하는 메시지, CFM 에 등록된 메세지만 가져옵니다.<br>
 * ex) Msg.confirm("CMN00002"); -> CFM-CMN00002 : 저장하시겠습니까?
 *
 * @param {cpr.core.AppInstance} app - 앱인스턴스 객체
 * @param {String} psMsgId 메시지 ID
 * @param {Array || String} paArgs 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @param {Function} callFunClose 확인을 클릭시 동작하는 내용 
 * @param {Function} callFunCancel 취소을 클릭시 동작하는 내용 
 * @param {String} closeBtnValue  확인버튼 "확인" 값 커스텀 (Optional)
 * @param {String} cancleBtnValue  취소버튼 "취소" 값 커스텀 (Optional) 
 * @param {psTitle} psTitle  메시지 영역의 타이틀 명  (Optional) 
 * @return {Boolean} Confirm 창의 확인 결과
 */
MsgKit.prototype.confirmDlg = function(app, psMsgId, psaArgs, callFunClose, callFunCancel, closeBtnValue, cancleBtnValue, psTitle) {
	return this._appKit.showMsg(app, "confirm", this.getMsg(psMsgId, psaArgs), callFunClose, null, callFunCancel, closeBtnValue, null, cancleBtnValue, psTitle);
};


/**
 * 메시지 구독대상에게 알림처리 한다.<br>
 * (main.clx의 cpr.core.NotificationCenter.INSTANCE.subscribe()
 * <pre><code>
 * Msg.notify(app, "CMN-M001");
 * </code></pre>
 * @param {cpr.core.AppInstance} app 앱인스턴스 객체
 * @param {String} psMsgId 메시지ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @param {"INFO" | "WARNING" | "DENGER"} psMsgType? 출력타입 (default : INFO)
 * @param {Number} pnDelay? notify 사용시 알림창이 표시되는 시간 설정
 * @param {Boolean} pbKeep? 이전 메시지를 유지시킬지 여부 
 * @return void
 */
MsgKit.prototype.notify = function(app, psMsgId, paArgs, psMsgType, pnDelay) {
	
	var voMsgInfo = {};
	voMsgInfo.TYPE = psMsgType;
	voMsgInfo.MSG = this.getMsg(psMsgId, paArgs);
	if(pnDelay != null){
		voMsgInfo.DELAY = pnDelay;
	}
	cpr.core.NotificationCenter.INSTANCE.post(AppProperties.MSG_TOPIC_ID, voMsgInfo);
	
	/* 헤더에 메시지 표현.
	var _app = this._appKit.getMainApp(app);
	_app = _app != null ? _app : app;
	
	var vaChildCtrls = _app.getContainer().getChildren();
	var vaSubChildCtrls = null;
	var appHeader = null;
	for (var i=0, len=vaChildCtrls.length; i<len; i++) {
        if (vaChildCtrls[i] instanceof udc.com.appHeader ) {
        	appHeader = vaChildCtrls[i];
        	break;
        }else if(vaChildCtrls[i].type == "container" && vaChildCtrls[i].style.getClasses().indexOf("header-box") != -1){
        	vaSubChildCtrls = vaChildCtrls[i].getChildren();
        	for (var j=0, jlen=vaSubChildCtrls.length; j<jlen; j++) {
        		if (vaSubChildCtrls[j] instanceof udc.com.appHeader ) {
		        	appHeader = vaSubChildCtrls[j];
		        	break;
		        }
        	}
        	if(appHeader != null) break;
        }
    }
    //갱신된 데이터가 조회되었습니다. 메시지 유지 여부 설정
    if(!ValueUtil.isNull(_app.__keep_msg)){
    	psMsgId = _app.__keep_msg;
    	_app.__keep_msg = "";
    }else{
    	if(ValueUtil.fixBoolean(pbKeep)) app.__keep_msg = psMsgId;
		else _app.__keep_msg = "";
    }
    
    if(appHeader){
    	var embApp = appHeader.getEmbeddedAppInstance();
		var vcOptMsg = embApp.lookup("optAppMsg");
		var vcNotifier = embApp.lookup("notiInfo");
		var vsNotiMsg = this.getMsg(psMsgId, paArgs);
		if(vcNotifier.visible){
			vcNotifier.info(vsNotiMsg);
		}
		vcOptMsg.value = vsNotiMsg;
		vcOptMsg.style.animateFrom({
			"transform": "translateY(-30px) ",
			"opacity": "0"
		});
    }*/
};

/**
 * 메시지를 웹브라우저의 alert 알림창으로 띄운다.
 * <pre><code>
 * Msg.alert("CMN-M001");<br>
 * <p>또는</p><br>
 * Msg.alert("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 */
MsgKit.prototype.alert = function(psMsgId, paArgs) {
    alert(this.getMsg(psMsgId, paArgs));
};

/**
 * 메시지 출력 alert
 * @param {cpr.core.AppInstance} app - 앱인스턴스 객체
 * @param {} psMsgId 메시지ID
 * @param {Array || String} psaArgs 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @param {Function} callFunClose 확인을 클릭시 동작하는 내용 
 * @param {String} closeBtnValue  확인버튼 "확인" 값 커스텀 (Optional)
 * @return {Boolean} Confirm 창의 확인 결과
 * @param {psTitle} psTitle  메시지 영역의 타이틀 명  (Optional) 
 */
MsgKit.prototype.alertDlg = function(app, psMsgId, psaArgs, callFunClose, closeBtnValue, psTitle) {
	return this._appKit.showMsg(app, "alert", this.getMsg(psMsgId, psaArgs), callFunClose, null, null, closeBtnValue, null, null, psTitle);
};

/**
 * alert 박스를 띄운다.
 * <pre><code>
 * Msg.alert("CRM-M001");<br>
 * <p>또는</p><br>
 * Msg.confirm("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지 ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 */
MsgKit.prototype.alertDialog = function(app, psMsgId, paArgs) {
	this._appKit.Dialog.open(app, "app/cmn/alert", 350, 260, null, this.getMsg(psMsgId, paArgs))
};

/**
 * 확인 선택용 Confirm 메시지 박스를 띄운다.
 * <pre><code>
 * Msg.confirm("CRM-M001");<br>
 * <p>또는</p><br>
 * Msg.confirm("CRM-M016", ["선택된 파일"]);
 * </code></pre>
 * @param {String} psMsgId 메시지 ID
 * @param {String | Array} paArgs? 메시지 내용 중 @로 표시된 부분 넣어줄 데이터 배열
 * @return {Boolean} Confirm 창의 확인 결과
 */
MsgKit.prototype.confirmDialog = function(app, psMsgId, paArgs, pfCloseCallback) {
	return this._appKit.Dialog.open(app, "app/cmn/confirm", 350, 260, pfCloseCallback, this.getMsg(psMsgId, paArgs))
};








/**
 * 리스트 형태 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function SelectKit(appKit){
	this._appKit = appKit;
};

/**
 * 입력한 index의 위치에 새로운 item을 추가한다.
 * <pre><code>
 * SelectCtl.addItem(app, "cmb1", "라벨1", "값1");<br>
 * <p>또는</p><br>
 * SelectCtl.addItem(app, "cmb1", "라벨1", "값1", 0);
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		 select ID (only Combo, List, Radio, CheckBox Group)
 * @param {String} psLabel		 추가할 item의 label
 * @param {String} psValue		 추가할 item의 value
 * @param {Number} pnIndex? 추가할 item의 index (default는 마지막 행 뒤에 추가됨)
 * @return void 
 */
SelectKit.prototype.addItem = function(app, psCtlId, psLabel, psValue, pnIndex){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var item;
	
	if(ValueUtil.isNull(pnIndex)){
		vcCtl.addItem(new cpr.controls.Item(psLabel, psValue));
	}else{
		if(pnIndex >= 0 && pnIndex <= vcCtl.getItemCount()){
			if(pnIndex == 0){
				item = vcCtl.getItem(pnIndex);
				vcCtl.insertItemBefore(new cpr.controls.Item(psLabel, psValue), item);
			} else {
				item = vcCtl.getItem(pnIndex - 1);
				vcCtl.insertItemAfter(new cpr.controls.Item(psLabel, psValue), item);
			}
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 라벨(label)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 라벨값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemLabel(app, "cmb1");<br>
 * <p>또는</p><br>
 * SelectCtl.getItemLabel(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @return {String | Array}	multiple : true 일 경우 Array(String)<br>
 * 							multiple : false 일 경우 String
 * @param {Number} pnIndex? 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)<br>
 * 							multiple : false 일 경우 String
 */
SelectKit.prototype.getItemLabel = function(app, psCtlId, pnIndex){
	var vcCtl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = vcCtl.getSelectionFirst();
		return item ? item.label : "";
	}else{
		if(vcCtl.multiple){//다중 선택 가능한 경우 라벨 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = vcCtl.getItem(vaIdx[i]).label;
			}
			return vaIdx;
		}else{
			return vcCtl.getItem(pnIndex).label;
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 값(value)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 value 값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemValue(app, "cmb1");<br>
 * <p>또는</p><br>
 * SelectCtl.getItemValue(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {Number} pnIndex? 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)<br>
 * 							multiple : false 일 경우 String
 */
SelectKit.prototype.getItemValue = function(app, psCtlId, pnIndex){
	/**@type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = vcCtl.getSelectionFirst();
		return item ? item.value : "";
	}else{
		if(vcCtl.multiple){//다중 선택 가능한 경우 값 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = vcCtl.getItem(vaIdx[i]).value;
			}
			return vaIdx;
		}else{
			return vcCtl.getItem(pnIndex).value;
		}
	}
};

/**
 * 지정한 인덱스(Index)의 아이템 값(value)을 반환한다.<br>
 * multiple "true"의 경우 index에 해당하는 여러 value 값을 알고자 할 때, pnIndex는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.getItemValue(app, "cmb1", "1,2,3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {Number} pnIndex? 인덱스 번호
 * @return {String | Array}	multiple : true 일 경우 Array(String)<br>
 * 							multiple : false 일 경우 String
 */
SelectKit.prototype.getValue = function(app, psCtlId, pnIndex){
	/**@type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	if(ValueUtil.isNull(pnIndex)){
		var item = ctrl.getSelectionFirst();
		return item ? item.value : "";
	}else{
		if(ctrl.multiple){//다중 선택 가능한 경우 값 배열 반환
			var vaIdx = ValueUtil.split(pnIndex, ",");
			for(var i=0, len=vaIdx.length; i<len; i++){
				vaIdx[i] = ctrl.getItem(vaIdx[i]).value;
			}
			return vaIdx;
		}else{
			return ctrl.getItem(pnIndex).value;
		}
	}
};

/**
 * 컨트롤의 값을 셋팅한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {String} psValue  컨트롤값
 * @param {boolean} pbEmitEvent? value-changed 이벤트 발생시킬지 여부
 */
SelectKit.prototype.setValue = function(app, psCtlId, psValue, pbEmitEvent){
	/**@type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	if(pbEmitEvent != undefined && pbEmitEvent === false){
		ctrl.putValue(psValue);
	}else{
		ctrl.value = psValue;
	}
};

/**
 * 현재 선택 중인 아이템의 index를 반환한다.<br>
 * multiple "true"의 경우, index는 배열의 형태로 반환된다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		select ID
 * @return {Number | Array}	multiple : true 일 경우 Array(Number)<br>
 * 							multiple : false 일 경우 Number 		
 */
SelectKit.prototype.getSelectedIndex = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var vaItems = vcCtl.getSelection();
	if(vcCtl.multiple){
		var vaIndices = new Array();
		for(var i=0, len=vaItems.length; i<len; i++){
			vaIndices.push(vcCtl.getIndex(vaItems[i]));
		}
		return vaIndices;
	}else{
		return vcCtl.getIndex(vaItems[0]);
	}
};

/**
 * 인덱스(Index) 또는 value에 해당하는 아이템(Item)을 선택한다.<br>
 * multiple "true"의 경우 여러 개의 아이템을 선택하고자 할 때, puRowIdx는 구분자를 기준으로 조인된 String 형태를 가진다.
 * <pre><code>
 * SelectCtl.selectItem(app, "cmb1", "0");<br>
 * <p>또는<p>
 * SelectCtl.selectItem(app, "cmb1", "값1,값2,값3");
 * </code></pre>
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId		컨트롤ID
 * @param {String | Array} puRowIdx 인덱스 또는 value 값
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return {Boolean} 
 */
SelectKit.prototype.selectItem = function(app, psCtlId, puRowIdx, emitEvent){
	/**@type cpr.controls.CheckBoxGroup */
	var vcCtl = app.lookup(psCtlId);
	
	if(vcCtl == null || vcCtl == undefined) return false;
	
	puRowIdx = ValueUtil.split(puRowIdx, ",");
	if(vcCtl.multiple){//다중 선택 가능한 경우
		if(puRowIdx.length > 0){
			if(!ValueUtil.isNumber(puRowIdx[0])){
				for(var i=0, len=puRowIdx.length; i<len; i++){
					puRowIdx[i] = vcCtl.getIndexByValue(puRowIdx[i]);
				}
			}
			vcCtl.selectItems(puRowIdx, emitEvent);
		}
	}else{
		if(puRowIdx.length > 0){
			if(!ValueUtil.isNumber(puRowIdx[0])){
				var item = vcCtl.getItemByValue(puRowIdx[0]);
				if(item) vcCtl.selectItemByValue(puRowIdx[0], emitEvent);
				else vcCtl.selectItem(0, emitEvent);
			} else {
				if(Number(puRowIdx[0]) >= vcCtl.getItemCount()){
					vcCtl.selectItem(0, emitEvent);
				}else{
					vcCtl.selectItem(puRowIdx[0], emitEvent);
				}
			}
		}
	}
	
	return true;
};

/**
 * 모든 아이템을 선택한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @return void
 */
SelectKit.prototype.selectAllItem = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	var indices = new Array();
	for(var i=0, len=vcCtl.getItemCount(); i<len; i++){
		indices.push(i);
	}
	vcCtl.selectItems(indices);
};

/**
 * 해당 컨트롤 아이템을 필터링 한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @param {String} psCondition 필터 조건
 * @return void
 */
SelectKit.prototype.setFilter = function(app, psCtlId, psCondition){
	/** @type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	ctrl.setFilter("value == null || value == '' || ("+ psCondition +")");
};

/**
 * 컨트롤의 필터링을 해제한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @return void
 */
SelectKit.prototype.clearFilter = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	ctrl.clearFilter();
};

/**
 * 콤보박스의 값을 Reset한다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 */
SelectKit.prototype.reset = function(app, psCtlId){
	/** @type cpr.controls.ComboBox */
	var vcCtl = app.lookup(psCtlId);
	if(vcCtl.dataSet){
		vcCtl.dataSet.clear();
	}
	vcCtl.value = "";
};


/**
 * 필터링 할 컬럼명(psFilterColumnName)은 데이터셋의 컬럼명을 작성한다.<br>
 * 그리드에서 사용 금지<br>
 * @desc 두 개의 List형 컨트롤이 종속 관계를 가질 때, 종속되는 컨트롤의 데이터를 필터링하기 위한 메소드
 * @param {#uicontrol} psMainId				 메인 컨트롤 ID
 * @param {#uicontrol} psSubId				 적용될 컨트롤 ID
 * @param {#column} psFilterColumnName	 적용될 컨트롤의 필터링 할 컬럼명
 * @param {Boolean} pbFirstItemSelect?  첫번째 아이템 선택 여부  default : true
 * @return void
 */
SelectKit.prototype.cascadeList = function(app, psMainId, psSubId, psFilterColumnName, pbFirstItemSelect){
	var voMainCtl = app.lookup(psMainId);
	var voSubCtl = app.lookup(psSubId);

	if(voMainCtl == null || voSubCtl == null){
		return;
	}
	pbFirstItemSelect = pbFirstItemSelect == null ? true : pbFirstItemSelect;

	var vaItems = voMainCtl.getSelection();
	var vsValue = "";
	if(vaItems.length > 0){
		vsValue = vaItems[0].value;
	}

	voSubCtl.clearFilter();

	var voFirstItem = voSubCtl.getItem(0);
	var vsFirstItemValue = voFirstItem.value;
	var vsFirstItemLable = voFirstItem.label;

	//'전체' 아이템 여부
	var vbAllStatus = false;
	//var vsGlsAll = cpr.I18N.INSTANCE.message("UI-GLS-ALL");
	var vsGlsAll = "전체";

	if( vsGlsAll ==  vsFirstItemLable && ( ValueUtil.isNull(vsFirstItemValue) || vsFirstItemValue.indexOf("%") != -1)){
		vbAllStatus = true;
	}

	//전체아이템이 포함됐을 경우
	if(vbAllStatus)	{
		var vsFilter = psFilterColumnName + "== '" + vsValue + "' || ( label == '" +  vsGlsAll + "' && (value == '' || value == '%'))";
		voSubCtl.setFilter(vsFilter);
		if(pbFirstItemSelect)
			this.selectItem(app, psSubId, 0);
	}else{
		voSubCtl.setFilter(psFilterColumnName + "== '" + vsValue + "'");
		if(pbFirstItemSelect){
			var vaSubCtlItems = voSubCtl.getItems();
			if(vaSubCtlItems.length > 0){
				this.selectItem(app, psSubId, vaSubCtlItems[0].value);
			}else{
				this.selectItem(app, psSubId, 0);
			}
		}

	}

	voSubCtl.redraw();
};

/**
 * 콤보박스에 매핑된 데이터셋의 컴럼값을 입력조건에 따라 가져온다.
 * @param {cpr.core.AppInstance} 	app 앱인스턴스
 * @param {#uicontrol} psCtlId	컨트롤ID
 * @param {String} psColName 찾을 컬럼명
 * @param {String} condition 조건 (예: "CD == 'test'")
 * @return {String} 컬럼값
 */
SelectKit.prototype.findValue = function(app, psCtlId, psColName, condition){
	/** @type cpr.controls.ComboBox */
	var ctrl = app.lookup(psCtlId);
	if(ctrl.dataSet){
		var findRow = ctrl.dataSet.findFirstRow(condition);
		if(findRow) {
			return findRow.getValue(psColName);
		}
	}
};



/**
 * 서브미션 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function SubmissionKit(appKit){
	this._appKit = appKit;
};

/**
 * Submission Before Handler<br/>
 * 사이트별 Customizing 필요<br/>
 *  - 시스템 컬럼 수정 필요 (CRT_USER_ID, CRT_PGM_ID, CRT_IP_MAC, UPD_USER_ID, UPD_PGM_ID, UPD_IP_MAC)
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onBeforeSubmit = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submit = e.control;
	var _app = submit.getAppInstance();
	 

	//for.AUTO SAVE
	submit.setDataRowHandler(function(/** @type cpr.data.Row */ rowdata) {
		var additionalValue = {};
		//PK키 original값 추가
		var dsInfo = rowdata.getDataSetInfo();
		if(dsInfo && (rowdata.getState() == cpr.data.tabledata.RowState.UPDATED || cpr.data.tabledata.RowState.DELETED)){
			var vaPks = dsInfo.split(",");
			vaPks.some(function(value, idx){
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				if(value == "") return false;
				
				additionalValue[value + "__origin"] = rowdata.getOriginalValue(value);
			});
		}else if(dsInfo && (rowdata.getState() == cpr.data.tabledata.RowState.INSERTED)){
			var vaPks = dsInfo.split(",");
			vaPks.some(function(value, idx){
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				if(value == "") return false;
				
				additionalValue[value + "__origin"] = rowdata.getValue(value);
			});
		}
		
		return additionalValue;
	});
};

/**
 * Submission Receive Handler<br/>
 * 사이트별 Customizing 필요<br/>
 *  - 1. 에러메시지 키 변경 필요
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Boolean} pbSuccess
 * @private
 */
SubmissionKit.prototype._onSubmitReceive = function(e, pbSuccess) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var xhr = submission.xhr;
	var contentType = xhr.getResponseHeader("Content-Type");
	if(contentType == null) return true;
	
	contentType = contentType.toLowerCase();
	if (contentType.indexOf(";") > -1) {
		contentType = contentType.substring(0, contentType.indexOf(";"));
	}
	contentType = ValueUtil.trim(contentType);
	if ("application/json" != contentType || "text/tab-separated-values" == contentType) {
		return true;
	}
	
	var response = xhr.responseText;
	var jsonRes = JSON.parse(response);
	
	var errMsgInfo = jsonRes["ERRMSGINFO"];
	if (errMsgInfo) {
		var vsErrMsg = "";
		try{
			var vsErrMsg = "\"" +  errMsgInfo.ERRMSG+ "\"";
			vsErrMsg = Function('"use strict";return (' + vsErrMsg + ')')();	
//			vsErrMsg = eval("\"" +  errMsgInfo.ERRMSG+ "\"");	
		}catch(e){
			vsErrMsg = errMsgInfo.ERRMSG;
		}
		
		alert(vsErrMsg.replace(/\r\n/ig, "\n").replace(/\\n/gi, "\n"));
		var urlContext = top.location.pathname.substring(0, top.location.pathname.indexOf("/",2));
		if(urlContext == "/") urlContext = "";
		
		//사용자 세션없는 오류인 경우
		if(errMsgInfo.STATUSCODE == "401") {
			top.location.href = urlContext+"/";
		}
//		//사용자 세션없는 오류인 경우
//		if("CMN003.CMN@CMN003" == errMsgInfo.ERRCODE){
//			top.location.href = urlContext+"/logout.jsp";
//		//중복로그인 오류인 경우
//		}else if("CMN003.CMN@CMN062" == errMsgInfo.ERRCODE){
//			top.location.href = urlContext+"/logout.jsp";
//		}
		return false;
	}
		
	return true;
};

/**
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onSubmitLoadProgress = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var loadmask = this._getLoadMask(submission);
	if(loadmask){
		try {
			if( submission.responseType === "blob" ){
				loadmask.module.progress(e.total, e.loaded);
			}else if ( submission.responseType === "text" ){
				if(submission.getResponseDataCount() > 0){
					var rowCnt = submission.getResponseData(0).data.getRowCount();
					loadmask.module.count(rowCnt);
				}
			}
//			if(submission.getResponseDataCount() > 0){
//				var rowCnt = submission.getResponseData(0).data.getRowCount();
//				loadmask.module.count(rowCnt);
//			}
		}catch(ex){
			console.log(ex.toString());
			
		}
	}
};

/**
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onSubmitUploadProgress = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var loadmask = this._getLoadMask(submission);
	if(loadmask){
		loadmask.module.showProgress();
		//console.log(e.loaded + " : " + e.total);
		loadmask.module.progress(e.loaded, e.total);
	}
};

/**
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onSubmitProgress = function(e) {
	
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var loadmask = this._getLoadMask(submission);
	if(loadmask){
		loadmask.module.showProgress();
		//console.log(e.loaded + " : " + e.total);
		loadmask.module.progress(e.loaded, e.total);
	}
};


/**
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Boolean} pbSuccess
 * @private
 */
SubmissionKit.prototype._onSubmitSuccess = function(e, pbSuccess) {
	return pbSuccess;
};

/**
 * Submission Error Handler
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onSubmitError = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var _app = submission.getAppInstance();
	var msg = submission.getMetadata("ERRMSG");
	var code = submission.getMetadata("STATUSCODE");
	
	var xhr = e.control.xhr;
	var statusMsg = this._appKit.Msg.getMsg("ERR-" + xhr.status);
	
	msg = ValueUtil.isNull(msg) ? statusMsg : msg;	
	
	if(e.nativeEvent){
		msg = "network : " + e.nativeEvent.type;
	}else{
		if(ValueUtil.isNull(msg)){
		//시스템 내부 장애가 발생하였습니다.\n 관리자에게 문의 하시기 바랍니다.
			msg = "ERR-SRV"
		}
	}
	this._appKit.Msg.notify(_app, msg, null,"DANGER");
	this._appKit.coverPage(_app);
	return false;
};

/**
 * Submission Error Status Handler
 * 서브미션이 전송된 후 수신받은 서버의 응답상태코드가 200이 아닐 때 발생합니다.
 * error-status 이벤트 핸들러에서 이벤트의 preventDefault함수를 호출하면 서버의 응답메세지를 모두 수신한 후 submit-error이벤트를 발생시킵니다. 
 * preventDefault함수를 호출하지 않으면 서버의 응답메세지를 수신하지 않고 즉시 submit-error이벤트를 발생시킵니다.
 * 비동기로 동작할 때만 사용할 수 있습니다. 
 * @param {cpr.events.CSubmissionEvent} e
 * @private
 */
SubmissionKit.prototype._onSubmitErrorStatus = function(e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
//	var xhr = submission.xhr;
//	//에러코드
//	xhr.status;
	e.preventDefault();
	return false;
};


/**
 * Submission Done Handler<br/>
 * 1. 서버에서 생성된 최신 로우 찾기<br/>
 * 2. 어플리케이션 비즈니스 콜백 메소드 실행<br/>
 * 3. 로딩 마스크 제거<br/>
 * @param {cpr.events.CSubmissionEvent} e
 * @param {Function} poCallbackFunc
 * @param {Boolean} pbSuccess
 * @param {Boolean} pbAppDisable
 * @private
 */
SubmissionKit.prototype._onSubmitDone = function(e, poCallbackFunc, pbSuccess, pbAppDisable) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var submission = e.control;
	var _app = submission.getAppInstance();
	
	//마지막 행찾기
	var vsFindRowKey = submission.getMetadata("strFindRowKey");
	if(!ValueUtil.isNull(vsFindRowKey)){
		var vnDsCnt = submission.getRequestDataCount();
		var voDs, vaFindKey;
		var vaFindRowKeys = ValueUtil.split(vsFindRowKey, "|");
		var findKey = null;
		for(var i=0, len=vaFindRowKeys.length; i<len; i++){
			findKey = ValueUtil.trim(vaFindRowKeys[i]);
			if(findKey == "") continue;
			vaFindKey = ValueUtil.split(findKey, ":");
			if(vaFindKey.length == 2){
				for(var j=0; j<vnDsCnt; j++){
					voDs = submission.getRequestData(j).data;
					if(voDs.type != "dataset") continue;
					if(voDs.id == vaFindKey[0]){
						voDs._findRowCondition = vaFindKey[1];
						break;
					}
				}
			}else{
				for(var j=0; j<vnDsCnt; j++){
					voDs = submission.getRequestData(j).data;
					if(voDs.type != "dataset") continue;
					voDs._findRowCondition = vaFindKey[0];
				}
			}
		}
	}
	
	var loadmask = this._getLoadMask(submission);
	if(loadmask && loadmask.module.isVisibleProgress && loadmask.module.isVisibleProgress()){
		loadmask.module.progress(100, 100);	
	}
	
	var idx = this._appKit._activeSubmission.indexOf(submission);
	if(idx != -1) {
		this._appKit._activeSubmission.splice(idx, 1);
	}
	
	//실패한 경우.. 커버를 씌움
	if(pbAppDisable === true && pbSuccess != true){
		this._appKit.coverPage(_app);
	}
	
	submission.removeAllFileParameters();
	submission.removeAllParameters();
//	submission.removeAllEventListeners();

	//콜백이 존재하는 경우... 콜백함수 호출	
	//콜백을 제일 뒤로 옮김
	if (poCallbackFunc != null && (typeof poCallbackFunc == "function")) {
		poCallbackFunc(pbSuccess, e.control);
	}
	
	// submission success에서 다른 submission을 실행했을 경우 loadmask를 내리지 않는다.
	if(this._appKit._activeSubmission.length == 0) {
		// hide loadmask
		try{
			this._appKit.hideLoadMask(_app);
		}catch(ex){
			console.log(ex.toString());
		}
	}
};

/**
 * @param {cpr.protocols.Submission} poSubmission
 * @private
 */
SubmissionKit.prototype._getLoadMask = function(poSubmission) {
	var _app = poSubmission.getAppInstance();
	if(_app == null) return null;
	
	if(_app.isUDCInstance()){
		_app = _app.getHostAppInstance();
	}
	
	var _container = null;
	if(_app.getHost() && _app.getHost().modal === true){
		_container = _app.getContainer();
	}else{
		//_container = _app.getRootAppInstance().getContainer();
		_container = _app.getContainer();
	}
	_app = _container.getAppInstance();
	
	return _app.lookup("__loadmask__");
};

/**
 * 해당 서브미션 요청 데이터를 가지고 있는지 체크
 * @param {cpr.protocols.Submission} poSubmission 서브미션 객체
 * @param {String} psDataId  데이터셋/맵 ID
 * @private
 */
SubmissionKit.prototype._hasRequestData = function(poSubmission, psDataId){
	for(var i=0, len=poSubmission.getRequestDataCount(); i<len; i++){
		if(poSubmission.getRequestData(i).data.id == psDataId){
			return true;
		}
	}
	return false;
}

/**
 * 해당 서브미션 요청 데이터를 가지고 있는지 체크
 * @param {cpr.protocols.Submission} poSubmission  서브미션 객체
 * @param {String} psDataId 데이터셋/맵 ID
 * @private
 */
SubmissionKit.prototype._hasResponseData = function(poSubmission, psDataId){
	for(var i=0, len=poSubmission.getResponseDataCount(); i<len; i++){
		if(poSubmission.getResponseData(i).data.id == psDataId){
			return true;
		}
	}
	return false;
}

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {String} psParamName 파라미터의 이름
 * @param {String} psValue 파라미터의 값
 * @return void
 */
SubmissionKit.prototype.addParameter = function(app, psSubmissionId, psParamName, psValue){
	/** @type cpr.protocols.Submission */
	var vcSubmission = app.lookup(psSubmissionId);
	vcSubmission.addParameter(psParamName, psValue);
};

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {Array} paFiles 파일의 객체
 * @return void
 */
SubmissionKit.prototype.addFileParameter = function(app, psSubmissionId, paFiles){
	/** @type cpr.protocols.Submission */
	var vcSubmission = app.lookup(psSubmissionId);
	if(paFiles == null) return;
	if(paFiles instanceof Array){
		paFiles.forEach(function(voFile){
			vcSubmission.addFileParameter("exb.fileupload.filelist", voFile);
		});
	}else{
		vcSubmission.addFileParameter("exb.fileupload.filelist", paFiles);
	}
};

/**
 * 전송시 추가로 전달되는 파라미터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {#datamap | #dataset} psDataId 데이터셋 또는 데이터맵 ID
 * @param {String} psAlias? 요청 데이터의 Alias명(요청데이터 명칭이 다른 경우에만 지정)
 * @param {String} psPayloadType? 요청 데이터의 payloadType (all, modified)
 * @return void
 */
SubmissionKit.prototype.addRequestData = function(app, psSubmissionId, psDataId, psAlias, psPayloadType){
	/** @type cpr.protocols.Submission */
	var submission = app.lookup(psSubmissionId);
	submission.addRequestData(app.lookup(psDataId), psAlias, psPayloadType);
};

/**
 * 전송시 추가로 응답데이터를 추가합니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} psSubmissionId 서브미션 ID
 * @param {#datamap | #dataset} psDataId 데이터셋 또는 데이터맵 ID
 * @param {Boolean} pbAdd 데이터셋 옵션 설정된 데이터셋에 데이터를 모두 지우고 추가할지 기존 데이터를 남기고 추가 할지 여부
 * @param {String} psAlias? 응답 데이터의 Alias명(응답데이터 명칭이 다른 경우에만 지정)
 * @return void
 */
SubmissionKit.prototype.addResponseData = function(app, psSubmissionId, psDataId, pbAdd, psAlias){
	/** @type cpr.protocols.Submission */
	var submission = app.lookup(psSubmissionId);
	submission.addResponseData(app.lookup(psDataId), pbAdd, psAlias);
};

/**
 * 서브미션 호출<br/>
 * - 사이트별 Customizing 필요<br/>
 * - 서브미션에 before-submit,  receive, submit-error, submit-success, submit-done 이벤트 부여
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#submission} 	 psSvcId 서브미션 ID
 * @param {Function} successCallback 서브미션 후 콜백 메소드
 * @param {Boolean}  pbAppEnable? 서브미션 오류 및 exception 발생시 커버페이지를 씌움
 * @param {String} maskType
 */
SubmissionKit.prototype.send = function(app, psSvcId, successCallback, pbAppEnable, maskType){
	var _app = app;
	var submission = _app.lookup(psSvcId);
	if(!submission || submission.status == "SENDING") return;
//	if(!submission) return;
	
	//context-path를 고려하여, action URL이 ../로 시작하도록 변경
	if(submission.action.indexOf("/") == 0){
		submission.action = ".."+submission.action;
	}
	// multipart/form-data인 경우 maskType을 pro로 설정
//	if(submission.mediaType === "multipart/form-data") {
//		maskType="pro";
//	}
	
	//어플리케이션 전체에 마스크(Mask)를 씌운다.
	this._appKit.showLoadMask(app, maskType);
	
	if(submission.userAttr("responseType") === "TSV" || submission.fallbackContentType === "text/tab-separated-values")	{
		var loadmask = this._getLoadMask(submission);
		if ( submission.responseType === "text" ){
			loadmask.module.count(0);
			loadmask.module.show();
		}
		
		submission.addEventListener("submit-load-progress", function(e){
			_this._onSubmitLoadProgress(e);
		}); 
	}
	
	var vbSuccess = true;
	var _this = this;
	submission.addEventListenerOnce("before-submit", function(e){
		_this._onBeforeSubmit(e);
	});
	
	if(submission.mediaType==="multipart/form-data") {
		submission.addEventListener("submit-upload-progress", function(e){
			_this._onSubmitUploadProgress(e);
		});
	}
	
	if(submission.responseType === "blob"){
		submission.addEventListenerOnce("submit-progress", function(e){
			_this._onSubmitProgress(e);
		}); 	
	}
	
	submission.addEventListenerOnce("receive", function(e){
		vbSuccess = _this._onSubmitReceive(e);
	}); 
			
	submission.addEventListenerOnce("submit-error", function(e){
		vbSuccess = _this._onSubmitError(e);
	}); 
	
	submission.addEventListenerOnce("error-status", function(e){
		vbSuccess = _this._onSubmitErrorStatus(e);
	}); 
			
	submission.addEventListenerOnce("submit-success", function(e){
		vbSuccess = _this._onSubmitSuccess(e, vbSuccess);
	});
	
	submission.addEventListenerOnce("submit-done", function(e) {
		_this._onSubmitDone(e, successCallback, vbSuccess, pbAppEnable);
	});
	
	this._appKit._activeSubmission[this._appKit._activeSubmission.length] = submission;
	submission.send();
};



/**
 * 탭(TabFolder) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function TabKit(appKit){
	this._appKit = appKit;
};

/**
 * 현재 선택된 탭아이템 id를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tabfolder} psTabId 탭 ID
 * @return {Number} 탭아이템 id (탭아이템id는 인덱스와 유사 탭아이템 순서대로 id 부여됨)
 */
TabKit.prototype.getSelectedId = function(app, psTabId){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	var vcTabItem = vcTab.getSelectedTabItem();
	
	return vcTabItem ? vcTabItem.id : "";
};

/**
 * 현재 선택된 탭아이템 Text를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#TabFolder} psTabId 탭 Id
 * @return {Number} 탭아이템 Text (탭아이템id는 인덱스와 유사 탭아이템 순서대로 id 부여됨)
 */
TabKit.prototype.getSelectedNm = function(app, psTabId) {
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	var vcTabItem = vcTab.getSelectedTabItem();
	
	return vcTabItem ? vcTabItem.text : "";
	
};

/**
 * 입력한 id에 해당하는 탭 아이템을 선택한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tabfolder} psTabId 탭 ID
 * @param {Number} pnIndex 탭아이템 ID
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 */
TabKit.prototype.setSelectedTabItemById = function(app, psTabId, pnId, emitEvent){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	var vaTabItem = vcTab.getTabItems();
	var vcTabItem = vaTabItem.filter(function(item){
		return item.id == pnId;
	});
	
	var emit = emitEvent != undefined ? emitEvent : true;
	vcTab.setSelectedTabItem(vcTabItem[0], emit);
};

/**
 * 탭 페이지를 숨기거나/보여준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tabfolder} psTabId 탭ID
 * @param {Number} pnIndex 탭아이템 Index
 * @param {Boolean} pbVisible 숨김여부
 */
TabKit.prototype.setVisibleTabItem = function(app, psTabId, pnIndex, pbVisible){
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	var vaTabItem = vcTab.getTabItems();
	var vcTabItem = vaTabItem.filter(function(item){
		return item.id == pnIndex;
	});
	
	if(vcTabItem){
		vcTabItem[0].visible = pbVisible;
	}
};

/**
 * 탭 페이지 버튼을 활성화시키거나 비활성화 시킨다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tabfolder} psTabId 탭 ID
 * @param {String | Array} paIndex  활성화/비활성화 할 탭 Index 또는 Index 배열 (탭 index 시작 = 1) 
 * @param {Boolean} psEnable  활성화여부
 */
TabKit.prototype.setEnableTabItem = function(app, psTabId, paIndex, psEnable){
	/* 2019-05-13 ssb 작성 */
	/** @type cpr.controls.TabFolder */
	var vcTab = app.lookup(psTabId);
	
	if(!(paIndex instanceof Array)){
		paIndex = [paIndex];
	}
	var vaTabItem = vcTab.getTabItems();
	
	for (var i=0, len=paIndex.length; i<len; i++) {
		var vnTabIdx  = paIndex[i] - 1;
		vaTabItem[vnTabIdx].enabled = psEnable;
	}
};



/**
 * 트리(Tree) 컨트롤 유틸
 * @constructor
 * @param {common.AppKit} appKit
 */
function TreeKit(appKit){
	this._appKit = appKit;
};

/**
 * 트리 컨트롤 초기화.<br>
 *  - 사이트별 Customizing 필요
 * @param {any} app
 * @param {#tree} paTreeId
 */
TreeKit.prototype.init = function(app, paTreeId){
	if(!(paTreeId instanceof Array)){
		paTreeId = [paTreeId];
	}
	var _app = app;
	var _appKit = this._appKit;
	for (var i=0, len=paTreeId.length; i <len; i++) {
		/**
		 * @type cpr.controls.Tree
		 */
		var vcTree = (paTreeId[i] instanceof cpr.controls.Tree) ? paTreeId[i] : _app.lookup(paTreeId[i]);
		if(vcTree == null) continue;
		
		var vcDataSet =  vcTree.dataSet;
		vcDataSet._treeId = vcTree.id;
		var vsDataBindCtxId = vcTree.userAttr("bindDataFormId");
		
		if(vsDataBindCtxId != null && vsDataBindCtxId != ""){
			vcTree.addEventListener("selection-change", function(e){
				/**
				 * @type cpr.controls.Tree
				 */
				var tree = e.control;
				var voSelectedItem = e.newSelection[0];
				var itemIdx = tree.getIndex(voSelectedItem);
				var voContext = new cpr.bind.DataRowContext(vcDataSet, itemIdx);
				
				var freeformes = ValueUtil.split(vsDataBindCtxId, ",");
				freeformes.forEach(function(/* eachType */ formId){
					var vcGrp = _app.lookup(formId);
					vcGrp.setBindContext(voContext);
					
					vcGrp.redraw();
				});
			});
			
			//그룹 PK컬럼 enable 설정
			var vaPkColumnNames = ValueUtil.split(vcDataSet.info, ",");
			vaPkColumnNames.some(function(value, idx){
				if(value == "") return false;
				
				//프리폼 PK 컬럼 취득 
				if(!ValueUtil.isNull(vsDataBindCtxId)){
					var freeformes = ValueUtil.split(vsDataBindCtxId, ",");
					freeformes.forEach(function(/* eachType */ formId){
						/**@type cpr.controls.Container */
						var freeform = _app.lookup(formId);
						var vaChildCtrls = freeform.getChildren();
						vaChildCtrls.some(function(ctrl, idx){
							if(ctrl.type == "output") return false;
							if(ctrl.userAttr("ignorePk") == "Y") return false;
							
							var bind = ctrl.getBindInfo("value");
							if(bind && bind.type == "datacolumn" && value == bind.columnName){
								ctrl.bind("enabled").toExpression("getStateString() == 'I' ? true : false");
								ctrl.userAttr("required", "Y");
								ctrl.style.setClasses("require");
							}
						});
					});
				}
			});
			
			//마지막 작업행 findRow
			vcDataSet.addEventListener("update", function(/* cpr.events.CDataEvent */e){
				/** 
				 * @type cpr.data.DataSet
				 */
				var dataset = e.control;
				var rowIndex = e.row.getIndex();
				var vaPkColumns = ValueUtil.split(dataset.info, ",");
				if(vaPkColumns.length < 1){
					dataset._findTreeCondition = null;
				}else{
					var vaTempCond = [];
					vaPkColumns.forEach(function(column){
						vaTempCond.push(dataset.getValue(rowIndex, column));
					});
					
					if(vaTempCond.length > 0){
						dataset._findTreeCondition = vaTempCond.join("");
					}else{
						dataset._findTreeCondition = null;
					}
				}
			});
			
			//트리에 바인딩된 데이터셋(Dataset)이 로드될 때 처리
			//마지막행 찾기, 조회 건수 업데이트
			vcDataSet.addEventListener("load", function(/* cpr.events.CDataEvent */e){
				
				/** @type cpr.data.DataSet */
				var dataset = e.control;
				/** @type cpr.controls.Tree */
				var tree = _app.lookup(dataset._treeId);
				if(tree == null) return;
				
				//대상 그리드가 정렬된 상태라면... 정렬을 푼다.
				if(dataset.getSort() != ""){
					dataset.clearSort();
				}
				
				//마지막 작업행 찾기
				if(dataset.getRowCount() > 0) {
					if(dataset._findTreeCondition){
						
						cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(e){
							var voRow = dataset.findFirstRow(tree.itemSetConfig.value + "=='" + dataset._findTreeCondition + "'");
							var vnIdx = voRow.getIndex();
							tree.selectItem(vnIdx);
							tree.focusItem(tree.getItem(vnIdx));
						});
					}else{
						cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(e){
							var item = tree.getItem(0);
							_appKit.Tree.expandParentItem(_app, tree.id, item);
							tree.selectItem(0, true);
						});
					}
				}
				//마지막 작업행 정보 Clear
				dataset._findTreeCondition = null;
				
			});
		}
	}
};
/**
 * 현재 선택된 아이템의 value를 반환한다.
 * @param {cpr.core.AppInstance} 		app 앱인스턴스
 * @param {#tree} psTreeId	 트리 ID
 * @param {String} psDiv? 얻어올 값 영역(label 또는 value)
 * @return {String | Array}  multiple : true 일 경우 Array(String)<br>
 *                           multiple : false 일 경우 String  
 */
TreeKit.prototype.getSelectedValue = function(app, psTreeId, psDiv){
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(psTreeId);
	var vaItem = vcTree.getSelection();
	//아이템이 없으면... 공백 반환
	if(vaItem.length < 1) return "";
	
	psDiv = (psDiv != null ? psDiv.toUpperCase() : "VALUE");
	if(vcTree.multiple){
		var vaValues = new Array();
		vaItem.forEach(function(vcItem){
			if(psDiv == "LABEL")
				vaValues.push(vcItem.label);
			else
				vaValues.push(vcItem.value);
		});
		return vaValues;
	}else{
		return psDiv == "LABEL" ? vaItem[0].label : vaItem[0].value;
	}
};


/**
 * 입력한 value에 해당하는 아이템의 label 또는 parentValue를 반환한다.
 * @param {cpr.core.AppInstance} app
 * @param {#tree} psTreeId	트리 ID
 * @param {String} psValue	search value
 * @param {String} psDiv	가지고 오는 구분자 값(LABEL(디폴트), PVALUE)
 * @return {String}
 */
TreeKit.prototype.getItem = function(app, psTreeId, psValue, psDiv){
	var vcTree = app.lookup(psTreeId);
	if(!!psDiv) psDiv = psDiv.toUpperCase();
	psDiv = !!psDiv ? psDiv : "LABEL";

	try {
		var vaItem = vcTree.getSelection();
		if(!psValue && vcItem > 0) psValue = vaItem[0].value;
	} catch(e){
		return null;
	}

	var voItem = vcTree.getItemByValue(psValue);

	if(!voItem) return null;

	if(psDiv == "LABEL"){
		return voItem.label;
	} else {
		return voItem.parentValue;
	}
};

/**
 * 해당 아이템의 상위 아이템을 펼친다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId		 트리 ID
 * @param {Object} poItem		 item
 * @param {Boolean} pbHierarchy? 계층적으로 모든 상위까지 펼칠지 여부 (false인 경우, 바로 상위의 부모 아이템만 펼친다.)
 * @return void
 */
TreeKit.prototype.expandParentItem = function(app, psTreeId, poItem, pbHierarchy){
	/** @type cpr.controls.Tree */
	var vcTree = app.lookup(psTreeId); 
	var vaParentItem = new Array();
	pbHierarchy == !!pbHierarchy ? pbHierarchy : true;
	
	function checkExpandItem(poPItem){
		var item = vcTree.getItemByValue(poPItem.parentValue);
		if(item != null && item.value != "" && !vcTree.isExpanded(item)){
			vaParentItem.push(item);
			checkExpandItem(item);
		}
	}
	if(pbHierarchy){
		checkExpandItem(poItem);
	}else{
		vaParentItem.push(vcTree.getItemByValue(poItem.parentValue));
	}
	
	for(var i=0, len=vaParentItem.length; i<len; i++){
		if(vaParentItem[i]){
			vcTree.expandItem(vaParentItem[i]);	
		}
	}
};

/**
 * 트리 선택 아이템 변경 이벤트 발생시, 변경 이전에 선택된 아이템을 선택해준다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.events.CSelectionEvent} event 트리 선택 아이템 변경 이벤트
 * @param {Boolean} emitEvent? 이벤트(before-selection-change, selection-change)를 발생시킬지 여부
 * @return void
 */
TreeKit.prototype.selectBeforeRow = function(app, event, emitEvent) {
	/** @type cpr.controls.Tree */
	var vcTree = event.control;
	var emit = emitEvent === true ? true : false;
	
	var voOldSelection = event.oldSelection[0];
	var vsOldVal = voOldSelection.value;
	vcTree.selectItemByValue(vsOldVal, emit);
	vcTree.focusItem(voOldSelection);
};

/**
 * 입력한 label 또는 value에 해당하는 트리 아이템을 선택한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId	 트리 ID
 * @param {String} psValue	 search value
 * @param {String} psDiv	 가지고 오는 구분자 값(VALUE(디폴트), LABEL)
 * @return void
 */
TreeKit.prototype.selectItem = function(app, psTreeId, psValue, psDiv){
	var vcTree = app.lookup(psTreeId);

	if(!!psDiv) psDiv = psDiv.toUpperCase();
	psDiv = !!psDiv ? psDiv : "VALUE";

	if(psDiv == "VALUE"){
		vcTree.selectItemByValue(psValue);
	} else {
		vcTree.selectItemByLabel(psValue);
	}
};

/**
 * 아이템에 해당하는 모든 child item을 펼치거나 닫습니다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId		트리 ID
 * @param {Boolean} pbExpand	펴기 : true, 닫기 : false
 * @param {Object} poItem?		item 생략가능 (default 최상위 item)
 * @return void
 */
TreeKit.prototype.expandAllItems = function(app, psTreeId, pbExpand, poItem){
	var vcTree = app.lookup(psTreeId);

	if(!!poItem){
		if(pbExpand){
			vcTree.expandItem(poItem);
			vcTree.expandAllItems(poItem);
		} else {
			vcTree.collapseItem(poItem);
			vcTree.collapseAllItems(poItem);
		}
	} else {
		pbExpand ? vcTree.expandAllItems() : vcTree.collapseAllItems();
	}

};

/**
 * 현재 선택된 트리 인덱스
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#tree} psTreeId		트리 ID
 * @return {Number} 현재 선택된 트리 인덱스
 */
TreeKit.prototype.getIndex = function(app, psTreeId){
	
	/**@type cpr.controls.Tree */
	var vcTree = app.lookup(psTreeId);
	var selectItem = vcTree.getSelectionFirst();
	if(selectItem){
		return selectItem.row.getIndex();	
	}
	return null;
};







exports.AppStackKit = AppStackKit;
exports.ComUdcBtnKit = ComUdcBtnKit;
exports.ControlKit = ControlKit;
exports.DataMapKit = DataMapKit;
exports.DataSetKit = DataSetKit;
exports.DialogKit = DialogKit;
exports.EmbeddedAppKit = EmbeddedAppKit;
exports.FreeFormKit = FreeFormKit;
exports.GridKit = GridKit;
exports.GroupKit = GroupKit;
exports.MDIKit = MDIKit;
exports.MsgKit = MsgKit;
exports.SelectKit = SelectKit;
exports.SubmissionKit = SubmissionKit;
exports.TabKit = TabKit;
exports.TreeKit = TreeKit;
