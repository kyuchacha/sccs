/************************************************
 * UtilSample03.js
 * Created at 2022. 3. 11. 오전 10:15:36.
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
 * "isEmail" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	//함수 실행
	var result = f_IsEmail();
	
	//스크립트 출력
	printSource(f_IsEmail);
	
	//결과 표시
	var txt = "E-mail 유형인가? [ " + result + " ]";
	printResult(txt);
}

function f_IsEmail() {
	var psVal = util.Control.getValue(app, "ipbIsEmail");
	//해당 값이 'E-mail' 유형인지 여부를 반환
//	var result = util.Validator.isEmail(psVal);
	var result = TypeUtil.isEmail(psVal);
	return result;
}


/*
 * "isURL" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	//공통모듈 실행
	var result = f_IsURL();
	
	//스크립트 출력
	printSource(f_IsURL);
	
	//결과 표시
	var txt = "URL 형식인가? [ " + result + " ]";
	printResult(txt);
}

function f_IsURL() {
	var psVal = util.Control.getValue(app, "ipbIsURL");
	//해당 값이 'URL' 형식에 맞는 문자열인지 여부를 반환
//	var result = util.Validator.isURL(psVal);
	var result = TypeUtil.isURL(psVal);
	return result;
}


/*
 * "isBizCSN" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	//공통모듈 실행
	var result = f_IsBizCSN();
	
	//스크립트 출력
	printSource(f_IsBizCSN);
	
	//결과 표시
	var txt = "사업자번호 형식에 맞는가? [ " + result + " ]";
	printResult(txt);
}

function f_IsBizCSN() {
	var psVal = util.Control.getValue(app, "ipbIsBiz");
	//해당 값이 '사업자 번호' 형식에 맞는 문자열인지 여부를 반환
//	var result = util.Validator.isBizCSN(psVal);
	var result = TypeUtil.isBizCSN(psVal);
	return result;
}


/*
 * "isSSN" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	//공통모듈 실행
	var result = f_IsSSN();
	
	//스크립트 출력
	printSource(f_IsSSN);
	
	//결과 표시
	var txt = "주민등록번호 형식에 맞는가? [ " + result + " ]";
	printResult(txt);
}

function f_IsSSN() {
	var psVal = util.Control.getValue(app, "ipbIsSSN");
	//해당 값이 '주민등록번호' 형식에 맞는지 여부를 반환
//	var result = util.Validator.isSSN(psVal);
	var result = TypeUtil.isSSN(psVal);
	return result;
}


/*
 * "isTelNo" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	
	//공통모듈 실행
	var result = f_IsTelNo();
	
	//스크립트 출력
	printSource(f_IsTelNo);
	
	//결과 표시
	var txt = "전화번호 형식에 맞는가? [ " + result + " ]";
	printResult(txt);
}

function f_IsTelNo() {
	var psVal = util.Control.getValue(app, "ipbIsTelNo");
	//해당 값이 일반 '전화번호' 형식에 맞는 문자열인지 여부를 반환
//	var result = util.Validator.isTelNo(psVal);
	var result = TypeUtil.isTelNo(psVal);
	return result;
}


/*
 * "isTelMobile" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	
	//공통모듈 실행
	var result = f_IsTelMobile();
	
	//스크립트 출력
	printSource(f_IsTelMobile);
	
	//결과 표시
	var txt = "핸드폰번호 형식에 맞는가? [ " + result + " ]";
	printResult(txt);
}

function f_IsTelMobile() {
	var psVal = util.Control.getValue(app, "ipbIsTelMob");
	//해당 값이 '핸드폰번호' 형식에 맞는 문자열인지 여부를 반환
//	var result = util.Validator.isTelMobile(psVal);
	var result = TypeUtil.isTelMobile(psVal);
	return result;
}


/*
 * "isFunc" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	var btn5 = e.control;
	
	//공통모듈 실행
	var result = f_IsFunc();
	
	//스크립트 출력
	printSource(f_IsFunc);
	
	//결과 표시
	var txt = "function 유형인가? [ " + result + " ]";
	printResult(txt);
}

function f_IsFunc() {
	var poFunc = util.Control.getValue(app, "rdbIsFunc");
	
	if (poFunc == "Y") {
		var temp = function() {};
	} else {
		var temp = "";
	}
	
	//alert(util.Validator.isFunc(temp));
	//해당 값이 'function' 유형인지 여부를 반환
//	var result = util.Validator.isFunc(temp);
	var result = util.isFunc(temp);
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
