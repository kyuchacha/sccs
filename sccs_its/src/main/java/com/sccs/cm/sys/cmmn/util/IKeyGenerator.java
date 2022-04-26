package com.sccs.cm.sys.cmmn.util;

/**
 * Unique key 생성기
 * @author cjlee
 */
public interface IKeyGenerator {
	
	/**
	 * String Unique key 생성
	 * @return String Unique key 리턴
	 */
	public String getStringKey();
	
	/**
	 * String Unique key 생성
	 * @param division
	 * @return String Unique key 리턴
	 */
	public String getStringKey(String division);
	
	/**
	 * Date Unique key 생성
	 * @param division
	 * @return Date Unique key 리턴
	 */
	public String getDateStringKey();
	
	/**
	 * Date Unique key 생성
	 * @return Date Unique key 리턴
	 */
	public String getDateStringKey(String division);	
}