/************************************************
* ckEditor2.js
 * Created at 2022. 3. 8. 오전 11:28:19.
 *
 * @author aaajd
 ************************************************/



/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlCkEditorLoad(e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var content = e.content;
	
	shl1.registerComponent("ckeditor", content);
	var elckEditor = document.createElement("ckeditor");
	elckEditor.id = "sampleCkeditor";
	content.appendChild(elckEditor);
	
	var objEditor = CKEDITOR.replace(elckEditor, {
		width: 'auto',
		height:  window.innerHeight-500,
		allowedContent: true,
		//글자수 제한 없음
		wordcount: [{
			showCharCount: true
		}, {
			maxCharCount: -1
		}],
		startupFocus: true,
		on: {
			instanceReady: function(evt) {
				evt.editor.setReadOnly(false);
			}
		}
	});
	
	var vsEditorValue = "<p><span style='font-size: 18pt; color: rgb(0, 0, 0);'>안녕하세요!</span></p><p><span style='font-size: 24pt; color: rgb(0, 117, 200); background-color: rgb(255, 255, 255);'><b>eXBuilder6&nbsp;</b></span><span style='font-size: 24pt;'><span style='color: rgb(0, 117, 200);'><span style='color: rgb(255, 0, 0);'>CK 에디터</span> <span style='color: rgb(0, 0, 0);'>연동 샘플</span></span><span style='color: rgb(0, 0, 0);'>입니다.</span></span></p><p><br></p><div id='gtx-trans' style='position: absolute; left: -260px; top: -7px;'><div class='gtx-trans-icon'></div></div>";
	CKEDITOR.instances.sampleCkeditor.setData(vsEditorValue);
}

/*
 * "에디터 값 가져오기" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	/** 
	 * @type cpr.controls.Button
	 */
	getEditorValue();
}

function getEditorValue() {
	app.lookup("txaResult").value = CKEDITOR.instances.sampleCkeditor.getData();
}

/*
 * "https://ckeditor.com/ckeditor-4/download/" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://ckeditor.com/ckeditor-4/download/');
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = onShlCkEditorLoad + getEditorValue;
}
