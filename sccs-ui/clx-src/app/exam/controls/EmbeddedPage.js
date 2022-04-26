/************************************************
 * EmbeddedPage.js
 * Created at 2022. 3. 7. 오후 4:29:49.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	app.lookup("sampleEmp1").frameName = "EmbeddedPage";
}

