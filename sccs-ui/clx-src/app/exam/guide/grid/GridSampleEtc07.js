/************************************************
* GridSampleEtc07.js
 * Created at 2022. 3. 18. 오후 5:05:55.
 *
 * @author 1amthomas
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	//첫번째 그룹 펼치기
	var gridRowGroup = app.lookup("grdList").getGridRowGroup(0);
	if (gridRowGroup) {
		gridRowGroup.expanded = true;
	}	
}

/*
 * 그리드에서 rowgroup-click 이벤트 발생 시 호출.
 * Grid의 RowGroup 클릭시 발생하는 이벤트.
 */
function onGrd1RowgroupClick( /* cpr.events.CGridEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	/** @type HTMLElement */
	var dom = e.target;
	
	var classNames = dom.className.split(/\s+/g);
	
	// 접기 펼치기 클릭
	if (classNames.indexOf("expander") !== -1) {
		e.rowgroup.expanded = !e.rowgroup.expanded;
	}
	
}