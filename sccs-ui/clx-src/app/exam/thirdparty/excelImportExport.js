/************************************************
* excelImportExport2.js
 * Created at 2022. 3. 8. 오후 2:00:32.
 *
 * @author aaajd
 ************************************************/


 /************************************************
  * 전역 변수 선언
  ************************************************/
 var responseData;
 var sendData;
 var _data;
 var mbExcelJS = false;
 /************************************************
  * 사용자 정의 함수
  ************************************************/
 function doList() {
 	app.lookup("subList").send();
 }
 
 
  /************************************************
  * 컨트롤 이벤트
  ************************************************/
/*
 * "https://github.com/eligrey/FileSaver.js" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://github.com/eligrey/FileSaver.js');
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = importExcel + importExcelJs + onCmb1SelectionChange;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("cmb1").selectItem(0);
}

/*
 * "조회" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	/** 
 	 * @type cpr.controls.Button
 	 */
 	doList();
}

/*
 * "초기화" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	/** 
 	 * @type cpr.controls.Button
 	 */
 	app.lookup("dsList").clear();
 	
 	app.lookup("comtitle1").rowCount = 0;
}
/************************************************
  * IMPORT
  ************************************************/
 /**
  * sheetJS 를 통한 엑셀 임포트
  * @param {cpr.controls.FileInput} pcFileInput
  */
 function importExcel(pcFileInput) {
 	var responseData;
 	var sendData;
 	var _data;
 	
 	var fileData = pcFileInput.file;
 	
 	sendData = moment().valueOf();
 	
 	var reader = new FileReader();
 	
 	//extend FileReader
 	if (!FileReader.prototype.readAsBinaryString) {
 		reader.readAsArrayBuffer(fileData);
 	} else {
 		reader.readAsBinaryString(fileData);
 	}
 	
 	reader.onload = function(e) {
 		
 		var data = e.target.result;
 		if (data instanceof ArrayBuffer) {
 			var binary = "";
 			var bytes = new Uint8Array(reader.result);
 			var length = bytes.byteLength;
 			for (var i = 0; i < length; i++) {
 				binary += String.fromCharCode(bytes[i]);
 			}
 			data = binary;
 		}
 		
 		var workbook = XLSX.read(data, {
 			type: 'binary'
 		});
 		
 		workbook.SheetNames.forEach(function(item, index) {
 			ws = workbook.Sheets[item];
 			var range = XLSX.utils.decode_range(workbook.Sheets[item]['!ref']);
 			
 			range.s.r = 1;
 			//2. 데이터셋에서 컬럼이름 가져오는거
 			var _header = app.lookup("dsList").getColumnNames();
 			var EXCEL_JSON;
 			EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {
 				range: range,
 				header: _header
 			});
 			
 			_data = EXCEL_JSON;
 			
 		});
 	};
 	
 	reader.onloadend = function(e) {
 		app.lookup("grdList").dataSet.build(_data, false);
 	};
 }
 
 /**
  * excelJS 라이브러리를 통한 엑셀 임포트
  * @param {cpr.controls.FileInput} pcFileInput
  */
 function importExcelJs(pcFileInput) {
 	var responseData;
 	var sendData;
 	var _data;
 	
 	sendData = moment().valueOf();
 	
 	var reader = new FileReader();
 	
 	var workbook = new ExcelJS.Workbook();
 	var fileData = pcFileInput.file;
 	
 	reader.readAsArrayBuffer(fileData);
 	reader.onload = function(e) {
 		
 		var data = e.target.result;
 		var _header = app.lookup("dsList").getColumnNames();
 		var EXCEL_JSON = [];
 		//workbook.xlsx.load(ExcelUtil._s2ab(data)).then(function(workbook) {
 		workbook.xlsx.load(data).then(function(workbook) {
 			
 			workbook.eachSheet(function(worksheet, sheetId) {
 				worksheet.eachRow({
 					includeEmpty: false
 				}, function(row, rowNumber) {
 					if (rowNumber == 1) return;
 					
 					var voData = {};
 					row.eachCell({
 						includeEmpty: false
 					}, function(cell, colNumber) {
 						voData[_header[colNumber - 1]] = cell.value;
 					});
 					EXCEL_JSON.push(voData);
 				});
 			});
 		}).then(function(success) {
 			app.lookup("grdList").dataSet.build(EXCEL_JSON, false);
 		}).catch(function(error) {
 			console.log(error);
 		});
 	};
 	
 }

/*
 * "IMPORT" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/** 
 	 * @type cpr.controls.Button
 	 */
 	var btn2 = e.control;
 	
 	if (app.lookup("cmb1").getSelectionLast().label.indexOf("excel") != -1) {
 		mbExcelJS = true;
 	} else {
 		mbExcelJS = false;
 	}
 	app.lookup("fi1").openFileChooser();
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e){
	/** 
 	 * @type cpr.controls.FileInput
 	 */
 	var fi1 = e.control;
 	
 	if (mbExcelJS) {
 		/* excelJS */
 		importExcelJs(fi1);
 	} else {
 		/* sheetJS */
 		importExcel(fi1);
 	}
}

/*
 * "EXPORT" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e){
	/** 
 	 * @type cpr.controls.Button
 	 */
 	var btn1 = e.control;
 	
 	var resourceLoader = new cpr.core.ResourceLoader();
 	/* excel.js */
 	if (app.lookup("cmb1").getSelectionLast().label.indexOf("excel") != -1) {
 		
 		var vsFileName = "EXCEL_CLIENT_EXPORT_" + app.lookup("grdList").getRowCount() + "_excelJS.xlsx";
 		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
 			ExcelUtil.exportExcelJsToJSON(vsFileName, "sheet1", app.lookup("grdList"));
 		});
 	} else {
 		/* sheet.js */
 		var vsFileName = "EXCEL_CLIENT_EXPORT_" + app.lookup("grdList").getRowCount() + "_sheetJS.xlsx";
 		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
 			ExcelUtil.exportExcelToJSON(vsFileName, "sheet1", app.lookup("grdList"));
 		});
 	}
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(e){
	/** 
 	 * @type cpr.controls.ComboBox
 	 */
 	var cmb1 = e.control;
 	var resourceLoader = new cpr.core.ResourceLoader();
 	/* excel.js */
 	if (e.newSelection[0].label.indexOf("excel") != -1) {
 		// exceljs의 3.0 version 이상일 경우 ecma6 문법 사용하므로 공통적으로 2.0.0 버젼으로 적용
 		resourceLoader.addScript("./thirdparty/excel/exceljs.js").load(); // 2.0
 	} else {
 		/* sheet.js */
 		resourceLoader.addScript("./thirdparty/excel/xlsx.min.js").load();
 	}
}

/*
 * "https://github.com/sheetjs/sheetjs" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(e){
	window.open('https://github.com/sheetjs/sheetjs');
}

/*
 * "https://github.com/exceljs/exceljs" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	window.open('https://github.com/exceljs/exceljs');
}
