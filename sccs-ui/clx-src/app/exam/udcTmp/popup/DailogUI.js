/************************************************
 * DailogUI.js
 * Created at 2021. 01. 13. 오후 8:53:22.
 *
 * @author MK
 ************************************************/


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb1 = e.control;
	
	var ds1 = app.lookup("ds1");
	
	if(e.keyCode === cpr.events.KeyCode.ENTER){
		ds1.addRowData({who : "me", content : ipb1.value});
		ipb1.clear();
	}
}


/*
 * 데이터셋에서 load 이벤트 발생 시 호출.
 * build 메소드에 의해 데이터 구조가 재구성될 때 발생하는 이벤트. 초기 생성시에도 발생합니다.
 */
function onDs1Load(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
}


/*
 * 데이터셋에서 insert 이벤트 발생 시 호출.
 * row가 추가되는 경우 발생하는 이벤트. 발생 메소드 : addRow, addRowData, insertRow, insertRowData
 */
function onDs1Insert(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	if(e.row.getValue("who") == "bot")	return;
	
	addContent(e.row);
	
	setTimeout(function(){
		var content = e.row.getValue("content");
		addContent(ds1.addRowData({who:"bot", content:content + " 안내"}));
		addContent(ds1.addRowData({who:"bot", content:"<p>업무상 필요한 " + content + " 는 아래\n메뉴에서 신청해주세요<\/p>"}));	
	}, 500);
	
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function addContent(row){
	
	var grpContent = app.lookup("grpContent");
	
	var vsWho = row.getValue("who");
	var vsContent = row.getValue("content");
	
	var now = new Date();
	var nowHour = now.getHours();
	var nowMt = now.getMinutes();
	
	var vsNow = (nowHour <= 12 ? "오전 " + nowHour : "오후 " + (nowHour -12)) + ":" + (nowMt <= 9 ? "0" + nowMt : "" + nowMt);
	row.setValue("time", vsNow);
	
	var contentGroup = new cpr.controls.Container();
	// Layout
	var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
	var flowLayout_2 = new cpr.controls.layouts.FlowLayout();
	flowLayout_2.horizontalAlign = (vsWho == "me" ? "right" : "left");
	flowLayout_2.verticalAlign = "bottom";
	
	contentGroup.setLayout(flowLayout_2);
	(function(container){
		var hTMLSnippet_1 = new cpr.controls.HTMLSnippet();
		console.log("vsContent : ",vsContent);
		hTMLSnippet_1.value = vsContent;
		hTMLSnippet_1.style.css({
			"border" : "1px solid #dddddd",
			"border-radius" : "20px",
			"padding" : "10px",
			"max-width" : "350px"
		});
		container.addChild(hTMLSnippet_1, {
			"autoSize": "both",
			"width": "100px",
			"height": "151px",
		});
		
		var timeOutput = new cpr.controls.Output();
		timeOutput.value = vsNow;
		var outputIndex = (vsWho == "me" ? 0 : 1);
		container.insertChild(outputIndex, timeOutput, {
			"width" : "30px",
			"autoSize" : "both"
		});
		
	})(contentGroup);
	
	grpContent.addChild(contentGroup, {
		"autoSize": "height",
		"width": "100px",
		"height": "30px",
		"horizontalAlign": "right"
	});
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		grpContent.scrollTo(0, grpContent.getContentPaneRect().bottom);
	});
}

/*
 * 버튼 클릭시에 발생하는 이벤트
 */
function onButtonClick(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var button = e.control;
	var vbIsExpand = button.userAttr("isExpand") == "Y";
	var container = app.getContainer();
	var layout = container.getLayout();
	
	if(vbIsExpand){
		layout.setRowVisible(1, false);
		layout.setRowAutoSizing(1, false);
		layout.setRows(["1fr","1px","40px"]);
		button.userAttr("isExpand","N");
	}else{
		layout.setRowVisible(1, true);
		layout.setRows(["1fr","40px","40px"]);
		layout.setRowAutoSizing(1, true);
		button.userAttr("isExpand","Y");
	}
	
	e.preventDefault();
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var ipbChat = app.lookup("ipbChat");
	ipbChat.style.css("padding-right","40px");
}

function autoCompleteButtonClick(e){
	var button = e.control;
	
	var ds1 = app.lookup("ds1");
	ds1.addRowData({who : "me", content : button.value});
	
	var btn1 = app.lookup("btn1");
	btn1.click();
}
