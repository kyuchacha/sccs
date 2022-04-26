/************************************************
 * chart_line.js
 * Created at 2020. 7. 8. 오후 6:48:14.
 *
 * @author csj
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

exports.drawChart = drawChart;

var voChart = null;

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	if (e.content) {
		e.preventDefault();
	}
	
	window.addEventListener("resize", function(e) {
		if (!app.disposed) {
			app.lookup("shl1").getComponent("area").resize();
		}
	});
	
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var voContent = e.content;
	
	shl1.registerComponent("voContent", voContent);
	
	if (!voContent) {
		return;
	}
	
	drawChart();
	
}

/**
 * 라인차트를 차트를 그립니다.
 * @param {any} poContent
 */
function drawChart() {
	
	var poContent = app.lookup("shl1").getComponent("voContent");
	
	voChart = echarts.init(poContent);
	/** @type cpr.data.DataSet */
	var vcDataset = app.getAppProperty("dataSet");
	
	if (vcDataset) {
		
		var voOption = {
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: vcDataset.getColumnData("COLUMN1")
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					data: vcDataset.getColumnData("COLUMN2"),
					type: 'line',
					areaStyle: {}
				},
				{
					data: vcDataset.getColumnData("COLUMN3"),
					type: 'line',
					areaStyle: {}
				}
			]
			
		};
		
		voChart.setOption(voOption);
	}
	
	app.lookup("shl1").registerComponent("area", voChart);
}

/**
 * 
 * @param {cpr.data.DataSet} vcDataset
 */
function PushData(vcDataset) {
	
	voChart.setOption({
		series: [{
			data: vcDataset.getColumnData("COLUMN2")
		}, {
			data: vcDataset.getColumnData("COLUMN3")
		}]
	});
	
}

exports.PushData = PushData;

window.addEventListener("resize", function() {
	cpr.core.NotificationCenter.INSTANCE.post("chart-resize", {
		chart : voChart
	});
});