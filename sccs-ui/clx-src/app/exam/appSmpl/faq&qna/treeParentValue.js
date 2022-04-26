/************************************************
* treeParentValue.js
 * Created at 2022. 3. 21. 오전 9:33:05.
 *
 * @author 1amthomas
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

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	getRootItem();
	
	var ace2 = app.lookup("ace2");
	ace2.value = getRootItem;
	
}

function getRootItem() {
	
	// 타겟 아이템
	var vsCmbItemVal = app.lookup("cmb2").value;
	
	var vcTree = app.lookup("treMn");
	vcTree.collapseAllItems();
	
	var next =vcTree.getItemByValue(vsCmbItemVal);
	vcTree.focusItem(next);
	
	var rootItem = next;

	// 선택된 아이템의 최상위 부모 찾기
	while(next != null){
		next = vcTree.getItemByValue(next.parentValue);
		if(next != null){
			rootItem = next;
		}
	}
	
	var vsLabelVal = "최상위 아이템 : {label : " + rootItem.label + ", value : " + rootItem.value + ", parentValue : " + rootItem.parentValue + "}";
	app.lookup("optRslt").value = vsLabelVal;
}