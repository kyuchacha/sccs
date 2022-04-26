/************************************************
* fullCalendar2.js
 * Created at 2022. 3. 8. 오전 10:15:13.
 *
 * @author aaajd
 ************************************************/

var elCalendar, fcCalendar;


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShlCalendarInit(e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlCalendar = e.control;
	// 캘린더가 이미 생성된 경우 preventDefault 실행
	if(elCalendar) {
		if(fcCalendar) fcCalendar.refetchEvents();
		e.preventDefault();
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlCalendarLoad(e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlCalendar = e.control;
	// 캘린더 그리기 위한 요소 추가
	if(!elCalendar) {
		elCalendar = document.createElement("calendar");
		e.content.appendChild(elCalendar);
	}
	
	// 캘린더 생성
	fcCalendar = new FullCalendar.Calendar(elCalendar, {
		googleCalendarApiKey: "AIzaSyBelxdJBd1pXW7owis2RF5gI_H4XxoOEH0",
		initialView: 'dayGridMonth',
		locale: 'ko',
		height: "100%",
		customButtons: {
			customPrevY: {	// 이전 연도로 이동
				icon: 'fc-icon-chevrons-left',
				click: function() {
					fcCalendar.prevYear();
					
				}
				
			},
			customPrev: {	// 이전 달로 이동
				icon: 'fc-icon-chevron-left',
				click: function() {
					fcCalendar.prev();
				}
			},
			customToday: {	// 오늘 날짜로 이동
				text: 'Today',
				click: function() {
					fcCalendar.today();
				}
				
			},
			customNext: {	// 다음 월로 이동
				icon: 'fc-icon-chevron-right',
				click: function() {
					fcCalendar.next();
				}
			},
			customNextY: {	// 다음 연도로 이동
				icon: 'fc-icon-chevrons-right',
				click: function() {
					fcCalendar.nextYear();
				}
			}
		},
		headerToolbar: { // 캘린더 헤더 툴바 설정
			left: 'customPrevY,customPrev,customToday,customNext,customNextY',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		allDaySlot: true,
		dayMaxEvents: true, // 최대 이벤트 개수
		displayEventTime: false, // 이벤트에 시간 표시 여부
		eventSources: [{ // 공휴일 데이터 추가
			googleCalendarId: "ko.south_korea.official#holiday@group.v.calendar.google.com",
			backgroundColor: "transparent",
			borderColor: "transparent",
			className: "kr-holiday",
			textColor: "red"
		}],
		eventOrder: "-resourceId", // 이벤트 정렬 기준 설정
		editable: true,
		dateClick: function(info) { // 날짜 클릭 시 발생할 이벤트
		},
		eventClick: function(info) { // 일정 클릭 시 발생할 이벤트
			// 이벤트 클릭 시 연결된 url로 이동하지 않도록 설정
			if (info.event.url) return info.jsEvent.preventDefault();
		},
		eventDrop: function(info) {
		},
		eventResize: function(info) {
		}
	});
	// 캘린더를 그려준다.
	fcCalendar.render();
}

/*
 * "https://fullcalendar.io/docs/initialize-globals" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	window.open('https://fullcalendar.io/docs/initialize-globals');
}

/*
 * 사용자 정의 컨트롤에서 afterLoad 이벤트 발생 시 호출.
 */
function onAce1AfterLoad(e){
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace1");
	vcAceEditor.value = onShlCalendarLoad;
}
