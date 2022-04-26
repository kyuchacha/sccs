/************************************************
 * event.module.js
 * Created at 2021. 10. 15 오후 4:56:54.
 *
 * @author kjh
 ************************************************/

/**
 * 앱 init시 처리로직 담당 변수
 * - 반응형 작업
 */
var AppInitTask = {
	vaCtl : null, //대상컨트롤
	
	init : function(){
		var that = this;
		
		cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
			if(e.control instanceof cpr.core.AppInstance){
				
				/** @type cpr.core.AppInstance */
				var appInstance = e.control;
				
				that.vaCtl = appInstance.getContainer().getAllRecursiveChildren(true);

				//that.FloatFooter.run(e);
				that.Responsive.run(e);
				that.AdabtiveTab.run(e);
				
				var vaGrids = appInstance.getContainer().getAllRecursiveChildren(false).filter(function(each){
						return each instanceof cpr.controls.Grid;
					}).forEach(function(each){
						if (each.userAttr("transform-on-mobile") == "true" && each.userAttr("hide-column-indicies") != ""){
							makeResponsiveGrid(each);
						}
				});
			}
		});
	},
	
	FloatFooter : {
		constants : {},
		run : function(e){
			if(!(e.control instanceof cpr.core.AppInstance)) return;
			
			var targetApp = e.control;
			var footer = targetApp.lookup("grpFooter");
			if(footer){
				targetApp.floatControl(footer, {
					bottom : 0,
					left : 0,
					right : 0,
					height : "40px"
					
				});
			}
		}
	},
	
	Responsive : {
		constants : {
			ATTR_MOBILE_H_MARGIN : "mobile-horizontal-margin",
			ATTR_MOBILE_V_MARGIN : "mobile-vertical-margin",
			ATTR_TABLET_H_MARGIN : "tablet-horizontal-margin",
			ATTR_TABLET_V_MARGIN : "tablet-vertical-margin",
			
			ATTR_MOBILE_COLUMN_COUNT : "mobile-column-count",
			ATTR_TABLET_COLUMN_COUNT : "tablet-column-count",
			//폼레이아웃 자식내 모바일일경우 숨김 지정
			ATTR_HIDE_ON_MOBILE : "hide-on-mobile",
			ATTR_NEEDS_AUTO_HEIGHT : "needs-auto-height",
			ATTR_COLLAPSE_DIRECTION : "collapse-direction",
			
			ATTR_MOBILE_MIN_HEIGHT : "mobile-min-height",
			ATTR_TABLET_MIN_HEIGHT : "tablet-min-height",
			
			ATTR_MOBILE_INDEX : "mobile-index",
			ATTR_TABLET_INDEX : "tablet-index",
			//모바일일 경우 그리드 cell 숨기기.
			ATTR_HIDE_CELL_INDICIES : "hide-cell-indicies"
		},
		
		run : function(e){
			if(!(e.control instanceof cpr.core.AppInstance)) return;
			
			/** @type cpr.core.AppInstance */
			var appInstance = e.control;
			var that = this;
			var mainAppId = cpr.core.Platform.INSTANCE.getAllLoadedApps().find(function(each){
				return each.id === "app/com/main/main"
			});

			if (!mainAppId) return;
			
			var mainApp = mainAppId.getInstances()[0];
			
			var cmbScreen = mainApp.lookup("cmbScreen");
			var vaCtl = AppInitTask.vaCtl
			vaCtl.some(function(each){
				if (each instanceof cpr.controls.Container) {
					if (each.getLayout() instanceof cpr.controls.layouts.FormLayout && each.userAttr("mobile-column-count") != "") {
						each.userAttr("responsive-configured", "true");
						var rForm = makeResponsive(each)
						
						each["_RForm"] = rForm;
						rForm.setColumnSettings("mobile", parseInt(each.userAttr(that.constants.ATTR_MOBILE_COLUMN_COUNT) || "0"));
						rForm.setColumnSettings("tablet", parseInt(each.userAttr(that.constants.ATTR_TABLET_COLUMN_COUNT) || "0"));
						rForm.start();
						
						if(cmbScreen && cmbScreen.value === "mobile"){
							cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
								rForm._transform(parseInt(each.userAttr(that.constants.ATTR_MOBILE_COLUMN_COUNT) || "0"));
							});
							
						}
					}
					
					else if(each.getLayout() instanceof cpr.controls.layouts.VerticalLayout && (each.userAttr("mobile-fit") || each.userAttr("tablet-fit"))){
						var rVertical = makeVResponsive(each);
						rVertical.start();
					}
				}
				 if(each instanceof cpr.controls.Grid && each.userAttr(that.constants.ATTR_HIDE_CELL_INDICIES) != ""){
					makeResponsiveGrid(each)
				}	
			});
		}
	},
	
	AdabtiveTab : {
		constants : {},
		run : function(e){
			/** @type cpr.core.AppInstance */
			var appInstance = e.control;
			
			AppInitTask.vaCtl.filter(function(/* cpr.controls.UIControl */ each){
				return each instanceof cpr.controls.TabFolder && each.userAttr("transform-on-mobile") == "true";
			}).forEach(function(/* cpr.controls.UIControl */ each){
				var aTab = makeAdaptiveTab(each)
				aTab.start();
			});
		}
	}
}

/**
 * 그리드 기능별 ui처리 담당변수
 */
var GridInitTask = {
	
	init : function(){
		var that = this;
		cpr.events.EventBus.INSTANCE.addFilter("header-check", function(e){
			//that.DeleteAllRow.run(e);
		});
		cpr.events.EventBus.INSTANCE.addFilter("header-uncheck", function(e){
			//that.RestoreAllRow.run(e);
		});
		cpr.events.EventBus.INSTANCE.addFilter("row-check", function(e){
			//that.DeleteRow.run(e);
		});
		cpr.events.EventBus.INSTANCE.addFilter("row-uncheck", function(e){
			//that.RestoreRow.run(e);
		});
		// 모든 selection-change 이벤트시 그리드에 대한  필터 추가(for. 그리드의 선택된 로우가 없을 경우 이벤트 전파 차단)
		cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e){
			that.ValidateSelection.run(e);
		});
		// 모든 before-selection-change 이벤트에시 그리드에 대한  필터만 추가.(for. 그리드의 선택된 로우가 없을 경우 이벤트 전파 차단)
		cpr.events.EventBus.INSTANCE.addFilter("before-selection-change", function(e){
			that.ValidateBeforeSelection.run(e);
		});
	},
//	DeleteAllRow : {
//		
//		run : function(e){
//			/** @type {cpr.controls.Grid} **/
//			var control = e.control;
//			if(!control instanceof cpr.controls.Grid) return;
//			
//			
//			for(var i = 0; i < control.rowCount; i++){
//				var each = control.getRow(i);
//				each.setAttr("_befRowState", each.getState())
//				control.deleteRow(each.getIndex());
//		
//				if(each.getState() === cpr.data.tabledata.RowState.INSERTDELETED){
//					control.revertRowData(each.getIndex());
//					i--;
//				}
//			}
//		}
//	},
//	
//	RestoreAllRow : {
//		run : function(e){
//			/** @type {cpr.controls.Grid} **/
//			var control = e.control;
//			if(!control instanceof cpr.controls.Grid) return;
//			
//			control.findAllRow("1==1").forEach(function(each){
//				if(each.getState() === cpr.data.tabledata.RowState.DELETED){
//					each.setState(each.getAttr("_befRowState"));
//				}
//				
//			});
//		}
//	},
//	DeleteRow : {
//		run : function(e){
//			/** @type {cpr.controls.Grid} **/
//			var control = e.control;
//			if(!control instanceof cpr.controls.Grid) return;
//			
//			e.row.setAttr("_befRowState", e.row.getState())
//			control.deleteRow(e.row.getIndex());
//			
//			if(e.row.getState() === cpr.data.tabledata.RowState.INSERTDELETED){
//				control.revertRowData(e.row.getIndex());
//			}
//		}
//	},
//	RestoreRow : {
//		run : function(e){
//			/** @type {cpr.controls.Grid} **/
//			var control = e.control;
//			
//			if(!control instanceof cpr.controls.Grid || e.row.getState() !== cpr.data.tabledata.RowState.DELETED) return;
//		
//			e.row.setState(e.row.getAttr("_befRowState"));
//		}
//	},
	ValidateSelection : {
		run : function(e){
			 // 이벤트를 발생 시킨 컨트롤
		    var control = e.control;
		    /** @type cpr.core.AppInstance */
		    var _app = control.getAppInstance();
		    
		    // 이벤트 발송자가 그리드 이고.
		    if (control instanceof cpr.controls.Grid) {
		    	/** @type cpr.controls.Grid */
		    	var grid = control;
		    	if(grid.selectionUnit == "cell" && grid.getSelectedIndices()[0] == null){
		    		 e.stopPropagation();
		    	}else{
		    		var rowIndex = grid.selectionUnit != "cell" ? grid.getSelectedRowIndex() : grid.getSelectedIndices()[0]["rowIndex"];
			        // 그리드 선택 ROW가 -1이라면...
			        if (rowIndex < 0) {
			            // 이벤트 전파를 차단시킵니다.
			            e.stopPropagation();
			        }
		    	}
		    }
		}
	},
	ValidateBeforeSelection : {
		run : function(e){
			// 이벤트를 발생 시킨 컨트롤
		    var control = e.control;
		    /** @type cpr.core.AppInstance */
		    var _app = control.getAppInstance();
		    
		    // 이벤트 발송자가 그리드 이고.
		    if (control instanceof cpr.controls.Grid) {
		    	// 테스트 화면의 경우 이벤트 적용 안함
		    	if(e.newSelection[0] == null || e.newSelection[0] == undefined){
		    		// 이벤트 전파를 차단시킵니다.
		            e.stopPropagation();
				}
		    }
		}
	}
//	,
//	ClearValidationClass : {
//		run : function(e){
//			var formCtrlId = e.control.userAttr("bindDataFormId");
//			
//			if(formCtrlId){
//				var formCtrl = e.control.getAppInstance().lookup(formCtrlId);
//				
//			}
//		}
//	}
}

/**
 * 인풋박스 공통 이벤트처리 담당 변수
 */
var InputBoxInitTask = {
	init : function(){
		var that = this;
		cpr.events.EventBus.INSTANCE.addFilter("before-value-change", function(e){
			that.CaseTransform.run(e);
		});
	},
	
	CaseTransform : {
		run : function(e){
			// 이벤트를 발생 시킨 컨트롤
		    var control = e.control;
		    /** @type cpr.core.AppInstance */
		    
		    // 이벤트 발송자가 인풋박스이면.
		    if (control.type === "inputbox") {
		    	var inputLetter = control.userAttr("inputLetter");
				if (inputLetter == "uppercase") {
					if (/[a-z]/g.test(e.newValue)) {
						var newValue = e.newValue.toUpperCase();
						control.value = newValue;
						e.preventDefault();
						e.stopPropagation();
					}
				} else if (inputLetter == "lowercase") {
					if (/[A-Z]/g.test(e.newValue)) {
						var newValue = e.newValue.toLowerCase();
						control.value = newValue;
						e.preventDefault();
						e.stopPropagation();
					}
				}
		    }
		}
	}
}

var ExpressionRegister = {
	init : function(){
		//round 함수
		cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getRound", function(value, position) {
			if(isNaN(value)) return 0;
			else if(value == Infinity || value == -Infinity) return 0;
			if(position == undefined || position == null) return Math.round(value);
			else return Math.round(value * (10 * position))/(10 * position);
		});
		//floor 함수
		cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getFloor", function(value, position) {
			if(isNaN(value)) return 0;
			else if(value == Infinity || value == -Infinity) return 0;
			if(position == undefined || position == null) return Math.floor(value);
			else return Math.floor(value * (10 * position))/(10 * position);
		});
		//숫자 천단위 콤마 포맷
		cpr.expression.ExpressionEngine.INSTANCE.registerFunction("formatToNumber", function(value) {
			if(isNaN(value)) return value;
			return new String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		});
	}
}


AppInitTask.init();
GridInitTask.init();
InputBoxInitTask.init();
ExpressionRegister.init();
