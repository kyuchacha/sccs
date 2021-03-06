/*
 * App URI: app/exam/controls/Image
 * Source Location: app/exam/controls/Image.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/controls/Image", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Image.js
			 * Created at 2022. 3. 8. 오후 2:03:45.
			 *
			 * @author 1amthomas
			 ************************************************/;
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
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grpHeader");
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 0;
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				userDefinedControl_1.initializeYn = "N";
				userDefinedControl_1.searchBoxId = "grpHeader";
				container.addChild(userDefinedControl_1, {
					"width": "500px",
					"height": "30px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "400px",
				"height": "30px"
			});
			
			var group_2 = new cpr.controls.Container("grpData");
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.spacing = 20;
			verticalLayout_3.leftMargin = 50;
			verticalLayout_3.rightMargin = 50;
			verticalLayout_3.topMargin = 20;
			verticalLayout_3.bottomMargin = 60;
			group_2.setLayout(verticalLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container();
				// Layout
				var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_4.spacing = 30;
				verticalLayout_4.leftMargin = 0;
				verticalLayout_4.rightMargin = 0;
				verticalLayout_4.topMargin = 20;
				verticalLayout_4.bottomMargin = 40;
				group_3.setLayout(verticalLayout_4);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "이미지";
					output_1.style.css({
						"font-weight" : "700",
						"font-size" : "2.5rem",
						"font-family" : "sans-serif , 'Malgun Gothic' , 'Noto Sans KR'"
					});
					container.addChild(output_1, {
						"autoSize": "height",
						"width": "100px",
						"height": "45px"
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "사진 등의 이미지를 출력하는 컨트롤입니다.\r\n\r\n사용자가 원하는 파일 경로를 저장 후 출력이 가능합니다.\r\n이미지 지원 파일에는 jpg, jpeg, gif, png 등이 있습니다.";
					output_2.style.setClasses(["opt-tmpl"]);
					output_2.style.css({
						"font-family" : "sans-serif , 'Malgun Gothic' , 'Noto Sans KR'"
					});
					container.addChild(output_2, {
						"autoSize": "height",
						"width": "100px",
						"height": "150px"
					});
					var group_4 = new cpr.controls.Container();
					group_4.style.setClasses(["attach-box"]);
					group_4.style.css({
						"border-right-style" : "solid",
						"border-top-width" : "1px",
						"border-bottom-color" : "#babfc7",
						"border-right-width" : "1px",
						"border-left-color" : "#babfc7",
						"border-right-color" : "#babfc7",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"background-color" : "#e9e9e9",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#babfc7",
						"border-bottom-style" : "solid"
					});
					// Layout
					var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
					flowLayout_1.scrollable = false;
					flowLayout_1.horizontalSpacing = 40;
					flowLayout_1.verticalSpacing = 20;
					flowLayout_1.horizontalAlign = "center";
					flowLayout_1.verticalAlign = "middle";
					flowLayout_1.leftMargin = 20;
					flowLayout_1.rightMargin = 20;
					flowLayout_1.topMargin = 20;
					flowLayout_1.bottomMargin = 20;
					group_4.setLayout(flowLayout_1);
					(function(container){
						var group_5 = new cpr.controls.Container();
						// Layout
						var formLayout_1 = new cpr.controls.layouts.FormLayout();
						formLayout_1.topMargin = "0px";
						formLayout_1.rightMargin = "0px";
						formLayout_1.bottomMargin = "0px";
						formLayout_1.leftMargin = "0px";
						formLayout_1.horizontalSpacing = "5px";
						formLayout_1.verticalSpacing = "5px";
						formLayout_1.setColumns(["1fr"]);
						formLayout_1.setRows(["1fr", "20px"]);
						group_5.setLayout(formLayout_1);
						(function(container){
							var output_3 = new cpr.controls.Output();
							output_3.value = "<기본 이미지 컨트롤>";
							output_3.style.setClasses(["text-center"]);
							container.addChild(output_3, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var image_1 = new cpr.controls.Image("defaultImg");
							image_1.src = "app/exam/controls/빌딩.PNG";
							(function(image_1){
							})(image_1);
							container.addChild(image_1, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_5);
						container.addChild(group_5, {
							"autoSize": "none",
							"width": "300px",
							"height": "300px"
						});
						var group_6 = new cpr.controls.Container();
						// Layout
						var formLayout_2 = new cpr.controls.layouts.FormLayout();
						formLayout_2.scrollable = true;
						formLayout_2.topMargin = "0px";
						formLayout_2.rightMargin = "0px";
						formLayout_2.bottomMargin = "0px";
						formLayout_2.leftMargin = "0px";
						formLayout_2.horizontalSpacing = "5px";
						formLayout_2.verticalSpacing = "5px";
						formLayout_2.setColumns(["1fr"]);
						formLayout_2.setRows(["1fr", "20px"]);
						group_6.setLayout(formLayout_2);
						(function(container){
							var output_4 = new cpr.controls.Output();
							output_4.value = "<컨트롤 동적 생성 코드>";
							output_4.style.setClasses(["text-center"]);
							container.addChild(output_4, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var userDefinedControl_2 = new udc.tmp.Ace("ace1");
							userDefinedControl_2.value = "var image_1 = new cpr.controls.Image();\r\n\r\nimage_1.src = \"app/exam/controls/빌딩.PNG\";";
							container.addChild(userDefinedControl_2, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_6);
						container.addChild(group_6, {
							"autoSize": "both",
							"width": "450px",
							"height": "300px"
						});
					})(group_4);
					container.addChild(group_4, {
						"autoSize": "height",
						"width": "1220px",
						"height": "381px"
					});
				})(group_3);
				container.addChild(group_3, {
					"autoSize": "height",
					"width": "400px",
					"height": "700px"
				});
				var group_7 = new cpr.controls.Container();
				group_7.style.setClasses(["card-inner"]);
				// Layout
				var verticalLayout_5 = new cpr.controls.layouts.VerticalLayout();
				verticalLayout_5.spacing = 30;
				verticalLayout_5.leftMargin = 0;
				verticalLayout_5.rightMargin = 0;
				verticalLayout_5.topMargin = 20;
				verticalLayout_5.bottomMargin = 40;
				group_7.setLayout(verticalLayout_5);
				(function(container){
					var output_5 = new cpr.controls.Output();
					output_5.value = "자주 사용되는 속성";
					output_5.style.setClasses(["h1", "pl-3", "bg-primary", "text-white"]);
					output_5.style.css({
						"font-weight" : "700",
						"font-size" : "26px",
						"font-family" : "sans-serif , 'Malgun Gothic' , 'Noto Sans KR'"
					});
					container.addChild(output_5, {
						"autoSize": "none",
						"width": "1220px",
						"height": "38px"
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "자주 사용되는 속성과 시나리오를 통한 예제를 확인할 수 있습니다. 자세한 사항은 Help Contents를 참조하시기 바랍니다.";
					container.addChild(output_6, {
						"autoSize": "height",
						"width": "100px",
						"height": "141px"
					});
					var group_8 = new cpr.controls.Container();
					group_8.style.setClasses(["card-inner"]);
					// Layout
					var verticalLayout_6 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_6.spacing = 15;
					verticalLayout_6.leftMargin = 40;
					verticalLayout_6.rightMargin = 40;
					verticalLayout_6.topMargin = 20;
					verticalLayout_6.bottomMargin = 40;
					group_8.setLayout(verticalLayout_6);
					(function(container){
						var output_7 = new cpr.controls.Output();
						output_7.value = "areaCoordinate";
						output_7.style.css({
							"color" : "#2263b3",
							"font-weight" : "700",
							"font-size" : "20px",
							"font-family" : "sans-serif , 'Malgun Gothic' , 'Noto Sans KR'"
						});
						container.addChild(output_7, {
							"autoSize": "none",
							"width": "1220px",
							"height": "38px"
						});
						var group_9 = new cpr.controls.Container();
						group_9.style.css({
							"background-color" : "#e9eff7",
							"background-image" : "none"
						});
						// Layout
						var verticalLayout_7 = new cpr.controls.layouts.VerticalLayout();
						verticalLayout_7.leftMargin = 30;
						verticalLayout_7.rightMargin = 30;
						verticalLayout_7.topMargin = 20;
						verticalLayout_7.bottomMargin = 20;
						group_9.setLayout(verticalLayout_7);
						(function(container){
							var output_8 = new cpr.controls.Output();
							output_8.value = "이미지 영역의 좌표를 설정하는 속성입니다. 기본값은 absolute며, image-size로 변경할 수 있습니다.\r\n- absolute(default) : 이미지 영역의 모든 좌표를 절대 취급합니다.\r\n- image-size : 이미지 영역의 모든 좌표를 표시하는 이미지 파일의 원래 크기에 대한 상대 좌표로 취급합니다.";
							output_8.style.setClasses(["opt-tmpl"]);
							output_8.style.css({
								"font-weight" : "700"
							});
							container.addChild(output_8, {
								"autoSize": "height",
								"width": "100px",
								"height": "40px"
							});
						})(group_9);
						container.addChild(group_9, {
							"autoSize": "height",
							"width": "1140px",
							"height": "80px"
						});
						var group_10 = new cpr.controls.Container();
						group_10.style.setClasses(["form-box", "vertical"]);
						// Layout
						var formLayout_3 = new cpr.controls.layouts.FormLayout();
						formLayout_3.topMargin = "5px";
						formLayout_3.rightMargin = "5px";
						formLayout_3.bottomMargin = "5px";
						formLayout_3.leftMargin = "5px";
						formLayout_3.horizontalSpacing = "10px";
						formLayout_3.verticalSpacing = "10px";
						formLayout_3.horizontalSeparatorWidth = 1;
						formLayout_3.verticalSeparatorWidth = 1;
						formLayout_3.setColumns(["1fr", "2fr"]);
						formLayout_3.setCustomColumnShade(0, "#edeff6");
						formLayout_3.setRows(["30px", "30px", "30px"]);
						formLayout_3.setRowAutoSizing(1, true);
						formLayout_3.setRowAutoSizing(2, true);
						group_10.setLayout(formLayout_3);
						(function(container){
							var output_9 = new cpr.controls.Output();
							output_9.value = "type";
							output_9.style.setClasses(["label"]);
							output_9.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_9, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_10 = new cpr.controls.Output();
							output_10.value = "AreaCoordinate";
							output_10.style.css({
								"background-color" : "transparent",
								"border-right-style" : "none",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_10, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var output_11 = new cpr.controls.Output();
							output_11.value = "get";
							output_11.style.setClasses(["label"]);
							output_11.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_11, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var output_12 = new cpr.controls.Output();
							output_12.value = "set";
							output_12.style.setClasses(["label"]);
							output_12.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_12, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var output_13 = new cpr.controls.Output();
							output_13.value = "이미지 맵 경로 정보의 좌표계를 얻습니다.";
							output_13.style.css({
								"background-color" : "transparent",
								"border-right-style" : "none",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_13, {
								"colIndex": 1,
								"rowIndex": 1
							});
							var output_14 = new cpr.controls.Output();
							output_14.value = "이미지 맵 경로 정보의 좌표계를 지정합니다.";
							output_14.style.css({
								"background-color" : "transparent",
								"border-right-style" : "none",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_14, {
								"colIndex": 1,
								"rowIndex": 2
							});
						})(group_10);
						container.addChild(group_10, {
							"autoSize": "height",
							"width": "1220px",
							"height": "125px"
						});
						var group_11 = new cpr.controls.Container();
						group_11.style.setClasses(["form-box", "vertical"]);
						// Layout
						var formLayout_4 = new cpr.controls.layouts.FormLayout();
						formLayout_4.topMargin = "5px";
						formLayout_4.rightMargin = "5px";
						formLayout_4.bottomMargin = "5px";
						formLayout_4.leftMargin = "5px";
						formLayout_4.horizontalSpacing = "10px";
						formLayout_4.verticalSpacing = "10px";
						formLayout_4.horizontalSeparatorWidth = 1;
						formLayout_4.verticalSeparatorWidth = 1;
						formLayout_4.setColumns(["1fr", "250px", "80px"]);
						formLayout_4.setRows(["30px", "30px"]);
						formLayout_4.setCustomRowShade(0, "#edeff6");
						formLayout_4.setRowAutoSizing(1, true);
						group_11.setLayout(formLayout_4);
						(function(container){
							var output_15 = new cpr.controls.Output();
							output_15.value = "시나리오";
							output_15.style.setClasses(["label"]);
							output_15.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"padding-left" : "15px",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "left"
							});
							container.addChild(output_15, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_16 = new cpr.controls.Output();
							output_16.value = "입력값";
							output_16.style.setClasses(["label"]);
							output_16.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_16, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var output_17 = new cpr.controls.Output();
							output_17.value = "기능확인";
							output_17.style.setClasses(["label"]);
							output_17.style.css({
								"border-right-style" : "none",
								"background-color" : "transparent",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "center"
							});
							container.addChild(output_17, {
								"colIndex": 2,
								"rowIndex": 0
							});
							var output_18 = new cpr.controls.Output();
							output_18.value = "1) 하단의 이미지 컨트롤에서 학동역 3번 출구에 마우스를 올려놓습니다.\r\n2) 지정한 영역이 보이는 것을 확인할 수 있습니다.";
							output_18.style.setClasses(["opt-tmpl"]);
							output_18.style.css({
								"background-color" : "transparent",
								"border-right-style" : "none",
								"border-left-style" : "none",
								"padding-left" : "15px",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "left"
							});
							container.addChild(output_18, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var button_1 = new cpr.controls.Button("btnInit");
							button_1.value = "실행";
							button_1.style.setClasses(["btn-primary"]);
							container.addChild(button_1, {
								"colIndex": 2,
								"rowIndex": 1,
								"verticalAlign": "center",
								"height": 30
							});
							var output_19 = new cpr.controls.Output();
							output_19.value = "areaCoordinate = \"image-size\"";
							output_19.style.setClasses(["opt-tmpl"]);
							output_19.style.css({
								"background-color" : "transparent",
								"border-right-style" : "none",
								"border-left-style" : "none",
								"padding-left" : "15px",
								"border-bottom-style" : "none",
								"border-top-style" : "none",
								"text-align" : "left"
							});
							container.addChild(output_19, {
								"colIndex": 1,
								"rowIndex": 1
							});
						})(group_11);
						container.addChild(group_11, {
							"autoSize": "height",
							"width": "1220px",
							"height": "80px"
						});
						var group_12 = new cpr.controls.Container();
						group_12.style.setClasses(["attach-box"]);
						group_12.style.css({
							"border-right-style" : "solid",
							"border-top-width" : "1px",
							"border-bottom-color" : "#babfc7",
							"border-right-width" : "1px",
							"border-left-color" : "#babfc7",
							"border-right-color" : "#babfc7",
							"border-left-width" : "1px",
							"border-top-style" : "solid",
							"background-color" : "#e9e9e9",
							"border-left-style" : "solid",
							"border-bottom-width" : "1px",
							"border-top-color" : "#babfc7",
							"border-bottom-style" : "solid",
							"background-image" : "none"
						});
						// Layout
						var flowLayout_2 = new cpr.controls.layouts.FlowLayout();
						flowLayout_2.scrollable = false;
						flowLayout_2.horizontalSpacing = 20;
						flowLayout_2.verticalSpacing = 20;
						flowLayout_2.horizontalAlign = "center";
						flowLayout_2.verticalAlign = "middle";
						flowLayout_2.leftMargin = 20;
						flowLayout_2.rightMargin = 20;
						flowLayout_2.topMargin = 20;
						flowLayout_2.bottomMargin = 20;
						group_12.setLayout(flowLayout_2);
						(function(container){
							var group_13 = new cpr.controls.Container();
							// Layout
							var formLayout_5 = new cpr.controls.layouts.FormLayout();
							formLayout_5.topMargin = "0px";
							formLayout_5.rightMargin = "0px";
							formLayout_5.bottomMargin = "0px";
							formLayout_5.leftMargin = "0px";
							formLayout_5.horizontalSpacing = "5px";
							formLayout_5.verticalSpacing = "5px";
							formLayout_5.setColumns(["1fr"]);
							formLayout_5.setRows(["1fr", "20px"]);
							group_13.setLayout(formLayout_5);
							(function(container){
								var output_20 = new cpr.controls.Output();
								output_20.value = "<기능 확인 컨트롤>";
								output_20.style.setClasses(["text-center"]);
								container.addChild(output_20, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var image_2 = new cpr.controls.Image("samplgeImg");
								image_2.src = "app/exam/controls/빌딩.PNG";
								image_2.areaCoordinate = "image-size";
								(function(image_2){
									image_2.addItem(new cpr.controls.ImageAreaItem("label1", "value1", "circle", "393,428,11"));
								})(image_2);
								container.addChild(image_2, {
									"colIndex": 0,
									"rowIndex": 0
								});
							})(group_13);
							container.addChild(group_13, {
								"autoSize": "both",
								"width": "500px",
								"height": "500px"
							});
						})(group_12);
						container.addChild(group_12, {
							"autoSize": "height",
							"width": "1220px",
							"height": "800px"
						});
					})(group_8);
					container.addChild(group_8, {
						"autoSize": "height",
						"width": "1220px",
						"height": "1500px"
					});
				})(group_7);
				container.addChild(group_7, {
					"autoSize": "height",
					"width": "1100px",
					"height": "2000px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "400px",
				"height": "3000px"
			});
		}
	});
	app.title = "이미지 관련 속성";
	cpr.core.Platform.INSTANCE.register(app);
})();
