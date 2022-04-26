package com.sccs;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;
import com.sccs.cm.sys.cmmn.util.EgovUserDetailsHelper;

/**
 * 일반 로그인을 처리하는 컨트롤러 클래스
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일      수정자      수정내용
 *  -------            --------        ---------------------------
 *  2009.03.06  박지욱     최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
@Controller
public class MainController {

	/**
	 * 메인화면
	 * @param HttpServletRequest request
	 * @param HttpServletResponse response
	 * @return 로그인 페이지 혹은 메인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/index.do")
	public View loginForm(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 1. 사용자 인증 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			return new UIView("app/com/inc/login.clx");
		}

		// 2. 메인 페이지 이동
		return new UIView("app/com/main/main.clx");
	}

}