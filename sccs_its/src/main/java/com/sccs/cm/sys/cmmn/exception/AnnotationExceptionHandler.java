package com.sccs.cm.sys.cmmn.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.sccs.cm.sys.cmmn.util.SessionUtil;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.sys.cmmn.log.services.LogSVC;

import egovframework.rte.fdl.cmmn.exception.BaseException;
import egovframework.rte.fdl.cmmn.exception.EgovBizException;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler;

/**
 * 공통 Exception 핸들러 처리
 * @author cjlee
 */
@ControllerAdvice
public class AnnotationExceptionHandler extends AbstractAnnotationExceptionHandler {
	
	/**
	 * Log
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * LogService
	 */
	@Autowired
	LogSVC logSVC;

	/* (non-Javadoc)
	 * @see egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler#handleBaseException(egovframework.rte.fdl.cmmn.exception.BaseException)
	 */
	@Override
	public ModelAndView handleBaseException(BaseException e) {
		writeErrorLog("handleBaseException", e);
		ModelAndView mv = new ModelAndView("com/cmmn/error");
		mv.addObject("errorMessage", e.getMessage());
		return mv;
	}

	/* (non-Javadoc)
	 * @see egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler#handleEgovBizException(egovframework.rte.fdl.cmmn.exception.EgovBizException)
	 */
	@Override
	public ModelAndView handleEgovBizException(EgovBizException e) {
		writeErrorLog("handleEgovBizException", e);
		ModelAndView mv = new ModelAndView("com/cmmn/roleError");
        mv.addObject("errorMessage", e.getMessage());
		return mv;
	}

	/* (non-Javadoc)
	 * @see egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler#handleException(java.lang.Exception)
	 */
	@Override
	public ModelAndView handleException(Exception e) {
		writeErrorLog("handleException", e);
		ModelAndView mv = new ModelAndView("com/cmmn/error");
        mv.addObject("errorMessage", e.getMessage());
		return mv;
	}

	/* (non-Javadoc)
	 * @see egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler#handleFdlException(egovframework.rte.fdl.cmmn.exception.FdlException)
	 */
	@Override
	public ModelAndView handleFdlException(FdlException e) {
		writeErrorLog("handleFdlException", e);
		ModelAndView mv = new ModelAndView("com/cmmn/error");
		mv.addObject("errorMessage", e.getMessage());
		return mv;
	}

	/* (non-Javadoc)
	 * @see egovframework.rte.ptl.mvc.bind.exception.AbstractAnnotationExceptionHandler#handleRuntimeException(java.lang.RuntimeException)
	 */
	@Override
	public ModelAndView handleRuntimeException(RuntimeException e) {
		writeErrorLog("handleRuntimeException", e);
		ModelAndView mv = new ModelAndView("com/cmmn/error");
        mv.addObject("errorMessage", e.getMessage());
		return mv;
	}
	
	/**
	 * 에러 로그 기록
	 * @param excepNm
	 * @param e
	 */
	private void writeErrorLog(String excepNm, Exception e) {
		
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		EgovMap sInfo = (EgovMap)session.getAttribute(SessionUtil.SESSION_ID);
		
		String empno = "";
		String svcUrl = request.getRequestURI();
		String userIp = request.getRemoteAddr();
		
		if (sInfo != null) {
			empno = sInfo.get("empno").toString();
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rgtrEmpno", empno);
		map.put("rgtrIp", userIp);
		map.put("svcUrl", svcUrl);
		map.put("errorCn", errors.toString());
		
		try {
			
			logger.error("@@ error message : " + e.getMessage());
			logger.error("@@ error content : " + errors.toString());
			
			// 에러 로그 내용 저장
			logSVC.insertErrorLog(map);
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}
	}
}