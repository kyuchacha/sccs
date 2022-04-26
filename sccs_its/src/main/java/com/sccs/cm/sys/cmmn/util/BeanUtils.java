package com.sccs.cm.sys.cmmn.util;

import org.springframework.context.ApplicationContext;

/**
 * Bean 생성
 * @author cjlee
 */
public class BeanUtils {
	
	public static Object getBean(String beanId) {
        
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
 
        if (applicationContext == null) {
        	try {
        		throw new NullPointerException("Spring의 ApplicationContext초기화 안됨");
        	} catch(RuntimeException e) {
        		throw new RuntimeException("RuntimeException 오류");
            }
        }
        
        return applicationContext.getBean(beanId);
    }
}