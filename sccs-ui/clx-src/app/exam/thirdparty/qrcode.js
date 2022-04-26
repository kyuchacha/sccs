/************************************************
* qrcode2.js
 * Created at 2022. 3. 8. 오전 11:02:22.
 *
 * @author aaajd
 ************************************************/

/*
 * "https://github.com/mebjas/html5-qrcode" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://github.com/mebjas/html5-qrcode');
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = qrLoad;
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlQrcodeLoad(e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	qrLoad(e);
}

function qrLoad(e) {
	var elqrcode = document.createElement("div");
	e.content.appendChild(elqrcode).id = "qr-reader";
	var elqrcoderesult = document.createElement("div");
	e.content.appendChild(elqrcoderesult).id = "qr-reader-results";
	
	function docReady(fn) {
		// see if DOM is already available
		if (document.readyState === "complete" ||
			document.readyState === "interactive") {
			// call on next available tick
			setTimeout(fn, 1);
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}
	
	docReady(function() {
		var resultContainer = document.getElementById('qr-reader-results');
		var lastResult, countResults = 0;
		
		function onScanSuccess(decodedText, decodedResult) {
			if (decodedText !== lastResult) {
				++countResults;
				lastResult = decodedText;
			
			}

			app.lookup("txaResult").value = lastResult ;
			window.open(lastResult)
		}
		
		var html5QrcodeScanner = new Html5QrcodeScanner(
			"qr-reader", {
				fps: 10,
				qrbox: 250
			});
		html5QrcodeScanner.render(onScanSuccess);
	});
}