/*
 * App URI: app/exam/design/guide/cmn/Alert
 * Source Location: app/exam/design/guide/cmn/Alert.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/design/guide/cmn/Alert", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Alert.js
			 * Created at 2020. 5. 8. 오후 3:49:36.
			 *
			 * @author ryu
			 ************************************************/
			 
			 /************************************************
			 * 공통 모듈 선언
			 ************************************************/
			 
			 /************************************************
			 * 전역 변수 선언
			 ************************************************/
			 
			 /************************************************
			 * 사용자 정의 함수
			 ************************************************/
			 
			  cpr.core.NotificationCenter.INSTANCE.subscribe("alert", this, function(msg) {
				/** @type cpr.controls.Notifier */
				var notifier = app.lookup(msg.id);
				if (msg.success == true) {
					notifier.success(msg.msg);
				} else if (msg.info == true) {
					notifier.info(msg.msg);
				} else if (msg.warning == true) {
					notifier.warning(msg.msg);
				} else if (msg.danger == true) {
					notifier.danger(msg.msg);
				} else {
					notifier.notify(msg.msg);
				}
			});
			  
			 /************************************************
			 * 컨트롤 이벤트
			 ************************************************/
			
			
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				cpr.core.NotificationCenter.INSTANCE.post("alert", {
					id : "notiDf",
					msg : "Order has been placed. Your will be redirect for make your payment."
				});
				
				cpr.core.NotificationCenter.INSTANCE.post("alert", {
					id : "notiIn",
					info : true,
					msg : "Order has been placed. Your will be redirect for make your payment."
				});
				
				cpr.core.NotificationCenter.INSTANCE.post("alert", {
					id : "notiSc",
					success : true,
					msg : "Order has been placed. Your will be redirect for make your payment."
				});
				
				cpr.core.NotificationCenter.INSTANCE.post("alert", {
					id : "notiWr",
					warning : true,
					msg : "Order has been placed. Your will be redirect for make your payment."
				});
				
				cpr.core.NotificationCenter.INSTANCE.post("alert", {
					id : "notiDn",
					danger : true,
					msg : "Order has been placed. Your will be redirect for make your payment."
				});
			};
			// End - User Script
			
			// Header
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 850px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 849px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.spacing = 20;
			verticalLayout_1.leftMargin = 20;
			verticalLayout_1.rightMargin = 20;
			verticalLayout_1.topMargin = 20;
			verticalLayout_1.bottomMargin = 20;
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "30px"]);
			formLayout_1.setColumnAutoSizing(1, true);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "Alerts";
				output_1.style.setClasses(["h3"]);
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var userDefinedControl_1 = new udc.template.Breadcrumb("breadcrumb1");
				userDefinedControl_1.values = "DESIGN GUIDE,ALERTS";
				container.addChild(userDefinedControl_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "none",
				"width": "984px",
				"height": "26px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.setClasses(["card", "card-bordered"]);
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 10;
			verticalLayout_2.leftMargin = 20;
			verticalLayout_2.rightMargin = 20;
			verticalLayout_2.topMargin = 20;
			verticalLayout_2.bottomMargin = 20;
			group_2.setLayout(verticalLayout_2);
			(function(container){
				var output_2 = new cpr.controls.Output();
				output_2.value = "Examples - Default Style";
				output_2.style.setClasses(["card-title"]);
				container.addChild(output_2, {
					"width": "100px",
					"height": "25px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "notifier.part.less";
				output_3.style.setClasses(["card-subtitle"]);
				container.addChild(output_3, {
					"width": "100px",
					"height": "25px"
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "Default";
				output_4.style.setClasses(["text-gray"]);
				container.addChild(output_4, {
					"width": "100px",
					"height": "25px"
				});
				var notifier_1 = new cpr.controls.Notifier("notiDf");
				notifier_1.delay = 1000000;
				notifier_1.close = true;
				container.addChild(notifier_1, {
					"width": "100px",
					"height": "50px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "Info";
				output_5.style.setClasses(["text-gray"]);
				container.addChild(output_5, {
					"width": "100px",
					"height": "25px"
				});
				var notifier_2 = new cpr.controls.Notifier("notiIn");
				notifier_2.infoDelay = 1000000;
				notifier_2.infoClose = true;
				container.addChild(notifier_2, {
					"width": "100px",
					"height": "50px"
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "Success";
				output_6.style.setClasses(["text-gray"]);
				container.addChild(output_6, {
					"width": "100px",
					"height": "25px"
				});
				var notifier_3 = new cpr.controls.Notifier("notiSc");
				notifier_3.successDelay = 1000000;
				notifier_3.successClose = true;
				container.addChild(notifier_3, {
					"width": "100px",
					"height": "50px"
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "Warning";
				output_7.style.setClasses(["text-gray"]);
				container.addChild(output_7, {
					"width": "100px",
					"height": "25px"
				});
				var notifier_4 = new cpr.controls.Notifier("notiWr");
				notifier_4.warningDelay = 1000000;
				notifier_4.warningClose = true;
				container.addChild(notifier_4, {
					"width": "100px",
					"height": "50px"
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "Danger";
				output_8.style.setClasses(["text-gray"]);
				container.addChild(output_8, {
					"width": "100px",
					"height": "25px"
				});
				var notifier_5 = new cpr.controls.Notifier("notiDn");
				notifier_5.dangerDelay = 1000000;
				notifier_5.dangerClose = true;
				container.addChild(notifier_5, {
					"width": "100px",
					"height": "50px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "400px",
				"height": "563px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Alert";
	cpr.core.Platform.INSTANCE.register(app);
})();
