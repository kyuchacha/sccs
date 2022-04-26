package com.sccs.cm.sys.cmmn.util;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * /egovframework/message-configuration.xml 에 설정된 내용을 읽어온다.
 * 
 * @author syoh
 */
public class MessageUtil {

	/**
	 * ApplicationContext
	 */
	private static ApplicationContext context;

	/**
	 * message-configuration.xml 위치
	 */
	private static final String CONFIG_FILENAME = "/egovframework/message-configuration.xml";

	/**
	 * Locale
	 */
	private static final Locale LOCALE = Locale.KOREA;

	/**
	 * initialize
	 * 
	 * @throws RuntimeException
	 */
	public synchronized static void initialize() throws RuntimeException {
		if (context == null) {
			loadConfiguration();
		}
	}

	/**
	 * loadConfiguration
	 * 
	 * @throws RuntimeException
	 */
	public static void loadConfiguration() throws RuntimeException {
		try {
			context = new ClassPathXmlApplicationContext(CONFIG_FILENAME);
		} catch (BeansException e) {
			throw new RuntimeException("Config Util Error!!!!!!!!!!!");
		}
	}

	/**
	 * 메시지 취득 (param 이용)
	 * 
	 * @param key
	 * @param param
	 * @return
	 */
	public static String getMessage(String key, String[] param) {

		if (context == null) {
			initialize();
		}
		return context.getMessage(key, param, LOCALE);
	}

	/**
	 * 메시지 취득 (key만)
	 * 
	 * @param key
	 * @return
	 */
	public static String getMessage(String key) {
		return getMessage(key, null);
	}
}