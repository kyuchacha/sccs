 /**
* UDC 내의 컨트롤의 접근을 위해 앱인스턴스를 반환한다. 
* @return app;
*/
exports.getUDCApp = function(){
	return app;
}
 
/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnConfirmClick(/* cpr.events.CMouseEvent */ e){
	app.dispatchEvent(new cpr.events.CUIEvent("close"));
	app.dispose();
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancleClick(/* cpr.events.CMouseEvent */ e){	
	app.dispatchEvent(new cpr.events.CUIEvent("cancel"));
	app.dispose();
}


/**
 * 
 * @param pText 실제 텍스트 값을 입력  ('\n'이후는  다음 행에 표시됨. )
 */
exports.setMsgText = function(pText){
	app.lookup("optMsg").value = pText;
}


/**
 * 퍼블팀 요청으로 클래스를 추가해주는 함수 추가 (2019.4.11)
 * @param pClassName 특정시에는 클래스명을 파라미터로 
 */
exports.addClassMsgText = function(pClassName){
	app.lookup("optMsg").style.addClass(pClassName);
}



/**
 * 
 * @param pMsgId String language.json파일에서 사용한 id를 파람으로 적용 ( ex."ALT-CM0005")
 */
exports.setMsgTextById = function(pMsgId){
	app.lookup("optMsg").value = cpr.I18N.INSTANCE.message(pMsgId);
}



/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("btnConfirm").focus();
}



/**
 * 
 * @param pText 실제 텍스트 값을 입력  ('\n'이후는  다음 행에 표시됨. )
 */
exports.setMsgTitle = function(psTitle){
	if(psTitle) {
		app.lookup("optTitle").value = psTitle;	
	}
}


/*
 * 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 2019. 11. 21.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	e.stopPropagation();	// 클릭이벤트 추가 전파방지를 위해 추가 
	app.dispatchEvent(new cpr.events.CUIEvent("cancel"));
	app.dispose();
}
