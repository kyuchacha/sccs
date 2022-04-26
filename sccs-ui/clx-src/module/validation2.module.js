/************************************************
 * validation2.module.js
 * Created at 2021. 12. 2 오전 11:09:12.
 *
 * @author kjh
 ************************************************/

var _gAppKit
/**
 * 공통 Validator2 Class
 */
var Validator2 = function(appKit) {
	/** @type AppKit */
	this._appKit = appKit;
	_gAppKit = appKit
};


/**
 * 컨트롤에 대해 유효성 검사를 합니다.
 */
Validator2.prototype.validate = function(ctrlInterface){
	var msg = ""
	var that = this;
	var valid = true;
	var checkInfo;
	var rowIdx = [];
	
	ctrlInterface.removeInvalidClass()
	ctrlInterface.setToolTip("");
	
	Object.keys(_ValidationTask).forEach(function(each){
		
		checkInfo = _ValidationTask[each].check(ctrlInterface);
		var isValid = checkInfo.valid;
		
		if(!checkInfo.valid){
			valid = false;
		}
		if(!isValid){
			var res = _ValidationTask[each].getMsg();
	
			if(checkInfo.rowIndex){
				rowIdx.push(checkInfo.rowIndex.toString().replace(/,$/, '').split(","));
			}
			
			msg += res + "\n"
		} 
		_ValidationTask[each].errMsgParam = [];
	});
	rowIdx = _.uniq(rowIdx)

	if(!valid){
		
		ctrlInterface.addInvalidClass(rowIdx.toString());
		ctrlInterface.setToolTip(msg);
		
		
		if(ctrlInterface.grid){
			ctrlInterface.grid.dataSet.addEventListenerOnce("insert", function(e){
				ctrlInterface.removeInvalidClass();
				ctrlInterface.setToolTip("");
			})
			ctrlInterface.grid.dataSet.addEventListenerOnce("delete", function(e){
				ctrlInterface.removeInvalidClass()
				ctrlInterface.setToolTip("");
			})
			
			ctrlInterface.grid.dataSet.addEventListenerOnce("load", function(e){
				ctrlInterface.removeInvalidClass()
				ctrlInterface.setToolTip("");
			})
			ctrlInterface.grid.dataSet.addEventListenerOnce("clear", function(e){
				ctrlInterface.removeInvalidClass()
				ctrlInterface.setToolTip("");
			})
		}
		
	}
	
	return msg;
}

var _ValidationTask = {

	required : {
		errMsgParam : [],
		check : function(ctrl){
			if(ctrl.getAttr("required") !== "Y"){
				return {
					valid : true
				}
			}

			var valid = true;
			var rowIndex = ""
			if(!(ctrl.ctrl instanceof cpr.controls.gridpart.GridColumn)){
				if(_.isEmpty(ctrl.getValue())){
					this.errMsgParam.push(ctrl.getFieldLabel());
					valid = false;
				}
			}
			else{
				/** @type {cpr.data.DataSet} **/
				var ds = ctrl.grid.dataSet;
				
				for(var i = 0; i < ds.getRowCount(); i++){
					var row = ds.getRow(i);
					if(_.isEmpty(ctrl.getValue(i))){
						valid = false;
						rowIndex += i + ",";
					}
				}

				if(!valid){
					this.errMsgParam.push(ctrl.getFieldLabel());
				}
			}
			
			return {
				valid : valid,
				rowIndex : rowIndex
			}
		
		},
		getMsg : function(vsFieldLabel){
			return _gAppKit.Msg.getMsg("WRN-M001", this.errMsgParam);
		}
	},
	xorRequired : {
		check : function(/* cpr.controls.UIControl */ ctrl){
			if(!ctrl.getAttr("xorRequired")){
				return {
					valid : true
				}
			}

			var vaXorNull = ValueUtil.split(ctrl.userAttr("xorRequired").replace(/\[|\]/g,""), ",");
		},
		getMsg : function(){
			
		}
	},
	columnType : {
		errMsgParam : [],
		check : function(ctrl){
			if(_.isEmpty(ctrl.getAttr("columnType"))){
				return {
					valid : true
				}
			}
			var inValid = false;
			var validInfo = [];
			var rowIndex = "";
			var type = ctrl.getAttr("columnType");
			var errorType = "";
			var checkValueList = [];
			if(!(ctrl.ctrl instanceof cpr.controls.gridpart.GridColumn)){
				checkValueList.push(ctrl.getValue());
			}
			else{
				/** @type {cpr.data.DataSet} **/
				var ds = ctrl.grid.dataSet;
				
				for(var i = 0; i < ds.getRowCount(); i++){
					var row = ds.getRow(i);
					checkValueList.push(ctrl.getValue(i));
				}
			}

			for(var i = 0; i < checkValueList.length; i++){
				var validEach = true;
				
				if(type === "email" && !_.isEmpty(checkValueList[i])){

					validEach = TypeUtil.isEmail(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "이메일";
						rowIndex += i + ",";
					}
				}else if(type === "ssn" && !_.isEmpty(checkValueList[i])){
					validEach = TypeUtil.isSSN(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "주민등록번호";
						rowIndex += i + ",";
					}
				}else if(type === "bizno" && !_.isEmpty(checkValueList[i])){
					validEach = TypeUtil.isBizCSN(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "사업자번호";
						rowIndex += i + ",";
					}
				}else if(type === "phone" && !_.isEmpty(checkValueList[i])){
					validEach = TypeUtil.isTelMobile(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "핸드폰번호";
						rowIndex += i + ",";
					}
				}else if(type === "tel" && !_.isEmpty(checkValueList[i])){
					validEach = TypeUtil.isTelNo(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "유선전화번호";
						rowIndex += i + ",";
					}
				}else if(type === "url" && !_.isEmpty(checkValueList[i])){
					validEach = TypeUtil.isURL(checkValueList[i]);
					validInfo.push(validEach);
					if(!validEach){
						errorType = "url";
						rowIndex += i + ",";
					}
				}
			}
			
			inValid = validInfo.some(function(each){
				return !each;
			});
			
			if(inValid){
				this.errMsgParam.push(ctrl.getFieldLabel());
				this.errMsgParam.push(errorType);
			}
			
			return {
				valid : !inValid,
				rowIndex : rowIndex
			}
		},
		getMsg : function(args){
			if(!(args instanceof Array)){
		      args = [args];
		    }

			return _gAppKit.Msg.getMsg("WRN-M012", this.errMsgParam);
		}
	},
	minLength : {
		errMsgParam : [],
		check : function(ctrl){
			if(_.isEmpty(ctrl.getAttr("minlength"))){
				return {
					valid : true
				}
			}
			var minLength = ctrl.getAttr("minlength");
			var minlengthNum = Number(minLength);
			var length = ValueUtil.getLength(ctrl.getValue(), ctrl.getLengthUnit());
			
			var isValid = !(length < minLength);
			if(!isValid){
				this.errMsgParam.push(ctrl.getFieldLabel());
				this.errMsgParam.push(minLength);
			}
			
			return {
				valid : isValid
			};
		},
		getMsg : function(args){
			if(!(args instanceof Array)){
		      args = [args];
		    }
		    
			return _gAppKit.Msg.getMsg("WRN-M005", this.errMsgParam);
		}
	},
	fixLength : {
		errMsgParam : [],
		check : function(ctrl){
			if(_.isEmpty(ctrl.getAttr("fixlength"))){
				return {
					valid : true
				}
			}
			var fixlength = Number(ctrl.getAttr("fixlength"));
			var length = ValueUtil.getLength(ctrl.getValue(), ctrl.getLengthUnit());
			
			var isValid = length === fixlength;
			if(!isValid){
				this.errMsgParam.push(ctrl.fieldLabel);
				this.errMsgParam.push(fixlength);
			}
			
			return {
				valid : isValid
			}
		},
		getMsg : function(args){
			if(!(args instanceof Array)){
		      args = [args];
		    }
		    
			return _gAppKit.Msg.getMsg("WRN-M006", this.errMsgParam);
		}
	}
}

globals.Validator2 = Validator2;