




/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var vcGrd1 = app.lookup("grd1");
	var vcGrd2 = app.lookup("grd2");
	var vcGrd3 = app.lookup("grd3");
	var vcGrd4 = app.lookup("grd4");
	
	vcGrd1.clickMode = 'select';
	vcGrd2.clickMode = 'select';
	vcGrd3.clickMode = 'select';
	vcGrd4.clickMode = 'select';
	
	for (var i = 0; i <= 4; i++) {
		vcGrd1.header.getColumn(i).sortable = false;
		vcGrd2.header.getColumn(i).sortable = false;
		vcGrd3.header.getColumn(i).sortable = false;
		vcGrd4.header.getColumn(i).sortable = false;
	}
}
