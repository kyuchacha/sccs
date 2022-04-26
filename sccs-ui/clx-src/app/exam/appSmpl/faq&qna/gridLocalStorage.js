/************************************************
* gridLocalStorage.js
 * Created at 2022. 3. 22. 오전 11:07:57.
 *
 * @author aaajd
 ************************************************/


//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btnInit = e.control;
	getColumnLayout();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getColumnLayout + "";
}

/*
 * "실행" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit2 = e.control;	
	setVisible();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setVisible + "";
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit3 = e.control;
	setColumnLayout();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setColumnLayout + "";
}

/*
 * "실행" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit4 = e.control;
	initGrid();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = initGrid + "";
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	localStorage.clear();
}

/*사용자 정의 함수*/

function initGrid(){
	var vcGrd = app.lookup("grdLayout");
	//그리드 초기 설정 정보를 반환합니다. 
	var vcGrdInit = vcGrd.getInitConfig();
	//그리드 초기 설정으로 세팅합니다.
	vcGrd.init(vcGrdInit);
	
}

/**
 * 스토리지에 그리드 레아아웃 저장
 */
function getColumnLayout(){
	var vcCmbType = app.lookup("cmbType");
	var vcGrd = app.lookup("grdLayout");	
	
	//그리드 레이아웃 정보를 반환합니다.
	var vcGrdLayout = vcGrd.getColumnLayout();
	
	//스토리지에 그리드 레이아웃을 저장
	localStorage.setItem( "grdLayout_" + vcCmbType.value , JSON.stringify(vcGrdLayout));		
	alert("스토리지에 저장되었습니다.")
}

function setColumnLayout(){
	
	var vcCmbType = app.lookup("cmbLayout");
	var vcGrd = app.lookup("grdLayout");	
	
	var layout = localStorage.getItem("grdLayout_" + vcCmbType.value);
	if (layout != null) {
		var grd1 = app.lookup("grdLayout");
		//그리드 레이아웃 정보를 세팅합니다
		grd1.setColumnLayout(JSON.parse(layout));
	}
	
	app.lookup("grdLayout").redraw();
	
}

/**
 * 그리드 컬럼 visible 처리
 */
function setVisible(){
	var grd = app.lookup("grdLayout");
	var combo = app.lookup("cmbIndex");
	var combo1 = app.lookup("cmbVisible")
	grd.columnVisible( parseInt(combo.value) , combo1.value == "true" ? true : false);
}
