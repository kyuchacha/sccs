package com.sccs.cm.sys.cmmn.constants;

/**
 * EPMS 선박관리시스템 권한 종류
 * @author cjlee
 */
public enum EpmsRoles {

	ROLE_CRW("B01", "승무원"),
	ROLE_ISTDR("B02", "기관장"),
	ROLE_MSTR("B03", "선장"),
	ROLE_OFCS_MNGR("B04", "공무감독관"),
	ROLE_BRFFC_HED("B05", "지사장"),
	ROLE_BSNS_MNGR("H01", "사업부관리자"),
	ROLE_SYS_MNGR("H02", "시스템관리자"),
	ROLE_MNTNCE("M01", "유지보수"),
	ROLE_MNTNCE_UP("M02", "유지보수(편집가능)"),
	ROLE_GUEST("Z99", "방문자");
	
	private String roleId;

	private String roleNm;
	
	EpmsRoles(final String roleId, final String roleNm) {
		this.roleId = roleId;
		this.roleNm = roleNm;
	}
	
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleNm() {
		return roleNm;
	}

	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}
	
	/**
	 * 역할ID와 일치하는 역할 정보 찾기
	 * @param roleId
	 * @return
	 */
	public static EpmsRoles find(final String roleId) {
		for (EpmsRoles role : values()) {
			if (role.roleId.equals(roleId)) {
				return role;
			}
		}
		return EpmsRoles.ROLE_GUEST;
	}
	
	/**
	 * 본사시스템관리자 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isSysMngr(final String roleId) {
		return ROLE_SYS_MNGR.getRoleId().equals(roleId);	// 시스템관리자
	}
	
	/**
	 * 시스템관리자, 유지보수(편집가능) 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isSysMngrMntnceUp(final String roleId) {
		return ROLE_SYS_MNGR.getRoleId().equals(roleId) ||	// 시스템관리자
			   ROLE_MNTNCE_UP.getRoleId().equals(roleId);	// 유지보수(편집가능)
	}
	
	/**
	 * 본사(시스템관리자, 사업부관리자, 유지보수(편집가능), 유지보수) 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isHedofc(final String roleId) {
		return ROLE_BSNS_MNGR.getRoleId().equals(roleId) ||	// 사업부관리자
			   ROLE_SYS_MNGR.getRoleId().equals(roleId) || // 시스템관리자
			   ROLE_MNTNCE_UP.getRoleId().equals(roleId) || // 유지보수(편집가능)
			   ROLE_MNTNCE.getRoleId().equals(roleId); // 유지보수
	}
	
	/**
	 * 지사 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isBrffc(final String roleId) {
		return ROLE_BRFFC_HED.getRoleId().equals(roleId) ||	// 지사장
			   ROLE_OFCS_MNGR.getRoleId().equals(roleId) ||	// 공무감독관
			   ROLE_CRW.getRoleId().equals(roleId) ||		// 승무원
			   ROLE_ISTDR.getRoleId().equals(roleId) ||		// 기관장
			   ROLE_MSTR.getRoleId().equals(roleId);		// 선장
	}
	
	/**
	 * 지사 상위(지사장, 공무감독관) 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isBrffcUpper(final String roleId) {
		return ROLE_BRFFC_HED.getRoleId().equals(roleId) ||	// 지사장
			   ROLE_OFCS_MNGR.getRoleId().equals(roleId);	// 공무감독관
	}
	
	/**
	 * 지사장 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isBrffcHed(final String roleId) {
		return ROLE_BRFFC_HED.getRoleId().equals(roleId);	// 지사장
	}
	
	/**
	 * 지사 공무감독관 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isOfcsMngr(final String roleId) {
		return ROLE_OFCS_MNGR.getRoleId().equals(roleId);	// 공무감독관
	}
	
	/**
	 * 지사 하위(선장, 기관장, 승무원) 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isBrffcLwprt(final String roleId) {
		return ROLE_CRW.getRoleId().equals(roleId) ||	// 승무원
			   ROLE_ISTDR.getRoleId().equals(roleId) ||	// 기관장
			   ROLE_MSTR.getRoleId().equals(roleId);	// 선장
	}
	
	/**
	 * 선장 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isMstr(final String roleId) {
		return ROLE_MSTR.getRoleId().equals(roleId);	// 선장
	}
	
	/**
	 * 기관장 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isIstdr(final String roleId) {
		return ROLE_ISTDR.getRoleId().equals(roleId);	// 기관장
	}
	
	/**
	 * 승무원 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isCrw(final String roleId) {
		return ROLE_CRW.getRoleId().equals(roleId);	// 승무원
	}
	
	/**
	 * 방문자 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isGuest(final String roleId) {
		return ROLE_GUEST.getRoleId().equals(roleId);	// 방문자
	}
	
	/**
	 * 전체 지사, 선박 열람 가능자 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isAllBrffcSelect(final String roleId) {
		return ROLE_BRFFC_HED.getRoleId().equals(roleId) ||	// 지사장
			   ROLE_BSNS_MNGR.getRoleId().equals(roleId) ||	// 사업부관리자
			   ROLE_SYS_MNGR.getRoleId().equals(roleId) ||	// 시스템관리자
			   ROLE_MNTNCE_UP.getRoleId().equals(roleId) || // 유지보수(편집가능)
			   ROLE_MNTNCE.getRoleId().equals(roleId);		// 유지보수
	}
	
	/**
	 * 전체 지사, 선박 편집 가능자 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isAllBrffcEdit(final String roleId) {
		return ROLE_BSNS_MNGR.getRoleId().equals(roleId) ||	// 사업부관리자
			   ROLE_SYS_MNGR.getRoleId().equals(roleId) ||	// 시스템관리자
			   ROLE_MNTNCE_UP.getRoleId().equals(roleId); // 유지보수(편집가능)
	}
	
	/**
	 * 본사(시스템관리자, 사업부관리자, 유지보수(편집가능), 유지보수)
	 * 또는 지사 상위(지사장, 공무감독관) 여부
	 * @param roleId
	 * @return
	 */
	public static boolean isHedofcOrBrffcUpper(final String roleId) {
		return isHedofc(roleId) || isBrffcUpper(roleId);
	}
}