//공통 유틸(Util) 클래스
var util = createCommonUtil();

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vsFieldLabel = app.getHostProperty("fieldLabel");
	if(!ValueUtil.isNull(vsFieldLabel)){
		app.lookup("btnExlUpload").text = vsFieldLabel;
	}
}

/*
 * "엑셀업로드" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExlUploadClick(/* cpr.events.CMouseEvent */ e){
	//엑셀업로드 팝업 호출전 사용자 함수가 존재하는 경우에 반환값에 따라... 진행처리함
	if(!ValueUtil.isNull(app.getAppProperty("befCheckFunc"))){
		var hostApp = app.getHostAppInstance();
		var vbProgress = hostApp.callAppMethod(app.getAppProperty("befCheckFunc"));
		if(!vbProgress){
			e.preventDefault();
			return;
		}
	}
	
	/** @type cpr.controls.Grid */
	var targetGrid = app.getAppProperty("grid");
	if(targetGrid && targetGrid.dataSet.getRowStatedIndices(cpr.data.tabledata.RowState.INSERTED).length > 0){
		util.Msg.alert("신규 추가행 행이 존재합니다. 엑셀업로드 전에 데이터 저장을 먼저 하시기 바랍니다.");
		return false;
	}
	
	var hostApp = app.getHostAppInstance();
	
	//팝업 호출 파라메터
	var initValue = {"targetGrid":app.getAppProperty("grid"),
					 "startRowIndex":app.getAppProperty("startRowIndex"),
					 "startCellIndex":app.getAppProperty("startCellIndex"),
					 "ignoreDuplicate":app.getAppProperty("ignoreDuplicate"),
					 "showHiddenColumns":app.getAppProperty("showHiddenColumns")
					};
	util.Dialog.open(app, "app/cmn/cmnPExcelUpload", 800, 550, function(e){
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if(returnValue != null){
			//팝업 반환값에 대한 콜백처리
			if(returnValue.complete === "Y"){
				var event = new cpr.events.CUIEvent("complete");
				app.dispatchEvent(event);
			}
		}
	}, initValue);
}
