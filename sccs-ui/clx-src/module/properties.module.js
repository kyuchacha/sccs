/************************************************
 * properties.module.js
 * Created at 2021. 12. 20. 오후 3:36:06.
 *
 * @author 
 ************************************************/

function AppProperties(){
};

//Properties.prototype = (function() {
//	var MAIN_APP_ID = 'app/com/main/main';
//	var MSG_TOPIC_ID = "app-msg";
//	return {
//		MAIN_APP_ID: MAIN_APP_ID,
//		MSG_TOPIC_ID : MSG_TOPIC_ID
//	}
//}());

//메인 app id
AppProperties.prototype.MAIN_APP_ID = "app/com/main/main";

//NotificationCenter 메시지 구독 ID (메인에서 subscribe)
AppProperties.prototype.MSG_TOPIC_ID = "app-msg";

//공통 조회 버튼 ID (조회조건 초기화에서 사용)
AppProperties.prototype.SEARCH_BTN_ID = "btnSearch";

//조회조건 변경시 작업영역 초기화
AppProperties.prototype.IS_SEARCH_CLEAR = false;

//입력 폼 레이이아웃 class
AppProperties.prototype.FORM_LAYOUT_CSS = "form-box";

globals.AppProperties = new AppProperties();
