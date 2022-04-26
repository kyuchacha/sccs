/*
 * App URI: app/exam/layout/imgViewer
 * Source Location: app/exam/layout/imgViewer.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/layout/imgViewer", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * imgViewer.js
			 * Created at 2022. 3. 3. 오후 2:23:07.
			 *
			 * @author aaajd
			 ************************************************/
			
			/**
			 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
			 */
			exports.getText = function(){
				// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
				return "";
			};
			
			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.id = '레이아웃 구성도';
				app.lookup('img1').src = app.getAppProperty('src');
			}
			
			/*
			 * "X" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(e){
				app.close();
			};
			// End - User Script
			
			// Header
			
			app.supportMedia("all and (min-width: 1320px)", "eXFrame");
			app.supportMedia("all and (min-width: 1020px) and (max-width: 1319px)", "default");
			app.supportMedia("all and (min-width: 760px) and (max-width: 1019px)", "tablet");
			app.supportMedia("all and (max-width: 759px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["1fr", "20fr", "1fr"]);
			formLayout_1.setRows(["1fr", "20fr", "1fr"]);
			container.setLayout(formLayout_1);
			
			// UI Configuration
			var image_1 = new cpr.controls.Image("img1");
			(function(image_1){
			})(image_1);
			container.addChild(image_1, {
				"colIndex": 1,
				"rowIndex": 1
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "X";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"colIndex": 2,
				"rowIndex": 0,
				"verticalAlign": "fill"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "레이아웃 구성도";
	cpr.core.Platform.INSTANCE.register(app);
})();
