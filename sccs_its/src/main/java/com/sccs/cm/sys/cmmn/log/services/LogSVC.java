package com.sccs.cm.sys.cmmn.log.services;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 시스템 로그 서비스
 * @author cjlee
 */
public interface LogSVC {

	/**
	 * 시스템 접근 로그 등록
	 * @param map
	 * @throws Exception
	 */
	public int insertSysLog(Map<String, Object> map) throws Exception;
	
	/**
	 * 시스템 에러 로그 등록
	 * @param map
	 * @throws Exception
	 */
	public int insertErrorLog(Map<String, Object> map) throws Exception;
	
	/**
	 * 로그 관리 목록 카운트 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int selectLogMngCnt(Map<String, Object> param) throws Exception;
	
	/**
	 * 로그 관리 목록 조회 (페이징)
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<EgovMap> selectLogMngPageList(Map<String, Object> param) throws Exception;
	
	/**
	 * 메뉴 이용횟수 목록 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<EgovMap> selectMenuUseCntList(Map<String, Object> param) throws Exception;
}