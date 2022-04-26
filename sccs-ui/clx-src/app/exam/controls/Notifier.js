/************************************************
 * Notifier.js
 * Created at 2022. 3. 10. 오전 9:52:12.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "정보" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	app.lookup("ntf").info("알림");	
}

/*
 * "성공" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	app.lookup("ntf").success("성공 알림");	
}

/*
 * "위험" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	app.lookup("ntf").danger("위험 알림");	
}

/*
 * "경고" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	app.lookup("ntf").warning("경고 알림");
}

/*
 * "사용자 정의" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	app.lookup("ntf").notify("알림");
}

/*
 * "다이얼로그 버튼" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	
	app.openDialog("app/exam/controls/Notifier", {
		left : 100,
		top : 100,
		width: 1000,
		height: 700
	});
}

/*
 * "알림 버튼" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	app.lookup("ntf2").notify("알림");
}

