/************************************************
 * TreeContext.js
 * Created at 2022. 1. 25. 오전 10:41:40.
 *
 * @author 1amthomas
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad2(e){
	//트리의 아이템을 전부 펼쳐서 보여준다.
	app.lookup("tre1").expandAllItems();
}


/*
 * 트리에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onTre1Contextmenu2(e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	//우클릭한 item을 select상태로 변경
	app.lookup("tre1").selectItem(e.targetObject.item);
	/* 동작 실행 */
	treeFloater(e);
}

/**
	@param {cpr.events.CMouseEvent} event 마우스 이벤트
*/
function treeFloater(event){
	/* 기존의 우클릭시 나오던 메뉴 실행하지 않음 */
	event.preventDefault();
	var tre1 = app.lookup("tre1");
	var treeContextMenu = new cpr.controls.Menu("contextMenu");
	
	treeContextMenu.addItem(new cpr.controls.TreeItem("아이템추가","addItem"));
	treeContextMenu.addItem(new cpr.controls.TreeItem("아이템삭제","removeItem"));
	//컨텍스트 메뉴의 위치를 지정
	var voAppRect = app.getActualRect();
	//마우스 좌표 - 실제 앱이 그려진 크기 빼주어야 정확한 로케이션을 잡을 수 있다.
	treeContextMenu.style.css({
			position: "absolute",
			top: "" + (event.clientY - voAppRect.top) + "px",
			left: "" + (event.clientX - voAppRect.left) + "px",
			width: "200px"		
	});
	//컨텍스트 메뉴 플로팅
	app.floatControl(treeContextMenu);
	treeContextMenu.focus();
	
	treeContextMenu.addEventListener("blur", function(e){
		treeContextMenu.dispose();		
	});
	
	//추가 삭제 이벤트 	추가
	var menuItem = treeContextMenu.getChildren();
	treeContextMenu.addEventListener("item-click", function(e){
			//클릭한 아이템 value에 따라 추가,삭제 동작
			if(e.item.value == "addItem"){
				//컨텍스트 아이템 추가 로직
				app.openDialog("app/exam/appSmpl/popup/TreeContextDialog", {
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
			}else{
				//트리에서 컨텍스트 아이템 삭제
				tre1.deleteItem(tre1.getSelectedIndices()[0]);
				treeContextMenu.dispose();
				//comtitle안의 숫자 업데이트
//				var counts = app.lookup("grd1").rowCount;
//
//				app.lookup("comtitle1").rowCount = counts;
			}
	});
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = treeFloater;
}
