/************************************************
 * verticalXy.module.js
 * Created at 2021. 4. 27. 오후 5:11:58.
 * Main Contaner가 
 * @author pearl70
 ************************************************/

var mAppPropNm = "vXy" ;

/**
 * 화면이 load할때 형태분석 
 */
cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	/** @type cpr.core.AppInstance */
	var voApp = e.control; 

	if( !(  voApp instanceof cpr.core.AppInstance ) )  return;
	
	//main contaner가 vertical 이 아니면 return ;
	var voLayout = voApp.getContainer().getLayout();
	if(  ( voLayout instanceof cpr.controls.layouts.VerticalLayout ) == false  ) return ;
	
	var vsPro = voApp.getAppProperty(mAppPropNm); 
	if( vsPro == "Y") 
	    initVerticalXy ( voApp ) ; 
});


var vjVerticalConst = []; 
   
var vjLect = { 
	 heightTop     : 100 ,  //마지막 컨텐츠의 top
	 heightBottom  : 100 ,  //마지막 컨텐츠의 높이 + top  
	 curruntAppHeight : 100 ,   //윈도우의 현재 사이즈   
   	 curruntAppSpacing : 0  
}  
//resize대상 
var vaRsizeContaner = [] ;	 
var vaRsizeContanerHeight = [];
var mApp = null ;

window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() { 
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        verticalHightReSize(); 
       }, 66);
    }
  } 



/**
 * init 
 * @param {any} app
 */
function initVerticalXy(app){
	mApp = app ;
	verticalContain();
	verticalHightReSize();
} 
   
function verticalContain(){
   	
   if( mApp == null || mApp == undefined ) return ;
   
   var voAppContaner = mApp.getContainer();	 
   
   var voRect = voAppContaner.getActualRect();
   vjLect.curruntAppHeight  = voRect.height; //보이는 높이 
   
   
   var voAppLayout = voAppContaner.getLayout();
   vjLect.curruntAppSpacing = voAppLayout.spacing ; 
   //vertical layout만을 지원한다. 
   if( ! voAppLayout instanceof cpr.controls.layouts.VerticalLayout ) return ;
   
   var voContaners = voAppContaner.getChildren(); 
   var voLastChid  = null ;
   voContaners.forEach(function(/* cpr.controls.Container  */voChild, vnIndex ){
   	
//       var voConstaint = voAppContaner.getConstraint(voChild); 
//       var vnHeight  = vnX + voConstaint.height ;
//       if( vjLect.heightTop < vnX  ) vjLect.heightTop =  vnX ;
//       if( vjLect.heightBottom < vnHeight  ) vjLect.heightBottom = vnHeight ;
//       vnX   = vnX + vnHeight ;
       
       var voConstaint = voChild.getActualRect(); 
       var vnHeight  = voConstaint.height ;
       var vnTop     = voConstaint.top ;
       
       var vsRsYn = voChild.userAttr("verticalResize");
       if( vsRsYn == "Y" ) { 
          	vaRsizeContaner.push(voChild);  
       }
       
       if( vjLect.heightTop < vnTop  ) vjLect.heightTop =  vnTop ;
       if( vjLect.heightBottom < ( vnTop +  vnHeight ) ) vjLect.heightBottom = ( vnTop +  vnHeight ) ;
       
       voLastChid = voChild ;
   	   
   }); 
   
   if( vaRsizeContaner.length < 1 && voLastChid != null ){  
   	    var voConstaint = voLastChid.getActualRect(); 
        var vnHeight  = voConstaint.height ;
   		vaRsizeContaner.push(voLastChid); 
   }
   
   vaRsizeContaner.forEach(function(resizeCtr){
      	var voConstaint = voAppContaner.getConstraint(resizeCtr);  
      	if( voConstaint == undefined ) return ;
   	    vaRsizeContanerHeight.push(voConstaint.height); 
   }); 
   
}

/**
 * vertical resize 
 * vertical에 그룹으로 생성 한다. 
 */
function verticalHightReSize(){ 
	
   if( mApp == null || mApp == undefined ) return ;
	
   var voAppContaner = mApp.getContainer();	  
   var voRect = voAppContaner.getActualRect();
   vjLect.curruntAppHeight  = voRect.height; //보이는 높이 
   
   var voAppLayout = voAppContaner.getLayout();
   vjLect.curruntAppSpacing = voAppLayout.spacing ; 
   //vertical layout만을 지원한다. 
   if( ! voAppLayout instanceof cpr.controls.layouts.VerticalLayout ) return ;
   
   var vnHMargin = vjLect.curruntAppHeight - ( vjLect.heightBottom + vjLect.curruntAppSpacing ); 
   var vnDvAddHight = 0 ;
   if( vnHMargin > 0 ) {
   	   vnDvAddHight = Math.floor( vnHMargin / vaRsizeContaner.length ); 
   }else{
   	   vnDvAddHight = 0 ;
   }	   
	   //size를 변경한다.  
	   vaRsizeContaner.forEach(function(/* cpr.controls.Container  */ reSizecnt, ix ){
	   	    var voConstaint = voAppContaner.getConstraint(reSizecnt); 
	   	    if( voConstaint != null && voConstaint != undefined ){ 
	   	    voConstaint.height = addPx( vaRsizeContanerHeight[ix] , vnDvAddHight ) ; 
	   	    voAppContaner.updateConstraint(reSizecnt, voConstaint); 
//	   	    var tempHeight  = addPx( voConstaint.height , vnDvAddHight ) ; 
//            reSizecnt.style.css("height",tempHeight );
            }
	   });  
}

/**
 * px의 합산을 한다. 
 * @param {any} pParam1
 * @param {any} pParam2
 */
function addPx(pParam1, pParam2 ){
	var vnPram1 = 0 ;
	var vnPram2 = 0 ;
	if( pParam1 != null && pParam1 != "" && pParam1 != undefined  )
	   vnPram1 = Number( (pParam1 + "").replace("px","") ) ;
	   
	if( pParam2 != null && pParam2 != "" && pParam2 != undefined  )
	   vnPram2 = Number( (pParam2 + "").replace("px","") ) ;
	   
	return (vnPram1 + vnPram2) + "px"; 
	   
}




function EXvertivalXy() {
		this.voAppContaner = null ;
		this.vjVerticalConst = [] ;
		this.vaRsizeContaner = [] ;
		this.vaRsizeContanerHeight = [] ;
		this.mApp = null ;
		this.vjLect =  { 
					 heightTop     : 100 ,  //마지막 컨텐츠의 top
					 heightBottom  : 100 ,  //마지막 컨텐츠의 높이 + top  
					 curruntAppHeight : 100 ,   //윈도우의 현재 사이즈   
				   	 curruntAppSpacing : 0  
				   } ;  
     };
     
EXvertivalXy.prototype.initVerticalXy = function (app){  
	   var voAppContaner = mApp.getContainer();	  
	   var voAppLayout = voAppContaner.getLayout(); 
	   //vertical layout만을 지원한다. 
	   if( ! voAppLayout instanceof cpr.controls.layouts.VerticalLayout ) return false ;

        this.voAppContaner = app.getContainer() ;
		this.mApp = app ;
		this.verticalContain();
		this.verticalHightReSize();
		return true ;
} ;

EXvertivalXy.prototype.verticalContain = function(){
	
	   if( this.mApp == null || this.mApp == undefined ) return ;
	    
	   
	   var voRect = this.voAppContaner.getActualRect();
	   this.vjLect.curruntAppHeight  = voRect.height; //보이는 높이 
	   
	   
	   var voAppLayout = this.voAppContaner.getLayout();
	   this.vjLect.curruntAppSpacing = voAppLayout.spacing ; 
	   //vertical layout만을 지원한다. 
	   if( ! voAppLayout instanceof cpr.controls.layouts.VerticalLayout ) return ;
	   
	   var voContaners = this.voAppContaner.getChildren(); 
	   var voLastChid  = null ;
	   var pthis = this ;
	   voContaners.forEach(function(/* cpr.controls.Container  */voChild ){ 
	       
	       var voConstaint = voChild.getActualRect(); 
	       var vnHeight  = voConstaint.height ;
	       var vnTop     = voConstaint.top ;
	       
	       var vsRsYn = voChild.userAttr("verticalResize");
	       if( vsRsYn == "Y" ) { 
	          	vaRsizeContaner.push(voChild);  
	       }
	       
	       if( pthis.vjLect.heightTop < vnTop  ) vjLect.heightTop =  vnTop ;
	       if( pthis.vjLect.heightBottom < ( vnTop +  vnHeight ) ) pthis.vjLect.heightBottom = ( vnTop +  vnHeight ) ;
	       
	       voLastChid = voChild ;
	   	   
	   }, pthis); 
	   
	   if( vaRsizeContaner.length < 1 && voLastChid != null ){   
	   		vaRsizeContaner.push(voLastChid); 
	   }
	   
	   vaRsizeContaner.forEach(function(resizeCtr){
	      	var voConstaint = this.voAppContaner.getConstraint(resizeCtr);  
	   	    vaRsizeContanerHeight.push(voConstaint.height); 
	   } , pthis); 
  };
                  
 EXvertivalXy.prototype.verticalHightReSize = function(){
 	 
	   if( this.mApp == null || this.mApp == undefined ) return ; 
	   var pthis = this ;
	   var voRect = this.voAppContaner.getActualRect();
	   this.vjLect.curruntAppHeight  = voRect.height; //보이는 높이 
	   
	   var voAppLayout = this.voAppContaner.getLayout();
	   this.vjLect.curruntAppSpacing = voAppLayout.spacing ; 
	   //vertical layout만을 지원한다. 
	   if( ! voAppLayout instanceof cpr.controls.layouts.VerticalLayout ) return ;
	   
	   var vnHMargin = this.vjLect.curruntAppHeight - ( this.vjLect.heightBottom + this.vjLect.curruntAppSpacing ); 
	   var vnDvAddHight = 0 ;
	   if( vnHMargin > 0 ) {
	   	   vnDvAddHight = Math.floor( vnHMargin / this.vaRsizeContaner.length ); 
	   }else{
	   	   vnDvAddHight = 0 ;
	   }	   
	   //size를 변경한다.  
	   vaRsizeContaner.forEach(function(/* cpr.controls.Container  */ reSizecnt, ix ){
	   	    var voConstaint = this.voAppContaner.getConstraint(reSizecnt); 
	   	    voConstaint.height = addPx( pthis.vaRsizeContanerHeight[ix] , vnDvAddHight ) ; 
	   	    pthis.voAppContaner.updateConstraint(reSizecnt, voConstaint);  
	   }, pthis);   
	} 
 
