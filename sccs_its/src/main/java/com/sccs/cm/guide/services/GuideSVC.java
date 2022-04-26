package com.sccs.cm.guide.services;

import java.util.List;
import java.util.Map;

/**
 * 개발자 가이드 서비스
 * @author syoh
 */

public interface GuideSVC {

	List<Map<String,Object>> getList(Map<String, Object> paramMap) throws Exception;
	
	int getTotalCount(Map<String, Object> paramMap) throws Exception;
	
	List<Map<String,Object>> getDeptList(Map<String, Object> paramMap) throws Exception;
	
	int insertSample(Map<String,String> sample) throws Exception;
	
	int updateSample(Map<String,String> sample) throws Exception;
	
	int deleteSample(Map<String,String> sample) throws Exception;
}
