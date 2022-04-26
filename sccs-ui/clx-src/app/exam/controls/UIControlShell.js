/************************************************
 * UIControlShell2.js
 * Created at 2022. 3. 11. 오전 9:09:21.
 *
 * @author aaajd
 ************************************************/

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(e){
	var shl1 = e.control;
	
	var input = document.createElement("input");
	input.value = Math.round(Math.random() * 100);
	e.content.appendChild(input);
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl2Load(e){
	var shl2 = e.control;
	var shellDiv = e.content
	var myChart = echarts.init(shellDiv);
	myChart.resize();
	var option = {
		title : {
			text : 'ECharts 연동 예제'
		},
		tooltip : {},
		legend : {
			data : [ 'Sales' , 'Marketing', "R&D"]
		},
		xAxis : {
			data : [ "shirt", "cardign", "chiffon shirt", "pants", "heels", "socks" ]
		},
		yAxis : {},
		series : [ {
			name : 'Sales',
			type : 'bar',
			data : [ 5, 20, 36, 10, 10, 20 ]
		},
		{
			name : 'Marketing',
			type : 'line',
			data : [ 15, 25, 20, 25, 24, 40 ]
		},
		{
			name : 'R&D',
			type : 'bar',
			data : [ 15, 20, 35, 33, 40, 35 ]
		}]
	};
	myChart.setOption(option);
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl2Init(e){
	var shl2 = e.control;
	if(e.content) {
		e.preventDefault();
	}
}
