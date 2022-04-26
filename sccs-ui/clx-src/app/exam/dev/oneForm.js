/************************************************
 * oneForm.js
 * Created at 2021. 7. 22. 오후 1:23:34.
 *
 * @author kim su hyun
 ************************************************/
var util = createCommonUtil();

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnload", function(pbSuccess){
		if(pbSuccess){
			
		}
	});
}
