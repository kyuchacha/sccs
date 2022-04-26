package com.sccs.cm.sys.cmmn.exception;

import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;

import egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler;

/**
 * 공통 에러 처리 (AOP방식)
 * @author cjlee
 */
public class CmmnExcepHndlr implements ExceptionHandler {
	
	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());

	/* (non-Javadoc)
	 * @see egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler#occur(java.lang.Exception, java.lang.String)
	 */
	@Override
	public void occur(Exception ex, String packageName) {
		logger.error(" EgovServiceExceptionHandler run...............");
		logger.error(" ==> "+ex.getMessage());
	}
}