/************************************************
 * PUI_CM_108_00-01.js
 * Created at 2022. 3. 24. 오후 5:57:53.
 *
 * @author "nhyu"
 ************************************************/

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	
	var shellDiv = e.content;
	//var shellDiv = uIControlShell.getComponent("content");
	if (!shellDiv) {
		return;
	}
	
	//초기화 및 설정(e-chart사용)
	myChart = echarts.init(shellDiv);
	myChart.resize();
	
	var option = {

		color: "#2f80ed",
//		legend: {
//			left: 'center',
//			top: 'bottom',
//			data: ['접속 수', '단위시스템']
//		},
		grid: {
			top: '10%',
			left: '3%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			
			name : "접속 수",
			nameTextStyle: {
				fontSize: 16,
				verticalAlign: "top",
				lineHeight: 80,
				color: "#d1d1d1"
			},
			type: 'value',
			boundaryGap: [0, 0.01]
		},
		yAxis: {
			type: 'category',
			name: '단위시스템',
			nameGap: 5,
		    nameTextStyle: {
		      fontSize: 16,
		      align: "center",
		      color: "#d1d1d1"
		    },
			data: ['방조제유지관리시스템',
				'교량안전관리시스템',
				'도로안전관리시스템',
				'홍수예경보시스템',
				'기상정보수집시스템',
				'통합시설관리',
				'통합관제',
				'시스템관리'
			],
			axisTick: {
				show: false
			},
			axisLabel: {
				color: "#333",
				fontSize: 16
			},
			axisLine: {
				lineStyle: {
					color: "rgb(205, 210, 220)"
					//width: 1
				}
			}
		},
		series: [{
			name: '접속 수',
			type: 'bar',
			data: [50, 100, 150, 200, 100, 300, 200, 10]
		}]
	};
	
	myChart.setOption(option);
	
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(e){
	var shl1 = e.control;
	
	if(e.content){ //최초 init 이벤트에서 e.content는 null입니다. 2번째 이벤트부터 DOM을 갖고 있습니다.
		e.preventDefault(); //다음에 일어나는 쉘 load이벤트 발생을 방지합니다.
	}
}
