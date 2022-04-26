/*
 * App URI: app/exam/design/guide/cmn/Badge
 * Source Location: app/exam/design/guide/cmn/Badge.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("app/exam/design/guide/cmn/Badge", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * Badge.js
			 * Created at 2020. 5. 8. 오후 4:31:41.
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
			  
			  
			 /************************************************
			 * 컨트롤 이벤트
			 ************************************************/;
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
				output_1.value = "Badges";
				output_1.style.setClasses(["h3"]);
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var userDefinedControl_1 = new udc.template.Breadcrumb("breadcrumb1");
				userDefinedControl_1.values = "DESIGN GUIDE,BADGES";
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
			
			var output_2 = new cpr.controls.Output();
			output_2.value = "Example with variations";
			output_2.style.setClasses(["h6"]);
			container.addChild(output_2, {
				"width": "100px",
				"height": "25px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.setClasses(["card", "card-bordered"]);
			// Layout
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.spacing = 5;
			verticalLayout_2.leftMargin = 20;
			verticalLayout_2.rightMargin = 20;
			verticalLayout_2.topMargin = 20;
			verticalLayout_2.bottomMargin = 20;
			group_2.setLayout(verticalLayout_2);
			(function(container){
				var output_3 = new cpr.controls.Output();
				output_3.value = "DEFAULT STYLE";
				output_3.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_3, {
					"width": "100px",
					"height": "25px"
				});
				var group_3 = new cpr.controls.Container();
				// Layout
				var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
				flowLayout_1.scrollable = false;
				flowLayout_1.horizontalSpacing = 20;
				flowLayout_1.verticalSpacing = 20;
				group_3.setLayout(flowLayout_1);
				(function(container){
					var output_4 = new cpr.controls.Output();
					output_4.value = "Primary";
					output_4.style.setClasses(["badge", "badge-primary"]);
					container.addChild(output_4, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_5 = new cpr.controls.Output();
					output_5.value = "Secondary";
					output_5.style.setClasses(["badge", "badge-secondary"]);
					container.addChild(output_5, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "Info";
					output_6.style.setClasses(["badge", "badge-info"]);
					container.addChild(output_6, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_7 = new cpr.controls.Output();
					output_7.value = "Success";
					output_7.style.setClasses(["badge", "badge-success"]);
					container.addChild(output_7, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "Warning";
					output_8.style.setClasses(["badge", "badge-warning"]);
					container.addChild(output_8, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = "Danger";
					output_9.style.setClasses(["badge", "badge-danger"]);
					container.addChild(output_9, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_10 = new cpr.controls.Output();
					output_10.value = "Gray";
					output_10.style.setClasses(["badge", "badge-gray"]);
					container.addChild(output_10, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_11 = new cpr.controls.Output();
					output_11.value = "Light";
					output_11.style.setClasses(["badge", "badge-light"]);
					container.addChild(output_11, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_3);
				container.addChild(group_3, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_12 = new cpr.controls.Output();
				output_12.value = "PILL STYLE";
				output_12.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_12, {
					"width": "100px",
					"height": "25px"
				});
				var group_4 = new cpr.controls.Container();
				// Layout
				var flowLayout_2 = new cpr.controls.layouts.FlowLayout();
				flowLayout_2.scrollable = false;
				flowLayout_2.horizontalSpacing = 20;
				flowLayout_2.verticalSpacing = 20;
				group_4.setLayout(flowLayout_2);
				(function(container){
					var output_13 = new cpr.controls.Output();
					output_13.value = "Primary";
					output_13.style.setClasses(["badge", "badge-pill", "badge-primary"]);
					container.addChild(output_13, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_14 = new cpr.controls.Output();
					output_14.value = "Secondary";
					output_14.style.setClasses(["badge", "badge-pill", "badge-secondary"]);
					container.addChild(output_14, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_15 = new cpr.controls.Output();
					output_15.value = "Info";
					output_15.style.setClasses(["badge", "badge-pill", "badge-info"]);
					container.addChild(output_15, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_16 = new cpr.controls.Output();
					output_16.value = "Success";
					output_16.style.setClasses(["badge", "badge-pill", "badge-success"]);
					container.addChild(output_16, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_17 = new cpr.controls.Output();
					output_17.value = "Warning";
					output_17.style.setClasses(["badge", "badge-pill", "badge-warning"]);
					container.addChild(output_17, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_18 = new cpr.controls.Output();
					output_18.value = "Danger";
					output_18.style.setClasses(["badge", "badge-pill", "badge-danger"]);
					container.addChild(output_18, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_19 = new cpr.controls.Output();
					output_19.value = "Gray";
					output_19.style.setClasses(["badge", "badge-pill", "badge-gray"]);
					container.addChild(output_19, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_20 = new cpr.controls.Output();
					output_20.value = "Light";
					output_20.style.setClasses(["badge", "badge-pill", "badge-light"]);
					container.addChild(output_20, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_4);
				container.addChild(group_4, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_21 = new cpr.controls.Output();
				output_21.value = "OUTLINE STYLE";
				output_21.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_21, {
					"width": "100px",
					"height": "25px"
				});
				var group_5 = new cpr.controls.Container();
				// Layout
				var flowLayout_3 = new cpr.controls.layouts.FlowLayout();
				flowLayout_3.scrollable = false;
				flowLayout_3.horizontalSpacing = 20;
				flowLayout_3.verticalSpacing = 20;
				group_5.setLayout(flowLayout_3);
				(function(container){
					var output_22 = new cpr.controls.Output();
					output_22.value = "Primary";
					output_22.style.setClasses(["badge", "badge-outline-primary"]);
					container.addChild(output_22, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_23 = new cpr.controls.Output();
					output_23.value = "Secondary";
					output_23.style.setClasses(["badge", "badge-outline-secondary"]);
					container.addChild(output_23, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_24 = new cpr.controls.Output();
					output_24.value = "Info";
					output_24.style.setClasses(["badge", "badge-outline-info"]);
					container.addChild(output_24, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_25 = new cpr.controls.Output();
					output_25.value = "Success";
					output_25.style.setClasses(["badge", "badge-outline-success"]);
					container.addChild(output_25, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_26 = new cpr.controls.Output();
					output_26.value = "Warning";
					output_26.style.setClasses(["badge", "badge-outline-warning"]);
					container.addChild(output_26, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_27 = new cpr.controls.Output();
					output_27.value = "Danger";
					output_27.style.setClasses(["badge", "badge-outline-danger"]);
					container.addChild(output_27, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_28 = new cpr.controls.Output();
					output_28.value = "Gray";
					output_28.style.setClasses(["badge", "badge-outline-gray"]);
					container.addChild(output_28, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_29 = new cpr.controls.Output();
					output_29.value = "Light";
					output_29.style.setClasses(["badge", "badge-outline-light"]);
					container.addChild(output_29, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_5);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_30 = new cpr.controls.Output();
				output_30.value = "OUTLINE PILL STYLE";
				output_30.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_30, {
					"width": "100px",
					"height": "25px"
				});
				var group_6 = new cpr.controls.Container();
				// Layout
				var flowLayout_4 = new cpr.controls.layouts.FlowLayout();
				flowLayout_4.scrollable = false;
				flowLayout_4.horizontalSpacing = 20;
				flowLayout_4.verticalSpacing = 20;
				group_6.setLayout(flowLayout_4);
				(function(container){
					var output_31 = new cpr.controls.Output();
					output_31.value = "Primary";
					output_31.style.setClasses(["badge", "badge-pill", "badge-outline-primary"]);
					container.addChild(output_31, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_32 = new cpr.controls.Output();
					output_32.value = "Secondary";
					output_32.style.setClasses(["badge", "badge-pill", "badge-outline-secondary"]);
					container.addChild(output_32, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_33 = new cpr.controls.Output();
					output_33.value = "Info";
					output_33.style.setClasses(["badge", "badge-pill", "badge-outline-info"]);
					container.addChild(output_33, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_34 = new cpr.controls.Output();
					output_34.value = "Success";
					output_34.style.setClasses(["badge", "badge-pill", "badge-outline-success"]);
					container.addChild(output_34, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_35 = new cpr.controls.Output();
					output_35.value = "Warning";
					output_35.style.setClasses(["badge", "badge-pill", "badge-outline-warning"]);
					container.addChild(output_35, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_36 = new cpr.controls.Output();
					output_36.value = "Danger";
					output_36.style.setClasses(["badge", "badge-pill", "badge-outline-danger"]);
					container.addChild(output_36, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_37 = new cpr.controls.Output();
					output_37.value = "Gray";
					output_37.style.setClasses(["badge", "badge-pill", "badge-outline-gray"]);
					container.addChild(output_37, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_38 = new cpr.controls.Output();
					output_38.value = "Light";
					output_38.style.setClasses(["badge", "badge-pill", "badge-outline-light"]);
					container.addChild(output_38, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_6);
				container.addChild(group_6, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
			})(group_2);
			container.addChild(group_2, {
				"autoSize": "height",
				"width": "400px",
				"height": "279px"
			});
			
			var group_7 = new cpr.controls.Container();
			group_7.style.setClasses(["card", "card-bordered"]);
			// Layout
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.topMargin = "5px";
			formLayout_2.rightMargin = "20px";
			formLayout_2.bottomMargin = "5px";
			formLayout_2.leftMargin = "20px";
			formLayout_2.horizontalSpacing = "10px";
			formLayout_2.verticalSpacing = "10px";
			formLayout_2.horizontalSeparatorWidth = 1;
			formLayout_2.setColumns(["150px", "1fr"]);
			formLayout_2.setRows(["25px", "30px", "30px", "30px"]);
			formLayout_2.setUseRowShade(0, true);
			group_7.setLayout(formLayout_2);
			(function(container){
				var output_39 = new cpr.controls.Output();
				output_39.value = "CLASS REFERENCE";
				output_39.style.setClasses(["overline-title"]);
				container.addChild(output_39, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_40 = new cpr.controls.Output();
				output_40.value = "DETAILS";
				output_40.style.setClasses(["overline-title"]);
				container.addChild(output_40, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var output_41 = new cpr.controls.Output();
				output_41.value = ".badge-{state}";
				output_41.style.setClasses(["code"]);
				container.addChild(output_41, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_42 = new cpr.controls.Output();
				output_42.value = "Use {state} as primary, secodary, success, info, warning, dnager, gray, light.";
				container.addChild(output_42, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var output_43 = new cpr.controls.Output();
				output_43.value = ".badge-outline-{state}";
				output_43.style.setClasses(["code"]);
				container.addChild(output_43, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var output_44 = new cpr.controls.Output();
				output_44.value = "Same as above {state}.";
				container.addChild(output_44, {
					"colIndex": 1,
					"rowIndex": 2
				});
				var output_45 = new cpr.controls.Output();
				output_45.value = ".badge-pill";
				output_45.style.setClasses(["code"]);
				container.addChild(output_45, {
					"colIndex": 0,
					"rowIndex": 3
				});
				var output_46 = new cpr.controls.Output();
				output_46.value = "Use with .badge class rounded badge style.";
				container.addChild(output_46, {
					"colIndex": 1,
					"rowIndex": 3
				});
			})(group_7);
			container.addChild(group_7, {
				"width": "400px",
				"height": "162px"
			});
			
			var output_47 = new cpr.controls.Output();
			output_47.value = "Dot Style";
			output_47.style.setClasses(["h6"]);
			container.addChild(output_47, {
				"width": "100px",
				"height": "25px"
			});
			
			var group_8 = new cpr.controls.Container();
			group_8.style.setClasses(["card", "card-bordered"]);
			// Layout
			var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_3.spacing = 5;
			verticalLayout_3.leftMargin = 20;
			verticalLayout_3.rightMargin = 20;
			verticalLayout_3.topMargin = 10;
			verticalLayout_3.bottomMargin = 10;
			group_8.setLayout(verticalLayout_3);
			(function(container){
				var group_9 = new cpr.controls.Container();
				// Layout
				var flowLayout_5 = new cpr.controls.layouts.FlowLayout();
				flowLayout_5.scrollable = false;
				flowLayout_5.horizontalSpacing = 20;
				flowLayout_5.verticalSpacing = 20;
				group_9.setLayout(flowLayout_5);
				(function(container){
					var output_48 = new cpr.controls.Output();
					output_48.value = "Primary";
					output_48.style.setClasses(["badge", "badge-dot", "badge-primary"]);
					container.addChild(output_48, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_49 = new cpr.controls.Output();
					output_49.value = "Secondary";
					output_49.style.setClasses(["badge", "badge-dot", "badge-secondary"]);
					container.addChild(output_49, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_50 = new cpr.controls.Output();
					output_50.value = "Info";
					output_50.style.setClasses(["badge", "badge-dot", "badge-info"]);
					container.addChild(output_50, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_51 = new cpr.controls.Output();
					output_51.value = "Success";
					output_51.style.setClasses(["badge", "badge-dot", "badge-success"]);
					container.addChild(output_51, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_52 = new cpr.controls.Output();
					output_52.value = "Warning";
					output_52.style.setClasses(["badge", "badge-dot", "badge-warning"]);
					container.addChild(output_52, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_53 = new cpr.controls.Output();
					output_53.value = "Danger";
					output_53.style.setClasses(["badge", "badge-dot", "badge-danger"]);
					container.addChild(output_53, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_54 = new cpr.controls.Output();
					output_54.value = "Gray";
					output_54.style.setClasses(["badge", "badge-dot", "badge-gray"]);
					container.addChild(output_54, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_55 = new cpr.controls.Output();
					output_55.value = "Light";
					output_55.style.setClasses(["badge", "badge-dot", "badge-light"]);
					container.addChild(output_55, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_9);
				container.addChild(group_9, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
			})(group_8);
			container.addChild(group_8, {
				"autoSize": "height",
				"width": "984px",
				"height": "64px"
			});
			
			var output_56 = new cpr.controls.Output();
			output_56.value = "Dim/Pale Style";
			output_56.style.setClasses(["h6"]);
			container.addChild(output_56, {
				"width": "100px",
				"height": "25px"
			});
			
			var group_10 = new cpr.controls.Container();
			group_10.style.setClasses(["card", "card-bordered"]);
			// Layout
			var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_4.spacing = 5;
			verticalLayout_4.leftMargin = 20;
			verticalLayout_4.rightMargin = 20;
			verticalLayout_4.topMargin = 20;
			verticalLayout_4.bottomMargin = 20;
			group_10.setLayout(verticalLayout_4);
			(function(container){
				var output_57 = new cpr.controls.Output();
				output_57.value = "DEFAULT STYLE";
				output_57.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_57, {
					"width": "100px",
					"height": "25px"
				});
				var group_11 = new cpr.controls.Container();
				// Layout
				var flowLayout_6 = new cpr.controls.layouts.FlowLayout();
				flowLayout_6.scrollable = false;
				flowLayout_6.horizontalSpacing = 20;
				flowLayout_6.verticalSpacing = 20;
				group_11.setLayout(flowLayout_6);
				(function(container){
					var output_58 = new cpr.controls.Output();
					output_58.value = "Primary";
					output_58.style.setClasses(["badge", "badge-dim", "badge-primary"]);
					container.addChild(output_58, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_59 = new cpr.controls.Output();
					output_59.value = "Secondary";
					output_59.style.setClasses(["badge", "badge-dim", "badge-secondary"]);
					container.addChild(output_59, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_60 = new cpr.controls.Output();
					output_60.value = "Info";
					output_60.style.setClasses(["badge", "badge-dim", "badge-info"]);
					container.addChild(output_60, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_61 = new cpr.controls.Output();
					output_61.value = "Success";
					output_61.style.setClasses(["badge", "badge-dim", "badge-success"]);
					container.addChild(output_61, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_62 = new cpr.controls.Output();
					output_62.value = "Warning";
					output_62.style.setClasses(["badge", "badge-dim", "badge-warning"]);
					container.addChild(output_62, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_63 = new cpr.controls.Output();
					output_63.value = "Danger";
					output_63.style.setClasses(["badge", "badge-dim", "badge-danger"]);
					container.addChild(output_63, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_64 = new cpr.controls.Output();
					output_64.value = "Gray";
					output_64.style.setClasses(["badge", "badge-dim", "badge-gray"]);
					container.addChild(output_64, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_65 = new cpr.controls.Output();
					output_65.value = "Light";
					output_65.style.setClasses(["badge", "badge-dim", "badge-light"]);
					container.addChild(output_65, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_11);
				container.addChild(group_11, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_66 = new cpr.controls.Output();
				output_66.value = "PILL STYLE";
				output_66.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_66, {
					"width": "100px",
					"height": "25px"
				});
				var group_12 = new cpr.controls.Container();
				// Layout
				var flowLayout_7 = new cpr.controls.layouts.FlowLayout();
				flowLayout_7.scrollable = false;
				flowLayout_7.horizontalSpacing = 20;
				flowLayout_7.verticalSpacing = 20;
				group_12.setLayout(flowLayout_7);
				(function(container){
					var output_67 = new cpr.controls.Output();
					output_67.value = "Primary";
					output_67.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-primary"]);
					container.addChild(output_67, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_68 = new cpr.controls.Output();
					output_68.value = "Secondary";
					output_68.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-secondary"]);
					container.addChild(output_68, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_69 = new cpr.controls.Output();
					output_69.value = "Info";
					output_69.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-info"]);
					container.addChild(output_69, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_70 = new cpr.controls.Output();
					output_70.value = "Success";
					output_70.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-success"]);
					container.addChild(output_70, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_71 = new cpr.controls.Output();
					output_71.value = "Warning";
					output_71.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-warning"]);
					container.addChild(output_71, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_72 = new cpr.controls.Output();
					output_72.value = "Danger";
					output_72.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-danger"]);
					container.addChild(output_72, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_73 = new cpr.controls.Output();
					output_73.value = "Gray";
					output_73.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-gray"]);
					container.addChild(output_73, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_74 = new cpr.controls.Output();
					output_74.value = "Light";
					output_74.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-light"]);
					container.addChild(output_74, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_12);
				container.addChild(group_12, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_75 = new cpr.controls.Output();
				output_75.value = "OUTLINE STYLE";
				output_75.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_75, {
					"width": "100px",
					"height": "25px"
				});
				var group_13 = new cpr.controls.Container();
				// Layout
				var flowLayout_8 = new cpr.controls.layouts.FlowLayout();
				flowLayout_8.scrollable = false;
				flowLayout_8.horizontalSpacing = 20;
				flowLayout_8.verticalSpacing = 20;
				group_13.setLayout(flowLayout_8);
				(function(container){
					var output_76 = new cpr.controls.Output();
					output_76.value = "Primary";
					output_76.style.setClasses(["badge", "badge-dim", "badge-outline-primary"]);
					container.addChild(output_76, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_77 = new cpr.controls.Output();
					output_77.value = "Secondary";
					output_77.style.setClasses(["badge", "badge-dim", "badge-outline-secondary"]);
					container.addChild(output_77, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_78 = new cpr.controls.Output();
					output_78.value = "Info";
					output_78.style.setClasses(["badge", "badge-dim", "badge-outline-info"]);
					container.addChild(output_78, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_79 = new cpr.controls.Output();
					output_79.value = "Success";
					output_79.style.setClasses(["badge", "badge-dim", "badge-outline-success"]);
					container.addChild(output_79, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_80 = new cpr.controls.Output();
					output_80.value = "Warning";
					output_80.style.setClasses(["badge", "badge-dim", "badge-outline-warning"]);
					container.addChild(output_80, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_81 = new cpr.controls.Output();
					output_81.value = "Danger";
					output_81.style.setClasses(["badge", "badge-dim", "badge-outline-danger"]);
					container.addChild(output_81, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_82 = new cpr.controls.Output();
					output_82.value = "Gray";
					output_82.style.setClasses(["badge", "badge-dim", "badge-outline-gray"]);
					container.addChild(output_82, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_83 = new cpr.controls.Output();
					output_83.value = "Light";
					output_83.style.setClasses(["badge", "badge-dim", "badge-outline-light"]);
					container.addChild(output_83, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_13);
				container.addChild(group_13, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
				var output_84 = new cpr.controls.Output();
				output_84.value = "OUTLINE PILL STYLE";
				output_84.style.setClasses(["card-subtitle", "fw-bold"]);
				container.addChild(output_84, {
					"width": "100px",
					"height": "25px"
				});
				var group_14 = new cpr.controls.Container();
				// Layout
				var flowLayout_9 = new cpr.controls.layouts.FlowLayout();
				flowLayout_9.scrollable = false;
				flowLayout_9.horizontalSpacing = 20;
				flowLayout_9.verticalSpacing = 20;
				group_14.setLayout(flowLayout_9);
				(function(container){
					var output_85 = new cpr.controls.Output();
					output_85.value = "Primary";
					output_85.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-primary"]);
					container.addChild(output_85, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_86 = new cpr.controls.Output();
					output_86.value = "Secondary";
					output_86.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-secondary"]);
					container.addChild(output_86, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_87 = new cpr.controls.Output();
					output_87.value = "Info";
					output_87.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-info"]);
					container.addChild(output_87, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_88 = new cpr.controls.Output();
					output_88.value = "Success";
					output_88.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-success"]);
					container.addChild(output_88, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_89 = new cpr.controls.Output();
					output_89.value = "Warning";
					output_89.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-warning"]);
					container.addChild(output_89, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_90 = new cpr.controls.Output();
					output_90.value = "Danger";
					output_90.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-danger"]);
					container.addChild(output_90, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_91 = new cpr.controls.Output();
					output_91.value = "Gray";
					output_91.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-gray"]);
					container.addChild(output_91, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
					var output_92 = new cpr.controls.Output();
					output_92.value = "Light";
					output_92.style.setClasses(["badge", "badge-pill", "badge-dim", "badge-outline-light"]);
					container.addChild(output_92, {
						"autoSize": "width",
						"width": "80px",
						"height": "25px"
					});
				})(group_14);
				container.addChild(group_14, {
					"autoSize": "height",
					"width": "400px",
					"height": "25px"
				});
			})(group_10);
			container.addChild(group_10, {
				"autoSize": "height",
				"width": "984px",
				"height": "279px"
			});
		}
	});
	app.title = "Badge";
	cpr.core.Platform.INSTANCE.register(app);
})();
