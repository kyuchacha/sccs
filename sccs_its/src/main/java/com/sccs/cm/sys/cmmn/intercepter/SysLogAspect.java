package com.sccs.cm.sys.cmmn.intercepter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.sccs.cm.sys.cmmn.util.SessionUtil;
import com.sccs.cm.sys.cmmn.log.services.LogSVC;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 시스템 로그 생성용 Aspect
 * @author cjlee
 */
public class SysLogAspect {

	/**
	 * LogService
	 */
	@Autowired
	LogSVC logSVC;

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 insert로 시작되는 Method
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	public Object logInsert(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();
		
		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			
			stopWatch.stop();
			
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
			HttpSession session = request.getSession();
			EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
			
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCd = "C";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String empno = "";
			String svcUrl = request.getRequestURI();
			String userIp = request.getRemoteAddr();
			
			if (sInfo != null) {
				empno = sInfo.get("empno") != null ? sInfo.get("empno").toString() : "anoymous";
			} else {
				empno = "anoymous";
			}
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("svcNm", className);
			map.put("methodNm", methodName);
			map.put("processSeCd", processSeCd);
			map.put("processTime", processTime);
			map.put("rgtrEmpno", empno);
			map.put("rgtrIp", userIp);
			map.put("svcUrl", svcUrl);
			logSVC.insertSysLog(map);
		}
	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 update로 시작되는 Method
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	public Object logUpdate(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			
			stopWatch.stop();
			
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
			HttpSession session = request.getSession();
			EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
			
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCd = "U";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String empno = "";
			String svcUrl = request.getRequestURI();
			String userIp = request.getRemoteAddr();
			
			if (sInfo != null) {
				empno = sInfo.get("empno").toString();
			}
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("svcNm", className);
			map.put("methodNm", methodName);
			map.put("processSeCd", processSeCd);
			map.put("processTime", processTime);
			map.put("rgtrEmpno", empno);
			map.put("rgtrIp", userIp);
			map.put("svcUrl", svcUrl);
			logSVC.insertSysLog(map);
		}

	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 delete로 시작되는 Method
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	public Object logDelete(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			
			stopWatch.stop();
			
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
			HttpSession session = request.getSession();
			EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
			
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCd = "D";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String empno = "";
			String svcUrl = request.getRequestURI();
			String userIp = request.getRemoteAddr();
			
			if (sInfo != null) {
				empno = sInfo.get("empno").toString();
			}
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("svcNm", className);
			map.put("methodNm", methodName);
			map.put("processSeCd", processSeCd);
			map.put("processTime", processTime);
			map.put("rgtrEmpno", empno);
			map.put("rgtrIp", userIp);
			map.put("svcUrl", svcUrl);
			logSVC.insertSysLog(map);
		}
	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 select로 시작되는 Method
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	public Object logSelect(ProceedingJoinPoint joinPoint) throws Throwable {
		
		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			
			stopWatch.stop();
			
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
			HttpSession session = request.getSession();
			EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
			
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCd = "R";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String empno = "";
			String svcUrl = request.getRequestURI();
			String userIp = request.getRemoteAddr();
			
			if (sInfo != null) {
				empno = sInfo.get("empno").toString();
			}
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("svcNm", className);
			map.put("methodNm", methodName);
			map.put("processSeCd", processSeCd);
			map.put("processTime", processTime);
			map.put("rgtrEmpno", empno);
			map.put("rgtrIp", userIp);
			map.put("svcUrl", svcUrl);
			logSVC.insertSysLog(map);
		}
	}
}