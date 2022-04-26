/************************************************
 * TreeDialog.js
 * Created at 2019. 10. 11. 오전 11:06:58.
 *
 * @author HANS
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();



/*
 * "Search" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("subDeptList").send();
}


/*
 * "닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.close();
}


/*
 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var vcGrid = app.lookup("grd1");
	
	var voSelectedRow = vcGrid.getSelectedRow();
	
	if(voSelectedRow) {
		var returnValue = voSelectedRow.getRowData();
		app.close(returnValue);
	}
}





/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess){
			util.SelectCtl.selectItem(app, "treMenu", 0);
		}
	});
}
