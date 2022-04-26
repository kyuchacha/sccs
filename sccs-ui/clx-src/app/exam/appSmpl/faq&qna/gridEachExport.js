/************************************************
* gridEachExport.js
 * Created at 2022. 3. 21. 오후 2:45:44.
 *
 * @author 1amthomas
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

function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = value;	
}

function exportData() {
	//export할 그리드
	var vcGrd1 = app.lookup("grd1");
	var vcGrd2 = app.lookup("grd2");
	//export할 데이터 셋
	var vcDs3 = app.lookup("dsGrid3");
	var vcDs4 = app.lookup("dsGrid4");
	
	//데이터를 json 형식으로 전환
	var data1 = vcGrd1.getExportData(false);
	var data2 = vcGrd2. getExportData(false);
	var data3 = cpr.utils.ExportUtil.getExportData(vcDs3);
	var data4 = cpr.utils.ExportUtil.getExportData(vcDs4);
	
	//시트 명 지정
	data1.name = "main";
	data2.name = "sub1";
	data3.name = "sub2";
	data4.name = "sub3";
	
	//추출한 데이터를 JSON 데이터로 머징
	var mergeData = cpr.utils.ExportUtil.merge([data1, data2, data3, data4]);
	
	//전환된 데이터를 submission request data로 설정
	var subExport = app.lookup("smsExport");
	subExport.setRequestObject(mergeData);
	subExport.send();
	
}

function getExportData() {
	//export할 그리드
	var vcGrd1 = app.lookup("grd1");
	var vcGrd2 = app.lookup("grd2");
	
	//데이터를 json 형식으로 전환
	var data1 = vcGrd1.getExportData(false);
	var data2 = vcGrd2. getExportData(false);
}

function exportUtilGetExportData() {
	//export할 데이터 셋
	var vcDs3 = app.lookup("dsGrid3");
	var vcDs4 = app.lookup("dsGrid4");
	
	//데이터를 json 형식으로 전환
	var data3 = cpr.utils.ExportUtil.getExportData(vcDs3);
	var data4 = cpr.utils.ExportUtil.getExportData(vcDs4);
}

function merge() {
	//export할 그리드
	var vcGrd1 = app.lookup("grd1");
	var vcGrd2 = app.lookup("grd2");
	//export할 데이터 셋
	var vcDs3 = app.lookup("dsGrid3");
	var vcDs4 = app.lookup("dsGrid4");
	
	//데이터를 json 형식으로 전환
	var data1 = vcGrd1.getExportData(false);
	var data2 = vcGrd2. getExportData(false);
	var data3 = cpr.utils.ExportUtil.getExportData(vcDs3);
	var data4 = cpr.utils.ExportUtil.getExportData(vcDs4);
	
	//시트 명 지정
	data1.name = "main";
	data2.name = "sub1";
	data3.name = "sub2";
	data4.name = "sub3";
	
	//추출한 데이터를 JSON 데이터로 머징
	var mergeData = cpr.utils.ExportUtil.merge([data1, data2, data3, data4]);
	
	//전환된 데이터를 submission request data로 설정
	var subExport = app.lookup("smsExport");
	subExport.setRequestObject(mergeData);
	subExport.send();
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	printSource(getExportData);
}

/*
 * "실행" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	printSource(exportUtilGetExportData);
}

/*
 * "실행" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	printSource(merge);
}
