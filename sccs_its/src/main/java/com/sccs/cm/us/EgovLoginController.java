package com.sccs.cm.us;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.sccs.cm.sys.cmmn.util.EgovUserDetailsHelper;
import com.sccs.cm.sys.cmmn.util.MessageUtil;
import com.sccs.cm.sys.cmmn.util.XBUtil;
import com.sccs.cm.us.services.EgovLoginSVC;
import com.sccs.cm.us.services.LoginVO;

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
@RequestMapping("/com/sccs/cm/us")
public class EgovLoginController {

	/** EgovLoginService */
	@Autowired
	private EgovLoginSVC loginSVC;

//	@Autowired
//	private RedisTemplate<String, String> redisTemplate;
	
	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/loginForm.do")
	public View loginForm(HttpServletRequest request, HttpServletResponse response, ModelAndView mv) throws Exception {
		//return new UIView("view/cm/us/Login.clx");
		return new UIView("app/com/inc/login.clx");
	}

	/**
	 * 일반 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@RequestMapping(value = "/actionLogin.do")
	public View actionLogin(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		Map<String, Object> meta = new HashMap<String, Object>();
		
		Map<String, Object> reqParam = XBUtil.getParamMap(dataRequest, "dsParam");
		String forceLoginYn = reqParam.get("forceLoginYn") != null ? String.valueOf(reqParam.get("forceLoginYn")) : "N";
		
		LoginVO loginVO = new LoginVO();
		loginVO.setUserId(reqParam.get("USER_ID") != null ? String.valueOf(reqParam.get("USER_ID")) : "");
		loginVO.setPswdEncpt(reqParam.get("PWD") != null ? String.valueOf(reqParam.get("PWD")) : "");
		
		// 1. 일반 로그인 처리
		LoginVO resultVO = loginSVC.actionLogin(loginVO);

		boolean loginPolicyYn = true;

		if (resultVO != null && resultVO.getUserId() != null && !resultVO.getUserId().equals("") && loginPolicyYn) {
			
			/*
			 	00 : 정상
				10 : 가입승인요청, 승인 시 -> '00'
				20 : 계정잠김(패스워드 불일치)
				21 : 계정잠김(장기간 미접속)
				30 : 탈퇴신청
				40 : 탈퇴승인
				50 : 비밀번호 초기화 요청
			 */
			String sttsCd = resultVO.getSttsCd() != null ? resultVO.getSttsCd() : "00";
			String message = "";
			
			meta.put("code", "S");
			if("10".equals(sttsCd)) {
				System.out.println("가입승인요청 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M003");
			} else if("20".equals(sttsCd)) {
				System.out.println("계정잠김 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M004");
			} else if("21".equals(sttsCd)) {
				System.out.println("계정잠김 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M005");
			} else if("30".equals(sttsCd)) {
				System.out.println("탈퇴신청 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M006");
			} else if("40".equals(sttsCd)) {
				System.out.println("탈퇴승인 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M007");
			} else if("50".equals(sttsCd)) {
				System.out.println("비밀번호 초기화 상태");
				message = MessageUtil.getMessage("MSG_CM_US_M008");
			} else {
				
				// 중복 로그인 체크 로직
				if(EgovMultiLoginPreventor.findByLoginId(resultVO.getUserId())) {
					meta.put("code", "D");
					message = MessageUtil.getMessage("MSG_CM_US_M009");
					
					if("Y".equals(forceLoginYn)) {
						meta.put("code", "S");
						request.getSession().setAttribute("LoginVO", resultVO);
						
						EgovHttpSessionBindingListener listener = new EgovHttpSessionBindingListener();
						request.getSession().setAttribute(resultVO.getUserId(), listener);
					} else {
						
					}
				} else {
					request.getSession().setAttribute("LoginVO", resultVO);
					//System.out.println("session Id : " + request.getSession().getId());
					//request.getSession().setAttribute(resultVO.getUserId(), resultVO);
					LoginVO loginvo = (LoginVO) request.getSession().getAttribute(resultVO.getUserId());
					
					//System.out.println("session Id : " + request.getSession().getId() + ", ");
					
					//redisTemplate.opsForHash().get("12345");
					
					EgovHttpSessionBindingListener listener = new EgovHttpSessionBindingListener();
					request.getSession().setAttribute(resultVO.getUserId(), listener);					
				}
				
				SimpleDateFormat yyyyMMdd = new SimpleDateFormat("yyyyMMddhhmmss");
				loginVO.setLgnFailrCo("0");
				loginVO.setSttsCd(resultVO.getSttsCd());
				loginVO.setLastCntnDt(yyyyMMdd.format(new Date()));
				loginSVC.updateLoginFailCnt(loginVO);
			}
			meta.put("sttsCd", sttsCd);
			meta.put("msg", message);
			
		} else {
			meta.put("code", "F");
			meta.put("msg", MessageUtil.getMessage("MSG_CM_US_M002"));
			
			// 아이디, 패스워드가 불일치 한경우
			// 1. 기 로그인 실패 횟수가 5회이면 계정잠김,  로그인 실패 횟수 증가
			LoginVO userVO = loginSVC.selectUserInfoByUserId(loginVO);
			if(userVO != null) {
				int loginFailCnt = Integer.parseInt(userVO.getLgnFailrCo() != null ? userVO.getLgnFailrCo() : "0");
				loginVO.setLgnFailrCo(String.valueOf(loginFailCnt+1));
				
				if(loginFailCnt > 3) {
					loginVO.setSttsCd("20");
				} else {
					loginVO.setSttsCd(userVO.getSttsCd());
				}
				loginSVC.updateLoginFailCnt(loginVO);
			}
		}
		//dataRequest.setResponse("dm_msg", dmMsg);
		dataRequest.setMetadata(true, meta);            
		
		return new JSONDataView();

	}
	
	/**
	 * 로그인 후 메인화면으로 들어간다
	 * @param
	 * @return 로그인 페이지
	 * @exception Exception
	 */
	@RequestMapping(value = "/uat/uia/actionMain.do")
	public String actionMain(ModelMap model) throws Exception {

		// 1. 사용자 인증 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		if (!isAuthenticated) {
			//model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
			return "cmm/uat/uia/EgovLoginUsr";
		}

		// 2. 메인 페이지 이동
		return "forward:/cmm/main/mainPage.do";
	}

	/**
	 * 로그아웃한다.
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/actionLogout.do")
	public View actionLogout(HttpServletRequest request, ModelMap model) throws Exception {
		RequestContextHolder.getRequestAttributes().removeAttribute("LoginVO", RequestAttributes.SCOPE_SESSION);
		request.getSession().invalidate();
		return new JSONDataView();
	}

}