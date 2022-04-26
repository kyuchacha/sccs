/************************************************
 * imageViewer.js
 * Created at 2022. 1. 5. 오후 6:16:39.
 *
 * @author LHS_0212
 ************************************************/



/**
 * 
 * @param {cpr.controls.Container} group
 */
function imageViewer(group){
	
	if (group.userAttr("imageViewer") != "true"){
		return;
	}
	
	var vaImage = []; // 이미지 배열
	vaImage = group.getChildren().filter(function(control){
		return control.type == "image";
	});
	
	/* 그룹 내 모든 이미지 컨트롤에 click 이벤트 리스너 등록 +  */
	vaImage.forEach(function(/* cpr.controls.Image */image){
		image.addEventListener("click", function(e){
			/* 이미지 뷰어 UDC 생성  */
			var udcImageViewer = new udc.etc.udcImageViewer("udcImageViewer");
			udcImageViewer.setAppProperty("imagesArr", vaImage);
			udcImageViewer.setAppProperty("clickImageId", e.control.id);
			
			app.getRootAppInstance().floatControl(udcImageViewer, {
				top : "0px",
				bottom : "0px",
				left : "0px",
				right : "0px"
			});
		});
	});
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad2(e){
	var vcGrpImageList = app.lookup("grpImageList");
	
	imageViewer(vcGrpImageList);
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = imageViewer;
}
