/************************************************
 * createNewAppIns.module.js
 * Created at 2019. 11. 15. 오전 9:46:36.
 * 
 * @author kjh
 ************************************************/

/*
 * 런타임 시 테스트 관정을 지원하기 위하여 현재의 dataSet 및 dataMap의 값 및 상태를 조회할 수 있는 기능을 제공하는 공통모듈입니다.
 * 화면 로드시 단축키(기본 ctrl+alt+a) 를 누르면 팝업을 통해 확인 할 수 있습니다.
 * 
 * ※ 주의사항
 * 해당 모듈은 테스트를 위한 모듈입니다.
 * 운영서버 배포시에는 이를 포함하여 서버에 배포하시면 안됩니다. (보안상의 문제 발생 소지가 있습니다.)
 */


/************************************************
 * 전역 변수 (변경 가능)
 ************************************************/
/**
 * 모듈 사용 여부
 * true일 경우에만 데이터 컴포넌트를 확인할 수 있는 앱 생성 및 단축키를 지원합니다.
 * @type {Boolean}
 */
var mbCreateApp = true; 

/**
 * 컨트롤 height
 * @type {String}
 */
var msRowHeight = "28px";

/**
 * 마지막 단축키
 * default : Ctrl+Alt+A
 * @type {cpr.events.KeyCode}
 */
var msDynamicKey = cpr.events.KeyCode.A;

/**
 * 팝업에서 데이터맵을 보여줄 때 생성되는 그룹의 클래스명
 * @type {String}
 */
var msFormCls = "cl-form-group";

/**
 * 팝업에서 데이터맵을 보여줄 때 생성되는 아웃풋의 클래스명
 * @type {String}
 */
var msOptCls = "text-center";


/************************************************
 * 전역 변수 (변경 불가능)
 ************************************************/
/**
 * 앱인스턴스
 * @type {cpr.core.AppInstance}
 */
var moAppInstance = null;

/**
 * 그리드 (데이터셋) || 그룹 (데이터맵)
 * @type {cpr.controls.Container|cpr.controls.Grid}
 */
var mcControl = null;

/**
 * 동적으로 생성한 다이얼로그 앱 ID
 * @type {String}
 */
var msAppId = null;

/**
 * 임베디드 앱인스턴스 객체
 * @type {cpr.core.AppInstance}
 */
var moEmbedded = null;

/**
 * 다이얼로그가 띄워졌는지 여부
 * @type {Boolean}
 */
var mbPopup = false;

/**
 * 다이얼로그 앱
 * @type {cpr.core.AppInstance}
 */
var moDialogApp = null;

/**
 * 
 * @type {Array}
 */
var maAppInstance = []; 

/**
 * @type {cpr.core.AppInstance}
 */
var rootApp
/**
 * 
 * @type {Array}
 */
var maDatasetId = [];

/************************************************
 * 이벤트 리스너
 ************************************************/

/**
 * 팝업을 열기위한 단축키를 지정합니다.<br>
 * 단축키 : Ctrl + Alt + A (default)
 */
window.addEventListener("keydown", function (e) {
	if(e.ctrlKey && e.altKey && e.keyCode == msDynamicKey) {
		/** @type {cpr.core.AppInstance} **/
		var mainApp = cpr.core.Platform.INSTANCE.getAllLoadedApps().find(function(each){
			return each.id === "app/com/main/main"
		}).getInstances()[0]

		/** @type {cpr.controls.MDIFolder} **/ 
		var mdi = mainApp.lookup("mdiCn");
		var activeApp = mdi.getSelectedTabItem().content.getEmbeddedAppInstance();
		var menuRow = mainApp.lookup("dsAllMenu").findFirstRow("CALL_PAGE =='" + activeApp.app.id + "'");

		var allApps = AppInstancePicker.pick([activeApp]);
		var allDataControls = DataControlPicker.pick(allApps);
		
		var param = {
			menuId : activeApp.app.id,
			menuNm : menuRow ? menuRow.getString("MENU_NM") : activeApp.app.title,
			childApp : allApps,
			dataControls : allDataControls
		}
		var dialogProp = {
			width : 1200,
			height : 700
		}
		mainApp.openDialog("app/cmn/cmnDataFiddle", dialogProp, function(/* cpr.controls.Dialog */dialog) {
			dialog.app.isPopup = true;
			dialog.app.modal = true;
			dialog._originWidth = dialogProp["width"];
			dialog._originHeight = dialogProp["height"];
		
			if (dialog.app.title) { 
				dialog.headerTitle = dialog.app.title;
			}

			dialog.initValue = param;
			
		})
	}
});


var DataControlPicker = {
	
	/**
	 * app의 데이터컨트롤을 모두 추출하는 기능
	 * @param {cpr.core.AppInstance[]} targetApp
	 */
	pick : function(apps){
		var result = []
		apps.forEach(function(/* cpr.core.AppInstance */ each){
			result = result.concat(each.getAllDataControls().filter(function(each){
				return !(each instanceof cpr.protocols.Submission);
			}));
		});
		
		return result;
	}
}

var AppInstancePicker = {
	/**
	 * 
	 * @param {cpr.core.AppInstance[]} startApp
	 * @param {Array} resArray
	 */
	pick : function(startApp, resArray){
		resArray = resArray || startApp;
		
		var appInstances = [];
		
		startApp.forEach(function(each){
			appInstances = appInstances.concat(
				each.getContainer().getAllRecursiveChildren().filter(function(ctrl){
						return ctrl.type === "embeddedapp" || ctrl instanceof cpr.controls.UDCBase
				}).map(function(emb){
					return emb.getEmbeddedAppInstance();
				})
			)
		});
		
		return appInstances.length === 0 ? resArray : this.pick(appInstances, resArray.concat(appInstances))
	}
}



