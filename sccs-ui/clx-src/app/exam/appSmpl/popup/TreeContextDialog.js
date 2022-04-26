/************************************************
 * TreeContextDialog.js
 * Created at 2022. 1. 26. 오후 1:57:20.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "취소하기" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	app.close();
}

/*
 * "추가하기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	//타입 강제지정
	/** @type cpr.data.DataSet */
	var ds1 = app.getHostAppInstance().lookup("ds1");
	
	/** @type cpr.controls.Tree */
	var tree = app.getHostAppInstance().lookup("tre1");
	
	var label = app.lookup("ipb1").value;
	var value = app.lookup("ipb2").value;
	
	//value값 이 있는지 check
	if((ds1.getConditionalRowCount("value === '"+value+"'"))>0){
		//value값이 있는것
		alert("중복된 value값은 추가할 수 없습니다.");
		return false;
	}else if(label == null || value == null){
		alert("값을 전부 제대로 입력해 주세요");
		return false;
	}else{ 
		ds1.pushRowData(
			{"label":label,
			 "value":value,
			 "parent": tree.getItem(tree.getSelectedIndices()[0]).value
			}
		);
		tree.redraw();
		
		//행 추가시, comtitle안의 숫자 업데이트
		/** @type udc.com.comTitle */
		var comtitle = app.getHostAppInstance().lookup("comtitle1");
		
		/** @type cpr.controls.Grid */	
		var grd1 = app.getHostAppInstance().lookup("grd1");
		
		var counts = grd1.rowCount;
		
		comtitle.rowCount = counts;
		//추가된 행 선택상태로 변경시켜줌
		var vcRow = grd1.findFirstRow("value == '"+value+"'").getIndex();
		grd1.selectRows(vcRow);
		app.close();
	}
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("ipb1").focus();
}
