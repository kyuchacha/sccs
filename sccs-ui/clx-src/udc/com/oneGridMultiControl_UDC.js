/************************************************
 * udc_gridCustomControl.js
 * Created at 2022. 2. 24. 오후 9:35:34.
 *
 * @author LHS_0212
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return app.getAppProperty("cellValue");
};

