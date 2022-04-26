/************************************************
* GridContext.js
 * Created at 2022. 3. 10. 오전 10:39:21.
 *
 * @author aaajd
 ************************************************/

//복사한 row
var copyRow = null;
	
/*
 * 그리드에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGrd1Contextmenu(e){
	/* 동작 실행 */
	gridFloater(e);
}

function gridFloater(event) {
	/* 기존의 우클릭시 나오던 메뉴 실행하지 않음 */
	event.preventDefault();
	var grd1 = app.lookup("grd1");
	var gridContextMenu = new cpr.controls.Menu("contextMenu");
	
	gridContextMenu.addItem(new cpr.controls.TreeItem("행추가","addRow"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("행삭제","removeRow"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("행복사","copyRow"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("행잘라내기","cutRow"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("행붙여넣기","pasteRow"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("필터/필터취소","filter"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("스플릿/스플릿취소","split"));
	gridContextMenu.addItem(new cpr.controls.TreeItem("정렬/정렬취소","sort"));
	
	//컨텍스트 메뉴의 위치를 지정
	var voAppRect = app.getActualRect();
	
	//마우스 좌표 - 실제 앱이 그려진 크기 빼주어야 정확한 로케이션을 잡을 수 있다.
	gridContextMenu.style.css({
			position: "absolute",
			top: "" + (event.clientY - voAppRect.top) + "px",
			left: "" + (event.clientX - voAppRect.left) + "px",
			width: "200px"		
	});
	
	//컨텍스트 메뉴 플로팅
	app.floatControl(gridContextMenu);
	gridContextMenu.focus();
	
	gridContextMenu.addEventListener("blur", function(e){
		gridContextMenu.dispose();		
	});
	
	//추가 삭제 이벤트 추가
	var menuItem = gridContextMenu.getChildren();
	gridContextMenu.addEventListener("item-click", function(e){
			//클릭한 아이템 value에 따라 동작
			if(e.item.value == "addRow"){
				//컨텍스트 아이템 추가 로직
				app.openDialog("app/exam/appSmpl/popup/GridContextDialog", {
					width : 250, 
					height : 200,
//					modal : false,
					headerVisible : false,
					resizable : false
				}, function(dialog){dialog.ready(function(dialogApp){
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
						dialog.style.css("top",(event.clientY - voAppRect.top)+"px");
						dialog.style.css("left",(event.clientX - voAppRect.left)+"px");
						//모달을 false로 주지 말고, background-color에 transparent를 해야 overlay-click이 정상 동작한다.
						dialog.style.overlay.css("background-color","transparent");
						dialog.addEventListener("overlay-click", function(e){
								dialog.close();
							});						
					});

				}).then(function(returnValue){
					;
				});
			} else if (e.item.value == 'removeRow'){
				//그리드에서 컨텍스트 아이템 삭제
				grd1.deleteRow(grd1.getSelectedIndices()[0]);
				//comtitle안의 숫자 업데이트
				var counts = app.lookup("grd1").rowCount;
				app.lookup("comtitle1").rowCount = counts;
				
				gridContextMenu.dispose();
			} else if (e.item.value == 'copyRow'){ 
				//그리드에서 로우 복사
				copyRow = grd1.getRow(grd1.getSelectedRowIndices()[0]);
				
				gridContextMenu.dispose();
			} else if (e.item.value == 'cutRow'){
				//그리드에서 로우 잘라내기 
				copyRow = grd1.getRow(grd1.getSelectedRowIndices()[0]);
				grd1.deleteRow(grd1.getSelectedIndices()[0]);
				//comtitle안의 숫자 업데이트
				var counts = app.lookup("grd1").rowCount;
				app.lookup("comtitle1").rowCount = counts;
				
				gridContextMenu.dispose();
			} else if (e.item.value == 'pasteRow'){ 
				//그리드에 로우 붙여넣기
				if (copyRow != null) {
					grd1.insertRowData(grd1.getSelectedIndices()[0], true, copyRow.getRowData());					
				}
				//comtitle안의 숫자 업데이트
				var counts = app.lookup("grd1").rowCount;
				app.lookup("comtitle1").rowCount = counts;
				
				gridContextMenu.dispose();
			} else if (e.item.value == 'filter'){
				//그리드에 필터걸기 
				for (var i = 0; i < grd1.columnCount; i ++) {
					grd1.header.getColumn(i).filterable = !grd1.header.getColumn(i).filterable;
				}
				gridContextMenu.dispose();
			} else if (e.item.value == 'split'){
				//그리드 split하기 
				if (grd1.topSplit == 0) {
					grd1.topSplit = grd1.getSelectedRowIndices()[0];
					grd1.topSplitHeight = grd1.getSelectedRowIndices()[0] * 24;					
				} else {
					grd1.topSplit = 0;
				}
				gridContextMenu.dispose();
			} else if (e.item.value == 'sort'){
				//그리드 정렬하기 
				for (var i = 0; i < grd1.columnCount; i ++) {
					grd1.header.getColumn(i).sortable = !grd1.header.getColumn(i).sortable;
				}
				gridContextMenu.dispose();
			}
	});
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = gridFloater;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var grd1 = app.lookup('grd1');
	for (var i = 0; i < grd1.columnCount; i ++) {
		grd1.header.getColumn(i).sortable = false;
	}
}
