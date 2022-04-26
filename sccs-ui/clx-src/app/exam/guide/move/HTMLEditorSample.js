/************************************************
 * HTMLEditor.js
 * Created at 2020. 8. 26. 오후 1:06:05.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	util.Group.initSearchBox(app, "grpSearch");
}

/*
 * 임베디드 페이지에서 load 이벤트 발생 시 호출.
 * 페이지의 Load가 완료되었을 때 호출되는 Event.
 */
function onEdpSmartEditorLoad( /* cpr.events.CEvent */ e) {
	/** 
	 * @type cpr.controls.EmbeddedPage
	 */
	var edpSmartEditor = e.control;
	
	doCallMethodAfterLoaded("doEnableEditor", true);
}

/*
 * "설정" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	if (ValueUtil.isNull(app.lookup("cmb1").value)) {
		util.Msg.alert( "값을 선택해 주세요", null, function() {
			app.lookup("cmb1").focus();
			return false;
		});
	}
	
	return doCallMethodAfterLoaded("doEnableEditor", [app.lookup("cmb1").value]);
	
}

/*
 * "setValue" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click( /* cpr.events.CMouseEvent */ e) {
	return doCallMethodAfterLoaded("doSetContentHtml", ["<p>안녕하세요</p><br>스마트에디터 샘플입니다."])
}

/*
 * "getValue" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var contentValue = doCallMethodAfterLoaded("doGetContentHtml");
	
	app.lookup("txaScript").value = contentValue;
};

function doCallMethodAfterLoaded(psMethodName, psValue) {
	var smartEditor = app.lookup("edpSmartEditor");
	
	try {
		return smartEditor.callPageMethod(psMethodName, psValue);
	} catch (ex) {
		setTimeout(function() {
			return smartEditor.callPageMethod(psMethodName, psValue);
		}, 500)
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	app.lookup("cmb1").selectItem(0);
}