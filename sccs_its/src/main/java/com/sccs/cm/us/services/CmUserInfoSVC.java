package com.sccs.cm.us.services;

import java.util.Map;

/**
 * 사용자 정보 관리 서비스
 * @author syoh
 */
public interface CmUserInfoSVC {

	String selectDuplicationByUserId(String userId) throws Exception;
	
	int insertCmUserInfo(Map<String, String> reqParam) throws Exception;
}
