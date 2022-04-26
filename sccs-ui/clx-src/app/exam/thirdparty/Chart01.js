/************************************************
 * RequestedChartReport.js
 * Created at 2020. 7. 9. 오후 6:05:18.
 *
 * @author ryu
 ************************************************/

var moInterval = null;
var rootApp = null;

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	/* 포틀릿 */
	//createDragManager(app);
	app.lookup("subList").send();
	rootApp = app.getRootAppInstance();
	if(rootApp.app.id == "app/com/main/main"){
		rootApp.addEventListener("windowResize", windowResize);
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	app.lookup("areaChart").dataSet = app.lookup("dsArea");
	app.lookup("areaChart").drawChart();
	
	app.lookup("barChart").dataSet = app.lookup("dsData");
	app.lookup("barChart").drawChart();
	
	app.lookup("CLineChart").dataSet = app.lookup("dsCustomLine");
	app.lookup("CLineChart").drawChart();
	
	app.lookup("circle").dataSet = app.lookup("dsPieData");
	app.lookup("circle").drawChart();
	
	app.lookup("edit").dataSet = app.lookup("dsEditor");
	app.lookup("edit").drawChart();
	
	app.lookup("pie").dataSet = app.lookup("dsPieData");
	app.lookup("pie").drawChart();
	
	app.lookup("barline").dataSet = app.lookup("dsLineBar");
	app.lookup("barline").drawChart();
	
	app.lookup("ybar").dataSet = app.lookup("dsYbar");
	app.lookup("ybar").drawChart();
	
	app.lookup("scatt").dataSet = app.lookup("dsScatterData");
	app.lookup("scatt").drawChart();
	
	app.lookup("pyr").dataSet = app.lookup("dsPyramid");
	app.lookup("pyr").drawChart();
	
	app.lookup("cPie").dataSet = app.lookup("dsPieData");
	app.lookup("cPie").drawChart();
	
	app.lookup("cLine").dataSet = app.lookup("dsData");
	app.lookup("cLine").drawChart();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubListSubmitDone(e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subIntervalList = e.control;
	
		if(subIntervalList.isSuccess()) {
			app.lookup("barChart").PushData(app.lookup("dsData"));
			app.lookup("areaChart").PushData(app.lookup("dsArea"));
			app.lookup("CLineChart").PushData(app.lookup("dsCustomLine"));
			app.lookup("circle").PushData(app.lookup("dsPieData"));
			app.lookup("edit").PushData(app.lookup("dsEditor"));
			app.lookup("pie").PushData(app.lookup("dsPieData"));
			app.lookup("barline").PushData(app.lookup("dsLineBar"));
			app.lookup("ybar").PushData(app.lookup("dsYbar"));
			app.lookup("scatt").PushData(app.lookup("dsScatterData"));
			app.lookup("cPie").PushData(app.lookup("dsPieData"));
			app.lookup("cLine").PushData(app.lookup("dsData"));
		}
}

function windowResize(){
	if (typeof(Event) === 'function') {
	  // modern browsers
	  window.dispatchEvent(new Event('resize'));
	} else {
	  // for IE and other old browsers
	  // causes deprecation warning on modern browsers
	  var evt = window.document.createEvent('UIEvents'); 
	  evt.initUIEvent('resize', true, false, window, 0); 
	  window.dispatchEvent(evt);
	}
}

/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(e){
	if(rootApp.app.id == "app/com/main/main"){
		rootApp.removeEventListener("windowResize", windowResize);
	}
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = onSubListSubmitSuccess;
}

/*
 * "https://echarts.apache.org/en/index.html" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://www.jsdelivr.com/package/npm/echarts');
}
