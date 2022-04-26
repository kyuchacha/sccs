/************************************************
 * imageViewer.js
 * Created at 2022. 1. 18. 오후 9:45:18.
 *
 * @author jysh0
 ************************************************/

/**
 * @type {Array} 
 * 이미지 컨트롤 객체 배열
 */
var vaImage = [];

// 현재 보여지는 이미지 컨트롤 id
var viewingImageId;
// 현재 보여지는 이미지 컨트롤 index
var viewingImageIndex;


/**
 * 이미지 뷰어 기능을 실행합니다.
 */
function goImageViewer() {
	vaImage = app.getAppProperty("imagesArr");
	viewingImageId = app.getAppProperty("clickImageId");
	
	var imageBox = app.lookup("imageBox");
	var imageViewer = app.lookup("imageViewer");
	
	vaImage.forEach(function(/* cpr.controls.Image */image, index){
		if (image.id == viewingImageId){
			var imgSrc = image.src;
			var imgWidth = image.naturalWidth;
			var imgHeight = image.naturalHeight;
			
			app.getContainer().updateConstraint(imageBox, {
				width : imgWidth + "px",
				height : imgHeight + "px",
				left : "calc(50% - " + imgWidth/2 + "px" + ")",
				top : "calc(50% - " + imgHeight/2 + "px" + ")"
			});
			
			imageViewer.src = imgSrc;
			
			viewingImageIndex = index;
			
			imageViewer.focus();
		}
	});
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		setDragSource(imageBox);
	});
}


/**
 * 드래그 소스 설정
 * @param {cpr.controls.Container} grp
 */
function setDragSource(grp){
	var control = grp;

	var actualRect = control.getActualRect();
//	console.log(control);
//	console.log(actualRect);
	
	new cpr.controls.DragSource(control, {
		options:{
			dataType : "text",
			threadhold: 10 // 10px만큼 이동해야 드래그시작으로 인식
			},
		onDragStart : function(context){
			context.cursor = "default";
	  		app.getContainer().floatControl(control, cpr.controls.layouts.XYLayout.createConstraintWithRect(actualRect));			
		},
		onDragMove : function(context){
		  	context.cursor = "default";
		  	var newRect = actualRect.getTranslated(context.dragDelta);
	  		app.getContainer().floatControl(control, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
		},
		onDragEnd : function(context){
		  	context.cursor = "";
		  	actualRect = control.getActualRect();
		}
	});
}


/**
 * 현재 띄워진 이미지 정보를 통해 다음 또는 이전 이미지로 이동
 * @param {String} direction
 */
function imageSrcChange(direction){
	
	var imageBox = app.lookup("imageBox");
	var imageViewer = app.lookup("imageViewer");
	var toolbar = app.lookup("toolbar");
	
	var imgWidth;
	var imgHeight;
	
	imageBox.style.removeStyle("transform");
	imageBox.style.removeStyle("transition-duration");
	imageBox.style.removeStyle("zoom");
	
	var tempImage;
	if(direction == "left") {
		for(var i = vaImage.length - 1; i >= 0; i--){
			if (i == viewingImageIndex){
				
				tempImage = vaImage[i - 1];
				if (tempImage != undefined){
					
					imgWidth = tempImage.naturalWidth;
					imgHeight = tempImage.naturalHeight;
					
					app.getContainer().floatControl(imageBox, {
						width : imgWidth + "px",
						height : imgHeight + "px",
						left : "calc(50% - " + imgWidth/2 + "px" + ")",
						top : "calc(50% - " + imgHeight/2 + "px" + ")"
					});
					
					imageViewer.src = tempImage.src;
					viewingImageId = tempImage.id;
					viewingImageIndex = i - 1;
					break
				}
			}
		}
	}
	else if (direction == "right"){
		for(var i = 0; i < vaImage.length; i++){
			if (i == viewingImageIndex){
				
				var tempImage = vaImage[i + 1];
				if (tempImage != undefined){
					
					imgWidth = tempImage.naturalWidth;
					imgHeight = tempImage.naturalHeight;
					
					app.getContainer().floatControl(imageBox, {
						width : imgWidth + "px",
						height : imgHeight + "px",
						left : "calc(50% - " + imgWidth/2 + "px" + ")",
						top : "calc(50% - " + imgHeight/2 + "px" + ")"
					});
					
					imageViewer.src = tempImage.src;
					viewingImageId = tempImage.id;
					viewingImageIndex = i + 1;
					break
				}
			}
		}
	}
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		toolbar.style.css("z-index", "10");
		
		nowZoom = 100;
		
		setDragSource(app.lookup("imageBox"));
	});
}


var rotateVal = 0;
/**
 * 
 * @param {cpr.controls.Container} imageBox
 * @param {String} direction left 또는 right
 */
function rotate(imageBox, direction){
	var imgTranfrom = (imageBox.style.css("transform"));
	
	if (rotateVal != 0){
		imgTranfrom = imgTranfrom.replace("rotate", "");
		imgTranfrom = imgTranfrom.replace("(", "");
		imgTranfrom = imgTranfrom.replace(")", "");
		imgTranfrom = imgTranfrom.replace("deg", "");
		rotateVal = Number(imgTranfrom);
	}
	
	if (rotateVal == 0){
		if (direction == "right"){
			rotateVal += 90;
			imageBox.style.css({
				"transform" : "rotate(" + rotateVal + "deg)",
			 	"transition-duration" : "0.5s"
			});
		}
		else if(direction == "left") {
			rotateVal -= 90;
			imageBox.style.css({
				"transform" : "rotate(" + rotateVal + "deg)",
			 	"transition-duration" : "0.5s"
			});
		}
	}
	else {
		if (direction == "right"){
			rotateVal += 90;
			imageBox.style.css({
				"transform" : "rotate(" + rotateVal + "deg)",
			 	"transition-duration" : "0.5s"
			});
		}
		else if(direction == "left") {
			rotateVal -= 90;
			imageBox.style.css({
				"transform" : "rotate(" + rotateVal + "deg)",
			 	"transition-duration" : "0.5s"
			});
		}
	}
}


var nowZoom = 100;
/**
 * 
 * @param {cpr.controls.Container} imageBox
 * @param {String} option in 또는 out
 */
function zoom(imageBox, option){
	if (option == "in"){
		nowZoom += 10;
		imageBox.style.css("zoom", nowZoom + "%");
		if (nowZoom >= 130){
			nowZoom = 130;
			imageBox.style.css("zoom", 130 + "%");
		}
	}
	else if(option == "out") {
		nowZoom -= 10;
		imageBox.style.css("zoom", nowZoom + "%");
		if (nowZoom <= 70){
			nowZoom = 70;
			imageBox.style.css("zoom", 70 + "%");
		}
	}
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	goImageViewer();
}


/*
 * 루트 컨테이너에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick(/* cpr.events.CMouseEvent */ e){
	/**
	 * @type {cpr.controls.Container}
	 */
	var targetControl = e.targetControl;
	
	if (targetControl.type == "container" && targetControl.style.hasClass("grp-overlay")){
		app.getRootAppInstance().lookup("udcImageViewer").dispose();
	}
}


/*
 * "이전" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	imageSrcChange("left");
}


/*
 * "다음" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	imageSrcChange("right");
}


/*
 * 축소 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var imageBox = app.lookup("imageBox");
	zoom(imageBox, "out");
}


/*
 * 확대 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var imageBox = app.lookup("imageBox");
	zoom(imageBox, "in");
}


/*
 * 왼쪽 회전 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var imageBox = app.lookup("imageBox");
	rotate(imageBox, "left");
}


/*
 * 오른쪽 회전 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var imageBox = app.lookup("imageBox");
	rotate(imageBox, "right");
}


/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImageViewerClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var imageViewer = e.control;
}

/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(e){
	if (e.key == 'Escape') {
		app.getRootAppInstance().lookup("udcImageViewer").dispose();
	}
}
