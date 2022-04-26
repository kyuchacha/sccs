

/**
 * 통신 전 처리
 * @param {Event} e
 */
cpr.events.EventBus.INSTANCE.addFilter("before-submit", function(e){
	/** @type cpr.protocols.Submission */
//	var submission = e.control;
//	if (submission.mediaType == "application/json"){
//		submission.setRequestEncoder(_requestEncoder);
//		submission.setResponseDecoder(_responseDecoder);
//	}
//	uf_send(e);
});

//통신 후 처리
cpr.events.EventBus.INSTANCE.addFilter("submit-done", function(e){
	/** @type cpr.protocols.Submission */
	var submission = e.control;
});


/**
 * 
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _requestEncoder(submission, reqData) {
	var _app = submission.getAppInstance();
	var reqDataObj = reqData["data"];
	var paramObj = reqData["param"];
	
	var voJsonType = {};
	for (var key in reqDataObj) {
		voJsonType[key] = reqDataObj[key];
	}
	
	return {"content" : voJsonType};
}


/**
 * @private
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _responseDecoder(submission, resData) {
	var _app = submission.getAppInstance();
	var resDataObj = JSON.parse(resData);
	
	var voProtocolJson = {};
	
	for (var key in resDataObj) {
		for (var subKey in resDataObj[key]) {
			voProtocolJson[subKey] = resDataObj[key][subKey];
		}
	}
	
	return {contentType : "application/json", content : voProtocolJson};
}


/**
 * 
 * @private
 * @param {String} psType
 * @return {Object}
 */
function _getJsonType(psType) {
	var voJsonType = {};
	
	switch(psType){
		case "type2" : {
			voJsonType = {
   				"data" : { 
                	"payload" : {}
              	}   
			};
			
			break;
		}
		
		default : {
			voJsonType = {
				 "header"  : {}
    			,"payload" : {}
			};
			
			break;
		}
	}
	
	return voJsonType;
}

function uf_send(e){
	  
	var thisCtl = e.control ; 
	var vsParamListObj = new cpr.utils.ObjectMap();
/**
 * @type cpr.protocols.Submission
 */
	var vSub =  e.targetControl ;

	if (vSub == null || vSub.type == null) {
		return;
	}
	
	//apply url petten ( true , false ) 
	//default value  true 
	var vsUAttParm = vSub.userAttr("uri_parameter_gen") ;

	if( "true" != vsUAttParm ) return ;
	
	var vsParamList    = vSub.getParameterNames(); // send parameter ( remamber basic config )
	var vnSendParCnt   = vSub.getRequestDataCount(); 
	var vsSendParList  = vSub.getRequestObject(); // send data ( dataSet or dataMap )
	
	vsParamList.forEach( function ( each1 ) {
		vsParamListObj.put(each1, vSub.getParameters(each1));
	});
	 
	 
	var isDataMap = true ;
	var isDataSet = true ;
	var vsUAttParmMap = vSub.userAttr("uri_parameter_gen_dataMap") ;
	var vsUAttParmSet = vSub.userAttr("uri_parameter_gen_dataSet") ;
	if( vsUAttParmMap == "false" ) isDataMap = false ; 
	if( vsUAttParmSet == "false" ) isDataSet = false ; 
	 
	 
	for( var i = 0 ; i < vnSendParCnt ; i++){
		var vds1  = vSub.getRequestData(i); 
	    
		  //dataMap 이 아니면 이를 적용하지 않는다.  
		  if( ! ( vds1 instanceof cpr.data.DataMap )   ){
		  	  if( ! isDataMap )
		  	      continue;
		  }
		  
		  //dataSet 이 아니면 이를 적용하지 않는다. 
		  //TODO : dataSet의 기능이 필요할 경우 이를 활용한다.   
		  if( ! ( vds1 instanceof cpr.data.DataSet )   ){
		  	  if( ! isDataSet )
		  	      continue;
		  }
		  
		  var vdsData = vds1.data ;
		  
		  var vds1ColNm = vdsData.getColumnNames();
		  
		  //column을 param으로 이동 시킨다. 
		  vds1ColNm.forEach( function(eachPaNm){
		  	   var vsParValue = vdsData.getString(eachPaNm);
		  	   vSub.setParameters(eachPaNm, vsParValue); 
		  }); 
	}
 
    vSub.addEventListenerOnce("submit-done", function(){
		    /**
		      * 파라미터를 삭제하고 복원한다. 
		      */
		    vSub.removeAllParameters();
		    vsParamListObj.forEach(function(eachMap){  
		       vSub.setParameters(eachMap, vsParamListObj.get(eachMap));  
		    }); 
    });
}