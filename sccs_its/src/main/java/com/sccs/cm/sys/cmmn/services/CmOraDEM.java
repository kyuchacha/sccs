package com.sccs.cm.sys.cmmn.services;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.sccs.cm.sys.cmmn.util.SessionUtil;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 공통DAO처리 (오라클용)
 * @author cjlee
 */
@Repository
public class CmOraDEM extends CmOraAbstractDEM {
	
    Connection con;

	public void flush() {
		getSqlSession().flushStatements();
    }

	public List getList(String statementName) {
        return super.list(statementName, null);
    }

    public List getList(String statementName, Object param) {
        return super.list(statementName, param);
    }

    public Object get(String statementName) {
        return super.selectByPk(statementName, null);
    }

    public Object get(String statementName, Object parameterObject) {
        return super.selectByPk(statementName, parameterObject);
    }

    public void add(String statementName, Object parameterObject) {
        super.insert(statementName, parameterObject);
    }
    
    public int insert(String statementName, Object parameterObject) {
    	setUserSessionInfo(parameterObject);
        return super.insert(statementName, parameterObject);
    }

    public int update(String statementName, Object parameterObject) {
    	setUserSessionInfo(parameterObject);
        return super.update(statementName, parameterObject);
    }

    public int remove(String statementName) {
        return super.delete(statementName, null);
    }

    public int remove(String statementName, Object parameterObject) {
    	setUserSessionInfo(parameterObject);
        return super.delete(statementName, parameterObject);
    }

    public Integer insertReturningKey(String statementName, Object parameterObject) {
        return super.insert(statementName, parameterObject);
    }
    
    private void setUserSessionInfo(Object parameterObject) {
    	
    	if (parameterObject instanceof Map && RequestContextHolder.getRequestAttributes() != null) {
    		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
    		HttpSession httpSession = servletRequestAttributes.getRequest().getSession(true);
    		EgovMap sInfo = (EgovMap)httpSession.getAttribute(SessionUtil.SESSION_ID);
    		if (sInfo != null) {
    			((Map)parameterObject).put("rgtrEmpno", sInfo.get("empno"));
    			((Map)parameterObject).put("updusrEmpno", sInfo.get("empno"));
    		}
    	}
    }
}