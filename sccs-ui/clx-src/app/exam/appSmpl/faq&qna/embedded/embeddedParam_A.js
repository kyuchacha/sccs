/************************************************
 * FAQ52_EMBEDEDAPP.js
 * Created at 2022. 2. 22. 오후 2:52:23.
 *
 * @author 1amthomas
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	if(!app.isEmbeddedAppInstance()){
		var vsParam =app.getAppProperty("param");
		app.lookup("opt1").value = "전달받은 속성값: "+vsParam;			
	}
	
	var initValue = app.getHost().initValue;
	if(initValue != null){
		app.lookup("opt1").value = "전달받은 속성값: "+initValue;			
	}
}
