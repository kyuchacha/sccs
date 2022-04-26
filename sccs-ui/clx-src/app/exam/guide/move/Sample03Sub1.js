/************************************************
 * Template7011.js
 * Created at 2020. 4. 23. 오전 10:49:28.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	util.Grid.init(app, ["grdMst"]);
	
	//함수호출
	f_setInitValue();
	
	//스크립트 내용 표시
	app.lookup("txaScript").value = "" + f_setInitValue;
	
}

/**
 * 화면에 표시할 스크립트 내용을 기술 
 */
function f_setInitValue() {
	//조회조건에 전달받은 파라메터 셋팅
	var vsInitValue = app.getHostProperty("initValue");
	
	app.lookup("ipbCd").value = vsInitValue.initCd;
	app.lookup("ipbNm").value = vsInitValue.initNm;
	
}


/*
 * "선택닫기" 버튼(btnSelect)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelect = e.control;
	var returnValue = {
		"rtnValue": "rtnVal",
		"rtnValue2": "rtnVal2"
	};
	
	app.close(returnValue);
	
	//예시: 데이터셋 리턴
	//app.close(app.lookup("ds1"));
}


/*
 * "화면닫기" 버튼(btnClose2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClose2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose2 = e.control;
	app.close();
}
