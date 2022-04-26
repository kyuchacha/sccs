/************************************************
 * CTmpl.js
 * Created at 2022. 2. 25. 오후 4:40:31.
 *
 * @author 1amthomas
 ************************************************/

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbLangSelectionChange(e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	
	/* 언어 코드에 따른 다국어 설정 */
	cpr.I18N.INSTANCE.currentLanguage = app.lookup("cmbLang").getSelectionLast().value;
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = onCmbLangSelectionChange;
}
