/************************************************
 * ControlSample04.js
 * Created at 2022. 3. 11. 오전 1:11:06.
 *
 * @author jiyeon
 ************************************************/

var util = createCommonUtil();

//util.Group.init(app);
//util.Group.clear(app, paGrpId);
//util.Group.setFloatGrp(app, poGroup);


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	util.FreeForm.init(app, ["grpFormFunc", "grp8"]);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	util.SelectCtl.selectItem(app, "cmb3", 1);
	util.SelectCtl.selectItem(app, "ltb1", "1,4");
	util.SelectCtl.selectItem(app, "ckg1", "1,3");
	util.SelectCtl.selectItem(app, "rdb2", 2)
}

/*
 * "init" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	f_init();
	
	printSource(f_init);
}

function f_init() {
	util.Group.init(app);
}


/*
 * "setFloatGrp" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
	f_setFloatGrp();
	
	printSource(f_setFloatGrp);
}

function f_setFloatGrp() {
	util.Group.setFloatGrp(app, app.lookup("grpFloat"));
}

/*
 * "초기화" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	
	f_clear();
	
	printSource(f_clear);
}

function f_clear() {
	util.Group.clear(app, "grp8");
}



//== 스크립트 출력 ==//
function printSource(value) {
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = value;	
}