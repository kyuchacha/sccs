package com.sccs.cm.sys.cmmn.util;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * Log 출력 공통 유틸
 * @author cjlee
 */
public class LogUtil {
	
	/**
	 * Logger
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(LogUtil.class);
	
	/**
	 * 개행
	 */
	private static final String NEW_LINE = "\n";
	
	/**
	 * 탭
	 */
	private static final String TAB = "\t";
	
	/**
	 * 로그 출력 (Exception 이용)
	 * @param e
	 */
	public static void printLog(Exception e) {
		printStackTraceLog("", "", e);
	}

	/**
	 * 로그 출력
	 * @param signatureName
	 * @param methodName
	 * @param e
	 */
	public static void printLog(String signatureName, String methodName, Exception e) {
		printStackTraceLog(signatureName, methodName, e);
	}
	
	/**
	 * 로그 출력
	 * @param signatureName
	 * @param methodName
	 * @param e
	 */
	public static void printLog(String signatureName, String methodName, Throwable e) {
		printStackTraceLog(signatureName, methodName, e);
	}

	/**
	 * 로그 출력
	 * @param request
	 * @param e
	 */
	public static void printLog(HttpServletRequest request, Exception e) {
		printStackTraceLog(request, "", "", e);
	}

	/**
	 * 로그 출력
	 * @param request
	 * @param signatureName
	 * @param methodName
	 * @param e
	 */
	public static void printLog(HttpServletRequest request, String signatureName, String methodName, Exception e) {
		printStackTraceLog(request,signatureName,methodName,e);
	}

	/**
	 * 로그 출력 (trace)
	 * @param signatureName
	 * @param methodName
	 * @param e
	 */
	private static void printStackTraceLog(String signatureName, String methodName, Throwable e) {
		//현재 요청중인 thread local의 HttpServletRequest 객체 가져오기
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		printStackTraceLog(request,signatureName,methodName,e);
	}

	/**
	 * 로그 출력 (trace)
	 * @param request
	 * @param signatureName
	 * @param methodName
	 * @param e
	 */
	private static void printStackTraceLog(HttpServletRequest request, String signatureName, String methodName, Throwable e) {
		
		StringBuffer sb = new StringBuffer();
		StackTraceElement[] stackTraceArr = e.getStackTrace();
		sb.append(NEW_LINE).append("에러시그니처 : ").append(signatureName).append("->").append(methodName);
		sb.append(NEW_LINE).append(e.getClass().getName()).append(" : ").append(e.getMessage());
		
		if (stackTraceArr != null) {
			for (int i = 0; i < stackTraceArr.length; i++) {
				sb.append(NEW_LINE);
				sb.append(TAB);
				sb.append(stackTraceArr[i].toString());
			}
		}

		LOGGER.error(sb.toString());
		if ("Y".equals(ConfigUtil.getString("APPLICATION_DB_LOG"))) {
			insertDb(request, signatureName, methodName, sb.toString(), e);
		}
	}

	/**
	 * 로그 내용 디비 저장
	 * @param request
	 * @param signatureName
	 * @param methodName
	 * @param errLog
	 * @param e
	 */
	private static void insertDb(HttpServletRequest request,String signatureName,String methodName,String errLog,Throwable e) {

		 //HttpSession 객체 가져오기
		 HttpSession session = request.getSession();

		 //ServletContext 객체 가져오기
		 ServletContext conext = session.getServletContext();

		 //Spring Context 가져오기
		 WebApplicationContext wContext = WebApplicationContextUtils.getWebApplicationContext(conext);

		 //스프링 빈 가져오기 & casting
		/* ApplicationLogService applicationLogService = (ApplicationLogService)wContext.getBean("applicationLogServiceImpl");
		 try
		 {
			 //SessionVO sessionVO =	SessionUtil.sessionVoToSession(session);
			 HashMap oneLog=new HashMap();
			 oneLog.put("LOG_ID", KeyHelper.getStringKey());
			 oneLog.put("LOG_SGNT_NM", signatureName);
			 oneLog.put("LOG_MTH_NM", methodName);
			 oneLog.put("LOG_CN", errLog);
			 oneLog.put("LOG_ERROR_NM", e.getClass().getName());
			 oneLog.put("LOG_ERROR_DC", e.getMessage());
			 //oneLog.put("SYS_REGIST_ID",sessionVO.getLoginId());
			 //oneLog.put("SYS_REGIST_NM",sessionVO.getEmplyrNm());
			 applicationLogService.insertBoardFile(oneLog);
		 }
		 catch(RuntimeException ex)
		 {
			LOGGER.error("에러로그 DB 등록중 예외발생");
		 }*/
	}

	/**
	 * stack trace 로그 정보 취득
	 * @param e
	 * @return
	 */
	public static String getStackTraceLog(Exception e) {
		
		StringBuffer sb = new StringBuffer();
		StackTraceElement[] stackTraceArr = e.getStackTrace();
		sb.append(NEW_LINE).append(e.getClass().getName()).append(" : ").append(e.getMessage());
		
		for (int i = 0; i < stackTraceArr.length; i++) {
			sb.append("<br/>");
			sb.append(TAB);
			sb.append(stackTraceArr[i].toString());
		}
		return sb.toString();
	}

	/**
	 * stack trace new line 취득
	 * @param e
	 * @return
	 */
	public static String getStackTraceLogNewLine(Exception e) {
		
        StringBuffer sb = new StringBuffer();
        StackTraceElement[] stackTraceArr = e.getStackTrace();
        sb.append(e.getClass().getName()).append(" : ").append(e.getMessage()).append("\r\n");

        for (int i = 0; i < stackTraceArr.length; i++) {
            sb.append("\r\n");
            sb.append(stackTraceArr[i].toString());
        }

        return sb.toString();
    }

    /**
     * 에러 로그 메시지 취득
     * @param e
     * @return
     */
    public static String getErrorMsg(Exception e) {
        return e.getMessage();
    }
}