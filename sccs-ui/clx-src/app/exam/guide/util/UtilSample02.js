/************************************************
 * UtilSample02.js
 * Created at 2022. 3. 11. 오전 9:39:39.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.FreeForm.init(app, ["grpFormFunc"]);
}

/*
 * "isValid" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	var result = f_IsValid();
	
	printSource(f_IsValid);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_IsValid() {
	var vsVal = util.Control.getValue(app, "ipbIsValid");
	// 올바른 날짜인지를 체크
	var pnYear = Number(vsVal.substring(0, 4));
	var pnMonth = Number(vsVal.substring(4, 6));
	var pnDay = Number(vsVal.substring(6, 8));
	
	var result = DateUtil.isValid(pnYear, pnMonth, pnDay);
	return result;
}


/*
 * "format" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	var result = f_Format();
	
	printSource(f_Format);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_Format() {
	var vsVal = util.Control.getValue(app, "ipbFormat1");
	var vsValPtn = util.Control.getValue(app, "ipbFormat2");
	//날짜를 지정한 패턴의 문자열로 반환
	var result = DateUtil.format(DateUtil.toDate(vsVal, "YYYYMMDD"), vsValPtn);
	return result;
}


/*
 * "toDate" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	var result = f_ToDate();
	
	printSource(f_ToDate);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_ToDate() {
	var vsVal = util.Control.getValue(app, "ipbToDate1");
	var vsValPtn = util.Control.getValue(app, "ipbToDate2");
	//날짜 문자열을 Date형으로 변환하여 반환
	var result = DateUtil.toDate(vsVal, vsValPtn);
	return result;
}


/*
 * "addDate" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var result = f_AddDate();
	
	printSource(f_AddDate);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_AddDate() {
	var vsVal = util.Control.getValue(app, "ipbAddDate1");
	var vsValTerm = util.Control.getValue(app, "ipbAddDate2");
	//현재 날짜에 해당 날짜만큼 더한 날짜를 반환
	var result = DateUtil.addDate(vsVal, vsValTerm);
	return result;
}


/*
 * "addMonth" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var result = f_AddMonth();
	
	printSource(f_AddMonth);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_AddMonth() {
	var vsVal = util.Control.getValue(app, "ipbAddMonth1");
	var vsValTerm = util.Control.getValue(app, "ipbAddMonth2");
	//현재 날짜에 해당월만큼 더한 날짜를 반환
	var result = DateUtil.addMonth(vsVal, vsValTerm);
	return result;
	
}


/*
 * "getMonthLastDay" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	var result = f_GetMonthLastDay();
	
	printSource(f_GetMonthLastDay);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_GetMonthLastDay() {
	var psDate = util.Control.getValue(app, "ipbGetMonthLastDay");
	//해당월의 마지막 일자를 반환
	var result = DateUtil.getMonthLastDay(psDate);
	return result;
}


/*
 * "getDiffDay" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	var result = f_GetDiffDay();
	
	printSource(f_GetDiffDay);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_GetDiffDay() {
	var psDate1st = util.Control.getValue(app, "ipbGetDiffDay1");
	var psDate2nd = util.Control.getValue(app, "ipbGetDiffDay2");
	//두 날짜간의 일(Day)수를 반환
	var result = DateUtil.getDiffDay(psDate1st, psDate2nd)
	return result;
}


/*
 * "getDayOfWeek" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	var result = f_GetDayOfWeek();
	
	printSource(f_GetDayOfWeek);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_GetDayOfWeek() {
	var psDate = util.Control.getValue(app, "ipbGetDayOfWeek");
	//입력한 일자에 해당되는 한글 요일을 반환
	var result = DateUtil.getDayOfWeek(psDate);
	return result;
}



//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}



//== 결과 표시 ==//
function printResult(value) {
	app.lookup("optRslt").value = value;
}
