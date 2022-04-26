/************************************************
 * GridSampleEtc09.js
 * Created at 2020. 6. 3. 오후 5:39:48.
 *
 * @author 1073727
 ************************************************/

var util = createCommonUtil();

exports.returnValueFunc = function(poRtnValue) {
	alert(poRtnValue.aaaaa)
}

var activeLayerPop = null;
/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrdListCellClick( /* cpr.events.CGridEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdList = e.control;
	
	if (e.cellIndex == "5") {
		
		if (!ValueUtil.isNull(activeLayerPop)) return false;
		
		cpr.core.App.load("app/exam/guide/grid/GridSampleEtc09_layerPopup", function(loadedApp) {
			if (loadedApp) {
				var layerPop = new cpr.controls.EmbeddedApp("callApp", loadedApp);
				layerPop.initValue = {
					"val1": "qqqqqqqq",
					"val2": "2222222",
					"val3": "aaaaa",
					"val4": "wwwwww",
					"hostApp": app
				}
				
				layerPop.addEventListener("unload", function(e) {
					activeLayerPop = null;
				});
				
				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
					var top = util.Control.getActualRectPosition(app, "btn1", "top") + 10;
					var left = util.Control.getActualRectPosition(app, "btn1", "left") - 380;
					
					var rootApp = util.getMainApp(app);
					rootApp.removeFloatingControl(rootApp.lookup("callApp"));
					rootApp.floatControl(layerPop, {
						"position": "absolute",
						"top": top + "px",
						"left": left + "px",
						"width": "400px",
						"height": "200px"
					});
					
					activeLayerPop = layerPop;
				});
				
			};
		});
	}
}
