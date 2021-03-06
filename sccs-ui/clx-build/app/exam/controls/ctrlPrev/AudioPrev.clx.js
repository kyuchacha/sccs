/*
 * App URI: app/exam/controls/ctrlPrev/AudioPrev
 * Source Location: app/exam/controls/ctrlPrev/AudioPrev.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/controls/ctrlPrev/AudioPrev", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
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
			var group_1 = new cpr.controls.Container("grpSearch");
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 0;
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.com.appHeader("appheader1");
				userDefinedControl_1.initializeYn = "N";
				container.addChild(userDefinedControl_1, {
					"width": "1320px",
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
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["25px", "1fr"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output("opt7");
				output_1.value = "?????????(Audio)??? ??????????????? ???????????? ??????????????????.";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_3 = new cpr.controls.Container("grp1");
				group_3.style.setClasses(["cl-form-group"]);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.topMargin = "5px";
				formLayout_2.rightMargin = "5px";
				formLayout_2.bottomMargin = "5px";
				formLayout_2.leftMargin = "5px";
				formLayout_2.horizontalSpacing = "5px";
				formLayout_2.verticalSpacing = "5px";
				formLayout_2.horizontalSeparatorWidth = 1;
				formLayout_2.verticalSeparatorWidth = 1;
				formLayout_2.setColumns(["300px", "1fr"]);
				formLayout_2.setUseColumnShade(0, true);
				formLayout_2.setRows(["40px", "40px", "40px", "130px", "130px", "1fr"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var output_2 = new cpr.controls.Output();
					output_2.value = "[loop = true]\r\n1. ????????? ????????? ???????????? ??????.";
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var audio_1 = new cpr.controls.Audio();
					audio_1.src = "app/exam/controls/ctrlPrev/audio/audio_sample01.mp3";
					audio_1.displayControl = true;
					audio_1.loop = true;
					container.addChild(audio_1, {
						"colIndex": 1,
						"rowIndex": 1
					});
					var audio_2 = new cpr.controls.Audio();
					audio_2.src = "app/exam/controls/ctrlPrev/audio/audio_sample01.mp3";
					audio_2.displayControl = true;
					audio_2.muted = true;
					container.addChild(audio_2, {
						"colIndex": 1,
						"rowIndex": 2
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "[muted = true]\r\n1. ????????? ????????? ?????????.";
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "[displayControl = true]\r\n1. ????????? ??????????????? ?????????.";
					container.addChild(output_4, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var audio_3 = new cpr.controls.Audio();
					audio_3.src = "app/exam/controls/ctrlPrev/audio/audio_sample01.mp3";
					audio_3.displayControl = true;
					container.addChild(audio_3, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var output_5 = new cpr.controls.Output();
					output_5.value = "[preload = none]\r\n1. ???????????? ????????? ??? ???????????? ???????????? ?????? ????????????.\n";
					container.addChild(output_5, {
						"colIndex": 0,
						"rowIndex": 4
					});
					var group_4 = new cpr.controls.Container("grp2");
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.horizontalSpacing = "5px";
					formLayout_3.verticalSpacing = "5px";
					formLayout_3.horizontalSeparatorWidth = 1;
					formLayout_3.verticalSeparatorWidth = 1;
					formLayout_3.setColumns(["1fr"]);
					formLayout_3.setRows(["40px", "1fr"]);
					group_4.setLayout(formLayout_3);
					(function(container){
						var audio_4 = new cpr.controls.Audio();
						audio_4.src = "app/exam/controls/ctrlPrev/audio/audio_sample01.mp3";
						audio_4.displayControl = true;
						container.addChild(audio_4, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var output_6 = new cpr.controls.Output();
						output_6.value = "[auto] : ???????????? ??????????????? ?????????????????? ??????????????? ?????? ???????????? ??????\r\n[none] : ???????????? ???????????? ????????? ???????????? ???????????? ?????? ??????\r\n[metadata] : ?????????????????? ?????? ????????? ??????";
						output_6.style.css({
							"color" : "#757272"
						});
						container.addChild(output_6, {
							"colIndex": 0,
							"rowIndex": 1
						});
					})(group_4);
					container.addChild(group_4, {
						"colIndex": 1,
						"rowIndex": 4,
						"colSpan": 1,
						"rowSpan": 1
					});
					var group_5 = new cpr.controls.Container("grp3");
					// Layout
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.horizontalSpacing = "5px";
					formLayout_4.verticalSpacing = "5px";
					formLayout_4.horizontalSeparatorWidth = 1;
					formLayout_4.verticalSeparatorWidth = 1;
					formLayout_4.setColumns(["1fr"]);
					formLayout_4.setRows(["40px", "1fr"]);
					group_5.setLayout(formLayout_4);
					(function(container){
						var audio_5 = new cpr.controls.Audio();
						audio_5.src = "app/exam/controls/ctrlPrev/audio/audio_sample01.mp3";
						audio_5.displayControl = true;
						audio_5.autoplay = true;
						container.addChild(audio_5, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var output_7 = new cpr.controls.Output();
						output_7.value = "??? ????????? ??????????????? ????????? ?????? ???????????? ????????? ???????????? ?????? ????????? autoplay??? ?????? ????????? ???????????? ????????? ?????? ????????? ??? ????????????. \r\n?????????????????? ????????? ????????? ?????? ??? ??????????????? autoplay ????????? ??????????????? ????????????.";
						output_7.style.css({
							"color" : "#757272"
						});
						container.addChild(output_7, {
							"colIndex": 0,
							"rowIndex": 1
						});
					})(group_5);
					container.addChild(group_5, {
						"colIndex": 1,
						"rowIndex": 3
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "[autoplay = true]\r\n1. ???????????? ???????????? ????????????.\r\n";
					container.addChild(output_8, {
						"colIndex": 0,
						"rowIndex": 3
					});
					var group_6 = new cpr.controls.Container("grp4");
					// Layout
					var xYLayout_1 = new cpr.controls.layouts.XYLayout();
					group_6.setLayout(xYLayout_1);
					(function(container){
					})(group_6);
					container.addChild(group_6, {
						"colIndex": 0,
						"rowIndex": 5,
						"colSpan": 2,
						"rowSpan": 1
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 1,
					"colSpan": 1,
					"rowSpan": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "400px",
				"height": "644px"
			});
		}
	});
	app.title = "????????? ?????? ??????";
	cpr.core.Platform.INSTANCE.register(app);
})();
