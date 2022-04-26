/************************************************
 * AuthSample01.js
 * Created at 2022. 3. 18. 오후 5:14:12.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	util.Submit.send(app, "subOnLoad_json", function(pbSuccess) {
		if (pbSuccess){
			
		}
	})
}



/*
 * "실행" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	//함수 실행
	var result = f_getMenuInfo();
	
	//스크립트 출력
	printSource(f_getMenuInfo);
	
	//결과 표시
	printResult(result);
}

function f_getMenuInfo() {
	var voMenuInfo = util.Auth.getMenuInfo(app);
	
	var result = voMenuInfo._keyArray[0] + " : " + voMenuInfo.get("MENU_ID") + "\n" +
					voMenuInfo._keyArray[1] + " : " + voMenuInfo.get("MENU_NM") + "\n" +
					voMenuInfo._keyArray[4] + " : " + voMenuInfo.get("CALL_PAGE");
					
	return result;
}



/*
 * "실행" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	var result = f_getMenuParam();
	
	printSource(f_getMenuParam);
	
	printResult(result);
}

function f_getMenuParam() {
	var voParam = { "MSG" : app.lookup("ipbParam").value};
 	util.MDI.open(app, "MoveSample02", voParam);
 	
 	var voMenuParam = util.Auth.getMenuParam(app);
 	var vsMsg = voMenuParam.MSG;
 	
 	return vsMsg;
}



/*
 * "실행" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var result = f_getUserInfo();
	
	printSource(f_getUserInfo);
	
	printResult(result);
}

function f_getUserInfo() {
	var result = "USER_ID : " + util.Auth.getUserInfo(app, "USER_ID") + "\n" +
					"USER_NAME : " + util.Auth.getUserInfo(app, "USER_NM") + "\n" +
					"LOGIN_IP : " + util.Auth.getUserInfo(app, "L_LOGIN_IP");
					
	return result;
}

/**
 * 사용자 정보를 반환한다.
 * @param {String} psUserInfoType (Optional) 사용자 정보 변수(ex: USER_ID)
 * @return {String | cpr.data.DataMap} 사용자 정보
 */
//function getUserInfo(psUserInfoType) {
//	var dmUserInfo = app.lookup("dmUserInfo");
//	if(ValueUtil.isNull(psUserInfoType)){
//		return dmUserInfo
//	}
//	return dmUserInfo.getValue(psUserInfoType);
//}





//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}



//== 결과 표시 ==//
function printResult(value) {
	app.lookup("optRslt").value = value;
}

