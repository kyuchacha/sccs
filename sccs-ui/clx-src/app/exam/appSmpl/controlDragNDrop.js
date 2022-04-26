/************************************************
 * dragNDrop.js
 * Created at 2022. 1. 18. 오후 4:49:44.
 *
 * @author kjyan
 ************************************************/

// 추가되는 항목 인덱스
var index = 0;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit2(e){
	var grpCanvas = app.lookup("grpCanvas");
	grpCanvas.getChildren().forEach(function(each){
		setDragSource(each);
	});
	setDragSource(app.lookup("lbx1"));
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad2(e){
	settingItem();
	index = app.lookup("dsPosition").getRowCount();
}


function createDragSourceFeedback() {
	var feedback = new cpr.controls.Output();
	feedback.userAttr("index", "-1");
	feedback.style.css({
		"opacity": "0.8",
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
 * 
 * @param {cpr.controls.UIControl} control
 */
function setDragSource(control) {
	var feedback = null;
	var targetControl = null;
	
	var grpCanvas = app.lookup("grpCanvas");
	var dsList = app.lookup("dsList");
	var dsPosition = app.lookup("dsPosition");
	
	new cpr.controls.DragSource(control, {
		onDragStart: function(context){
			context.cursor = "grabbing";
			feedback = createDragSourceFeedback();
			
			// 리스트의 아이템을 드래그 한 경우와 이미 그려진 항목을 드래그한 경우 분류
			if(control.type == "listbox") {
				feedback.value = context.targetItem.label;
			} else {
				var voRow = dsPosition.findFirstRow("itemName =='"+control["value"]+"' && index==" + Number(control.userAttr("index")) + "");
				if(voRow != null && voRow.getValue("isDraggable")=="false") return;
				
				feedback.value = control["value"];
			}
			
//			app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(control.getActualRect()));
		},
		onDragMove: function(context){
			var vsItemName = control.type == "listbox" ? context.targetItem.label: control["value"];
			if(control.type != "listbox") {
				var voRow = dsPosition.findFirstRow("itemName=='"+vsItemName+"' && index == " + Number(control.userAttr("index")) +"");
				if(voRow.getValue("isDraggable")=="false") return;
			}
			
			context.cursor = "grabbing";
			var actualRect = context.source.control.getActualRect();
			var newRect = actualRect.getTranslated(context.dragDelta);
			if(control.type=="listbox") {
				newRect.width = 120;
				newRect.height = 30; 
				newRect.top = context.dragStartLocation.y - (newRect.height / 2) + context.dragDelta.height;
				newRect.left = context.dragStartLocation.x - (newRect.width / 2) + context.dragDelta.width;
			} else {
				newRect.width = control.getOffsetRect().width;
				newRect.height = control.getOffsetRect().height;
				newRect.top = context.dragStartLocation.y - (newRect.height / 2) + context.dragDelta.height;
				newRect.left = context.dragStartLocation.x - (newRect.width / 2) + context.dragDelta.width;
			}

			var voCanvasRct = grpCanvas.getActualRect();
			if (voCanvasRct.top > newRect.top ||
				voCanvasRct.left > newRect.left ||
				voCanvasRct.right < newRect.right ||
				voCanvasRct.bottom < newRect.bottom) {
				// 캔버스 영역 외 드래그 방지
			} else {
				app.getRootAppInstance().floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
			}
		},
		onDragEnd: function(context){
			context.cursor = "";
			
			// 그룹 영역 위에 있는지 확인
			var isPreventOver = preventOverBoundary(feedback);
			if(!isPreventOver) return;
			
			if(control.type=="listbox") {
				addItem(feedback, true);
	
			} else {
				var voRow = dsPosition.findFirstRow("itemName =='"+feedback.value+"' && index==" + Number(control.userAttr("index")) + "");
				if(voRow != null) {
					if(voRow.getValue("isDraggable")=="false") return;
					var voGrpRect = grpCanvas.getActualRect();
					grpCanvas.updateConstraint(control, {
						"top": (feedback.getActualRect().top - voGrpRect.top) + "px"
						, "left": (feedback.getActualRect().left - voGrpRect.left) + "px"
						, "width": control.getActualRect().width + "px"
						, "height": control.getActualRect().height + "px"
					});
					
					// 데이터 셋 값 변경
					dsPosition.setValue(voRow.getIndex(), "positionX", (feedback.getActualRect().left - voGrpRect.left));
					dsPosition.setValue(voRow.getIndex(), "positionY", (feedback.getActualRect().top - voGrpRect.top));
					
				} else {
					addItem(feedback, true);
				}
			}

			feedback.dispose();
			feedback = null;
		}
	});
}

/**
 * 드래그 시 경계를 넘으면 리턴
 * @param {cpr.controls.Output} feedback
 */
function preventOverBoundary (feedback) {
	var grpCanvas = app.lookup("grpCanvas");
	var voActualRect = grpCanvas.getActualRect();
	var voProcessRect = feedback.getActualRect();
	
	if (voActualRect.top > voProcessRect.top || 
		voActualRect.left > voProcessRect.left || 
		voActualRect.right < voProcessRect.right || 
		voActualRect.bottom < voProcessRect.bottom) return false;

	return true;
}

/**
 * 새 항목 추가
 * @param {cpr.controls.Output} feedback
 * @param {Boolean} isStart
 */
function addItem(feedback, isStart) {
	var grpCanvas = app.lookup("grpCanvas");
	var dsPosition = app.lookup("dsPosition");
	var voGrpRect = grpCanvas.getActualRect();
	var voActualRect = feedback.getActualRect();
	
	var targetItem = new cpr.controls.Output();
	targetItem.userAttr("index", index.toString());
	targetItem.value = feedback.value;
	settingDefaultStyle(targetItem);
	
	if(isStart) {
		dsPosition.addRowData({
			index: index
			, itemName: targetItem.value
			, itemType: "string"
			, positionX: (voActualRect.left - voGrpRect.left)
			, positionY: (voActualRect.top - voGrpRect.top)
			, width: 100
			, height: 30
			, fontType: targetItem.style.getCSS("font-weight")
			, textAlign: targetItem.style.getCSS("text-align")
			, verticalAlign: targetItem.style.getCSS("vertical-align")
			, fontFamily: targetItem.style.getCSS("font-family")
			, fontSize: 9
			, whiteSpace: "false"
			, fontZoom: "true"
			, isDraggable: ""
		})

		grpCanvas.addChild(targetItem, {
			top: (voActualRect.top - voGrpRect.top) + "px"
			, left: (voActualRect.left - voGrpRect.left) + "px"
			, width: "100px"
			, height: "30px"
		});
	}
	setDragSource(targetItem);
	addContextEvent(targetItem);
	addEvent(targetItem);
	
	index++;
}

/**
 * 화면 최초 로드 시 로컬스토리지에 저장된 아이템 캔버스에 추가
 */
function settingItem() {
	if (!localStorage.getItem("dsPosition")) {
		return;
	}
	
	var grpCanvas = app.lookup("grpCanvas"); 
	var dsPosition = app.lookup("dsPosition");
	var storedItemList = JSON.parse(localStorage.getItem("dsPosition"));
	if(storedItemList.length==0) return;
	storedItemList.forEach(function(each) {
		var voRow = each;
		dsPosition.pushRowData(voRow);

		var feedback = new cpr.controls.Output();
		feedback.value = voRow["itemName"];
		feedback.style.css({
			"border": "1px solid black"
			, "background-color": "#dedede"
			, "text-align": voRow["textAlign"]
			, "vertical-align": voRow["verticalAlign"]
			, "font-family": voRow["fontFamily"]
			, "font-size": voRow["fontSize"] + "pt"
		});
		
		// 글꼴 형식 지정
		var vsFontType = voRow["fontType"];
		if(vsFontType=="italic") {
			feedback.style.css("font-weight", "normal");
			feedback.style.css("font-style", vsFontType);
			feedback.style.css("text-decoration", "none");
		} else if(vsFontType=="underline") {
			feedback.style.css("font-weight", "normal");
			feedback.style.css("font-style", "normal");
			feedback.style.css("text-decoration", vsFontType);
		}  else if(vsFontType=="normal" || vsFontType=="bold") {
			feedback.style.css("font-weight", vsFontType);
			feedback.style.css("font-style", "normal");
			feedback.style.css("text-decoration", "none");
		} else {
			feedback.style.css("font-weight", "normal");
			feedback.style.css("font-style", "normal");
			feedback.style.css("text-decoration", "none");
		}
		
		feedback.userAttr("index", voRow["index"].toString());
		if(voRow["isDraggable"]=="false") feedback.style.css("color", "red");
		
		grpCanvas.addChild(feedback, {
			"top": voRow["positionY"] + "px",
			"left": voRow["positionX"] + "px",
			"width": voRow["width"] + "px",
			"height": voRow["height"] + "px"
		});
		
		setDragSource(feedback);
		addContextEvent(feedback);
		addEvent(feedback);
	});
}

/**
 * 컨트롤의 기본 스타일 지정
 * @param {cpr.controls.UIControl} control
 */
function settingDefaultStyle(control) {
	control.style.css({
		"border": "1px solid black",
		"background-color": "#dedede",
		"text-align": "center",
		"vertical-align": "middle",
		"font-family": "HY견고딕",
		"font-size": "9pt"
	});
	control.style.css("font-weight", "bold");
	control.style.css("font-style", "normal");
	control.style.css("text-decoration", "none");
}


/**
 * 위치 고정을 위한 컨텍스트 메뉴 이벤트 추가
 * @param {cpr.controls.Output} control
 */
function addContextEvent(control) {
	var dsPosition = app.lookup("dsPosition"); 
	control.addEventListener("contextmenu", function(e) {
		var vcOutput = e.control;
		e.preventDefault();
		
		var ctxMenu = new cpr.controls.Menu();
		ctxMenu.addItem(new cpr.controls.MenuItem("위치고정", "Fixed", ""));
		ctxMenu.addItem(new cpr.controls.MenuItem("위치고정해제", "UnFixed", ""));
		ctxMenu.addItem(new cpr.controls.MenuItem("삭제", "Delete", ""));
		ctxMenu.addEventListener("item-click", function(e) {
			var voRow = dsPosition.findFirstRow("itemName=='"+control.value+"' && index == " + Number(control.userAttr("index")) + "");
			if(e.item.value == "Fixed") {
				voRow.setValue("isDraggable", "false");
				control.style.css("color", "red");
			} else if(e.item.value == "UnFixed") {
				voRow.setValue("isDraggable", "");
				control.style.css("color", "black");
			} else if(e.item.value == "Delete") {
				console.log(voRow.getRowData());
				app.lookup("grpCanvas").removeChild(vcOutput, true);
				dsPosition.realDeleteRow(voRow.getIndex());
			}
			ctxMenu.dispose();
		});
		ctxMenu.addEventListener("blur", function(e){
			ctxMenu.dispose();
		});
		var showConstraint = {
			"position" : "absolute",
			"top" : e.clientY + "px",
			"left" : e.clientX + "px",
			"width" : "150px",
			"height" : "auto"
		};
		app.getRootAppInstance().floatControl(ctxMenu, showConstraint);
		ctxMenu.focus();
	});
}

/**
 * 위치 고정을 위한 컨텍스트 메뉴 이벤트 추가
 * @param {cpr.controls.Output} control
 */
function addEvent(control) {
	var dsPosition = app.lookup("dsPosition");
	control.addEventListener("click", function(e) {
		var voRow = dsPosition.findFirstRow("itemName=='"+control.value+"' && index == " + Number(control.userAttr("index")) + "");
		app.lookup("grd1").selectRows(voRow.getIndex());
	});
}

/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(e){
	// 기존에 등록된 정보는 제거
	localStorage.removeItem("dsPosition");
	
	// 데이터 셋 정보 로컬스토리지 저장
	var dsPosition = app.lookup("dsPosition");
	var data = dsPosition.getRowDataRanged();
	localStorage.setItem("dsPosition", JSON.stringify(data));
}


/*
 * "삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(e){
	localStorage.removeItem("dsPosition");
}

/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDsPositionUpdate2(e){
	/** @type cpr.data.DataSet */
	var dsPosition = e.control;
	var voRow = e.row;
	var grpCanvas = app.lookup("grpCanvas");
	grpCanvas.getChildren().forEach(function(each){
		if(each.value == voRow.getValue("itemName") && Number(each.userAttr("index")) == voRow.getValue("index")) {
			grpCanvas.updateConstraint(each, {
				top: voRow.getValue("positionY") + "px"
				, left: voRow.getValue("positionX") + "px"
				, width: voRow.getValue("width") + "px"
				, height: voRow.getValue("height") + "px"
			});
			
			each.style.css({
				"font-size": voRow.getValue("fontSize") + "pt"
				, "font-family": voRow.getValue("fontFamily")
				, "text-align": voRow.getValue("textAlign")
				, "vertical-align": voRow.getValue("verticalAlign")
			});
			
			// 글꼴 형식 지정
			var vsFontType = voRow.getValue("fontType");
			if(vsFontType=="italic") {
				each.style.css("font-weight", "normal");
				each.style.css("font-style", vsFontType);
				each.style.css("text-decoration", "none");
			} else if(vsFontType=="underline") {
				each.style.css("font-weight", "normal");
				each.style.css("font-style", "normal");
				each.style.css("text-decoration", vsFontType);
			} else if(vsFontType=="normal" || vsFontType=="bold"){
				each.style.css("font-weight", vsFontType);
				each.style.css("font-style", "normal");
				each.style.css("text-decoration", "none");
			} else {
				each.style.css("font-weight", "normal");
				each.style.css("font-style", "normal");
				each.style.css("text-decoration", "none");
			}
			
		}
	});
}

/*
 * "리셋" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick(e){
	var grpCanvas = app.lookup("grpCanvas");
	grpCanvas.removeAllChildren();
}


/*
 * "재배치" 버튼(btnRefresh)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRefreshClick(e){
	settingItem();
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange2(e){
	/** @type cpr.controls.ComboBox */
	var cmb1 = e.control;
	var grd = app.lookup("grd1");
	var voRow = grd.getSelectedRow();
	if(e.newSelection[0].value == "image") {
		app.lookup("cmb4").clearSelection();
		app.lookup("cmb5").clearSelection();
		app.lookup("nbe5").putValue("");
	}
	
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = settingDefaultStyle + setDragSource;
}
