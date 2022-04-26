package com.sccs.cm.sys.cmmn.intercepter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.sys.cmmn.services.CmDEM;
import com.sccs.cm.sys.cmmn.util.EgovUserDetailsHelper;

/**
 * 로그인 세션 체크용 Interceptor
 * @author cjlee
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {
	
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * cmDEM
	 */
	@Autowired
	CmDEM cmDEM;
	
	/**
	 * 세션에 계정정보가 있는지 여부로 인증 여부를 체크한다.
	 * 계정정보가 없다면, 로그인 페이지로 이동한다.
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			response.reset();
			response.setContentType("application/json;charset=UTF-8");

			try {
				StringBuilder stb = new StringBuilder();
				PrintWriter out = response.getWriter();

				stb.append("{\"ERRMSGINFO\":{");
				stb.append("\"STATUSCODE\":\"").append("401").append("\"");
				stb.append(",\"ERRCODE\":\"").append("-10000").append("\"");
				stb.append(",\"ERRMSG\":\"").append("세션이 만료되어 로그인 페이지로 이동합니다.").append("\"");
				stb.append("}}");
				
				out.print(stb.toString());
			} catch (IOException e) {
				logger.debug(e.getMessage());
			}
			
			return false;
		} else {
			//TODO 접근 메뉴 정보 조회
			return true;
		}
	}
}