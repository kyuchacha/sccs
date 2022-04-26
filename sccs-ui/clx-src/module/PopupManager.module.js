/************************************************
 * PopupManager.module.js
 * Created at 2018. 12. 18. 오후 2:30:51.
 *
 * @author tomato
 ************************************************/
var Position = {
	left: "left",
	top: "top",
	bottom: "bottom",
	right: "right"
};
var _baseCtrl = null;
var _popupCtrl = null;
var _buffer = 3;

exports.tooltipPopup = function(/*cpr.controls.UIControl*/baseCtrl,/*cpr.controls.UIControl*/popupCtrl, options) {
	if(baseCtrl ==null|| popupCtrl == null){
		return;
	}
	var tp = options? options.position: "top";

	var baseCtrlRect = baseCtrl.getActualRect();

	var left = baseCtrlRect.left;
	
	var docHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	
	var rootApp = baseCtrl.getAppInstance().getRootAppInstance();
	//스크롤이 이동한 크기
	var scrollRect = rootApp.getContainer().getViewPortRect();

	if (tp == "bottom") {
		//스크롤 위치의 값을 계산 20181214
		var top = baseCtrlRect.bottom + scrollRect.top + _buffer;
		popupCtrl.style.css({
			position: "absolute",
			overflow: "auto",
			left: -left + "px",
			top: top + "px"
		});
	}else if(tp == "left"){
		var top = baseCtrlRect.top;
		var right = (docWidth- baseCtrlRect.left) - scrollRect.left;
		popupCtrl.style.css({
			position: "absolute",
			overflow: "auto",
			right: right + "px",
			top: top + "px"
		});
	} else if(tp =="right"){
		var top = baseCtrlRect.top;
		var left = baseCtrlRect.right;
		popupCtrl.style.css({
			position: "absolute",
			overflow: "auto",
			left: left+ "px",
			top: top + "px"
		});
	} else {
		//스크롤 위치의 값을  계산 20181214
		var bottom = ((docHeight -baseCtrlRect.top) - scrollRect.top) + _buffer;
		popupCtrl.style.css({
			position: "absolute",
			overflow: "auto",
			left: -left + "px",
			bottom: bottom + "px"

		});
	}
	if(options && options.width){
		popupCtrl.style.css("width",options.width+"px");
	}
	if(options && options.height){
		popupCtrl.style.css("height",options.height+"px");
	}
	popupCtrl.style.css("visibility", "hidden"); //처음 생성시 DOM을 보이지 않게하고 위치에 따른 크기를 계산.

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		if (!_popupCtrl) {
			return;
		}
		if (checkOverflowRight(_popupCtrl)) {
			var left = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			var baseCtrlRect = _baseCtrl.getActualRect();
			var posX = left - (Math.abs(baseCtrlRect.left) + baseCtrlRect.width);
			_popupCtrl.style.removeStyle("left");
			_popupCtrl.style.css({
				right: posX + "px"
			});
		} else if(checkOverflowLeft(_popupCtrl)&& (tp=="left"||tp=="right")){
			var baseCtrlRect = _baseCtrl.getActualRect();
			var posX = baseCtrlRect.left + baseCtrlRect.width;
			_popupCtrl.style.removeStyle("right");
			_popupCtrl.style.css({
				left: posX + "px"
			});
		}else {
			var left = parseInt(_popupCtrl.style.css("left"));
			_popupCtrl.style.css("left", Math.abs(left) + "px");
		}
		_popupCtrl.style.removeStyle("visibility");
		
		_baseCtrl = null;
		_popupCtrl= null;
		
	});
	_baseCtrl = baseCtrl;
	_popupCtrl = popupCtrl;
	rootApp.getContainer().floatControl(popupCtrl);
}

/**
 * 오른쪽으로 넘어가는지 확인합니다.
 * @param ctrl
 */
function checkOverflowRight(/*cpr.controls.UIControl*/ctrl){
	var left = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var rect = ctrl.getActualRect();
	
	var isOverflow = Math.abs(rect.left) + rect.width >left;
	return isOverflow;
}

/**
 * 왼쪽으로 넘어가는지 확인합니다.
 * @param ctrl
 */
function checkOverflowLeft(/*cpr.controls.UIControl*/ctrl){
	
	if(ctrl.getActualRect().left<0){
		return true;
	}
	return false;
	
	
}