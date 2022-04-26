/************************************************
 * Responsive_01.js
 * Created at 2021. 8. 19. 오전 9:06:47.
 *
 * @author ryu
 ************************************************/



/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var radio1 = app.lookup("rdb1");
	var radio2 = app.lookup("rdb7");
	var radio3 = app.lookup("rdb8");
	
	var colCount = e.screen.name == "default" ? 0 : 1;
	
	radio1.colCount = colCount;
	radio2.colCount = colCount;
	radio3.colCount = colCount;
}
