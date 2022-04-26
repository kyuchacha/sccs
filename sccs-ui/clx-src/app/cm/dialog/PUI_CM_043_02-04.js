/************************************************
 * PUI_CM_043_02-04.js
 * Created at 2022. 3. 25. 오전 10:04:22.
 *
 * @author "nhyu"
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
		
	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		console.log('11111111111');
		if (pbSuccess){
			util.SelectCtl.selectItem(app, "treMenu", 0);
		}
	});
}

/*
 * "선택완료" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var dmSelectedMenu = app.lookup("dmSelectedMenu");
	
	//console.log(JSON.stringify(voSelectedRow));
	
	//if(voSelectedRow) {
		var returnValue = dmSelectedMenu.getDatas();
		app.close(returnValue);
	//}
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMenuItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMenu = e.control;
	
	var dsAllMenu = app.lookup("dsAllMenu");
	var dmSelectedMenu = app.lookup("dmSelectedMenu");
	
	var selectedValue = e.item.value;
	var selectedDatasetRowIndex = treMenu.getIndexByValue(selectedValue);
	var selectedRowData = dsAllMenu.getRowData(selectedDatasetRowIndex);
	
	dmSelectedMenu.setValue("MENU_ID", selectedRowData.MENU_ID);
	dmSelectedMenu.setValue("MENU_NM", selectedRowData.MENU_NM);

}
