package com.sccs.cm.sys.cmmn.log.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sccs.cm.sys.cmmn.services.CmDEM;
import com.sccs.cm.sys.cmmn.log.services.LogSVC;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 시스템 로그 서비스
 * @author cjlee
 */
@Service
public class LogSVCImpl implements LogSVC {

	/**
	 * CommonDAO
	 */
	@Autowired
	CmDEM cmDEM;
	
	/**
	 * 시스템 접근 로그 등록
	 * @param map
	 * @throws Exception
	 */
	@Override
	public int insertSysLog(Map<String, Object> map) throws Exception {
		return cmDEM.insert("log.insertSyslog", map);
	}

	/**
	 * 시스템 에러 로그 등록
	 * @param map
	 * @throws Exception
	 */
	@Override
	public int insertErrorLog(Map<String, Object> map) throws Exception {
		return cmDEM.insert("log.insertErrorlog", map);
	}

	/**
	 * 로그 관리 목록 카운트 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Override
	public int selectLogMngCnt(Map<String, Object> param) throws Exception {
		return (Integer)cmDEM.get("log.selectLogMngCount", param);
	}

	/**
	 * 로그 관리 목록 조회 (페이징)
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<EgovMap> selectLogMngPageList(Map<String, Object> param) throws Exception {
		return (List<EgovMap>)cmDEM.getList("log.selectLogMngPageList", param);
	}

	/**
	 * 메뉴 이용횟수 목록 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<EgovMap> selectMenuUseCntList(Map<String, Object> param) throws Exception {
		return (List<EgovMap>)cmDEM.getList("log.selectMenuUseCntList", param);
	}
}