/************************************************
 * embeddedApp_sample01.js
 * Created at 2022. 3. 07. 오후 4:21:20.
 *
 * @author "1amthomas"
 ************************************************/
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	alert("버튼 활성화");
}
