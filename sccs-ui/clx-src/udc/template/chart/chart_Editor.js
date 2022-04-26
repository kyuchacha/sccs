/************************************************
 * chart_line.js
 * Created at 2020. 7. 8. 오후 6:48:14.
 *
 * @author csj
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

var voChart = null;
var data = [];

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	if(e.content) {
		e.preventDefault();
	}
	
	
    window.addEventListener("resize", function(e){    
	 	if(!app.disposed){
	 	  	app.lookup("shl1").getComponent("editor").resize();
	 	  }
    });
	
	
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var voContent = e.content;
	
	if(!voContent) {
		return;
	}
	
	shl1.registerComponent("voContent", voContent);

	drawChart();
	
}

exports.drawChart = drawChart;

/**
 * 라인차트를 차트를 그립니다.
 * @param {any} poContent
 */
function drawChart () {
	
	var poContent = app.lookup("shl1").getComponent("voContent");

	voChart = echarts.init(poContent);
	/** @type cpr.data.DataSet */
	var vcDataset = app.getAppProperty("dataSet");
	
	
	
	if(vcDataset){
		
		if(data.length == 0){
		
		vcDataset.getRowDataRanged().forEach(function(each){
		var _data = {
			value : each.VALUE ,
			name : each.NAME
		};
		data.push(_data);
		});
	}
		
		var option = {
		       tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: '사용량',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: data
        }
   			 ]
		};

	
		voChart.setOption(option);
		
	}	
	app.lookup("shl1").registerComponent("editor", voChart);
}


/**
 * 
 * @param {cpr.data.DataSet} addData
 */
function PushData(vcDataset){
	
	data = [];

	//데이터의 가장 왼쪽 값을 제거
    data.shift();
	
	vcDataset.getRowDataRanged().forEach(function(each){
			var _data = {
				value : each.VALUE ,
				name : each.NAME
			};
			data.push(_data);
		});
	  
	voChart.setOption({
	   series: [{
	         data: data
	      }]
	  });
	
}


exports.PushData = PushData;


window.addEventListener("resize", function() {
	cpr.core.NotificationCenter.INSTANCE.post("chart-resize", {
		chart : voChart
	});
});
