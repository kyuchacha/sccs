package com.sccs.cm.sys.cmmn.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 권한 상태 체크용 Interceptor
 * @author cjlee
 */
@Service
public class AuthenticInterceptor extends HandlerInterceptorAdapter {
	
	/**
	 * 메뉴관리(권한) service
	 */
//	@Autowired
//	MenuMngService menuMngService;	

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//		
//		// 체크 제외 URL 목록
//		String[] exceptUrlArr = {"/main/main.do", "logout.do", "Ajax.do", "Download.do"};
//		
//		// 로그인 세션
//		HttpSession session = request.getSession();
//		EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
//		
//		// 권한 보유 여부
//		boolean isExiRole = false;
//		
//		if (sInfo != null) {
//			
//			Map<String, Object> map = new HashMap<String, Object>();
//			
//			// 현재 경로 취득
//			String menuURL = request.getRequestURI();
//			map.put("roleId", sInfo.get("roleId"));
//			map.put("menuURL", menuURL);
//			
//			List<EgovMap> menuList = (List<EgovMap>)session.getAttribute(SessionUtil.SESSION_MENU_ID);
//			
//			for (EgovMap menu : menuList) {
//				
//				String url = (String)menu.get("menuUrl");
//				String menuIndictAt = (String)menu.get("menuIndictAt");
//				
//				if (menuURL.equals(url)) {
//					
//					isExiRole = true;
//					
//					request.setAttribute("menuInfo", menu);
//					
//					request.setAttribute("path", "Y".equals(menuIndictAt) ? url : menu.get("upperMenuUrl"));
//					
//					// 메뉴 로케이션 조회
//					List<EgovMap> menuLocationList = menuMngService.selectMenuLocationList(menu);
//					request.setAttribute("menuLocation", menuLocationList);
//					
//					// 메뉴 이용횟수 증감 처리
//					if (menuLocationList != null && !menuLocationList.isEmpty()) {
//						for (int i = menuLocationList.size()-1; i >= 0; i--) {
//							EgovMap locationMap = menuLocationList.get(i);
//							// 표시되는 메뉴인 경우 증감
//							if ("Y".equals(locationMap.get("menuIndictAt"))) {
//								menuMngService.updateMenuUseCnt(locationMap);
//								break;
//							}
//						}
//					}
//					
//					break;
//				}
//			}
//			
//			// 체크 제외 URL은 통과
//			for (String exceptUrl : exceptUrlArr) {
//				if (menuURL.indexOf(exceptUrl) >= 0) {
//					return true;
//				}
//			}
//			
//			if (isExiRole) {
//				return true;
//			} else {
//				response.setContentType("text/html; charset=UTF-8");
//				PrintWriter out = response.getWriter();
//				out.print("<script>alert('해당 화면에 대한 접근 권한이 없습니다.');history.go(-1);</script>");
//				out.flush();
//				out.close();
//				return false;
//			}
//			
//		} else {
//			// 로그인정보 없을 시 로그인 페이지로 이동
//			ModelAndView modelAndView = new ModelAndView("redirect:/login.do");
//			throw new ModelAndViewDefiningException(modelAndView);
//		}
		return true;
	}
}