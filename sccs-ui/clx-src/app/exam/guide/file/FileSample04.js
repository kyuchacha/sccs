/************************************************
 * FileSample04.js
 * Created at 2020. 6. 3. 오후 3:42:30.
 *
 * @author 1073903
 ************************************************/

var util = createCommonUtil();

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	
	//그리드 초기화
	util.Grid.init(app, ["grd1", "grd2", "grd3", "grd4"]);
	
//	util.Group.setFloatGrp(app, app.lookup("grp19"));
	
}


/*
 * "찾아보기" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	app.lookup("fip1").openFileChooser();
}

/*
 * "업로드" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	
	var btn2 = e.control;
	
	var excelFile = app.lookup("fip1").file;
	
	if (ValueUtil.isNull(excelFile)) {
		util.Msg.alert( "WRN-M045", "파일");
		return false;
	};
	
	app.lookup("dmParam").setValue("dsColumnNames1", app.lookup("ds1").getColumnNames());
	app.lookup("dmParam").setValue("dsColumnNames2", app.lookup("ds2").getColumnNames());
	app.lookup("dmParam").setValue("dsColumnNames3", app.lookup("ds3").getColumnNames());
	app.lookup("dmParam").setValue("dsColumnNames4", app.lookup("ds4").getColumnNames());
	
	app.lookup("dmParam").setValue("excludeCol1", "column2,column5");
	app.lookup("dmParam").setValue("excludeCol2", "sht1");
	app.lookup("dmParam").setValue("excludeCol3", "col7");
	app.lookup("dmParam").setValue("excludeCol4", "");
	
	app.lookup("subExcelPreView").addFileParameter("excel", excelFile);
	util.Submit.send(app, "subExcelPreView", function() {
		app.lookup("grd1").redraw();
		app.lookup("grd2").redraw();
		app.lookup("grd3").redraw();
		app.lookup("grd4").redraw();
		
		util.Grid.setRowStateAll(app, "grd1", cpr.data.tabledata.RowState.INSERTED);
		util.Grid.setRowStateAll(app, "grd2", cpr.data.tabledata.RowState.INSERTED);
		util.Grid.setRowStateAll(app, "grd3", cpr.data.tabledata.RowState.INSERTED);
		util.Grid.setRowStateAll(app, "grd4", cpr.data.tabledata.RowState.INSERTED);
	});
	
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFip1ValueChange( /* cpr.events.CValueChangeEvent */ e) {
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fip1 = e.control;
	
	var addFile = fip1.file;
	
	//파일확장자 체크	
	if (fip1.acceptFile.indexOf(addFile.name.substr(addFile.name.lastIndexOf("."))) < 0) {
		//지원하지 않는 파일 형식입니다.
		util.Msg.alert( "INF-M025");
		fip1.file = null;
	};
}

/*
 * "샘플다운로드" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click( /* cpr.events.CMouseEvent */ e) {
	
	var fileName = "멀티시트 샘플 다운로드"
	
	var grd1 = app.lookup("grd1");
	var grd2 = app.lookup("grd2");
	var grd3 = app.lookup("grd3");
	var grd4 = app.lookup("grd4");
	
	var exData1 = grd1.getExportData(false);
	var exData2 = grd2.getExportData(false);
	var exData3 = grd3.getExportData(false);
	var exData4 = grd4.getExportData(false);
	//	var exData5 = cpr.utils.ExportUtil.getExportData(app.lookup("ds1"));//데이터셋 Export 시 
	//	var exData6 = cpr.utils.ExportUtil.getExportData(app.lookup("ds2"));
	
	exData1.name = grd1.fieldLabel;
	exData2.name = grd2.fieldLabel;
	exData3.name = grd3.fieldLabel;
	exData4.name = grd4.fieldLabel;
	
	var aa = [exData1, exData2, exData3, exData4];
	var exportData = cpr.utils.ExportUtil.merge([exData1, exData2, exData3, exData4]);
	//그리드 출력 스타일지정
	for (var a = 0; a < aa.length; a++) {
		for (var i = 0, len = aa[a].rowgroups.length; i < len; i++) {
			// band별로 원하는 스타일 추가 가능 (header, detail, footer, gheader, gfooter)
			var rowGroup = aa[a].rowgroups[i];
			var cellLength = rowGroup.style.length;
			for (var j = 0; j < cellLength; j++) {
				rowGroup.style[j].style["border-bottom-color"] = "black";
				rowGroup.style[j].style["border-bottom-style"] = "solid";
				rowGroup.style[j].style["border-bottom-width"] = "1px";
				rowGroup.style[j].style["border-left-color"] = "black";
				rowGroup.style[j].style["border-left-style"] = "solid";
				rowGroup.style[j].style["border-left-width"] = "1px";
				rowGroup.style[j].style["border-right-color"] = "black";
				rowGroup.style[j].style["border-right-style"] = "solid";
				rowGroup.style[j].style["border-right-width"] = "1px";
				rowGroup.style[j].style["border-top-color"] = "black";
				rowGroup.style[j].style["border-top-style"] = "solid";
				rowGroup.style[j].style["border-top-width"] = "1px";
				
				if (rowGroup.region == "header") {
					rowGroup.style[j].style["background-color"] = "#dddddd";
					rowGroup.style[j].style["text-align"] = "center";
				}
			}
		}
	}
	var submission = app.lookup("subDirectExport");
	
	var fileType = "xlsx";
	
	submission.action = "cleopatraFileExport/fileExport.do";
	submission.addParameter("fileName", fileName.replace("\/", "") + ".xlsx");
	
	submission.setRequestObject(exportData);
	util.Submit.send(app, "subDirectExport", function() {});
	
}

/*
 * "전체데이터 clear" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.lookup("ds1").clear();
	app.lookup("ds2").clear();
	app.lookup("ds3").clear();
	app.lookup("ds4").clear();
}

/*
 * 파일 인풋에서 maxsize-exceed 이벤트 발생 시 호출.
 * 파일을 추가 시 파일의 크기가 최대 일 경우 발생하는 이벤트. 추가할 파일이 최대 크기보다 큰 경우 발생합니다. 추가된 파일들의 합계가 최대 크기보다 큰 경우 발생합니다.
 */
function onFip1MaxsizeExceed( /* cpr.events.CFileUploadEvent */ e) {
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fip1 = e.control;
	//파일사이즈는 {0}를 초과 할 수 없습니다.
	util.Msg.alert( "WRN-M038", fip1.limitFileSize.toLocaleUpperCase());
	e.preventDefault();
}