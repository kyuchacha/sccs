/************************************************
 * Grid.js
 * Created at 2022. 3. 8. 오전 10:19:28.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(e){
	var select = app.lookup("sampleCmb1").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	app.lookup("defaultGrid2").autoRowHeight = select;
}
