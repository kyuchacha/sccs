/************************************************
 * FileInput.js
 * Created at 2022. 3. 7. 오후 4:55:36.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	app.lookup("sampleFit1").placeholder = "파일을 첨부 해주세요";	
}

/*
 * "실행" 버튼(btnInit5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit5Click(e){
	
	app.lookup("sampleFit5").droppableFile = false;	

	app.lookup("sampleFit5").focus();
}

/*
 * "실행" 버튼(btnInit6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit6Click(e){

	app.lookup("sampleFit6").showClearButton = true;		

	app.lookup("sampleFit6").focus();
}
