/************************************************
* InputBoxUpperLower.js
 * Created at 2022. 3. 21. 오후 1:22:49.
 *
 * @author aaajd
 ************************************************/


//QnA나 FAQ 예제가 아닌 경우 삭제
/*
 * "https://techdom.tomatosystem.co.kr/p/00001" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click2(e){
	//질의문자열 중 ps의 value 값에 해당 qna,faq 요청번호 입력
    //ex) window.open('https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn=qna&ps=12461');
	var selOpt = app.lookup("selOpt").value;
	var selNum = app.lookup("selNum").value;
	var vsLink = "https://techdom.tomatosystem.co.kr/p/00019/?bn=eXBuilder6&tn="+selOpt+"&ps="+selNum;
	window.open(vsLink);
}


function isUpperOrLower() {
	cpr.events.EventBus.INSTANCE.addFilter("before-value-change", function(e) {
		/* cpr.controls.UIControl*/
		var ctrl = e.control;
		if (ctrl.type != "inputbox") {
			return;
		}
		var inputCase = ctrl.userAttr("inputCase");
		if (inputCase == "uppercase") {
			if (/[a-z]/g.test(e.newValue)) {
				var newValue = e.newValue.toUpperCase();
				ctrl.value = newValue;
				e.preventDefault();
				e.stopPropagation();
			}
		} else if (inputCase == "lowercase") {
			if (/[A-Z]/g.test(e.newValue)) {
				var newValue = e.newValue.toLowerCase();
				ctrl.value = newValue;
				e.preventDefault();
				e.stopPropagation();
			}
		}
	
	});
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	isUpperOrLower();
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce2AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = isUpperOrLower;
}
