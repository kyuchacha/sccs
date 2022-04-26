/************************************************
* tabfolderItemChange.js
 * Created at 2022. 3. 22. 오전 10:01:19.
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

function reorderTab(){
	var vcTf = app.lookup("tf");
	var index = app.lookup("cmbVal").value;
	var isFutureIndex = app.lookup("cbxTrue").value;
	
	var vcTfItem = vcTf.getSelectedTabItem();
	
	var vsLblVal = "변경 전 아이템의 index:" + vcTfItem.itemIndex;
	
	vcTf.reorderTabItem(vcTfItem, index, isFutureIndex);
	
	vsLblVal = vsLblVal + ", 입력값:" + index + ", 변경후 아이템의 index:" + vcTfItem.itemIndex;
	app.lookup("optRslt").value = vsLblVal ;
	
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	/* 동작 실행*/
	reorderTab();
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce2AfterLoad(e){
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = reorderTab;
}
