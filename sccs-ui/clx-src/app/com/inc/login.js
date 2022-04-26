/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

//var mnKeySize = 128;
//var mnIterationCount = 10000;
//var msSalt = "0c68efe9e3c3a02b3f9f69a08987e4ab";
//var msIv = "18b8e16db963ae9bfe9fccbe37d452e0";
//var msPassPhrase = "exb6Frame";

/**
 * 쿠키를 설정합니다.
 * 
 * @param {String} psName
 * @param {Strubg} psValue
 * @param {Number} pnExpireDate
 */
function setCookie(psName, psValue, pnExpireDate) {
	var voToday = new Date();
	voToday.setDate(voToday.getDate() + parseInt(pnExpireDate));
	document.cookie = psName + "=" + escape(psValue) + ";path=/;expires=" + voToday.toUTCString() + ";";
}


/**
 * 쿠키를 가져옵니다.
 * @param {String} psName
 */
function getCookie(psName) {
	var vsCookie = document.cookie + ";";
	var vaItems = vsCookie.split(";");
	var vaItemInfo = null;
	var sccs_login_id = null;
	vaItems.some(function(item){
		vaItemInfo = item.split("=");
		if (psName == vaItemInfo[0].trim()){
			sccs_login_id = vaItemInfo[1].replace(/;/gi, "");
			return true;
		}
	});
	return sccs_login_id;
}

function deleteCookie(name) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = name + "= " + "; expires=" + expireDate.toUTCString() + "; path=/";
}


/************************************************
 * 컨트롤 이벤트
 ************************************************/
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	/* 쿠키 설정 */
	var vsCookieId = getCookie("sccs-login-id");
	var dsParam = app.lookup("dsParam");
	
	if (!ValueUtil.isNull(vsCookieId)){
		//util.DataMap.setValue(app, "dsParam", "USER_ID", vsCookieId);
		app.lookup("ipbUserNm").value = vsCookieId;
		app.lookup("cbxRmbr").checked = true;

		app.lookup("ipbPw").focus();
	} else {
		app.lookup("ipbUserNm").focus();
	}
	util.Control.redraw(app, "grpLoginBd");
	
	//어플리케이션 로케일  조회 (다국어 및 language.json 필요시)
	//app.lookup("subLocale").send();
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbUserNmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbUserNm = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("ipbPw").focus();
	}
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPwKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPw = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnLogin").click();
	}
}


/*
 * "Log In" 버튼(btnLogin)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoginClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLogin = e.control;
	
	//TODO 로그인 관련 Validate 처리를 작성하십시오.
	var dsParam = app.lookup("dsParam");
	var username = dsParam.getValue("USER_ID");
	var pwd = dsParam.getValue("PWD");
	
	if(!util.validate(app, ["ipbUserNm", "ipbPw"])) return false;

	var vcCbxRmbr = app.lookup("cbxRmbr");
	if (vcCbxRmbr.checked == true) {
		setCookie("sccs-login-id", username, 30);
	} else {
		deleteCookie("sccs-login-id");
	}
	
//	SSL을 적용 할 수 없는 환경 일경우 파라미터로 랜덤생성된 iv 과 암호화된 값을 전달하고 
// salt값은 사용자 id를 사용하는 방식으로 구현 필요 
//	var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
//  var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    
//	var aesUtil = new AesUtil(mnKeySize, mnIterationCount);
//	var encString = aesUtil.encrypt(msSalt, msIv, msPassPhrase, pwd);
//	
//	util.DataMap.setValue(app, "dsParam", "PWD", encString);
	
	//로그인 서브미션 호출;
	util.Submit.send(app, "subLogin", function(pbSuccess){
		if(pbSuccess){
			var sublogin = app.lookup("subLogin");
			
			var code = sublogin.getMetadata("code");
			var sttsCd = sublogin.getMetadata("sttsCd");
			var message = sublogin.getMetadata("msg");
			
			if(code == "S") {
				if(sttsCd == "10") {
					alert(message);	
					return;
				} else if(sttsCd == "20") {
					alert(message);
					return;
				} else if(sttsCd == "21") {
					alert(message);
					return;
				} else if(sttsCd == "30") {
					alert(message);
					return;
				} else if(sttsCd == "40") {
					alert(message);
					return;
				} else if(sttsCd == "50") {
					alert(message);
					return;
				} else {
					/* 메인 화면으로 전환 (SPA 전환) */
					cpr.core.App.load("app/com/main/main", function(newapp) {
						app.close();
						newapp.createNewInstance().run();
					});
					return;
				}
			} else if(code == "D") {
				util.Msg.confirmDialog(app, message, null, function(e){
					if(e.control.returnValue.closeState === "confirm") {
						var dsParam = app.lookup("dsParam");
						dsParam.setValue("forceLoginYn", "Y");
						util.Control.dispatchEvent(app, "btnLogin", "click");	
					}
				});
			} else {
				util.Msg.alertDialog(app, message);	
				return;
			}
		
//			if(msg != null) {
//				//util.Msg.alertDialog(app, "INF-M001");
//				alert(msg);
//				return;
//			}
//		    /* 메인 화면으로 전환 (SPA 전환) */
//			cpr.core.App.load(appId, function(loadedApp){
//				loadedApp.createNewInstance().run();
//				app.dispose();
//			});

		}
	});
}

/*
 * "비밀번호 초기화" 버튼(btnRst)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRstClick(e){
	util.Dialog.open(app, "app/system/PUI_CM_039_01-06", 500, 137, function(){
	});
}

/*
 * "회원가입" 버튼(btnRgst)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRgstClick(e){
	util.Dialog.open(app, "app/system/PUI_CM_039_01-05", 600, 203, function(){
	});
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxRmbrValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxRmbr = e.control;
	var vcIpbPw = app.lookup("ipbPw");
	
	if (cbxRmbr.checked){
		vcIpbPw.secret = true;
	} else {
		vcIpbPw.secret = false;
	}
}
