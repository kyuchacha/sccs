package com.sccs.cm.sys.cmmn.constants;

/**
 * 공통 상수 모음
 * @author cjlee
 */
public class EpmsConstants {
	
	/**
	 * 첨부 가능 파일 확장자 목록 (전체)
	 */
	public static final String FILE_UPLOAD_ALL = ".doc,.hwp,.pdf,.xls,.xlsx,.txt,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.gif,.bmp";
	
	/**
	 * 첨부 가능 파일 확장자 목록 (문서파일만)
	 */
	public static final String FILE_UPLOAD_DOCS = ".doc,.hwp,.pdf,.xls,.xlsx,.txt,.ppt,.pptx,.zip";
	
	/**
	 * 첨부 가능 파일 확장자 목록 (이미지파일만)
	 */
	public static final String FILE_UPLOAD_IMAGES = ".jpg,.jpeg,.png,.gif,.bmp";
	
	/**
	 * 첨부 가능 파일 확장자 목록 (PDF파일만)
	 */
	public static final String FILE_UPLOAD_ONLY_PDF = ".pdf";
	
	/**
	 * 첨부 이미지 파일의 가로 최대 사이즈 (첨부한 이미지가 해당 사이즈를 초과할 경우 이미지를 축소 시킴)
	 */
	public static final int IMAGE_FILE_WIDTH_MAX_SIZE = 1024;
	
	
	/**
	 * 서버 모드 - 로컬
	 */
	public static final String SERVER_MODE_LOCAL = "local";
	
	/**
	 * 서버 모드 - 개발
	 */
	public static final String SERVER_MODE_DEV = "dev";
	
	/**
	 * 서버 모드 - 운영
	 */
	public static final String SERVER_MODE_OPER = "oper";
	
	
	/**
	 * CONNECT
	 */
	public static final String COMMON_CONNECT = "OVS.";
	
	/**
	 * 선용품용 공통 선박 코드
	 */
	public static final String COMMON_VSL_CD = "KOEM";
	
	
	/**
	 * 해상/육상 직원 구분. 육상
	 */
	public static final String STAFF_TYPE_GROUND = "2";
	
	/**
	 *  해상/육상 직원 구분. 해상
	 */
	public static final String STAFF_TYPE_SHIP = "3";
	
	
	/**
	 * 운영/지사 구분
	 * 운영부서로 전체지사(팀)의 정보를 관리한다.
	 */
	public static final String STAFF_TYPE2_MANAGE = "M";
	
	/**
	 * 지사로 자신의 지사정보만 관리한다.
	 */
	public static final String STAFF_TYPE2_TEAM = "T";
	
	
	/**
	 * T_DOC 문서 정보 문서 구분. 구매신청
	 */
	public static final String T_DOC_TYPE_2000 = "2000";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 검수
	 */
	public static final String T_DOC_TYPE_2004 = "2004";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 재고조정(기부속)
	 */
	public static final String T_DOC_TYPE_2006 = "2006";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 재고조정(선용품)
	 */
	public static final String T_DOC_TYPE_2008 = "2008";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 정기(상가)수리 신청
	 */
	public static final String T_DOC_TYPE_5100 = "5100";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 정기(상가)수리 결과
	 */
	public static final String T_DOC_TYPE_5104 = "5104";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 일반수리 신청
	 */
	public static final String T_DOC_TYPE_5000 = "5000";
	
	/**
	 * T_DOC 문서 정보 문서 구분. 일반수리 결과
	 */
	public static final String T_DOC_TYPE_5004 = "5004";
	
	
	/**
	 * 해상 직원 직책 구분. 선장
	 */
	public static final String SHIP_POSITION_CAPTAIN = "C";
	
	/**
	 * 해상 직원 직책 구분. 기관장
	 */
	public static final String SHIP_POSITION_CHIEF = "E";
	
	/**
	 * 해상 직원 직책 구분. 선원
	 */
	public static final String SHIP_POSITION_CREWMAN = "M";
	
	
	/**
	 * 승인 여부. No
	 */
	public static final String CONFIRM_N = "0";
	
	/**
	 * 승인 여부. Yes
	 */
	public static final String CONFIRM_Y = "1";
	
	
	/**
	 * 진행 상태. 정상 진행상태로 Confirm
	 */
	public static final String PROGRESS_CONFIRM = "0";
	
	/**
	 * 진행 상태. Pending
	 */
	public static final String PROGRESS_PENDING = "1";
	
	/**
	 * 진행 상태. Cancel
	 */
	public static final String PROGRESS_CANCEL = "2";
	
	/**
	 * 진행 상태. 법인카드(종결처리)
	 */
	public static final String PROGRESS_CARD = "3";
	
	
	/**
	 * 선종코드. 방제선
	 */
	public static final String TYPE_P_CD_01 = "01";
	
	/**
	 * 선종코드. 방제부선
	 */
	public static final String TYPE_P_CD_02 = "02";
	
	/**
	 * 선종코드. 청방선
	 */
	public static final String TYPE_P_CD_03 = "03";
	
	/**
	 * 선종코드. 예방선
	 */
	public static final String TYPE_P_CD_04 = "04";
	
	/**
	 * 선종코드. 환방선
	 */
	public static final String TYPE_P_CD_05 = "05";
	
	/**
	 * 선종코드. 작업선
	 */
	public static final String TYPE_P_CD_06 = "06";
	
	/**
	 * 선종코드. 기중기선
	 */
	public static final String TYPE_P_CD_07 = "07";
	
	
	/**
	 * 컬럼 Index. Sort
	 */
	public static final int COL_IDX_SORT = 3;
	
	/**
	 * 컬럼 명. Sort
	 */
	public static final String COL_NM_SORT = "code_sort";
	
	/**
	 * 컬럼 Index. Code
	 */
	public static final int COL_IDX_CODE_CD = 0;
	
	/**
	 * 컬럼 명. Code
	 */
	public static final String COL_NM_CODE_CD = "code_cd";
	
	/**
	 * 컬럼 Index. Code 명
	 */
	public static final int COL_IDX_CODE_NM = 1;
	
	/**
	 * 컬럼 명. Code 명
	 */
	public static final String COL_NM_CODE_NM = "code_nm";
	
	/**
	 * 컬럼 Index. Code 상세
	 */
	public static final int COL_IDX_CODE_DESC = 1;
	
	/**
	 * 컬럼 명. Code 상세
	 */
	public static final String COL_NM_CODE_DESC = "code_desc";
	
	
	/**
	 * 선박 부서 코드 테이블 코드 Row Index. 기관
	 */
	public static final int DEPT_ROW_IDX_ENGINE = 0;
	
	/**
	 * 선박 부서 코드 테이블 코드 Row Index. 선체
	 */
	public static final int DEPT_ROW_IDX_DECK = 1;
	
    
    /**
     * 항구 코드 테이블 코드 Row Index. 부산
     */
    public static final int PORT_CD_ROW_IDX_KRPUS = 0;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 인천
     */
    public static final int PORT_CD_ROW_IDX_KRINC = 1;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 여수
     */
    public static final int PORT_CD_ROW_IDX_KRYEO = 2;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 울산
     */
    public static final int PORT_CD_ROW_IDX_KRUSN = 3;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 대산
     */
    public static final int PORT_CD_ROW_IDX_KRTSN = 4;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 마산
     */
    public static final int PORT_CD_ROW_IDX_KRMAS = 5;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 동해
     */
    public static final int PORT_CD_ROW_IDX_KRDOH = 6;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 군산
     */
    public static final int PORT_CD_ROW_IDX_KRKUV = 7;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 포항
     */
    public static final int PORT_CD_ROW_IDX_KRKPO = 8;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 평택
     */
    public static final int PORT_CD_ROW_IDX_KRPYT = 9;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 목포
     */
    public static final int PORT_CD_ROW_IDX_KRMOK = 10;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 제주
     */
    public static final int PORT_CD_ROW_IDX_KRCHA = 11;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 기타 (국내)
     */
    public static final int PORT_CD_ROW_IDX_KRETC = 12;
    
    /**
     * 항구 코드 테이블 코드 Row Index. 기타 (해외)
     */
    public static final int PORT_CD_ROW_IDX_OSETC = 13;
    
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. PMS
     */
    public static final int DMD_RSN_ROW_IDX_PMS = 0;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. Survey
     */
    public static final int DMD_RSN_ROW_IDX_SURVEY = 1;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. A/S Repair
     */
    public static final int DMD_RSN_ROW_IDX_AS_REPAIR = 2;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. Recondition
     */
    public static final int DMD_RSN_ROW_IDX_RECONDITION = 3;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. Trouble
     */
    public static final int DMD_RSN_ROW_IDX_TROUBLE = 4;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. Accident
     */
    public static final int DMD_RSN_ROW_IDX_ACCIDENT = 5;
    
    /**
     * 수리 사유 코드 테이블 코드 Row Index. Etc
     */
    public static final int DMD_RSN_ROW_IDX_ETC = 6;
    
    
    /**
     * 선박 검사 기관 코드 테이블 코드 Row Index. 선급협회
     */
    public static final int CLASS_ID_ROW_IDX_KR = 0;
    
    /**
     * 선박 검사 기관 코드 테이블 코드 Row Index. 선박안전기술공단
     */
    public static final int CLASS_ID_ROW_IDX_KST = 1;
    
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index. 기부속
     */
    public static final int REQ_KIND_ROW_IDX_SPARE_PARTS = 0;
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index. 선용품
     */
    public static final int REQ_KIND_ROW_IDX_SHIP_STORE = 1;
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index. 연료유
     */
    public static final int REQ_KIND_ROW_IDX_FUEL_OIL = 2;
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index. 윤활유
     */
    public static final int REQ_KIND_ROW_IDX_LUB_OIL = 3;
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index. 청수
     */
    public static final int REQ_KIND_ROW_IDX_FRESH_WATER = 4;
    
    /**
     * 구매신청 구분 코드 테이블 코드 Row Index.  일반선용품(문구류등)
     */
    public static final int REQ_KIND_ROW_IDX_SPARE_GENANEL = 5;
    
    
    /**
     * 비정상 보급 구분 코드 테이블 코드 Row Index. Specification Discrepancy (사양 상이)
     */
    public static final int ABN_CD_ROW_IDX_S = 0;
    
    /**
     * 비정상 보급 구분 코드 테이블 코드 Row Index. Inferior Quality (불량품)
     */
    public static final int ABN_CD_ROW_IDX_I = 1;
    
    /**
     * 비정상 보급 구분 코드 테이블 코드 Row Index. Quantity Discrepancy (수량 상이)
     */
    public static final int ABN_CD_ROW_IDX_Q = 2;
    
    
    /**
     * 기부속 소모사유 코드 테이블 코드 Row Index. PMS
     */
    public static final int CON_RSN_ROW_IDX_PMS = 0;
    
    /**
     * 기부속 소모사유 코드 테이블 코드 Row Index. Repair
     */
    public static final int CON_RSN_ROW_IDX_REPAIR = 1;
    
    /**
     * 기부속 소모사유 코드 테이블 코드 Row Index. Trouble
     */
    public static final int CON_RSN_ROW_IDX_TROUBLE = 2;
    
    /**
     * 기부속 소모사유 코드 테이블 코드 Row Index. Dock (입거, 정기 수리)
     */
    public static final int CON_RSN_ROW_IDX_DOCK = 3;
    
    /**
     * 기부속 소모사유 코드 테이블 코드 Row Index. Others
     */
    public static final int CON_RSN_ROW_IDX_OTHERS = 4;
    
    
    /**
     * 재고조정 구분 코드 테이블 코드 Row Index. 기부속
     */
    public static final int STO_KIND_ROW_IDX_SPARE_PARTS = 0;
    
    /**
     * 재고조정 구분 코드 테이블 코드 Row Index. 선용품
     */
    public static final int STO_KIND_ROW_IDX_SHIP_STORE = 1;
    
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Lost
     */
    public static final int AC_SVY_CD_ROW_IDX_L = 0;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Broken
     */
    public static final int AC_SVY_CD_ROW_IDX_B = 1;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Disuse (Low Quality)
     */
    public static final int AC_SVY_CD_ROW_IDX_D = 2;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Initial Supply
     */
    public static final int AC_SVY_CD_ROW_IDX_F = 3;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. A/S (Free of Charge)
     */
    public static final int AC_SVY_CD_ROW_IDX_S = 4;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Search & Find Lost Item
     */
    public static final int AC_SVY_CD_ROW_IDX_I = 5;
    
    /**
     * 재고조정 사유 코드 테이블 코드 Row Index. Others
     */
    public static final int AC_SVY_CD_ROW_IDX_O = 6;
    
    
    /**
     * 사고구분 (운항/기관) 코드 테이블 코드 Row Index. 기관 사고
     */
    public static final int ACC_KIND_ROW_IDX_ENGINE = 0;
    
    /**
     * 사고구분 (운항/기관) 코드 테이블 코드 Row Index. 운항 사고
     */
    public static final int ACC_KIND_ROW_IDX_DECK = 1;
    
    
    /**
     * 자체수리 구분 코드 테이블 코드 Row Index. 단가표
     */
    public static final int PRICE_KIND_ROW_IDX_0 = 0;
    
    /**
     * 자체수리 구분 코드 테이블 코드 Row Index. 공임
     */
    public static final int PRICE_KIND_ROW_IDX_1 = 1;
    
    
    /**
     * 수리 구분 코드 테이블 코드 Row Index. 정기수리
     */
    public static final int REP_TYPE_ROW_IDX_0 = 0;
    
    /**
     * 수리 구분 코드 테이블 코드 Row Index. 일반수리
     */
    public static final int REP_TYPE_ROW_IDX_1 = 1;
    
    
    /**
     * 완료 구분 코드 테이블 코드 Row Index. 미완료
     */
    public static final int CMPL_CHK_ROW_IDX_0 = 0;
    
    /**
     * 완료 구분 코드 테이블 코드 Row Index. 완료
     */
    public static final int CMPL_CHK_ROW_IDX_1 = 1;
    
    
    /**
     * 수리 진행상태 코드 테이블 코드 Row Index. Cancel
     */
    public static final int REPAIR_STAT_ROW_IDX_CANCEL = 3;
    
    /**
     * 수리 진행상태 코드 테이블 코드 Row Index. Complete
     */
    public static final int REPAIR_STAT_ROW_IDX_COMPLETE = 1;
    
    
    /**
     * Item 검색 구분 코드 테이블 코드 Row Index. All
     */
    public static final int ITEM_SEARCH_TYPE_ROW_IDX_ALL = 0;
    
    /**
     * Item 검색 구분 코드 테이블 코드 Row Index. Reserved
     */
    public static final int ITEM_SEARCH_TYPE_ROW_IDX_RESERVED = 1;
    
    /**
     * Item 검색 구분 코드 테이블 코드 Row Index. Consumed
     */
    public static final int ITEM_SEARCH_TYPE_ROW_IDX_CONSUMED = 2;
    
    
    /**
     * 구매진행현황 진행상태 코드 테이블 코드 Row Index. Request
     */
    public static final int PURCHASE_STAT_ROW_IDX_REQUEST = 0;
    
    /**
     * 구매진행현황 진행상태 코드 테이블 코드 Row Index. Approval
     */
    public static final int PURCHASE_STAT_ROW_IDX_APPROVAL = 1;
    
    /**
     * 구매진행현황 진행상태 코드 테이블 코드 Row Index. Order
     */
    public static final int PURCHASE_STAT_ROW_IDX_ORDER = 2;
    
    /**
     * 구매진행현황 진행상태 코드 테이블 코드 Row Index. Cancel
     */
    public static final int PURCHASE_STAT_ROW_IDX_CANCEL = 3;
    
    /**
     * 구매진행현황 진행상태 코드 테이블 코드 Row Index. Complete
     */
    public static final int PURCHASE_STAT_ROW_IDX_COMPLETE = 4;
    
    
	/**
	 * 그룹웨어 연동 Form ID. 정기수리신청서
	 */
	public static final String GW_FORM_ID_TS = "0000000ts";
	
	/**
	 * 그룹웨어 연동 Form ID. 유류청구서
	 */
	public static final String GW_FORM_ID_TP = "0000008zd";
	
	/**
	 * 그룹웨어 연동 Form ID. 선용품청구서
	 */
	public static final String GW_FORM_ID_TL = "0000000tl";
	
	/**
	 * 그룹웨어 연동 Form ID. 물품유류검수조서
	 */
	public static final String GW_FORM_ID_TK = "0000000tk";
	
	/**
	 * 그룹웨어 연동 Form ID. 수리신청서
	 */
	public static final String GW_FORM_ID_TM = "0000000tm";
	
	/**
	 * 그룹웨어 연동 Form ID. 수리완료보고서
	 */
	public static final String GW_FORM_ID_TN = "0000000tn";
	
	/**
	 * 그룹웨어 연동 Form ID. 기부속청구서
	 */
	public static final String GW_FORM_ID_TJ = "0000000tj";
	
	/**
	 * 그룹웨어 연동 Form ID. 완공사양서
	 */
	public static final String GW_FORM_ID_TO = "0000000to";
	
	/**
	 * 그룹웨어 연동 Form ID. 사고보고서
	 */
	public static final String GW_FORM_ID_ACCIDENT = "00000019n";
	
	
	/**
	 * 그룹웨어 결재 상태값. 대기
	 */
	public static final String GW_APPROVAL_STATUS_00 = "00";
	
	/**
	 * 그룹웨어 결재 상태값. 진행
	 */
	public static final String GW_APPROVAL_STATUS_01 = "01";
	
	/**
	 * 그룹웨어 결재 상태값. 완료
	 */
	public static final String GW_APPROVAL_STATUS_10 = "10";
	
	/**
	 * 그룹웨어 결재 상태값. 반려
	 */
	public static final String GW_APPROVAL_STATUS_04 = "04";
	
	/**
	 * 그룹웨어 결재 상태값. 취소(회수)
	 */
	public static final String GW_APPROVAL_STATUS_05 = "05";
	
	/**
	 * 그룹웨어 결재 상태값. 예외
	 */
	public static final String GW_APPROVAL_STATUS_06 = "06";
	
	
	/**
	 * 계정 구분 코드 테이블 코드 Row Index
	 */
	public static final int ACCT_TYPE_ROW_IDX_0 = 0;
	
	/**
	 * 계정 구분 코드 테이블 코드 Row Index
	 */
	public static final int ACCT_TYPE_ROW_IDX_1 = 1;
	
	
	/**
	 * 그룹웨어 ITEM Table Name. COMMON_GW_IF_ITEM
	 */
	public static final String GW_ITEM_TABLE_NAME = "COMMON_GW_IF_ITEM";
	
	/**
	 * 그룹웨어 호출 URL.선박
	 */
	public static final String GW_URL_GIANMAIN = "http://gwd.koem.or.kr:8080/aintop/ATSource/at_Gian/VESSEL/GianMain.jsp?GWID={0}&EMPNO={1}&FORMID={2}&T={3}";
	
	
	/**
	 * 연료유 구분. 선박제원의 Gas_flg. 휘발유
	 */
	public static final String OIL_FLG_VOLATILE = "Y";
	
	/**
	 * 연료유 구분. 선박제원의 Gas_flg. 휘발유가 아님. 경유 또는 벙커A
	 */
	public static final String OIL_FLG_VOLATILE_NOT = "N";
	
	
	/**
	 * JSP 파일용 - 첨부 가능 파일 확장자 목록 (전체) 리턴
	 * @return
	 */
	public String getFILE_UPLOAD_ALL() {
		return FILE_UPLOAD_ALL;
	}

	/**
	 * JSP 파일용 - 첨부 가능 파일 확장자 목록 (문서파일만)
	 * @return
	 */
	public String getFILE_UPLOAD_DOCS() {
		return FILE_UPLOAD_DOCS;
	}

	/**
	 * JSP 파일용 - 첨부 가능 파일 확장자 목록 (이미지파일만)
	 * @return
	 */
	public String getFILE_UPLOAD_IMAGES() {
		return FILE_UPLOAD_IMAGES;
	}
	
	/**
	 * JSP 파일용 - 첨부 가능 파일 확장자 목록 (PDF파일만)
	 * @return
	 */
	public String getFILE_UPLOAD_ONLY_PDF() {
		return FILE_UPLOAD_ONLY_PDF;
	}
}