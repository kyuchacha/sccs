/************************************************
 * gridTextArea.js
 * Created at 2021. 11. 25 오후 4:17:17.
 *
 * @author hp
 ************************************************/

var txa

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	var displayValue = app.getAppProperty("columnName").toString().replace(/\r/g,'').replace(/\n/g,'')
	displayValue = ValueUtil.getLength(displayValue, "char") > 15 ?displayValue.slice(0, 16) + "..." : displayValue
	
	return displayValue
};

/*
 * 루트 컨테이너에서 dblclick 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 더블 클릭할 때 발생하는 이벤트.
 */
function onBodyDblclick(/* cpr.events.CMouseEvent */ e){

	txa.value = app.lookup("opt1").value
	
	/** @type {cpr.controls.Grid} **/
	var grid = app.getBindContext()["grid"]
	var column = app.getAppPropertyBindInfo("columnName").columnName
	if(!grid || !column) return false;
	
	var udcObject;
	for(var i = 0; i < grid.detail.cellCount; i++){
		var detailCell = grid.detail.getColumn(i);
		if(!detailCell.control) continue;
		if(detailCell.control.type === "udc.com.gridTextArea" && detailCell.columnName === column){
			udcObject = detailCell.control;
			break;
		}
	}
	
	var ctrlRect = udcObject.getActualRect();
	txa.addEventListenerOnce("blur", function(){
		
		txa.style.animateTo({
			"transform":"scaleY(0)"
		}, 0.2, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
		txa.visible = false;
		app.lookup("opt1").value = txa.value
	})
	
	
	txa.style.animateTo({
		"transform":"scaleY(1)"
	}, 0.2, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
	txa.visible = true;
	
	app.getRootAppInstance().floatControl(txa, {
		top : (ctrlRect.top - 30)  + "px",
		left : ctrlRect.left + "px",
		width : ctrlRect.width + "px",
		height : (ctrlRect.height + 60) + "px"
	});
	
	txa.focus();
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	txa = app.lookup("txa1");

	txa.style.animateTo({
		"transform":"scaleY(0)"
	}, 0.2, cpr.animation.TimingFunction.EASE_IN_OUT_CUBIC);
}
