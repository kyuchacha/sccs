/************************************************
 * UdcTemplate.js
 * Created at 2022. 3. 18. 오후 2:55:03.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "팝업 열기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e) {
	app.openDialog("app/exam/udcTmp/popup/DailogUI", {
		width: 500,
		height: 600
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue) {
		;
	});
}