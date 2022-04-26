/************************************************
 * TabSample01.js
 * Created at 2022. 3. 10. 오후 3:55:25.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//폼 초기화
	util.FreeForm.init(app, "grpFormFunc");
}


/*
 * "확인" 버튼(btnGetSelectedId)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetSelectedIdClick(e){
	var btnGetSelectedId = e.control;
	
	var result = f_getSelectedId();
	
	//스크립트 출력
	printSource(f_getSelectedId);
	
	//결과 표시
	var txt = "현재 선택된 Tab의 ID = " + result;
	printResult(txt);
}

function f_getSelectedId() {
	//ID반환
	return util.Tab.getSelectedId(app, "tabForm");
}


/*
 * "선택" 버튼(btnSetSelectedTabItemById)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetSelectedTabItemByIdClick(e){
	var btnSetSelectedTabItemById = e.control;
	
	//함수 실행
	f_setSelectedTabItemById();
	
	//스크립트 출력
	printSource(f_setSelectedTabItemById);
	
	//결과 표시
	printResult("선택된 TAB 확인 ");
}

function f_setSelectedTabItemById() {
	var vsTabId = util.Control.getValue(app, "cmbSelTab1");
	
	if (vsTabId == null || vsTabId == "") {
		alert("입력값을 선택하신 후 진행하시기 바랍니다.");
		return;
	}
	
	//선택
	util.Tab.setSelectedTabItemById(app, "tabForm", vsTabId);
}


/*
 * "숨기기" 버튼(btnSetVisibleFalse)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetVisibleFalseClick(e){
	var btnSetVisibleFalse = e.control;
	
	//함수 실행
	f_setVisibleFalse();
	
	//스크립트 출력
	printSource(f_setVisibleFalse);
	
	//결과 표시
	printResult("TAB 확인 ");
}

function f_setVisibleFalse() {
	var vsTabId = util.Control.getValue(app, "cmbSelTab2");
	
	if (vsTabId == null || vsTabId == "") {
		alert("입력값을  선택하신 후 진행하시기 바랍니다.");
		return;
	}
	
	//탭 숨기기
	util.Tab.setVisibleTabItem(app, "tabForm", vsTabId, false);
}


/*
 * "보이기" 버튼(btnSetVisibleTrue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetVisibleTrueClick(e){
	var btnSetVisibleTrue = e.control;
	
	//함수 실행
	f_setVisibleTrue();
	
	//스크립트 출력
	printSource(f_setVisibleTrue);
	
	//결과 표시
	printResult("TAB 확인 ");
}

function f_setVisibleTrue() {
	var vsTabId = util.Control.getValue(app, "cmbSelTab2");
	
	if (vsTabId == null || vsTabId == "") {
		alert("입력값을  선택하신 후 진행하시기 바랍니다.");
		return;
	}
	
	//탭 보이기
	util.Tab.setVisibleTabItem(app, "tabForm", vsTabId, true);
}


/*
 * "비활성화" 버튼(btnSetEnableFalse)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetEnableFalseClick(e){
	var btnSetEnableFalse = e.control;
	
	//함수 실행
	f_setEnableFalse();
	
	//스크립트 출력
	printSource(f_setEnableFalse);
	
	//결과 표시
	printResult("TAB 확인 ");
}

function f_setEnableFalse() {
	var vsTabId = util.Control.getValue(app, "cmbSelTab3");
	
	if (vsTabId == null || vsTabId == "") {
		alert("입력값을  선택하신 후 진행하시기 바랍니다.");
		return;
	}
	
	//탭 비활성화
	util.Tab.setEnableTabItem(app, "tabForm", vsTabId, false);
}


/*
 * "활성화" 버튼(btnSetEnableTrue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetEnableTrueClick(e){
	var btnSetEnableTrue = e.control;
	
	//함수 실행
	f_setEnableTrue();
	
	//스크립트 출력
	printSource(f_setEnableTrue);
	
	//결과 표시
	printResult("TAB 확인 ");
}

function f_setEnableTrue() {
	var vsTabId = util.Control.getValue(app, "cmbSelTab3");
	
	if (vsTabId == null || vsTabId == "") {
		alert("입력값을  선택하신 후 진행하시기 바랍니다.");
		return;
	}
	
	//탭 활성화
	util.Tab.setEnableTabItem(app, "tabForm", vsTabId, true);
	
}


/*
 * "확인" 버튼(btnGetSelectedNm)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetSelectedNmClick(e){
	var btnGetSelectedNm = e.control;
	
	//함수 실행
	var result = f_getSelectedNm();
	
	//스크립트 출력
	printSource(f_getSelectedNm);
	
	//결과 표시
	var txt = "현재 선택된 Tab의 명칭 = " + result;
	printResult(txt);
}

function f_getSelectedNm() {
	return util.Tab.getSelectedNm(app, "tabForm");
}



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
