package com.sccs.cm.sys.cmmn.util;

import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * 파라미터 처리 Util
 * @author cjlee
 */
public final class RequestWrapper extends HttpServletRequestWrapper {
	
	/**
	 * 파라미터 Hashtable
	 */
	private Hashtable<String, String[]> parameters = new Hashtable<String, String[]>();

	/**
	 * HttpServletRequest 파라미터 처리
	 * @param servletRequest
	 */
	public RequestWrapper(HttpServletRequest servletRequest) {
		
		super(servletRequest);

		if (super.getMethod().equals("GET")) {
			Enumeration<?> keys = super.getParameterNames();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				String[] values = getParameterValues(key);
				parameters.put(key, values);
			}
		} else if (super.getMethod().equals("POST")) {
			Enumeration<?> keys = super.getParameterNames();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				String[] values = getParameterValues(key);
				parameters.put(key, values);
			}
		}
	}

	/* (non-Javadoc)
	 * @see javax.servlet.ServletRequestWrapper#getParameterValues(java.lang.String)
	 */
	public String[] getParameterValues(String parameter) {
		String[] values = super.getParameterValues(parameter);
		if (values == null) {
			return null;
		}
		int count = values.length;
		String[] encodedValues = new String[count];
		for (int i = 0; i < count; i++) {
			encodedValues[i] = cleanXSS(values[i]);
		}
		return encodedValues;
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServletRequestWrapper#getHeader(java.lang.String)
	 */
	public String getHeader(String name) {
		String value = super.getHeader(name);
		if (value == null)
			return null;
		return cleanXSS(value);
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServletRequestWrapper#getRequestURL()
	 */
	public StringBuffer getRequestURL() {
		StringBuffer value = super.getRequestURL();

		if (value == null)
			return null;
		return new StringBuffer(cleanXSS(value.toString()));
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServletRequestWrapper#getRequestURI()
	 */
	public String getRequestURI() {
		String value = super.getRequestURI();
		if (value == null)
			return null;
		return cleanXSS(value);
	}

	/* (non-Javadoc)
	 * @see javax.servlet.ServletRequestWrapper#getParameterMap()
	 */
	public Map<String, String[]> getParameterMap() {
		return parameters;
	}

	/**
	 * cleanXSS
	 * @param value
	 * @return
	 */
	private String cleanXSS(String value) {
		value = Util.removeXSS(value, true);
		return value;
	}
}