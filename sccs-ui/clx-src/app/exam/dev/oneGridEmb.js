/************************************************
 * oneGridEmb.js
 * Created at 2021. 7. 22. 오후 2:32:30.
 *
 * @author kim su hyun
 ************************************************/

var util = createCommonUtil();

exports.doInsertDmParam = function doInsertDmParam(psParam) {
	util.DataMap.setValue(app, "dmParam", "strMstStudNo", psParam);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.DataMap.setValue(app, "dmParam", "strMstStudNo", app.getHost().initValue);
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 * 저장 클릭 이벤트
 */
function onCombutton1Save(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.com.comButton
	 */
	var combutton1 = e.control;
	// 1. 데이터 변경사항 체크
	if (!util.Grid.isModified(app, "grdDetail", "MSG")) return false;
	
	// 2. 유효성 체크
	if (!util.validate(app, "grdDetail")) return false;
	
	// 3. 데이터 저장
	util.Submit.send(app, "subSaveDtl", function(pbSuccess){
		if(pbSuccess){
			doListDtl("save");
		}
	});
}


/**
 * @param psStatus - 조회 상태(저장 후 조회인 경우에는 'save' 구분값 넘김)
 */
function doListDtl(psStatus){
	//조회 서브미션 호출
	util.Submit.send(app, "subListDtl", function(pbSuccess){
		if(pbSuccess) {
			if(psStatus == "save"){
				//갱신된 데이터가 조회되었습니다.
				util.Msg.notify(app, "INF-M005");
			}else{
				//조회되었습니다.
				util.Msg.notify(app, "INF-M001");
				util.DataMap.clear(app, "dmParam");
			}
			
		}
	});
}

/*
 * 데이터맵에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue
 */
function onDmParamUpdate(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataMap
	 */
	var dmParam = e.control;
	doListDtl();
}

