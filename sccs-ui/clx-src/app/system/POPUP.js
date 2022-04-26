

/*
 * "초기화 비밀번호 부여" 버튼(btnMdl1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMdl1Click2(e){
	var btnMdl1 = e.control;
	app.getRootAppInstance().openDialog("app/system/PUI_CM_039_01-04", {width: 500, height: 198}, function(dialog){

	});
}

/*
 * "회원탈퇴 요청" 버튼(btnMdl2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMdl2Click2(e){
	var btnMdl2 = e.control;
	app.getRootAppInstance().openDialog("app/system/PUI_CM_039_03-02", {width: 500, height: 152}, function(dialog){
//		dialog.style.addClass("modal-green");
	});
}

/*
 * "세션 만료 안내" 버튼(btnMdl5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMdl5Click2(e){
	var btnMdl5 = e.control;
	app.getRootAppInstance().openDialog("app/system/PUI_CM_040_02-01", {width: 500, height: 190}, function(dialog){
//		dialog.style.addClass("modal-green");
	});
}

/*
 * "계정 잠금 알림" 버튼(btnMdl3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMdl3Click2(e){
	var btnMdl3 = e.control;
	app.getRootAppInstance().openDialog("app/system/PUI_CM_040_03-02", {width: 500, height: 210}, function(dialog){
//		dialog.style.addClass("modal-green");
	});
}

/*
 * "도움말 등록 메뉴 선택" 버튼(btnMdl4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMdl4Click(e){
	var btnMdl4 = e.control;
	app.getRootAppInstance().openDialog("app/system/PUI_CM_043_02-04", {width: 500, height: 392}, function(dialog){
//		dialog.style.addClass("modal-green");
	});
}
