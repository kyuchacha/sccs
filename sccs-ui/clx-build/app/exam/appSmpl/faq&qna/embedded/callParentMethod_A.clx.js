/*
 * App URI: app/exam/appSmpl/faq&qna/embedded/callParentMethod_A
 * Source Location: app/exam/appSmpl/faq&qna/embedded/callParentMethod_A.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/appSmpl/faq&qna/embedded/callParentMethod_A", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * SCRIPT_CONTROLS_EMBEDDEDAPP_03_A.js
			 * Created at 2022. 1. 26. 오후 5:12:28.
			 *
			 * @author "nhyu"
			 ************************************************/
			//전역변수
			var moHostAppIns = app.getHostAppInstance();
			
			function callMethod(args){
				console.log(args);
				//직속부모 앱 인스턴스 접근 
				var voHostAppIns = app.getHostAppInstance();	
				
				//부모 앱에서 작성한 함수 유무 확인
				if(voHostAppIns.hasAppMethod('createButton')) {
					//함수 호출
					voHostAppIns.callAppMethod('createButton', args);
				}
			}
			
			function setValue() {
				//전달받은 초기값
				var host = app.getHost();
				var voInitValue = host.initValue;
				
				/** @type cpr.controls.TextInput */
				var vcFunctionName = moHostAppIns.lookup("optFuncName2");
				var vcname = vcFunctionName.value;
			
				/* 임베디드 앱의 인스턴스가 있으면 실행 */
				if (moHostAppIns){
					var vcAceEditor = moHostAppIns.lookup("ace2");
					vcAceEditor.value = callMethod;
				}
			}
			
			//부모앱으로 내보낼 함수 export
			exports.setValue = setValue;
			exports.callMethod = callMethod;
			// End - User Script
			
			// Header
			
			app.supportMedia("all and (min-width: 1200px)", "default");
			app.supportMedia("all and (min-width: 850px) and (max-width: 1199px)", "tablet");
			app.supportMedia("all and (max-width: 849px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-image" : "none",
				"background-color" : "white",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.distribution = "center";
			verticalLayout_1.spacing = 10;
			verticalLayout_1.leftMargin = 100;
			verticalLayout_1.rightMargin = 100;
			verticalLayout_1.topMargin = 100;
			verticalLayout_1.bottomMargin = 100;
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var output_1 = new cpr.controls.Output();
			output_1.value = "임베디드 앱 내 앱화면";
			output_1.style.css({
				"font-size" : "30px",
				"text-align" : "center"
			});
			container.addChild(output_1, {
				"width": "396px",
				"height": "90px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "callParentMethod_A";
	cpr.core.Platform.INSTANCE.register(app);
})();
