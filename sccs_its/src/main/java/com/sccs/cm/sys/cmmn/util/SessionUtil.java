package com.sccs.cm.sys.cmmn.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import com.sccs.cm.sys.cmmn.constants.EpmsRoles;
import com.google.gson.Gson;

import egovframework.rte.fdl.cmmn.exception.EgovBizException;

/**
 * 세션 유틸
 * @author cjlee
 */
public class SessionUtil {
	
	/**
	 * 세션 정보 보관 키
	 */
	public static final String SESSION_ID = "sInfo";
	
	/**
	 * 접근 가능 메뉴 정보 세션 키
	 */
	public static final String SESSION_MENU_ID = "sMenu";
	
	/**
	 * 접근 가능 지사 목록 세션 키
	 */
	public static final String SESSION_BRFFC_ROLE_LIST = "sMyBrffcRoleList";
	public static final String SESSION_BRFFC_ROLE_JSON_LIST = "sMyBrffcRoleJsonList";
	
	/**
	 * 접근 가능 지사/선박 목록 세션 키
	 */
	public static final String SESSION_SHIP_ROLE_LIST = "sMyShipRoleList";
	public static final String SESSION_SHIP_ROLE_JSON_LIST = "sMyShipRoleJsonList";
	
	/**
	 * 조회 가능 지사/선박 목록 세션 키
	 */
	public static final String SESSION_SHIP_SELECT_LIST = "sMyShipSelectList";
	public static final String SESSION_SHIP_SELECT_JSON_LIST = "sMyShipSelectJsonList";
	
	/**
	 * 편집 가능 지사/선박 목록 세션 키
	 */
	public static final String SESSION_SHIP_EDIT_LIST = "sMyShipEditList";
	public static final String SESSION_SHIP_EDIT_JSON_LIST = "sMyShipEditJsonList";
	
	/**
	 * 전체 지사/선박 목록 세션 키
	 */
	public static final String SESSION_SHIP_ALL_LIST = "sShipAllList";
	public static final String SESSION_SHIP_ALL_JSON_LIST = "sShipAllJsonList";
	
	/**
	 * 지사장, 공무감독 여부
	 */
	public static final String IS_BRFFC_UPPER = "isBrffcUpper";
	
	/**
	 * 지사장 여부
	 */
	public static final String IS_BRFFC_HED = "isBrffcHed";
	
	/**
	 * 공무감독 여부
	 */
	public static final String IS_OFCS_MNGR = "isOfcsMngr";
	
	/**
	 * 선장, 기관장, 승무원 여부
	 */
	public static final String IS_BRFFC_LWPRT = "isBrffcLwprt";
	
	/**
	 * 선장 여부
	 */
	public static final String IS_MSTR = "isMstr";
	
	/**
	 * 기관장 여부
	 */
	public static final String IS_ISTDR = "isIstdr";
	
	/**
	 * 승무원 여부
	 */
	public static final String IS_CRW = "isCrw";
	
	/**
	 * 시스템관리자, 유지보수(편집가능) 여부
	 */
	public static final String IS_SYS_MNGR_MNTNCE_UP = "isSysMngrMntnceUp";
	
	/**
	 * 전체 지사, 선박 편집 가능자 여부 (사업부관리자, 시스템관리자, 유지보수(편집가능))
	 */
	public static final String IS_ALL_BRFFC_EDIT = "isAllBrffcEdit";
	
	/**
	 * attribute 값을 가져 오기 위한 method
	 *
	 * @param String  attribute key name
	 * @return Object attribute obj
	 */
	public static Object getAttribute(String name) throws Exception {
		return (Object)RequestContextHolder.getRequestAttributes().getAttribute(name, RequestAttributes.SCOPE_SESSION);
	}
	
	/**
	 * attribute 설정 method
	 *
	 * @param String  attribute key name
	 * @param Object  attribute obj
	 * @return void
	 */
	public static void setAttribute(String name, Object object) throws Exception {
		RequestContextHolder.getRequestAttributes().setAttribute(name, object, RequestAttributes.SCOPE_SESSION);
	}
	
	/**
	 * 설정한 attribute 삭제
	 *
	 * @param String  attribute key name
	 * @return void
	 */
	public static void removeAttribute(String name) throws Exception {
		RequestContextHolder.getRequestAttributes().removeAttribute(name, RequestAttributes.SCOPE_SESSION);
	}
	
	/**
	 * session id
	 *
	 * @param void
	 * @return String SessionId 값
	 */
	public static String getSessionId() throws Exception {
		return RequestContextHolder.getRequestAttributes().getSessionId();
	}
	
	/**
	 * sInfo map 세션 정보 취득
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Map<String,Object> getSinfoMap() throws Exception {
		Map obj = (Map<String,Object>)getAttribute(SESSION_ID);
		return obj != null ? obj : new HashMap();
	}
	
	/**
	 * 세션 정보 map에 오브젝트 추가
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static void putSinfo(String key, Object value) throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		if (sMap != null) {
			sMap.put(key, value);
			setAttribute(SESSION_ID, sMap);
		}
	}
	
	/**
	 * sInfo 세션 정보 내 object 취득
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Object getSinfo(String key) throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? sMap.get(key) : null;
	}
	
	/**
	 * sInfo 세션 정보 내 object 삭제
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Object removeSinfo(String key) throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? sMap.remove(key) : null;
	}
	
	/**
	 * 사번 조회
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getEmpno() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("empno") : "";
	}
	
	/**
	 * 직원명 조회
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getEmpNm() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("empNm") : "";
	}
	
	/**
	 * 역할ID(권한, ROLE_ID) 조회
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getRoleId() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("roleId") : "";
	}
	
	/**
	 * 선박중심용 지사코드 조회 (승무원, 기관장, 선장만 해당, 그 외 빈값)
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getMyBrffcCd() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("myBrffcCd") : "";
	}
	
	/**
	 * 선박중심용 선박코드 조회 (승무원, 기관장, 선장만 해당, 그 외 빈값)
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getMyShipCd() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("myShipCd") : "";
	}
	
	/**
	 * 선박중심용 선박명 조회 (승무원, 기관장, 선장만 해당, 그 외 빈값)
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getMyShipNm() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("myShipNm") : "";
	}
	
	/**
	 * 선박중심용 선종코드 조회 (승무원, 기관장, 선장만 해당, 그 외 빈값)
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getMyShipSeCd() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("myShipSeCd") : "";
	}
	
	/**
	 * 선박중심용 선종명 조회 (승무원, 기관장, 선장만 해당, 그 외 빈값)
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static String getMyShipSeNm() throws Exception {
		Map<String,Object> sMap = (Map<String,Object>)getAttribute(SESSION_ID);
		return sMap != null ? (String)sMap.get("myShipSeNm") : "";
	}
	
	/**
	 * 지사 상위(지사장, 공무감독관) 직원 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isBrffcUpper() throws Exception {
		return EpmsRoles.isBrffcUpper(getRoleId());
	}

	/**
	 * 지사장 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isBrffcHed() throws Exception {
		return EpmsRoles.isBrffcHed(getRoleId());
	}
	
	/**
	 * 공무감독관 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isOfcsMngr() throws Exception {
		return EpmsRoles.isOfcsMngr(getRoleId());
	}
	
	/**
	 * 지사 하위(선장, 기관장, 승무원) 직원 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isBrffcLwprt() throws Exception {
		return EpmsRoles.isBrffcLwprt(getRoleId());
	}

	/**
	 * 선장 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isMstr() throws Exception {
		return EpmsRoles.isMstr(getRoleId());
	}

	/**
	 * 기관장 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isIstdr() throws Exception {
		return EpmsRoles.isIstdr(getRoleId());
	}

	/**
	 * 승무원 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isCrw() throws Exception {
		return EpmsRoles.isCrw(getRoleId());
	}
	
	/**
	 * 시스템관리자, 유지보수(편집가능) 직원 여부
	 * @return
	 * @throws Exception
	 */
	public static boolean isSysMngrMntnceUp() throws Exception {
		return EpmsRoles.isSysMngrMntnceUp(getRoleId());
	}
	
	/**
	 * 전체 지사 열람 가능 직원 여부 (사업부관리자, 시스템관리자, 지사장, 유지보수(편집가능), 유지보수)
	 * @return
	 * @throws Exception
	 */
	public static boolean isAllBrffcSelect() throws Exception {
		return EpmsRoles.isAllBrffcSelect(getRoleId());
	}
	
	/**
	 * 전체 지사 편집 가능 직원 여부 (사업부관리자, 시스템관리자, 유지보수(편집가능))
	 * @return
	 * @throws Exception
	 */
	public static boolean isAllBrffcEdit() throws Exception {
		return EpmsRoles.isAllBrffcEdit(getRoleId());
	}
	
	/**
	 * 본사 또는 지사상위 (사업부,시스템,유지보수+편집,지사장,공무감독)
	 * @return
	 * @throws Exception
	 */
	public static boolean isHedofcOrBrffcUpper() throws Exception {
		return EpmsRoles.isHedofcOrBrffcUpper(getRoleId());
	}

	/**
	 * 조회 가능 선박 코드 목록 취득
	 * @param brffcCd
	 * @param shipCd
	 * @return
	 * @throws Exception
	 * @throws EgovBizException
	 */
	@SuppressWarnings("unchecked")
	public static List<String> getShipSelectRoleList(String brffcCd, String shipCd) throws Exception, EgovBizException {
		
		String _brffcCd = StringUtils.defaultIfEmpty(brffcCd, "");
		String _shipCd = StringUtils.defaultIfEmpty(shipCd, "");
		
		boolean isRoleChkTarget = StringUtils.isNotEmpty(_brffcCd) && StringUtils.isNotEmpty(_shipCd); // 권한 체크 대상 여부
		boolean isExiRole = false;
		
		List<String> selectShipList = new ArrayList<String>();
		List<Map> roleList = (List<Map>)getSinfo(SESSION_SHIP_SELECT_LIST);
		
		if (roleList != null && !roleList.isEmpty()) {
			
			// 지사가 빈 값인 경우 가장 첫번째 지사로 셋팅
			if (StringUtils.isEmpty(brffcCd)) {
				_brffcCd = (String)roleList.get(0).get("brffcCd");
			}
			
			for (Map roleMap : roleList) {
				
				// 권한 체크 대상이면서 보유 조회 가능 지사/선박 목록에 포함된 경우 
				if (isRoleChkTarget && _brffcCd.equals(roleMap.get("brffcCd")) && _shipCd.equals(roleMap.get("shipCd"))) {
					isExiRole = true;
				}
				
				if (_brffcCd.equals(roleMap.get("brffcCd"))) {
					if (StringUtils.isNotEmpty(_shipCd) && _shipCd.equals(roleMap.get("shipCd"))) {
						selectShipList.add(_shipCd);
					} else if (StringUtils.isEmpty(_shipCd)) {
						selectShipList.add((String)roleMap.get("shipCd"));
					}				
				}
			}
			if ((isRoleChkTarget == true && isExiRole == false) || selectShipList.isEmpty()) {
				throw new EgovBizException("해당 지사 및 선박의 정보를 조회할 수 있는 권한을 보유하고 있지 않습니다.");
			}
			
		} else {
			throw new EgovBizException("권한을 전혀 보유하고 있지 않습니다.");
		}

		return selectShipList;
	}
	
	/**
	 * 조회 가능 선박 코드 목록 취득(GUEST 권한만 사용)
	 * @param brffcCd
	 * @param shipCd
	 * @return
	 * @throws Exception
	 * @throws EgovBizException
	 */
	@SuppressWarnings("unchecked")
	public static List<String> getShipSelectRoleListByGuest(String brffcCd, String shipCd) throws Exception, EgovBizException {
		
		String _brffcCd = StringUtils.defaultIfEmpty(brffcCd, "");
		String _shipCd  = StringUtils.defaultIfEmpty(shipCd, "");
		
		boolean isRoleChkTarget = StringUtils.isNotEmpty(_brffcCd) && StringUtils.isNotEmpty(_shipCd); // 권한 체크 대상 여부
		boolean isExiRole = false;
		
		List<String> selectShipList = new ArrayList<String>();
		List<Map> roleList = (List<Map>)getSinfo(SESSION_SHIP_ALL_LIST);
		
		if (roleList != null && !roleList.isEmpty()) {
			// 지사가 빈 값인 경우 가장 첫번째 지사로 셋팅
			if (StringUtils.isEmpty(brffcCd)) {
				_brffcCd = (String)roleList.get(0).get("brffcCd");
			}
			
			for (Map roleMap : roleList) {
				// 권한 체크 대상이면서 보유 조회 가능 지사/선박 목록에 포함된 경우 
				if (isRoleChkTarget && _brffcCd.equals(roleMap.get("brffcCd")) && _shipCd.equals(roleMap.get("shipCd"))) {
					isExiRole = true;
				}
				
				if (_brffcCd.equals(roleMap.get("brffcCd"))) {
					if (StringUtils.isNotEmpty(_shipCd) && _shipCd.equals(roleMap.get("shipCd"))) {
						selectShipList.add(_shipCd);
					} else if (StringUtils.isEmpty(_shipCd)) {
						selectShipList.add((String)roleMap.get("shipCd"));
					}				
				}
			}
			if ((isRoleChkTarget == true && isExiRole == false) || selectShipList.isEmpty()) {
				throw new EgovBizException("해당 지사 및 선박의 정보를 조회할 수 있는 권한을 보유하고 있지 않습니다.");
			}
		} else {
			throw new EgovBizException("권한을 전혀 보유하고 있지 않습니다.");
		}
		return selectShipList;
	}

	/**
	 * 지사/선박 권한 및 역할 권한 보유 체크
	 * @param brffcShipCd 지사 또는 선박코드
	 * @param isHoldRole 보유 권한그룹 체크용 ex) SessionUtil.isSysMngrMntnceUp()
	 * @throws Exception
	 * @throws EgovBizException
	 */
	@SuppressWarnings("unchecked")
	public static void chkBrffcShipRole(String brffcShipCd, boolean isHoldRole) throws Exception, EgovBizException {
		boolean isExiRole = false;
		String _brffcShipCd = StringUtils.defaultIfEmpty(brffcShipCd, ""); // 지사 or 선박코드
		
		List<Map> brffcRoleList = (List<Map>)getSinfo(SESSION_BRFFC_ROLE_LIST);
		for (Map roleMap : brffcRoleList) {
			if (_brffcShipCd.equals(roleMap.get("brffcCd"))) {
				isExiRole = true;
			}
		}
		
		List<Map> shipRoleList = (List<Map>)getSinfo(SESSION_SHIP_ROLE_LIST);
		for (Map roleMap : shipRoleList) {
			if (_brffcShipCd.equals(roleMap.get("shipCd"))) {
				isExiRole = true;
			}
		}
		
		if (isExiRole == false || isHoldRole == false) {
			throw new EgovBizException("해당 정보의 편집 권한을 보유하고 있지 않습니다.");
		}
	}

	/**
	 * 지사 및 선박 권한만 보유 체크
	 * @param shipCd
	 * @throws Exception
	 * @throws EgovBizException
	 */
	public static void chkBrffcShipRole(String shipCd) throws Exception, EgovBizException {
		chkBrffcShipRole(shipCd, true);
	}

	/**
	 * 역할 권한 보유 체크
	 * @param isHoldRole
	 * @throws Exception
	 * @throws EgovBizException
	 */
	public static void chkBrffcShipRole(boolean isHoldRole) throws Exception, EgovBizException {
		if (isHoldRole == false) {
			throw new EgovBizException("해당 정보의 편집 권한을 보유하고 있지 않습니다.");
		}
	}
	
	/**
	 * 조회 및 편집 가능 지사/선박 목록 세션 셋팅
	 * @param brffcCd
	 * @param shipCd
	 * @throws Exception
	 * @throws EgovBizException
	 */
	@SuppressWarnings("unchecked")
	public static void setSelectEditShipList(String brffcCd, String shipCd) throws Exception, EgovBizException {
		
		List<Map> shipSelectList = new ArrayList<Map>();
		List<Map> shipEditList = new ArrayList<Map>();
		
		List<Map> shipRoleList = (List<Map>)getSinfo(SESSION_SHIP_ROLE_LIST);
		List<Map> allShipRoleList = (List<Map>)getSinfo(SESSION_SHIP_ALL_LIST);
		
		if (isBrffcLwprt()) { // 1인 1지사, 1선박인 선장, 기관장, 선원인 경우
			
			if (StringUtils.isNotEmpty(brffcCd) && StringUtils.isNotEmpty(shipCd)) {
				
				for (Map shipRole : shipRoleList) {
					if (((String)shipRole.get("brffcCd")).equals(brffcCd) &&
						((String)shipRole.get("shipCd")).equals(shipCd)) {
						shipSelectList.add(shipRole);
						shipEditList.add(shipRole);
						putSinfo("myBrffcCd", (String)shipRole.get("brffcCd"));
						putSinfo("myShipCd", (String)shipRole.get("shipCd"));
						putSinfo("myShipNm", (String)shipRole.get("shipNm"));
						putSinfo("myShipSeCd", (String)shipRole.get("shipSeCd"));
						putSinfo("myShipSeNm", (String)shipRole.get("shipSeNm"));
					}
				}
				
				if (shipSelectList.isEmpty()) {
					throw new EgovBizException("해당 지사 및 선박 정보 열람/편집 권한을 보유하고 있지 않습니다.");
				}
				
			} else {
				
				// 첫번째 지사 선박 정보를 셋팅
				shipSelectList.add(shipRoleList.get(0));
				shipEditList.add(shipRoleList.get(0));
				putSinfo("myBrffcCd", shipRoleList.get(0).get("brffcCd"));
				putSinfo("myShipCd", shipRoleList.get(0).get("shipCd"));
				putSinfo("myShipNm", shipRoleList.get(0).get("shipNm"));
				putSinfo("myShipSeCd", shipRoleList.get(0).get("shipSeCd"));
				putSinfo("myShipSeNm", shipRoleList.get(0).get("shipSeNm"));
			}
			
		} else {
			
			if (isAllBrffcSelect()) { // 전체 지사/선박 열람 가능자인 경우 (지사장, 사업부관리자, 시스템관리자, 유지보수 등)
				shipSelectList.addAll(allShipRoleList);
			} else { // 그 외 접근 허용 지사/선박만 (공무감독 등)
				shipSelectList.addAll(shipRoleList);
			}
			
			if (isAllBrffcEdit()) { // 전체 지사/선박 편집 가능자인 경우 (사업부관리자, 시스템관리자, 유지보수(편집가능))
				shipEditList.addAll(allShipRoleList);
			} else { // 그 외 접근 허용 지사/선박만 (지사항, 공무감독, 유지보수 등)
				shipEditList.addAll(shipRoleList);
			}
		}
		
		putSinfo(SESSION_SHIP_SELECT_LIST, shipSelectList);
		putSinfo(SESSION_SHIP_SELECT_JSON_LIST, new Gson().toJson(shipSelectList));
		putSinfo(SESSION_SHIP_EDIT_LIST, shipEditList);
		putSinfo(SESSION_SHIP_EDIT_JSON_LIST, new Gson().toJson(shipEditList));
	}
	
	/**
	 * param에 선박코드만 존재하고 선박명이 존재하지 않을때 선박코드와 일치하는 선박명을 put 해줌
	 * @param jobParam
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static void setParamShipNm(Map<String, Object> jobParam) throws Exception {
		if (jobParam.containsKey("shipCd") && !jobParam.containsKey("shipNm")) {
			List<Map> shipList = (List<Map>)getSinfo(SESSION_SHIP_ALL_LIST);
			for (Map shipMap : shipList) {
				if (shipMap.get("shipCd").equals(jobParam.get("shipCd"))) {
					jobParam.put("shipNm", shipMap.get("shipNm"));
				}
			}
		}
	}
}