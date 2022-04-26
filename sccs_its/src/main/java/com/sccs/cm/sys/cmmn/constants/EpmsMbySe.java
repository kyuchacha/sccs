package com.sccs.cm.sys.cmmn.constants;

/**
 * EPMS 선박관리시스템 주체 구분 코드
 * @author cjlee
 */
public enum EpmsMbySe {

	MBY_SHIP("S", "선박"),
	MBY_BRANCH_OFFICE("B", "지사"),
	MBY_PERSONAL("P", "개인");
	
	private String mbySeCd;

	private String mbySeNm;
	
	EpmsMbySe(final String mbySeCd, final String mbySeNm) {
		this.mbySeCd = mbySeCd;
		this.mbySeNm = mbySeNm;
	}
	
	public String getMbySeCd() {
		return mbySeCd;
	}

	public void setMbySeCd(String mbySeCd) {
		this.mbySeCd = mbySeCd;
	}

	public String getMbySeNm() {
		return mbySeNm;
	}

	public void setMbySeNm(String mbySeNm) {
		this.mbySeNm = mbySeNm;
	}
	
	/**
	 * 주체구분코드와 일치하는 주체 정보 찾기
	 * @param mbySeCd
	 * @return
	 */
	public static EpmsMbySe find(final String mbySeCd) {
		for (EpmsMbySe mby : values()) {
			if (mby.mbySeCd.equals(mbySeCd)) {
				return mby;
			}
		}
		return null;
	}
	
	/**
	 * 주체구분코드와 일치하는 주체 존재 여부 리턴
	 * @param mbySeCd
	 * @return
	 */
	public static boolean contains(final String mbySeCd) {
		for (EpmsMbySe mby : values()) {
			if (mby.mbySeCd.equals(mbySeCd)) {
				return true;
			}
		}
		return false;
	}
}