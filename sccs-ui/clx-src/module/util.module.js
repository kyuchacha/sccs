
//exports.id = "util.module.js";

/**
 * @class AppUtil AppInstance에 대한 유틸
 */
AppUtil = {
    /**
     * 해당 앱의 속성(Property)값을 할당한다.
     * @param {cpr.core.AppInstance} app  앱인스턴스 객체
	 * @param {String | Object} propertyName App 속성
	 * @param {String | Object} value App 속성값
	 * @param {boolean} pbEvent value-change 이벤트 발생여부  (default : true)
	 * @return void
     */
    setAppProperty : function (app, propertyName, value, pbEvent) {
    	pbEvent = pbEvent == null ? true : pbEvent;
    	
        /** @type cpr.core.AppInstance */
        var _app = app;
        var hostApp = _app.getHostAppInstance();
        var property = _app.getAppProperty(propertyName);
        if(hostApp && hostApp.lookup(property) && hostApp.lookup(property) instanceof cpr.controls.UIControl){
        	if(pbEvent){
        		hostApp.lookup(property).value = value;
        	}else{
        		hostApp.lookup(property).putValue(value);
        	}
        }else{
        	_app.setAppProperty(propertyName, value);
        }
    },
    
    /**
     * UDC 컨트롤에 대해 value 앱 속성에 바인딩된 컨트롤 객체를 반환한다.
     * @param {cpr.controls.UIControl} poCtrl
     */
    getUDCBindValueControl : function(poCtrl){
    	var vcBindCtrl = poCtrl;
    	var embApp = poCtrl.getEmbeddedAppInstance();
		embApp.getContainer().getChildren().some(function(embCtrl){
			if(embCtrl.type == "container"){
				embCtrl.getChildren().some(function(subembCtrl){
					if(subembCtrl.getBindInfo("value") && subembCtrl.getBindInfo("value").property == "value"){
						vcBindCtrl = subembCtrl;
						return true;
					}
				});
			}else{
				if(embCtrl.getBindInfo("value") && embCtrl.getBindInfo("value").property == "value"){
					vcBindCtrl = embCtrl;
					return true;
				}
			}
		});
		
		return vcBindCtrl;
    }
 };

/**
 * @class ValueUtil Value 체크 및 형 변환
 */
ValueUtil = {
    /**
     * 해당 값이 Null인지 여부를 체크하여 반환한다.
	 * @param {String | Object} puValue		값
	 * @return {Boolean} Null 여부
     */
    isNull : function (puValue) {
        return (this.fixNull(puValue) == "");
    },

    /**
     * 해당 값이 숫자(Number) 타입인지 여부를 반환한다.
	 * @param {Number | String} puValue		값
	 * @example ValueUtil.isNumber("1234.56") == true
	 * @return {Boolean} Number인지 여부
     */
    isNumber : function (puValue) {
        var vnNum = Number(puValue);
        return isNaN(vnNum) == false;
    },

    /**
     * 해당 값에 대한 문자열을 반환한다. 
     *       만약 해당값이 null이거나 정의되지 않은 경우, 공백("") 문자열을 반환한다.
	 * @param {String | Object} puValue		값
	 * @return {String} 문자열 String
     */
    fixNull : function (puValue) {
        var vsType = typeof(puValue);
        if (vsType == "string" || (vsType == "object" && puValue instanceof String)) {
			puValue = this.trim(puValue);
        }
		
        return (puValue == null || puValue == "null" || puValue == "undefined") ? "" : String(puValue);
    },

     /**
     * 해당 값을 불리언(Boolean) 타입으로 변환한다.
	 * @param {Boolean | Object} puValue		값
	 * @return {Boolean} 불리언 유형으로 반환
     */
    fixBoolean : function (puValue) {
        if (typeof(puValue) == "boolean" || puValue instanceof Boolean) {
            return puValue;
        }
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue != 0;
        }
        return (this.fixNull(puValue).toUpperCase() == "TRUE");
    },

    /**
     * 해당 값을 숫자(Number) 타입으로 변환한다.
	 * @param {Object} puValue		값
	 * @return {Number} 숫자 타입으로 반환
     */
    fixNumber : function (puValue) {
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue;
        }
        var vnNum = Number(this.fixNull(puValue));
        return isNaN(vnNum) ? 0 : vnNum;
    },
    
    /**
     * 해당 값을 숫자(Float) 타입으로 변환한다.
	 * @param {Object} puValue		값
	 * @return {Float} 소수점이 있는 숫자 타입으로 반환
     */
    fixFloat : function (puValue) {
        if (typeof(puValue) == "number" || puValue instanceof Number) {
            return puValue;
        }
        var vnFloat = parseFloat(this.fixNull(puValue));
        return isNaN(vnFloat) ? 0 : vnFloat;
    },
    
    /**
     * 해당 값의 앞/뒤 공백을 제거한 문자열을 반환한다.
	 * @param {String} psValue		값
	 * @return {String} 공백 제거된 문자열
     */
    trim : function (psValue) {
        return psValue == null ? psValue : psValue.replace(/(^\s*)|(\s*$)/g, "");
    },
    
    /**
     * 문자열을 split한 배열을 반환한다.
	 * @param {String} psValue		split 대상 문자열
	 * @param {String} psDelemeter  구분문자 (ex: 콤마(,))
	 * @return {Array} 문자열 배열
     */
    split : function (psValue, psDelemeter) {
    	psValue = this.fixNull(psValue);
        var vaValues = new Array();
        var vaTemp = psValue.split(psDelemeter);
        var _this = this;
        vaTemp.forEach(function(/* eachType */ item){
        	vaValues.push(_this.trim(item));
        });
        
        return vaValues;
    },
    
    /**
     * 문자열 데이터의 길이(length)를 반환한다.
	 * @param {String} value		값
	 * @param {"char" | "utf8" | "ascii"} unit? 단위<br/>
     * [char] : 문자의 길이.<br/>
 	 * [utf8] : utf8 기준의 문자 byte size.<br/>
 	 * [ascii] : ascii 기준의 문자 byte size.
	 * @return {Number} 문자열 길이
     */
    getLength : function(value, unit) {
    	if(!unit) unit = "char";
    	
		var length = 0;
		switch(unit) {
			case "utf8":{
//				for(var i = 0, c; c = value.charAt(i++); length += (c >> 11 ? 3 : c >> 7 ? 2 : 1));
				for(var i=0, len=value.length; i<len; i++) {
				    if(escape(value.charAt(i)).length >= 4)
				        length += 3;
				    else if(escape(value.charAt(i)) == "%A7")
				        length += 3;
				    else if(escape(value.charAt(i)) != "%0D")
				        length++;
				    else length++;
				}
				break;
			}
			case "ascii":{
				for(var i = 0, c; c = value.charAt(i++); length += c >> 7 ? 2 : 1);
				break;
			}
			default : {
				length = value.length;
			}
		}
		
		return length;
    },
    getByteLength: function(/*String*/_str){
    	var stringByteLength = 0;
    	stringByteLength = (function(s,b,i,c){
		    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?2:c>>7?2:1);
		    return b
		})(_str);

		return stringByteLength;
    },
    
    /************************************************************************************
	 *    : 입력값을 마스킹한다
     * @exmple  var sMaskValue  = ValueUtil.maskType("JUMIN","9901012000000"))
	 * @param {"POLY"|"JUMIN"| "ACCOUNT"|"LOAN"|"TEL" |"EMAIL"|"ADDRESS"|"HPID"|"PASSPORT" |"DRIVER" |"FOREIGNER"|"CARD" |"NAME"} psType   String			-Data Type<br>
				'POLY' 	    :     <br>
				'JUMIN' 	: 주민등록번호<br>
				'ACCOUNT' 	: 은행계좌번호<br>
				'LOAN' 		: 융자대출번호<br>
				'TEL' 		: 전화번호<br>
				'EMAIL' 	: 이메일<br>
				'ADDRESS' 	: 주소   (,콤마 기준으로 이후값 마스킹)<br>
				'HPID' 		: 홈페이지 id<br>
				'PASSPORT'  : 여권번호<br>
				'DRIVER'    : 운전면허번호<br>
			    'FOREIGNER' : 외국인등록번호<br>
			    'CARD'      : 카드번호<br>
                'NAME'      : 이름<br>
	 * @param  sourceData String 		- value
	 * @return String    마스킹된 결과값
	 ************************************************************************************/
	maskType: function(psType, sourceData) {
		// "개인정보 암호화(마스킹)" 페이지 기준.
		// 증권번호, 주민등록번호, 은행계좌번호, 융자대출번호, 전화번호, E-Mail, 주소, 홈페이지 id
		// 증권번호 : 앞 2~4자리. 예시 > 1****678
		// 주민등록번호 : 뒤 6자리. 예시 > 760421-1******
		// 은행계좌번호 : 뒤 6자리~2자리. 예시 > 12345****9
		// 융자대출번호 : 제한없음.
		// 전화번호 : 뒤 4자리. 예시 > 010-7890-****
		// E-Mail : 뒤 3자리. 예시> abc***@hanwha.com
		// 주소 : 세부주소. 예시 > 서울시 영등포구 여의도동 63 *****
		// 홈페이지 id : 뒤 3자리. 예시 > abc***
		// 여권번호: 발급 일련번호 뒤 4자리 or 영문 1자리 + 뒷 3자리 예시 > M1234A567 -> M1234****, M12A34567 -> M12*34***
		// 운전면허번호 : 숫자 첫 2번째 자리와 일련번호 뒷2자리, 체크 값 첫 번째 자리 예시 > 12-1*-1234**-*2, 서울-1*-1234**-*2
		// 외국인등록번호 : 뒤 6자리. 예시 > 760421-1******
		// 카드번호 : 14~16 자리에 따라 4~6개 마스킹 예시 > 1234-56**-****-3456, 1234-56****-*2345, 1234-56****-1234
		// 이름  : 한글은 첫자와 마지막자를 제외한 *

		var data = this.trim(String(sourceData));
		if( this.isNull(data) ){
			return this.fixNull(data);
		}

		var sReturnValue = "";
		var pattern      = "";

		switch (psType.toUpperCase()) {

			case 'POLY': //증권번호. (앞 2번째 부터 4개 숫자 마스킹)
				pattern = /^([0-9]{1})(.{4})([0-9]+)$/;
				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1****$3");
				}
				break;

			case 'JUMIN': //주민등록번호.(마지막 6자리 마스킹)
				pattern = /^([0-9]{6})(-*)([a-zA-Z0-9]{1})(.{6})$/;
				//주민번호로 13자리가 안된 값이 넘어오는 경우, 채우기  (#5786 암호화된 문자열의 주민번호도 포멧팅하도록 수정 )(2021.09.01)
                if(data.length < 13) {
	                // [#5828] (2021.09.06) minLength -> fixLength로 변경 처리 (fixLength만큼 글자수를 채운다)
                    data = this.revise(data, "rpad", { fixLength : 13 , lengthUnit :"char" , padStr  :"*" });
                }
				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1-$3******");
				}
				break;

			case 'ACCOUNT': //계좌번호 (뒤 6~2자리. 5개 숫자 마스킹)
				/* 2021-02-22 뒤 2~6, 5개 숫자 마스킹  */
				// 10~15 자리수내에서 마스킹
				var sDataAccount = data.replace(/-/g, "");
				if (sDataAccount.length > 9 && sDataAccount.length < 16) {
					sReturnValue = setNumberMask(data, 1, 5);
				}
				break;

			case 'LOAN': //융자대출번호 (마스킹 없음)
				sReturnValue = data;
				break;

			case 'TEL': //전화번호 (마지막 4개 숫자 마스킹)
				pattern =/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)(.{4})/;
				var sDataTel = data.replace(/-/g, "");
				if(pattern.test(sDataTel)){
					sReturnValue = sDataTel.replace(pattern,"$1-$2-****");
				}
				break;

			case 'EMAIL': //이메일 (이메일 아이디 뒤 3자리 마스킹)
				pattern =/^([a-zA-Z0-9._-]+)([a-zA-Z0-9._-]{3})@([a-zA-Z0-9._-]+)[.]([a-zA-Z0-9._-]+)$/;
				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1***@$3.$4");
				}
				break;

			case 'ADDRESS': //주소
				// 뒷자리 * 5개로 표현  (2020.7.1)
				var aData = data.split(",");
				sReturnValue = aData[0] + " *****";
				break;

			case 'HPID': //홈페이지 ID
				pattern =/^(.+)(.{3})$/;
				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1***");
				}
				break;

			case 'PASSPORT': //여권번호
				var oNewPattern1 =/^([a-zA-Z]{1})([0-9]+)([a-zA-Z]{1})([0-9]+)([0-9]{3})$/; // 신 여권번호 ex ) M12A34567
				var oNewPattern2 =/^([a-zA-Z]{1})([a-zA-Z]{1})([0-9]+)([0-9]{3})$/; // 신여권번호 ex) MA1234567
				var oOldPattern =/^(.+)(.{4})$/; // 구 여권번호

				if (oNewPattern1.test(data)) {
					sReturnValue = data.replace(oNewPattern1 , "$1$2*$4***");
				} else if (oNewPattern2.test(data)) {
					sReturnValue = data.replace(oNewPattern2 , "$1*$3***");
				} else if (oOldPattern.test(data)) {
					sReturnValue = data.replace(oOldPattern,"$1****");
				}

				break;

			case 'DRIVER': // 운전면허번호
				pattern = /^([0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2})(-*)([0-9]{1})([0-9]{1})(-*)([0-9]+)([0-9]{2})(-*)([0-9]{1})([0-9]{1})/;

				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1-$3*-$6**-*$10");
				}

				break;

			case 'FOREGINER': // TODO: 오타로 삭제예정 - 외국인등록번호 ()
				pattern = /^([0-9]{6})(-*)([0-9]{1})(.{6})$/;
				//주민번호로 13자리가 안된 값이 넘어오는 경우, 채우기  (#5786 암호화된 문자열의 주민번호도 포멧팅하도록 수정 )(2021.09.01)
                if(data.length < 13) {
                // [#5828] (2021.09.06) minLength -> fixLength로 변경 처리 (fixLength만큼 글자수를 채운다)
                    data = this.revise(data, "rpad", { fixLength : 13 , lengthUnit :"char" , padStr  :"*" });
                }
				if(pattern.test(data)){
					sReturnValue = data.replace(pattern,"$1-$3******");
				}
				break;

            case 'FOREIGNER': // 외국인등록번호
                pattern = /^([0-9]{6})(-*)([0-9]{1})(.{6})$/;
                //주민번호로 13자리가 안된 값이 넘어오는 경우, 채우기  (#5786 암호화된 문자열의 주민번호도 포멧팅하도록 수정 )(2021.09.01)
                if(data.length < 13) {
                // [#5828] (2021.09.06) minLength -> fixLength로 변경 처리 (fixLength만큼 글자수를 채운다)
                    data = this.revise(data, "rpad", { fixLength : 13 , lengthUnit :"char" , padStr  :"*" });
                }
                if(pattern.test(data)){
                    sReturnValue = data.replace(pattern,"$1-$3******");
                }
                break;

			case 'CARD': // 카드번호
				var pattern_14 = /^([0-9]{4})(-*)([0-9]{2})([0-9]{4})(-*)([0-9]{4})$/;
				var pattern_15 = /^([0-9]{4})(-*)([0-9]{2})([0-9]{4})(-*)([0-9]{1})([0-9]{4})$/;
				var pattern_16 = /^([0-9]{4})(-*)([0-9]{2})([0-9]{2})(-*)([0-9]{4})(-*)([0-9]{4})$/;

				if (pattern_14.test(data)){
					sReturnValue = data.replace(pattern_14,"$1-$3****-$6");
				} else if (pattern_15.test(data)){
					sReturnValue = data.replace(pattern_15,"$1-$3****-*$7");
				} else if (pattern_16.test(data)){
					sReturnValue = data.replace(pattern_16,"$1-$3**-****-$8");
				}

				break;
			case 'NAME' :
				if(data.match(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/) ){  //한글인경우
					if(data.length > 2){
						var originName = data.split('');
						originName.forEach(function(name, i){
							if(i == 0 || i === originName.length-1){
								return;
							}
							originName[i] = '*';
						});

						var joinName = originName.join();
						return joinName.replace(/,/g, '');
					}
					else{
						var patternKor = /.$/;
						return data.replace(patternKor, '*')
					}
				}
				else{   //영어인경우
					var names = data.split(" ");
					var lastName = "";
					var maskedName = "";

                    if ( names.length > 1 ){
                        lastName = names.pop(); //성
                    }

					names = names.map(function(name){   //First Name, Middle Name

						//#5141 정규식"((?<="로 인한 ie오류로 인하여 수정처리(2021.06.18)
						var stReplaceIdx = name.length - Math.ceil(name.length / 2);  //replace 시작위치
						var sMaskName = name.substr(0, stReplaceIdx);
						var nMaskCnt  = name.length - stReplaceIdx;

                        for (var idx = 0; idx < nMaskCnt; idx++) {
                            sMaskName = sMaskName + "*";
                        }

						return sMaskName;
					});

					names.forEach(function(each, i){
						maskedName += each + " ";
					});
					maskedName +=  lastName

					return maskedName;
				}
				break;
			default :
				break;	// sReturnValue가 ""이기 때문
		}

		// sReturnValue 가 없을 경우 사용자가 입력한 data 리턴되게 변경.
		// 마스킹 형식과 일치하지 않은 경우, 마스킹 처리되지 않아서 sReturnValue 가 빈값.
		if (sReturnValue == "") {
			sReturnValue = data;
		}

		return sReturnValue;
	}
 };

/**
 * @class 날짜 유틸 클래스
 */
DateUtil = {

    /**
     * 날짜를 지정한 패턴의 문자열로 반환한다.
	 * @param {Date} poDate			날짜
	 * @param {String} psPattern	포맷 문자열(ex: YYYYMMDD)
	 * @return {String} 날짜 문자열
     */
    format : function (poDate, psPattern) { // dateValue As Date, strPattern As String
        var CAL_INITIAL = {
		    MONTH_IN_YEAR :         ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    SHORT_MONTH_IN_YEAR :   ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		    DAY_IN_WEEK :           ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"],
		    SHORT_DAY_IN_WEEK :     ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"]
		};
        
        var year      = poDate.getFullYear();
	    var month     = poDate.getMonth() + 1;
	    var day       = poDate.getDate();
	    var dayInWeek = poDate.getDay();
	    var hour24    = poDate.getHours();
	    var ampm      = (hour24 < 12) ? "AM" : "PM";
	    var hour12    = (hour24 > 12) ? (hour24 - 12) : hour24;
	    var min       = poDate.getMinutes();
	    var sec       = poDate.getSeconds();
	
	    var YYYY = "" + year;
	    var YY   = YYYY.substr(2);
	    var MM   = (("" + month).length == 1) ? "0" + month : "" + month;
	    var MON  = CAL_INITIAL.MONTH_IN_YEAR[month-1];
	    var mon  = CAL_INITIAL.SHORT_MONTH_IN_YEAR[month-1];
	    var DD   = (("" + day).length == 1) ? "0" + day : "" + day;
	    var DAY  = CAL_INITIAL.DAY_IN_WEEK[dayInWeek];
	    var day  = CAL_INITIAL.SHORT_DAY_IN_WEEK[dayInWeek];
	    var HH   = (("" + hour24).length == 1) ? "0" + hour24 : "" + hour24;
	    var hh   = (("" + hour12).length == 1) ? "0" + hour12 : "" + hour12;
	    var mm   = (("" + min).length == 1) ? "0" + min : "" + min;
	    var ss   = (("" + sec).length == 1) ? "0" + sec : "" + sec;
	    var SS   = "" + poDate.getMilliseconds();
		
	    var dateStr;
	    var index = -1;
	    if (typeof(psPattern) == "undefined") {
	        dateStr = "YYYYMMDD";
	    } else {
	        dateStr = psPattern;
	    }
	
	    dateStr = dateStr.replace(/YYYY/g, YYYY);
	    dateStr = dateStr.replace(/yyyy/g, YYYY);
	    dateStr = dateStr.replace(/YY/g,   YY);
	    dateStr = dateStr.replace(/MM/g,   MM);
	    dateStr = dateStr.replace(/MON/g,  MON);
	    dateStr = dateStr.replace(/mon/g,  mon);
	    dateStr = dateStr.replace(/DD/g,   DD);
	    dateStr = dateStr.replace(/dd/g,   DD);
	    dateStr = dateStr.replace(/day/g,  day);
	    dateStr = dateStr.replace(/DAY/g,  DAY);
	    dateStr = dateStr.replace(/hh/g,   hh);
	    dateStr = dateStr.replace(/HH/g,   HH);
	    dateStr = dateStr.replace(/mm/g,   mm);
	    dateStr = dateStr.replace(/ss/g,   ss);
	    dateStr = dateStr.replace(/(\s+)a/g, "$1" + ampm);
	
	    return dateStr;
    },

    /**
     * 올바른 날짜인지를 체크한다.
	 * @param {Number | String} puYear			년도
	 * @param {Number | String} puMonth			월
	 * @param {Number | String} puDay			일
	 * @return {Boolean} 유효한 날짜인지 여부
    */
    isValid : function (puYear, puMonth, puDay) {
    	var pnYear = Number(puYear);
    	var pnMonth = Number(puMonth);
    	var pnDay = Number(puDay);
        var vdDate = new Date(pnYear, pnMonth-1, pnDay);
        return vdDate.getFullYear() == pnYear      &&
               vdDate.getMonth   () == pnMonth - 1 &&
               vdDate.getDate    () == pnDay;
    },

    /**
     * 현재 날짜에 해당 날짜만큼 더한 날짜를 반환한다.
	 * @param {String} psDate			날짜 문자열(ex: 20180101)
	 * @param {Number} pnDayTerm		추가 일수
	 * @return {String} 날짜 문자열
    */
    addDate : function (psDate, pnDayTerm) { 
    	var pnYear 	= Number(psDate.substring(0,4));
    	var pnMonth = Number(psDate.substring(4,6));
    	var pnDay 	= Number(psDate.substring(6,8));

    	if (this.isValid(pnYear, pnMonth, pnDay)) {
	    	var vdDate = new Date(pnYear, pnMonth-1, pnDay);
	    	var vnOneDay = 1*24*60*60*1000 ; /* 1day,24hour,60minute,60seconds,1000ms */
	    	
	    	var psTime = vdDate.getTime() + (Number(pnDayTerm)*Number(vnOneDay));
	    	vdDate.setTime(psTime);
	    	
	        return this.format(vdDate,"YYYYMMDD");
    	}else{
    		return psDate;
    	}
    },
    
    /**
     * 날짜 문자열을 Date형으로 변환하여 반환한다.
     * <pre><code>
     * DateUtil.toDate("2007-02-09","YYYY-MM-DD");
 	 * </code></pre>
	 * @param {Date} psDateTime			날짜
	 * @param {String} psPattern	포맷 문자열(ex: YYYY-MM-DD)
	 * @example DateUtil.toDate("2007-02-09","YYYY-MM-DD")
	 * @return {Date} 날짜(Date) 객체
     */ 
    toDate : function (psDateTime, psPattern) {
        var vdDate = new Date();
        var vnIdx, vnCnt;

        var vsaFmt = ["Y", "M", "D", "H", "m", "s", "S"];
        var vnFmtLen = vsaFmt.length;
        var vnPtnLen = psPattern.length;
        var vnaNums = [vdDate.getFullYear(), vdDate.getMonth()+1, vdDate.getDate(), vdDate.getHours(), vdDate.getMinutes(), vdDate.getSeconds(), vdDate.getMilliseconds()];

        for (var i = 0; i < vnFmtLen; i++) {
            vnIdx = psPattern.indexOf(vsaFmt[i]);
            if (vnIdx != -1) {
                vnCnt = 1;
                for (var j=vnIdx+1; j < vnPtnLen; j++) {
                    if (psPattern.charAt(j) != vsaFmt[i]) { break; }
                    vnCnt++;
                }
                vnaNums[i] = Number(psDateTime.substring(vnIdx, vnIdx+vnCnt));
            } else {
                if(i==0) vnaNums[0] = 1900;
                else if(i==2) vnaNums[2] = 01;
            }
        }

        if (vnaNums[0] < 1900) { // 년도는 검증
            if (vnaNums[0] <= vdDate.getFullYear() % 100) {
                vnaNums[0] += vdDate.getFullYear() - (vdDate.getFullYear() % 100);
            } else if (vnaNums[0] < 100) {
                vnaNums[0] += 1900;
            } else {
                vnaNums[0] = 1900;
            }
        }

        return new Date(vnaNums[0], vnaNums[1]-1, vnaNums[2], vnaNums[3], vnaNums[4], vnaNums[5], vnaNums[6]);
    },

    /**
     * 해당월의 마지막 일자를 반환한다.
     * <pre><code>
     * DateUti.getMonthLastDay("20180201");<br>
     * <p>또는<p>
     * DateUti.getMonthLastDay("20180301", -1);
 	 * </code></pre>
	 * @param {String} psDate	년월 문자열(ex: 201802, 20180201)
	 * @param {Number} pnAdd?   +/- 월 수
	 * @return {Number} 일(Day)
     */ 
    getMonthLastDay : function (psDate, pnAdd) {
    	var pnYear 	= Number(psDate.substring(0,4));
    	var pnMonth = Number(psDate.substring(4,6));
        var vdDate = new Date(pnYear, pnMonth, 0, 1, 0, 0);
        if(pnAdd == null){
        	return vdDate.getDate();
        }else{
        	var vdDate2 = new Date(vdDate.getFullYear(), vdDate.getMonth()+1+pnAdd, 0, 1, 0, 0);
        	return vdDate2.getDate();
        }
    },

    /**
     * 두 날짜간의 일(Day)수를 반환한다.
	 * @param {String} psDate1st	년월 문자열(ex: 20180201)
	 * @param {String} psDate2nd    년월 문자열(ex: 20170201)
	 * @return {Number} 일수(Day)
     */
    getDiffDay : function (psDate1st, psDate2nd) {
    	var date1 = this.toDate(psDate1st, "YYYYMMDD");
    	var date2 = this.toDate(psDate2nd, "YYYYMMDD");
        
        return parseInt((date2 - date1)/(1000*60*60*24));
    },
    
    /**
     * 해당 날짜의 하루 전 날짜 반환한다.
     * @param {String} psDate 날짜포맷 문자열
     */
    getBeforeDate : function(psDate){
    	var y = psDate.substring(0, 4);
		var m = psDate.substring(4, 6);
		var d = psDate.substring(6, 8);
		var befDt = new Date(y, m - 1, d - 1);
		var befDtYear = befDt.getFullYear().toString();
		var befDtMonth = new String(befDt.getMonth() + 1);
		var befDtDate = befDt.getDate().toString();
		
		if (befDtMonth.length == 1) befDtMonth = "0" + befDtMonth;
		if (befDtDate.length == 1) befDtDate = "0" + befDtDate;
		
		return befDtYear + befDtMonth + befDtDate + "000000";
    },
    
    /**
     * 입력받은 날짜에 시분초 문자열 000000을 붙여서 반환한다.
     * @param {String} psDate 날짜포맷 문자열
     */
    addZoreDate : function(psDate){
    	var dateString = psDate.substring(0, 8);
		dateString += "000000";
		return dateString;
    },
    
    /**
     * <pre><code>
     *  DateUtil.addMinutes("0900", 50);
     * </code></pre>
     * @param {String} psHHmm 특정분을 더할 시분 값
	 * @param {String} pnAddMinutes 더할 분
	 * @return {String} 시분(HHmm)
     */
    addMinutes : function (psHHmm, pnAddMinutes) {
    	var vdDate = DateUtil.toDate(psHHmm, "HHmm");
		vdDate.setMinutes(vdDate.getMinutes() + pnAddMinutes);
		
		var vnHours = vdDate.getHours();
		var vnMinutes = vdDate.getMinutes();
		
		var vsHours = "";
		var vsMinutes = "";
		
		if(vnHours < 10){
			vsHours = "0" + vnHours;
		}else{
			vsHours = vnHours + "";
		}
		
		if(vnMinutes < 10){
			vsMinutes = "0" + vnMinutes;
		}else{
			vsMinutes = vnMinutes + "";
		}
		
		return vsHours + vsMinutes;
    },
    
    getCurrentTime : function() {
    	return new Date().getTime();
    },
    
    /**
     * 입력한 일자에 해당되는 한글 요일을 반환한다.
     * <pre><code>
     * DateUti.getDayOfWeek("20191120");
 	 * </code></pre>
	 * @param {String} psDate 일자 문자열(ex:20191120)
	 * @return {String} 한글 요일
     */ 
    getDayOfWeek : function (psDate) {
    	
    	var vsYear 	= psDate.substring(0,4);
    	var vsMonth = psDate.substring(4,6);
    	var vsDay 	= psDate.substring(6,8);
    	var vaWeek  = ['일', '월', '화', '수', '목', '금', '토'];
    	
		return vaWeek[new Date(vsYear + "-" + vsMonth + "-" + vsDay).getDay()];
    }
};

/**
 * @class 파일 유틸 클래스
 */
FileUtil = {
	
	getMaxUploadSize : function() {
		return 100;
	},
	
	//업로드 가능한 파일 확장자 목록반환
	getPemitedFileExts : function(){
		var vaFileExt = ['JPG', 'PNG', 'GIF', 'TIF', 'TIFF', 'JFIF', 'BMP', 'TXT', 'HWP', 'DOCX', 'DOC'
						, 'DOCM', 'PPT', 'PPTX', 'PPTM', 'PPS', 'PPSX', 'XLS', 'XLSX', 'XLSM', 'XLAM'
						, 'XLA', 'PSD', 'PDF', 'ODS', 'OGG', 'MP4', 'AVI', 'WMV', 'ZIP', 'RAR', 'TAR'
						, '7Z', 'TBZ', 'TGZ', 'LZH', 'GZ', 'AI'
					   ];
		return vaFileExt;
	},
	
	//업로드 불가한 파일 확장자 목록반환
	getLimitedFileExts : function(){
		// 파일 선택 제한 확장자.
		var vaFileExt = ['A6P','AC','AS','ACR','ACTION','AIR','APP','ASP','ASPX','AWK'
						,'BAT'
						,'CGI','CMD','COM','CSH'
						,'DEK','DLD','DS'
						,'EBM','ESH','EXE','EZS'
						,'FKY','FRS','FXP'
						,'GADGET'
						,'HMS','HTA'
						,'ICD','INX','IPF','ISU'
						,'JAR','JS','JSE','JSP','JSX'
						,'KIX'
						,'LUA'
						,'MCR','MEM','MPX','MS','MST'
						,'OBS'
						,'PAF','PEX','PHP','PIF','PL','PRC','PRG','PVD','PWC','PY','PYC','PYO'
						,'QPX'
						,'RBX','RGS','ROX','RPJ'
						,'SCAR','SCR','SCRIPT','SCT','SH','SHB','SHS','SPR'
						,'TLB','TMS'
						,'U3P','UDF'
						,'VB','VBE','VBS','VBSCRIPT'
						,'WCM','WPK','WS','WSF'
						,'XQT'
					  ];
		
		return vaFileExt;
	},
	
	/**
	 * 파일 확장자 체크
	 * @param {String} psFileNm 파일명
	 * @param {String[]} paFileFilter 가능 파일 확장자 명
	 */
	checkFileExt : function(psFileNm, paFileFilter) {
		if (ValueUtil.isNull(paFileFilter)) paFileFilter = this.getPemitedFileExts();
		
		var vbCheck = false;
		//허용 파일 확장자 체크
		var arrStr = ValueUtil.split(psFileNm, ".");
		var extStr = arrStr [arrStr.length - 1].toUpperCase();
		for (var i=0, len=paFileFilter.length; i<len; i++) {
			if (extStr == paFileFilter[i].toUpperCase()) {
				vbCheck = true;
				break;
			}
		}
		
		if (!vbCheck) {
			alert(this.__getMessage("NLS-ERR-M007", [extStr]));
			return false;
		}
		
		//제한 파일 확장자 체크
		var vaLimitedFileExts = this.getLimitedFileExts();
		for (var i=0, len=vaLimitedFileExts.length; i<len; i++) {
			if (extStr == vaLimitedFileExts[i]) {
				alert(this.__getMessage("NLS-ERR-M007", [extStr]));
				return false;
			}
		}
		
		return true;
	},
	
	/**
	 * 파일 업로드 용량 체크
	 * @param {File} poFile 검사할 파일
	 * @param {Number} pnLimitFileSize 파일 제한 사이즈
	 */
	checkFileSize : function(poFile, pnLimitFileSize) {
		if(!ValueUtil.isNull(poFile)){
			if(poFile.size > (pnLimitFileSize * 1024 * 1024)){
				//파일의 크기가 @mb를 초과하는 경우 첨부할 수 없습니다.
				alert(this.__getMessage("NLS-ERR-M010", ["100"]));
				return false;
			}
		}
		
		return true;
	},
	
	/**
	 * 메시지를 반환한다.
	 * @param {String} psMessageId
	 * @param {String[]} paArgs
	 */
	__getMessage : function(psMessageId, paArgs){
		var message = cpr.I18N.INSTANCE.message(psMessageId);
		var index = 0, count = 0;
    	while ((index = message.indexOf("@", index)) != -1) {
	        if (paArgs[count] == null) paArgs[count] = "";
	        message = message.substr(0, index) + String(paArgs[count]) + message.substring(index + 1);
	        index = index + String(paArgs[count++]).length;
	    }
	    
	    return message.replace(/\\n/ig, "\n");
	},
	
	/**
	 * File Dialog를 띄우고 선택한 File을 반환한다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {Any} paFileFilter 확장자를 선택한다. null일 경우 default로 적용되어 있는 확장자만 업로드하도록 한다. (예: ["xls", "xlsx"])
	 * @param {Function} poCallBackFunc 후처리 콜백함수
	 * @param {Boolean} pbMultiple? 단건 선택일지 멀티 선택일지 여부 (default : 멀티) false 일경우 단건
	 * @param {Number} pnLimitFileSize? 파일업로드 제한 용량사이즈(mb 단위)
	 */
	getFileName : function(app, paFileFilter, poCallBackFunc, pbMultiple, pnLimitFileSize){
   		app.getContainer().getChildren().forEach(function(each){
			if(each instanceof cpr.controls.FileInput && each.id == "com_fileinput") {
				each.dispose();
			}
		});
		
		var fileInput = new cpr.controls.FileInput("com_fileinput");
		fileInput.visible = false;
		//파일 확장자
		if(!ValueUtil.isNull(paFileFilter)) {
			var tempFilter = "";
			if(paFileFilter instanceof Array) {
				for(var i = 0; i < paFileFilter.length; i++) {
					if(i == 0) {
						tempFilter += "." + paFileFilter[i];
					} else {
						tempFilter = tempFilter + ",." + paFileFilter[i];
					}
				}
				console.log(tempFilter);
				fileInput.acceptFile = tempFilter;
			} else {
				fileInput.acceptFile = paFileFilter;
			}
			
		}
		//multi 선택가능여부
		if(!ValueUtil.isNull(pbMultiple)) {
			fileInput.multiple = pbMultiple;
		}
		//파일 업로드 용량
		if(!ValueUtil.isNull(pnLimitFileSize)) {
			fileInput.limitFileSize = pnLimitFileSize;
		}else{
			fileInput.limitFileSize = this.getMaxUploadSize();
		}
		fileInput.limitFileSizeUnit = "mb";
		
		fileInput.addEventListenerOnce("value-change", function(e) {
			if(typeof (poCallBackFunc) == "function"){
				var files = fileInput.files;
				var vsFileNm = "";
				
				//파일 선택 유/무 체크
				if(files.length < 1){
					//파일을 선택해 주세요.
					alert(FileUtil.__getMessage("NLS-CMM-M012"));
					return false;
				}
				for(var i=0, len=files.length; i<len; i++) {
					var voFile = files[i];
					//업로드 확장자 체크
					var fileFilter = new Array();
					
					if(paFileFilter) {
						if(typeof(paFileFilter) == "string") {
							var tempFileFilter = paFileFilter.split(",");
							
							tempFileFilter.forEach(function(each){
								fileFilter.push(each.replace(".", ""));
							});
						}
						
						if(paFileFilter instanceof Array) {
							fileFilter = paFileFilter;
						}
					}
					
		   			if(!FileUtil.checkFileExt(voFile.name, fileFilter)) return false;
					
					//업로드 용량 체크 로직
			   		if(!FileUtil.checkFileSize(voFile, fileInput.limitFileSize)) return false;
				}
				
			   	poCallBackFunc(files);
			}
		});
		
		app.getContainer().addChild(fileInput, {
			"width": "0px",
			"height": "0px"
		});
		
		fileInput.redraw();
		
		setTimeout(function() {
			fileInput.openFileChooser();
		}, 500);
   	},
	
	/**
	 * 첨부파일을 다운로드 한다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {{strCommand: String <!-- 다운로드 커맨드 -->, strFileSubPath: String <!-- 해당 화면의 첨부파일 저장 경로(화면ID) -->, strFileNm: String <!-- 원본 파일명(다운로드될 파일의 이름) -->, strOriFileNm: String <!-- 저장된 파일명(서버에 저장되어 있는 파일의 이름) -->, strTmpFilePath: String <!--  -->}} poParam 다운로드 요청파라메터 객체
	 * @param {Function} poCallBackFunc? 콜백함수
	 */
	downloadFile : function(app, poParam, poCallBackFunc) {
		var submit =  app.lookup("XBComFileDownSubmit");
		if(submit == null){
			submit = new cpr.protocols.Submission("XBComFileDownSubmit");
			app.register(submit);
		} else {
			submit.removeAllParameters();
		}
		
		var vsCommand = !ValueUtil.isNull(poParam.strCommand) ? poParam.strCommand : "tmpDownload";
		
		submit.action = "../CmnFile/"+vsCommand+".do";
		submit.responseType = "filedownload";
		submit.addParameter("strFileSubPath", poParam.strFileSubPath);
		submit.addParameter("strFileNm", poParam.strFileNm);
		submit.addParameter("strOriFileNm", poParam.strOriFileNm);
		submit.addParameter("strTmpFilePath", poParam.strTmpFilePath);
		submit.addEventListenerOnce("submit-done", function(e){
			if(typeof (poCallBackFunc) == "function"){
				poCallBackFunc();
			}
		});
		
		submit.send();
	}
};



ExcelUtil = {
		_s2ab: function(s) {
			
			var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
			var view = new Uint8Array(buf); //create uint8array as viewer
			for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
			return buf;
		},
		_exportJsExcel: function(fileName, sheetName, excelData, headerColumn, gridCtrl) {
			var workbook = new ExcelJS.Workbook();
			
			var worksheet = workbook.addWorksheet(sheetName);
			//		   worksheet.views = [
			//		   {state: 'frozen', xSplit: 0, ySplit: 1}
			//		   ];
			
			//		   worksheet.autoFilter = {
	        //			   from: 'A1',
	        //			   to: 'M1'
	        //		   };
			
			worksheet.columns = headerColumn;
			
			var firstRow = worksheet.getRow(1);
			firstRow.font = {
				bold: true
			};
			firstRow.alignment = {
				vertical: 'middle',
				horizontal: 'center'
			};
			
			firstRow.eachCell({
				includeEmpty: false
			}, function(cell, colNumber) {
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: {
						argb: 'dddddd'
					}
				};
				
			});
			
			worksheet.addRows(excelData);
			
			var borderStyles = {
				top: {
					style: "thin"
				},
				left: {
					style: "thin"
				},
				bottom: {
					style: "thin"
				},
				right: {
					style: "thin"
				}
			};
			worksheet.eachRow({
				includeEmpty: false
			}, function(row, rowNumber) {
				row.eachCell({
					includeEmpty: false
				}, function(cell, colNumber) {
					cell.border = borderStyles;
				});
			});
			
			var buff = workbook.xlsx.writeBuffer().then(function(data) {
				var blob = new Blob([data], {
					type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
				var a= saveAs(blob, fileName);
				
				var isIE = ["ie", "edge"].indexOf(cpr.utils.Util.detectBrowser().name) !== -1;
				if (!isIE) {
					a.onwriteend = function() {
					}
				} else {
					if (a) {
					}
				}
			});
			
		},
		_exportExcel: function(fileName, sheetName, excelData,type,gridCtrl) {
			
			var wb = XLSX.utils.book_new();
			
			var newWorksheet ;
			if(type == "table") {
				
				// step 2. 시트 만들기 
				newWorksheet = XLSX.utils.table_to_sheet(excelData);
			} else if(type == "json") {
				
				newWorksheet = XLSX.utils.json_to_sheet(excelData);
			}
			
			//프로버젼만 사용 가능 (xlsx.bundle.js, 상용버젼)
//			newWorksheet["A1"].s = { // set the style for target cell
//			  font: {
//			  	name: '',
//			    sz: 24,
//			    bold: true,
//			    color: {
//			      rgb: "FFFFAA00"
//			    }
//			  },
//			  
//			  fill : {
//			  	patternType	: "solid"
//			  },
//			  
//			  border : {
//			  	bottom : {
//			  		style: 'solid', color: 'red' 
//			  	}
//			  }	
//			};
			
			// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
			XLSX.utils.book_append_sheet(wb, newWorksheet, sheetName);
			
			// step 4. 엑셀 파일 만들기 
			var wbout = XLSX.write(wb, {
				bookType: 'xlsx',
				type: 'binary',
				compression : true
			});
			
			// step 5. 엑셀 파일 내보내기 
			var a = saveAs(new Blob([this._s2ab(wbout)], {
				type: "application/octet-stream"
			}), fileName);
			
			var isIE = ["ie", "edge"].indexOf(cpr.utils.Util.detectBrowser().name) !== -1;
			if(!isIE) {
				a.onwriteend = function(){
				}
			} else {
				if(a) {
				}
			}
		},
		
		exportExcelToTable: function(fileName, sheetName, gridCtrl) {
			var table = document.createElement("table");
			table.id = "tableData";
			
			var vcGrid = gridCtrl;
			var exportData = vcGrid.getExportData({
				exceptStyle: true,
				applyFormat: true
			})
			
			var header = exportData.rowgroups[0];
			var detail = exportData.rowgroups[1];
			/** @type Array */
			var headerData = header.data[0];
			/** @type Array */
			var detailData = detail.data;
			
			var result = [];
			
			var tr = document.createElement("tr");
			headerData.forEach(function(each) {
				var td = document.createElement("td");
				td.innerHTML = each;
				tr.appendChild(td);
				table.appendChild(tr);
			});
			
			detailData.forEach(function(each) {
				var trs = document.createElement("tr");
				each.forEach(function(eachs) {
					var tds = document.createElement("td");
					tds.innerHTML = eachs;
					trs.appendChild(tds);
					table.appendChild(trs);
				});
			});
			
			this._exportExcel(fileName, sheetName, table, "table");
		},
		
		exportExcelToJSON : function(fileName, sheetName, gridCtrl, paExcludeCols) {
			
			var vaExcludeCols = [];
			if(paExcludeCols != null) {
				if (!(paExcludeCols instanceof Array)) {
					paExcludeCols = [paExcludeCols];
				}
				vaExcludeCols = paExcludeCols;
			}
			
			var vcGrid = gridCtrl;
			var exportData = vcGrid.getExportData({
				exceptStyle : true,
				applyFormat : true,
				excludeCols : vaExcludeCols
			});
			
			
			var header = exportData.rowgroups[0];
//			var detail = exportData.rowgroups[1];
			exportData.rowgroups.shift();
			
			/** @type Array */
			var detail = exportData.rowgroups;
			
			/** @type Array */
			var headerData = header.data[0];
			
//			/** @type Array */
//			var detailData = detail.data;
			
			var result = [];
			
//			detailData.forEach(function(each) {
//				var a = {};
//				headerData.forEach(function(headerEach, idx) {
//					a[headerEach] = each[idx];
//				});
//				result.push(a);
//				
//			});
			detail = detail.filter(function(each){
				return each.region == "detail";
			});
			detail.forEach(function(each){
				
				/** @type Array */
				var detailData = each.data;
				
				detailData.forEach(function(eachs){
					
					var a = {};
					headerData.forEach(function(headerEach,idx){
						a[headerEach] = eachs[idx];
					});
					result.push(a);
				});
			});
			
			this._exportExcel(fileName, sheetName, result, "json",gridCtrl);
		},
		
		exportExcelJsToJSON : function(fileName, sheetName, gridCtrl, paExcludeCols) {
			
			var vaExcludeCols = [];
			if(paExcludeCols != null) {
				if (!(paExcludeCols instanceof Array)) {
					paExcludeCols = [paExcludeCols];
				}
				vaExcludeCols = paExcludeCols;
			}
			
			var vcGrid = gridCtrl;
			var exportData = vcGrid.getExportData({
				exceptStyle : true,
				applyFormat : true,
				excludeCols : vaExcludeCols
			});
			var header = exportData.rowgroups[0];
//			var detail = exportData.rowgroups[1];
			exportData.rowgroups.shift();
			
			/** @type Array */
			var detail = exportData.rowgroups;
			
			/** @type Array */
			var headerData = header.data[0];
			
//			/** @type Array */
//			var detailData = detail.data;
			
			var result = [];
			
//			detailData.forEach(function(each) {
//				var a = {};
//				headerData.forEach(function(headerEach, idx) {
//					a[headerEach] = each[idx];
//				});
//				result.push(a);
//				
//			});

			detail = detail.filter(function(each){
				return each.region == "detail";
			});
			
			var arrHeader = new Array();
			headerData.forEach(function(headerEach,idx){
				var headerInfo = { header: headerEach, key: headerEach, width: 20 };
				arrHeader.push(headerInfo);
			});
			   
			detail.forEach(function(each){
				
				/** @type Array */
				var detailData = each.data;
				
				detailData.forEach(function(eachs){
					
					var a = {};
					headerData.forEach(function(headerEach,idx){
						a[headerEach] = eachs[idx];
					});
					result.push(a);
				});
			});
			this._exportJsExcel(fileName, sheetName, result, arrHeader,gridCtrl);
		}
}

/**
 * @class
 * @desc 변수 타입체크 유틸입니다
 */
TypeUtil = {
	/**
	 * 이메일 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isEmail : function(value){
		if(!value) return true;
	
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
			return true;
		}
		
		return false;
	},
	
	/**
	 * url 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isURL : function(value){
		if(!value) return true;
	
		// w3resource.com
		var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
		if(regexp.test(value)) {
			return true;
		}
		
		return false;
	},
	/**
	 * 사업자번호 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isBizCSN: function(value){
		if(!value) return true;
	
		// 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
		if ((value = (value + '').match(/\d{1}/g)).length != 10) {
			return false;
		}
	
		// 합 / 체크키
		var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
	
		// 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에 더합니다.
		for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(value[i])); }
	
		// 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
		// 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
		return (10 - ((sum + Math.floor(key[8] * Number(value[8]) / 10)) % 10)) == Number(value[9]);
	},
	
	/**
	 * 주민번호 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isSSN : function(value){
		if(!value) return true;
		value = value.replace(/[\-]/g, "");
		
		
		var fmt = /^\d{6}[1234]\d{6}$/;
		if(!fmt.test(value)){
			return false;
		}
	
		var birthYear = (value.charAt(7) <= "2") ? "19" : "20";
		birthYear += value.substr(0, 2);
		var birthMonth = value.substr(2, 2) - 1;
		var birthDate = value.substr(4, 2);
		var birth = new Date(birthYear, birthMonth, birthDate);
	
		if( birth.getYear() % 100 != value.substr(0, 2) ||
		    birth.getMonth() != birthMonth ||
		    birth.getDate() != birthDate) {
		    return false;
		}
	
		var arrDivide = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];            	
		var checkdigit = 0;            	
		for(var i = 0; i < value.length - 1; i++) {
			checkdigit += parseInt(value.charAt(i)) * parseInt(arrDivide[i]);
		}
		checkdigit = (11 - (checkdigit % 11)) % 10;
		if(checkdigit != value.charAt(12)){
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 유선전화번호 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isTelNo : function(value){
		if(!value) return true;
		if(/^\d{2,3}[\)\-\. ]?\d{3,4}[\-\. ]?\d{4}$/.test(value)){
			return true;
		}
		
		return false;
	},
	/**
	 * 핸드폰번호 형식에 맞는지 체크합니다.
	 * @param {String} value
	 * @return {String}
	 */
	isTelMobile : function(value){
		if(!value) return true;
		if(/^01([0|1|6|7|8|9]?)[\-\. ]?([0-9]{3,4})[\-\. ]?([0-9]{4})$/.test(value)) {
			return true;
		}
		
		return false;
	}
}
