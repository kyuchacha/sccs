/************************************************
 * TreeDragAndDrop.js
 * Created at 2022. 1. 24. 오후 3:38:26.
 *
 * @author jiyeon
 ************************************************/

var feedback;
var dragItem = null;
var dragControl = null;


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit2(/* cpr.events.CEvent */ e){
	setDragSource(app.lookup("tre1"));
	setDragSource(app.lookup("tre2"));
	setDropTarget(app.lookup("tre1"));
	setDropTarget(app.lookup("tre2"));
}	

//드래그 중인 걸 표시하기 위한 컨트롤 생성
function createDragSourceFeedback(){
	var feedback = new cpr.controls.Output();
	feedback.style.css({
		"opacity": "0.8",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move",
	});
	return feedback;
}

//드래그 소스 설정
/**
 * 
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control){
  
 	new cpr.controls.DragSource(control, {
		onDragStart : function(context){
			//드래그 시작 아이템
			var targetItem = context.targetItem;
			
			
			//커서 변경, 이동 아웃풋 생성
			if(targetItem && targetItem != undefined) {
				context.cursor = "grabbing";
				dragControl = control;
				dragItem = targetItem;
				feedback = createDragSourceFeedback();
				
		  		control.style.css("opacity"," 0.5");
		  		
		  		//크기, value 지정
		  		context.data = targetItem.label;
		  		var actualRect = control.getActualRect();
		  		feedback.value = context.data;
		  		
		  		//요소의 depth에 따라 색상 지정
		  		if(targetItem.depth == 0){
					feedback.style.css("background", "lightPink");					
				}else if(targetItem.depth == 1){
					feedback.style.css("background", "lightGreen");	
				}else if(targetItem.depth == 2){
					feedback.style.css("background", "orange");	
				}
		  	
		  		//플로트
		  		app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
			} else {
				return false;
			}
		  	
		},
		onDragMove : function(context){
		  	context.cursor = "grabbing";
		  	
		  	
		  	//이동 애니메이션
		  	var actualRect = context.source.control.getActualRect();
		  	var newRect = actualRect.getTranslated(context.dragDelta);
		  	var targetItem = context.targetItem;
		  	if(targetItem && targetItem != undefined) {
		  		newRect.height = 40;
				newRect.width = 220;
				newRect.top = context.dragStartLocation.y - (newRect.height / 2) + context.dragDelta.height;
				newRect.left = context.dragStartLocation.x - (newRect.width / 2) + context.dragDelta.width;
				
				//임베디드된 경우 앱이 밀린만큼 위치 조정
				if(app.getActualRect().top > 0) {
					newRect.top = newRect.top - app.getActualRect().top;
				}
				
				if(app.getActualRect().left > 0) {
					newRect.left = newRect.left - app.getActualRect().left;
				}
				
				app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
		  	} else {
		  		context.cursor = "auto";
		  	}
		  	
		},
		onDragEnd : function(context){
		  	context.cursor = "";
		  	
			if (feedback && feedback.disposed === false) {
					// 드롭 타겟이 존재한다면, 작아지는 애니메이션 표시.
				if (context.target) {
					feedback.style.animateTo({
						"transform": "scale(0, 0)"
					}, 0.1);
					feedback.addEventListenerOnce("transitionend", function(e) {
						feedback.dispose();
						feedback = null;
					});
				}
				// 드롭 타겟 없이 드래그 앤 드랍이 종료되었다면 캔슬 애니메이션 표시. 위치
				else {
					var actualRect = control.getActualRect();
					feedback.style.animateTo({
						"left": actualRect.left + "px",
						"top": actualRect.top + "px",
						"opacity": "0"
					}, 0.3);
					feedback.addEventListenerOnce("transitionend", function(e) {
						feedback.dispose();
						feedback = null;
					});
				}
			}
			control.style.removeStyle("opacity");
		}
	});
}


//드롭 타겟 설정
/**
 * @param {cpr.controls.UIControl} control
 */
function setDropTarget(control){
	
	/**
	 * @param {String} targetValue
	 */
	function rebindItemStyle(targetValue) {
		control.style.item.bind("background").toExpression('value == "' + targetValue + '" ? "rgba(0, 0, 0, 0.3)" : "none"');
	}
	
	new cpr.controls.DropTarget(control, {
		onDragEnter : function(context){
			//드롭 타겟에 드래그 진입
			
			var item = context.targetItem;
			if (item && item != undefined) {
				control.style.css("background-color", "skyblue");
				rebindItemStyle(item.value);
			}
			control.redraw();
		},
		onDragLeave: function(context) {
			//트리박스를 떠날 때
			control.style.removeStyle("background-color");
			control.style.item.unbind("background");
			control.redraw();
		},
		onDrop : function(context){
			/** @type cpr.controls.Item */
			var item = context.targetItem;
			
			if (feedback && feedback.disposed == false) {
				control.style.removeStyle("background-color");
				control.style.item.unbind("background");
				
				//자기 자신 요소 위에 놓았을 때
				if(item == undefined || dragItem.parentValue == item.value || dragItem.value == item.value){
					control.redraw();
					return;
				}
				
				//부모가 자신의 자식 요소로 이동했을 때
				if(control.hasChild(dragItem)) {
					if(dragItem.value == item.parentValue) {
						control.redraw();
						return;
					}
				}
				
				var dropItem = new cpr.controls.TreeItem(dragItem.label, dragItem.value, dragItem.parentValue);

				//부모 요소의 트리 - 트리 간 이동
				if(control != dragControl && dragControl.hasChild(dragItem)){
					var dragChildren = dragControl.getChildren(dragItem);
					
					if(control.hasChild(item)){ //타겟 아이템이 부모 요소일 때
						dropItem.parentValue = item.value;
						dragControl.deleteItem(dragItem);
						control.insertItemAfter(dropItem, item.children[item.children.length - 1]);
						
						//드래그 아이템의 자식 요소 옮기는 작업
						for(var i = 0; i < dragChildren.length; i++) {
							dragControl.deleteItem(dragChildren[i]);
							control.addItem(new cpr.controls.TreeItem(dragChildren[i].label, dragChildren[i].value, dragChildren[i].parentValue));
						}
					}else if(item.parentValue != ""){ //타겟 요소가 자식 요소일 때
						dropItem.parentValue = item.parentValue;
						dragControl.deleteItem(dragItem);
						control.insertItemAfter(dropItem, item);
						
						for(var i = 0; i < dragChildren.length; i++) {
							dragControl.deleteItem(dragChildren[i]);
							control.addItem(new cpr.controls.TreeItem(dragChildren[i].label, dragChildren[i].value, dragChildren[i].parentValue));
						}
					}else{
						dropItem.parentValue = ""; //타겟 요소가 부모도 자식도 아닐 때
						dragControl.deleteItem(dragItem);
						control.insertItemAfter(dropItem, item);
						
						for(var i = 0; i < dragChildren.length; i++) {
							dragControl.deleteItem(dragChildren[i]);
							control.addItem(new cpr.controls.TreeItem(dragChildren[i].label, dragChildren[i].value, dragChildren[i].parentValue));
						}
					}
				}else{ //트리 내 이동, 자식 요소의 트리 간 이동
					if(control.hasChild(item)){
						dropItem.parentValue = item.value;
						dragControl.deleteItem(dragItem);
						control.insertItemAfter(dropItem, item.children[item.children.length - 1]);
					} else {
						//하위 요소로 변경
						if(app.lookup("cbx1").value == 'Y') {
							dragControl.deleteItem(dragItem);
							control.addItem(new cpr.controls.TreeItem(dropItem.label, dropItem.value, item.value));
						//요소 간 순서 변경
						} else {
							if(item.parentValue != ""){
								dropItem.parentValue = item.parentValue;
								dragControl.deleteItem(dragItem);
								control.insertItemAfter(dropItem, item);
							}else{
								dropItem.parentValue = "";
								dragControl.deleteItem(dragItem);
								control.insertItemAfter(dropItem, item);
							}	
						}
					}	
				}
			}
			
			dragItem = null;
			dragControl = null;
			control.redraw();
		}, 
		onDragMove: function(context) {
			if (context.targetItem) {
				/** @type cpr.controls.Item */
				var item = context.targetItem;
				rebindItemStyle(item.value);
				control.redraw();
			}
		}
	});
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = createDragSourceFeedback + setDragSource + setDropTarget;
}
