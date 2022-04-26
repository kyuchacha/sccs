/************************************************
 * Accordion.js
 * Created at 2022. 3. 4. 오후 4:40:31.
 *
 * @author 1amthomas
 ************************************************/

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(e){
	var btnInit = e.control;
	var select = app.lookup("sampleCmb").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleAcd").titleCollapse = true;		
	}else{
		app.lookup("sampleAcd").titleCollapse = false;	
	}
	app.lookup("sampleAcd").focus();
}

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(e){
	var btnInit2 = e.control;
	var select = app.lookup("sampleCmb2").value;
	if(select == null){
		alert("입력값을 먼저 선택하세요");
		return false;
	}
	if(select == "true"){
		app.lookup("sampleAcd2").multiple = true;		
	}else{
		app.lookup("sampleAcd2").multiple = false;	
	}
	app.lookup("sampleAcd2").focus();	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var item1 = app.lookup("sampleAcd").getSection(0);
	app.lookup("sampleAcd").setSelectedSections([item1]);
	var item2 = app.lookup("sampleAcd2").getSection(0);
	app.lookup("sampleAcd2").setSelectedSections([item2]);
}
