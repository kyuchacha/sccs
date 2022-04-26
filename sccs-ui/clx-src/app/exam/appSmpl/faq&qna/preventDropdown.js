/************************************************
* preventDropdown.js
 * Created at 2022. 3. 21. 오후 3:37:05.
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

/**
 * 드래그 중인 컨트롤을 나타내는 아웃풋 생성
 */
function createDragSource() {
	var dragSource = new cpr.controls.Output();
	dragSource.style.css({
		"opacity": "0.5",
		"text-align" : "center",
		"color" : "black",
		"backgroud-color" : "white",
		"border" : "solid 1px black",
		"border-radius" : "10px",
		"cursor" : "move"
	});
	return dragSource;
}

/**
 * 컨트롤을 드래그,드롭다운 동작 수행
 * @param {cpr.controls.UIControl} control 드래그 동작 컨트롤
 */
function setUpSource(control){
	/**@type cpr.controls.Output */
	var dragSource;
	
	return new cpr.controls.DragSource(control, {
		onDragStart: function(context){
			context.cursor = "grabbing";
			dragSource = createDragSource();
			
			control.style.css("opacity", "0.5");
			context.data = control["value"];
			
			var actualRect = control.getActualRect();
			dragSource.value = context.data;
	
			
			app.getRootAppInstance().floatControl(dragSource, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));
		},
		
		
		onDragMove: function(context){
			var actualRect = context.source.control.getActualRect();
			var newRect = actualRect.getTranslated(context.dragDelta);
			app.getRootAppInstance().floatControl(dragSource, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
		},
		onDragCancel: function(context){
			//드롭다운 취소 애니메이션 
			if (dragSource && dragSource.disposed === false) {
				var actualRect = control.getActualRect();
				dragSource.style.animateTo({
					"left" : actualRect.left + "px",
					"top" : actualRect.top + "px",
					"opacity" : "0"
				}, 0.3);
				dragSource.addEventListener("transitionend", function(e){
					dragSource = null;
				});
			}
			control.style.removeStyle("opacity");
		},
		onDragEnd: function(context) {
			if (dragSource && dragSource.disposed === false) {
				// 드롭 타겟이 존재한다면, 작아지는 애니메이션 표시.
				if (context.target) {
					dragSource.style.animateTo({
						"transform": "scale(0, 0)"
					}, 0.1);
					dragSource.addEventListenerOnce("transitionend", function(e) {
						dragSource.dispose();
						dragSource = null;
					});
				}
				
				// 드롭 타겟 없이 드래그 앤 드랍이 종료되었다면 캔슬 애니메이션 표시.
				else {
					var actualRect = control.getActualRect();
					dragSource.style.animateTo({
						"left": actualRect.left + "px",
						"top": actualRect.top + "px",
						"opacity": "0"
					}, 0.3);
					dragSource.addEventListenerOnce("transitionend", function(e) {
						dragSource.dispose();
						dragSource = null;
					});
				}
				
			}
			control.style.removeStyle("opacity");
		}
	});
}


/**
 * 컨트롤의 드롭다운 동작을 막습니다.
 * @param {cpr.controls.UIControl} dropTarget
 */
function setupZone(dropTarget) {
	new cpr.controls.DropTarget(dropTarget, {
		onDragEnter: function(context){
			context.cursor = "no-drop";
		},
		onDrop: function(context){
			return false;
		}
	});
}

/**
 * 아웃풋 이외의 컨트롤에 드롭 시 value를 변경합니다.
 * @param {cpr.controls.UIControl} target
 */
function setupTargetOtherCtrl(target) {
	new cpr.controls.DropTarget(target, {
		onDragEnter: function(context){
			target.redraw();
		},
		onDragLeave: function(context){
			target.redraw();
		},
		onDrop: function(context){
			/** @type cpr.controls.UIControl */
			var ctrl = context.target.control;
			ctrl.value = context.data;
			target.redraw();
		}
	});
}
/**
 * @param {cpr.controls.Output} output
 */
function clearForm(output){
	var vcForm = app.lookup("grdTarget");
		
}

/*
 * "실행" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	/*에디터에 소스표시*/
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = createDragSource + setUpSource + setupZone + setupTargetOtherCtrl + onBodyInit + onBodyLoad;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var vcGrd = app.lookup("grdTarget");
	var optArr = vcGrd.getChildren().filter(function(each) {
		return each.type == "output";
	});
	var otherArr = vcGrd.getChildren().filter(function(each) {
		return each.type != "output";
	});
	optArr.forEach(function(each) {
		setupZone(each);
	});
	otherArr.forEach(function(each) {
		setupTargetOtherCtrl(each);
	});	
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var vcDragBtn = app.lookup("dragBtn");
	
	setUpSource(vcDragBtn);	
}
