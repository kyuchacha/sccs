package com.sccs.cm.sys.cmmn.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * ApplicationContextProvider
 * @author cjlee
 */
public class ApplicationContextProvider implements ApplicationContextAware {
	
	private static ApplicationContext ctx = null;
	 
    public static ApplicationContext getApplicationContext() {
        return ctx;
    }
 
    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        this.ctx = ctx;
    }
}