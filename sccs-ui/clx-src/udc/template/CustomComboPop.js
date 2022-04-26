/************************************************
 * customcombo_pop1.js
 * Created at 2018. 12. 27. 오후 3:11:17.
 *
 * @author tomato
 ************************************************/

var parentApp = null;

/*
 * "X" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	parentApp.callAppMethod("reset");
	app.getHost().dispose();
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	parentApp.callAppMethod("reset");
	app.getHost().dispose();
}





/*
 * Body에서 dispose 이벤트 발생 시 호출.
 * 컨트롤이 dispose될 때 호출되는 이벤트.
 */
function onBodyDispose(/* cpr.events.CEvent */ e){
	parentApp = null;
}





/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var initValue = app.getHost().initValue;
	if(initValue){
		parentApp = initValue.app;
		/**
		 * @type cpr.data.DataView
		 */
		var ds = initValue.ds;
		var listdata = app.lookup("listdata");
		listdata.clear();
		ds.copyToDataSet(listdata);
		app.lookup("lbx1").redraw();
	}
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var lbx1 = app.lookup("lbx1");
	var item = lbx1.getSelectionFirst();
	if(item){
		lbx1.deleteItemByValue(item.value);
	}
}


/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var ipb = app.lookup("ipb1");
	var label = ipb.value;
	addItem(label);
	ipb.value = "";
}

function addItem(label){
	if(label == ""|| label == null){
		//TODO 메시지
		return;
	}
	var value = generateUUID();
	var ds = app.lookup("listdata");
	ds.addRowData({"label":label,"value":value});
	app.lookup("lbx1").redraw();
}

function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx'.replace(/[xy]/g,function(c){
		var r = (d + Math.random()* 16) % 16 |0;
		d = Math.floor(d/16);
		return (c=='x' ? r:(r&0x7|0x8)).toString(16);
	});
	return uuid;
}

/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	parentApp.callAppMethod("transferData",app.lookup("listdata"));
	parentApp.callAppMethod("reset");
	app.getHost().dispose();
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	if(e.keyCode == 13){
		addItem(ipb1.displayText);
		ipb1.value ="";
	}
}


/*
 * 리스트 박스에서 dragstart 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 시작할 때 발생하는 이벤트.
 */
function onLbx1Dragstart(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.ListBox
	 */
	var lbx1 = e.control;
	/**
	 * @type HTMLElement
	 */
	var target = e.target;

	if(target.classList.contains("cl-listbox-item")){
		target.classList.add("cl-dragstart");
		//클래스 적용 했을때 반응이 느리다면 인라인 스타일로 적용
//		target.style.backgroundColor = "#45A0CE";
		
		
	}
	requestAnimationFrame(function(){
		target.classList.remove("cl-dragstart");
		//클래스 적용 했을때 반응이 느리다면 인라인 스타일로 적용
		//		target.style.backgroundColor = null;
	});
}
