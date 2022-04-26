/************************************************
* BarcordQR2.js
 * Created at 2022. 3. 8. 오후 4:18:01.
 *
 * @author aaajd
 ************************************************/

// 인쇄 시 저장 변수
var print;
var innerBody;

// 추가되는 항목 인덱스
var index = 0;

// QRCode 저장 변수
var qrCode;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var grpCanvas = app.lookup("grpCanvas");
	grpCanvas.getChildren().forEach(function(each) {
		setDragSource(each);
	});
	setDragSource(app.lookup("lbx1"));
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	doSettingItem();
	
	// 인덱스 값 지정
	var vnIndex = app.lookup("dsPosition").getMax("index");
	if(vnIndex != null) index = vnIndex+1;
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
		onDragStart: function(context) {
			context.cursor = "grabbing";
			feedback = createDragSourceFeedback();
			
			// 리스트의 아이템을 드래그 한 경우와 이미 그려진 항목을 드래그한 경우 분류
			if (control.type == "listbox") {
				feedback.value = context.targetItem.label;
			} else {
				var vsItemName = control.type=="output"? control["value"]: control.userAttr("itemName");
				var voRow = dsPosition.findFirstRow("itemName =='" + vsItemName + "' && index==" + Number(control.userAttr("index")) + "");
				if (voRow != null && voRow.getValue("isDraggable") == "false") return;
				
				feedback.value = control["value"];
			}
			
			// app.floatControl(feedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(control.getActualRect()));
		},
		onDragMove: function(context) {
			var vsItemName = "";
			if(control.type=="listbox") vsItemName = context.targetItem.label;
			else if(control.type=="output") vsItemName = control["value"];
			else vsItemName = control.userAttr("itemName");
			
			// 리스트박스에서 드래그한 경우가 아닌 경우 데이터셋에서 드래그 가능여부를 받아온다.
			if (control.type != "listbox") {
				var voRow = dsPosition.findFirstRow("itemName=='" + vsItemName + "' && index == " + Number(control.userAttr("index")) + "");
				if (voRow.getValue("isDraggable") == "false") return;
			}
			
			context.cursor = "grabbing";
			var actualRect = context.source.control.getActualRect();
			var newRect = actualRect.getTranslated(context.dragDelta);
			if (control.type == "listbox") {
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
		onDragEnd: function(context) {
			context.cursor = "";
			// 그룹 영역 위에 있는지 확인
			var isPreventOver = preventOverBoundary(feedback);
			if (!isPreventOver) return;
			
			if (control.type == "listbox") {
				addItem(feedback, true);
				
			} else {
				var vsItemName = control.type=="output"? control["value"]: control.userAttr("itemName");
				var voRow = dsPosition.findFirstRow("itemName =='" + vsItemName + "' && index==" + Number(control.userAttr("index")) + "");
				if (voRow != null) {
					if (voRow.getValue("isDraggable") == "false") return;
					var voGrpRect = grpCanvas.getActualRect();
					grpCanvas.updateConstraint(control, {
						"top": (feedback.getActualRect().top - voGrpRect.top) + "px",
						"left": (feedback.getActualRect().left - voGrpRect.left) + "px",
						"width": control.getActualRect().width + "px",
						"height": control.getActualRect().height + "px"
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
function preventOverBoundary(feedback) {
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
	
	var targetItem;
	var vsItemType;
	if(feedback.value == "상품 바코드") {
		vsItemType = "barcode";
		var vnBarCodeVal = Number(window.prompt("상품 바코드 값을 입력하세요", ""));
		if(vnBarCodeVal == "") return;
		
		targetItem = new cpr.controls.UIControlShell();
		targetItem.userAttr("index", index.toString());
		targetItem.userAttr("itemName", vnBarCodeVal.toString());
		
		// 바코드 생성
		doInitBarcode(targetItem, vnBarCodeVal, index, 200, 150);
		
	} else if(feedback.value == "상품 QR") {
		vsItemType = "qrcode";
		var vsQrCodeVal = window.prompt("상품 QR코드 값을 입력하세요", "");
		if(vsQrCodeVal == "") return;
		
		targetItem = new cpr.controls.UIControlShell();
		targetItem.userAttr("index", index.toString());
		targetItem.userAttr("itemName", vsQrCodeVal);
		
		// qr코드 생성
		doInitQrCode(targetItem, vsQrCodeVal, index, 200, 150);
		
	} else {
		vsItemType = "string";
		targetItem = new cpr.controls.Output();
		targetItem.userAttr("index", index.toString());
		targetItem.value = feedback.value;
		settingDefaultStyle(targetItem);
		
	}
	
	if (isStart) {
		var vsItemName = targetItem.type=="output"? targetItem.value: targetItem.userAttr("itemName");
		// 데이터셋에 타겟 정보 추가
		dsPosition.addRowData({
			index: index,
			itemName: vsItemName,
			itemType: vsItemType,
			positionX: (voActualRect.left - voGrpRect.left),
			positionY: (voActualRect.top - voGrpRect.top),
			width: targetItem.type=="output"? 100: 200,
			height: targetItem.type=="output"? 30: 150,
			fontType: targetItem.style.getCSS("font-weight"),
			textAlign: targetItem.style.getCSS("text-align"),
			verticalAlign: targetItem.style.getCSS("vertical-align"),
			fontFamily: targetItem.style.getCSS("font-family"),
			fontSize: 9,
			whiteSpace: "false",
			fontZoom: "true",
			isDraggable: ""
		});
		
		// 그룹에 타겟 아이템 추가
		grpCanvas.addChild(targetItem, {
			top: (voActualRect.top - voGrpRect.top) + "px",
			left: (voActualRect.left - voGrpRect.left) + "px",
			width: "100px",
			height: "30px"
		});
	}
	setDragSource(targetItem);
	addContextEvent(targetItem);
	addEvent(targetItem);
	
	index++;
}

/**
 * 
 * @param {cpr.controls.UIControlShell} control
 * @param {Number} vnBarcode
 * @param {Number} index
 * @param {Number} vnWidth
 * @param {Number} vnHeight
 */
function doInitBarcode(control, vnBarcode, index, vnWidth, vnHeight) {
//	control.style.css("border", "1px solid black");
	control.addEventListener("init", function(e){
		var shellDiv = e.content;
		if(shellDiv) e.preventDefault();
	});
	control.addEventListener("load", function(e){
		var shellDiv = e.content;
		// 바코드를 그리기 위한 div 태그 추가
		var elCode = document.createElement("div");
		e.content.appendChild(elCode).id = "barcode" + index;
		
		// 바코드를 표시하기 위한 svg 태그 추가
		var elCodeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		e.content.appendChild(elCodeSvg).id = "barcodeSvg" + index;
		
		// 바코드 그리기
		JsBarcode("#barcodeSvg" + index, vnBarcode, {format: "code128"});
		
		document.getElementById("barcodeSvg" + index).setAttribute("width", vnWidth + "px");
		document.getElementById("barcodeSvg" + index).setAttribute("height", vnHeight + "px");
	});
}

/**
 * 
 * @param {cpr.controls.UIControlShell} control
 * @param {String} vsQrCode
 * @param {Number} index
 * @param {Number} vnWidth
 * @param {Number} vnHeight
 */
function doInitQrCode(control, vsQrCode, index, vnWidth, vnHeight) {
	control.addEventListener("init", function(e){
		var shellDiv = e.content;
		if(shellDiv) e.preventDefault();
	});
	control.addEventListener("load", function(e){
		var shellDiv = e.content;
		var elQrCode = document.createElement("div");
		elQrCode.style.backgroundColor = "#FFFFFF";
		elQrCode.style.width = (vnWidth+10) + "px";
		elQrCode.style.height = (vnHeight+10) + "px";
		elQrCode.style.padding = "5px";
		
		shellDiv.appendChild(elQrCode).id = "qrcode" + index;
		elQrCode = new QRCode("qrcode" + index, {
			text: vsQrCode
			, width: vnWidth
			, height: vnHeight
		});
	});
}

/**
 * 로컬스토리지에 저장된 데이터를 받아와 화면에 그려준다.
 */
function doSettingItem(storedItemList) {
	// 로컬스토리지 아이템 셋팅
	if (!localStorage.getItem("dsPosition")) {
		return;
	}
	
	var grpCanvas = app.lookup("grpCanvas");
	var dsPosition = app.lookup("dsPosition");
	var storedItemList = JSON.parse(localStorage.getItem("dsPosition"));
	if (storedItemList.length == 0) return;
	// 스토리지에 저장된 데이터를 화면에 그린다.
	storedItemList.forEach(function(each) {
		dsPosition.pushRowData(each);
		
		var feedback;
		if(each["itemType"]=="barcode") {
			feedback = new cpr.controls.UIControlShell();
			feedback.userAttr("index", each["index"].toString());
			feedback.userAttr("itemName", each["itemName"]);
			doInitBarcode(feedback, Number(each["itemName"]), each["index"], each["width"], each["height"]);
			
		} else if(each["itemType"]=="qrcode") {
			feedback = new cpr.controls.UIControlShell();
			feedback.userAttr("index", each["index"].toString());
			feedback.userAttr("itemName", each["itemName"]);
			doInitQrCode(feedback, Number(each["itemName"]), each["index"], each["width"], each["height"]);
			
		} else {
			feedback = new cpr.controls.Output();
			feedback.userAttr("index", each["index"].toString());
			feedback.value = each["itemName"];
		}
		
		if (each["isDraggable"] == "false") feedback.style.css("color", "red");
		doSetFontStyle(feedback, each);
		
		grpCanvas.addChild(feedback, {
			"top": each["positionY"] + "px",
			"left": each["positionX"] + "px",
			"width": each["width"] + "px",
			"height": each["height"] + "px"
		});
		
		setDragSource(feedback);
		addContextEvent(feedback);
		addEvent(feedback);
	});
}

/**
 * 기본 폰트 스타일 지정
 * @param {cpr.controls.UIControl} control
 */
function settingDefaultStyle(control) {
	control.style.css({
		"text-align": "left",
		"vertical-align": "middle",
		"font-family": "HY견고딕",
		"font-size": "9pt"
	});
	control.style.css("font-weight", "bold");
	control.style.css("font-style", "normal");
	control.style.css("text-decoration", "none");
	control.style.css("border", "1px solid gray");
}

/**
 * 글꼴 스타일 지정
 * @param {cpr.controls.UIControl} control
 * @param {cpr.data.RowConfigInfo} voRow
 */
function doSetFontStyle(control, voRow) {
	control.style.css({
		"text-align": voRow["textAlign"],
		"vertical-align": voRow["verticalAlign"],
		"font-family": voRow["fontFamily"],
		"font-size": voRow["fontSize"] + "pt"
	});
	
	// 글꼴 형식 지정
	var vsFontType = voRow["fontType"];
	if (vsFontType == "italic") {
		control.style.css("font-weight", "normal");
		control.style.css("font-style", vsFontType);
		control.style.css("text-decoration", "none");
		
	} else if (vsFontType == "underline") {
		control.style.css("font-weight", "normal");
		control.style.css("font-style", "normal");
		control.style.css("text-decoration", vsFontType);
		
	} else if (vsFontType == "normal" || vsFontType == "bold") {
		control.style.css("font-weight", vsFontType);
		control.style.css("font-style", "normal");
		control.style.css("text-decoration", "none");
		
	} else {
		control.style.css("font-weight", "normal");
		control.style.css("font-style", "normal");
		control.style.css("text-decoration", "none");
	}
}


/**
 * 위치 고정을 위한 컨텍스트 메뉴 이벤트 추가
 * @param {cpr.controls.Output} control
 */
function addContextEvent(control) {
	var dsPosition = app.lookup("dsPosition");
	control.addEventListener("contextmenu", function(e) {
		var vcControl = e.control;
		
		e.preventDefault();
		
		var ctxMenu = new cpr.controls.Menu();
		ctxMenu.addItem(new cpr.controls.MenuItem("위치고정", "Fixed", ""));
		ctxMenu.addItem(new cpr.controls.MenuItem("위치고정해제", "UnFixed", ""));
		ctxMenu.addItem(new cpr.controls.MenuItem("삭제", "Delete", ""));
		
		ctxMenu.addEventListener("item-click", function(e) {
			var vsItemName = vcControl.type=="output"? control.value: control.userAttr("itemName");
			var voRow = dsPosition.findFirstRow("itemName=='" + vsItemName + "' && index == " + Number(control.userAttr("index")) + "");
			if(voRow==null) return;
			
			if (e.item.value == "Fixed") {
				voRow.setValue("isDraggable", "false");
				control.style.css("color", "red");
			} else if (e.item.value == "UnFixed") {
				voRow.setValue("isDraggable", "");
				control.style.css("color", "black");
			} else if (e.item.value == "Delete") {
				app.lookup("grpCanvas").removeChild(vcControl, true);
				dsPosition.realDeleteRow(voRow.getIndex());
			}
			ctxMenu.dispose();
		});
		
		ctxMenu.addEventListener("blur", function(e) {
			ctxMenu.dispose();
		});
		
		var vnTop = (e.clientY - control.getAppInstance().getContainer().getActualRect().top);
		var vnLeft = (e.clientX - control.getAppInstance().getContainer().getActualRect().left);
		var showConstraint = {
			"position": "absolute",
			"top": vnTop + "px",
			"left": vnLeft + "px",
			"width": "150px",
			"height": "auto"
		};
		app.floatControl(ctxMenu, showConstraint);
		
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
		var vsItemName = control.type=="output"? control.value: control.userAttr("itemName");
		var voRow = dsPosition.findFirstRow("itemName=='" + vsItemName + "' && index == " + Number(control.userAttr("index")) + "");
		app.lookup("grd1").selectRows(voRow.getIndex());
	});
	
	control.addEventListener("value-change", function(e) {
		var vnIndex = dsPosition.findFirstRow("index=='"+Number(control.userAttr("index"))+"'").getIndex();
		dsPosition.setValue(vnIndex, "itemName", e.newValue);
		app.lookup("grpForm").redraw();
	});
}

/*
 * "저장" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	// 기존에 등록된 정보는 제거
	localStorage.removeItem("dsPosition");
	
	// 데이터 셋 정보 로컬스토리지 저장
	var dsPosition = app.lookup("dsPosition");
	var data = dsPosition.getRowDataRanged();
	localStorage.setItem("dsPosition", JSON.stringify(data));
}

/*
 * "삭제" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	// 로컬스토리지 정보 제거
	localStorage.removeItem("dsPosition");
	
	// 화면에 그려진 모든 아이템 제거
	app.lookup("grpCanvas").removeAllChildren();
}

/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDsPositionUpdate(e){
	/** @type cpr.data.DataSet */
	var dsPosition = e.control;
	var voRow = e.row;
	
	var grpCanvas = app.lookup("grpCanvas");
	grpCanvas.getChildren().forEach(function(each) {
		var vnIndex = Number(each.userAttr("index"));
		if (vnIndex == voRow.getValue("index")) {
			if(each.type=="output") {
				// 아이템 값 변경
				each.value = voRow.getValue("itemName");
				// 스타일 지정
				doSetFontStyle(each, voRow.getRowData());
			} else if(voRow.getValue("itemType")=="qrcode"){
				each.userAttr("itemName", voRow.getValue("itemName"));
				
				var elQrCode = document.querySelector("#qrcode"+vnIndex);
				elQrCode.innerHTML = "";
				elQrCode.style.width = (voRow.getValue("width")+10) + "px";
				elQrCode.style.height = (voRow.getValue("height")+10) + "px";
				
				elQrCode = new QRCode(elQrCode, {
					text: voRow.getValue("itemName")
					, width: voRow.getValue("width")
					, height: voRow.getValue("height")
				});
//				elQrCode.getElementsByTagName("img")[0].setAttribute("width", voRow.getValue("width") + "px");
//				elQrCode.getElementsByTagName("img")[0].setAttribute("height", voRow.getValue("height") + "px");
				
			} else {
				each.userAttr("itemName", voRow.getValue("itemName"));
				// 변경된 바코드 값으로 다시 표시
				JsBarcode("#barcodeSvg" + vnIndex, Number(voRow.getValue("itemName")), {format: "code128"});
				document.getElementById("barcodeSvg" + vnIndex).setAttribute("width", voRow.getValue("width") + "px");
				document.getElementById("barcodeSvg" + vnIndex).setAttribute("height", voRow.getValue("height") + "px");
			}
			// 위지 변경
			grpCanvas.updateConstraint(each, {
				top: voRow.getValue("positionY") + "px",
				left: voRow.getValue("positionX") + "px",
				width: voRow.getValue("width") + "px",
				height: voRow.getValue("height") + "px"
			});
		}
	});
}

/*
 * "리셋" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	// 화면에 그려진 모든 항목 제거
	app.lookup("grpCanvas").removeAllChildren();
}

/*
 * "재배치" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	doSettingItem();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(e){
	/** @type cpr.controls.ComboBox */
	var cmb1 = e.control;
	if (e.newSelection[0].value == "barcode") {
		app.lookup("cmb4").clearSelection();
		app.lookup("cmb5").clearSelection();
		app.lookup("nbe5").putValue("");
	}
}

/*
 * "출력" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	innerBody = document.body.innerHTML;
	print = document.querySelector("[data-usr-print=true]");
	window.addEventListener("beforeprint", function(e) {
		document.body.innerHTML =  print.innerHTML;
		document.body.className = "canvas";
	});
	
	window.addEventListener("afterprint", function(e) {
		document.body.innerHTML =  innerBody;
		app.getRootAppInstance().getContainer().redraw();
	});
	
	window.print();
}

/*
 * "http://davidshimjs.github.io/qrcodejs/" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	window.open('http://davidshimjs.github.io/qrcodejs/');
}

/*
 * "https://github.com/lindell/JsBarcode/tree/master/dist/barcodes" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://github.com/lindell/JsBarcode/tree/master/dist/barcodes');
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = doInitBarcode + doInitQrCode;
}
