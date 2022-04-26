/************************************************
 * UtilSample01.js
 * Created at 2022. 3. 11. 오전 2:14:58.
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
 * "isNull" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	var result = f_IsNull();
	
	printSource(f_IsNull);
	
	var txt = "결과(Null=true, !Null=false) [ " + result + " ]";
	printResult(txt);
}

function f_IsNull() {
	var vsVal = util.Control.getValue(app, "ipbIsNull");
	//결과 : Null=true, !Null=false
	var result = ValueUtil.isNull(vsVal);
	return result;
}


/*
 * "isNumber" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	var result = f_IsNumber();
	
	printSource(f_IsNumber);
	
	var txt = "결과(숫자이면=true, 숫자가아니면=false) [ " + result + " ]";
	printResult(txt);
}

function f_IsNumber() {
	var vsVal = util.Control.getValue(app, "ipbIsNum");
	//결과 : 숫자이면=true, 숫자가아니면=false
	var result = ValueUtil.isNumber(vsVal);
	return result;
}


/*
 * "fixNull" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	var result = f_FixNull();
	
	printSource(f_FixNull);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_FixNull() {
	var vsVal = util.Control.getValue(app, "ipbFixNull");
	//해당 값에 대한 문자열을 반환한다(trim후). 해당값이 null이거나 정의되지 않은 경우, 공백("") 문자열을 반환
	var result = ValueUtil.fixNull(vsVal);
	return result;
}


/*
 * "fixBoolean" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var result = f_FixBoolean();
	
	printSource(f_FixBoolean);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_FixBoolean() {
	var vsVal = util.Control.getValue(app, "ipbFixBoolean");
	//해당 값을 불리언(Boolean) 타입으로 변환
	var result = ValueUtil.fixBoolean(vsVal)
	return result;
}


/*
 * "fixNumber" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	var result = f_FixNumber();
	
	printSource(f_FixNumber);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_FixNumber() {
	var vsVal = util.Control.getValue(app, "ipbFixNum");
	//해당 값을 숫자 타입으로 변환
	var result = ValueUtil.fixNumber(vsVal)
	return result;
}

/*
 * "fixFloat" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	var result = f_FixFloat();
	
	printSource(f_FixFloat);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_FixFloat() {
	var vsVal = util.Control.getValue(app, "ipbFixFloat");
	//해당 값을 숫자(Float)타입으로 변환
	var result = ValueUtil.fixFloat(vsVal);
	return result;
}


/*
 * "trim" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	var result = f_Trim();
	
	printSource(f_Trim);
	
	var txt = "결과 [" + result + "]";
	printResult(txt);
}

function f_Trim() {
	var vsVal = util.Control.getValue(app, "ipbTrim");
	//해당 값의 앞/뒤 공백을 제거한 문자열을 반환
	var result = ValueUtil.trim(vsVal);
	return result;
}


/*
 * "split" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	var btn6 = e.control;
	
	var result = f_Split();
	
	printSource(f_Split);
	
	var txt = "결과 [" + result + "]";
	printResult(txt);
}

function f_Split() {
	var vsVal = util.Control.getValue(app, "ipbSplitNum");
	var vsValGb = util.Control.getValue(app, "ipbSplitSlash");
	//문자열을 split한 배열을 반환
	var result = ValueUtil.split(vsVal, vsValGb);
	return result;
}


/*
 * "getLength" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	
	var result = f_GetLength();
	
	printSource(f_GetLength);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_GetLength() {
	var vsVal = util.Control.getValue(app, "ipbGetLength");
	//문자열 데이터의 길이(length)를 반환
	var result = ValueUtil.getLength(vsVal);
	return result;
}


/*
 * "getByteLength" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(e){
	var btn8 = e.control;
	
	var result = f_GetByteLength();
	
	printSource(f_GetByteLength);
	
	var txt = "결과 [ " + result + " ]";
	printResult(txt);
}

function f_GetByteLength() {
	var vsVal = util.Control.getValue(app, "ipbGetByte");
	//문자열 데이터의 길이(Byte length)를 반환
	var result = ValueUtil.getByteLength(vsVal);
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

