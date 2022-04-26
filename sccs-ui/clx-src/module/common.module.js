/************************************************
 * 각 화면에 대한 그리드/폼 변경내역체크, 유효성검증, 메뉴정보, 사용자정보 및 필수적인 공통 함수들을 제공
 * 각 사이트별 커스터마이징하여 사용
 * version 2.0
 ************************************************/
function AppKit() {
	var extension = cpr.core.Module.require("module/extension");
	
	this._activeLoadMask = null;
	this._activeSubmission = [];
	
	this.AppStack = new extension.AppStackKit(this);
	this.Auth = new AppAuthKit(this);
	this.ComUdcBtn = new extension.ComUdcBtnKit(this);
	this.Control = new extension.ControlKit(this);
	this.DataMap = new extension.DataMapKit(this);
	this.DataSet = new extension.DataSetKit(this);
	this.Dialog = new extension.DialogKit(this);
	this.EmbApp = new extension.EmbeddedAppKit(this);
	this.FreeForm = new extension.FreeFormKit(this);
	this.Validator = new Validator(this);
	this.Grid = new extension.GridKit(this);
	this.Group = new extension.GroupKit(this);
	this.MDI = new extension.MDIKit(this);
	this.Msg = new extension.MsgKit(this);
	this.SelectCtl = new extension.SelectKit(this);
	this.Submit = new extension.SubmissionKit(this);
	this.Tab = new extension.TabKit(this);
	this.Tree = new extension.TreeKit(this);
	// 밸리데이션 다건체크(보더, 메시지추가)
	this.Validator2 = new Validator2(this);
};

/**
 * 화면에 LoadMask 출력
 * 비동기 서브미션 호출시 화면에 로딩 이미지 출력
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} maskType?
 */
AppKit.prototype.showLoadMask = function(app, maskType) {
	var isPopup = false;
	if(app.getHost() && app.getHost().modal === true){
		isPopup = true;
	}
	this.hideLoadMask(app);
	
	if(app.isUDCInstance()){
		app = app.getHostAppInstance();
	}
		
	var showConstraint = {
			"position" : "absolute",
			"top" : "0",
			"bottom" : "0",
			"left" : "0",
			"right" : "0"
	};
	showConstraint = this.wrapConstraints(app, showConstraint);
	
	//var container = isPopup ? app.getContainer() : app.getRootAppInstance().getContainer();
	var container = app.getContainer();
	var layout = container.getLayout();
	
	var loadmask = container.getAppInstance().lookup("__loadmask__");
	
	if(maskType == "pro") {
		loadmask = container.getAppInstance().lookup("__loadmask_pro__");
		if(loadmask) {
			container.replaceConstraint(loadmask, showConstraint);
		} else {
			loadmask = new udc.com.loadmaskprogress("__loadmask_pro__");
			if(layout instanceof cpr.controls.layouts.FormLayout){
				container.floatControl(loadmask, showConstraint);
			}else{
				container.addChild(loadmask, showConstraint);
			}
			container.getAppInstance().register(loadmask);
		}
		loadmask.module.start();
	} else {
		loadmask = container.getAppInstance().lookup("__loadmask__");
		try{
			
			if(loadmask) {
				if(layout instanceof cpr.controls.layouts.FormLayout){
					app.floatControl(loadmask, showConstraint);
				}else{
					container.replaceConstraint(loadmask, showConstraint);
				}
			} else {
				loadmask = new udc.com.loadmask("__loadmask__");
				
				if(layout instanceof cpr.controls.layouts.FormLayout){
					container.floatControl(loadmask, showConstraint);
				}else{
					container.addChild(loadmask, showConstraint);
				}
				container.getAppInstance().register(loadmask);
			}
		}catch(ex){showConstraint = null;}
	}
	
	try{
		if(loadmask) {
			if(layout instanceof cpr.controls.layouts.FormLayout
				|| layout instanceof cpr.controls.layouts.VerticalLayout){
				app.floatControl(loadmask, showConstraint);
			}else{
				container.replaceConstraint(loadmask, showConstraint);
			}
		} else {
			
			//loadmask = this._loadMaskUdc;
			loadmask = new udc.com.loadmask("__loadmask__");
			
			if(layout instanceof cpr.controls.layouts.FormLayout
				|| layout instanceof cpr.controls.layouts.VerticalLayout){
				app.floatControl(loadmask, showConstraint);
			}else{
				container.addChild(loadmask, showConstraint);
			}
			container.getAppInstance().register(loadmask);
		}
	}catch(ex){showConstraint = null;}
	
	this._activeLoadMask = loadmask;
};

/**
 * LoadMask를 감춤
 * @param {cpr.core.AppInstance} app 앱인스턴스
 */
AppKit.prototype.hideLoadMask = function(app) {
	
	if(this._activeLoadMask) {
		if(this._activeLoadMask.module && this._activeLoadMask.module.end) {
			this._activeLoadMask.module.end();
		}
		
		var hideConstraint = {
				"position" : "absolute",
				"top" : "-1px",
				"left" : "-1px",
				"width" : "1px",
				"height" : "1px"
		};
		
		//앱 객체가 사라진 경우... ROOT앱을 기본으로 하여 처리
		if(app == null || app.getRootAppInstance() == null){
			app = this.getMainApp(app);
		}else{
			if(app.isUDCInstance()){
				app = app.getHostAppInstance();
			}
		}
		
		var isPopup = false;
		if(app.getHost() && app.getHost().modal === true){
			isPopup = true;
		}
		
		//var container = isPopup ? app.getContainer() : app.getRootAppInstance().getContainer();
		var container = app.getContainer();
		try{
			var layout = container.getLayout();
			if(layout instanceof cpr.controls.layouts.FormLayout
				|| layout instanceof cpr.controls.layouts.VerticalLayout){
				app.removeFloatingControl(this._activeLoadMask);
			}else{
				hideConstraint = this.wrapConstraints(app, hideConstraint);
				container.replaceConstraint(this._activeLoadMask, hideConstraint);
			}
			if(this._activeLoadMask){
				this._activeLoadMask.module.count(0);
				this._activeLoadMask.module.hide();
			}
		}catch(ex){hideConstraint = null;}
		
		this._activeLoadMask = null;
	}
};


/**
 * App 화면의 Layout에 맞게 컨트롤 배치 조건 래핑
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.controls.layouts.Constraint}constraint 래핑할 배치조건
 * @param {cpr.core.AppInstance} poApp 앱인스턴스
 * @returns 래핑된 배치조건
 */
AppKit.prototype.wrapConstraints = function(app, constraint, poApp) {
	var isPopup = false;
	if(app.getHost() && app.getHost().modal === true){
		isPopup = true;
	}
	
	var layout;
	var container = null;
	if(poApp == null){
		//container = isPopup ? app.getContainer() : app.getRootAppInstance().getContainer();
		container = app.getContainer();
		poApp = isPopup ? app : app.getRootAppInstance();
	}else{
		container = poApp.getContainer();
	}
	layout = container.getLayout();
	
	if (layout instanceof cpr.controls.layouts.ResponsiveXYLayout) {
		var positionConstraints = [];
		var allMedia = poApp.allSupportedMedias;
		allMedia.forEach(function(media) {
			var newConst = _.clone(constraint);
			newConst["media"] = media;
			positionConstraints[positionConstraints.length] = newConst;
		});
		return {
			"positions" : positionConstraints
		};
	}
	
	return constraint;
};

/**
 * 메인(루트) 앱에 대한 인스턴스를 반환한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @returns 
 */
AppKit.prototype.getMainApp = function(app) {
	if(app.isRootAppInstance()) {
		return app;
	}else{
		if(app.getHostAppInstance().isRootAppInstance()) return app.getHostAppInstance();
		else return this.getMainApp(app.getHostAppInstance());
	}
};

/**
 * 모바일 접속여부를 반환한다.
 */
AppKit.prototype.isAccessMobile = function() {
	var info = cpr.utils.Util.detectBrowser();
	if(info.mobile || info.os.indexOf("Android") > -1) return true;
	return false;
};

/**
 * 해당 오브젝트가 함수 타입인지 여부를 반환한다.
 */
AppKit.prototype.isFunc = function(poCallBackFunc) {
	if (typeof (poCallBackFunc) == "function") return true;
	return false;
};

/**
 * 메인 화면에 데이터 변경사항이 있는지 여부를 체크한다.<br>
 * 그리드, 폼레이아웃(프리폼) 대상(UDC, EMB 포함)<br>
 * 그리드 ignoreModify 사용자속성 "Y" 지정시 continue
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psAftMsg? 메시지구분
 * @param {cpr.controls.Container} poContainer? 컨테이너
 * @returns {Boolean} 데이터 변경여부
 */
AppKit.prototype.isAppModified = function(app, psAftMsg, poContainer) {
	var container;

	if(poContainer != null){
		container = poContainer;
	}else{
		var mainApp = this.getMainApp(app);
		if(mainApp == null) return false;
		container = mainApp.getContainer();
	}
	
	var vaDataCtrls = new Array();
	
	var _this = this;
	function getChildRecursive(poContainer){
	    var vaChildCtrls = poContainer.getAllRecursiveChildren();
	    for (var i=0, len=vaChildCtrls.length; i<len; i++) {
	        if (vaChildCtrls[i].type == "grid") {
	        	vaDataCtrls.push(vaChildCtrls[i]);
	        //입력형식의 폼레이아웃은 form-box CSS로 구분	
	        }else if (vaChildCtrls[i] instanceof cpr.controls.Container && vaChildCtrls[i].style.getClasses().indexOf(AppProperties.FORM_LAYOUT_CSS) != -1) {
	        	vaDataCtrls.push(vaChildCtrls[i]);
	        }else if(vaChildCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(voUdcApp.getContainer());
	        }else if(vaChildCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(voEmbApp.getContainer());
	        }
	    }
	}
	getChildRecursive(container);
	
	var modify = false;
	var ctrl = null;
	var vsFieldLabel = "";
	for(var i=0, len=vaDataCtrls.length; i<len; i++){
		ctrl = vaDataCtrls[i];
		if(ctrl.type == "grid"){
			
			//그리드 수정 내역 체크 무시 attr
			if(ctrl.userAttr("ignoreModify") === "Y" || ctrl.dataSet == null) continue;
			if(ctrl.dataSet.isModified()){
				modify = true;
				vsFieldLabel = ctrl.fieldLabel;
				break;
			}
		}else{
			var dataSet = this.Group.getBindDataSet(ctrl.getAppInstance(), ctrl);
			if(dataSet != null && dataSet.isModified()) {
				modify = true;
				vsFieldLabel = ctrl.fieldLabel;
				break;
			}
		}
	}
	//변경사항이 반영되지 않았습니다. 계속 하시겠습니까? confirm
	if(modify && psAftMsg != null && psAftMsg.toUpperCase() == "CRM"){
		if(!this.Msg.confirm("CRM-M003", [vsFieldLabel])) return true;
		else return false;
	}
	return modify;
};

/**
 * 메인 화면에 데이터 변경사항이 있는지 여부를 체크한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {cpr.controls.Container} poContainer? 컨테이너
 * @returns {Object Array} 변경된 데이터셋 객체 배열
 */
AppKit.prototype.getAllAppModifiedDataSet = function(app, poContainer) {
	var container;
	
	if(poContainer != null){
		container = poContainer;
	}else{
		var mainApp = this.getMainApp(app);
		if(mainApp == null) return false;
		container = mainApp.getContainer();
	}
	
	var vaDataCtrls = new Array();
	var vaDataSets = new Array();

	function getChildRecursive(poContainer){
	    var vaChildCtrls = poContainer.getAllRecursiveChildren();
	    for (var i=0, len=vaChildCtrls.length; i<len; i++) {
	        if (vaChildCtrls[i].type == "grid") {
	        	vaDataCtrls.push(vaChildCtrls[i]);
	        }else if (vaChildCtrls[i] instanceof cpr.controls.Container && vaChildCtrls[i].style.getClasses().indexOf(AppProperties.FORM_LAYOUT_CSS) != -1) {
	        	vaDataCtrls.push(vaChildCtrls[i]);
	        }else if(vaChildCtrls[i] instanceof cpr.controls.UDCBase){
	        	var voUdcApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voUdcApp) getChildRecursive(voUdcApp.getContainer());
	        }else if(vaChildCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var voEmbApp = vaChildCtrls[i].getEmbeddedAppInstance();
	        	if(voEmbApp) getChildRecursive(voEmbApp.getContainer());
	        }
	    }
	}
	getChildRecursive(container);
	
	var ctrl = null;
	for(var i=0, len=vaDataCtrls.length; i<len; i++){
		ctrl = vaDataCtrls[i];
		if(ctrl.type == "grid"){
			vaDataSets.push(ctrl.dataSet);
		}else{
			var dataSet = this.Group.getBindDataSet(ctrl.getAppInstance(), ctrl);
			if(dataSet == null) continue;
			vaDataSets.push(dataSet);
		}
	}
	
	return vaDataSets;
};

/**
 * 화면에 막(Cover)를 씌운다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 */
AppKit.prototype.coverPage = function(app) {
	var coverCtl = new cpr.controls.Container("comPageCover");
	coverCtl.style.css({"background-color":"#ededed", "opacity":"0.5"});
	coverCtl.setLayout(new cpr.controls.layouts.XYLayout());
	
//	var mainApp = this.getMainApp(app);
//	var container = mainApp.getContainer();
	var container = app.getContainer();
	var layout = container.getLayout();
	if(layout instanceof cpr.controls.layouts.FormLayout || layout instanceof cpr.controls.layouts.VerticalLayout){
		app.floatControl(coverCtl, {
			"top": "0px",
			"right": "0px",
			"bottom": "0px",
			"left": "0px"
		});
	}else{
		container.addChild(coverCtl, {
			"top": "0px",
			"right": "0px",
			"bottom": "0px",
			"left": "0px"
		});
	}
};

/**
 * 화면에 막(Cover)를 제거한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 */
AppKit.prototype.removeCover = function(app) {
	var coverCtl = new cpr.controls.Container("comPageCover");
	coverCtl.style.css({"background-color":"#ededed", "opacity":"0.5"});
	coverCtl.setLayout(new cpr.controls.layouts.XYLayout());
//	var mainApp = this.getMainApp(app);
//	var container = mainApp.getContainer();
	var container = app.getContainer();
	var floatCtrls = app.getFloatingControls();
	floatCtrls.filter(function(ctrl){
		return ctrl instanceof cpr.controls.Container && ctrl.id == "comPageCover";
	}).forEach(function(ctrl){
		var layout = container.getLayout();
		if(layout instanceof cpr.controls.layouts.FormLayout || layout instanceof cpr.controls.layouts.VerticalLayout){
			app.removeFloatingControl(ctrl);
		}else{
			container.removeChild(ctrl);
		}
	});
};

/**
 * 컨트롤(그룹) 또는 Grid의 내의 입력 값에 대한 유효성 체크를 수행한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId 컨트롤 ID
 * @param {"all" | "modify" | "current"}  dataScope? (all:그리드의 전체 데이터, modify:변경된 전체 Row, current:현재  Row)
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 * @returns {Boolean} Valid true, Invalid false. <br>
 *  	참고 : 1. 그리드에 연결된 데이터셋의 info는 PK컬럼으로 인식<br>
 *              그리드 초기화시 (Grid.init) info에 설정된 PK컬럼은 필수값으로 지정되고 해당 컬럼에 ignorePk="Y" 사용자속성 부여시 필수여부 체크를 무시한다.<br>
 *           2. 그리드 + 폼레이아웃(입력폼) 구성이고 그리드 사용자 속성에 bindDataFormId(폼레이아웃ID) 지정시 유효성체크 부적합 셀은  bindDataFormId에 지정된 폼레이아웃의 컨트롤에 포커싱이 간다. 
 *           
 */
AppKit.prototype.validate = function(app, paCtlId, dataScope, isMsgAlert){
//	var mainApp = cpr.core.Platform.INSTANCE.getAllLoadedApps().find(function(each){
//		return each.id === "app/com/main/main"
//	}).getInstances()[0]
	var mainApp = this.getMainApp(app);
	/** @type cpr.data.DataMap **/
	var dmGlobalConfig = mainApp.lookup("dmGlobalConfig");
	var appProperty = app.getAppProperty("useLayerdPop");
	
	var useLayeredPop;
	if(dmGlobalConfig){
		useLayeredPop = appProperty || (dmGlobalConfig.getValue("useLayerdPop") || "N");
	}

	return useLayeredPop === "N" ? this.validateOrigin(app, paCtlId, dataScope, isMsgAlert)
	                             : this.validateLayered(app, paCtlId);
}


/**
 * 컨트롤(그룹) 또는 Grid의 내의 입력 값에 대한 유효성 체크를 수행한다.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {#uicontrol | Array} paCtlId 컨트롤 ID
 * @param {"all" | "modify" | "current"}  dataScope? (all:그리드의 전체 데이터, modify:변경된 전체 Row, current:현재  Row)
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 * @returns {Boolean} Valid true, Invalid false. <br>
 *  	참고 : 1. 그리드에 연결된 데이터셋의 info는 PK컬럼으로 인식<br>
 *              그리드 초기화시 (Grid.init) info에 설정된 PK컬럼은 필수값으로 지정되고 해당 컬럼에 ignorePk="Y" 사용자속성 부여시 필수여부 체크를 무시한다.<br>
 *           2. 그리드 + 폼레이아웃(입력폼) 구성이고 그리드 사용자 속성에 bindDataFormId(폼레이아웃ID) 지정시 유효성체크 부적합 셀은  bindDataFormId에 지정된 폼레이아웃의 컨트롤에 포커싱이 간다. 
 *           
 */
AppKit.prototype.validateOrigin = function(app, paCtlId, dataScope, isMsgAlert) {
	
	dataScope = dataScope != null ? dataScope : "upd";
	if(!(paCtlId instanceof Array)){
		paCtlId = [paCtlId];
	}
	
	var valid = true;
	for(var i=0, len=paCtlId.length; i<len; i++) {
		var ctrlId = paCtlId[i];
		var ctrl = app.lookup(paCtlId[i]);
		if(ctrl instanceof cpr.controls.Grid){
			valid = this._validateGrid(ctrl, dataScope, isMsgAlert);
		}else if(ctrl instanceof cpr.controls.Container){
			/** @type cpr.bind.BindContext */
			var bindContext = this.Group.getBindContext(app, ctrl);
			if(bindContext){
				/**@type cpr.data.DataSet */
				var dataset = bindContext.grid ? bindContext.grid.dataSet : bindContext.dataSet;
				var rowIndex = bindContext.grid ? bindContext.grid.getSelectedRowIndex() : bindContext.rowIndex;
				//프리폼의 상태가 삭제상태이면... 유효성 체크에서 제외함
				if(dataset.getRowState(rowIndex) == cpr.data.tabledata.RowState.DELETED) continue;
				
				if(bindContext.grid){
					valid = this._validateFreeForm(ctrl, isMsgAlert);
				}else{
					valid = this._validateControl(ctrl, null, isMsgAlert);
				}
			}else{
				valid = this._validateControl(ctrl, null, isMsgAlert);
			}
		}else{
			valid = this._validateControl(ctrl, null, isMsgAlert);
		}
		
		if(valid == false) {
			return false;
		}
	}
	
	return true;
};

AppKit.prototype.validateLayered = function(app, paCtrlId){

	if(!(paCtrlId instanceof Array)){
		paCtrlId = [paCtrlId];
	}
	var targetControl = [];
	var errorMsg = "";
	paCtrlId.forEach(function(each){
		var ctrl = app.lookup(each);
		if(ctrl.type === "container" || ctrl.type === "embeddedapp" || ctrl instanceof cpr.controls.UDCBase){
			targetControl = targetControl.concat(this.Control.getAllUiControl(app, ctrl).filter(function(each){
				return !(each.getParent() instanceof cpr.controls.Grid);
			}));
		}
		else{
			targetControl = targetControl.concat([ctrl]);
		}
		
	}.bind(this))
	
	targetControl.forEach(function(each){
		if(each instanceof cpr.controls.Grid){
			errorMsg += this._validateGrid2(each);
		}
		else{
			errorMsg += this._validateControl2(each);
		}
	}.bind(this));
	
	var isValid = _.isEmpty(errorMsg);
	if(!isValid){
		this.Msg.alertDialog(app, errorMsg);
		paCtrlId.forEach(function(each){
			app.lookup(each).userAttr("validationStatus", "invalid")
		});
	}
	
	return isValid;
}


AppKit.prototype._validateControl2 = function(ctrl){
	var ctrlInterface = new CtrlInterface(ctrl, this);
	return this.Validator2.validate(ctrlInterface)
}

AppKit.prototype._validateGrid2 = function(/* cpr.controls.Grid */ grid){
	var dataSet = grid.dataSet;
	var excludeColTpe= ["checkbox", "roindex"]
	var ctrlInterfaces = [];
	var errMsg = ""
	
	grid.detail.getCellIndices().filter(function(idx){
		var cell = grid.detail.getColumn(idx);
		return cell.columnName && cell.control && !_.include(excludeColTpe, cell.columnType);
	}).forEach(function(filterdIdx){
		var cell = grid.detail.getColumn(filterdIdx);
		ctrlInterfaces.push(new CtrlInterface(cell, this, grid));
	});
	

	ctrlInterfaces.forEach(function(each){
		errMsg += this.Validator2.validate(each);
	}.bind(this));
	
	return errMsg
}

/**
 * @constructor
 * @desc 레이어드 벨리데이션 체크시 그리드와 일반컨트롤을 통합하기 위한 인터페이스 클래스
 * @param {cpr.controls.UIControl || cpr.controls.gridpart.GridColumn} ctrl
 * @param {AppKit} util
 * @param {Integer} rowIndex
 */
var CtrlInterface = function(ctrl, util, grid){
	this.ctrl = ctrl;
	this.grid = grid;
	this.util = util;
	this.pkCols = grid ? this.grid.dataSet.info : "";
	
	/**
	 * 컨트롤의 값을 가져옵니다.
	 * @param {Number} rowIndex 행 번호(그리드일 경우 사용됨)
	 */
	this.getValue = function(rowIndex){
		if(ctrl instanceof cpr.controls.gridpart.GridDetailColumn){
			return this.ctrl.getControlAttr(rowIndex, "value")
		}
		else{
			return ctrl.value;
		}
	}
	/**
	 * 유효성 체크에 통과하지 못할 경우 css처리를 합니다.
	 * @param {Number} rowIndex 행 번호(그리드일 경우 사용됨)
	 */
	this.addInvalidClass = function(rowIndex){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			rowIndex = rowIndex.replace(/,$/, '');
			this.ctrl.control.style.bindClass().toExpression("[" + rowIndex + "].indexOf(rowIndex) != -1 ? 'invalid' : ''");
		}
		else{
			this.util.Control.addInvalidClass(this.ctrl.getAppInstance(), this.ctrl.id)
		}
	}
	/**
	 * 설정된 invalid class를 제거합니다.
	 */
	this.removeInvalidClass = function(){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			this.ctrl.control.style.unbindClass();
			this.grid.redraw();
		}
		else{
			this.util.Control.removeInvalidClass(this.ctrl.getAppInstance(), this.ctrl.id)
		}
	}
	/**
	 * 컨트롤에 툴팁을 설정합니다.
	 * @param {String} value
	 */
	this.setToolTip = function(value){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			this.ctrl.control.tooltip = value
		}
		else{
			this.ctrl.tooltip = value
		}
	}
	/**
	 * 컨트롤의 툴팁을 반환합니다
	 * @return {String}
	 */
	this.getToolTip = function(){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			return this.ctrl.control.tooltip
		}
		else{
			return this.ctrl.tooltip;
		}
	}
	/**
	 * 컨트롤의 필드라벨을 반환합니다
	 * @return {String}
	 */
	this.getFieldLabel = function(){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			return this.ctrl.control.fieldLabel
		}
		else{
			return this.ctrl.fieldLabel
		}
	}
	/**
	 * 컨트롤의 LengthUnit을 반환합니다
	 * @return {String}
	 */
	this.getLengthUnit = function(){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			return this.ctrl.control.lengthUnit
		}
		else{
			return this.ctrl.lengthUnit;
		}
	}
	/**
	 * 컨트롤의 사용자 속성을 반환힙니다.
	 * @param {String} attrName
	 * @return {String}
	 */
	this.getAttr = function(attrName){
		if(ctrl instanceof cpr.controls.gridpart.GridColumn){
			return this.ctrl.control.userAttr(attrName)
		}
		else{
			return this.ctrl.userAttr(attrName)
		}
	}
}

/**
 * 일반 컨트롤에 대한 Validation 체크
 * @param {cpr.controls.UIControl} ctrl
 * @param {cpr.controls.UIControl} poParentCtl
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 * @private
 */
AppKit.prototype._validateControl = function(ctrl, poParentCtl, isMsgAlert) {
	if(!ctrl) return true;
	
	var valid = true;
	var _this = this;
	if(ctrl instanceof cpr.controls.Container) { // Group 일 경우 체크
		var children = this._getChildren(ctrl);
		var child;
		for(var i=0, len=children.length; i<len; i++){
			child = children[i];
			// 컨트롤별 Validation Check
			if(this._validateControl(child, ctrl, isMsgAlert) == false) {
				valid = false;
				break;
			}
		}
		return valid;
	} else if(ctrl instanceof cpr.controls.UDCBase){ //UDC인 경우
		var embApp = ctrl.getEmbeddedAppInstance();
		var children = embApp.getContainer().getAllRecursiveChildren();
		var child;
		for(var i=0, len=children.length; i<len; i++){
			child = children[i];
			// 컨트롤별 Validation Check
			if(this._validateControl(child, ctrl, isMsgAlert) == false) {
				valid = false;
				break;
			}
		}
		return valid;
	} else {
		valid = this.Validator.validate(ctrl, ctrl.value, poParentCtl, null, null, null, isMsgAlert);
		if(valid == false) {
			//탭내에 컨트롤이 존재하는 경우... 해당 탭페이지 포커싱
			this._focusToTabItem(ctrl);
			ctrl.focus();
		}
		return valid;
	}
};

/**
 * @private
 * 그리드와 Selection바인딩된 프리폼의 변경된 전체 데이터에 대한 Validation 체크
 * @param {cpr.controls.Container} poForm 체크할 프리폼 컨트롤객체
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 * @returns {Boolean}
 */
AppKit.prototype._validateFreeForm = function(poForm, isMsgAlert) {
	/** @type cpr.controls.Container */
	var form = poForm;
	if(!form) return false;
	
	var _app = form.getAppInstance();
	
	var bindContext = this.Group.getBindContext(_app, form);
	var grid =  bindContext.grid;
	var dataSet = grid.dataSet;
	var _this = this;
	
	var allChildControls = new Array();
	var getChildRecursive = function(poContainer){
	    var childCtrls = poContainer.getAllRecursiveChildren();
	    for (var i=0, len=childCtrls.length; i<len; i++) {
	        if (childCtrls[i] instanceof cpr.controls.Container ) {
	        	getChildRecursive(childCtrls[i]);
	        }else if(childCtrls[i] instanceof cpr.controls.UDCBase){
	        	var udcApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(udcApp) getChildRecursive(udcApp.getContainer());
	        }else if(childCtrls[i] instanceof cpr.controls.EmbeddedApp){
	        	var embApp = childCtrls[i].getEmbeddedAppInstance();
	        	if(embApp) getChildRecursive(embApp.getContainer());
	        }else {
	        	allChildControls.push(childCtrls[i]);
	        }
	    }
	}
	getChildRecursive(form);
	var allTargetControls = allChildControls.filter(function(ctrl){
		//컬럼 유형이 output이면... SKIP
		if(ctrl == null || ctrl.type == "output" || ctrl.type == "button" || ctrl.type == "img") return false;
		//컨트롤에 Bind된 컬럼이 없으면...SKIP
		var bind = ctrl.getBindInfo("value");
		//20210429 UDC에 포함된 컨트롤 유효성체크위해
		if(bind != null && bind.type == "appproperty") return true;
		
		if(bind == null || bind.type != "datacolumn" || bind.columnName == null) return false;
		
		return true;
	});
	
	var rowIndexs = dataSet.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED | cpr.data.tabledata.RowState.UPDATED);
	var _this = this;
	var invalid = rowIndexs.some(function(idx) {
		var row = dataSet.getRow(idx);
		/**@type cpr.controls.UIControl */
		var ctrl = null;
		
		for(var i = 0, len = allTargetControls.length; i < len; i++) {
			ctrl = allTargetControls[i];
			//컨트롤에 Bind된 컬럼이 없으면...SKIP
			var bind = ctrl.getBindInfo("value");
			var ctrlValue;
			//20210429 UDC에 포함된 컨트롤 유효성체크위해
			if(bind.type == "appproperty") {
				ctrlValue = row.getValue(ctrl.getAppInstance().getAppPropertyBindInfo("value").columnName);
			} else {
				ctrlValue = row.getValue(bind.columnName);
			}
			//신규행  PK 체크 무시... SKIP
			if(row.getState() == cpr.data.tabledata.RowState.INSERTED && (ctrl.userAttr("ignorePk") == "Y")) continue;
			
			// 컨트롤별 Validation Check
			if(_this.Validator.validate(ctrl, ctrlValue, form, null, null, null, isMsgAlert) == false) {
				//유효성 체크로 인해 selection-change 발생여부 셋팅 
				grid.userAttr("selectionChangeByValidation", "true");
				_this._focusToTabItem(form);
				//탭내에 컨트롤이 존재하는 경우... 해당 탭페이지 포커싱
				grid.selectRows(idx);
				_app.focus(ctrl);
				
				return true;
			}
		}
		return false;
	});
	if(invalid == true) {
		return false;
	}
	
	return true;
};

/**
 * Grid의 변경된 전체 데이터에 대한 Validation 체크<br>
 * - 사이트별 Customizing 필요<br>
 * 가능한 한 Validation 체크시 validate 메소드를 사용
 * @param {cpr.controls.Grid} poGrid 체크할 Grid
 * @param {"all" | "modify" | "current"} dataScope all:그리드의 전체 데이터, modify:변경된 전체 Row, current:현재  Row
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 * @returns {Boolean}
 * @private
 */
AppKit.prototype._validateGrid = function(poGrid, dataScope, isMsgAlert) {
	dataScope = dataScope != null ? dataScope : "modify";
	/** @type cpr.controls.Grid */
	var grd = poGrid;
	if(!grd) return false;
	
	var vsDataBindCtxId = grd.userAttr("bindDataFormId");
	
	var _this = this;
	/**
	 * @type cpr.controls.gridpart.GridBand
	 */
	var detailBand = grd.detail;
	var cellCnt = detailBand.cellCount;
	
	/**
	 * @type cpr.data.DataSet
	 */
	var dataSet = grd.dataSet;
	var rowIndexs = null;
	if(dataScope == "all"){
		rowIndexs = dataSet.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED | cpr.data.tabledata.RowState.UPDATED | cpr.data.tabledata.RowState.DELETED | cpr.data.tabledata.RowState.UNCHANGED);
	}else{
		rowIndexs = dataSet.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED | cpr.data.tabledata.RowState.UPDATED);
	}
	var _this = this;
	var invalid = rowIndexs.some(function(idx) {
		var row = dataSet.getRow(idx);
		var col = null;
		for(var i = 0; i < cellCnt; i++) {
			/**  @type cpr.controls.gridpart.GridColumn */
			col = detailBand.getColumn(i);
			//컬럼 매핑노드가 없으면... SKIP
			if(col.columnName == null || col.columnName == "") continue;
			if(col.columnType == "checkbox" || col.columnType == "rowindex") continue;
			//컬럼 유형이 output이면... SKIP
			if(col.controlType == null || col.controlType == "output" || col.controlType == "button" || col.controlType == "img") continue;
			//신규행  PK 체크 무시... SKIP
			if(row.getState() == cpr.data.tabledata.RowState.INSERTED && (col.control && col.control.userAttr("ignorePk") == "Y")) continue;
			
			// 컨트롤별 Validation Check
			if(_this.Validator.validate(col.control, row.getValue(col.columnName), grd, idx, i, null, isMsgAlert) == false) {
				//유효성 체크로 인해 selection-change 발생여부 셋팅 
				grd.userAttr("selectionChangeByValidation", "true");
				//탭내에 컨트롤이 존재하는 경우... 해당 탭페이지 포커싱
				_this._focusToTabItem(grd);
				if(ValueUtil.isNull(vsDataBindCtxId)){
					grd.setEditRowIndex(idx, true);
					grd.focusCell(idx, i);
					//포커싱할 컬럼이 UDC인 경우에...
					var dctrl = grd.detail.getColumn(i).control;
					if(dctrl instanceof cpr.controls.UDCBase){
						var empApp = dctrl.getEmbeddedAppInstance();
						dctrl = AppUtil.getUDCBindValueControl(dctrl);
						if(dctrl) empApp.focus(dctrl.id);
					}
				}else{
					grd.selectRows(idx);
					var cctrl = _this.Group.getDataBindedControl(dataSet.getAppInstance(), vsDataBindCtxId, col.columnName);
					if(cctrl) _this.Control.setFocus(cctrl.getAppInstance(), cctrl.id);
				}
				
				return true;
			}
		}
		return false;
	});
	if(invalid == true) {
		return false;
	}
	
	return true;
};



/**
 * 모바일 여부
 * @param {cpr.core.AppInstance} app 앱인스턴스
 */
AppKit.prototype.isMobile = function(app) {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf("mobile")>-1){
		return true;
	}
	return false;
}


/**
 * Validation 체크시 컨트롤이 속한 탭폴더 선택용
 * @param {cpr.controls.UIControl} ctrl 컨트롤 객체
 * @private
 */
AppKit.prototype._focusToTabItem = function(ctrl) {
	/**@type cpr.controls.TabFolder */
	var tab = null;
	ctrl.findParent(function(pctrl){
		if(pctrl instanceof cpr.controls.TabFolder){
			tab = pctrl;
			return true;
		}
		return false;
	});
	if(tab){
		var tabItem = null;
		var tabItems = tab.getTabItems();
		ctrl.findParent(function(pctrl){
			tabItems.some(function(each){
				if( each.content == pctrl){
					tabItem = each;
					return true;
				}
				return false;
			});
			return tabItem != null;
		});
		if(tabItem && tabItem != tab.getSelectedTabItem()){
			tab.setSelectedTabItem(tabItem);
		}
	}
};

/**
 * 그룹 컨트롤내의 자식 컨트롤 목록을 반환한다.
 * @param {cpr.controls.Container} pcGroup 그룹컨트롤
 * @private
 */
AppKit.prototype._getChildren = function(pcGroup) {
	var children = pcGroup.getAllRecursiveChildren();
	function getNextControls(each,children){
		var order = [each];
		var next = each;
		while(next != null){
			next = next.getNextControl();
			if(next != null && children.indexOf(next) > -1 && order.indexOf(next) == -1) order.push(next);
			else next = null;
		}
		return order;
	} 
	
	var orderCtrls = [];
	children.forEach(function(each){
		if(children.indexOf(each.getPrevControl()) ==-1 && each.getNextControl() != null){
			orderCtrls = getNextControls(each,children);
		}
	});
	
	var etcCtrls = [];
	children.forEach(function(each){
		if(orderCtrls.indexOf(each) == -1){
			etcCtrls.push(each);
		}
	});
	
	return orderCtrls.concat(etcCtrls);
};

var activeMsg = [];
/**
 * 
 * @param {String} msgType alert (확인버튼) , confirm (확인, 취소 버튼)
 * @param {String} msgText 메시지 내용을 보여주고 관련하여 \n으로 입력시 다음행에서 
 * @param {Function} callFunClose 확인을 클릭시 동작하는 내용 
 * @param {Function} callFunReset 초기화를 클릭시 동작하는 내용 
 * @param {Function} callFunCancel 취소을 클릭시 동작하는 내용 
 * @param {String} closeBtnValue 확인버튼 "확인" 값 커스텀 (Optional)
 * @param {String} resetBtnValue 초기화버튼 "초기화" 값 커스텀 (Optional)
 * @param {String} cancleBtnValue 취소버튼 "취소" 값 커스텀 (Optional)
 * @param {psTitle} psTitle  메시지 영역의 타이틀 명  (Optional) 
 * @param {psClassNm} psClassNm  메시지 영역 스타일에 대한 클래스를 추가  (Optional) 
 */
AppKit.prototype.showMsg = function(app, msgType, msgText, callFunClose, callFunReset, callFunCancel, closeBtnValue, resetBtnValue, cancleBtnValue, psTitle, psClassNm) {
	var showConstraint = {
		"position": "absolute",
		"top": "0",
		"bottom": "0",
		"left": "0",
		"right": "0"
	};
	
	/** 
	 * @type cpr.controls.VisibleUIControl
	 */
	var msg = null;
	
//	if (msgType == "confirm") {
//		msg = new udc.com.comMsgConfirm("___confirm___");
//		
//		if(ValueUtil.fixNull(cancleBtnValue) != ""){
//			msg.getUDCApp().lookup("btnCancle").value = cancleBtnValue;
//		}
//		if(ValueUtil.fixNull(closeBtnValue) != ""){
//			msg.getUDCApp().lookup("btnConfirm").value = closeBtnValue;
//		}
//		
//		if(callFunCancel) msg.addEventListenerOnce("cancel", callFunCancel);
//		 msg.addEventListenerOnce("cancel", this.hideMsg );			
//	} else if(msgType == "alert"){	
//		msg = new udc.com.comMsgAlert("___alert___");
//		
//		if(ValueUtil.fixNull(closeBtnValue) != ""){
//			msg.getUDCApp().lookup("btnConfirm").value = closeBtnValue;
//		}
//
//	}
	
		if (msgType == "confirm") {
			msg = new udc.com.comMsgDlg("___confirm___");
			
			if(ValueUtil.fixNull(cancleBtnValue) != ""){
				msg.getUDCApp().lookup("btnCancle").value = cancleBtnValue;
			}
			if(ValueUtil.fixNull(closeBtnValue) != ""){
				msg.getUDCApp().lookup("btnConfirm").value = closeBtnValue;
			}
			
			if(callFunCancel) msg.addEventListenerOnce("cancel", callFunCancel);
			 msg.addEventListenerOnce("cancel", this.hideMsg );			
		} else {	
			msg = new udc.com.comMsgDlg("___alert___");
			
			if(ValueUtil.fixNull(closeBtnValue) != ""){
				msg.getUDCApp().lookup("btnConfirm").value = closeBtnValue;
			}
			msg.getUDCApp().lookup("btnCancle").visible = false;
		}
//

	if (callFunClose) msg.addEventListenerOnce("close", callFunClose);
	msg.addEventListenerOnce("close", this.hideMsg);		
	
	
	// 메시지 내용을 복사 
	if (msgText) msg.setMsgText(msgText);
	msg.style.css(showConstraint);
	msg.visible = true;
	if(psTitle) msg.setMsgTitle(psTitle); 
	// style을 부가적으로 설정하도록
	if(psClassNm) msg.addClassMsgText(psClassNm);

	// 로드 마스크를 플로팅 시킴
	app.getRootAppInstance().floatControl(msg);
	
	activeMsg.push(msg);	

};

/**
 *  열린 메시지 창이 있는 경우 닫는다.
 */
AppKit.prototype.hideMsg = function(e) {
	var actMsg = activeMsg;
	
	for(var i=0; i< actMsg.length; i++) {
		if(actMsg[i] != e.control) continue;	
		
		
		var msg = actMsg[i];
		
		// 띄울 메시지가 존재하는 경우에만 숨긴다. 
		if (msg) {
			// 로드 마스크가 UDC 혹은 임베디드 앱인 경우.
			if (msg instanceof cpr.controls.EmbeddedApp) {
				// end 메서드를 출판 했으면 호출 해 줌.
				if (msg.hasAppMethod("end")) {
					msg.callAppMethod("end");
				}
			}
		
		
			// 로드마스크가 앱에 귀속된 것이라면 원래 위치로 되돌림.
			if (this._msgOriginalConstraint && this._msgParent) {
				this._appKit.getRootApp(_app).removeFloatingControl(msg);
				this._msgParent.addChild(msg, this._msgOriginalConstraint);
				this._msgParent = null;
				this._msgConstraint = null;
				msg.visible = false;
			}
		
			// 새로 생성되었던 로드 마스크라면 파기 시킴.
			else {
				msg.dispose();
			}
			
			activeMsg.slice(activeMsg.indexOf(msg), 1);
			
		}
	}
};

/**
 * 권한 유틸
 * @constructor
 * @param {common.module} appKit
 */
function AppAuthKit(appKit){
	this._appKit = appKit;
};

/**
 * 메뉴 정보 취득<br>
 * - 사이트별 Customizing 필요<br>
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psMenuType?  메뉴 정보 TYPE
 *                 생략시 메뉴 정보 MAP 리턴
 * @returns 
 *          {cpr.utils.ObjectMap}  psMenuType 생략시 <br>
			getMenuInfo.get("MENU_ID");				//메뉴ID<br>
			getMenuInfo.get("PGM_ID");					//프로그램ID<br>
			getMenuInfo.get("MENU_NM");				//메뉴명<br>
 */
AppAuthKit.prototype.getMenuInfo = function(app, psMenuType){
	var voMap = new cpr.utils.ObjectMap();
	var _mainApp = this._appKit.getMainApp(app);
	var vsData = null;
	/** @type cpr.controls.MDIFolder */
	var vcMdi = _mainApp.lookup("mdiCn");
	if(vcMdi){
		var vcTabItem = vcMdi.getSelectedTabItem();
		if(vcTabItem != null){
			vsData = vcTabItem.userAttr("__menuInfo");
			_mainApp.__menuInfo = vsData;
		}
	}
	if(!ValueUtil.isNull(vsData)){
		var voData = JSON.parse(vsData);
		if(psMenuType != null){
			return ValueUtil.fixNull(voData[psMenuType]);
		}else{
			for(var key in voData){
				voMap.put(key, ValueUtil.fixNull(voData[key]));
			}
			return voMap;
		}
	}else{
		return voMap;
	}
};

/**
 * 메뉴를 바로 오픈할 경우 부모페이지에서 전달한 파라미터를 꺼내는 함수 (JSON 형태로 리턴됨)
 * 
 * [ 메뉴 파람 담는 법 및 메뉴 다이렉트 오픈 예제 ]
 * var voParam = { SUBJ_NO : util.Grid.getCellValue(app, "grdMain", "SUBJ_NO")};
 * util.MDI.open(app, "rptCSubjMstMng", voParam);
 * 
 * [ 사용법 ]
 * var voMenuParam = util.Auth.getMenuParam(app);
 * var vsSubjNo = voMenuParam.SUBJ_NO;
 * 
 * - 사이트별 Customizing 필요 
 *    Root App에 getMenuParam 메소드 생성 필요
 * @param {cpr.core.AppInstance} app
 * 
 */
AppAuthKit.prototype.getMenuParam = function(app) {
    var _mainApp = this._appKit.getMainApp(app);
    if(_mainApp.hasAppMethod("getMenuParam")){
    	var menuParam = _mainApp.callAppMethod("getMenuParam");
    	if(ValueUtil.isNull(menuParam)) {
    		return null;
    	}else {
	        return JSON.parse(_mainApp.callAppMethod("getMenuParam"));
    	}
    }
};

/**
 * 로그인 사용자의 정보를 취득<br>
 * - 사이트별 Customizing 필요 <br>
 *   Root App에 getUserInfo 생성 필요.
 * @param {cpr.core.AppInstance} app 앱인스턴스
 * @param {String} psUserInfoType? 사용자정보 TYPE 세션정보 참고
 * 					   또는 <br>
 * 					   var mapUserInfo = util.getUserInfo();<br>
 * 					   mapUserInfo.get("USER_ID");<br>
 * @returns {String | cpr.data.DataMap} psUserInfoType 미지정시 Map 형태의 사용자 정보 리턴 
 */
AppAuthKit.prototype.getUserInfo = function(app, psUserInfoType) {
	var _mainApp = this._appKit.getMainApp(app);
	if(_mainApp.hasAppMethod("getUserInfo")){
		if(ValueUtil.isNull(psUserInfoType)){
			return _mainApp.callAppMethod("getUserInfo");
		}else{
			return _mainApp.callAppMethod("getUserInfo", [psUserInfoType]);
		}
	}
};





globals.createCommonUtil = function(){
		return new AppKit();
};


// 모든 selection-change 이벤트시 그리드에 대한  필터 추가(for. 그리드의 선택된 로우가 없을 경우 이벤트 전파 차단)
//- 사이트별 Customizing 필요
//cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e) {
//    // 이벤트를 발생 시킨 컨트롤
//    var control = e.control;
//    /** @type cpr.core.AppInstance */
//    var _app = control.getAppInstance();
//    
//    // 이벤트 발송자가 그리드 이고.
//    if (control instanceof cpr.controls.Grid) {
//    	/** @type cpr.controls.Grid */
//    	var grid = control;
//    	if(grid.selectionUnit == "cell" && grid.getSelectedIndices()[0] == null){
//    		 e.stopPropagation();
//    	}else{
//    		var rowIndex = grid.selectionUnit != "cell" ? grid.getSelectedRowIndex() : grid.getSelectedIndices()[0]["rowIndex"];
//	        // 그리드 선택 ROW가 -1이라면...
//	        if (rowIndex < 0) {
//	            // 이벤트 전파를 차단시킵니다.
//	            e.stopPropagation();
//	        }
//    	}
//    }
//});



// 모든 before-selection-change 이벤트에시 그리드에 대한  필터만 추가.(for. 그리드의 선택된 로우가 없을 경우 이벤트 전파 차단)
//- 사이트별 Customizing 필요
//cpr.events.EventBus.INSTANCE.addFilter("before-selection-change", function(e) {
//    // 이벤트를 발생 시킨 컨트롤
//    var control = e.control;
//    /** @type cpr.core.AppInstance */
//    var _app = control.getAppInstance();
//    
//    // 이벤트 발송자가 그리드 이고.
//    if (control instanceof cpr.controls.Grid) {
//    	// 테스트 화면의 경우 이벤트 적용 안함
//    	if(e.newSelection[0] == null || e.newSelection[0] == undefined){
//    		// 이벤트 전파를 차단시킵니다.
//            e.stopPropagation();
//		}
//    }
//});

//모든 before-value-change 이벤트에시 인풋박스에 대한 대소문자 자동변환. (사용자정의 속성에 inputLetter 지정 필요)
//- 사이트별 Customizing 필요
//cpr.events.EventBus.INSTANCE.addFilter("before-value-change", function(e) {
//    // 이벤트를 발생 시킨 컨트롤
//    var control = e.control;
//    /** @type cpr.core.AppInstance */
//    
//    // 이벤트 발송자가 인풋박스이면.
//    if (control.type === "inputbox") {
//    	var inputLetter = control.userAttr("inputLetter");
//		if (inputLetter == "uppercase") {
//			if (/[a-z]/g.test(e.newValue)) {
//				var newValue = e.newValue.toUpperCase();
//				control.value = newValue;
//				e.preventDefault();
//				e.stopPropagation();
//			}
//		} else if (inputLetter == "lowercase") {
//			if (/[A-Z]/g.test(e.newValue)) {
//				var newValue = e.newValue.toLowerCase();
//				control.value = newValue;
//				e.preventDefault();
//				e.stopPropagation();
//			}
//		}
//    }
//});

cpr.core.Platform.INSTANCE.onerror = function(report){
	//console.log(JSON.stringify(report.stack, null, "  "));
};

//round 함수
//cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getRound", function(value, position) {
//	if(isNaN(value)) return 0;
//	else if(value == Infinity || value == -Infinity) return 0;
//	if(position == undefined || position == null) return Math.round(value);
//	else return Math.round(value * (10 * position))/(10 * position);
//});
////floor 함수
//cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getFloor", function(value, position) {
//	if(isNaN(value)) return 0;
//	else if(value == Infinity || value == -Infinity) return 0;
//	if(position == undefined || position == null) return Math.floor(value);
//	else return Math.floor(value * (10 * position))/(10 * position);
//});
////숫자 천단위 콤마 포맷
//cpr.expression.ExpressionEngine.INSTANCE.registerFunction("formatToNumber", function(value) {
//	if(isNaN(value)) return value;
//	return new String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//});