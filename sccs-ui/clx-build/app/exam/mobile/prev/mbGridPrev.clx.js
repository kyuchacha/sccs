/*
 * App URI: app/exam/mobile/prev/mbGridPrev
 * Source Location: app/exam/mobile/prev/mbGridPrev.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/mobile/prev/mbGridPrev", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * mbGrid3.js
			 * Created at 2021. 7. 12. 오전 3:07:36.
			 *
			 * @author minhye
			 ************************************************/
			
			//공통 모듈 사용
			var util = createCommonUtil();
			
			
			/*
			 * "DEMO" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				// 팝업호출
				util.Dialog.open(app, "app/exam/mobile/mbPopGrid", 450, 548);
				
			};
			// End - User Script
			
			// Header
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.setClasses(["cl-form-group"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "1fr";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "1fr";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["120px", "1fr"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setColumnAutoSizing(0, true);
			formLayout_1.setRows(["24px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "모바일 화면";
				output_1.style.setClasses(["label"]);
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "DEMO";
				button_1.style.setClasses(["btn-primary"]);
				if(typeof onButtonClick == "function") {
					button_1.addEventListener("click", onButtonClick);
				}
				container.addChild(button_1, {
					"colIndex": 1,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1,
					"horizontalAlign": "left"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "42px"
			});
			if(typeof onBodyLoad2 == "function"){
				app.addEventListener("load", onBodyLoad2);
			}
			if(typeof onBodyScreenChange2 == "function"){
				app.addEventListener("screen-change", onBodyScreenChange2);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyScreenChange == "function"){
				app.addEventListener("screen-change", onBodyScreenChange);
			}
		}
	});
	app.title = "모바일 그리드";
	cpr.core.Platform.INSTANCE.register(app);
})();
