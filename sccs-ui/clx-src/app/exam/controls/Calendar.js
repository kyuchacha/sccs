/************************************************
 * Calendar.js
 * Created at 2022. 3. 7. 오후 2:43:40.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var sampleCal1 = app.lookup("sampleCal1");
	sampleCal1.defaultDate = new Date("2022-03-10");
	sampleCal1.minDate = new Date("2022-01-01");
	sampleCal1.maxDate = new Date("2022-12-31");
	sampleCal1.focus();
}

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(e){
	var sampleCal2 = app.lookup("sampleCal2");
	sampleCal2.locale = "en";
	sampleCal2.headerFormat = 'YY/MM';
	sampleCal2.footerFormat = 'MM/DD/YYYY';
	sampleCal2.focus();
}

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var sampleCal3 = app.lookup("sampleCal3");
	sampleCal3.headerVisible = false;
	sampleCal3.footerVisible = false;
	sampleCal3.selectionType = "multi";
	sampleCal3.focus();
}

/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(e){
	var sampleCal4 = app.lookup("sampleCal4");
	
	sampleCal4.addAnniversary({
		date: "*1003",
		label: "개천절"
	});
	sampleCal4.addAnniversary({
		date: "*1009",
		label: "한글날"
	});
	sampleCal4.addAnniversary({
		date: "*0815",
		label: "광복절"
	});
	
	sampleCal4.showAnniversary = true;
	sampleCal4.enabledDateExp = "getDate() != 19";
	sampleCal4.redraw();
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	var vsSelectFir = app.lookup("sampleCmb1").value;
	var vsSelectSec = app.lookup("sampleCmb2").value;
	if(vsSelectFir == null || vsSelectSec == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	var vaButtons = vsSelectSec.split(',');

	app.lookup("sampleCal5").datePosition = vsSelectFir;
	app.lookup("sampleCal5").headerButtons = vaButtons;

}
