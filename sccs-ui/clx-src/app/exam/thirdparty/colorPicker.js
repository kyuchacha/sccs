/************************************************
 * colorPicker.js
 * Created at 2019. 3. 11. 오전 8:36:49.
 *
 * @author kjyan
 ************************************************/


/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = setMiniColor;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	setMiniColor();
}

function setMiniColor() {
	cpr.core.ResourceLoader.loadScript('./thirdparty/jquery/jquery.min.js').then(function(input){
		cpr.core.ResourceLoader.loadScript('./thirdparty/jquery/jquery.minicolors.min.js').then(function(input){
			document.getElementById("text-field").value = "#ffcad6"; //setAttribute("value", vsColor);
			document.getElementById("background-field").style.backgroundColor = "#ffcad6";
			
			$('.demo').minicolors({
			  theme: 'default'
			});
		});
	});
}

/*
 * HTML 스니펫에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onColorpickerClick(e){
	/** 
	 * @type cpr.controls.HTMLSnippet
	 */
	var colorpicker = e.control;
	$('.demo').minicolors({
      theme: 'default'
    });
    
    document.getElementById("background-field").style.backgroundColor = document.getElementById("text-field").value;
}

/*
 * "색상표 팝업" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	colorDialogOpen();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = colorDialogOpen;
}

function colorDialogOpen() {
	app.openDialog("app/exam/thirdparty/colorDialog", {width : 850, height : 600}, function(dialog){
		dialog.addEventListener("load", function(e){
			app.lookup("grpColor").visible = false;
		});
		dialog.addEventListener("close", function(e){
			if (dialog.returnValue) {
				app.lookup("grpColor").visible = true;
				app.lookup("optColor").style.css({
					"background-color" : dialog.returnValue,
				});
				app.lookup("opt1").value = "색상 (" + dialog.returnValue + ") :"
			}
		});
		
	})
}
