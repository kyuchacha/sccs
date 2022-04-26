package com.sccs.cm.sys.cmmn.util;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import com.sccs.cm.us.services.LoginVO;

/**
 * EgovUserDetails Helper 클래스
 * 
 * @author sjyoon
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    -------------    ----------------------
 *   2009.03.10  sjyoon    최초 생성
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *      </pre>
 */

public class EgovUserDetailsHelper {

	/**
	 * 인증된 사용자객체를 VO형식으로 가져온다.
	 * 
	 * @return Object - 사용자 ValueObject
	 */
	public static Object getAuthenticatedUser() {
		return (LoginVO) RequestContextHolder.getRequestAttributes().getAttribute("LoginVO", RequestAttributes.SCOPE_SESSION) == null ? new LoginVO() : (LoginVO) RequestContextHolder.getRequestAttributes().getAttribute("LoginVO", RequestAttributes.SCOPE_SESSION);
	}

	/**
	 * 인증된 사용자의 권한 정보를 가져온다. 예) [ ROLE_ADMIN, ROLE_USER, ROLE_A, ROLE_B,IS_AUTHENTICATED_ANONYMOUSLY ]
	 * 
	 * @return String - 사용자 권한정보
	 */
	public static String getAuthority() {
		String auth = "";

		if (EgovObjectUtil.isNull((LoginVO) RequestContextHolder.getRequestAttributes().getAttribute("LoginVO", RequestAttributes.SCOPE_SESSION))) {
			// log.debug("## authentication object is null!!");
			return null;
		} else {
			LoginVO loginVO = (LoginVO) RequestContextHolder.getRequestAttributes().getAttribute("LoginVO", RequestAttributes.SCOPE_SESSION);
			auth = loginVO.getRoleCd();
		}

		return auth;
	}

	/**
	 * 인증된 사용자 여부를 체크한다.
	 * 
	 * @return Boolean - 인증된 사용자 여부(TRUE / FALSE)
	 */
	public static Boolean isAuthenticated() {

		if (EgovObjectUtil.isNull((LoginVO) RequestContextHolder.getRequestAttributes().getAttribute("LoginVO", RequestAttributes.SCOPE_SESSION))) {
			// log.debug("## authentication object is null!!");
			return Boolean.FALSE;
		}
		return Boolean.TRUE;
	}
}
