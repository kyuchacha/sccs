/************************************************
 * Datepicker.js
 * Created at 2020. 5. 21. 오후 1:42:47.
 *
 * @author ryu
 * 
 * ------------------------------------------------------------------------------------
 * 작성자	|버전	|내용
 * ------------------------------------------------------------------------------------
 * 류다은	|1.0	|최초 작성
 * ------------------------------------------------------------------------------------ 
 ************************************************/

var util = createCommonUtil();
var dateValChange = false;


/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	
	var value = app.getAppProperty("value");
	var delimiter = app.getAppProperty("delimiter");
	
	if (value != null && value != ""){
		var splitedValue = value.split(delimiter);
		return splitedValue;
	}
	
	return null;
};


/**
 * UDC의 AppInstance를 반환합니다.
 */
exports.getUDCApp = function() {
	return app;
};


/**
 * 데이트 피커의 값을 가져옵니다.
 * @return {String}
 */
function getValue() {
	return app.getAppProperty("value");
}
exports.getValue = getValue;

/**
 * 데이트 피커의 값을 배열로 가져옵니다.
 * @return {Array}
 */
function getValues() {
	var vaVal = [];
	
	var vsVal = app.getAppProperty("value");
	if (vsVal != null && vsVal != ""){
		vaVal = vsVal.split(app.getAppProperty("delimiter"));
	}
	
	return vaVal;
}
exports.getValues = getValues;

/**
 * 데이트 피커의 시작 날짜 값을 가져옵니다.
 * @return {String}
 */
function getBeginValue() {
	var vaVal = getValues();
	
	if (vaVal.length > 0){
		return vaVal[0];
	}
	
	return null;
}
exports.getBeginValue = getBeginValue;


/**
 * 데이트 피커의 종료 날짜 값을 가져옵니다.
 * @return {String}
 */
function getEndValue() {
	var vaVal = getValues();
	
	if (vaVal.length > 0){
		return vaVal[1];
	}
	
	return null;
}
exports.getEndValue = getEndValue;


/**
 * 데이트 피커에 시작과 종료 날짜 값을 설정합니다.
 * @param {String | String[]} psValue
 */
function setValue(psValue) {
	var vsValue = psValue;
	
	/* 값에 대한 타입 체크 후 String으로 변환 */
	if (_.isArray(vsValue)){
		vsValue = vsValue.join(app.getAppProperty("delimiter"));
	}
	
	if (!isDateFormat(vsValue, true)){
		return;
	}
	
	if (!isValid(vsValue)){
		return;
	}
	
	app.setAppProperty("value", vsValue.trim());
}
exports.setValue = setValue;


/**
 * 데이트 피커에 시작 날짜 값을 설정합니다.
 * @param {String} psValue
 */
function setBeginValue(psValue) {
	var vsOrgVal = app.getAppProperty("value");
	
	if (vsOrgVal == null || vsOrgVal == ""){
		return;
	}
	
	if (!isDateFormat(psValue)){
		return;
	}
	
	var vsNewVal = psValue 
		+ vsOrgVal.substring(vsOrgVal.indexOf(app.getAppProperty("delimiter")), vsOrgVal.length);

	var vsVal = setValue(vsNewVal);
}
exports.setBeginValue = setBeginValue;


/**
 * 데이트 피커에 종료 날짜 값을 설정합니다.
 * @param {String} psValue
 */
function setEndValue(psValue) {
	var vsOrgVal = app.getAppProperty("value");
	
	if (vsOrgVal == null || vsOrgVal == ""){
		return;
	}
	
	if (!isDateFormat(psValue)){
		return;
	}
	
	var vsNewVal = 
		vsOrgVal.substring(0, vsOrgVal.indexOf(app.getAppProperty("delimiter")) + 1) + psValue;

	var vsVal = setValue(vsNewVal);
}
exports.setEndValue = setEndValue;

/************************************************
 * 사용자 정의 함수
 ************************************************/

/**
 * 다이얼로그에서 선택된 값을 설정합니다.
 * @param {String} psValue
 */
function setChoseValue(psValue) {
	var vcDtiBgn = app.lookup("dtiBgn");
	var vcDtiEnd = app.lookup("dtiEnd");
	
	if (psValue == null || psValue == ""){
		vcDtiBgn.value = null;
		vcDtiEnd.value = null;
		return;
	}
	
	var vsSplitedVal = psValue.split(app.getAppProperty("delimiter"));
	
	if (vsSplitedVal.length == 0){
		return;
	}
	
	vcDtiBgn.value = vsSplitedVal[0];
	vcDtiEnd.value = vsSplitedVal[1];
}


/**
 * 선택된 날짜값이 유효한 날짜 형식인지 검사합니다. (true=유효)
 * @param {String} psValue
 * @param {Boolean} 시작과 종료 날짜 모두 검사 여부
 * @return {Boolean}
 */
function isDateFormat(psValue, pbBoth) {
	if (psValue == null || psValue == ""){
		return;
	}
	
	var vsFm = app.getAppProperty("format");

	/* 시작과 종료 날짜 검사하는 경우 */
	if (pbBoth == true){
		var vaVal = psValue.split(app.getAppProperty("delimiter"));
	
		var vsBgnDt = vaVal[0];
		var vsEndDt = vaVal[1];
		
		var vbBgnValid = moment(vsBgnDt, vsFm).isValid();
		var vbEndValid = moment(vsEndDt, vsFm).isValid();
		
		return vbBgnValid == true && vbEndValid == true;
	}
	
	/* 시작 또는 종료 날짜 검사하는 경우 */
	var vbValid = moment(psValue, vsFm).isValid();
		
	return vbValid;
}


/**
 * 선택된 날짜값이 유효한지 검사합니다. (true=유효)
 * @param {String} psValue
 */
function isValid(psValue) {
	var vaVal = psValue.split(app.getAppProperty("delimiter"));
	
	/* 두 값 모두 확인해야 하므로 */
	if (vaVal.length <= 1){
		return false;
	}
	
	var vsBgnDt = vaVal[0];
	var vsEndDt = vaVal[1];
	
	var vnDiff = getDiff(vsBgnDt, vsEndDt);
	
	if (vnDiff > 0){
		return false;
	}
	
	return true;
}


/**
 * 두 날짜 간의 차이를 계산합니다.
 * @param {String} psBgnDate
 * @param {String} psEndDate
 */
function getDiff(psBgnDate, psEndDate) {
	var vsDtFm = app.getAppProperty("format");
	
	var voBgnDt = moment(psBgnDate, vsDtFm);
	var voEndDt = moment(psEndDate, vsDtFm);
	
	var vnDiff = voBgnDt.diff(voEndDt);
	
	return vnDiff;
}


/************************************************
 * 기본 이벤트
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//TODO 데이트 피커 초기 설정에 대한 로직을 작성하십시오.
}


/*
 * Body에서 before-draw 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 그려지기 직전에 호출되는 이벤트 입니다. 내부 컨텐츠를 동적으로 구성하기위한 용도로만 사용됩니다.
 */
function onBodyBeforeDraw(/* cpr.events.CUIEvent */ e){
	/* 그리드 내에서 편집행으로 들어갔을 때 값 표시 위한 처리 */
	setChoseValue(app.getAppProperty("value"));
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if (e.property == "value"){
		setChoseValue(e.newValue);
	}
	
	/* 변경된 속성 값 반영을 위하여 다시 그리기 요청 */
	app.getContainer().redraw();
	
	//required	
	//시작일자
	if(e.property == "requiredBgn") {
		//true인경우
		if(app.getAppProperty("requiredBgn")){
			var vcCode = app.lookup("dtiBgn");
			//vcCode.fieldLabel = app.getHostProperty("fieldLabel");
			vcCode.userAttr("required", "Y");
		}
	}	
	//종료일자
	if(e.property == "requiredEnd") {
		//true인경우
		if(app.getAppProperty("requiredEnd")){
			var vcCode = app.lookup("dtiEnd");
			//vcCode.fieldLabel = app.getHostProperty("fieldLabel");
			vcCode.userAttr("required", "Y");
		}
	}	

}


/*
 * 버튼(btnOpen)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnOpen = e.control;
	
	var vsHdTitle = app.getAppProperty("title");
	
	var voHostAppIns = app.getHostAppInstance();
	
	if (voHostAppIns){
		/** @type cpr.controls.UIControl */
		var vcTgCtrl = voHostAppIns.lookup(vsHdTitle);
		if (vcTgCtrl != null){
			vsHdTitle = vcTgCtrl.fieldLabel || vcTgCtrl.value;
		}
	}
	
	/* 날짜 선택을 위한 선택 팝업을 엶 */
	var vsConPath = "";
	if(getContextPath() == "/rts-ui" || getContextPath() == "/rt") {
		vsConPath = "app-rt/com/cal/DatepickerContent";
	} else {
		vsConPath = "app-rp/com/cal/DatepickerContent";
	}
	
	util.getRootApp(app).openDialog(vsConPath, {width : 500, height : 350, resizable : false, headerMovable: false}, function(dialog){
		dialog.headerTitle = vsHdTitle;
		
		dialog.style.setClasses("datepicker-modal");
		
		dialog.ready(function(dialogApp){
			dialog.initValue = {
				"value" : app.lookup("dtiBgn").value+app.getAppProperty("delimiter")+app.lookup("dtiEnd").value,
				"format" : app.getAppProperty("format"),
				"mask" : app.getAppProperty("mask"),
				"delimiter" : app.getAppProperty("delimiter")
			}
			
			/* 다이얼로그가 준비된 이후 처리할 이벤트 디스패치 */
			var voOpenEv = new cpr.events.CUIEvent("open");
			app.dispatchEvent(voOpenEv);
		});
		
		/* 다이얼로그에서 ESC 키가 눌렸을 때 다이얼로그를 닫음 */
		dialog.addEventListener("keydown", function(e) {
			if (e.keyCode == cpr.events.KeyCode.ESC){
				e.control.close();
			}
		});
		
		/* 다이얼로그가 닫혔을 때 발생하는 이벤트 정의 */
		dialog.addEventListener("close", function(e) {
			var control = e.control;
			
			var vsOldVal = app.getAppProperty("value");
			var vsRtrnVal = control.returnValue; // 반환 값
			
			var vsCurVal = app.lookup("dtiBgn").value + app.getAppProperty("delimiter") + app.lookup("dtiEnd").value
			
			if(vsCurVal != vsRtrnVal) {
				dateValChange = true;
			}
			
			
			
			/* 이전 값과 새로운 값이 동일하지 않은 경우에만 이벤트 디스패치 */
			if (vsRtrnVal != null && (vsOldVal != vsRtrnVal)){
				/* 공백의 초기화 값을 null로 설정 */
				vsRtrnVal = vsRtrnVal == "" ? null : vsRtrnVal;
				
				var voBfValueChangeEv = new cpr.events.CValueChangeEvent("before-value-change", {
					oldValue : vsOldVal,
					newValue : vsRtrnVal
				});
				app.dispatchEvent(voBfValueChangeEv);
				
				/* before-value-change에서 e.preventDefault 호출 시 값 설정 하지 않음 */
				if (!voBfValueChangeEv.defaultPrevented){
					// setChoseValue(vsRtrnVal);
					app.setAppProperty("value", vsRtrnVal);
					
					var voValueChangeEv = new cpr.events.CValueChangeEvent("value-change", {
						oldValue : vsOldVal,
						newValue : vsRtrnVal
					});
					app.dispatchEvent(voValueChangeEv);
				}
			}
			
			dateValChange = false;
			/* 다이얼로그가 닫힌 이후 처리할 이벤트 디스패치 */
			var voCloseEv = new cpr.events.CUIEvent("close");
			app.dispatchEvent(voCloseEv);
		});
	});
}


/*
 * 데이트 인풋에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDatepickerClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dtiBgn = e.control;
	
	/* 데이트 피커 컨텐츠 다이얼로그 열기 */
	app.lookup("btnOpen").click();
}

function getContextPath() {
	var hostIndex = location.href.indexOf(location.host) + location.host.length;
	
	return location.href.substring(hostIndex, location.href.indexOf("/", hostIndex+1));
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDtiBgnValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dtiBgn = e.control;
	
	if(dateValChange) return false;
	
	var vsDpEndVal = app.lookup("dtiEnd").value;
	if (vsDpEndVal != null && vsDpEndVal != ""){
		var vnDiff = getDiff(e.newValue, vsDpEndVal);
		if (vnDiff > 0){
			//시작일은 종료일 이전으로 선택해야 합니다.
			util.Msg.alert( "INF-M027");
			dtiBgn.putValue("");
			e.preventDefault();
			return;
		}
	}
	
	setAppValue();
}

function setAppValue() {
//	if ( (!ValueUtil.isNull(app.lookup("dtiBgn").value)) && (!ValueUtil.isNull(app.lookup("dtiEnd").value)) ) {
//		var vsSetVal = app.lookup("dtiBgn").value + app.getAppProperty("delimiter") + app.lookup("dtiEnd").value  ;
//		app.setAppProperty("value", vsSetVal);
//	} 

	var vsBgn = ""; 
	if(!ValueUtil.isNull(app.lookup("dtiBgn").value)) 
		vsBgn = app.lookup("dtiBgn").value;
	var vsEnd = ""; 
	if(!ValueUtil.isNull(app.lookup("dtiEnd").value))
	    vsEnd = app.lookup("dtiEnd").value;
	

	if ( (ValueUtil.isNull(app.lookup("dtiBgn").value)) && (ValueUtil.isNull(app.lookup("dtiEnd").value)) ) {
		app.setAppProperty("value", "");
	} else {
		var vsSetVal = vsBgn + app.getAppProperty("delimiter") + vsEnd  ;
		app.setAppProperty("value", vsSetVal);
	}
	
}


/*
 * 데이트 인풋에서 value-change 이벤트 발생 시 호출.
 * Dateinput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onDtiEndValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.DateInput
	 */
	var dtiEnd = e.control;
	
	if(dateValChange) return false;
	
	var vsDpBgnVal = app.lookup("dtiBgn").value;
	if (vsDpBgnVal != null && vsDpBgnVal != ""){
		var vnDiff = getDiff(e.newValue, vsDpBgnVal);
		if (vnDiff < 0){
			//종료일은 시작일 이후로 선택해야 합니다.
			util.Msg.alert( "INF-M011");
			dtiEnd.putValue("");
			e.preventDefault();
			return;
		}
	}
	
	setAppValue();
}
