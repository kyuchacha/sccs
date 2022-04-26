/************************************************
 * multiTabs.js
 * Created at 2021. 7. 22. 오후 3:53:50.
 *
 * @author kim su hyun
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e){
	setDragSource(app.lookup('grdMain'));
	setDropTarget(app.lookup('grdMain'));
	setDragSource(app.lookup("grdMain2"));
	setDropTarget(app.lookup('grdSub'));
	setDragSource(app.lookup("grdSub"));
	setDropTarget(app.lookup('grdMain2'));
}

/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTab1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	app.lookup('dsEmp').revert();
	app.lookup('dsDept').revert();
}

/******* 첫번째 탭(그리드) 스크립트 *******/
/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearchSearch(/* cpr.events.CUIEvent */ e){
	app.lookup('dsEmp').revert();
}

/******* 두번째 탭(그리드+그리드) 스크립트 *******/

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 * 조회버튼 클릭시 이벤트
 */
function onCombtnsearch2Search(/* cpr.events.CUIEvent */ e){
	var combtnsearch2 = e.control;
		/** 
	 * @type udc.com.comBtnSearch
	 */
	app.lookup('dsEmp').revert();
	app.lookup('dsDept').revert();
}

function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.ellipsis = true;
	feedback.style.css({
		"opacity": "0.8",
		"border": "solid 1px red",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
		"cursor": "move"
	});
	return feedback;
}

/**
 * 파라미터의 컨트롤을 드래그 가능하도록 드래그 소스를 지정하는 함수.
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control) {
	var feedback = null;
	var actualRect = null;
	var startRowIndex = null;
	
	//control이 grid인지 판별
	if (control.type != 'grid') {
		return;
	}
	
	new cpr.controls.DragSource(control, {
		options: {
			dataType: "text", //데이터 타입을 text로 지정
			threadhold: 10 //10px만큼 이동해야 드래그 시작으로 인식
		},
		onDragStart: function(context) {
			if (context.targetObject.relativeTargetName != null && context.targetObject.relativeTargetName != "header") {
				context.cursor = "grabbing";
				feedback = createDragSourceFeedback();
				control.style.css("opacity", " 0.5");
				context.data = context.targetObject;
				
				//row데이터를 JSON 처리한 후 feedback에 value에 셋팅
				feedback.value = JSON.stringify(control.getRow(context.data.rowIndex).getRowData());
				
				//드래그 소스 초기화 (컨트롤)
				context.source = null;
				
			} else {
				context.cancel();
			}
		},
		onDragMove: function(context) {
			context.cursor = "grabbing";
			
			//actualRect = 해당 컨트롤에 실제크기
			var actualRect = context.source.control.getActualRect();
			
			//마우스의 이동량만큼 
			var newRect = actualRect.getTranslated(context.dragDelta);
			
			//플롯창 크기 제어
			newRect.height = actualRect.height / 20;
			newRect.width = actualRect.width / 2;
			
			//드래그 시작 지점에서 드래그 이동량만큼 이동
			newRect.top = context.dragStartLocation.y - (newRect.height / 2) + context.dragDelta.height;
			newRect.left = context.dragStartLocation.x - (newRect.width / 2) + context.dragDelta.width;
			
			//임베디드앱으로 실행될 경우 top, left 값 보정
			if (app.getActualRect().top > 0) {
				newRect.top -= app.getActualRect().top;
			}
			if (app.getActualRect().left > 0) {
				newRect.left -= app.getActualRect().left;
			}
			app.floatControl(feedback, newRect);
		},
		onDragEnd: function(context) {
			context.cursor = "";
			feedback.dispose();
			feedback = null;
			control.style.removeStyle("opacity");
		}
	});
}

function setDropTarget(control2) {
	//control이 grid인지 판별
	if (control2.type != 'grid') {
		return;
	}
	var dropTarget = new cpr.controls.DropTarget(control2, {
		isImportant: function(source) {
			return source.dataType == "text";
		},
		onDrop: function(context) {
			var deptNo = null;
			var dsEMP = app.lookup('dsEmp');
			var dsDept = app.lookup('dsDept');
			var grdSub = app.lookup('grdSub');
			var grdMain2 = app.lookup('grdMain2');
			
			if (context.targetObject != null) {
				//grdMain에 내려놓았을때
				if (control2.id == 'grdMain') {
					control2.dataSet.moveRowIndex(context.data.rowIndex, context.targetObject.rowIndex);
					control2.selectRows(context.targetObject.rowIndex);
				}
				//grdSub에서 
				else if (control2.id == 'grdSub') {
					// grdMain2로 행이동
					if (context.source.control.id == "grdMain2") {
						//dragStart한 행삭제
						deptNo = grdMain2.getRow(context.data.rowIndex).getValue('DEPTNO');
						grdMain2.deleteRow(context.data.rowIndex);
						
						//row 위에 drop할 경우
						if (context.targetObject.rowIndex != undefined) {
							dsDept.insertRow(context.targetObject.rowIndex, true);
							dsDept.setValue(context.targetObject.rowIndex + 1, 'DEPTNO', deptNo);
							
							//빈 공간에 drop할 경우
						} else {
							dsDept.addRow();
							dsDept.setValue(grdSub.getViewingEndRowIndex() + 1, 'DEPTNO', deptNo);
							control2.selectRows(grdSub.getViewingEndRowIndex() + 1);
						}
						// grdSub로 행이동								
					} else if (context.source.control.id == "grdSub") {
						control2.dataSet.moveRowIndex(context.data.rowIndex, context.targetObject.rowIndex);
						control2.selectRows(context.targetObject.rowIndex);
					}
				}
				// grdMain2에서
				else if (control2.id == 'grdMain2') {
					//grdMain2로 행이동
					if (context.source.control.id == "grdMain2") {
						control2.dataSet.moveRowIndex(context.data.rowIndex, context.targetObject.rowIndex);
						control2.selectRows(context.targetObject.rowIndex);
						//grdSub로 행이동
					} else if (context.source.control.id == "grdSub") {
						deptNo = grdSub.getRow(context.data.rowIndex).getValue('DEPTNO');
						dsDept.deleteRow(context.data.rowIndex);
						dsEMP.insertRow(context.targetObject.rowIndex, true);
						dsEMP.setValue(context.targetObject.rowIndex + 1, 'DEPTNO', deptNo)
						control2.selectRows(context.targetObject.rowIndex + 1);
					}
				}
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
