/************************************************
 * udcCmnPParty.js
 * Created at 
 *
 * @author 
 ************************************************/
var util = createCommonUtil();

var openedByChange = false;

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	return app.lookup("ipbPartyId").value;
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "required"){
		var vcIpbCode = app.lookup("ipbPartyId");
		//필수 입력 체크 조건 설정
		if(app.getAppProperty("required") === "Y"){
			vcIpbCode.fieldLabel = app.getHostProperty("fieldLabel");
			vcIpbCode.userAttr("required","Y");
		} else {
			vcIpbCode.userAttr("required","");
		}
	}
}



/*
 * 구성원ID 조회 [btnPopParty] 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopPartyClick(/* cpr.events.CMouseEvent */ e){
	// 검색어를 입력하고 팝업버튼을 누른경우, 이미 change 이벤트에 의해 팝업이 떠있기 때문에 다시 띄우지 않는다.
	if(openedByChange == true) {
		return false;
	}
	
	//팝업 호출
	doOpenPartyPopup(app.lookup("ipbPartyId").value);
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbPartyIdValueChange(/* cpr.events.CValueChangeEvent */ e){
	// 팝업호출 중인 경우에는 이벤트 Skip...
	if(openedByChange == true){
		return false;
	}
	
	// 변경된 값
	var vsPartyId = e.newValue;
	// 입력내용 삭제시 팝업없이 관련내용 삭제 -> 삭제인데도, 아래의 체크처리가 이루워짐에 따라 불필요한 메시지 호출됨으로 막아준다.
	if(vsPartyId == ""){
		// 데이터 Clear
		clearCallback();
		// 사용자 이벤트 Dispatch
		app.dispatchEvent(new cpr.events.CUIEvent("select"));
		return false;
	}
	
	// 검색 파라메터 셋팅
	var voDmParam = app.lookup("dmParam");
	voDmParam.setValue("strPartyId", vsPartyId);
	voDmParam.setValue("strPartyDiv", app.getAppProperty("iPartyDiv"));
	voDmParam.setValue("strNm", app.getAppProperty("iName"));
	
	//조회 서브미션 호출
	//조회결과가 단건일 경우 서브미션 로직 추가해야함.
//	var voParams = [{"mapper": "cmn-user01"
//					 ,"qry": ["selectPartyList:dsParty"]
//	                 ,"outds": "dsParty"
//	                 ,"param": "dmParam"}];
//
//	util.Submit.send(app, "subCheckParty_tran",  function(pbSuccess){
//		if(pbSuccess) {
//			var dsParty = app.lookup("dsParty");
//			// 검색결과가 1건이면 팝업없이 바로 값세팅
//			if(dsParty.getRowCount() == 1){
//				AppUtil.setAppProperty(app, "oPartyId", dsParty.getValue(0, "PARTY_ID"));
//				AppUtil.setAppProperty(app, "oNmKor", dsParty.getValue(0, "NM_KOR"));
//				AppUtil.setAppProperty(app, "oNmEng", dsParty.getValue(0, "NM_ENG"));
//				AppUtil.setAppProperty(app, "oNmCha", dsParty.getValue(0, "NM_CHA"));
//				AppUtil.setAppProperty(app, "oGenderRcd", dsParty.getValue(0, "GENDER_RCD"));
//				AppUtil.setAppProperty(app, "oBrtdy", dsParty.getValue(0, "BRTDY"));
//				AppUtil.setAppProperty(app, "oLnrSlrDivRcd", dsParty.getValue(0, "LNR_SLR_DIV_RCD"));
//				AppUtil.setAppProperty(app, "oNatRcd", dsParty.getValue(0, "NAT_RCD"));
//				AppUtil.setAppProperty(app, "oDeptCd", dsParty.getValue(0, "DEPT_CD"));
//				AppUtil.setAppProperty(app, "oDeptNm", dsParty.getValue(0, "DEPT_NM"));
//				AppUtil.setAppProperty(app, "oUserDivCd", dsParty.getValue(0, "USER_DIV_CD"));
//				AppUtil.setAppProperty(app, "oUserDivNm", dsParty.getValue(0, "USER_DIV_NM"));
//				
//				app.lookup("ipbPartyId").putValue(dsParty.getValue(0, "PARTY_ID"));
//				
//				app.dispatchEvent(new cpr.events.CUIEvent("search"));
//			}else{
//				// 검색결과가 여러건이면... 팝업 호출
//				clearCallback();
//				doOpenPartyPopup(vsPartyId);
//			}
//		}
//	}, voParams);
		clearCallback();
		doOpenPartyPopup(vsPartyId);
}

/**
 * 팝업을 호출한다.
 */
function doOpenPartyPopup(psPartyId){
	openedByChange = true;
	
	//초기 파라메터 셋팅
	var initValue = {
		strHostDiv: app.getAppProperty("iHostDiv"),
		strPartyId: psPartyId,
		strPartyDiv: app.getAppProperty("iPartyDiv"),
		strNm: app.getAppProperty("iName")
	};
	util.Dialog.open(app, "app/exam/dev/cmnPParty", 650, 450, function(/**@type cpr.events.CUIEvent */e){
		/**@type cpr.controls.Dialog*/
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue != null){
			AppUtil.setAppProperty(app, "oPartyId", returnValue.PARTY_ID);
			AppUtil.setAppProperty(app, "oNmKor", returnValue.NM_KOR);
			AppUtil.setAppProperty(app, "oNmEng", returnValue.NM_ENG);
			AppUtil.setAppProperty(app, "oNmCha", returnValue.NM_CHA);
			AppUtil.setAppProperty(app, "oGenderRcd", returnValue.GENDER_RCD);
			AppUtil.setAppProperty(app, "oBrtdy", returnValue.BRTDY);
			AppUtil.setAppProperty(app, "oLnrSlrDivRcd", returnValue.LNR_SLR_DIV_RCD);
			AppUtil.setAppProperty(app, "oNatRcd", returnValue.NAT_RCD);
			AppUtil.setAppProperty(app, "oBrtdy", returnValue.BRTDY);
			AppUtil.setAppProperty(app, "oDeptCd", returnValue.DEPT_CD);
			AppUtil.setAppProperty(app, "oDeptNm", returnValue.DEPT_NM);
			AppUtil.setAppProperty(app, "oUserDivCd", returnValue.USER_DIV_CD);
			AppUtil.setAppProperty(app, "oUserDivNm", returnValue.USER_DIV_NM);
			
			app.lookup("ipbPartyId").value = returnValue.PARTY_ID;
			
			app.dispatchEvent(new cpr.events.CUIEvent("search"));
		}
		
		openedByChange = false;
		
	}, initValue);
}

//App 속성값 Clear
function clearCallback(){
	app.lookup("ipbPartyId").putValue("");
	
	AppUtil.setAppProperty(app, "oPartyId", "");
	AppUtil.setAppProperty(app, "oNmKor", "");
	AppUtil.setAppProperty(app, "oNmEng", "");
	AppUtil.setAppProperty(app, "oNmCha", "");
	AppUtil.setAppProperty(app, "oGenderRcd", "");
	AppUtil.setAppProperty(app, "oBrtdy", "");
	AppUtil.setAppProperty(app, "oDeptCd", "");
	AppUtil.setAppProperty(app, "oDeptNm", "");
	AppUtil.setAppProperty(app, "oUserDivCd", "");
	AppUtil.setAppProperty(app, "oUserDivNm", "");
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPartyIdKeydown(/* cpr.events.CKeyboardEvent */ e){
	if(e.keyCode == cpr.events.KeyCode.ENTER){
		e.preventDefault();
	}
}
